const mongoose = require('../config/db')
const {Schema} = mongoose
const replySchema = new Schema({
      name:String,
      receiver:String,
      content:String,
      email:String,
      createdAt:String,
      post:{
        type: Schema.Types.ObjectId,
        ref:'post'
      },
      comment:{
        type: Schema.Types.ObjectId,
        ref:'comment'
      },
      user:{
        type: Schema.Types.ObjectId,
        ref:'user'
      },
      reaction:{ type : Array  },
})

const reply = mongoose.model('reply', replySchema)

module.exports = reply