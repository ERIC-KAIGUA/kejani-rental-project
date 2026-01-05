import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import Map from '../components/Map'
import { BsFunnelFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import PropertySearchCard from '../components/PropertySearchCard';
import Modal from '../components/Modal';
import AdvancedFilter from '../forms/AdvancedFilter';
import supabase from '../config/supabaseClient';
import { useLocation } from 'react-router-dom';




const Searchpage = () => {
  const [selectedMinPrice, setSelectedMinPrice] = useState("");
  const [selectedMaxPrice, setSelectedMaxPrice] = useState("");
  const [selectedLocation, setSelectedLocation]= useState("");
  const [location, setLocation] = useState({lat:-1.286389,lng:36.817223});
  const [selectedType, setSelectedType] = useState("") //already used in properties
  const [selectedBedroom, setSelectedBedroom] = useState("")
  const inputRef = useRef("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [advancedFilters, setAdvancedFilters] = useState({});
  const locationRouter = useLocation();
  const [formError, setFormError] = useState("")

  useEffect(()=>{
  if (locationRouter.state && locationRouter.state.location) {
    const passedLocation = locationRouter.state.location;
    if (!selectedLocation.trim()) {
      setSelectedLocation(passedLocation);
    }
  }
  }, [locationRouter.state])

   const handleOpenModal = () =>{
    setIsModalOpen(true)
   }

   const handleCloseModal = () =>{
    setIsModalOpen(false)
   }
   
  const propertyTypes = [
    "House",
    "Apartment"
  ]

  const bedroomNumbers = [
    "1",
    "2",
    "3",
    "4 or More",
  ]

  const handleChange = (event) => {
    setSelectedType(event.target.value)
  }

  const handleBedroomChange = (event) => {
      setSelectedBedroom(event.target.value)
  }
  const handleKeyDown = (e) => {
    if (e.key === '-' || e.key === 'e' || e.key === '.') {
      e.preventDefault();
    }
  };
  
  const handleApplyAdvancedFilters = (filters) =>{
    setAdvancedFilters(filters);
  }
     const handleSearch = async(e) => {
      e.preventDefault();
      setFormError("")

      const locText = selectedLocation.trim();
      const minText = selectedMinPrice.trim();
      const maxText = selectedMaxPrice.trim();


      const min = minText ? Number(minText) : null;
      const max = maxText ? Number(maxText) : null;

      if(minText && Number.isNaN(min)) {
        setFormError("Enter a valid minimum price");
        return
      }
      if(maxText && Number.isNaN(max)){
        setFormError("Enter a valid maximum price");
        return
      }
      if(min !== null && max !== null && min > max){
        setFormError("Minimum Price must be smaller than the maximum price!");
        return
      }
       try{
         let query = supabase
         .from("property")
         .select("id,location,town,bedrooms,propertyType,description,rent,coverImage,furnishingOptions,pets,students,families,outdoor,amenities, lat,lng");

         if(selectedType){
          query = query.eq("propertyType", selectedType)
         }
         if(selectedBedroom){
          if(selectedBedroom === "4 or More"){
            query = query.gte("bedrooms",4);
          }else{
            const bedroomsNum = Number(selectedBedroom);

            if(!Number.isNaN(bedroomsNum)){
              query = query.eq("bedrooms", bedroomsNum)
            }
          }
         }

         if(min !== null) {
          query = query.gte("rent",min)
         }
          if(max !== null) {
          query = query.lte("rent",max)
         }
         

         if(locText){
           const pattern = `%${locText}%`;
           query = query.or(`location.ilike.${pattern},town.ilike.${pattern}`)
         }
         if(advancedFilters.select){
          query = query.eq("furnishingOptions",advancedFilters.select)
         }
         if (advancedFilters.students) query = query.eq("students", true);
         if (advancedFilters.families) query = query.eq("families", true);
         if (advancedFilters.pets) query = query.eq("pets", true);
         if (advancedFilters.outdoorSpace) query = query.eq("outdoor", true);
         if (advancedFilters.amenities) query = query.eq("amenities", true);

         const { data, error } = await query;
         if (error){
          console.error("Search query error:", error)
          setFormError("Failed to run search. Try again.");
          return;
         }
         setProperties(data || []);
         if (!data || data.length === 0) {
         setFormError("No properties match your criteria.");
         }

         if(locText){
           const geocoder = new window.google.maps.Geocoder();
           const place = selectedLocation;
           geocoder.geocode({address:place}, (results,status) => {
          if(status === "OK" && results[0]){
            const loc = results[0].geometry.location;
            setLocation({ lat: loc.lat(), lng:loc.lng()});
            
          } else {
            alert("Location Not Found!")
          }
         })
       }
    }
       catch(error){
        console.error("Unexpected error in handleSearch:", error);
        setFormError("An unexpected error occurred. Try again.");
       }     
       
   }

  useEffect(()=>{
    const fetchProperties = async() => {
      const { data, error } = await supabase
      .from("property")
      .select("*")

      if(error) console.error("Failed to fetch data from database!")
      setProperties(data);

    }
    fetchProperties();
  },[]);
  return (
    <div>
        <div>
            <Header></Header>
        </div>
     
        <div className='mt-4'>
          <p className='font-bitter font-semibold text-2xl text-center text-main-dark underline'>Properties to Rent</p> 
       </div>
 
      <div className='flex flex-row mt-4 ml-8 gap-9'>
           
            <div className='w-1/4 border rounded-md border-gray-300 bg-slate-50 p-3 shadow-md'>  
                <form>      
                          <div className='flex flex-col'>
                              <label className='font-bitter text-main-dark'>Search:</label>
                              <input className='bg-main-brown font-quicksand text-main-dark rounded-md focus:outline-none p-1 shadow-md' type='text' ref={inputRef} placeholder='Enter a location...' value={selectedLocation} id='selectedLocation' onChange={(e)=>setSelectedLocation(e.target.value)}></input>
                          </div>

                          <div className='mt-7'>
                              <label className='font-bitter text-main-dark'>Property Type:</label>

                              <div className='flex gap-2 '>
                                      {propertyTypes.map((propertyType)=>(
                                      <label key={propertyType} className={`flex items-center mt-2 px-4 py-2 font-bitter text-sm rounded-full border cursor-pointer
                                         ${ selectedType === propertyType ? 'bg-main-dark text-main-white font-bitter border-main-grey shadow-md ' : 'bg-main-white text-main-dark border-main-grey'} `}>

                                        <input type='radio' value={propertyType} checked={selectedType===propertyType} onChange={handleChange} className='hidden' id='selectedType'></input>{propertyType}{selectedType === propertyType && (<span ><FaCheck className='ml-2 text-main-white' /></span>)}
                                      </label>
                                      ))}
                               </div>

                          </div>
                        <div className='mt-7'>
                              <label className='font-bitter text-main-dark'>Price:</label>

                              <div className='flex flex-row gap-2'>
                                  <input className='bg-main-brown font-quicksand text-main-dark rounded-full focus:outline-none px-2 py-1 shadow-md w-20 no-number-arrows'type='number' min="0" step="1" onKeyDown={handleKeyDown} id="selectedMinPrice" value={selectedMinPrice} onChange={(e)=> setSelectedMinPrice(e.target.value)}></input> 
                                  <p>_____</p>
                                  <input className='bg-main-brown font-quicksand text-main-dark rounded-full focus:outline-none px-2 py-1 shadow-md w-20 no-number-arrows' type='number' min="0" step="1" onKeyDown={handleKeyDown} id="selectedMaxPrice" value={selectedMaxPrice} onChange={(e)=>setSelectedMaxPrice(e.target.value)}></input>
                              </div>
                        </div>
                      <div className='mt-7'>
                            <label className='font-bitter text-main-dark'>No. of Bedrooms:</label>
                                
                                <div className='flex gap-2'>
                                    {bedroomNumbers.map((bedroomNumber)=>(
                                      <label key={bedroomNumber} className={`flex items-center mt-2 px-2 py-1 font-bitter text-sm rounded-full border cursor-pointer gap-2 ${
                                        selectedBedroom === bedroomNumber ? 'bg-main-dark text-main-white font-bitter border-main-grey shadow-md gap-2' : 'bg-main-white text-main-dark border-main-grey'
                                      }`}>
                                        <input type='radio' className='' value={bedroomNumber} checked={selectedBedroom === bedroomNumber} onChange={handleBedroomChange} id="selectedBedroom"></input>{bedroomNumber}
                                      </label>
                                    ))}
                              </div>
                        </div>

                        <div className='flex flex-col gap-3 mt-5 mb-2 items-center justify-center'>
                          <button className='font-bitter bg-main-dark text-main-white rounded-md px-4 py-2 shadow-md active:bg-black transition duration-200 ease-in-out'onClick={handleSearch} >Search</button>
                         
                        </div> 
                 </form> 
                 <div className='flex flex-col mb-2'>
                        <button className='font-bitter bg-main-dark text-main-white rounded-md px-4 py-2 shadow-md active:bg-black transition duration-200 ease-in-out flex items-center justify-center gap-2' onClick={handleOpenModal}><BsFunnelFill className='bg-transparent text-main white' /> Advanced Filter</button>
                                      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Advanced Filter">
                                        <AdvancedFilter onClose={handleCloseModal} onApplyFilters={handleApplyAdvancedFilters}></AdvancedFilter>
                                      </Modal> 
                   </div>
         </div>
     

          <div className=' p-3 border rounded-md shadow-md border-gray-300 w-2/3'>
              <Map location={location} properties={properties}></Map>
          </div>
        </div> 

      

        <div className='mt-2'>
          {properties.map((prop)=>(
            <PropertySearchCard key={prop.id} property={prop}></PropertySearchCard> 
          ))}
          
        </div> 
    </div>
  )
}

export default Searchpage