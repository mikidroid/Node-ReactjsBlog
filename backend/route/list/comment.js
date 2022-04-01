let path = require('path')
const dotenv = require('dotenv').config()
//Model for comments
const comment = require('../../model/comment')
//Model for posts
const post = require('../../model/post')

//without this multer store, req.body will be empty
const store = require(_root+'/backend/config/file-upload').single('comments')


exports.index = (app)=>{

 //All routes
  app.get('/comment/:id',store.single('image'),async (req,res)=>{
   const _comment = await comment.find({post:req.params.id}).sort({'createdAt':-1}).populate("post")
    res.send({data:_comment})
    
  })

 //Add comment
  app.post('/comment/add',store.single('image'),async (req,res)=>{
   
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
    
     console.log(_post)
     res.send({status:200})
   } 
  })
  
  //Add comment reaction
  app.post('/comment/reaction',store.single('image'),async(req,res)=>{
   
    let reaction = {
        type:req.body.type,
        username:req.body.username
    }
    
     _comment = await comment.findOne({_id:req.body.commentId})
     // check if user clicked this same reaction b4
     //if so, do nothing and return success
     if(_comment.reaction.some(reac=>reac.username==reaction.username)){
       res.send({status:401})
       console.log(reaction)
     }
     else{
     //else push reaction
     _comment.reaction.push(reaction)
     _comment.save()
     res.send({status:200})
     }
  })
  
  //remove  reaction
  app.post('/comment/reaction/unlike',store.single('image'),async(req,res)=>{
   
    let reaction = {
        type:req.body.type,
        username:req.body.username
    }
     _comment = await comment.findOne({_id:req.body.commentId})
     // check if user clicked this same reaction b4
     //if so, do nothing and return success
       if(!_comment.reaction.some(reac=>reac.username==reaction.username)){
       res.send({status:401})
     }
     else{
     //else push reaction
     _comment.reaction.pull(reaction)
     _comment.save()
     res.send({status:200})
     }
  })

}