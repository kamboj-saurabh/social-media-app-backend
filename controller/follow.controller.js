require('dotenv').config()
const express = require('express')
const {extend} = require('lodash')
const {Follow} = require('../models/follow.model.js')
const {User} = require('../models/user.model.js')
const {addFollowNotification} = require('../utils/addNotification.js')

async function getFollowers (searchId){
  try{
    const searchUser = await User.findOne({_id:searchId})

    let following = await Follow.find({__user:searchId }).populate({
      path:"__follows",
      select:"name username profileImg"
    })
    if(!following){
      following = []
    }

    let followers = await Follow.find({__follows:searchId}).populate({
      path:"__user",
      select: "name username profileImg"
    })
    if(!followers){
      followers= []
    }

    const result = {
      following,
      followers
    }
    return result

  }catch(err){
    throw new Error("No such user")
  }
}

async function getFollowersById(req, res){
  try{
    const searchId = req.query.searchId
    const response = await getFollowers(searchId)
    res.status(200).json({success:true, data: response})
  }catch(err){
    res.status(500).json({success:false, message:"failed to get data", errorMessage:err.message})
  }
}

async function addFollowers (req, res){
  try{
    let {userId} = req
    const { follows } = req.body;
    

    let user_follow = new Follow({ __user:userId, __follows:follows });
    user_follow = await user_follow.save()
    const sourceUser = await User.findById(userId);
    const targetUser = await User.findById(follows);

    sourceUser.followingCount = sourceUser.followingCount + 1;
    targetUser.followerCount = targetUser.followerCount + 1;
    await sourceUser.save();
    await targetUser.save();

    addFollowNotification( follows, userId)

    res.status(201).json({success:true, data: user_follow})

  }catch(err){
    res.status(500).json({success:false, errorMessage:err.message})
  }
}


async function removeFollowers(req, res){
  try{
    let {userId} = req
    let { follows} = req.body
    let user_follow = await Follow.findOne({__user:userId, __follows: follows })

    user_follow = await user_follow.remove()
    const sourceUser = await User.findById(userId);
    const targetUser = await User.findById(follows);
    sourceUser.followingCount = sourceUser.followingCount - 1;
    targetUser.followerCount = targetUser.followerCount - 1;
    await sourceUser.save();
    await targetUser.save();

    user_follow.deleted = true;

    res.status(200).json({success:true, data: user_follow})

  }catch(err){
    res.status(500).json({sucess:false, errorMessage:err.message})
  }
}

async function getFollowSuggestions(req, res){
  try{
    let {userId} = req
    const followResponse = await getFollowers(userId)
    const following = followResponse.following
    let followingIds = following.map(item => item.__follows)

    const users = await User.find({}).select('name username profileImg')
   
    let suggestions = []
    suggestions = users.filter(userItem => {
        const newFollowId = userItem._id.toString()
        if(followingIds.find(item => item._id ==newFollowId) || newFollowId == userId.toString()){
          return false
        }
        return true
    })
    res.status(200).json({success:true, suggestions})
  }catch(err){
    res.status(500).json({success:false, message:"no suggestions found"})
  }
}

module.exports = {getFollowers, getFollowersById, addFollowers, removeFollowers, getFollowSuggestions}


