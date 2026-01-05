import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header'
import { IoMdArrowDropleftCircle } from "react-icons/io";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import { IoBedOutline } from "react-icons/io5";
import { IoMdPeople } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { IoPersonCircle } from "react-icons/io5";
import supabase from '../config/supabaseClient';
import { useUser } from "@clerk/clerk-react";



type Property = {
  id: number;
  location?: string;
  town?: string;
  bedrooms?:number;
  description?: string;
  rent?: number;
  maxtenants?:number;
  propertyType: string;
  images?:string[];
  coverImage?:string;
  students?:boolean;
  families?:boolean;
  pets?:boolean;
  parking?:boolean;
  outdoor?:boolean;
  furnishingOptions?:Text;
  ownerId?:number;
}

const ItemProperty = () => {
    const navigate = useNavigate()
    const handleBacktoSearch = ()=>{
        navigate('/Searchpage')
    }

    const handleMessageLandlord = () =>{
      navigate('/MessageLandlord',{
               state: {
        landlordName: property.users?.fullName
      } 
      }) 
    }

    const {id} = useParams();
    const [property , setProperty]= useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")
    const [click, setClick] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageList, setImageList] = useState<string[]>([])
    const user = useUser();
    const [isFav, setIsFav]= useState(false);
    const [isLoading, setIsLoading]= useState(false);

    const handleClickFavourite = async() => {
              if (!user?.user?.id) {
              alert("Please sign in to save favorites");
            return;
          }
          setIsLoading(true);

          try{
            const {data:appUser, error:userError} = await supabase
            .from("users")
            .select("id")
            .eq("clerkUserId", user.user.id)
            .single();

            if(userError || !appUser) {
              alert("User profile not found. Please Log in.");
               return;
            }

            const appUserId = appUser.id;

            const {data:existingFav} = await supabase
            .from("favourite")
            .select("id")
            .eq("userId", appUserId)
            .eq("propertyId", property.id)
            .single()

            if(error && error.code !== "PGRST116") throw error;

            if(existingFav){
              const {error:deleteError} = await supabase
              .from("favourite")
              .delete()
              .eq("id", existingFav.id);
              if (deleteError) throw deleteError;

              setClick(false)
              setIsFav(false)

              } else {
                const {error: insertError } = await supabase
                .from("favourite")
                .upsert({
                  userId: appUserId,
                  propertyId: property.id
                });
                if (insertError) throw insertError;

                setClick(true);
                setIsFav(true);
              }
            
          }catch(error){
            console.error("Favourite Error:",error);
            alert("Failed to update favoutite, Try again.");
            setIsFav(previous); 
           setLoading(false);
           return false;
          } finally {
            setIsLoading(false);
          }
    }
       
    useEffect(()=>{
      const checkIfFavourited = async () =>{
        if(!user?.user?.id || !property?.id){
           setClick(false)
           return
        } 
      

        try {
      
      const { data: appUser } = await supabase
        .from("users")
        .select("id")
        .eq("clerkUserId", user.user.id)
        .single();

      if (!appUser) return;

      const { data,error } = await supabase
        .from("favourite")
        .select("id")
        .eq("userId", appUser.id)
        .eq("propertyId", property.id)
        .single();

        if (error && error.code !== 'PGRST116') {
        console.error("Supabase error:", error);
        return;
      }
     setClick(!!data);  
     setIsFav(!!data);
    } catch (err) {
      console.error("Failed to check favorite:", err);
    }
  };
      checkIfFavourited();
      
    },[user?.user?.id, property?.id])

    useEffect(()=>{
      if(property){

        const allImages = property.images?.length ?
        [property.coverImage, ...property.images]
        : [property.coverImage];
        setImageList(allImages);
        setCurrentImageIndex(0)
      }
    },[property])

     const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imageList.length - 1 : prevIndex - 1
    );
  };

   const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
    );
  };



    useEffect(()=>{
      const fetchProperty = async()=>{
        const {data,error} = await supabase
        .from("property")
        .select(`*, 
          users:ownerId(
            fullName
          )
        `)
        .eq("id",id)
        .single();

        if(error) {console.error("Failed to fetch property:",error)
          setError("Failed to load Property")
          setProperty(null)
        }else{
          setProperty(data)
        }
          setLoading(false)
      }
      fetchProperty();
    }, [id])

     if (loading) return <p className='font-quicksand text-2xl text-main-dark'>Loading property…</p>;
     if (error) return <p>{error}</p>;
     if (!property) return <p className='font-quicksand text-2xl text-main-dark'>Property not found.</p>;
  return (
    <div>
            <div >
                <Header></Header>
            </div>

            <div className=''>
                  <div className='flex flex-row p-3 gap-2'>
                    {/*Left-Section*/}
                    <div className='flex flex-col w-2/3 rounded-lg bg-white shadow-lg'>
                        <div className='p-2'>
                            <button className='flex items-center justify-center gap-2 font-bitter text-main-dark bg-none text-sm border border-gray-600 rounded-sm shadow-md px-4 py-2 hover:bg-main-dark hover:text-white transition duration-300 ease-in-out active:bg-black' onClick={handleBacktoSearch}> <BsArrowLeft /> Back to search</button>
                        </div>

                        <div className='flex items-center justify-center mt-4'>
                            <div className='flex relative w-2/3 items-center justify-center'>
                            <AnimatePresence mode='wait'>
                            {imageList.length > 0 && (
                                     <motion.img src={imageList[currentImageIndex]} alt={`Property Image ${currentImageIndex + 1}`}  key={imageList[currentImageIndex]} className='rounded-lg shadow-md w-full h-auto object-cover transition-all duration-300 ease-in-out' loading='eager'
                                    initial={{ opacity: 0, x: 0 }}
                                    animate={{ opacity: 1, x: 0 }}
                                     exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    />
                            )}
                                   
                            </AnimatePresence>
                                   
                              <div className=''>
                                 <button className='absolute left-3 text-2xl active:text-main-brown' onClick={handlePrevImage}><IoMdArrowDropleftCircle /></button>
                                 <button className='absolute right-3 text-2xl active:text-main-brown' onClick={handleNextImage}><IoMdArrowDroprightCircle /></button>
                                 <button className='absolute flex items-center justify-center bottom-3 right-3 gap-2 text-sm font-quicksand bg-white px-3 py-1.5 rounded-md'onClick={handleClickFavourite} disabled={isLoading} aria-pressed={isFav}>
                               {isLoading ? (
                                        <span className="loading loading-spinner loading-xs"></span>
                                      ) : isFav ? (
                                        <>
                                          <FaStar className="text-gold text-lg" />
                                          <span className="text-gold font-semibold">Saved</span>
                                        </>
                                      ) : (
                                        <>
                                          <FaRegStar className="text-black text-lg" />
                                          <span className="text-black">Favorite</span>
                                        </>
                                      )}
                                    </button>
                              </div>
                            </div>
                        </div>

                        <div className='px-10 mt-2'>
                            <p className='font-bitter text-xl text-main-dark font-semibold'>{property.bedrooms} BR {property.propertyType}</p>
                            <div className='flex gap-3 mt-1'>
                                <div className='flex items-center justify-center gap-1 border border-gray-500 rounded-md px-1 shadow-md'>
                                    <IoBedOutline className='text-main-dark'/>
                                    <p className='font-quicksand text-main-dark text-sm'>{property.bedrooms}</p>
                                </div>

                                <div className='flex items-center justify-center gap-1 border border-gray-500 rounded-md px-1 shadow-md'>
                                    <IoMdPeople className='text-main-dark' />
                                    <p className='font-quicksand text-main-dark text-sm'>{property.maxtenants} tenants max.</p>
                                </div>

                                 <div className='flex items-center justify-center gap-1 border border-gray-500 rounded-md px-1 shadow-md'>
                                    <IoLocationSharp className='text-main-dark'/>
                                    <p className='font-quicksand text-main-dark text-sm'>{property.location}</p>
                                </div>
                            </div>
                        </div>

                        <div className='mt-4 px-10'>
                           <h1 className='font-bitter text-main-dark text-xl mb-1'>Description</h1>
                           <p className='font-bitter text-sm text-main-dark'>{property.description}</p>
                        </div>

                        <div className='flex flex-row mt-5'>
                            <div className='flex flex-col  w-1/2 p-5 px-10'>
                                 <h1 className='font-bitter text-main-dark font-semibold mb-1'>Price & Bills</h1>
                                 <p className='font-bitter text-sm text-main-dark mb-2'>Deposit:</p>
                                 <hr className='border-gray-500 border-opacity-20'></hr>
                                 <p className='font-bitter text-sm text-main-dark mb-2'>Garbage Collection:</p>
                                   <hr className='border-gray-500 border-opacity-20'></hr>
                                 <p className='font-bitter text-sm text-main-dark mb-2'>Water:</p>
                                   <hr className='border-gray-500 border-opacity-20'></hr>
                                 <p className='font-bitter text-sm text-main-dark'>Internet:</p>
                            </div>

                            <div className='flex flex-col  w-1/2 p-5'>
                                  <h1 className='font-bitter text-main-dark font-semibold mb-1'>Tenant Preferences</h1>
                                 <p className=' flex font-bitter text-sm text-main-dark mb-2'>Student friendly:{property.students ? (<FaCheck className='text-green-500 ml-2'/>) : (<ImCross className='text-red-500 ml-2' />)} </p>
                                  <hr className='border-gray-500 border-opacity-20'></hr>
                                 <p className='flex font-bitter text-sm text-main-dark mb-2'>Family friendly:{property.families? (<FaCheck className='text-green-500 ml-2'/>) : (<ImCross className='text-red-500 ml-2' />)}</p>
                                  <hr className='border-gray-500 border-opacity-20'></hr>
                                 <p className='flex font-bitter text-sm text-main-dark'>Pets Allowed:{property.pets? (<FaCheck className='text-green-500 ml-2'/>) : (<ImCross className='text-red-500 ml-2' />)}</p>
                            </div>

                        </div>

                        <div className='flex flex-col items-center justify-center mt-2'>
                                 <h1 className='font-bitter text-main-dark font-semibold'>Features</h1>
                                 <p className='flex font-bitter text-sm text-main-dark mb-2'>Parking: {property.parking ? (<FaCheck className='text-green-500 ml-2'/>) : (<ImCross className='text-red-500 ml-2' />)}</p> 
                                 <p className='flex font-bitter text-sm text-main-dark mb-2'>Outdoor Space: {property.outdoor ? (<FaCheck className='text-green-500 ml-2'/>) : (<ImCross className='text-red-500 ml-2' />)}</p>
                                 <p className='flex font-bitter text-sm text-main-dark mb-2'>Furnishing: {property.furnishingOptions === "furnished" ? (<FaCheck className='text-green-500 ml-2'/>) : (<ImCross className='text-red-500 ml-2' />)}</p>
                        </div>
                    </div>


                     {/*Right-Section*/}
                    <div className='flex flex-row  w-1/3 rounded-lg bg-white shadow-lg'>
                        <div className='flex-flex-col px-20 py-20'>

                              <div className='flex items-center justify-center'>
                                  <button className='cursor-default bg-green-500 text-white font-quicksand text-sm p-1 rounded-md shadow-md '>Available</button>
                             </div>

                             <div className='flex flex-col mt-4'>
                                <p className='font-bitter text-2xl text-main-dark text-center'>Ksh.{property.rent} per Month</p>
                             </div>

                              <div className='flex flex-col mt-32'>
                                  <p className='text-center font-bitter text-xl text-main-dark mb-2'>Next Steps</p>
                                  <button className='bg-green-500 font-bitter text-white px-4 py-2 rounded-lg hover:bg-green-800 transition duration-200 ease-in-out active:bg-green-950' onClick={handleMessageLandlord}>Message the landlord</button>
                             </div>

                             <div className='mt-20'>
                                  <p className='font-bitter text-xl text-main-dark text-center'>Landlord Profile</p>
                                    <IoPersonCircle className=' text-4xl text-center ml-24'/>
                                    <p className='font-bitter text-lg text-main-dark text-center'>{property.users?.fullName || "Unknown Landlord"}</p>
                             </div>

                        </div>

                       
                        
                    </div>
                  </div>
            </div>
    </div>
  )
}

export default ItemProperty
