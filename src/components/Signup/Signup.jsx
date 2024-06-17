import React, { useRef } from 'react';

import axios from 'axios';

const Signup = () => {
  const userName = useRef(null);
  const userEmail = useRef(null);
  const userPassword = useRef(null);

  const submitHandler = async(e) => {
    e.preventDefault(); 

    const enteredUsername = userName.current.value;
    const enteredEmail = userEmail.current.value;
    const enteredPassword = userPassword.current.value;

    const signupPayload={
      username:enteredUsername,
      email:enteredEmail,
      password:enteredPassword
    }

    try {
      const res=await axios.post('http://localhost:5173/user/signup',signupPayload)
      console.log('Server response:', res.data);

    } catch (error) {
      console.error('There was an error submitting the form:', error);
    }

    userName.current.value = '';
    userEmail.current.value = '';
    userPassword.current.value = '';
  };

  return (
    <div className='w-full h-screen bg-zinc-900 flex justify-center items-center p-4'>
      <div className=' w-full max-w-md bg-zinc-800 h-auto rounded-lg text-white flex flex-col justify-center px-5 py-10'>
        <h1 className='text-2xl mb-5 font-bold'>Signup</h1>
        <form className='flex flex-col space-y-4' onSubmit={submitHandler}>
          <div className='flex flex-col'>
            <label htmlFor="username" className='mb-2'>User Name</label>
            <input type="text" name="username" id="username" ref={userName} className='p-2 rounded bg-zinc-700' required/>
          </div>
          
          <div className='flex flex-col'>
            <label htmlFor="useremail" className='mb-2'>Email</label>
            <input type="email" name="useremail" id="useremail" ref={userEmail} className='p-2 rounded bg-zinc-700' required/>
          </div>
          
          <div className='flex flex-col'>
            <label htmlFor="userpassword" className='mb-2'>Password</label>
            <input type="password" name="userpassword" id="userpassword" ref={userPassword} className='p-2 rounded bg-zinc-700' required/>
          </div>
          
          <button type='submit' className=' p-2 bg-lime-600 rounded hover:bg-lime-700'>Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
