import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import Footer from '../components/Footer'
import supabase from '../config/supabaseClient'
import { useUser } from '@clerk/clerk-react';
import { IoTrashSharp } from "react-icons/io5";
import Modal from '../components/Modal'
import DeleteConfirmation from '../forms/DeleteConfirmation'
import toast from 'react-hot-toast';


const Dashboard = () => {

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [propertyToDelete, setPropertyToDelete] = useState(null);
    const {user} = useUser();

   useEffect(() => {
            const fetchProperties = async () => {
              if (!user) {
              //might add a modal if modifications are needed!!
                setLoading(false);
                return;
              }

              const { data: userData, error: userError } = await supabase
                .from('users')
                .select('id') 
                .eq('clerkUserId', user.id)
                .single();

              if (userError || !userData) {
                console.error('Error fetching user or user not found:', userError);
                setLoading(false);
                return;
              }

              const { data, error } = await supabase
                .from('property')
                .select('id, bedrooms, description, rent, coverImage')
                .eq('ownerId', userData.id);
              if (error) console.error('Error fetching properties:', error);
              else setProperties(data || []);
              setLoading(false);
            };
            fetchProperties();
  }, []);

//modal logic. 
     const handleOpenModal = (propertyid) =>{
      console.log('Opening modal with propertyId:', propertyid)
       setPropertyToDelete(propertyid);
        setIsModalOpen(true)
   }

    const handleCloseModal = () => {
    setIsModalOpen(false)
    setPropertyToDelete(null);
   }
// delete logic.
    const handleDelete = async() => {
      if (!propertyToDelete) {
         console.error('No property selected for deletion');
          return;
      }    
      
       const { data: userData } = await supabase
      .from('users')
      .select('id')
      .eq('clerkUserId', user.id)
      .single();
    
    const { error } = await supabase
      .from('property')
      .delete()
      .eq('id', propertyToDelete)
      .eq('ownerId', userData.id);
    
    if (error) {
      console.error('Error deleting property:', error);
    } else {
      setProperties(properties.filter((p) => p.id !== propertyToDelete));
    }
      handleCloseModal();
       toast('You have successfully deleted the listing!')
    }
  

  if (loading) return <div className='font-quicksand text-2xl text-center text-bold'>Loading...</div>;
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
           <p className='font-bitter text-xl text-main-dark'>Welcome to the Dashboard</p>
           <p className='font-bitter text-sm text-main-dark'>From here you can keep track and manage your properties with ease</p>
          </div>

          <div className='flex mt-4'>
            {properties.length === 0? (
                    <div className='min-w-full border-b border rounded-md border-main-grey py-11 shadow-md mt-4'>
                    <p className='font-bitter text-center text-xl text-main-dark underline-offset-4'>Manage listings</p>
                        <ul className='list-disc list-inside p-3'>
                            <p className='font-bitter italic text-sm text-center'>From here you can manage your property listings.</p>
                        </ul>
                    
             </div>
            ):(
          <div className='flex justify-center items-center'>
                {properties.map((property)=>(
                    <div key={property.id} className='flex flex-row w min-w-full border-b border rounded-md border-main-grey py-4 shadow-md mt-4 bg-white'>
                              <div className='p-3'>
                                  <img src={property.coverImage}  className='w-fit h-32 mx-auto rounded-sm shadow-md' />
                              </div>
                                    

                              <div className='flex flex-col ml-3 px-4 py-2'>
                                            <div className='flex'>
                                                <h3 className='font-bitter text-center text-xl text-main-dark line-clamp-1'>{property.description}</h3>
                                            </div>
                                        <div className='mt-2'>
                                            <p className='font-bitter text-center text-sm text-main-dark'>{property.bedrooms} BR</p>
                                            <p className='font-bitter text-center text-sm text-main-dark'>Ksh. {property.rent}/Month</p>
                                        </div>

                                        <div className='mt-4'>
                                                <button
                                                        onClick={() => handleOpenModal(property.id)}
                                                        className='bg-red-500 text-white flex flex-row gap-2 items-center justify-center px-4 py-2 rounded-md mx-auto block mt-2 shadow-sm font-quicksand active:bg-red-700'
                                                        >
                                                    <IoTrashSharp className=''/> Delete
                                            </button>
                                            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Delete Confirmation" onConfirm={handleDelete}>
                                              <DeleteConfirmation onClose={handleCloseModal} onConfirm={handleDelete}></DeleteConfirmation>
                                            </Modal> 
                                        </div>
                               </div>
                  </div>
                ))}    
              </div>
            )}
             
          </div>
        </div>
        </div>

        <div className=''>
           <Footer></Footer>
        </div>
      
    </div>
  )
}

export default Dashboard
