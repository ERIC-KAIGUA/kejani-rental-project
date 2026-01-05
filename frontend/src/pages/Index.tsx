import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
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
import supabase from '../config/supabaseClient';
import { Link } from 'react-router-dom';



const Index = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/LandlordAbout')
  }
  const handleSearchclick = () =>{
    navigate('/Searchpage')
  }
  const handleLandingpage = ()=>{
    navigate('/Landingpage')
  }

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase
        .from('property')
        .select('id, bedrooms, description, rent, coverImage');
      if (error) console.error('Error fetching properties:', error);
      else setProperties(data);
    };
    fetchProperties();
  }, []);

  const displayedProperties = properties.slice(0, 4);


  return (
   <div>
    <div className=''>
       <Header></Header>
    </div>

    <div className ='border-b border-main-dark'>
      <div className='font-bitter text-main-dark text-6xl text-center p-16'>Your New Home,Simplified.</div>
         <div className='flex items-center justify-center'>
              <div className=" relative w-full max-w-md mb-16 shadow-md">
                              
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

    <div className='flex border-b border-main-dark'>
       <div className='m-5 ml-8 text-main-dark w-1/2'>
        <h2 className=' font-bitter font-semibold text-xl underline mb-1'>Why landlords should choose us</h2>
        <p className='mb-5 font-bitter'>Our platform will help you in the following aspects:</p>
            <ul className='list-disc list-inside'>
              <li className='font-bitter font-normal text-sm'><span className='font-bold font-bitter text-lg'>Fill Vacancies Faster</span> – Get your property in front of thousands of renters actively searching now.</li>
              <li className='font-bitter font-normal text-sm'><span className='font-bold font-bitter text-lg'>Affordable & Effective</span> – Get better results at a fraction of traditional advertising and agent costs.</li>
              <li className='font-bitter font-normal text-sm'><span className='font-bold font-bitter text-lg'>Show Off Your Property</span> – Stunning photos, videos, and floorplans that make your listing stand out</li>
              <li className='font-bitter font-normal text-sm'><span className='font-bold font-bitter text-lg'>Stay in Control</span> – Manage listings, applications, and messages from any device, anytime</li>
            </ul>
            <div className='flex gap-2 mb-9'>
                  <button className='bg-main-dark text-main-white p-2.5 mt-4 font-quicksand border rounded-full active:bg-black transition duration-300 ease-in-out shadow-md'>Create Listing</button>
                  <button className='bg-main-dark font-quicksand text-main-white active:bg-black transition duration-300 ease-in-out p-2.5 mt-4 border rounded-full shadow-md' onClick={handleClick}>Learn More</button>
           </div>
       </div>


       <div className='flex w-1/2 h-1/2 mr-2'>
        <img src={landlord} className='border '></img>
       </div>
    </div>

    <div className='flex border-b border-main-dark'>
      <div className=' ml-8 w-1/3'>
        <img src={tenant}></img>
      </div>

      <div className='text-main-dark ml-14 m-7'>
        <h2 className='font-bitter underline text-xl font-semibold'>Why tenants should choose us</h2>
        <p className='font-bitter mb-4'>Our platform will assist you in the following aspects</p>
        <ul className='list-disc list-inside'>
              <li className='font-bitter font-normal text-sm'><span className='font-bitter text-lg font-bold'>See It All Online</span> – Photos, videos of multiple options before you visit.</li>
              <li className='font-bitter font-normal text-sm'><span className='font-bitter text-lg font-bold'>Smart Filters</span> – Find exactly what you want by price, location, or lifestyle.</li>
              <li className='font-bitter font-normal text-sm'><span className='font-bitter text-lg font-bold'>Fast Connections</span> – Chat directly with landlords & schedule instantly.</li>
        </ul>
        <div className='flex gap-2 mt-5 mb-14'>
            <button className='bg-main-dark font-quicksand text-main-white active:bg-black transition duration-300 ease-in-out p-2.5 border rounded-full shadow-md'>Start Search</button>
            <button className='bg-main-dark font-quicksand text-main-white active:bg-black transition duration-300 ease-in-out p-2.5 border rounded-full shadow-md' onClick={handleLandingpage}>Learn More</button>
       </div>
      </div>
    </div>

    <div className=' mt-4'>
      <div className=''>
          <h1 className=' text-main-dark text-center font-bitter text-2xl font-semibold'>Testimonials</h1>
      </div>
      
      
       <div className='flex items-start justify-center m-4'>
            <div className='w-1/6 bg-main-white shadow-lg p-3 border rounded-xl border-none m-3'>
                <div className='flex text-gold bg-main-white mb-2'>
                    <FaStar className='bg-main-white' /><FaStar className='bg-main-white' /><FaStar className='bg-main-white' /><FaStar className='bg-main-white' /><FaStar className='bg-main-white' />
                </div>
                  <div className='flex-row text-sm bg-main-white'>
                    <p className='bg-main-white mb-1'>I got a home immediately, Thanks to you</p>
                    <p className='font-extralight bg-main-white'>Mary</p>
                  </div>
            </div>

            <div className='w-1/6 bg-main-white shadow-lg p-3 border rounded-xl border-none m-3'>
                <div className='flex text-gold bg-main-white mb-2'>
                    <FaStar className='bg-main-white' /><FaStar className='bg-main-white' /><FaStar className='bg-main-white' /><FaStar className='bg-main-white' /><FaStar className='bg-main-white' />
                </div>
                  <div className='flex-row text-sm bg-main-white'>
                    <p className='bg-main-white mb-1'>Exceptional experience, looking forward to using Kejani again</p>
                    <p className='font-extralight bg-main-white'>Dan</p>
                  </div>
            </div>

            <div className='w-1/6 bg-main-white shadow-lg p-3 border rounded-xl border-none m-3'>
                <div className='flex text-gold bg-main-white mb-2'>
                    <FaStar className='bg-main-white' /><FaStar className='bg-main-white' /><FaStar className='bg-main-white' /><FaStar className='bg-main-white' /><FaStar className='bg-main-white' />
                </div>
                  <div className='flex-row text-sm bg-main-white'>
                    <p className='bg-main-white mb-1'>Managed to achieve more in 24 hours than agents did in a week.</p>
                    <p className='font-extralight bg-main-white'>Ashley</p>
                  </div>
            </div>

            <div className='w-1/6 bg-main-white shadow-lg p-3 border rounded-xl border-none m-3'>
                <div className='flex text-gold bg-main-white mb-2'>
                    <FaStar className='bg-main-white' /><FaStar className='bg-main-white' /><FaStar className='bg-main-white' /><FaStar className='bg-main-white' /><FaStar className='bg-main-white' />
                </div>
                  <div className='flex-row text-sm bg-main-white'>
                    <p className='bg-main-white mb-1'>Had a response the same day it was listed. Great service!</p>
                    <p className='font-extralight bg-main-white'>Kimani</p>
                  </div>
            </div>

            <div className='w-1/6 bg-main-white shadow-lg p-3 border rounded-xl border-none m-3'>
                <div className='flex text-gold bg-main-white mb-2'>
                    <FaStar className='bg-main-white' /><FaStar className='bg-main-white' /><FaStar className='bg-main-white' /><FaStar className='bg-main-white' /><FaStar className='bg-main-white' />
                </div>
                  <div className='flex-row text-sm bg-main-white'>
                    <p className='bg-main-white mb-1'>The process was easy and everything happened as promised.</p>
                    <p className='font-extralight bg-main-white'>Rachel</p>
                  </div>
            </div>
        </div>
    </div>

    <div className='mt-7'>
      <div className=''>
          <h1 className=' text-main-dark text-center font-bitter text-2xl font-semibold '>Featured Properties</h1>
      </div>

      <div className='flex gap-7 m-3 items-start justify-center '>
             {displayedProperties.map((property) => (
          <Link to={`/ItemProperty/${property.id}`} key={property.id}>
            <div className=' bg-main-white border '>
                  <div className='bg-main-white m-2 border-none'>
                    <img src={property.coverImage} className=' bg-main-white border rounded-md border-none shadow-md '/>
                  </div>
                  <div className='text-main-dark  text-sm bg-main-white mt-3 m-2'>
                      <p className='bg-main-white font-quicksand font-semibold'>{property.bedrooms} BR Apartment</p>
                      <p className='bg-main-white font-quicksand font-semibold'>Ksh.{property.rent}/Month</p>
                        <div className='flex gap-1 bg-main-white mt-2'>
                            <IoBedOutline className='text-lg bg-main-white' /> 
                            <p className='bg-main-white'>{property.bedrooms}</p>
                      </div>
                  </div>
            </div>
          </Link>
        ))}
             {/* <div className='w-1/6 bg-main-white border '>
                  <div className='bg-main-white m-2 border-none'>
                    <img src={livingroom} className=' bg-main-white border rounded-md border-none shadow-md '/>
                  </div>
                  <div className='text-main-dark  text-sm bg-main-white mt-3 m-2'>
                      <p className='bg-main-white font-quicksand font-semibold'>3 BR Apartment</p>
                      <p className='bg-main-white font-quicksand font-semibold'>Ksh.40,000/Month</p>
                        <div className='flex gap-1 bg-main-white mt-2'>
                            <IoBedOutline className='text-lg bg-main-white' /> 
                            <p className='bg-main-white'>3</p>
                      </div>
                  </div>
            </div>

             <div className='w-1/6 bg-main-white border '>
                  <div className='bg-main-white m-2 border-none'>
                    <img src={apartment3} className=' bg-main-white border rounded-md border-none shadow-md '/>
                  </div>
                  <div className='text-main-dark  text-sm bg-main-white mt-3 m-2'>
                      <p className='bg-main-white font-quicksand font-semibold'>Modern 2 BR Apartment</p>
                      <p className='bg-main-white font-quicksand font-semibold'>Ksh.20,000/Month</p>
                        <div className='flex gap-1 bg-main-white mt-2'>
                            <IoBedOutline className='text-lg bg-main-white' /> 
                            <p className='bg-main-white'>2</p>
                      </div>
                  </div>
            </div>

             <div className='w-1/6 bg-main-white border '>
                  <div className='bg-main-white m-2 border-none'>
                    <img src={house1} className=' bg-main-white border rounded-md border-none shadow-md '/>
                  </div>
                  <div className='text-main-dark  text-sm bg-main-white mt-3 m-2'>
                      <p className='bg-main-white font-quicksand font-semibold'>4 BR Bungalow</p>
                      <p className='bg-main-white font-quicksand font-semibold'>Ksh.70,000/Month</p>
                        <div className='flex gap-1 bg-main-white mt-2'>
                            <IoBedOutline className='text-lg bg-main-white' /> 
                            <p className='bg-main-white'>4</p>
                      </div>
                  </div>
            </div>

             <div className='w-1/6 bg-main-white border '>
                  <div className='bg-main-white m-2 border-none'>
                    <img src={house2} className=' bg-main-white border rounded-md border-none shadow-md '/>
                  </div>
                  <div className='text-main-dark  text-sm bg-main-white mt-3 m-2'>
                      <p className='bg-main-white font-quicksand font-semibold'>4 BR Standalone House</p>
                      <p className='bg-main-white font-quicksand font-semibold'>Ksh.80,000/Month</p>
                        <div className='flex gap-1 bg-main-white mt-2'>
                            <IoBedOutline className='text-lg bg-main-white' /> 
                            <p className='bg-main-white'>4</p>
                      </div>
                  </div>
            </div> */}
      </div>
     </div>


    <div className='mt-14'>
      <Footer></Footer>
    </div>
   </div>
  )
}

export default Index
