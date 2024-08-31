const express = require('express');
const Projects = require('./projects-model');
const router = express.Router();

// Middleware to validate project ID
async function validateProjectId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id);
        if (project) {
            req.project = project;
            next();
        } else {
            res.status(404).json({ message: "Project not found" });
        }
    } catch (err) {
        next(err);
    }
}

// Middleware to validate project data
function validateProject(req, res, next) {
    const { name, description, completed } = req.body;

    if (name === undefined || description === undefined || completed === undefined) {
        res.status(400).json({ message: "Missing required name, description, or completed field" });
    } else {
        next();
    }
}


// [GET] /api/projects
router.get('/', async (req, res, next) => {
    try {
        const projects = await Projects.get();
        res.json(projects);
    } catch (err) {
        next(err);
    }
});

// [GET] /api/projects/:id
router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project);
});

// [POST] /api/projects
router.post('/', validateProject, async (req, res, next) => {
    try {
        const newProject = await Projects.insert(req.body);
        res.status(201).json(newProject);
    } catch (err) {
        next(err);
    }
});

// [PUT] /api/projects/:id
router.put('/:id', validateProjectId, validateProject, async (req, res, next) => {
    try {
        const updatedProject = await Projects.update(req.params.id, req.body);
        res.json(updatedProject);
    } catch (err) {
        next(err);
    }
});


// [DELETE] /api/projects/:id
router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

// [GET] /api/projects/:id/actions
router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const actions = await Projects.getProjectActions(req.params.id);
        res.json(actions);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
