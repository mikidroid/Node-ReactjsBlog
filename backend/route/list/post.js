let path = require('path')
const dotenv = require('dotenv').config()
//Model for posts
const post = require('../../model/post')
 //require('../../model/comment')

//Upload
//without this multer store upload, req.body will be empty
const store = require(_root+'/backend/config/file-upload').single('posts')



exports.index = (app)=>{

 //All routes
  app.get('/post',async (req,res)=>{
   const _post = await post.find().sort({'createdAt':-1})
    res.send({data:_post})
    console.log(_post)
  })

 //Add post
  app.post('/post/add',store.single('image'),async(req,res)=>{
    
   //form data gotten from client
   let form = {
       title:req.body.title,
       image_url:req.file.filename,
       content:req.body.content,
       author:req.body.userId,
       category:req.body.category,
       createdAt:new Date().toString(),
       views:0,
       published:true
   } 
   //create the post using post model instance
   const created = await post.create(form)
   if (created){
    res.send({status:200})
   }
  })

 //View post
  app.get('/post/view/:id',async (req,res)=>{
    //find and populate just like JOIN in sql
    post.findOne({_id:req.params.id})
    .populate({path: 'comments',
    populate: { path: 'replies' }}).exec(function(err,post){
        //edit views so that it will reflect to users
        post.views += 1
        //save post after population and edit
        post.save()
        res.send({data:post})
        
    })
        
    
  });
}