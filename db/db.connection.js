const mongoose = require('mongoose');


async function DBConnection(){
 try {
  await  mongoose.connect("mongodb+srv://avenger:Avenger@07@social-media-cluster.ebnb0.mongodb.net/library?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true,useFindAndModify:true });

  console.log('DB Connection Successful');

}catch(err){
  console.error('DB Connection Failed', err)
}

}

module.exports = {DBConnection};