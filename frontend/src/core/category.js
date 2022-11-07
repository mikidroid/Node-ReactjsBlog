import  * as R from 'react'
import * as MU from '@mui/material';
import * as ML from '@mui/lab';
import * as MI from '@mui/icons-material';
import * as I from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'

import * as RR from "react-router-dom"
//import socket io
import io from "socket.io-client"
import axios from 'axios'
import Nav from '../nav'
import moment from 'moment';
const config = require('../config/config')
const socket = io.connect(config.SERVER)

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function App({category}){
 const [title,setTitle]=R.useState()
 const nav = RR.useNavigate()
 const [description,setDescription]=R.useState()
 const [data,setData]=R.useState([])
 const [loading,setLoading]=R.useState(false)
 
 R.useEffect(()=>{

    setData(category)

   return()=>{}
 },[])
 
 const deleteCategory =(id)=>{
    setLoading(true)
    axios.post(config.SERVER+'/category/delete/'+id)
    .then(r=>{
      alert("Category Removed!")
      nav(0)
    })
    .catch(e=>{alert(e.message)})
 }

 const submitCategory =()=>{
   
   fetch(config.SERVER+'/category/add',{
     body: JSON.stringify({
       title:title,
       description:description
     }),
     method:'post',
     headers:{
       'Content-Type':'application/json'
     }
   }).then(r=>r.json()).then(r=>{
     alert('Category Added!')
     nav(0)
   }).catch(err=>alert(err.message))
 }
 

 return(
  <>
  {loading? <div>Loading...</div>
   :
   <div>
     <div class="text-gray-700">Add Category </div>
     <input onChange={(e)=>setTitle(e.target.value)} type="text" class="mt-2 w-full p-2.5 rounded-lg border border-gray-300" placeholder="title" />
     <input onChange={(e)=>setDescription(e.target.value)} class="mt-2 w-full p-2.5 rounded-lg border border-gray-300" placeholder="description" type="text" multiline />
     <button onClick={()=>submitCategory()} class="mt-2 w-full p-2.5 rounded-lg border border-blue-900/50 text-blue-900/80"  >Add</button>
     
     <div class="mt-6 text-gray-700">All Categories </div>
 
 
<div class="mt-2 overflow-x-auto rounded-md relative">
    <table class="w-full text-sm text-left text-gray-500 ">
        <thead class="text-xs text-gray-700 uppercase bg-white ">
            <tr>
                <th scope="col" class="py-3 px-6">
                    s/n
                </th>
                <th scope="col" class="py-3 px-6">
                    Name
                </th>
                <th scope="col" class="py-3 px-6">
                    Description
                </th>
                <th scope="col" class="py-3 px-6">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
         {data&& data.map((cat,i)=>
            <tr class="bg-white border-b">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                    {i+1}
                </th>
                <td class="py-4 px-6">
                    {cat.title}
                </td>
                <td class="py-4 px-6">
                    {cat.description}
                </td>
                <td class="py-4 px-6">
                
        {/* Dropdown */}
        <Menu as="div" className="relative">
          <Menu.Button  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
         
            <I.PencilSquareIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
          </Menu.Button>

          <Transition
            as={R.Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={()=>deleteCategory(cat._id)}
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                  >
                    Delete {cat.title}
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                  >
                    Edit
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
                    
                    
                </td>
            </tr>)}
        </tbody>
    </table>
</div>

 
   </div>
  }
  </>
  
)
}

/*
toast({
   position:'top',
   render:()=>Alert('success','ok','you got it')
  }) */