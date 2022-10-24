import * as MU from '@mui/material';
import * as ML from '@mui/lab';
import * as MI from '@mui/icons-material';
import * as RR from "react-router-dom"
import axios from 'axios'
import Nav from '../nav'
import React from 'react'
import * as I from '@heroicons/react/24/outline'
import moment from 'moment';
const config = require('../config/config')

export default function App({data,name}){
 
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
   <>
    <div class="flex text-sm px-4 md:px-6 mt-3 md:mt-6 text-gray-500">
      <div><RR.Link to="/">Home</RR.Link></div>
      <I.ChevronDoubleRightIcon class="w-3 font-bold mx-1"/>
      {(data)?(
      <>
      <div>{data.category}</div>
      <I.ChevronDoubleRightIcon class="w-3 font-bold mx-1"/>
      <div class="truncate">{data.title}</div>
      </>
      ):(
      <div>{name}</div>
      )}
    </div>
   </>
)
}

/*
toast({
   position:'top',
   render:()=>Alert('success','ok','you got it')
  }) */