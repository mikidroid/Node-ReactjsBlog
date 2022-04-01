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
const config = require('../config/config')

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
  getData()
   
 },[])
 
 const getData = () =>{
   fetch('http://localhost:3500/post/view/'+id).then(r=>r.json()).then(r=>{
     setData(r.data)
     setContent(conv(r.data.content))
     setLoading(false)
   })
 }
 
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
  <CU.Box 
  bgGradient='linear(to-l, #7928CA,#FF0080)'
  >
  <CU.Stack direction='row'>
  <Nav />
  </CU.Stack>

  <CU.Text
    px={3}
    color="#fff"
    fontSize='4xl'
    fontWeight='normal'
    lineHeight={1}
    pb={5}
  >
  {data.title}
  </CU.Text>
  
  </CU.Box>

   {
    loading ?
   <CU.Box textAlign="center">
   <CU.CircularProgress isIndeterminate color='green.300' /></CU.Box>
  
  :
  
  <CU.Container>
  
  <CU.Stack mb={7} p={1} direction="column">
  
  <CU.Text >{moment(data.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}
  </CU.Text>
  
  <CU.HStack>
  { checkRating()
    ?
  <CU.Box mb={2} fontWeight="bold" >
   Rating: {calRating()}
  </CU.Box>
   :
    <CU.Box mb={2} fontWeight="bold" >
   Rate post:
  </CU.Box>
  }
  
  <Rating 
    fullSymbol={<CI.StarIcon mb={3} 
    color="#bcbc00" />} 
    emptySymbol={<CI.StarIcon mb={3} 
    color="#ddd"/>} 
    fractions={2} 
    onChange={onRate}
    initialRating={calRating()} 
    readonly={checkRating()} />
    
  </CU.HStack>
  
  <CU.HStack>
  <CU.Badge
    px={2}
    py={1}
    variant="solid"
    borderRadius={50}
    bgColor="#343434"
    color="#fff"
    >
    {data.category}
  </CU.Badge>
  
   {data.views > 20 && 
   <CU.Badge mr={2} variant="outline" colorScheme="red">
    Hot
  </CU.Badge>
   }
  
  <CU.Text
    
    >
    Views ({data.views})
    
  </CU.Text>
  </CU.HStack>
  
 <CU.Image objectFit='cover' src={config.SERVER+'/posts/'+data.image_url} />
 
 
  
  <CU.Box color="#676767" p={2} dangerouslySetInnerHTML={{__html:content}}
    >
    

  </CU.Box>
 
 
 {!loading &&

  <Comments comments={data.comments} postId={data._id} />

  }
 
     
  </CU.Stack>
  </CU.Container>
   }
  </>
)
}