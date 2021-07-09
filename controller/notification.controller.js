require('dotenv').config()
const express = require('express')
const {Notification} = require('../models/notification.model.js')

async function getUserNotifications(req, res){
  try{
    let{userId} = req
    let notifications = await Notification.find({__target:userId}).populate({
      path:'__post'
    }).populate({path:'__source', select:'name profileImg'})

    if(!notifications){
      notifications = []
    }

    res.status(200).json({success:true, data: notifications})
  }catch(err){
    res.status(500).json({success:false,message:"No new notifications found", errorMessage: err.message})
  }
}

async function updateUserNotifications(req, res){
  try{
    let {notificationId} = req.body
    let notification = await Notification.findById(notificationId)
    notification.read = true
    notification = await notification.save()

    res.status(200).json({success:true, data: notification})

  }catch(err){
     res.status(500).json({success:false, errorMessage: err.message})
  }
}

module.exports = {getUserNotifications, updateUserNotifications}