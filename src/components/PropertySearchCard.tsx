import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

type Property = {
  id: number;
  location: string;
  town: string;
  bedrooms: number;
  propertyType: string;
  description: string;
  rent: number;
  coverImage: string;
}

const PropertySearchCard = ({property}: {property:Property}) => {
 const navigate = useNavigate()
 

  const handleViewDetails = () =>{
    navigate(`/ItemProperty/${property.id}`)
  }

  if(!property) return <p className='font-bitter text-main-dark text-center mt-2 text-xl'>Loading...</p>
  return (
    <div className='flex justify-center items-center'>
        <div className='flex flex-row m-2 p-3 bg-white border-b rounded-lg border-gray-400 shadow-sm w-3/4 '>
            <div className='flex w-1/5'>
                <img src={property.coverImage} loading='lazy'></img>
            </div>

            <div className='flex flex-col ml-6 gap-4'>
                <p className='font-bitter text-sm font-semibold text-main-dark'>Ksh. {property.rent} per Month</p>
                <p className='font-bitter text-sm font-semibold text-main-dark'>{property.bedrooms} BR {property.propertyType} </p>
                <p className='font-bitter text-sm line-clamp-1'>{property.description}</p>
                <div>
                <button className='right-0 bg-main-dark text-main-white px-2 py-1 rounded-sm border font-bitter text-sm min-w-1/6 active:bg-black transition duration-150 ease-in-out' onClick={handleViewDetails}>View Details</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PropertySearchCard