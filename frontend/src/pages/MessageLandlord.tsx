import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import Verification from '../forms/Verification'
import { useLocation } from 'react-router-dom'
import { useAuth } from "@clerk/clerk-react";



 const MessageLandlord = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenModal = ()=>{
        setIsModalOpen(true)
    }
    const handleCloseModal = () =>{
        setIsModalOpen(false)
    }
     const location = useLocation();
     const {landlordName} = location.state || {};

     const { getToken } = useAuth();
     const SUPABASE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL;
     
  // This function will be called when your modal form is submitted
  const handleVerificationSubmit = async ({ firstName, lastName, phoneNumber }) => {
    try {
      // ✅ Get a Clerk JWT token for Supabase
      const token = await getToken({ template: "supabase" });

      // ✅ Send request to Supabase Edge Function
      const response = await fetch(`${SUPABASE_FUNCTION_URL}/sendVerification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 👈 Very important
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phoneNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error:", data);
        alert(data.error || "Something went wrong");
        return;
      }

      alert("Verification code sent successfully!");
      console.log("Server response:", data);

    } catch (error) {
      console.error("Verification error:", error);
      alert("Failed to send verification code. Please try again.");
    }
  };


  return (
    <div>
      <div>
        <Header></Header>
      </div>

      <div className=''>
        <div className='px-20 mt-5'>
             <h1 className='font-bitter text-xl text-main-dark'>Message Landlord</h1>
             <p className='font-bitter text-sm text-main-dark'>Property Description:</p>
             <p className='font-bitter text-sm text-main-dark'>Landlord Name:{landlordName || "Unknown Landlord"}</p>

             <div className='border border-gray-500 rounded-md p-5 mt-8'>
                <div className='border border-gray-500 p-10 rounded-md bg-green-300 shadow-md'>
                      <p className='font-bitter text-main-dark'>Verifying your phone number is <span className='font-semibold'>Required</span> before messaging the landlord. Here's why:</p>
                      <ul className='list-disc list-inside mt-4 font-bitter text-main-dark text-sm space-y-2'>
                        <li>It shows you're a serious prospective tenant.</li>
                        <li>It lets you see the landlord's availability. </li>
                        <li>The landlord is immediately notified of your request via SMS.</li>
                        <li>Verified requests have a higher and faster response rate.</li>
                        <li>The landlord can see that your number and details are verified.</li>
                      </ul>
                      <hr className='border border-gray-400 border-opacity-30 mt-4'></hr>

                      <button className='font-bitter text-sm bg-main-dark text-main-white px-4 py-2 rounded-md shadow-md mt-3 active:bg-black transition duration-200 ease-in-out' onClick={handleOpenModal}>Verify Number & Message the landlord now</button>
                      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Verification Form">
                        <Verification onClose={handleCloseModal} onSubmit={handleVerificationSubmit}></Verification>
                      </Modal>
                </div>
             </div>

             <div className='mt-4 hidden'>
                 <div className='border border-gray-500 rounded-md p-10'>
                     <p className='font-bitter text-main-dark text-lg'>Send Message</p>

                     <div className='flex flex-col mt-4'>
                       <label className='font-bitter text-sm text-main-dark font-semibold'>Subject</label>
                       <textarea className='font-quicksand outline-none p-1 rounded-md'rows={1}></textarea>
                     </div>

                     <div className='flex flex-col mt-2'>
                       <label className='font-bitter text-sm font-semibold text-main-dark'>Message</label>
                       <textarea rows={8} className='outline-none font-quicksand p-4 rounded-md'></textarea>
                     </div>
                     <button className='font-bitter bg-green-700 text-main-white px-4 py-2 rounded-md mt-4 active:bg-green-950 transition duration-300 ease-in-out'>Send Message</button>
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

export default MessageLandlord
