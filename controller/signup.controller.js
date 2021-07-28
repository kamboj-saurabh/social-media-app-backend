require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/user.model.js')

async function signupUser(req, res){
  try{
      const newUserObj = req.body
      
      const userObj = await User.findOne({$or: [{email: newUserObj.email},{username: newUserObj.username}]})

      if(userObj){
        return res.status(409).json({success:false, message:"User already exists" })
      }

      const salt = await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash(newUserObj.password, salt)

      const newUser = new User({email:newUserObj.email, password:hashedPassword,
      username: newUserObj.username, name: newUserObj.name })
      const savedData = await newUser.save()

      const userId = savedData._id
      const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN, {expiresIn:'24h'})

      res.status(201).json({success:true, newUser: savedData, accessToken})
  
  }catch(err){
    res.status(500).json({success:false, message:"Unable to signup", errorMessage:err.message})
  }
}

module.exports = {signupUser}