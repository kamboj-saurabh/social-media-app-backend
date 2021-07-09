require('dotenv').config()
const express = require('express')
const {Post} = require('../models/post.model.js')
const {authenticateToken} = require('../utils/authenticateToken.js')
const {getAllPosts, addNewPost, updatePost} = require('../controller/post.controller.js')
const {validatePost} = require('../utils/validatePost.js')

const router = express.Router()

router.use(authenticateToken)

router.route('/')
.get(getAllPosts)
.post(addNewPost)

router.param('postId', validatePost)
router.route('/:postId')
.post(updatePost)


module.exports = router
