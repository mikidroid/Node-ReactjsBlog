import * as IM from '@mui/icons-material';
import * as RR from "react-router-dom"
import { motion } from 'framer-motion'
import axios from 'axios'
import Nav from '../nav'
import React from 'react'
import Replies from './replies'
import CreateReply from './reply-modal'
import moment from 'moment';
import Accordion from './comments-accordion'
import io from "socket.io-client"
import ReactionModal from './reaction-modal'
const config = require('../config/config')
const socket = io.connect(config.SERVER)

export default function App({comments,postId,customClass}){
 
 const [auth,setAuth]=React.useState(localStorage.getItem('token')?true:false)
 const [user,setUser]=React.useState(auth?JSON.parse(localStorage.getItem('user')):null)
 const [name,setName] = React.useState('');
 const [content,setContent] = React.useState('');
 const [email,setEmail] = React.useState('');
 const [newComments, setNewComments] = React.useState(comments);
 const [reply_count,setReply_count] = React.useState('');
 const nav = RR.useNavigate()
 //const auth = {username:"droid",email:"mikimediaa@gmail.com"}
 
 React.useEffect(async()=>{
  let rep =0
  comments.forEach(co=>{
   rep +=co.replies.length
   setReply_count(rep)
  })
  
  socket.on("reply-added",(soc)=>{
    getData()
   })
   
   socket.on("comment-added",(soc)=>{
    getData()
   })
   
   socket.on("reaction",(soc)=>{
    getData()
   })
  
 return()=>{}
 },[])
 
 const getData = () =>{
   fetch(config.SERVER+'/comment/'+postId).then(r=>r.json()).then(r=>{
     setNewComments(r.data)
     //setLoading(false)
   })
 }
 
 const addComment =()=>{
     //Notification.requestPermission()
     //const not = new Notification("New comment")
     let formData = new FormData();
     formData.append('name',user?user.username:name)
     formData.append('email',user?user.email:email)
     formData.append('postId',postId)
     formData.append('content',content)
    
    // Api fuction
     axios.post(config.SERVER+'/comment/add',formData).then((r)=> window.location="/")
     
 }

 const like =(type,commentId)=>{
   if(!auth) {return alert("You need to login first!")}
   let data = {
       username:user?user.username:'anonymous',
       type:type,
       commentId:commentId}
       
    axios.post(config.SERVER+'/comment/reaction',data).then(r=>{
     
    }).catch(err=>alert(err))
 }
 
 const unLike =(type,commentId)=>{
   if(!auth) {return alert("You need to login first!")}
    let data = {
       username:user?user.username:'anonymous',
       type:type,
       commentId:commentId}
       
    axios.post(config.SERVER+'/comment/reaction/unlike',data).then(r=>{
     
    }).catch(err=>alert(err))
 }
 
 const fun3 =()=>{
  
 }
 return(
  <>
<div class="mt-12 h-2 bg-gray-50 md:16" />
  <div class="mt-12 md:16 m-1" >
  
  <div class="font-bold px-2 text-center text-gray-600">
   <div>Write a Comment...</div>
  </div>
 
  <div class="mt-3 mb-8 px-2">
  
  {!auth&& <><input type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)} class="mt-3 ring-1 ring-blue-200 rounded-md py-2 px-4 focus:ring-blue-200 w-full" />
  
   <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} class="mt-3 ring-1 ring-blue-200 rounded-md py-2 px-4 focus:ring-blue-200 w-full" /></>
  }
  <textarea id="comment" class="mt-3 ring-1 ring-blue-200 rounded-md py-2 px-4 focus:ring-blue-200 w-full" type="text" placeholder="Start typing comment here..." onChange={(e)=>setContent(e.target.value)} />
  
  <button class="w-full bg-blue-400 text-sm text-white py-2 px-3 rounded-xl mt-3 md:mt-5" onClick={addComment}>
  Add comment
  </button>
  </div> 
  
<div class="mt-12 h-2 bg-gray-50 md:16" />
<Accordion>
 <div class="mt-3">
  <ul >
  { 
  newComments &&
  newComments.map((val,index)=>{
  return (
  <>
   <div>
   <div class="flex mb-3 p-1">
   
   <div>
   <img class="h-30 mt-1 m-w-[30px] w-[30px] object-cover rounded-full" src="/avatar.png" />
   </div>
   
   <div class="w-full ml-1" >
   
   <div class="rounded-[20px] line-height-1 bg-gray-50 py-1 pb-2 px-4">
   <div class="font-bold text-[15px]">
   {val.name}
   </div>
    <div class="text-[14px]">
   {val.content}
   </div>
   </div>
   
   <div class="flex mx-2 items-center">
   <div class="text-[14px]">{moment(val.createdAt).fromNow(true)+' ago •'} </div>
  {!val.reaction.some(reac=>reac.username==user?.username) ?
   (<>
   
   <ReactionModal className={"text-sm font-medium ml-2"} title="Like">
     <div class="flex items-center">
       <IM.Recommend 
        onClick={()=>{like('like',val._id)}} 
        sx={{fontSize:35,ml:0.3,color:'#1260ED'}}/>
       <button 
        onClick={()=>{like('heart',val._id)}} 
        class="ml-3 text-2xl">
        ❤️</button>
       <button 
        onClick={()=>{like('care',val._id)}} 
        class="ml-3 text-2xl">
        🥰</button>
       <button 
        onClick={()=>{like('laugh',val._id)}} 
        class="ml-3 text-2xl">
        😂</button>
       <button 
        onClick={()=>{like('hate',val._id)}} 
        class="ml-3 text-2xl">
        😡</button>
     </div>
   </ReactionModal>
   </>
   ) :
   <button class="text-sm font-medium text-blue-600 ml-2" onClick={()=>{
     let fil = val.reaction.filter(r=>r.username==user?.username)
      unLike(fil[0].type,val._id)
   }} > 
   Like 
   </button>
   }
   
   <CreateReply className={"text-sm ml-2 font-medium "} comment={val}/>
   
   <div class="text-[12px] ml-1">
   {val.reaction.some(r=>r.type=='like')&&(
   <IM.Recommend sx={{fontSize:16,ml:0.3,color:'#1260ED'}}/>
   )}
   {val.reaction.some(r=>r.type=='heart')&&('❤️')}
   {val.reaction.some(r=>r.type=='care')&&('🥰')}
   {val.reaction.some(r=>r.type=='laugh')&&('😂')}  
   {val.reaction.some(r=>r.type=='hate')&&('😡')}
  
   </div>
   <div class="text-[14px] ml-1"> {val.reaction.length>0 && val.reaction.length} </div>
   </div>
  
   </div>
   </div>
   
   <div>
   {val.replies && 
   <Replies replies={val.replies}/> 
    }
   
   </div>
   </div>
  
   </>
   )})}
   </ul>
  
  </div>
 
</Accordion>
  
  </div>
  
  </>
)
}