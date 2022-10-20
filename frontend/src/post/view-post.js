import * as CU from '@chakra-ui/react'
import * as RR from "react-router-dom"
import * as CI from '@chakra-ui/icons'
import Nav from '../nav'
import axios from 'axios'
import React from 'react'
import Alert from '../core/alert'
import Comments from '../core/comments'
import moment from 'moment';
import Rating from 'react-rating'
import io from "socket.io-client"
const config = require('../config/config')
const socket = io.connect(config.SERVER)

export default function App(){
 const auth=false
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
   socket.on("reaction",(soc)=>{
     fetch(config.SERVER+'/post/view/'+id).then(r=>r.json()).then(r=>{
     setData(r.data)
     setContent(conv(r.data.content))
     })
   })
  //get single post data
  getData()
   
 },[])
 
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
    return data.rating.some(r=>r.username=="mikey")
 }
 
 const onRate = (val) => {
    let da = {
      username:"mikey",
      value:val,
      postId:data._id
    }
    axios.post(config.SERVER+'/post/rating',da)
    .then(r=>{
      if(r.data.status==200){
        alert("Ratings changed!")
        window.location.reload()
      }
      else{
       alert("error!")}
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
   <div class="md:container bg-center bg-cover md:mx-auto h-40" style={{backgroundImage:`url(${config.SERVER}/posts/${data.image_url})`}}>
   <h3 class="text-center text-white text-3xl font-bold pt-10 shadow-lg">
     {data.title} 
   </h3>
   </div>
  </>
  )}
  </>
)
}