import * as CI from '@chakra-ui/icons'
import * as CU from '@chakra-ui/react'
import * as MU from '@mui/material';
import * as ML from '@mui/lab';
import * as MI from '@mui/icons-material';
import * as RR from "react-router-dom"
import axios from 'axios'
import Nav from '../nav'
import React from 'react'
import moment from 'moment';
const config = require('../config/config')

export default function App(){
 
 React.useEffect(()=>{
   
   
 return()=>{}
 },[])
 
 const fun1 =()=>{
  
 }

 const fun2 =()=>{
  
 }
 
 const fun3 =()=>{
  
 }
 return(
  <CU.Box>
  <CU.Box 
  bgGradient='linear(to-l, #7928CA,#FF0080)'
  >
  <Nav/>
  </CU.Box>
  
  {// if loading, show loading icon
   loading ?
   <CU.Box textAlign="center">
   <CU.CircularProgress isIndeterminate color='green.300' /></CU.Box>
  
  :// show data if not loading
  <CU.Container>
  <CU.Box>
  
  </CU.Box> 
  </CU.Container>
  //end if loading
  }
  </CU.Box>
)
}

/*
toast({
   position:'top',
   render:()=>Alert('success','ok','you got it')
  }) */