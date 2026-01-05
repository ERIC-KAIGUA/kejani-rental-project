import React, { useRef, useState } from 'react'
import { addPropertyDetails, uploadImagesToBucket } from '../services/propertyRoute';
import { getCoordinatesFromAddress } from '../services/Geocode';
import supabase from '../config/supabaseClient';
import { useUser } from '@clerk/clerk-react';
import Header from '../components/Header'
import Footer from '../components/Footer';
import Calendar from 'react-calendar'
import { BsToggleOff } from "react-icons/bs";
import { BsToggleOn } from "react-icons/bs";
import { TbPhotoFilled } from "react-icons/tb";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import 'react-calendar/dist/Calendar.css';
import toast from 'react-hot-toast';
import imageCompression from 'browser-image-compression';



const Addlistings = () => {
   const fileInputRef = useRef(null);
   const [images , setImages] =  useState([])
   const { user } = useUser();
   const [showTextarea, setShowTextarea] = useState(false);
   const [parking , setParking] = useState(false)
   const [amenities , setAmenities] = useState(false)
   const [outdoor , setOutdoor] = useState(false)
   const [internet , setInternet] = useState(false)
   const [students , setStudents] = useState(false)
   const [families , setFamilies] = useState(false)
   const [pets , setPets] = useState(false)
   const [singles , setSingles] = useState(false)
   const [showDropdown, setShowDropdown] = useState(false)
   const [showDropdownmenu, setShowDropdownmenu] = useState(false)
   const [selected, setSelected] = useState("")
   const [select,setSelect] = useState("")
   const [formError , setFormError] = useState(null)
   const [location, setLocation] = useState("")
   const [town, setTown] = useState("")
   const [bedrooms, setBedrooms] = useState("")
   const [bathrooms, setBathrooms] = useState("")
   const [description, setDescription] = useState("")
   const [rent, setRent] = useState("")
   const [deposit, setDeposit] = useState("")
   const [maxtenants, setMaxTenants] = useState("")
   const [coverImage , setCoverImage] = useState("");

   const options = [
   "House",
   "Apartment"
  ];

  const furnishingoptions = [
   "furnished",
   "unfurnished",
  ];

   const handleButtonClick = () => {
      fileInputRef.current.click();
   }

    const handleFileChange = async (e) => {
         const files = Array.from(e.target.files);
          const options = {
             maxSizeMB:1,
             maxWidthOrHeight: 1200,  // Resize long side to 1200px
             useWebWorker: true,    
          };

          const compressedImages = await Promise.all(
            files.map(async(file)=>{
               const compressedFile = await imageCompression(file,options);

               return{
                  file: compressedFile,
                  preview:URL.createObjectURL(compressedFile)
               }
            })
          )
         setImages((prev) => [...prev, ...compressedImages]);
  };
   
  const handleDeletePhoto = (id) =>{
    setImages((prev) => prev.filter((img)=> img.id !== id))
  }

  const handleOpentextbox = () => {
     setShowTextarea((prev) => !prev)
  }

  const handleSelect = (option:any) => {
     setSelected(option)
     setShowDropdown(false)
  }

  const handleFurnishselect = (furnishoption:any) => {
     setSelect(furnishoption)
     setShowDropdownmenu(false)
  }
  const handleKeyDown = (e) => {
    if (e.key === '-' || e.key === 'e' || e.key === '.') {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
       e.preventDefault()
       try{
              const clerkUserId = user?.id;
       if (!clerkUserId) throw new Error("No logged-in user found");

      
      const { data: supaUser, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("clerkUserId", clerkUserId)
        .single();

      if (userError || !supaUser) throw new Error("Could not find user in Supabase");

    const ownerId = supaUser.id;
    const trimmedLocation = location.trim();
    const trimmedTown = town.trim();
    const trimmedDescription = description.trim();
    const numBedrooms = Number(bedrooms);
    const numBathrooms = Number(bathrooms);
    const numRent = Number(rent);
    const numDeposit = Number(deposit);
    const numMaxTenants = Number(maxtenants);
    
    if (!trimmedLocation || !trimmedTown || !numBedrooms || !numBathrooms || !trimmedDescription || !numRent || !numDeposit || !numMaxTenants){
      setFormError('Please fill in all the required fields');
      console.log('Validation failed:', { location, town, bedrooms, bathrooms, description, rent, deposit, maxtenants });
      return;
    }
   
     if (images.length === 0) {
        setFormError('Please add at least one image');
        return;
    }
    const fullAddress = `${trimmedLocation}, ${trimmedTown}`;

    const coords = await getCoordinatesFromAddress(fullAddress);
    if(!coords){
      setFormError("Could not find location on the map. Please check your address.");
      return;
    }
     
    const uploadedUrls = await uploadImagesToBucket(images);

    const coverUrl = (() => {
      if(!coverImage) return null;
      const selectedIndex = images.findIndex((img)=> img.preview === coverImage);
      return uploadedUrls[selectedIndex] || null;
    })();

      const propertyDetails = {
      location: trimmedLocation,
      town: trimmedTown,
      bedrooms: numBedrooms,
      bathrooms: numBathrooms,
      description: trimmedDescription,
      rent: numRent,
      deposit: numDeposit,
      maxtenants: numMaxTenants,
      propertyType: selected,
      furnishingOptions: select,
      parking,
      amenities,
      outdoor,
      internet,
      students,
      families,
      pets,
      singles,
      images: uploadedUrls,
      coverImage: coverUrl,
      lat:coords.lat,
      lng:coords.lng,
      ownerId:ownerId
    };
    const { data, error } = await addPropertyDetails(propertyDetails);

        if(error){
         setFormError('Failed to add property details into the DB!!');
         console.log(error)
         return
        }else{
         setFormError(null)
         console.log(data)
         console.log('Successfully added')
         toast('You have submitted successfully!')
       }
           
       }catch(error){
         console.error("This is the error:",error)
       }            
 }
 
 
  return (
    <div>
     <form onSubmit={handleSubmit}>
        <div className=''>
            <Header></Header>
        </div>

        <div className='mt-12'>
         <p className='text-center font-bitter text-lg underline font-semibold'>"Your next tenant is waiting!"</p>
        </div>

        <div className='mt-1 flex items-center justify-center'>
          <p className='flex text-center px-5 py-1 font-bitter text-md text-wrap'>To find tenants for your property, just give us the details and we'll let people know it's available. We'll connect you with potential tenants, and you can handle the viewings. We're also able to help with referencing tenants, drafting the contract, and managing the deposit, to make the entire process easy for you.</p>
        </div>
    
        <div className='mt-10'>
             <p className='text-center font-bitter text-xl'>Property Details</p>
   
          <div className='flex'>
            
                <div className='flex flex-col gap-3 w-1/2'>
                            <div className='flex flex-col px-24 py-4'>
                                    <label className='font-quicksand font-semibold text-sm'>Location</label>
                                    <input type='text' className='p-1 border border-main-grey rounded-md focus:outline-none  bg-main-brown' value={location} id='location' onChange={(e) => setLocation(e.target.value)}></input>
                            </div>

                            <div className='flex flex-col px-24 py-4'>
                                    <label className='font-quicksand font-semibold text-sm'>Town</label>
                                    <input type='text' className='p-1 border border-main-grey rounded-md focus:outline-none  bg-main-brown' value={town} id='town' onChange={(e) => setTown(e.target.value)}></input>
                            </div>
                </div>

            <div className='flex flex-col gap-3 w-1/2'>
                <div className='flex flex-col px-24 py-4'>
                  <div className='flex flex-col relative'>
                    <label className='font-quicksand font-semibold text-sm'>Property Type</label>
                    
                    <input type='text' readOnly value={selected} className='p-1 border border-main-grey rounded-md focus:outline-none font-quicksand bg-main-brown' placeholder='Please select...'  id='propertyType'></input>
                    <button className='absolute right-3 top-7' onClick={()=>setShowDropdown(!showDropdown)} type='button'><FaAngleDown/></button>

                    {showDropdown  && (

                     <div className='absolute bg-main-white border-main-grey border rounded-lg shadow-md top-16 right-0 p-4 z-10'>

                        <ul className=''>
                           {options.map((option,index)=>(
                             <li key={index} onClick={()=>handleSelect(option)} className='font-quicksand text-sm cursor-pointer mb-2'>{option}</li>
                           ))}
                       </ul>

                     </div>
                    )}
                    </div>
                 </div>  

                 <div className='flex flex-col px-24 py-4'>
                    <label className='font-quicksand font-semibold text-sm'>No. of Bedrooms</label>
                    <input type='number' min="0" step="1" className='no-number-arrows p-1 border border-main-grey rounded-md focus:outline-none appearance-none bg-main-brown' onKeyDown={handleKeyDown} value={bedrooms} id='bedrooms' onChange={(e) => setBedrooms(e.target.value)}></input>
                 </div> 

                 <div className='flex flex-col px-24 py-4'>
                    <label className='font-quicksand font-semibold text-sm'>No. of Bathrooms</label>
                    <input type='number' min="0" step="1" className='no-number-arrows p-1 border border-main-grey rounded-md focus:outline-none  bg-main-brown' onKeyDown={handleKeyDown} value={bathrooms} id='bathrooms' onChange={(e) => setBathrooms(e.target.value)}></input>
                 </div> 

                 <div className='flex flex-col px-24 py-4'>
                    <label className='font-quicksand font-semibold text-sm'>Furnishing Options</label>
                    <div className='flex flex-col relative'>
                    <input type='text' readOnly placeholder="Select a choice" value={select} className='p-1 font-quicksand border border-main-grey rounded-md focus:outline-none  bg-main-brown' id='furnishingOptions'></input>
                    <button className='absolute right-3 top-2' onClick={()=>setShowDropdownmenu(!showDropdownmenu)} type='button'><FaAngleDown/></button>
                    {showDropdownmenu && (
                     <div className='absolute bg-main-white border-main-grey border rounded-lg shadow-md top-10 right-0 p-4 z-10'>
                        <ul className=''>
                           {furnishingoptions.map((furnishoption,index)=>(
                               <li key={index} onClick={()=>handleFurnishselect(furnishoption)} className='font-quicksand text-sm cursor-pointer mb-2'>{furnishoption}</li>
                           ))}
                           
                        </ul>
                     </div>
                    )}
                    </div>
                 </div> 
            </div>
         </div>
    </div>

   <div className='ml-24'>
        <p className='font-bitter text-lg mb-3'>Property Description</p>
        <div className='flex flex-col'>
            <button className='bg-main-dark text-main-white w-1/5 px-3 py-2 font-quicksand rounded-md active:bg-black transition duration-300 ease-in-out' onClick={handleOpentextbox} type='button'>Write a short Description</button>
            {showTextarea && (
               <textarea placeholder='Write a short description...'rows={6} className='w-1/2 h-1/2 font-quicksand rounded-sm shadow-md p-3 focus:outline-none mt-4' value={description} id='description' onChange={(e) => setDescription(e.target.value)}></textarea>
               )} 
       </div>
   </div>

    
        <div className='mt-10'>
           <p className='text-center font-bitter text-xl'>Tenancy Details</p>
             <div className='flex'>
                <div className='flex flex-col gap-3 w-1/2'>
                                <div className='flex flex-col px-24 py-4'>
                                        <label className='font-quicksand font-semibold text-sm'>Monthly Rent for Property</label>
                                        <input type='number'min="0" step="1" className='no-number-arrows p-1 border border-main-grey rounded-md focus:outline-none  bg-main-brown' onKeyDown={handleKeyDown} value={rent} id='rent' onChange={(e) => setRent(e.target.value)}></input>
                                </div>

                                <div className='flex flex-col px-24 py-4'>
                                        <label className='font-quicksand font-semibold text-sm'>Deposit Amount</label>
                                        <input type='number'min="0" step="1" className='p-1 border border-main-grey rounded-md focus:outline-none  bg-main-brown' onKeyDown={handleKeyDown} value={deposit} id='deposit' onChange={(e) => setDeposit(e.target.value)}></input>
                                </div>

                                <div className='flex flex-col px-24 py-4'>
                                        <label className='font-quicksand font-semibold text-sm'>Maximum Number of Tenants</label>
                                        <input type='number'min="0" step="1" className='p-1 border border-main-grey rounded-md focus:outline-none bg-main-brown' onKeyDown={handleKeyDown} value={maxtenants} id='maxtenants' onChange={(e) => setMaxTenants(e.target.value)}></input>
                                </div>
                    </div>

                    <div className='flex flex-col w-1/2'>
                        <div className='mt-4'>
                          <p className='font-quicksand font-semibold text-sm mb-4'>Earliest Moving Date</p>
                              <Calendar className='my-calendar' tileDisabled={({date,view}) => view === "month" && date < new Date().setHours(0,0,0,0)}/>
                        </div>
                    </div>
                </div>
              
        </div>

        <div className='mt-7'>
          <p className='text-center font-bitter text-xl'>Property Features</p>
          <p className='text-center font-bitter text-md mt-5'>Tell us more about your property</p>
          
           <div className='flex mt-5'>
              <div className='flex flex-col w-1/2 gap-2 px-40'>
               <label className='font-quicksand font-semibold text-sm'>Parking</label>
                  <button onClick={()=>setParking(!parking)} type='button'>  
                     {parking ?  (
                        <BsToggleOn  className='text-4xl text-green-700'/>
                           
                     ) : (
                        <BsToggleOff className='text-4xl'/>       
                     )}
                  </button>
              
               <label className='font-quicksand font-semibold text-sm'>Amenities ( Gym, Swimming-Pool etc. )</label>
              <button onClick={() => setAmenities(!amenities)} type='button'>  
                 {amenities ? (
                          <BsToggleOn  className='text-4xl text-green-700'/>
                        
                 ) : (
                           <BsToggleOff className='text-4xl'/> 
                 )}
               </button>
               </div>

               <div className='flex flex-col w-1/2 gap-2 px-24'>
                  <label className='font-quicksand font-semibold text-sm'>Outdoor Space</label>
                 <button onClick={()=>setOutdoor(!outdoor)} type='button'>
                  {outdoor ? (
                     <BsToggleOn  className='text-4xl text-green-700'/>
                      
                  ):(
                        <BsToggleOff className='text-4xl'/>
                  )}
                    </button>
                  <label className='font-quicksand font-semibold text-sm'>Internet Access</label>
                  <button onClick={()=>setInternet(!internet)} type='button'>  
                     { internet ? (
                         <BsToggleOn  className='text-4xl text-green-700'/>
                           
                     ):(
                          <BsToggleOff className='text-4xl'/>
                     )}
                      </button>
               </div>
           </div>
        </div>

        <div className='mt-7'>
            <p className='text-center font-bitter text-xl'>Tenant Preferences</p>
              <div className='flex mt-7'>
                 <div className='flex flex-col w-1/2 px-40 gap-2'>
                      <label className='font-quicksand font-semibold text-sm'>Students Only</label>
                       <button onClick={()=>setStudents(!students)} type='button'>
                        {students ? (
                           <BsToggleOn  className='text-4xl text-green-700'/>
                        ):(
                            <BsToggleOff className='text-4xl cursor-pointer'/>
                        )}
                        </button>
                        <label className='font-quicksand font-semibold text-sm'>Families Only</label>
                       <button onClick={()=>setFamilies(!families)} type='button'>
                        {families ? (
                           <BsToggleOn  className='text-4xl text-green-700'/>
                        ):(
                           <BsToggleOff className='text-4xl cursor-pointer'/>
                        )}
                        </button> 
                 </div>
                 <div className='flex flex-col w-1/2 px-24 gap-2'>
                       <label className='font-quicksand font-semibold text-sm'>Pets Allowed</label>
                       <button onClick={()=>setPets(!pets)} type='button'> 
                        {pets ? (
                           <BsToggleOn  className='text-4xl text-green-700'/>
                        ):(
                            <BsToggleOff className='text-4xl cursor-pointer'/>
                        )}
                       </button> 
                         <label className='font-quicksand font-semibold text-sm'>Singles Only</label>
                         <button onClick={()=>setSingles(!singles)} type='button'> 
                           {singles ? (
                              <BsToggleOn  className='text-4xl text-green-700'/>
                           ):(
                              <BsToggleOff className='text-4xl cursor-pointer'/>
                           )}
                           </button> 
                 </div>
              </div>
        </div>

        <div className='mt-7'>
           <p className='text-center font-bitter text-xl'>Photos and Videos</p>
            <div className='flex items-center justify-center'>
              <div className='border-dotted border-gray-400 rounded-md shadow-md w-1/2 mt-5 p-10 bg-slate-300 '>
                    <div className='flex items-center justify-center mb-3'>
                     <TbPhotoFilled className='text-lg'/>
                     </div>
                           <p className='text-center font-bitter italic text-sm'>Click "Add photos" to select your photos</p>
                           <input type='file' accept='image/*' multiple ref={fileInputRef} onChange={handleFileChange} className='hidden'></input>
                           <div className='flex items-center justify-center mt-6'>
                                <button className='bg-blue-500 text-main-white font-quicksand px-6 py-2 rounded-md shadow-md active:bg-blue-700 transition duration-200 ease-in-out' onClick={handleButtonClick}>Add Photos</button>
                           </div>
              </div>
          </div>
        </div>
         {images.length > 0 && (
                        <div className='flex flex-cols-2 items-center justify-center sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4'>
                              {images.map((img) => (
                                 <div key={img.id} className='relative group'>
                                    <img src={img.preview} alt="uploaded" className='w-40 h-40 object-cover rounded-lg shadow-sm relative'></img>
                                      <div className='mt-1 text-center'>
                                             <input type='radio' name='coverImage' checked={coverImage === img.preview} onChange={()=>setCoverImage(img.preview)}></input>
                                             <label className='ml-1 text-sm font-quicksand'>Select Cover Photo</label>
                                      </div>
                                    <button className='absolute top-3 right-1'onClick={()=>handleDeletePhoto(img.id)} ><IoCloseCircleSharp /></button>
                                 </div>
                              ))}
                        </div>
                     )}

        <div className='mt-11'>
          <p className='font-bitter text-lg text-center'>Term and Conditions</p>
          <div className='flex gap-1 items-center justify-center'>
               <input type='checkbox' required></input>
               <p className='font-bitter'>Tick Here to agree to Kejani's Terms and Conditions:</p>
          </div>
          <p className='font-bitter text-center text-sm'>I hereby confirm that I am indeed the landlord of this property & have the right to offer it for rental, and I agree to Kejani's Terms and Conditions & Privacy Policy </p> 
           
           <div className='flex items-center justify-center mt-5 gap-3'>
                <button className='bg-main-dark text-main-white px-3 py-2 font-quicksand rounded-md active:bg-black transition duration-300 ease-in-out'>Submit</button>
                <button className='bg-main-dark text-main-white px-3 py-2 font-quicksand rounded-md active:bg-black transition duration-300 ease-in-out' type='button' onClick={()=>{
                  setLocation("");
                  setTown("");
                  setBedrooms("");
                  setBathrooms("");
                  setDescription("");
                  setRent("");
                  setDeposit("");
                  setMaxTenants("");
                  setSelected("");
                  setSelect("");
                  setImages([]);
                  setCoverImage("");
                  setParking(false);
                  setAmenities(false);
                  setOutdoor(false);
                  setInternet(false);
                  setStudents(false);
                  setFamilies(false);
                  setPets(false);
                  setSingles(false);
                  setFormError(null);
                  console.log(formError);
                }}>Reset</button>
                
           </div> 
        </div>
           {formError && (
               <div className='font-quicksand text-red-600 text-center mt-4 font-semibold'>{formError}</div>
          )}
        <div>
         <Footer></Footer>
        </div>
      </form>
    </div>
  )
}

export default Addlistings