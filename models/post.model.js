const mongoose = require('mongoose')
const {Schema} = mongoose

const MediaTypeSchema = new Schema({
  mediaType:{
     type: String, 
     enum: ["IMAGE", "VIDEO"]
  },
  mediaUrl:{
    type:String
  }
})

const CommentTypeSchema = new Schema({
  comment: {
    type:String
  },

  commentBy: {
    type: Schema.Types.ObjectId, 
    ref:'User'
  }
  
})

const PostLikeSchema = new Schema({
  likeduser: {
    type: Schema.Types.ObjectId, 
    ref:'User',
  }
})

const PostSchema = new Schema({
    __userId:{
      type: Schema.Types.ObjectId, 
      ref:'User',
      required:true
    },

    content:{
      type:String
    },

    media:{
      type:[MediaTypeSchema],
      default: undefined
    },

    likes: {
      type:Number,
    },

    likedBy: {
      type:[PostLikeSchema],
      default: undefined
    },

    comments: {
      type:[CommentTypeSchema],
      default: undefined
    }
},
{
  timestamps: true
})

const Post = mongoose.model('Post', PostSchema)

module.exports = {Post}