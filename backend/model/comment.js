const mongoose = require('../config/db')
const {Schema} = mongoose
const commentSchema = new Schema({
      name:String,
      content:String,
      email:String,
      createdAt:String,
      //post:String,
      post:{
        type: Schema.Types.ObjectId,
        ref:'post'
      }, 
      user:{
        type: Schema.Types.ObjectId,
        ref:'user'
      },
      replies:[{
        type: Schema.Types.ObjectId,
        ref:'reply'
      }]
      
})

const comment = mongoose.model('comment', commentSchema)

module.exports = comment