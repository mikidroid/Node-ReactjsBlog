import * as CI from '@chakra-ui/icons'
import * as CU from '@chakra-ui/react'
import * as RR from "react-router-dom"
import axios from 'axios'
import Nav from '../nav'
import React from 'react'
import moment from 'moment';
const config = require('../config/config')

export default function App(props){
 
 const {onOpen, isOpen, onClose} = CU.useDisclosure()
 const {comment} = props;
 const [name,setName] = React.useState('');
 const [content,setContent] = React.useState('');
 const [email,setEmail] = React.useState('');
 
 React.useEffect(()=>{
   
   
 return()=>{}
 },[])
 
 const addReply =()=>{
  
     let formData = new FormData();
     
     formData.append('name',name)
     formData.append('receiver',comment.name)
     formData.append('email',email)
     formData.append('postId',comment.post)
     //means, if i am replying a reply, check for populated commentid inside reply instead of reply Id, else if i am replying a comment, use the normal comment ID passed.
     formData.append('commentId',comment.comment?comment.comment:comment._id)
     formData.append('content',content)
    
     axios.post(config.SERVER+'/reply/add',formData).then((r)=>alert("Reply added!"))
 }

 const fun2 =()=>{
  
 }
 
 const fun3 =()=>{
  
 }
 return(
  <CU.Box>
    <CU.Button onClick={onOpen} variant="link" size="sm"> Reply </CU.Button>
    <CU.Modal isOpen={isOpen} onClose={onClose}>
    <CU.ModalOverlay backdropFilter='blur(10px) hue-rotate(90deg)' bg="blackAlpha.300"/>
    <CU.ModalContent>
    <CU.ModalHeader>
    Replying <b>{comment.name}</b>
    </CU.ModalHeader>
    <CU.ModalCloseButton/>
    <CU.ModalBody>
    
   <CU.Box my={2}>
  
   <CU.Input type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)} my={2} />
  
   <CU.Input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} my={2} />
  
  <CU.Textarea my={2} type="text" placeholder="Start typing comment here..." onChange={(e)=>setContent(e.target.value)} />
  
  <CU.Button rightIcon={<CI.ArrowForwardIcon />}  my={2} bgGradient={`linear(to-l, ${config.PRIMARY_GRADIENT.LEFT},${config.PRIMARY_GRADIENT.RIGHT})`} colorScheme="white" onClick={addReply}>
  Reply {comment.name}
  </CU.Button>
  
  </CU.Box> 
    
    </CU.ModalBody>
    </CU.ModalContent>
    </CU.Modal>
  </CU.Box>
)
}

/*
toast({
   position:'top',
   render:()=>Alert('success','ok','you got it')
  }) */