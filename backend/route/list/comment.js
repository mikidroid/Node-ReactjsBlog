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
    console.log(_comment)
  })

 //Add comment
  app.post('/comment/add',store.single('image'),async (req,res)=>{
   
   
   let form = {
       name:req.body.name,
       content:req.body.content,
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

}