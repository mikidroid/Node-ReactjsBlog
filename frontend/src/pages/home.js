import * as MU from '@mui/material';
import * as ML from '@mui/lab';
import * as MI from '@mui/icons-material';
import * as RR from "react-router-dom"
import axios from 'axios'
import Nav from '../nav'
import React from 'react'
import moment from 'moment';
import Posts from '../post/posts.js'
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
 <div class="max-w-[1340]">
 <div class="md:container md:mx-auto md:px-16 px-4">
  <Posts/>
 </div>
 </div>
)
}

/*
toast({
   position:'top',
   render:()=>Alert('success','ok','you got it')
  }) */