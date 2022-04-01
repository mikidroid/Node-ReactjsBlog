import * as CI from '@chakra-ui/icons'
import * as CU from '@chakra-ui/react'
import * as RR from "react-router-dom"
import Nav from '../nav'
import React from 'react'
const config = require('../config/config')

export default function App(status,title,content){
 
 
 React.useEffect(()=>{
   
 return()=>{}
 },[])
 
 return(
    <CU.Alert status={status}>
  <CU.AlertIcon />
  <CU.Box flex='1'>
    <CU.AlertTitle>{title}</CU.AlertTitle>
    <CU.AlertDescription display='block'>
      {content}
    </CU.AlertDescription>
  </CU.Box>
</CU.Alert>
)
}