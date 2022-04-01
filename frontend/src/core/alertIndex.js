import * as CU from '@chakra-ui/react'
import * as RR from "react-router-dom"
import Nav from '../nav'
import React from 'react'
import Alert from '../core/alert'
const config = require('../config/config')

export default function App(){
 const toast = CU.useToast()
 
 toast({
   position:'top',
   title:"hi am here",
   status: "success",
    description:"folloe"
  }) 
 
}
 