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
import BlogList from '../core/blog-list'
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
 // Fetch data
 const fetchData =()=>{
   fetch(config.SERVER+'/post').then(r=>r.json()).then(r=>{
     let val = r.data.splice(0,5)
     setData(val)
     setLoading(false)
   })
 }
 
 //filter hotest post
 const filterHotest =()=>{
     let _data = data.filter(r=>r.views>=config.POPULAR_POST_COUNT)
      return _data
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
  <section>

  <div class="mt-8">
      <div class="flow-root">
       <ul role="list" class="-my-6 divide-y divide-gray-200">
        {data.map(post=>{ 
        return( 
          <RR.Link to={'/post/view/'+post._id}>
              <li class="flex mt-6 md:mt-8">
              <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img src={config.SERVER+'/posts/'+post.image_url} alt="post image" class="h-full w-full object-cover object-center" />
                </div>

              <div class="ml-4 flex flex-1 flex-col">
              <div>
                <div class="flex justify-between text-sm font-basic text-gray-900">
                  <h3>
                  <RR.Link to={'/post/view/'+post._id}>{post.title}</RR.Link>
                  </h3>
                 </div>

              </div>
                <div class="flex flex-1 items-end justify-between text-xs mt-3">
                 <p class="flex text-gray-500">
                 <I.ClockIcon class="w-4 mr-1"/>{moment(post.createdAt).fromNow()}
                 </p>

               <div class="flex text-xs">
               <I.ChatBubbleLeftEllipsisIcon class="w-4 mr-1"/>
                  {post.comments.length}
               </div>
               </div>
              </div>
              </li>
            </RR.Link>
            )})}
           </ul>
           </div>
           </div>
           
  </section>
  </>
  )}
</>
)
}