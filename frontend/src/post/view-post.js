import * as CU from '@chakra-ui/react'
import * as RR from "react-router-dom"
import * as IM from '@mui/icons-material';
import Nav from '../nav'
import axios from 'axios'
import React from 'react'
import Alert from '../core/alert'
import Comments from '../core/comments'
import moment from 'moment';
import Rating from 'react-rating'
import Breadcrumbs from '../core/breadcrums'
import io from "socket.io-client"
import * as I from '@heroicons/react/24/outline'
const config = require('../config/config')
const socket = io.connect(config.SERVER)

export default function App(){
 const [auth,setAuth]=React.useState(localStorage.getItem('token')?true:false)
 const [user,setUser]=React.useState(auth?JSON.parse(localStorage.getItem('user')):null)
 const location = RR.useLocation()
 const [data,setData]=React.useState({})
 const [content,setContent]=React.useState('')
 const [RatingValue,setRatingValue]=React.useState(0)
 const {id} = RR.useParams()
 const toast = CU.useToast()
 const [loading,setLoading] = React.useState(true);
 
 //Converts editor data to Html
 const conv = (html)=>{
   let replaceHtml = html.replace('<p></p>','<br>')
   return replaceHtml
 }
 
 React.useEffect(async()=>{
   //get realtime data for reaction
 /*  socket.on("reaction",(soc)=>{
     fetch(config.SERVER+'/post/view/'+id).then(r=>r.json()).then(r=>{
     setData(r.data)
     setContent(conv(r.data.content))
     })
   })*/
  //get single post data
  getData()
 },[])
 
 const sharePost=()=>{
   if(!navigator.canShare){
     alert("Sorry, cant share post")
   }
   try{
     navigator.share({
       title:'Scandal Blog',
       text: (data.title.slice(0,60)+'...\n'),
       url: location.pathname,
     })
   }catch(err){
     alert(err)
   }
 }
 
 const getData = () =>{
   fetch(config.SERVER+'/post/view/'+id).then(r=>r.json()).then(r=>{
     setData(r.data)
     setContent(conv(r.data.content))
     setLoading(false)
   })
 }
 
 //calculate rating function
 const calRating= () =>{
    if(data.rating.length > 0)
    {
    const _calRating = data.rating.map(val=>val.value).reduce((a,b)=>a+b,0)
    const getPercent = _calRating/data.rating.length
   return parseFloat(getPercent).toFixed(1)
    }
    else{
     return 0
    }
    
 }
 
 const checkRating = () =>{
    return data.rating.some(r=>r.username==user?.username)
 }
 
 const onRate = (val) => {
    let rateData = {
      username:user?.username,
      value:val,
      postId:data._id
    }
    axios.post(config.SERVER+'/post/rating',rateData)
    .then(r=>{
        alert("Ratings changed!")
        window.location.reload()
      })
    .catch(err=>{
        alert("error!")})
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
   <div class="md:container bg-center bg-cover md:mx-auto">
   
   {/*Breadcrumbs*/}
   <Breadcrumbs data={data} />
   
   {/*Image and title */}
   <img class="mt-6 md:mt-8 object-cover" style={{
     height:200,
     width:'100%'
   }} src={config.SERVER+'/posts/'+data.image_url}/>
   
   <h3 class="md:text-center text-gray-600 text-3xl font-bold mt-6 md:mt-8 px-3 md:px-6">
     {data.title} 
   </h3>
   
   <div class="md:text-center md:flex md:justify-center text-gray-500 font-light text-sm mt-3 md:mt-5 px-3 md:px-6">
     <div>Modified • {moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')} </div><div class=" md:ml-2 font-medium text-underline">By <span class="text-red-600"> {auth?user.username:'Anonymous'}</span></div>
   </div>
   
   {/*Socials    */ }
   <div class="flex md:justify-center md:text-center mt-6 md:mt-8 px-3 md:px-6">
    <RR.Link to="/">
    <div class="rounded-full ring-1 ring-blue-900/50 flex text-sm text-blue-900/90 bg-blue-100/50 px-3 py-2">
    {/*<IM.Twitter sx={{mr:0.2,fontSize:18}}/> */}
    <IM.Facebook sx={{mr:0.4,fontSize:18}}/> 
    {/*<IM.Instagram sx={{mr:0.4,fontSize:18}}/> */}
      Follow Us
    </div >
    </RR.Link>
    <div onClick={sharePost} class="ml-2 ring-1 ring-blue-900/50 flex text-sm rounded-full text-blue-900/90 bg-blue-100/50 px-3 py-2">
    <I.ArrowsRightLeftIcon class="w-4 mr-1"/> Share
    </div>
    <div class="ml-2 flex ring-1 ring-blue-900/50 text-sm rounded-full text-blue-900/90 bg-blue-100/50 px-3 py-2">
    <I.ChatBubbleLeftEllipsisIcon class="w-4 mr-1" />
      Comment
    </div>
   </div>
   
   {/*Content    */}
   <div class="mt-6 md:mt-8 px-3 md:px-6" dangerouslySetInnerHTML={{__html:content}} >
   </div>
   
   {/*Comments*/}
   <Comments customClass={"mb-9 mt-6"} postId={data._id} comments={data.comments} />
   
   </div>
  </>
  )}
  </>
)
}