const mongoose = require('../config/db')
const {Schema} = mongoose

const user = mongoose.model('user',new Schema({
   username: {
     type:String,
     unique:[true,'Username already exists!'],
     trim:true,
     lowercase:true,
   },
   password: String,
   email: {
     type:String,
     required:[true,'Email is required!'],
     unique:[true,'Email already exist!'],
     lowercase:true,
     trim:true,
   },
   isAdmin: Boolean,
   level: Number,
   posts: [{
     type: Schema.Types.ObjectId,
     ref: 'post'
   }],
   orders: [{
     type: Schema.Types.ObjectId,
     ref: 'order'
   }],
   created:{
     type:Date,
     default:Date.now,
   }
}))

module.exports = user