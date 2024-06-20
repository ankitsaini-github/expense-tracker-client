import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom';
import React, { useRef, useState } from 'react';

import Footer from '../Footer';
import Navbar from '../Navbar';
import { authActions } from "../../store/authReducer";
import axios from 'axios';
import { useDispatch } from "react-redux";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [error, seterror] = useState(null)
  const [passwordVisible, setPasswordVisible] = useState(false);

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

      if (res.status !== 200) {
        console.log('Error============:', res);
        seterror('Failed to Log in. Please try again.');
        return;
      }

      console.log('Server response:', res.data);
      window.localStorage.setItem('token',res.data.token)
      window.localStorage.setItem('useremail',res.data.useremail);
      window.localStorage.setItem('isPro',res.data.isPro)
      
      window.alert(res.data.message);
      dispatch(authActions.login(res.data.isPro))

      history.push('/dashboard');
      
      userEmail.current.value = '';
      userPassword.current.value = '';

    } catch (error) {
      console.error('There was an error while login:', error.response.data.error);
      seterror(error.response.data.error);
    }

  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };
  
  const clearError = () => {
    seterror(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white">
      <Navbar />
      <div className="flex-grow flex justify-center items-center p-4">
        <div className=' w-full max-w-md bg-zinc-800 h-auto shadow-2xl rounded-lg text-white flex flex-col justify-center px-5 py-10'>
          <h1 className='text-2xl mb-5 font-semibold'>Login</h1>
          <form className='flex flex-col space-y-4' onSubmit={submitHandler}>

            <div className='flex flex-col'>
              <label htmlFor="useremail" className='mb-2'>Email</label>
              <input type="email" name="useremail" id="useremail" ref={userEmail} className='p-2 rounded bg-zinc-900 border-2 border-transparent focus:outline-none focus:ring-0 focus:border-lime-500' autoComplete='off' onChange={clearError} required/>
            </div>
            
            <div className='flex flex-col'>
              <label htmlFor="userpassword" className='mb-2'>Password</label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="userpassword"
                  id="userpassword"
                  ref={userPassword}
                  className="p-2 rounded bg-zinc-900 border-2 border-transparent focus:outline-none focus:ring-0 focus:border-lime-500 w-full"
                  autoComplete="new-password"
                  onChange={clearError}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-2 text-zinc-500"
                >
                  {passwordVisible ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            
            <Link to='/signup' className="text-zinc-400 hover:text-zinc-100 text-md">Don't have an account? Signup now</Link>
            
            <button type='submit' className=' p-2 rounded bg-gradient-to-b from-lime-500 to-lime-700 hover:from-lime-600 hover:to-lime-800'>Login</button>
          </form>
          {error && <p className='text-red-400 mt-4'>{error}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
