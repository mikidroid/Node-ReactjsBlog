import * as CI from '@chakra-ui/icons'
import * as CU from '@chakra-ui/react'
import * as RR from "react-router-dom"
import { motion } from 'framer-motion'
import axios from 'axios'
import Nav from '../nav'
import React from 'react'
import Replies from './replies'
import CreateReply from './reply-modal'
import moment from 'moment';
import io from "socket.io-client"
const config = require('../config/config')
const socket = io.connect(config.SERVER)

export default function App(props){
 
 
 const [name,setName] = React.useState('');
 const [content,setContent] = React.useState('');
 const [email,setEmail] = React.useState('');
 const {comments,postId} = props;
 const [reply_count,setReply_count] = React.useState('');
 const auth = {username:"droid",email:"mikimediaa@gmail.com"}
 
 React.useEffect(async()=>{
  let rep =0
  comments.forEach(co=>{
   rep +=co.replies.length
   setReply_count(rep)
  })
 return()=>{}
 },[])
 
 const addComment =()=>{
     //Notification.requestPermission()
     //const not = new Notification("New comment")
     let formData = new FormData();
     formData.append('name',name)
     formData.append('email',email)
     formData.append('postId',postId)
     formData.append('content',content)
    
    // Api fuction
     axios.post(config.SERVER+'/comment/add',formData).then((r)=> window.location="/")
     
 }

 const like =(val,val2)=>{
   let data = {
       username:auth.username,
       type:val,
       commentId:val2}
       
    axios.post(config.SERVER+'/comment/reaction',data).then(r=>{
        //alert("comment liked!")
    })
 }
 
 const unLike =(val,val2)=>{
    let data = {
       username:auth.username,
       type:val,
       commentId:val2}
       
    axios.post(config.SERVER+'/comment/reaction/unlike',data).then(r=>{
        //alert("comment unliked!")
    })
 }
 
 const fun3 =()=>{
  
 }
 return(
  <>
  <CU.Divider my={3}/>
  <CU.Box my={3} m={1}>
  
  <CU.Text bgClip="text" bgGradient={`linear(to-l, ${config.PRIMARY_GRADIENT.LEFT},${config.PRIMARY_GRADIENT.RIGHT})`} fontWeight="bold">
   Comments
  </CU.Text>
 
  <CU.Box my={2}>
  
   <CU.Input type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)} my={2} />
  
   <CU.Input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} my={2} />
  
  <CU.Textarea my={2} type="text" placeholder="Start typing comment here..." onChange={(e)=>setContent(e.target.value)} />
  
  <CU.Button rightIcon={<CI.ArrowForwardIcon />}  my={2} bgGradient={`linear(to-l, ${config.PRIMARY_GRADIENT.LEFT},${config.PRIMARY_GRADIENT.RIGHT})`} colorScheme="white" onClick={addComment}>
  Add comment
  </CU.Button>
  
  </CU.Box> 
  
  
 <CU.Accordion allowToggle>
  <CU.AccordionItem>
  <h2>
  <CU.AccordionButton background="none" outline='none' border='none'>
  <CU.Box flex={1} textAlign="left">
  All comments ({comments && comments.length+reply_count})
  </CU.Box>
  <CU.AccordionIcon/>
  </CU.AccordionButton>
  </h2>
  <CU.AccordionPanel>
 
 <CU.Box my={3}>
  
  <CU.List >
  { 
  comments &&
  comments.map((val,index)=>{
  return (
  <>
   
   <CU.Stack direction="row" mt={3} p={1}>
   
   <CU.Box  >
   <CU.Image h="30px" maxWidth="30px" w="30px" objectFit='cover' borderRadius="full" src="/avatar.png" />
   </CU.Box>
   
   <CU.Box w="100%" >
   
   <CU.Stack borderRadius={20} lineHeight={1}  bgColor="#efefef" p={3}>
   <CU.Text fontWeight="bold" fontSize={15}>
   {val.name}
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
   
   {val.replies && 
   <Replies replies={val.replies}/> 
    }
   </CU.Box>
   
   </CU.Stack>
    
  
   </>
   )})}
   </CU.List>
  
  </CU.Box>
 
  </CU.AccordionPanel>
  </CU.AccordionItem>
  </CU.Accordion>
  
  </CU.Box>
  
  </>
)
}