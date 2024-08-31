const express = require('express');
const Actions = require('./actions-model');
const Projects = require('../projects/projects-model');
const router = express.Router();

// Middleware to validate action ID
async function validateActionId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id);
        if (action) {
            req.action = action;
            next();
        } else {
            res.status(404).json({ message: "Action not found" });
        }
    } catch (err) {
        next(err);
    }
}

// Middleware to validate action data
async function validateAction(req, res, next) {
    const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
        res.status(400).json({ message: "Missing required fields" });
    } else if (description.length > 128) {
        res.status(400).json({ message: "Description cannot be longer than 128 characters" });
    } else {
        const project = await Projects.get(project_id);
        if (!project) {
            res.status(400).json({ message: "Invalid project ID" });
        } else {
            next();
        }
    }
}

// [GET] /api/actions
router.get('/', async (req, res, next) => {
    try {
        const actions = await Actions.get();
        res.json(actions);
    } catch (err) {
        next(err);
    }
});

// [GET] /api/actions/:id
router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action);
});

// [POST] /api/actions
router.post('/', validateAction, async (req, res, next) => {
    try {
        const newAction = await Actions.insert(req.body);
        res.status(201).json(newAction);
    } catch (err) {
        next(err);
    }
});

// [PUT] /api/actions/:id
router.put('/:id', validateActionId, validateAction, async (req, res, next) => {
    try {
        const updatedAction = await Actions.update(req.params.id, req.body);
        res.json(updatedAction);
    } catch (err) {
        next(err);
    }
});

// [DELETE] /api/actions/:id
router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
        await Actions.remove(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

module.exports = router;
