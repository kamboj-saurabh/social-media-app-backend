require('dotenv').config()
const express = require('express')
const {extend} = require('lodash')
const {User} = require('../models/user.model.js')
const {getFollowers} = require('../controller/follow.controller.js')
const {getUserPosts} = require('../controller/post.controller.js')

async function getUserById (req, res){
  try{
    let searchId = req.query.searchId

    let user = await User.findById(searchId).select('-password')
    const followResponse = await getFollowers(user._id)
    const postResponse = await getUserPosts(user._id)
    
    res.status(200).json({success:true, data:{user, followResponse, postResponse}})

  }catch(err){
    res.status(400).json({success:false, errorMessage: err.message})
  }
}

async function getUserByName(req, res){
  try{
    let searchname = req.query.searchname

    let users = await User.find({}).select('name username profileImg')
    let result = users.filter(({name}) => {
      return name.toLowerCase().includes(searchname.toLowerCase())
    })

    res.status(200).json({success:true, data: result})
  }catch(err){
    res.status(400).json({success:false, errorMessage: err.message})
  }
}


async function getCurrentUserDetails(req, res){
  try{  
      let {user} = req;
      const followResponse = await getFollowers(user._id)
      res.status(200).json({success:true, data:{user, followResponse}})
    }catch(err){
      res.status(500).json({success:false, messagae:"Failed to get data", errorMessage:err.message})
  }
}

async function updateCurrentUserDetails(req, res){
  try{
      let userUpdate = req.body;
      let {user} = req;

      let search = await User.findOne({username : userUpdate.username})

      if(search && search.email !== user.email ){
          return  res.status(409).json({success:false, errorMessage: "Username exists"})
      }
      
      user = extend(user, userUpdate);
      user = await user.save();
      res.status(200).json({success:true, data: user})  
  }catch(err){
    res.status(500).json({success:false, message:'Failed to Update User', errorMessage:err.message})
  }
}



module.exports = {getUserById, getUserByName, getCurrentUserDetails, updateCurrentUserDetails}