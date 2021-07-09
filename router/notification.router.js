require('dotenv').config()
const express = require('express')
const {Notification} = require('../models/notification.model.js')
const {authenticateToken} = require('../utils/authenticateToken.js')
const {getUserNotifications, updateUserNotifications} = require('../controller/notification.controller.js')

const router = express.Router()

router.use(authenticateToken)

router.route('/')
.get(getUserNotifications)
.post(updateUserNotifications)


module.exports = router
