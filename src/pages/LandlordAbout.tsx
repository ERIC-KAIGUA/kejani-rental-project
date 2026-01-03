import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer';
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


const LandlordAbout = () => {
  const navigate = useNavigate()

  const handleaddlisting = () =>{
      navigate('/Addlistings')
    }
  return (
    <div>
      <div>
        <Header></Header>
      </div>

      <div className='flex border-b border-main-dark'>
        <div className='block items-center justify-center m-10'>
             <h1 className='font-bitter text-lg font-semibold underline text-center'>Let Your Property With Ease, At The Fraction Of The Cost!</h1>
             <p className='font-bitter mt-2 text-wrap m-10'>Renting out your property should be simple, stress-free, and profitable—and that’s exactly what our platform delivers. Instead of paying high agent fees, you’ll save significantly with our affordable plans, all while reaching more tenants directly. We help you attract quality renters quickly with professional listings that stand out, and built-in screening tools give you confidence in who you’re renting to. Automated scheduling and secure communication save you valuable time, and our platform ensures you fill vacancies faster while keeping more of your rental income in your pocket.</p>
             <p className='font-bitter italic text-xl mt-7 text-center'>"Stop losing profits to agent fees—list your property today and keep more of what you earn."</p>
               <div className='flex items-center justify-center mt-5'>
                  <button className='bg-main-dark text-main-white font-quicksand p-2 flex gap-2 shadow-md border rounded-md px-5 py-2.5 active:bg-black transition duration-300 ease-in-out items-center justify-center' onClick={handleaddlisting}> Create an Advert <FaArrowRightLong className='bg-transparent text-main-white' /></button>
                </div>
        </div>
      </div>
      
      <div className='mt-8'>
        <div className='block'>
           <p className='text-center font-bitter text-xl'>Pricing</p>
           <p className='text-center font-bitter'>Pick a package that works for you</p>
        </div>

        <div className='flex items-stretch m-5 justify-center mt-10 gap-2'>

         <div className='w-1/3 border-b border rounded-md border-main-grey py-11'>
            <p className='font-bitter text-center text-2xl'>Free</p>
                <ul className='list-disc list-inside p-3'>
                    <li className='font-bitter'>Advertise on Kejani for free and find tenants fast.</li>
                    <li className='font-bitter'>Your advert is seen by all users on Kejani</li>
                </ul>
            
            
            <div className='flex items-center justify-center mt-10'>
                <button className='bg-main-dark text-main-white font-quicksand p-2 flex gap-2 shadow-md border rounded-md px-28 py-2.5 active:bg-black transition duration-300 ease-in-out items-center justify-center' onClick={handleaddlisting}>Get Started</button>
            </div>
         </div>


         <div className=' bg-green-300/40 w-1/3 border-b border rounded-md border-main-grey py-11'>
            <p className='font-bitter text-center text-2xl bg-green-300/10'>Premium</p>
            <ul className='list-disc list-inside p-3 bg-green-300/10'>
                <li className='font-bitter bg-green-300/10'>Your Advert is accessible to premium tenant users, who have been vetted to suit your specific target tenant</li>
                <li className='font-bitter bg-green-300/10'>Premium tenants are notified once you add create an advert</li>
            </ul>
            
            <div className='flex items-center justify-center mt-7 bg-green-300/10'>
                <button className='bg-main-dark text-main-white font-quicksand p-2 flex gap-2 shadow-md border rounded-md px-28 py-2.5 active:bg-black transition duration-300 ease-in-out items-center justify-center'>Get started</button>
            </div>
         </div>

        </div>
      </div>

      <div className=''>
        <div className='mt-14'>
            <h1 className='font-bitter text-2xl font-semibold text-center text-main-dark'>Reviews</h1>
        </div>

        <div className='flex items-start justify-center mt-9'>
          <div className='w-1/6 bg-main-white shadow-lg p-3 border rounded-xl border-none m-3'>
                 <div className='flex-row text-sm bg-main-white'>
                     <p className='bg-main-white mb-1'>I got a home immediately, Thanks to you</p>
                     <p className='font-extralight bg-main-white'>Mary</p>
                  </div>
           </div>

           <div className='w-1/6 bg-main-white shadow-lg p-3 border rounded-xl border-none m-3'>
                 <div className='flex-row text-sm bg-main-white'>
                     <p className='bg-main-white mb-1'>The process was easy to follow and understand. I'd reccommend it to any landlord who hasn't tried it</p>
                     <p className='font-extralight bg-main-white'>Micheal</p>
                  </div>
           </div>

           <div className='w-1/6 bg-main-white shadow-lg p-3 border rounded-xl border-none m-3'>
                 <div className='flex-row text-sm bg-main-white'>
                     <p className='bg-main-white mb-1'>I accomplished more in a week using kejani than my agent in a month. I will definitely use it again</p>
                     <p className='font-extralight bg-main-white'>Abby</p>
                  </div>
           </div>

           <div className='w-1/6 bg-main-white shadow-lg p-3 border rounded-xl border-none m-3'>
                 <div className='flex-row text-sm bg-main-white'>
                     <p className='bg-main-white mb-1'>This is a game-changer indeed. Truly appreciate Kejani for helping ease the advertisement process</p>
                     <p className='font-extralight bg-main-white'>Peter</p>
                  </div>
           </div>

           <div className='w-1/6 bg-main-white shadow-lg p-3 border rounded-xl border-none m-3'>
                 <div className='flex-row text-sm bg-main-white'>
                     <p className='bg-main-white mb-1'>I have used Kejani on three separate occassions, and each time I have managed to get a tenant within a week! Saved me the hustle of weeks...even months searching for a tenent</p>
                     <p className='font-extralight bg-main-white'>Marie</p>
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

export default LandlordAbout
