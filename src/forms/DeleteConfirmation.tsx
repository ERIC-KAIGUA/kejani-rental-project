import React from 'react'
import { IoTrashSharp } from "react-icons/io5";


interface DeleteConfirmationProps {
    onClose: ()=>void;
    onConfirm:()=>void;
}

const DeleteConfirmation = ({onClose, onConfirm}) => {
    const handleDeleteClick = () => {
          onConfirm(); // Trigger the delete action
          onClose();   // Close the modal after confirmation
  };
  return (
    <div>
      <div className='mt-2'>
        <p className='font-bitter text text-main-dark text-lg'>Are you sure you want to delete this listing?</p>
        
             <button className='bg-red-500 text-white flex flex-row gap-2 items-center justify-center px-6 py-3 rounded-md mx-auto block mt-4 shadow-sm font-quicksand active:bg-red-700' onClick={handleDeleteClick}>
                                     <IoTrashSharp className=''/> Delete
             </button>
      </div>
    </div>
  )
}

export default DeleteConfirmation
