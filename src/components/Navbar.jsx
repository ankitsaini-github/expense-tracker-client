import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { authActions } from "../store/authReducer";
import axios from 'axios';

const Navbar = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isloggedin);
  const isPro = useSelector((state) => state.auth.isPro);
  const history = useHistory();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    // Create order on the server
    const token = window.localStorage.getItem('token');

    console.log('sending req to buypro') // test
    const response = await axios.get('http://localhost:3000/checkout/buy-pro',{headers:{'Authorization': token}});
    console.log('buy pro res ====== ',response) // test
    const data = response.data;
    console.log('buy pro data === ',data) // test
    
    const options = {
      key: data.key_id,
      // amount: data.amount.toString(),
      currency: data.currency,
      name: 'DhanDiary',
      description: 'Upgrade to Pro',
      order_id: data.order.id,
      handler: async function (response) {

        await axios.post('http://localhost:3000/checkout/update-status',{
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id,
        },{headers:{'Authorization': token}})

        dispatch(authActions.setIsPro(true));
        alert('Congrats! you are now a premium user.');
      },
      // prefill: {
      //   name: 'John Doe',
      //   email: 'john.doe@example.com',
      //   contact: '9999999999',
      // },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#65a30d',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on('payment.failed', function(response){
      console.log(response);
      alert('Payment Failed.');
    })
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("useremail");
    localStorage.removeItem('isPro')
    dispatch(authActions.logout());
    history.push("/login");
  };

  return (
    <nav className="w-full bg-zinc-800 py-4 px-6 flex justify-between items-center">
      <h1 className="bg-gradient-to-r from-lime-400 to-lime-500 bg-clip-text text-transparent text-2xl font-extrabold flex">
        <span>DhanDiary</span>
        {isPro && <span className="ml-2 text-sm text-lime-400 font-bold">PRO</span>}
      </h1>
      <div className="space-x-4">
        {isLogin && (
          <>
            <Link to="/dashboard" className="text-zinc-400 hover:text-lime-400">
              Dashboard
            </Link>

            {isPro && <span>

              <Link to="/leaderboard" className="text-zinc-400 hover:text-lime-400">
                Leaderboard
              </Link>
              
              </span>}

            {!isPro && <button
              className="relative inline-flex items-center justify-start px-3 py-1 overflow-hidden font-semibold rounded-full group"
              onClick={displayRazorpay}
            >
              <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-lime-400 opacity-[3%]"></span>
              <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-lime-400 opacity-100 group-hover:-translate-x-8"></span>
              <span className="relative w-full text-left text-lime-400 transition-colors duration-200 ease-in-out group-hover:text-gray-900">
                Buy Pro
              </span>
              <span className="absolute inset-0 border-2 border-lime-400 rounded-full"></span>
            </button>}

            <button
              className="bg-zinc-400 hover:bg-lime-400 transition-all duration-300 ease-in-out text-zinc-900 font-semibold px-2 py-1 rounded "
              onClick={logoutHandler}
            >
              LogOut
            </button>
            
          </>
        )}
        {!isLogin && (
          <>
            <Link to="/signup" className="text-zinc-400 hover:text-lime-400">
              Signup
            </Link>
            <Link to="/login" className="text-zinc-400 hover:text-lime-400">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
