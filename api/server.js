const express = require('express');
const {logger} = require('./projects/projects-middleware')
const server = express();
const projectsRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')
// remember express by default cannot parse JSON in request bodies
server.use(express.json())

server.use(logger)
server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)
// global middlewares and the user's router need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
