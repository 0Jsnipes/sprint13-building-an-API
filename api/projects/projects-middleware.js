// add middlewares here related to projects
const Projects = require('./projects-model')

function logger(req, res, next) {
  const date = new Date().toLocaleString()
  const method = req.method
  const url =req.originalUrl
  next()
  // DO YOUR MAGIC

}

async function validateUserId(req, res, next) {
  try {
    const project = await Projects.getById(req.params.id)
    if(!project){
      res.status(404).json({
        message: 'project not found'
      })
    } else {
      req.project = project
      next()
    }
  }
  catch (err) {
    res.status(500).json({message: 'problem finding project'})
  }
  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
  const {name }= req.body
  if(!name || !name.trim()){
    res.status(400).json({message: 'missing required name field'})
  }else{
    req.name = name.trim()
    next()
  }
  }

function validatePost(req, res, next) {
  const { text }= req.body
  if(!text || !text.trim()){
    res.status(400).json({message: 'missing required text field'})
  }else{
    req.text = text.trim()
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
logger,
validateUserId,
validateUser,
validatePost,
}