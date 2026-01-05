import React from 'react'
import LandingHeader from '../components/LandingHeader'
import Footer from '../components/Footer'
import SideNav from '../components/SideNav'
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {
  const navigate = useNavigate();
  const handlePageChange = () => {
    navigate('/VerifyDetails')
  }
  return (
    <div>
      <div>
         <LandingHeader></LandingHeader>
      </div>

      <div className='flex flex-row'>
         <div className=''>
                 <SideNav></SideNav>
         </div>

           <div className='ml-11 mt-4'>
          <div className=''>
           <p className='font-bitter text-2xl text-main-dark'>Edit Your Details</p>
           <p className='font-bitter text-sm text-main-dark mt-2'>For you to be able to list your property or rent a house, you will need to have all your contact info. confirmed below</p>
           <hr className='mt-3 border border-gray-600 border-opacity-15'/>
           <p className='font-bitter text-xl text-main-dark mb-6'>Account Information</p>

           <div className='flex flex-col w-1/3'>
              <label className='font-bitter text-sm text-main-dark font-semibold'>Email Address</label>
              <input type='email' className='rounded-md outline-none px-2 py-1 font-quicksand'></input>
           </div>

           <div className='flex flex-col w-1/3 mt-5'>
              <label className='font-bitter text-sm text-main-dark font-semibold'>Full Name</label>
              <input type='email' className='rounded-md outline-none px-2 py-1 font-quicksand'></input>
           </div>

           <div className='flex flex-col w-1/3 mt-5'>
              <label className='font-bitter text-sm text-main-dark font-semibold'>Password</label>
              <button className='font-bitter border border-gray-400 rounded-md px-4 py-2 text-sm shadow-md'>Click to change password</button>
           </div>

           <div className='flex flex-col w-1/3 mt-7'>
              <button className='font-bitter bg-main-dark rounded-md px-4 py-2 text-sm text-main-white' onClick={handlePageChange}>Next</button>
           </div>
          </div>

          
        </div>
      </div>

      <div>
        <Footer></Footer>
      </div>
    </div>
  )
}

export default EditProfile
