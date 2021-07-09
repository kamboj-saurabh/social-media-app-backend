require('dotenv').config()
const express = require('express')
const {Post} = require('../models/post.model.js')
const {addNotification, addNewPostNotification} = require('../utils/addNotification.js')


async function getAllPosts(req, res){
  try{
    let posts = await Post.find({}).populate({
      path:'__userId',
      select:'name username profileImg'
    }).populate({
      path:'comments',
      populate:{
        path:'commentBy',
        select:'name username profileImg'
      }
    })

    if(!posts){
      posts = []
    }

    res.status(200).json({success: true, data: posts})  
  }catch(err){
    res.status(500).json({success:false, errorMessage: err.message})
  }
}


async function addNewPost(req, res){
  try{
    let {userId} = req
    let postObj = req.body
    let newPost = new Post({...postObj, __userId: userId})
    newPost = await newPost.save()

    addNewPostNotification(newPost._id, userId)
    
    res.status(200).json({success:true, data: newPost})

  }catch(err){
    res.status(500).json({success:false, message:"Failed to add new Post",errorMessage: err.message})
  }
}

async function getUserPosts (searchId) {
  try{
    // const searchId = req.query.searchId
    let posts = await Post.find({__userId: searchId}).populate({
      path:'__userId',
      select:'name username profileImg'
    }).populate({
      path:'comments',
      populate:{
        path:'commentBy',
        select:'name username profileImg'
      }
    })
    
    if(!posts){
      posts = []
    }

    return posts
  }catch(err){
    throw new Error("No such Posts")
  }
}

async function updatePost (req, res){
  try{
    let {action} = req.body
    let {post} = req
    let {userId} = req

    switch(action){
      case 'LIKE_POST':
        post.likes = post.likes ? post.likes + 1 : 1
        if(!post.likedBy){
          post.likedBy = []
        }
        post.likedBy.push({likeduser:userId})
        break

      case 'UNLIKE_POST':
        post.likes = post.likes - 1
        post.likedBy = post.likedBy.filter(likeItem => likeItem.likeduser != userId)
        break
      
      case 'ADD_COMMENT':
        let {comment} = req.body;
        if(!post.comments){
          post.comments = []
        }
        post.comments.push({comment, commentBy:userId})
        break
    }

    post = await post.save()
    
    if(action === "LIKE_POST"){
      const type = "LIKE"
      addNotification(post._id, post.__userId, userId, type)
    }else if(action ==="ADD_COMMENT"){
      const type = "COMMENT"
      addNotification(post._id, post.__userId, userId, type)
    }

    post = await Post.findById(post._id).populate({
      path:'comments',
      populate:{
        path:'commentBy',
        select:'name username profileImg'
      }
    })
    res.status(200).json({success:true, data: post})
  }catch(err){
    res.status(500).json({success:true, errorMessage: err.message})
  }
}

module.exports = {getUserPosts, getAllPosts, addNewPost, updatePost}