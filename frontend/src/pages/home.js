import * as React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import * as CI from '@chakra-ui/icons'
import * as CU from '@chakra-ui/react'
import * as MU from '@mui/material';
import * as ML from '@mui/lab';
import * as MI from '@mui/icons-material';
import * as RR from "react-router-dom"
//import socket io
import io from "socket.io-client"
import axios from 'axios'
import Nav from '../nav'
import moment from 'moment';
import BlogList from '../core/blog-list'
const config = require('../config/config')
const socket = io.connect(config.SERVER)


export default function App () {
 
 const auth=false
 const [loading,setLoading] = React.useState(true);
 const [data,setData]=React.useState([])

 
 React.useEffect(()=>{
  socket.emit("display","mike is online")
  socket.on("show",(r)=>{
   alert(r)
  })
   fetch('http://localhost:3500/post').then(r=>r.json()).then(r=>{
    let val = r.data.splice(0,5)
    setData(val)
    setLoading(false)
     socket.on("post",(soc)=>{
       alert(soc)
     })
   })
 },[])
 
 //filter all categories post
 const filterData =(category)=>{
    if(category){
     let _data = data.filter(r=>r.category==category)
      return _data
    }
    else{
      return data
    }
 }
 
 //filter hotest post
 const filterHotest =()=>{
    
     let _data = data.filter(r=>r.views>=config.POPULAR_POST_COUNT)
      return _data
 }
 
return(
  <>
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
 
  </CU.Box>
<Tabs>
  <TabList overflowY="auto">
    <Tab>Latest</Tab>
    <Tab>Hot</Tab>
    <Tab>Naija</Tab>
    <Tab>Africa</Tab>
    <Tab>World</Tab>
    <Tab>New</Tab>
    <Tab>Africa</Tab>
    <Tab>World</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
      <BlogList loading={loading} data={filterData()} />
    </TabPanel>
    <TabPanel>
      <BlogList loading={loading} data={filterHotest()} />
    </TabPanel>
    <TabPanel>
      <BlogList loading={loading} data={filterData('naija')} />
    </TabPanel>
    <TabPanel>
      <BlogList loading={loading} data={filterData('africa')} />
    </TabPanel>
      <TabPanel>
      <BlogList loading={loading} data={filterData('world')} />
    </TabPanel>
  </TabPanels>
</Tabs>


  </>
)

}