const {Post} = require('../models/post.model.js')

async function validatePost (req, res, next, postId){
  try{
    let post = await Post.findById(postId)
    if(!post){
      return res.status(400).json({success:false, errorMessage:'No such post exists'})
    }

    req.post = post
    next()

  }catch(err){
    return res.status(400).json({success:false, message:"No such post exists", errorMessage: err.message})
  }
}

module.exports = {validatePost}