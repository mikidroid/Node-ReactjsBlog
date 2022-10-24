import * as IM from '@mui/icons-material';
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

export default function Index({children,comments}){
  
  const [showComments,setShowComments] = React.useState(false)
  
  return(
  <>
  <div>

  <h2 class="mx-2 mt-12 md:16">
    <button onClick={()=>setShowComments(!showComments)} type="button" class="flex items-center justify-between w-full p-5 font-medium text-left border border-b-0 border-gray-200 rounded-t-xl focus:ring-2 focus:ring-gray-200" >
      <span>Comments </span>
      <div>{showComments?(<IM.ExpandMore/>):(<IM.ExpandLess/>)}</div>
     
    </button>
  </h2>

  {showComments&&
  <div id="accordion-collapse-body-1" aria-labelledby="accordion-collapse-heading-1">
    <div class="px-3 py-1 mb-2 text-gray-500 font-light bg-white">
   {children}
    </div>
  </div>}
  
</div>

    </>
    )
}