import React from 'react'
import { Link } from 'react-router-dom'


const SideBar = () => {
 
  return (
    <div className='w-auto h-screen border rounded-md shadow-lg'>
      
      <div className='mt-20 m-20'>
        <div className='flex flex-col gap-3'>
              <Link to='/Dashboard' className='font-quicksand font-semibold active:underline w-1/6'>Dashboard</Link>
              <Link to='/Enquiries' className='font-quicksand font-semibold active:underline'>Your Enquiries</Link>
              <Link to='/Favourites' className='font-quicksand font-semibold active:underline  w-1/6'>Favourites</Link>
              <Link to='/PremiumTenant' className='font-quicksand font-semibold active:underline w-1/6'>Premium Tenant</Link>
         </div>
      </div>
    </div>
  )
}

export default SideBar
