 const mongoose = require('../config/db')
 const {Schema} = mongoose
 const post = mongoose.model('post',new Schema(
      { 
     /*   author:{
          type: Schema.Types.ObjectId,
          ref: 'users'
        }, */
        comments:[{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'comment'
        }],
        views:Number,
        title:String,
        content:String,
        category:String,
        createdAt:String,
        image_url:String,
        published:Boolean,
        reaction:{ type : Array },
        
      }))
 module.exports = post