import React, { useState, useEffect } from 'react'
import { FaAngleDown } from "react-icons/fa6";
import supabase from '../config/supabaseClient';

interface AdvancedFilterProps {
    onClose: ()=>void;
    onApplyFilters: (filters: any) => void;
}

const AdvancedFilter = ({onClose, onApplyFilters}) => {
    const [showDropdownmenu, setShowDropdownmenu] = useState(false)
    const [properties, setProperties] = useState([]);
    const [select, setSelect] = useState("") // stores the furnishOptions state value
    const [students , setStudents] = useState(false)
    const [families, setFamilies] = useState(false)
    const [pets, setPets] = useState(false)
    const [outdoorSpace, setOutdoorSpace] = useState(false)
    const [amenities, setAmenities] = useState(false)
    const [formError, setFormError] = useState("")


  const furnishingoptions = [
   "furnished",
   "unfurnished",
  ];

  const handleFurnishselect = (furnishoption) => {
     setSelect(furnishoption)
     setShowDropdownmenu(false)
  }
  const handleSearch = async (e) =>{
    e.preventDefault()
    setFormError("")

    const filters = {
    select,
    students,
    families,
    pets,
    outdoorSpace,
    amenities,
    };

   onApplyFilters(filters);
   onClose();
  }

  return (
    <div className=''>
        <form>
                 <div className='flex flex-col mx-4 p-6'>
                            <label className='font-bitter text-main-dark font-semibold text-sm'>Furnishing Options</label>
                            <div className='flex flex-col relative'>
                                    <input type='text' readOnly placeholder="Select a choice" value={select} id="select" className='p-1 font-quicksand border border-main-grey rounded-md focus:outline-none  bg-main-brown'></input>
                                    <button className='absolute right-3 top-2' onClick={()=>setShowDropdownmenu(!showDropdownmenu)} type='button' ><FaAngleDown/></button>
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

                            <div className=' flex flex-col mt-4'>
                               <label className='font-bitter text-main-dark font-semibold text-sm'>Move in Before:</label>
                                <input type='date' className='p-1 font-quicksand border border-main-grey rounded-md focus:outline-none  bg-main-brown'></input>
                            </div>

                            <div className='mt-5 flex flex-col gap-2'>
                                <div className='gap-2 flex'>
                                    <input type='checkbox'checked={students} onChange={()=>setStudents(!students)}></input>
                                    <label className='font-bitter text-sm font-semibold text-main-dark'>Accepts Students</label>
                               </div>

                                <div className='gap-2 flex'>
                                    <input type='checkbox' checked={families} onChange={()=>setFamilies(!families)}></input>
                                    <label className='font-bitter text-sm font-semibold text-main-dark'>Accepts Families</label>
                               </div>

                                <div className='gap-2 flex'>
                                    <input type='checkbox' checked={pets} onChange={()=>setPets(!pets)}></input>
                                    <label className='font-bitter text-sm font-semibold text-main-dark'>Accepts Pets</label>
                               </div>

                                <div className='gap-2 flex'>
                                    <input type='checkbox' checked={outdoorSpace} onChange={()=>setOutdoorSpace(!outdoorSpace)}></input>
                                    <label className='font-bitter text-sm font-semibold text-main-dark'>Access to Outdoor Space</label>
                               </div>

                                <div className='gap-2 flex'>
                                    <input type='checkbox' checked={amenities} onChange={()=>setAmenities(!amenities)}></input>
                                    <label className='font-bitter text-sm font-semibold text-main-dark'>Access to Amenties (Gym,Swimming-pool etc)</label>
                               </div>
                            </div>

                            <div className='flex flex-row mt-10 gap-10 items-center justify-center'>
                               <button className='bg-green-500 text-white font-bitter text-sm px-4 py-2 rounded-md' onClick={handleSearch}>Search</button>
                               <button className='bg-orange-500 text-white font-bitter text-sm px-4 py-2 rounded-md'>Reset</button>
                               <button className='bg-red-500 text-white font-bitter text-sm px-4 py-2 rounded-md' onClick={onClose}>Cancel</button>
                            </div>
                            {formError && (<div className='font-quicksand text-red-600 text-center mt-4 font-semibold'>{formError}</div>)}
                    </div> 
         </form>       
     </div>
  )
}

export default AdvancedFilter
