import * as CU from '@chakra-ui/react'
import * as RR from "react-router-dom"
import Nav from './nav'
import React from 'react'
import Home from './pages/home';
import ViewPost from './post/view-post';
import AddPost from './user/add-post';
import { BrowserRouter,Routes,Route } from "react-router-dom";

export default function App(){
 const auth=false
 
 React.useEffect(()=>{
   
 })

 return(
  <RR.BrowserRouter>
  <RR.Routes>
  <RR.Route path="/" element={<Home/>} />
  <RR.Route path="/post">
  <RR.Route path="add-post" element={<AddPost/>}/>
  <RR.Route path="view/:id" element={<ViewPost/>}/>
  </RR.Route>
  
  
  <RR.Route path="*" element={
         <main style={{ padding: "1rem" }}>
          <p>Baba, no content here!</p>
        </main>
  } />
  </RR.Routes>
  </RR.BrowserRouter>
)
}