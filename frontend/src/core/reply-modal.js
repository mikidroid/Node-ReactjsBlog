import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import * as M from '@mui/material';
import * as I from '@mui/icons-material';
import * as RR from "react-router-dom"
import axios from 'axios'
import Nav from '../nav'
import moment from 'moment';
const config = require('../config/config')

  
export default function Example({reply,comment,header,icon,title="button",className,children}) {
  const [auth,setAuth]=useState(localStorage.getItem('token')?true:false)
  const [user,setUser]=useState(auth?JSON.parse(localStorage.getItem('user')):null)
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [content,setContent] = useState('')
  
  const submit = () =>{
   
    let form = new FormData()

    form.append('name',name?name:user.username)
    form.append('email',email?email:user.email)
    form.append('content',content)
    form.append('receiver',reply?reply.name:comment.name)
    form.append('commentId',reply?reply.comment:comment._id)
    form.append('postId',reply?reply.post:comment.post)
   
    axios.post(config.SERVER+'/reply/add',form)
    .then(r=>{
      //alert('Reply Added!')
    })
    .catch(e=>alert(e.message+'\n'+ e))
  }

  return (
    <>
      <button
          type="button"
          className={className}
          onClick={() => setOpen(true)}
          >
          Reply
          </button>

  <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex md:mt-[50vh] mt-[50vh] justify-center p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transfform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                   {icon&& <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                      {icon}
                    </div>}
                    <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                    {/*Header*/}
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-center text-gray-500">
                        Replying @{reply?reply.name:comment.name}
                      </Dialog.Title>
                      <div className="mt-2">
                      
  {/* the main contents*/}
  <div class="mt-3 mb-8 px-2">
  
  {!auth&& <><input type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)} class="mt-3 ring-1 ring-blue-200 rounded-md py-2 px-4 focus:ring-blue-200 w-full" />
  
   <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} class="mt-3 ring-1 ring-blue-200 rounded-md py-2 px-4 focus:ring-blue-200 w-full" /></>
  }
  <textarea class="mt-3 ring-1 ring-blue-200 rounded-md py-2 px-4 focus:ring-blue-200 w-full" type="text" placeholder="Start typing comment here..." onChange={(e)=>setContent(e.target.value)} />
  
  <button class="w-full bg-blue-400 text-sm text-white py-2 px-3 rounded-xl mt-3 md:mt-5" onClick={submit}>
  Add comment
  </button>
  </div> 
  {/********************/}               
                      </div>
                    </div>
                  </div>
                </div>
  
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>


    </>
  )
}