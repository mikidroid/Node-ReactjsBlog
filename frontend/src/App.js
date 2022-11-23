import * as CU from '@chakra-ui/react'
import * as RR from "react-router-dom"
import Nav from './nav'
import './index.css'
import React from 'react'
import Home from './pages/home';
import ViewPost from './post/view-post';
import AddPost from './user/add-post';
import About from './pages/about';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import UserAuth from './route-middleware/user-auth'
import AdminAuth from './route-middleware/admin-auth'
import GuestAuth from './route-middleware/guest-auth'
import { BrowserRouter,Routes,Route } from "react-router-dom";

export default function App(){
 
 React.useEffect(()=>{
   
 })

 return(
  <RR.BrowserRouter>
   <RR.Routes>
   
   {/*Auth pages*/}
   <RR.Route element={<GuestAuth/>} > 
     <RR.Route path="/login" element={<Login/>} />
     <RR.Route path="/register" element={<Register/>} />
   </RR.Route>


   {/*User Auth*/}
   <RR.Route element={<UserAuth/>} > 
     <RR.Route path="/post/add-post" 
               element={<AddPost/>}/>
   </RR.Route>
    
    
   {/*Normal pages*/}
   <RR.Route path="/" element={<Home/>} />
   <RR.Route path="/post/view/:id" element={<ViewPost/>}/>
   <RR.Route path="/about" element={<About/>}/>
   <RR.Route path="*" element={
         <main style={{ padding: "1rem" }}>
          <p>Baba, no content here!</p>
        </main> } />
   </RR.Routes>
  </RR.BrowserRouter>
)
}