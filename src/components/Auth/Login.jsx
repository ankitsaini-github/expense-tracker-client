import React, { useRef, useState } from 'react';

import { Link } from 'react-router-dom/cjs/react-router-dom';
import axios from 'axios';

const Login = () => {
  const [error, seterror] = useState(null)

  const userEmail = useRef(null);
  const userPassword = useRef(null);

  const submitHandler = async(e) => {
    e.preventDefault(); 
    seterror(null);

    const enteredEmail = userEmail.current.value;
    const enteredPassword = userPassword.current.value.replace(/\s/g, '');

    if(!enteredEmail || !enteredPassword)
      return;

    const loginPayload={
      email:enteredEmail,
      password:enteredPassword
    }

    try {
      const res = await axios.post('http://localhost:3000/user/login',loginPayload)

      if (res.status !== 201) {
        console.log('Error============:', res);
        seterror('Failed to Log in. Please try again.');
        return;
      }

      console.log('Server response:', res.data);

      userEmail.current.value = '';
      userPassword.current.value = '';

    } catch (error) {
      console.error('There was an error while login:', error.response.data.error);
      seterror(error.response.data.error);
    }

  };

  const clearError = () => {
    seterror(null);
  };

  return (
    <div className='w-full h-screen bg-zinc-900 flex justify-center items-center p-4'>
      <div className=' w-full max-w-md bg-zinc-800 h-auto shadow-2xl rounded-lg text-white flex flex-col justify-center px-5 py-10'>
        <h1 className='text-2xl mb-5 font-bold'>Login</h1>
        <form className='flex flex-col space-y-4' onSubmit={submitHandler}>

          <div className='flex flex-col'>
            <label htmlFor="useremail" className='mb-2'>Email</label>
            <input type="email" name="useremail" id="useremail" ref={userEmail} className='p-2 rounded bg-zinc-700' autoComplete='off' onChange={clearError} required/>
          </div>
          
          <div className='flex flex-col'>
            <label htmlFor="userpassword" className='mb-2'>Password</label>
            <input type="password" name="userpassword" id="userpassword" ref={userPassword} className='p-2 rounded bg-zinc-700' autoComplete='new-password' onChange={clearError} required/>
          </div>
          
          <Link to='/signup' className="text-zinc-400 hover:text-zinc-100 text-md">Don't have an account? Signup now</Link>
          
          <button type='submit' className=' p-2 bg-lime-600 rounded hover:bg-lime-700'>Login</button>
        </form>
        {error && <p className='text-red-400 mt-4'>{error}</p>}
      </div>
    </div>
  );
};

export default Login;