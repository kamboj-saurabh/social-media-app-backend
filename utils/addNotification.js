const {Notification} = require('../models/notification.model.js')
const {Follow} = require('../models/follow.model.js')

async function addNotification (postId, targetUser, sourceUser, type){
  try{
    let notificationObj = {
      read:false,
      notificationType: type,
      __post: postId,
      __target: targetUser,
      __source: sourceUser
    }

    let newNotification = new Notification(notificationObj)
    newNotification = await newNotification.save()
  }catch(err){
    console.err(err)
  }
}

async function addFollowNotification(targetUser, sourceUser ){
  try{
    let notificationObj = {
      read: false,
      notificationType: 'NEW_FOLLOWER',
      __target: targetUser,
      __source: sourceUser
    }

    let newNotification = new Notification(notificationObj)
    newNotification = await newNotification.save()

  }catch(err){
    console.error(err)
  }
}

async function addNewPostNotification(postId, sourceUser){
  try{
      let notificationObj = {
      read:false,
      notificationType: 'NEW_POST',
      __source : sourceUser
    } 

    const followers = await Follow.find({__follows: sourceUser})

    const notifications = followers.map(followerObj => ({
            ...notificationObj,
            __target: followerObj.__user
        }))

    if(notifications){
      Notification.insertMany(notifications);
    }
    
  }catch(err){
    console.error(err)
  }
}

module.exports = {addNotification, addFollowNotification, addNewPostNotification}