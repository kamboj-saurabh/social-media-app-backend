const mongoose = require('mongoose')
const {Schema} = mongoose

const UserSchema = new Schema({
  name:{
    type: String,
    required: true
  },

  username:{
    type:String,
    required:true,
    unique: true
  },

  email:{
    type:String,
    required: true,
    unique: true
  },

  password:{
    type:String, 
    required: true
  },

  profileImg:{
    type:String,
  },

  bio:{
    type:String
  },

  dateofbirth:{
    type:String
  },

  contact:{
    type:String
  },

  location:{
    type:String
  },

  followerCount:{
    type:Number,
    default:0
  },

  followingCount: {
    type:Number,
    default: 0
  }

},
{
  timestamps: true
})


const User = mongoose.model('User', UserSchema)

module.exports = {User}