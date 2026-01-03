import React from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import Footer from '../components/Footer'
import { GiTribalShield } from "react-icons/gi";

const PremiumTenant = () => {
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
                    <p className='font-bitter text-xl text-main-dark'>Premium Tenants.</p>
                    <p className='font-bitter text-sm text-main-dark'>Perks you get when you become a premium tenant.</p>
                </div>

                <div className='mt-11 w-1/2'>
                  <div className='border border-main-grey rounded-md space-y-6 p-10'>
                    <p className='font-bitter italic text-sm flex underline'>Premium Tenant Badge <GiTribalShield className='text-2xl'/></p>
                    <p className='font-bitter text-sm'>A badge is displayed beside your name allowing your account to stand out from other tenants which increases your chances of being selected by landlords. </p>
                    <p className='font-bitter text-sm '> Messages sent to landlords will be put at the top of the landlord's inbox giving you an extra advantage over other potential tenants. </p>
                    <p className='font-bitter text-sm font-semibold italic'>Only Ksh.500 for 30 days.</p>
                    <p className='font-bitter'>Enter your Details</p>
                    <div className='flex gap-4'>
                        <div className='flex flex-col'>
                            <label className='font-quicksand font-semibold'>First Name</label>   
                            <input type='text' className='p-1 border border-main-grey rounded-md focus:outline-none '></input>
                       </div>
                       <div className='flex flex-col'>
                            <label className='font-quicksand font-semibold'>Last name</label>
                            <input type='text' className='p-1 border border-main-grey rounded-md focus:outline-none'></input>
                    </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>

        <div className=''>
           <Footer></Footer>
        </div>
    </div>
  )
}

export default PremiumTenant