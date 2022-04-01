import * as CU from '@chakra-ui/react'
import * as RR from "react-router-dom"
import Nav from '../nav'
import React from 'react'
import * as MU from '@mui/material';
import * as CI from '@chakra-ui/icons'
const config = require('../config/config')

export default function App(props){
 
 const {data,loading,auth} = props;
 const [filtered,setFiltered] = React.useState([])
 
 React.useEffect(async()=>{
 }
 ,[])

 return(
  <>
  {
   //incase i need to revert

  /*
  <CU.Box 
  bgGradient='linear(to-l, #7928CA,#FF0080)'
  >
  <CU.Stack direction='row'>
  <Nav />
  </CU.Stack>

  <CU.Text
    px={2}
    color="#fff"
    fontSize='6xl'
    fontWeight='extrabold'
  >
  Latest Gist for you
  </CU.Text>
  
  <CU.HStack >
  
  {auth ?
  <CU.Button ml={2} my={2} onClick={
   ()=>{
    let dat = {name:"oluwa"}
    fetch('http://localhost:3500/droid', {
      method: 'POST',
      mode: 'cors', // this cannot be 'no-cors'
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(dat)})
   }
  }>
   Add post
  </CU.Button>
  
  : 
  
  <CU.Box ml={2} my={2} color="#fff">

  <RR.Link color="#fff" to="/">
   Login
  </RR.Link> 
  {" "}|{" "}
  <RR.Link color="#fff" to="/">
   Register
  </RR.Link>
  </CU.Box>
  }
  
  </CU.HStack>
 
  </CU.Box> */}

<CU.Container p={2}>

{/*
  <CU.Badge
    my={3}
    py={1}
    variant="subtle"
    colorScheme="green"
    >
    Latest
  </CU.Badge>
  
  */
  }

  {
   loading ?
   <CU.Box textAlign="center">
 <CU.CircularProgress isIndeterminate color='green.300' /></CU.Box>
  
  :

  <CU.List >
  {
  data.map((val,index)=>{
  return (
  <>
   <RR.Link to={"/post/view/"+val._id} >
   
   <CU.Stack direction="row" >
   <CU.Box  >
   <CU.Image h="90px" maxWidth="200px" w="100px" objectFit='cover' src={config.SERVER+'/posts/'+val.image_url} />
   </CU.Box>
   
   <CU.Box>
   <CU.Flex  py={2} key={index} 
     >
   <CU.Box>
   <CU.VStack>
   <CU.Text fontSize={17} noOfLines={2}>
   {val.title}
   </CU.Text>
   </CU.VStack>
   </CU.Box>
   </CU.Flex>
   
   <CU.Flex  >
    <CU.Box>
   <CU.VStack>
   <CU.Text color="#989898" fontSize={13}>
   {new Date(val.createdAt).toLocaleString()}
   </CU.Text>
   
   </CU.VStack>
   </CU.Box>
   <CU.Spacer/>
   {val.views > 20 && 
   <CU.Badge mr={2} variant="outline" colorScheme="red">
    Hot
  </CU.Badge>
   }
  <CU.Box color="#cd2148" fontSize={13} >
   {val.views} <CI.ViewIcon ml={2}/>
   </CU.Box>
   </CU.Flex>
   </CU.Box>
   
   </CU.Stack>
   
   </RR.Link>
   <CU.Divider my={2}/>
  </>
  )
  })
  }
  </CU.List>
  //end loading
  } 
  </CU.Container>
  </>
)
}