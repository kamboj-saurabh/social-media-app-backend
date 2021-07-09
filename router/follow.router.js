require('dotenv').config()
const express = require('express')
const {extend} = require('lodash')
const {Follow} = require('../models/follow.model.js')
const {User} = require('../models/user.model.js')
const {authenticateToken} = require('../utils/authenticateToken.js')
const {getFollowersById, addFollowers, removeFollowers} = require('../controller/follow.controller.js')

const router = express.Router()

router.use(authenticateToken)

router.route('/id')
.get(getFollowersById)


router.route('/')
.post(addFollowers)
.delete(removeFollowers)


module.exports = router
