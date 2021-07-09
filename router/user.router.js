require('dotenv').config()
const express = require('express')
const {extend} = require('lodash')
const {authenticateToken} = require('../utils/authenticateToken.js')
const {validateUser} = require('../utils/validateUser.js')
const {getFollowSuggestions} = require('../controller/follow.controller.js')
const {getUserById, getUserByName, getCurrentUserDetails, updateCurrentUserDetails} = require('../controller/user.controller.js')


const router = express.Router()

router.use(authenticateToken)

router.route('/id')
.get(getUserById)

router.route('/suggestion')
.get(getFollowSuggestions)

router.route('/name')
.get(getUserByName)

router.use('/details', validateUser)

router.route('/details')
.get(getCurrentUserDetails)
.post(updateCurrentUserDetails)


module.exports = router
