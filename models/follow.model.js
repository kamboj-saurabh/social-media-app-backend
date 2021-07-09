const mongoose = require('mongoose')
const {Schema} = mongoose


const FollowSchema = new Schema({
  __user:{
      type: Schema.Types.ObjectId, 
      ref:'User'
  },

  __follows:{
      type: Schema.Types.ObjectId, 
      ref:'User'
  },
},
{
  timestamps: true
})

const Follow = mongoose.model('Follow', FollowSchema)

module.exports = {Follow}