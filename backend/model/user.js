const mongoose = require('mongoose')
const {Schema} = mongoose
const userSchema = new Schema({
      username:String,
      email:String,
      password:String,
      firstname:String,
      lastname:String,
      phone:Number,
      level:Number,
      badge:String,
      posts:[{
        type: Schema.Types.ObjectId,
        ref:'post'
      }],
      comments:[{
        type: Schema.Types.ObjectId,
        ref:'comment'
      }],
      replies:[{
        type: Schema.Types.ObjectId,
        ref:'reply'
      }],
      orders:[{
        type: Schema.Types.ObjectId,
        ref:'order'
      }],
      
})

const user = mongoose.model('user',userSchema)

module.exports = user