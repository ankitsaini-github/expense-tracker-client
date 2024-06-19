import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import React from "react";
import { authActions } from '../store/authReducer'

const Navbar = () => {
  const dispatch=useDispatch()
  const isLogin=useSelector(state=>state.auth.isloggedin)
  const history=useHistory()

  const logoutHandler = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('useremail');
    dispatch(authActions.logout())
    history.push('/login')
  }

  return (
    <nav className="w-full bg-zinc-800 py-4 px-6 flex justify-between items-center">
      <h1 className="bg-gradient-to-r from-lime-400 to-lime-500 bg-clip-text text-transparent text-2xl font-extrabold">DhanDiary</h1>
      <div className="space-x-4">
        {isLogin && <><Link to="/dashboard" className="text-zinc-400 hover:text-lime-400">
          Dashboard
        </Link>
        <button className="bg-zinc-400 hover:bg-lime-400 text-zinc-900 font-semibold px-2 py-1 rounded" onClick={logoutHandler}>
          LogOut
        </button>
        </>}
        {!isLogin && <><Link to="/signup" className="text-zinc-400 hover:text-lime-400">
          Signup
        </Link>
        <Link to="/login" className="text-zinc-400 hover:text-lime-400">
          Login
        </Link></>}
      </div>
    </nav>
  );
};

export default Navbar;
