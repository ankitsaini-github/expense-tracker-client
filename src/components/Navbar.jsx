import { FiMenu, FiX } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authActions } from "../store/authReducer";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isloggedin);
  const isPro = useSelector((state) => state.auth.isPro);
  const history = useHistory();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const token = window.localStorage.getItem("token");

    console.log("sending req to buypro"); // test
    const response = await axios.get("http://localhost:3000/checkout/buy-pro", {
      headers: { Authorization: token },
    });
    console.log("buy pro res ====== ", response); // test
    const data = response.data;
    console.log("buy pro data === ", data); // test

    const options = {
      key: data.key_id,
      currency: data.currency,
      name: "DhanDiary",
      description: "Upgrade to Pro",
      order_id: data.order.id,
      handler: async function (response) {
        await axios.post(
          "http://localhost:3000/checkout/update-status",
          {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
          },
          { headers: { Authorization: token } }
        );

        dispatch(authActions.setIsPro(true));
        toast.success("Congrats! you are now a premium user.");
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#65a30d",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      console.log(response);
      toast.error("Payment Failed.");
    });
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("useremail");
    localStorage.removeItem("isPro");
    dispatch(authActions.logout());
    toast.success("Logged out successfully.");
    history.push("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <nav className="w-full bg-zinc-800 py-4 px-6 flex justify-between items-center">
        <h1 className="bg-gradient-to-r from-lime-400 to-lime-500 bg-clip-text text-transparent text-2xl font-extrabold flex">
          <span>DhanDiary</span>
          {isPro && (
            <span className="ml-2 text-sm text-lime-400 font-bold">PRO</span>
          )}
        </h1>
        <div className="md:hidden">
          <button onClick={toggleSidebar}>
            {!sidebarOpen && <FiMenu className="text-lime-500" size={24} />}
          </button>
        </div>
        <div className="hidden md:flex space-x-4">
          {isLogin && (
            <>
              <Link
                to="/dashboard"
                className="text-zinc-400 hover:text-lime-400"
              >
                Dashboard
              </Link>

              {isPro && (
                <>
                  <Link
                    to="/reports"
                    className="text-zinc-400 hover:text-lime-400"
                  >
                    Reports
                  </Link>
                  <Link
                    to="/leaderboard"
                    className="text-zinc-400 hover:text-lime-400"
                  >
                    Leaderboard
                  </Link>
                </>
              )}

              {!isPro && (
                <button
                  className="relative inline-flex items-center justify-start px-3 py-1 overflow-hidden font-semibold rounded-full group"
                  onClick={displayRazorpay}
                >
                  <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-lime-400 opacity-[3%]"></span>
                  <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-lime-400 opacity-100 group-hover:-translate-x-8"></span>
                  <span className="relative w-full text-left text-lime-400 transition-colors duration-200 ease-in-out group-hover:text-gray-900">
                    Buy Pro
                  </span>
                  <span className="absolute inset-0 border-2 border-lime-400 rounded-full"></span>
                </button>
              )}

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

      {/* sidebar */}

      <div
        className={`fixed top-0 left-0 w-full h-full bg-zinc-900 z-40 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex justify-between items-center py-4 px-6">
          <h1 className="bg-gradient-to-r from-lime-400 to-lime-500 bg-clip-text text-transparent text-2xl font-extrabold flex">
            <span>DhanDiary</span>
            {isPro && (
              <span className="ml-2 text-sm text-lime-400 font-bold">PRO</span>
            )}
          </h1>
          <button onClick={toggleSidebar}>
            <FiX className="text-lime-500" size={24} />
          </button>
        </div>
        <div className="flex flex-col space-y-6 px-6 my-8">
          {isLogin && (
            <>
              <Link
                to="/dashboard"
                className="text-zinc-400 hover:text-lime-400 text-center"
                onClick={toggleSidebar}
              >
                Dashboard
              </Link>

              {isPro && (
                <Link
                  to="/leaderboard"
                  className="text-zinc-400 hover:text-lime-400 text-center"
                  onClick={toggleSidebar}
                >
                  Leaderboard
                </Link>
              )}

              {!isPro && (
                <button
                  className="relative inline-flex items-center justify-start px-3 py-1 overflow-hidden font-semibold rounded-md group"
                  onClick={() => {
                    displayRazorpay();
                    toggleSidebar();
                  }}
                >
                  <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-lime-400 opacity-[3%]"></span>
                  <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-lime-400 opacity-100 group-hover:-translate-x-8"></span>
                  <span className="relative w-full text-center text-lime-400 transition-colors duration-200 ease-in-out group-hover:text-gray-900">
                    Buy Pro
                  </span>
                  <span className="absolute inset-0 border-2 border-lime-400 rounded-md"></span>
                </button>
              )}

              <button
                className="bg-zinc-400 hover:bg-lime-400 transition-all duration-300 ease-in-out text-zinc-900 font-semibold px-2 py-1 rounded "
                onClick={() => {
                  logoutHandler();
                  toggleSidebar();
                }}
              >
                LogOut
              </button>
            </>
          )}
          {!isLogin && (
            <>
              <Link
                to="/signup"
                className="text-zinc-400 hover:text-lime-400 text-center"
                onClick={toggleSidebar}
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="text-zinc-400 hover:text-lime-400 text-center"
                onClick={toggleSidebar}
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
