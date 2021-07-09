require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const{loginUser} = require('../controller/login.controller.js')

const {User} = require('../models/user.model.js')
const router = express.Router()

router.route('/')
.post(loginUser)

module.exports = router
