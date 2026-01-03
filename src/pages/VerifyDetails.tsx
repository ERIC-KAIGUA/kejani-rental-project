import React from 'react'
import LandingHeader from '../components/LandingHeader'
import SideNav from '../components/SideNav'
import Footer from '../components/Footer'


const VerifyDetails = () => {
      const handleKeyDown = (e) => {
    if (e.key === '-' || e.key === 'e' || e.key === '.') {
      e.preventDefault();
    }
  };

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
            <div className='p-3'> 
                <p className='font-bitter text-2xl text-main-dark'>Verify Your Details</p>
                <p className='font-bitter text-lg text-main-dark'>Add your phone number</p>
                 <hr className='mt-3 border border-gray-600 border-opacity-15'/>
                <p className='font-bitter text-sm text-main-dark mt-1'>Please add your phone number so we can easily get in touch with you, tenants, and landlords for property viewings.</p>
                <p className='font-bitter text-sm text-main-dark mt-5 '>We'll send a verification code to the number you provide.Simply enter that code on this page to complete the process.</p>

                  <div className='mt-4 flex flex-col w-1/2'>
                    <label className='font-bitter text-sm font-semibold'>Enter your number </label>
                    <input type='number'min="0" step="1" className='no-number-arrows rounded-md outline-none px-2 py-1 font-quicksand' onKeyDown={handleKeyDown}></input>
                  </div>

                   <div className='mt-4 flex'>
                    <button className='font-bitter bg-green-600 text-main-white px-4 py-2 rounded-lg'>Send Code</button>
                  </div>

                   <div className='mt-4 flex flex-col w-1/2 hidden'>
                    <label className='font-bitter text-sm font-semibold'>Enter your code </label>
                    <input type='number'step="1" min="0" className='no-number-arrows rounded-md outline-none px-2 py-1 font-quicksand' onKeyDown={handleKeyDown}></input>
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

export default VerifyDetails
