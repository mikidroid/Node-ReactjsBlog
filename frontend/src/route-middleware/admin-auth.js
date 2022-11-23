import React from 'react'
import { Outlet,Navigate } from "react-router-dom";

export default function App(){
  const auth = localStorage.getItem('token')
  const adminAuth = localStorage.getItem('admin')
 
return(
  <>
   {adminAuth? <Outlet/> : <Navigate to="/login" replace />}
  </>
 )
}