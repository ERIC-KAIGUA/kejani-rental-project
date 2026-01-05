import React from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import Footer from '../components/Footer'
import DebugGetToken from '../components/DebugGetToken'

const Enquiries = () => {
  return (
    <div>
        <div>
            <Header></Header>
        </div>
         
      <div className=' flex flex-row'>
        <div className=''>
            <SideBar></SideBar>
        </div>

        <div className='ml-11 mt-4'>
                <div className=''>
                    <p className='font-bitter text-xl text-main-dark'>Manage your viewings and potential home from here.</p>
                    <p className='font-bitter text-sm text-main-dark'>Below is a list of all enquiries you've made with landlords. You can track them from here and keep notes</p>
                </div>

                <div className='mt-11'>
                  <div className='border border-main-grey rounded-md space-y-6 p-6'>
                    <p className='font-bitter italic text-sm'>Your enquiry list is currently empty. Begin searching properties by clicking the button below</p>
                     <button className='bg-main-dark text-main-white font-quicksand px-5 py-1.5 shadow-md border rounded-lg active:bg-black transition duration-300'>Search property listings</button>
                  </div>
                </div>
                {/* <DebugGetToken /> */}
            </div>
        </div>

        <div className=''>
           <Footer></Footer>
        </div>
    </div>
  )
}

export default Enquiries



