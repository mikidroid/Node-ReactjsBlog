import * as CI from '@chakra-ui/icons'
import * as CU from '@chakra-ui/react'
import * as RR from "react-router-dom"
import Nav from '../nav'
import Category from '../core/category'
import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom';
import 'draft-js/dist/Draft.css';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
const config = require('../config/config')

export default function App(){
  const nav = RR.useNavigate()
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const [category, setCategory] = React.useState(null)
  const [categories, setCategories] = React.useState([])
  const [image, setImage] = React.useState(null)
  const [title, setTitle] = React.useState(null)
  const [loading,setLoading] = React.useState(false)

  React.useEffect(async()=>{
     setLoading(true)
     setCategories(await fetchCategory())
     setLoading(false)
   return()=>{}
  },[])

  const convertDraft = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent())
    const converted = draftToHtml(
       rawContentState)
    return converted
  }
  
  const imageSelect = (e) =>{
   const file = e.target.files[0]
    setImage(file)
  }
  
  const fetchCategory = React.useCallback(async ()=>{
    let cat = null
    await fetch(config.SERVER+'/category').then(r=>r.json()).then(r=> {cat = r.data})
    return cat
  },[])
  
  const submit = () => {
     let formData = new FormData();
     if(image==null || title==null){
       alert(" Please complete details!")
       return
     }
     formData.append('image',image)
     formData.append('content',convertDraft())
     formData.append('title',title)
     formData.append('category',category)
     axios.post(config.SERVER+'/post/add', formData)
    .then(r=> nav('/'))
    .catch(e=>alert(e.message))
  }
    
  const onEditorChange =(data)=>{
    setEditorState(data)
  }

  const fun2 =()=>{
     alert(editorState.toString())
  }
 
  const fun3 =()=>{
  
  }
  
  
 return(
  loading? <div>Loading...</div>:
  (
  <div class="md:flex lg:container justify-center md:mx-auto">
 
  <div class="md:w-2/3 mt-4 px-3 py-6 md:grow-0 bg-gray-50 md:mx-2"> {/* Div for New post */}
   <input 
      placeholder="Title" 
      class="rounded-lg p-2.5 block w-full bg-gray-50 border border-gray-300 focus:ring-blue-300 focus:border-blue-300"
      onChange={(e)=>{setTitle(e.target.value)}}/>
       
   <div class="mt-4 bg-gray-100 border border-l-gray-300 rounded-b-md border-r-gray-300 border-b-gray-500">
  
   <Editor
     editorState={editorState}
     toolbarClassName="enter classes"
     wrapperClassName="enter classes"
     editorClassName="px-2"
     onEditorStateChange={onEditorChange}
     hashtag={{
      separator: ' ',
      trigger: '#',
    }}
    
    />
    
  </div>
  
  <div class="mt-4">
  <label class="text-sm text-gray-500" for="category">
   Select Category
  </label>
  
  <select class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-2" onChange={(e)=>{
   setCategory(e.target.value)
  }} placeholder="Select category">
  
  {categories.map(cat=>
     <option value={cat.title}>
      {cat.title}
     </option>
   
  )}
  </select>
  </div>
  
  <div class="mt-4">
  <label htmlFor="img" class="text-gray-500 text-sm"> Add cover image </label>
  <input class="p-2.5 w-full rounded-lg bg-gray-100" id="img" variant="filled" type="file" onChange={imageSelect} placeholder="Image"  />
  </div>
  
  <button
    onClick={submit}
   class="focus:ring-1 focus:ring-blue-900/50 focus:ring-offset-2 mt-3 rounded-xl text-blue-900/80 w-full p-2.5 bg-gradient-to-r from-blue-700/20 to-pink-400/10">
  Make post
  </button>
  </div> 
  

  <div class="md:w-1/3 mt-6 md:mt-4 md:grow-0 px-3 py-6 md:mx-2 bg-gray-50">
    <Category category={categories}/>
  </div>
  </div>)
)
}

