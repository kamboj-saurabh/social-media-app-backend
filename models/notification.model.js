const mongoose = require('mongoose')
const {Schema} = mongoose

const NotificationSchema = new Schema({
  read: {
    type:Boolean,
    default:false,
  },

  notificationType:{
    type: String, 
    enum:["NEW_POST","NEW_FOLLOWER","LIKE","COMMENT"] 
  },

  __post: {
      type: Schema.Types.ObjectId, 
      ref:'Post'
  },

  __target: {
      type: Schema.Types.ObjectId, 
      ref:'User'
  },

  __source: {
    type: Schema.Types.ObjectId, 
    ref:'User'
  }
},
{
  timestamps: true
})

const Notification = mongoose.model('Notification', NotificationSchema)

module.exports = {Notification}