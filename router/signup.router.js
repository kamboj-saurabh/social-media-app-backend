const express = require('express')
// const bcrypt = require('bcrypt')
// const {User} = require('../models/user.model.js')
const {signupUser} = require('../controller/signup.controller.js')

const router = express.Router()

router.route('/')
.post(signupUser)

module.exports = router
