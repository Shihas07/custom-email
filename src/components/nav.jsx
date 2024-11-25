

 import React from 'react'
 
 export default function Nav() {
   return (
     <div>
         
          <nav className='flex  h-20 bg-white m-10 justify-between shadow-2xl rounded-lg'>
              <div className='flex justify-center align-middle w-auto h-10 px-4 m-5  '><h1 className='font-black font-wi italic text-blue-500 '>Make Mail</h1></div> 
               <div className='w-auto flex justify-center m-4   '><button className='bg-slate-600 rounded-2xl px-10 text-red-200'>login</button></div>
          </nav>
          
     </div>
   )
 }
 