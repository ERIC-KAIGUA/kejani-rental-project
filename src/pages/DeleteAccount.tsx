import React from 'react'
import LandingHeader from '../components/LandingHeader'
import SideNav from '../components/SideNav'
import Footer from '../components/Footer'

const DeleteAccount = () => {
  return (
    <div>
      <div>
        <LandingHeader></LandingHeader>
      </div>

      <div className='flex flex-row'>
         <div className='w-1/2'>
             <SideNav></SideNav>
        </div>

        <div className='ml-11 mt-4'>
            <div className='p-3 '>
                 <p className='font-bitter text-2xl text-main-dark'>Delete Your Account</p>
                 <p className='font-bitter text-sm text-main-dark mt-4 text-wrap w-auto'>We're sad to see you go! Thank you for being a part of our community. When you delete your account, your profile and all of your information will be permanently removed from our website. This action is irreversible, so please make sure you want to proceed.</p>
                 <button className='font-bitter bg-red-500 text-sm text-main-white px-4 py-2 rounded-md mt-10'>Delete Account</button>
            </div>
        </div>
      </div>

      <div className=''>
        <Footer></Footer>
      </div>
    </div>
  )
}

export default DeleteAccount
