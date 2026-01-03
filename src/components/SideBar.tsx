import React from 'react'


const SideBar = () => {
 
  return (
    <div className='w-auto h-screen border rounded-md shadow-lg'>
      
      <div className='mt-20 m-20'>
        <div className='flex flex-col gap-3'>
              <a href='/Dashboard' className='font-quicksand font-semibold active:underline w-1/6'>Dashboard</a>
              <a href='/Enquiries' className='font-quicksand font-semibold active:underline'>Your Enquiries</a>
              <a href='/Favourites' className='font-quicksand font-semibold active:underline  w-1/6'>Favourites</a>
              <a href='/PremiumTenant' className='font-quicksand font-semibold active:underline w-1/6'>Premium Tenant</a>
         </div>
      </div>
    </div>
  )
}

export default SideBar
