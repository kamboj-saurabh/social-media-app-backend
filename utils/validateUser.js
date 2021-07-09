const {User} = require('../models/user.model.js')

async function validateUser(req, res, next){
  try{
    let {userId} = req
    const user = await User.findById(userId);

    if(!user){
      return res.status(400).json({success:false, errorMessage:`No such user exists`})
    }

    req.user = user;
    next();

  }catch(err){
    return res.status(400).json({success:false, errorMessage:`No such user exists`})
  }
}

module.exports = {validateUser}