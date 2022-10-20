import * as CI from '@chakra-ui/icons'
import * as CU from '@chakra-ui/react'
import * as RR from "react-router-dom"
import Nav from '../nav'
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
    
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const [category, setCategory] = React.useState('')
const [image, setImage] = React.useState('')
const [title, setTitle] = React.useState('')

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
  
  const submit = () => {
     let formData = new FormData();
     formData.append('image',image)
     formData.append('content',convertDraft())
     formData.append('title',title)
     formData.append('category',category)
    axios.post(config.SERVER+'/post/add', formData)
      
  }
    
  React.useEffect(()=>{
   return()=>{}
  },[])
 
  const onEditorChange =(data)=>{
    setEditorState(data)
  }

  const fun2 =()=>{
     alert(editorState.toString())
  }
 
  const fun3 =()=>{
  
  }
  
  
 return(
  <CU.Box>
  <CU.Box 
     bgGradient='linear(to-l, #7928CA,#FF0080)'
  >
  <Nav title="Add Post"/>
  </CU.Box>
  <CU.Box px={3}>
  
  
   <CU.Input 
      placeholder="Title" 
      my={3} 
      mt={5}
      onChange={(e)=>{setTitle(e.target.value)}}/>
  
   <CU.Box borderWidth={2} >
  
   <Editor
     editorState={editorState}
     toolbarClassName="toolbarClassName"
     wrapperClassName="wrapperClassName"
     editorClassName="editorClassName"
     onEditorStateChange={onEditorChange}
     hashtag={{
      separator: ' ',
      trigger: '#',
    }}
    
    />
    
  </CU.Box>
  
  <CU.Select onChange={(e)=>{
   setCategory(e.target.value)
  }} my={3} mb={4} placeholder="Select category">
  
  {config.POST_CATEGORIES.map(cat=>
     <option value={cat.value}>
      {cat.name}
     </option>
   
  )}

  </CU.Select>
  
  <CU.FormControl mb={3}>
  <CU.FormLabel htmlFor="img" ml={2}> Add cover image </CU.FormLabel>
  <CU.Input p={1} id="img" variant="filled" type="file" onChange={imageSelect} placeholder="Image"  />
  </CU.FormControl>
  
  <CU.Button
    onClick={submit}
   mt={3} rightIcon={<CI.ArrowForwardIcon/>}>
  Make post
  </CU.Button>
  </CU.Box> 
  </CU.Box>
)
}

