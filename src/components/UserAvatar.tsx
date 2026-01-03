import React, { useState } from 'react'
import { FaAngleDown } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const UserAvatar = ({username = 'Eric', initial = 'E', color="bg-green-400"}) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleMenu = ()=> {
        setIsOpen(!isOpen)
    } 
    const navigate = useNavigate()
    const handleEditProfile = () =>{
        navigate('/EditProfile')
    }

  return (
    <div className='relative flex items-center cursor-pointer' onClick={toggleMenu}>
        <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center text-main-white font-bold`}>
            {initial}
        </div>
      
      <span className='ml-2 text-gray-800'>{username}</span>
      <span className='ml-1 text-main-dark'><FaAngleDown/></span>

      {isOpen && (
        <div className='absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10'>
                <div className='flex items-center p-3 border-b border-gray-200'>
                  <div className='w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center'>

                  </div>
                  <span className='ml-2 text-gray-800 font-medium'>{username}</span>
                
                </div>
                <button className='block w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100'onClick={handleEditProfile}>Edit Profile</button>
                <button className='block w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100' onClick={()=>{console.log("Logging out");
                    setIsOpen(false)
                }}> Log Out</button>
        </div>
      )}
    </div>
  )
}

export default UserAvatar
