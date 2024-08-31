// add middlewares here related to actions
// add middlewares here related to projects
const Actions = require('./actions-model')

function logger(req, res, next) {
  const date = new Date().toLocaleString()
  const method = req.method
  const url =req.originalUrl
  next()
  // DO YOUR MAGIC

}

async function validateUserId(req, res, next) {
  try {
    const action = await Actions.getById(req.params.id)
    if(!action){
      res.status(404).json({
        message:'action not found'
      })
    } else {
      req.action = action
      next()
    }
  }
  catch (err) {
    res.status(500).json({message: 'problem finding action'})
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