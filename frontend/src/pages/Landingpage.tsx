import {useState} from 'react'
import LandingHeader from '../components/LandingHeader';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import Footer from '../components/Footer';
import { CiLocationOn } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import landlord from '/src/assets/landlord.jpg';
import tenant from '/src/assets/tenant.jpg';
import apartment2 from '/src/assets/apartment 2.jpg';
import apartment3 from '/src/assets/apartment 3.jpg';
import house1 from '/src/assets/house 1.jpg';
import house2 from '/src/assets/house 2.jpg';
import livingroom from '/src/assets/dining area.jpg'
import { FaStar } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Landingpage = () => {
     const navigate = useNavigate()
     const[searchLocation,setSearchLocation] = useState("")
      const handleClick = () => {
        navigate('/LandlordAbout')
      }
      const handleSearchclick = () =>{
       navigate('/Searchpage', { state: { location: searchLocation}})
      }
      
  return (
    <div>
      <div className=''>
       <header>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
       </header>
      </div>


      <div className='border-b border-main-dark'>
            <div className='font-bitter text-main-dark text-3xl md:text-5xl lg:text-6xl text-center p-8 md:p-16'>
              Your New Home, Simplified.
            </div>
            <div className='flex items-center justify-center px-4'>
                 <div className="relative w-full max-w-md mb-8 md:mb-16 shadow-md">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                       <CiLocationOn className='w-5 h-5 text-main-dark' />
                    </span>
         
                    <input 
                          type="text" 
                          value={searchLocation}
                          onChange={(e)=>setSearchLocation(e.target.value)}
                          placeholder="Enter a location to search" 
                          className="w-full bg-main-white font-quicksand font-semibold rounded-full border-none p-3 pl-10 pr-10 focus:outline-none focus:ring-0"
                    />
                    <button 
                      className="absolute inset-y-0 right-0 flex items-center pr-3" 
                      onClick={handleSearchclick}
                    >
                       <IoSearchOutline className='w-5 h-5 text-main-dark' />
                    </button>
                 </div>
            </div>
      </div>

      {/* Landlord Section */}
      <div className='flex flex-col md:flex-row border-b border-main-dark'>
        <div className='m-5 ml-8 text-main-dark w-full md:w-1/2 px-4 md:px-0'>
          <h2 className='font-bitter font-semibold text-xl underline mb-1'>
            Why landlords should choose us
          </h2>
          <p className='mb-5 font-bitter'>Our platform will help you in the following aspects:</p>
          <ul className='list-disc list-inside space-y-2'>
            <li className='font-bitter font-normal text-sm'>
              <span className='font-bold font-bitter text-lg'>Fill Vacancies Faster</span> – Get your property in front of thousands of renters actively searching now.
            </li>
            <li className='font-bitter font-normal text-sm'>
              <span className='font-bold font-bitter text-lg'>Affordable & Effective</span> – Get better results at a fraction of traditional advertising and agent costs.
            </li>
            <li className='font-bitter font-normal text-sm'>
              <span className='font-bold font-bitter text-lg'>Show Off Your Property</span> – Stunning photos, videos, and floorplans that make your listing stand out
            </li>
            <li className='font-bitter font-normal text-sm'>
              <span className='font-bold font-bitter text-lg'>Stay in Control</span> – Manage listings, applications, and messages from any device, anytime
            </li>
          </ul>
          <div className='flex flex-col sm:flex-row gap-2 mb-9 mt-4'>
            <button className='bg-main-dark text-main-white p-2.5 font-quicksand border rounded-full active:bg-black transition duration-300 ease-in-out shadow-md'>
              Create Listing
            </button>
            <button 
              className='bg-main-dark font-quicksand text-main-white active:bg-black transition duration-300 ease-in-out p-2.5 border rounded-full shadow-md' 
              onClick={handleClick}
            >
              Learn More
            </button>
          </div>
        </div>

        <div className='w-full md:w-1/2 px-4 md:px-0 md:mr-2 mb-4 md:mb-0'>
          <img src={landlord} className='border w-full h-auto object-cover' alt="Landlord" />
        </div>
      </div>

      {/* Tenant Section */}
      <div className='flex flex-col md:flex-row border-b border-main-dark'>
        <div className='w-full md:w-1/3 px-4 md:px-0 md:ml-8 mb-4 md:mb-0'>
          <img src={tenant} className='w-full h-auto object-cover' alt="Tenant" />
        </div>

        <div className='text-main-dark px-8 md:ml-14 m-7'>
          <h2 className='font-bitter underline text-xl font-semibold'>
            Why tenants should choose us
          </h2>
          <p className='font-bitter mb-4'>Our platform will assist you in the following aspects</p>
          <ul className='list-disc list-inside space-y-2'>
            <li className='font-bitter font-normal text-sm'>
              <span className='font-bitter text-lg font-bold'>See It All Online</span> – Photos, videos of multiple options before you visit.
            </li>
            <li className='font-bitter font-normal text-sm'>
              <span className='font-bitter text-lg font-bold'>Smart Filters</span> – Find exactly what you want by price, location, or lifestyle.
            </li>
            <li className='font-bitter font-normal text-sm'>
              <span className='font-bitter text-lg font-bold'>Fast Connections</span> – Chat directly with landlords & schedule instantly.
            </li>
          </ul>
          <div className='flex flex-col sm:flex-row gap-2 mt-5 mb-14'>
            <button className='bg-main-dark font-quicksand text-main-white active:bg-black transition duration-300 ease-in-out p-2.5 border rounded-full shadow-md'>
              Start Search
            </button>
            <button className='bg-main-dark font-quicksand text-main-white active:bg-black transition duration-300 ease-in-out p-2.5 border rounded-full shadow-md'>
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-8 px-4">
        <div className="mb-8">
          <h1 className="text-main-dark text-center font-bitter text-2xl font-semibold">
            Testimonials
          </h1>
        </div>
         <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className=" bg-main-white shadow-lg p-6 rounded-xl">
            <div className="flex text-gold mb-4">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <div className="text-sm">
              <p className="mb-2 leading-relaxed">I got a home immediately, Thanks to you</p>
              <p className="font-extralight text-gray-600">Mary</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="w-full bg-main-white shadow-lg p-6 rounded-xl">
            <div className="flex text-gold mb-4">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <div className="text-sm">
              <p className="mb-2 leading-relaxed">Exceptional experience, looking forward to using Kejani again</p>
              <p className="font-extralight text-gray-600">Dan</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="w-full bg-main-white shadow-lg p-6 rounded-xl">
            <div className="flex text-gold mb-4">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <div className="text-sm">
              <p className="mb-2 leading-relaxed">Managed to achieve more in 24 hours than agents did in a week.</p>
              <p className="font-extralight text-gray-600">Ashley</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="w-full bg-main-white shadow-lg p-6 rounded-xl">
            <div className="flex text-gold mb-4">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <div className="text-sm">
              <p className="mb-2 leading-relaxed">Had a response the same day it was listed. Great service!</p>
              <p className="font-extralight text-gray-600">Kimani</p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="w-full bg-main-white shadow-lg p-6 rounded-xl">
            <div className="flex text-gold mb-4">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <div className="text-sm">
              <p className="mb-2 leading-relaxed">The process was easy and everything happened as promised.</p>
              <p className="font-extralight text-gray-600">Rachel</p>
            </div>
          </div>
        </div>
      </div>
       </div>
      {/* Featured Properties Section */}
      <div className='mt-7 mb-8'>
        <div className='mb-6'>
          <h1 className='text-main-dark text-center font-bitter text-2xl font-semibold'>
            Featured Properties
          </h1>
        </div>

        <div className='flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 px-4 max-w-7xl mx-auto'>
          {/* Property 1 */}
          <div className='w-full bg-main-white border rounded-lg overflow-hidden shadow-md'>
            <div className='bg-main-white p-2'>
              <img src={apartment2} className='w-full h-48 object-cover rounded-md' alt="Apartment" />
            </div>
            <div className='text-main-dark text-sm bg-main-white p-2'>
              <p className='bg-main-white font-quicksand font-semibold'>Modern 1 BR Apartment</p>
              <p className='bg-main-white font-quicksand font-semibold'>Ksh.15,000/Month</p>
              <div className='flex gap-1 items-center bg-main-white mt-2'>
                <IoBedOutline className='text-lg bg-main-white' /> 
                <p className='bg-main-white'>1</p>
              </div>
            </div>
          </div>

          {/* Property 2 */}
          <div className='w-full bg-main-white border rounded-lg overflow-hidden shadow-md'>
            <div className='bg-main-white p-2'>
              <img src={livingroom} className='w-full h-48 object-cover rounded-md' alt="Living room" />
            </div>
            <div className='text-main-dark text-sm bg-main-white p-2'>
              <p className='bg-main-white font-quicksand font-semibold'>3 BR Apartment</p>
              <p className='bg-main-white font-quicksand font-semibold'>Ksh.40,000/Month</p>
              <div className='flex gap-1 items-center bg-main-white mt-2'>
                <IoBedOutline className='text-lg bg-main-white' /> 
                <p className='bg-main-white'>3</p>
              </div>
            </div>
          </div>

          {/* Property 3 */}
          <div className='w-full bg-main-white border rounded-lg overflow-hidden shadow-md'>
            <div className='bg-main-white p-2'>
              <img src={apartment3} className='w-full h-48 object-cover rounded-md' alt="Apartment" />
            </div>
            <div className='text-main-dark text-sm bg-main-white p-2'>
              <p className='bg-main-white font-quicksand font-semibold'>Modern 2 BR Apartment</p>
              <p className='bg-main-white font-quicksand font-semibold'>Ksh.20,000/Month</p>
              <div className='flex gap-1 items-center bg-main-white mt-2'>
                <IoBedOutline className='text-lg bg-main-white' /> 
                <p className='bg-main-white'>2</p>
              </div>
            </div>
          </div>

          {/* Property 4 */}
          <div className='w-full bg-main-white border rounded-lg overflow-hidden shadow-md'>
            <div className='bg-main-white p-2'>
              <img src={house1} className='w-full h-48 object-cover rounded-md' alt="House" />
            </div>
            <div className='text-main-dark text-sm bg-main-white p-2'>
              <p className='bg-main-white font-quicksand font-semibold'>4 BR Bungalow</p>
              <p className='bg-main-white font-quicksand font-semibold'>Ksh.70,000/Month</p>
              <div className='flex gap-1 items-center bg-main-white mt-2'>
                <IoBedOutline className='text-lg bg-main-white' /> 
                <p className='bg-main-white'>4</p>
              </div>
            </div>
          </div>

          {/* Property 5 */}
          <div className='w-full bg-main-white border rounded-lg overflow-hidden shadow-md'>
            <div className='bg-main-white p-2'>
              <img src={house2} className='w-full h-48 object-cover rounded-md' alt="House" />
            </div>
            <div className='text-main-dark text-sm bg-main-white p-2'>
              <p className='bg-main-white font-quicksand font-semibold'>4 BR Standalone House</p>
              <p className='bg-main-white font-quicksand font-semibold'>Ksh.80,000/Month</p>
              <div className='flex gap-1 items-center bg-main-white mt-2'>
                <IoBedOutline className='text-lg bg-main-white' /> 
                <p className='bg-main-white'>4</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-14'>
        <Footer />
      </div>
    </div>
  )
}

export default Landingpage