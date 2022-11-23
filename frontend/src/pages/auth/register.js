import * as RR from "react-router-dom"
import axios from 'axios'
import React from 'react'
import moment from 'moment';
import * as I from '@heroicons/react/24/outline'
const config = require('../../config/config')

export default function App(){
 const nav = RR.useNavigate()
 const [passwordError, setPasswordError] = React.useState()
 const [email, setEmail] = React.useState()
 const [username, setUsername] = React.useState()
 const [dat,setDat] = React.useState()
 const [loading,setLoading] = React.useState(false)
 const [password, setPassword] = React.useState()
 const [passwordConfirm, setPasswordConfirm] = React.useState()
 const [remember, setRemember] = React.useState()
 
 React.useEffect(()=>{
  
 return()=>{}
 },[])
 
 const verifyPassword =()=>{
   if(password!==passwordConfirm){
     setPasswordError('*Password mismatch')
     return false
   }
   setPasswordError('')
   return true
 }
 
 const submit =(e)=>{
    e.preventDefault()
    if(verifyPassword()){
    alert('password checked')
    const form = new FormData()
    form.append('email',email)
    form.append('username',username)
    form.append('password',password)
    form.append('remember', remember)
    axios({
      data:form,
      method:'post',
      url:config.SERVER+'/register',
      headers:{
        'Content-Type':'multipart/form-data',
        Authorization:'Bearer '+'hhfggffyghy'
      }
    }).then(r=>{
      alert(JSON.stringify(r))
    }).catch(e=>{
      //localStorage.setItem('data',e)
      alert(e)
  
    })
 }}

 const fun2 =()=>{
  
 }
 
 const fun3 =()=>{
  
 }
 return(
 <>
<div class=" mt-6 md:mt-6 lg:mt-16 px-4 md:px-16 md:container md:mx-auto">

<div class="block md:text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-200  text-gray-500 mt-3 font-bold text-2xl">
  Scandal Blog 
</div>

<div class="block md:text-center text-gray-500 mt-3 font-medium">
  Register now to get started with us!
  
  
</div>

{loading&&<div class="block md:text-center text-gray-500 mt-3 font-medium">
  Loading...
</div>}


<form onSubmit={submit}>
<label for="website-admin" class="block mt-6 text-sm font-medium text-gray-500">Username</label>
<div class="flex mt-3">
  <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300">
    @
  </span>
  <input type="text" onChange={(e)=>setUsername(e.target.value)} id="website-admin" class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5" placeholder="elonmusk" />
</div>

<label for="input-group-1" class="block mt-6 text-sm font-medium text-gray-500">Your Email</label>
<div class="relative mt-3">
  <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
  </div>
  <input onChange={(e)=>setEmail(e.target.value)} type="text" id="input-group-1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="name@flowbite.com" />
  </div>

    <div class="mt-3">
        <label for="password" class="block mt-6 text-sm font-medium text-gray-500">Password</label>
   <div class="block md:text-center text-red-500 text-sm mt-3 font-medium">
     {passwordError}
   </div>
        <input onChange={(e)=>setPassword(e.target.value)} type="password" id="password" class="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" required/>
    </div> 
    <div class="mt-3">
        <label for="password" class="block mt-6 text-sm font-medium text-gray-500">Confirm password</label>
        <input onChange={(e)=>setPasswordConfirm(e.target.value)} type="password" id="password" class="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" required/>
    </div> 
    <button  type="submit" class="mt-6 text-white bg-gradient-to-r from-red-500 to-blue-200 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full md:w-full sm:w-auto px-5 py-2.5 text-center">Register</button>
</form>
</div>
 </>
)
}

/*
toast({
   position:'top',
   render:()=>Alert('success','ok','you got it')
  }) */