import * as CI from '@chakra-ui/icons'
import * as CU from '@chakra-ui/react'
import * as RR from "react-router-dom"
import axios from 'axios'
import Nav from '../nav'
import React from 'react'
import moment from 'moment';
import CreateReply from './reply-modal'
const config = require('../config/config')

export default function App(props){
 
 const [name,setName] = React.useState('');
 const [content,setContent] = React.useState('');
 const [email,setEmail] = React.useState('');
 const {replies,postId} = props;
 const auth = {username:"droid",email:"mikimediaa@gmail.com"}
 
 React.useEffect(async()=>{
  
 return()=>{}
 },[])
 
 

 const like =(val,val2)=>{
   let data = {
       username:auth.username,
       type:val,
       replyId:val2}
       
    axios.post(config.SERVER+'/reply/reaction',data).then(r=>{
        alert("comment liked!")
    })
 }
 
 const unLike =(val,val2)=>{
  
   let data = {
       username:auth.username,
       type:val,
       replyId:val2}
       
    axios.post(config.SERVER+'/reply/reaction/unlike',data).then(r=>{
        alert("comment unliked!")
    })
 }
 
 const fun3 =()=>{
  
 }
 return(
  <>

  
  <CU.Box ml={3}>
  
  <CU.List >
  { 
  replies &&
  replies.map((val,index)=>{
  return (
  <>
   
   <CU.Stack direction="row" p={1}>
   
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
    
  
   </>
   )})}
   
   </CU.List>

  </CU.Box>
  
  </>
)
}