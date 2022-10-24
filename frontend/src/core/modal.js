import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import * as M from '@mui/material';
import * as I from '@mui/icons-material';
import * as RR from "react-router-dom"
import axios from 'axios'
import Nav from '../nav'
import React from 'react'
import moment from 'moment';
const config = require('../config/config')

  
export default function Example({header,icon,title="button",submit,className,children}) {
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                   {icon&& <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                      {icon}
                    </div>}
                    <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                      {header&&<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-center text-gray-900">
                        {header}
                      </Dialog.Title>}
                      <div className="mt-2">
                 
                       {children}
                       
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