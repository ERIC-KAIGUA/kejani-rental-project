import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import Footer from '../components/Footer'
import supabase from '../config/supabaseClient'
import { useUser } from "@clerk/clerk-react"
import { IoTrashSharp } from "react-icons/io5";
import DeleteConfirmation from '../forms/DeleteConfirmation'
import Modal from '../components/Modal'
import toast from 'react-hot-toast';



const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favToDelete, setFavToDelete] = useState(null);
  const { user, isLoaded } = useUser();

  useEffect(()=>{
    const fetchFavourites = async()=>{
      if(!isLoaded) return;
      if(!user){
        console.log("No user was found, Log in!")
        setLoading(false)
        return
      }

      const {data: supaUser, error:userError} = await supabase
      .from("users")
      .select("id")
      .eq("clerkUserId", user.id)
      .single();

      if( userError || ! supaUser){
        console.log("Tried fetch the user but user was not found!!")
        setLoading(false)
        return
      }
       const userId = supaUser.id;

       const { data:favs, error: favError } = await supabase
       .from("favourite")
       .select(`
        id,
        propertyId,
        property(
        id,
        location,
        town,
        rent,
        description,
        bedrooms,
        images,
        coverImage)
        `)
        .eq("userId",userId);

        if(favError){
          console.log("Tried fetching favourites but favourites wasn't found!!")
          setLoading(false)
          return
        }
        setFavourites(favs)
    }
    fetchFavourites()
    setLoading(false)
  }, [user, isLoaded])

  //Modal Logic!!
  const handleOpenModal = (propertyid)=>{
   console.log("Opening modal with propertyId:", propertyid)
   setFavToDelete(propertyid);
   setIsModalOpen(true)
  }

  const handleCloseModal = ()=>{
    setIsModalOpen(false)
    setFavToDelete(null);
  }

  //Delete favourite Logic
const handleFavDelete= async()=>{
  //checks if there is a favourite property to delete
  if(!favToDelete){
    console.log("There is no favourite property to Delete!!")
    return
  }
// checks if user is in the records
    const{data:supaData} = await supabase
    .from("users")
    .select("id")
    .eq("clerkUserId", user.id)
    .single();

    const {error:deleteError} = await supabase
    .from("favourite")
    .delete()
    .eq("propertyId", favToDelete)
    .eq("userId", supaData.id);

    if(deleteError){
      console.error("Failed to delete:", error)
    }else{
      setFavourites(favourites.filter((f) => f.propertyId !== favToDelete));
    }
     handleCloseModal();
     toast('✅  You successfully deleted your favorite listing!')
} 
  if (loading) return <p className="font-quicksand text-2xl text-center text-bold">Loading your favorites...</p>;
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
                    <p className='font-bitter text-xl text-main-dark'>Favourites.</p>
                    <p className='font-bitter text-sm text-main-dark'>You can see all the properties you added to your favourites by clicking the star icon on the property page</p>
                </div>

                <div className='mt-11'>
                  {favourites.length === 0? (
                         <div className='border border-main-grey rounded-md space-y-6 p-10 shadow-md'>
                           <p className='font-bitter italic text-sm text-center'>Your favourites list is currently empty.</p>
                           </div>
                  ):(
                    <div className='flex justify-center items-center'>
                      {favourites.map((fav)=>(
                           <div key={fav.id} className='flex flex-row w min-w-full border-b border rounded-md border-main-grey py-4 shadow-md mt-4 bg-white'>
                                          <div className='p-3'>
                                               <img src={fav.property.coverImage} className='w-fit h-32 mx-auto rounded-sm shadow-lg'/>
                                            </div>
                                                              
                          
                                            <div className='flex flex-col ml-6 px-4 py-2'>
                                                     <div className='flex'>
                                                         <h3 className='font-bitter text-center text-xl font-semibold text-main-dark line-clamp-1'>{fav.property.location}, {fav.property.town},</h3>
                                                     </div>
                                                      <div className='mt-3'>
                                                             <p className='font-bitter text-center text-lg text-main-dark'>Ksh.{fav.property.rent}/Month,</p>
                                                             <p className='font-bitter text-center text-lg text-main-dark'>{fav.property.bedrooms} BR.</p>    
                                                       </div>
                          
                                                      <div className='mt-4'>
                                                            <button
                                                               onClick={() => handleOpenModal(fav.property.id)}
                                                               className='bg-red-500 text-white flex flex-row gap-2 items-center justify-center px-6 py-3 rounded-md mx-auto block mt-2 shadow-sm font-quicksand active:bg-red-700'
                                                                 >
                                                                  <IoTrashSharp className=''/> Delete
                                                               </button>
                                                                      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Delete Confirmation" onConfirm={handleFavDelete}>
                                                                        <DeleteConfirmation onClose={handleCloseModal} onConfirm={handleFavDelete}></DeleteConfirmation>
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

export default Favourites