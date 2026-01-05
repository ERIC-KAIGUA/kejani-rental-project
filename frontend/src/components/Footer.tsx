import React from 'react'
import logo from '/src/assets/KEJANI_LOGO_3.0.png'
import { CiInstagram } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='flex min-h-20 mt-20'>
      <div className='flex items-center justify-evenly w-1/2 border border-main-dark p-10'>
            <div className=''>
                <img src={logo} className='w-1/2 cursor-pointer'></img>
            </div>
            <div className='flex gap-3 text-xl'>
                <CiInstagram />
                <FaXTwitter />
                <FaFacebookF />
            </div>
     </div>

      <div className='flex-row w-1/2 border border-main-dark p-10'>
         <a href='#' className='font-bitter flex'>Help Centre</a>
         <a href='#'className='font-bitter flex'>Privacy Policy</a>
      </div>
    </div>
  )
}

export default Footer
