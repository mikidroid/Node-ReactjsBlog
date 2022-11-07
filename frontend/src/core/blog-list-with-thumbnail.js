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
const config = require('../config/config')
const socket = io.connect(config.SERVER)
const calRating = require('../modules/cal-rating')

export default function App ({title,subtitle,icon,data,amount,filter,category}) {
 
 const [content,setContent]=React.useState([])

 //UseEffect
 React.useEffect(()=>{
   //all posts
  fetchData()
  
  if(category){
    setContent(filterCategory())
  }
  if(filter){
    if(filter=="hottest"){
      setContent(filterHottest())
    }
  }
  

 
 },[])
 
 //filter all categories post
 const filterCategory =()=>{
     let _data = data.filter(r=>r.category==category).slice(0,amount)
      return _data
 }
 // Fetch data
 const fetchData =()=>{
     let val = data.slice(0,amount)
     setContent(val)
 }
 
 //Cal comments
 const calComments =(comments)=>{
      //Map through each comnent and push reply length of each comment
     let replyLength = comments.map(c=>c.replies.length)
     let comLength = comments.length
     //add up all mapped reply length using reduce
     let reduceReply = replyLength.reduce((p,n)=>p+n,0)
     /*Add and return comment length with reply
      *length
      */
      return comLength + reduceReply
 }
 
 //filter hotest post
 const filterHottest =()=>{
     let _data = data.filter(r=>r.views>=config.POPULAR_POST_COUNT).slice(0,amount)
     _data.sort((a,b)=>b.views-a.views)
     return _data
 }
 
return(

  <>
  <div>
      <div class="flow-root">
      <div class="text-lg text-gray-800 font-bold ">
       {icon} {title} <span class="ml-2 text-gray-400 md:ml-4 text-sm font-medium">{subtitle&&subtitle}</span>
      </div>
      <hr class="mt-2"/>
       <ul role="list" class=" divide-y divide-gray-200">
        {content.map(post=>{ 
        return( 
          <RR.Link to={'/post/view/'+post._id}>
              <li class="flex mt-6 md:mt-8">
              <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img src={config.SERVER+'/posts/'+post.image_url} alt="post image" class="h-full w-full object-cover object-center" />
                </div>

              <div class="ml-4 flex flex-1 flex-col">
              <div>
                <div class="flex line-clamp-3 justify-between text-sm font-basic text-gray-900">
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
               <I.EyeIcon class="w-4 mr-1"/>
               {post.views}
               <I.ChatBubbleLeftEllipsisIcon class="w-4 ml-2 mr-1"/>
                  {calComments(post.comments)
                  }
               </div>
               </div>
              </div>
              </li>
            </RR.Link>
            )})}
           </ul>
           </div>
           </div>
           
  </>
)
}