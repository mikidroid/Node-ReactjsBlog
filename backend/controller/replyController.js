let path = require('path')
const dotenv = require('dotenv').config()
//Model for replys
const reply = require('../model/reply')
//Model for comments
const comment = require('../model/comment')


 const View = async (req,res)=>{
   const _reply = await reply.find({comment:req.params.id}).sort({'createdAt':-1})
    res.send({data:_reply})
  }

 //Add reply
 const Create = async (req,res)=>{
   let form = {
       name:req.body.name,
       content:req.body.content,
       email:req.body.email,
       reaction:[],
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
  }
  
   //Add reply reaction
 const Reaction = async(req,res)=>{
   
    let reaction = {
        type:req.body.type,
        username:req.body.username
    }
    
     _reply = await reply.findOne({_id:req.body.replyId})
     // check if user clicked this same reaction b4
     //if so, do nothing and return success
     if(_reply.reaction.some(reac=>reac.username==reaction.username)){
       res.send({status:401})
       //console.log(reaction)
     }
     else{
     //else push reaction
     _reply.reaction.push(reaction)
     _reply.save()
     io.emit("reaction","Comment liked")
     res.send({status:200})
     }
  }
  
  //remove  reaction
 const Unlike = async(req,res)=>{
   
    let reaction = {
        type:req.body.type,
        username:req.body.username
    }
     _reply = await reply.findOne({_id:req.body.replyId})
     // check if user clicked this same reaction b4
     //if so, do nothing and return success
       if(!_reply.reaction.some(reac=>reac.username==reaction.username)){
       res.send({status:401})
     }
     else{
     //else push reaction
     _reply.reaction.pull(reaction)
     _reply.save()
     io.emit("reaction","Comment unliked")
     res.send({status:200})
     }
  }


module.exports = {Reaction,Unlike,Create,View}