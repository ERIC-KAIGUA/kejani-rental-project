import React from 'react'

const SideNav = () => {
  return (
    <div className='w-auto h-screen border rounded-md shadow-lg'>
        <div className='`w-8 h-8 rounded-full bg-green-500'>
             
        </div>
        <div className='mt-20 m-20'>
        <div className='flex flex-col gap-3'>
              <a href='/EditProfile' className='font-quicksand font-semibold active:underline '>Edit Profile</a>
              <a href='/VerifyDetails' className='font-quicksand font-semibold active:underline'>Verify Details</a>
              <a href='/DeleteAccount' className='font-quicksand font-semibold active:underline '>Delete Account</a>
         </div>
      </div>
      
    </div>
  )
}

export default SideNav
