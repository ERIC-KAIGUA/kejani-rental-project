import React, { type ReactNode } from 'react'
import { IoIosCloseCircle } from "react-icons/io";


interface ModalProps {
    isOpen: boolean;
    onClose : ()=>void;
    children: ReactNode;
    title?:string;
}

const Modal = ({isOpen,onClose,children,title}) => {
   if (!isOpen) return null;

  return (
   <div className='fixed inset-0 z-50 bg-black backdrop-blur-sm bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ease-in' onClick={onClose}>
     <div className='bg-main-white rounded-lg shadow-lg border max-w-2xl w-full p-6 relative mx-4' onClick={(e)=> e.stopPropagation()}>
        <button className='absolute top-4 right-4 text-lg text-gray-500 hover:text-black transition duration-100 ease-in-out active:text-black'onClick={onClose}><IoIosCloseCircle /></button>
        {title && (<h2 className='text-gray-500 text-xl font-bitter mb-2'>{title}</h2>)}
        <hr className='border-gray-700'></hr>
        {children}
     </div>
   </div>
  )
}

export default Modal