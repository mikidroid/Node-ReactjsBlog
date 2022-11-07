import * as React from 'react';
import * as MU from '@mui/material';
import * as ML from '@mui/lab';
import * as MI from '@mui/icons-material';
import * as I from '@heroicons/react/24/outline'
import * as RR from "react-router-dom"
//import socket io
import io from "socket.io-client"
import axios from 'axios'
import Nav from '../nav'
import moment from 'moment';
import BlogListWithThumbnail from '../core/blog-list-with-thumbnail'
const config = require('../config/config')
const socket = io.connect(config.SERVER)
const calRating = require('../modules/cal-rating')

export default function App () {
 
 const auth=false
 const [loading,setLoading] = React.useState(true);
 const [data,setData]=React.useState([])

 //UseEffect
 React.useEffect(()=>{
  socket.on("reaction",(r)=>{
   alert(r)
  })
  //all posts
  fetchData()
 
 },[])
 

 // Fetch data
 const fetchData =()=>{
   fetch(config.SERVER+'/post').then(r=>r.json()).then(r=>{
     let val = r.data.splice(0,5)
     setData(val)
     setLoading(false)
   })
 }
 
 
return(
  <>
  {loading?
  (
    <div>
    loading..
    </div>
  ):
  (
  <>
  
  <div>
  
  <div class="md:m-1 mt-4 md:mt-8">
  <BlogListWithThumbnail subtitle="24h Top News" title="Hottest" icon="🔥" amount={5} filter="hottest" data={data}/>
  </div>
  
   <div class=" h-2 mt-8 mb-4 md:mt-10 mb-6 bg-gray-100"></div>

  <div class="md:m-1 mt-4 ">
  <BlogListWithThumbnail icon="⏱️" title="Latest News" amount={10} data={data}/>
  </div>
  
  </div>
  </>
  )}
</>
)
}