import React from 'react'
import { CiLocationOn } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import Header from '../components/Header'
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const TenantAbout = () => {
    const navigate = useNavigate()

    const handleclick = () =>{
        navigate('/PremiumTenant')
    }

    const handleNavigation = () =>{
        navigate('/Searchpage')
    }
     const handleSearchclick = () =>{
    navigate('/Searchpage')
  }
  return (
    <div>
        <div>
            <Header></Header>
        </div>

        <div className='items-center justify-center'>
            <div className='mt-6'>
                <p className='text-center font-bitter text-2xl font-semibold text-main-dark'>Rent from Landlords across Kenya</p>
                <p className='text-center font-bitter text-main-dark mt-3'>Kejani lets you deal directly with landlords, with no agent fees.</p>
                <p className='text-center font-bitter  text-main-dark'>We've put the whole process online to save your time, effort and frustration!</p>
           </div>

           <div className='flex items-center justify-center'>
            <div className=" relative w-full max-w-md mt-5 shadow-md">
                      
                        <span className="absolute inset-y-0 left-0 flex items-center border-none rounded-full bg-main-white pl-3">
                            <CiLocationOn className='w-5 h-5  bg-main-white fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24' />
                        </span>

                       
                        <input 
                            type="text" 
                            placeholder="Enter a location to search" 
                            className="w-full bg-main-white font-quicksand font-semibold rounded-full border-none p-3 pl-10 pr-10 focus:outline-none focus:ring-none focus:ring-none"
                        />

                        <button className="absolute inset-y-0 right-0 flex items-center border-none rounded-full bg-main-white pr-3" onClick={handleSearchclick}>
                            <IoSearchOutline className='w-5 h-5 bg-main-white fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24' />
                        </button>
           </div>
         </div>

            </div>

            <div className='mt-12'>
                <p className='text-center font-bitter text-2xl font-semibold text-main-dark'>How Kejani works for tenants</p>

                  <div className='container mx-auto p-3'>
                        <div className='mb-10 mt-10 ml-10'>
                            <p className='font-bitter text-lg font-semibold text-main-dark '>Save time by filtering out unsuitable properties</p>
                            <p className='text-wrap w-1/2 font-bitter text-main-dark mt-4'>
                                    Our platform makes property search simple and efficient with up-to-date listings, no hidden charges, and high-quality photos. Properties are removed immediately once unavailable, and you’ll get instant email alerts if one you inquired about goes offline. With thousands of options and easy filters for pets, students, or families, finding the right home is hassle-free.
                                </p>
                        </div>
                        <div className='w-1/2 ml-auto p-4'>
                            <p className='font-bitter text-lg font-semibold text-main-dark'>Connect Directly with Landlords</p>
                            <p className='font-bitter text-wrap text-main-dark'>
                                Found a property you want? Just click <span className='font-semibold italic font-bitter'>'Book Viewing'</span> to message the landlord directly. You can ask questions and schedule a viewing at your convenience, getting all the information you need straight from the source. Your identity is protected and your details are masked until a viewing is arranged.
                            </p>
                        </div>
                    </div>
            </div>
         
         <div className='mt-8'>
        <div className='block '>
           <p className='text-center font-bitter text-xl'>Pricing</p>
           <p className='text-center font-bitter'>Pick a package that works for you</p>
        </div>

        <div className='flex items-stretch m-5 justify-center mt-10 gap-2'>

         <div className='w-1/3 border-b border rounded-md border-main-grey py-11'>
            <p className='font-bitter text-center text-xl'>Free</p>
                <ul className='list-disc list-inside p-3'>
                    <li className='font-bitter text-sm'>Start searching for your next home for free.</li>
                </ul>
            
            
            <div className='flex items-center justify-center mt-10'>
                <button className='bg-main-dark text-main-white font-quicksand p-2 flex gap-2 shadow-md border rounded-md px-28 py-2.5 active:bg-black transition duration-300 ease-in-out items-center justify-center' onClick={handleNavigation}>Get Started</button>
            </div>
         </div>


         <div className='  bg-green-300/40 w-1/3 border-b border rounded-md border-main-grey py-11'>
            <p className='font-bitter text-center text-xl bg-green-300/10'>Premium</p>
            <ul className='list-disc list-inside p-3 bg-green-300/10'>
                <li className='font-bitter text-sm bg-green-300/10'>You stand out from other potential tenants increasing your chances of getting picked</li>
                <li className='font-bitter text-sm bg-green-300/10'>Your message is put at the top of the landlords inbox</li>
                <li className='font-bitter text-sm bg-green-300/10'>You get notified when a new property is listed</li>
            </ul>
            
            <div className='flex items-center justify-center mt-7 bg-green-300/10'>
                <button className='bg-main-dark text-main-white font-quicksand p-2 flex gap-2 shadow-md border rounded-md px-28 py-2.5 active:bg-black transition duration-300 ease-in-out items-center justify-center' onClick={handleclick}>Get started</button>
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

export default TenantAbout
