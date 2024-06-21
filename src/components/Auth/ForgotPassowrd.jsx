import React, { useRef, useState } from 'react';

import Footer from '../Footer';
import Navbar from '../Navbar';
import axios from 'axios';
import { toast } from "react-toastify";

const ForgotPassword = () => {

  const [error, seterror] = useState(null)

  const userEmail = useRef(null);
  
  const submitHandler = async(e) => {
    e.preventDefault(); 
    seterror(null);

    const enteredEmail = userEmail.current.value;
  
    if(!enteredEmail)
      return;

    const resetPayload={
      email:enteredEmail
    }

    try {
      const res = await axios.post('http://localhost:3000/user/forgot-password',resetPayload)

      if (res.status !== 200) {
        console.log('Error============:', res);
        seterror('Failed to Reset password. Please try again.');
        return;
      }

      console.log('Server response:', res.data);

      toast.success(res.data.message);

      userEmail.current.value = '';

    } catch (error) {
      console.error('There was an error while password reset :', error.response.data.error);
      seterror(error.response.data.error);
    }

  };

  const clearError = () => {
    seterror(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white">
      <Navbar />
      <div className="flex-grow flex justify-center items-center p-4">
        <div className=' w-full max-w-md bg-zinc-800 h-auto shadow-2xl rounded-lg text-white flex flex-col justify-center px-5 py-10'>
          <h1 className='text-2xl mb-5 font-semibold'>Password Reset</h1>
          <form className='flex flex-col space-y-4' onSubmit={submitHandler}>

            <div className='flex flex-col'>
              <label htmlFor="useremail" className='mb-2'>Registered Email</label>
              <input type="email" name="useremail" id="useremail" ref={userEmail} className='p-2 rounded bg-zinc-900 border-2 border-transparent focus:outline-none focus:ring-0 focus:border-lime-500' autoComplete='off' onChange={clearError} required/>
            </div>
            
            <button type='submit' className=' p-2 rounded bg-gradient-to-b from-lime-500 to-lime-700 hover:from-lime-600 hover:to-lime-800'>Send Link</button>
          </form>
          {error && <p className='text-red-400 mt-4'>{error}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
