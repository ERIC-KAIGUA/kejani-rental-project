import React, { useState } from 'react'
const SUPABASE_FUNCTIONS_URL = "https://oloqjuypwbqptrtkjrae.supabase.co/functions/v1";
const ANON_PUBLIC_KEY= import.meta.env.VITE_SUPABASE_ANON_KEY as string;


interface VerificationFormProps {
    onClose:()=>void;
    onSubmit:(data:{firstName:string, lastName:string, phoneNumber: string; verificationCode:number})=>void;
}

const Verification = ({onClose, onSubmit}) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber , setPhoneNumber] = useState("")
    const [verificationCode , setVerificationCode] = useState("")

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [phone , setPhone] = useState("");

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value)
    }
    const handleLastNameChange = (e) => {
        setLastName(e.target.value)
    }
    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value)
    }
    const handleVerificationChange = (e) => {
        setVerificationCode(e.target.value)
    }

    const handleSubmit = (e) => {
          e.preventDefault()
          onSubmit({firstName,lastName,phoneNumber})
    }
    const handleKeyDown = (e) => {
    if (e.key === '-' || e.key === 'e' || e.key === '.') {
      e.preventDefault();
    }
}

const requestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
 
      try {
        const res = await fetch(`${SUPABASE_FUNCTIONS_URL}/request-otp`, {
            method: "POST",
            headers: {"Content-Type": "application/json",
                       "apikey": ANON_PUBLIC_KEY,
                       "Authorization": `Bearer ${ANON_PUBLIC_KEY}`,
             },
            body: JSON.stringify({
                firstName,
                lastName,
                phoneNumber,
            })
        })

        const data = await res.json();

        if (!res.ok) {
            setMessage(data.error || "Failed to send verification code");
            setLoading(false);
            return;
        }
        //OTP sent successfully
        setStep(2);
    } catch(err){
       setMessage("Network error. Please try again");
    } finally {
        setLoading(false)
    }
  }
  //VERIFY OTP
  const verifyOtp = async()=>{
    setLoading(true);
    setMessage("");

    try {
        const res = await fetch(`${SUPABASE_FUNCTIONS_URL}/verify-otp`, {
            method: "POST",
            headers: { "Content-type": "application/json",
                        "apikey": ANON_PUBLIC_KEY,
                        "Authorization": `Bearer ${ANON_PUBLIC_KEY}`,
             },
            body: JSON.stringify({
                phoneNumber,
                verificationCode,
            })
        })
        const data = await res.json();

        if(!res.ok) {
            setMessage(data.error || "Invalid verification code");
            setLoading(false);
            return;
        }
        // OTP Verified successfully
        onSubmit({firstName, lastName, phoneNumber});
    } catch(err){
        setMessage("Network Error. Please try again.");
    } finally {
        setLoading(false);
    }
  }


  return (
   <form onSubmit={requestOtp}>
            <div className='flex flex-col items-center justify-center'>
                {step === 1 && (
                <>
                     <h1 className='font-bitter text-gray-600 text-lg mb-4'>Step 1: Request Verification Code</h1>

                     <div className='flex flex-col mb-5'>
                            <label className='font-bitter text-sm font-semibold text-main-dark'>FirstName</label>
                            <input type='text' value={firstName} onChange={handleFirstNameChange} required className='p-1 font-quicksand border border-main-grey rounded-md focus:outline-none bg-main-brown'></input>
                     </div>

                    <div className='flex flex-col mb-5'>
                            <label className='font-bitter text-sm font-semibold text-main-dark'>LastName</label>
                            <input type='text' value={lastName} onChange={handleLastNameChange} required className='p-1 font-quicksand border border-main-grey rounded-md focus:outline-none  bg-main-brown '></input>
                    </div>

                    <div className='flex flex-col mb-5'>
                            <label className='font-bitter text-sm font-semibold text-main-dark'>PhoneNumber</label>
                            <input type='tel' value={phoneNumber} onChange={handlePhoneNumberChange} required className='p-1 font-quicksand border border-main-grey rounded-md focus:outline-none  bg-main-brown no-number-arrows' min="0" step="1" onKeyDown={handleKeyDown}></input>
                    </div>

                 <button className='bg-green-500 text-main-white px-4 py-2 font-bitter text-sm rounded-lg shadow-sm active:bg-green-950' type="submit" onClick={requestOtp}> {loading? "Sending": "Request Verification Code"} </button>

               </> 
            )}

            {step === 2 && (
                <>
                 <hr className='border border-gray-400 border-opacity-20 mt-2'></hr>

                   <h1 className='font-bitter text-gray-600 text-lg mb-4'>Step 2: Submit Verification Code</h1>

                    <div className='flex flex-col'>
                       <label className='font-bitter text-sm font-semibold text-main-dark'>Enter Verification Code</label>
                       <div className='flex'>
                                    <input type='number' value={verificationCode} required onChange={handleVerificationChange} onKeyDown={handleKeyDown} className='p-1 font-quicksand border border-main-grey rounded-md focus:outline-none  bg-main-brown mt-1 no-number-arrows' step="1" min="0" maxLength={6}></input>
                                    <button type="submit" className='text-sm text-main-white bg-green-600 px-2 rounded-md font-bitter ml-2' onClick={verifyOtp}> {loading ? "Verifying..." : "Verify Code"}</button>
                        </div>
                   </div>

                   <button type="button" disabled={loading}  className="bg-green-600 text-white px-4 py-2 rounded-lg font-bitter mt-3">
                          {/* {loading ? "Verifying..." : "Verify Code"} */} Verify Code
                 </button>
                </>
            )}
             {message && (
                  <p className="text-sm text-red-500 mt-3">{message}</p>
             )}       
            </div>         
      </form>
  )
}

export default Verification
