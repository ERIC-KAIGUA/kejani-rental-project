import React, { useRef, useState } from 'react'
import logo from '/src/assets/KEJANI_LOGO_3.0.png'
import { FaAngleDown } from "react-icons/fa6";
import Index from '../pages/Index'
import UserAvatar from './UserAvatar';


const LandingHeader = () => {
        const [isOpen, setIsOpen] = useState(false)
        const timeoutRef = useRef(null)
    
        const handlemouseEnter = () => {
          if(timeoutRef.current){
            clearTimeout(timeoutRef.current)
          }
          setIsOpen(true)
        }
    
        const handlemouseLeave = () => {
           timeoutRef.current = setTimeout(() => {
            setIsOpen(false)
           }, 500)
        }
       
    
       
      
  return (
  <div className='h-20 flex items-center justify-between p-12 border-b border-main-dark'>
      <a href='/'>
        <img src={logo} className=' h-22 w-24 ml-10 cursor-pointer' onClick={<Index></Index>}></img>
      </a>
    <div className='gap-6 flex'>

        <div className='relative' >
           <button className='bg-main-dark active:bg-black transition duration-300 ease-in-out text-main-white p-3 px-5  border-none border rounded-3xl font-light font-quicksand shadow-md flex items-center justify-center gap-2' onMouseEnter={handlemouseEnter} onMouseLeave={handlemouseLeave}>About <FaAngleDown className=' bg-transparent' /></button>
                 {isOpen && (
               <div className='absolute bg-main-white border-main-grey border rounded-lg shadow-md w-28 p-2 ml-6 mt-2 z-10' onMouseEnter={handlemouseEnter} onMouseLeave={handlemouseLeave}>
                    <a href='/LandlordAbout' className='block font-quicksand text-main-dark bg-main-white mb-2.5'>Landlords</a>
                    <a href='/TenantAbout' className='block font-quicksand text-main-dark bg-main-white'>Tenants</a>
                </div>
      )}
        </div>

        <button className='bg-main-dark active:bg-black transition duration-300 ease-in-out text-main-white p-3 px-5 border-none border rounded-3xl font-light font-quicksand shadow-md'>Sign-In</button>
        <div className='p-2'>
          <UserAvatar />
        </div>
      </div>
 </div>
  )
}

export default LandingHeader
