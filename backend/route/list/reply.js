let path = require('path')
const dotenv = require('dotenv').config()
//Model for replys
const reply = require('../../model/reply')
//Model for posts
const post = require('../../model/post')
//Model for comments
const comment = require('../../model/comment')
//without this multer store, req.body will be empty
const store = require(_root+'/backend/config/file-upload').single('comments')


exports.index = (app)=>{

 //All routes
  app.get('/reply/:id',async (req,res)=>{
   const _reply = await reply.find({comment:req.params.id}).sort({'createdAt':-1})
    res.send({data:_reply})
  })

 //Add reply
  app.post('/reply/add',store.single('image'),async (req,res)=>{
   let form = {
       name:req.body.name,
       content:req.body.content,
       email:req.body.email,
       receiver:req.body.receiver,
       createdAt:new Date().toString(),
       //author:req.body.userId,
       comment:req.body.commentId,
       post:req.body.postId
   }
   //create reply using mongoose model instance
   const created = await reply.create(form)
   if (created){
    const _comment = await comment.findOne({_id:form.comment})
    //push new reply id to comments.reply for population
    _comment.replies.push(created._id)
    _comment.save()
    
    res.send({status:200})
   }
    
  })


  
}