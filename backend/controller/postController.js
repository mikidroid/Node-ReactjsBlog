let path = require('path')
const dotenv = require('dotenv').config()
//Model for posts
const post = require('../model/post')
 //require('../../model/comment')
//const io = require('../config/socket-io')
//Upload
//without this multer store upload, req.body will be empty


 //All routes
  const Index = async(req,res)=>{
   const _post = await post.find().populate({path:'comments',populate:{path:'replies'}}).sort({'createdAt':1})
    res.send({data:_post})
  }

 //Add post
  const Create = async(req,res)=>{
   //form data gotten from client
   let form = {
       title:req.body.title,
       image_url:req.file.filename,
       content:req.body.content,
       rating:[],
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
  }

 //View post
  const View = async (req,res)=>{
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
  }
  
  
   //Add rating
   const Rating = async(req,res)=>{
    let rating = {
        value:req.body.value,
        username:req.body.username
    }
     _post = await post.findOne({_id:req.body.postId})
     // check if user rated b4
     //if so, do nothing and return success
     if(_post.rating.some(rate=>rate.username==rating.username)){
       res.send({status:401})
       //console.log(rating)
     }
     else{
     //else push rating
     _post.rating.push(rating)
     _post.save()
     res.send({status:200})
     }
  }
  

module.exports = {Index,Create,View,Rating}