import * as IM from '@mui/icons-material';
import * as CU from '@chakra-ui/react'
import * as RR from "react-router-dom"
import axios from 'axios'
import Nav from '../nav'
import React from 'react'
import moment from 'moment';
import io from "socket.io-client"
import CreateReply from './reply-modal'
import ReactionModal from './reaction-modal'
const config = require('../config/config')
const socket = io.connect(config.SERVER)

export default function App(props){
 const [auth,setAuth]=React.useState(localStorage.getItem('token')?true:false)
 const [user,setUser]=React.useState(auth?JSON.parse(localStorage.getItem('user')):null)
 const [name,setName] = React.useState('');
 const [content,setContent] = React.useState('');
 const [email,setEmail] = React.useState('');
 const {replies,postId} = props;
 const nav = RR.useNavigate()
 //const auth = {username:"droid",email:"mikimediaa@gmail.com"}
 
 React.useEffect(async()=>{
  
 return()=>{}
 },[])
 
 

 const like =(type,replyId)=>{
   if(!auth) {return alert("You need to login first!")}
   let data = {
       username:user?.username || 'anonymous',
       type:type,
       replyId:replyId}
       
    axios.post(config.SERVER+'/reply/reaction',data).then(r=>{
      
    }).catch(err=>alert(err))
 }
 
 const unLike =(type,replyId)=>{
   if(!auth) {return alert("You need to login first!")}
   let data = {
       username:user?.username || 'anonymous',
       type:type,
       replyId:replyId}
       
    axios.post(config.SERVER+'/reply/reaction/unlike',data).then(r=>{
      
    }).catch(err=>alert(err))
 }
 
 const fun3 =()=>{
  
 }
 return(
  <>

  
  <div class="ml-8">
  
  <ul>
  { 
  replies &&
  replies.map((val,index)=>{
  return (
  <>
   
   <div class="flex mt-3 p-1">
   
   <div>
   <img class="h-30 mt-1 m-w-[30px] w-[30px] object-cover rounded-full" src="/avatar.png" />
   </div>
   
   <div class="w-full ml-1" >
   
   <div class="rounded-[20px] line-height-1 bg-gray-50 py-1 pb-2 px-4">
   <div class="font-normal text-[15px]">
   {val.name} {' '} <b><i>{'@'+val.receiver}</i></b>
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
   <button class="text-sm font-medium text-blue-600 ml-1" onClick={()=>{
     let fil = val.reaction.filter(r=>r.username==user?.username)
      unLike(fil[0].type,val._id)
   }} > 
   Like 
   </button>
   }
   
   <CreateReply className={"text-sm ml-2 font-medium ml-1"} reply={val}/>
   
   <div class="text-[12px] ml-2">
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
  
   </>
   )})}
   
   </ul>

  </div>
  
  </>
)
}


{/*

   <CU.Stack direction="row" mt={2} p={1}>
   
   <CU.Box  >
   <CU.Image h="30px" borderRadius="full" maxWidth="30px" w="30px" objectFit='cover' src="/avatar.png" />
   </CU.Box>
   
   <CU.Box w="100%" >
   
   <CU.Stack borderRadius={20} lineHeight={1}  bgColor="#efefef" p={3}>
   <CU.Text fontWeight="normal" fontSize={15}>
   {val.name} {' '} <b><i>{'@'+val.receiver}</i></b>
   </CU.Text>
    <CU.Text fontSize={14}>
   {val.content}
   </CU.Text>
   </CU.Stack>
   
   <CU.HStack mx={2}>
   <CU.Text fontSize={14}>{moment(val.createdAt).fromNow(true)} </CU.Text>
  {!val.reaction.some(reac=>reac.username==auth.username) ?
   <CU.Button onClick={()=>{
      like('like',val._id)
   }} variant="link" size="sm"> Like </CU.Button> :
     <CU.Button onClick={()=>{
     let fil = val.reaction.filter(r=>r.username==auth.username)
      unLike(fil[0].type,val._id)
   }} variant="link" size="sm"> Unlike </CU.Button>
   }
   <CreateReply comment={val}/>
   <CU.Text fontSize={12}>👍 ❤️</CU.Text>
   <CU.Text fontSize={14}> {val.reaction.length} </CU.Text>
   </CU.HStack>
   
   </CU.Box>
   
   </CU.Stack>
   
   */}