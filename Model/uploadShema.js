
const mongoose = require('mongoose');

const uploadShema = new mongoose.Schema({
   
id:{
  type: String,
  required: true
},
caption:{
  type: String,
},
email:{
  type: String,
  required: true
},
username:{
  type: String,
  required: true
},
name:{
  type: String,
  required: true
},
video:{
  type: String,
},

Likes:{
 type:Array
},
profilepicimage:{
type: String,
},
display:{
type: String,
},
catogory:{
type: String,
}

  })

const videolist = mongoose.model('posts',  uploadShema)

module.exports = videolist;