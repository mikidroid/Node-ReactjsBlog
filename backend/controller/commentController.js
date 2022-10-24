let path = require('path')
const dotenv = require('dotenv').config()
//Model for comments
const comment = require('../model/comment')
//Model for posts
const post = require('../model/post')


const View = async (req,res)=>{
   const _comment = await comment.find({post:req.params.id}).sort({'createdAt':-1}).populate("post").populate({path:'replies'})
    res.send({data:_comment})
  }

 //Add comment
  const Create = async (req,res)=>{
  
   let form = {
       name:req.body.name,
       content:req.body.content,
       reaction:[],
       email:req.body.email,
       createdAt:new Date().toString(),
       //author:req.body.userId,
       post:req.body.postId
   }
   //console.log(form)
   const created = await comment.create(form)
   if (created){
    //if created populate post document
    const _post = await post.findOne({_id:form.post})
    _post.comments.push(created._id)
    _post.save()
    
    io.emit('comment-added','New comment on '+_post.title)
    //console.log(_post)
    return res.status(200)
   } 
  }
  
  //Add comment reaction
  const Reaction = async(req,res)=>{
   
    let reaction = {
        type:req.body.type,
        username:req.body.username
    }
    
     _comment = await comment.findOne({_id:req.body.commentId})
     // check if user clicked this same reaction b4
     //if so, do nothing and return success
     if(_comment.reaction.some(reac=>reac.username==reaction.username)){
       return res.status(401)
       console.log(reaction)
     }
     else{
     //else push reaction
     _comment.reaction.push(reaction)
     _comment.save()
     //Will add this feature back
     io.emit("reaction","Comment liked")
     return res.status(200)
     }
  }
  
  //remove  reaction
  const Unlike = async(req,res)=>{
   
    let reaction = {
        type:req.body.type,
        username:req.body.username
    }
     _comment = await comment.findOne({_id:req.body.commentId})
     // check if user clicked this same reaction b4
     //if so, do nothing and return success
       if(!_comment.reaction.some(reac=>reac.username==reaction.username)){
       return res.status(401)
     }
     else{
     //else push reaction
     _comment.reaction.pull(reaction)
     _comment.save()
     io.emit("reaction","Comment unliked")
     return res.status(200)
     }
  }

module.exports = {Create,Reaction,Unlike,View}