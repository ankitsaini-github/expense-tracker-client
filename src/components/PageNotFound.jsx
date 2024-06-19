import { Link } from 'react-router-dom';
import React from 'react';

const PageNotFound = () => {
  return (
    <div className="flex-grow flex justify-center items-center p-4">
      <div className='w-full max-w-md bg-zinc-800 h-auto shadow-2xl rounded-lg text-white flex flex-col justify-center px-5 py-10'>
        <h1 className='text-center mb-5 bg-gradient-to-r from-lime-400 to-lime-500 bg-clip-text text-transparent text-8xl font-extrabold'>Oops!</h1>
        <h1 className='text-2xl my-5 font-semibold'>404 - Page Not Found</h1>
        <p className='mb-5'>The page you are looking for does not exist.</p>
        <Link to="/" className='p-2 rounded bg-gradient-to-b from-lime-500 to-lime-700 hover:from-lime-600 hover:to-lime-800 text-center'>
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
