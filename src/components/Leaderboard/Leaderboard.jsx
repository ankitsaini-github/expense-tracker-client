import React, { useEffect, useState } from 'react';

import { FaCrown } from "react-icons/fa6";
import Navbar from '../Navbar';
import axios from 'axios';
import { generateConfetti } from '../../utils/generateConfetti';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_SERVER_IP}/premium/leaderboard`, {
          headers: { 'Authorization': token }
        });
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
    generateConfetti(['#84cc16', '#22c55e', '#27272a']);
  }, []);

  const getRank = (rank) => {
    if (rank === 0) {
      return <span className="text-xl">🥇</span>;
    } else if (rank === 1) {
      return <span className="text-xl">🥈</span>;
    } else if (rank === 2) {
      return <span className="text-xl">🥉</span>;
    } else {
      return rank + 1;
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-6 p-2 md:p-6 bg-zinc-800 text-lime-300 rounded-lg shadow-lg">
        <h1 className="text-3xl mb-6 font-bold text-center text-lime-400">Leaderboard</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-zinc-900 rounded-lg overflow-hidden">
            <thead>
              <tr className=" bg-gradient-to-r from-lime-500 to-lime-600 text-black text-md md:text-lg">
                <th className="py-1 md:py-3 px-2 md:px-6 text-left ">Rank</th>
                <th className="py-1 md:py-3 px-2 md:px-6 text-left ">Name</th>
                <th className="py-1 md:py-3 px-2 md:px-6 text-left ">Total Expenses</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, i) => (
                  <tr
                    key={user.id}
                    className={`${i % 2 === 0 ? 'bg-zinc-900' : 'bg-neutral-700'} text-md md:text-lg`}
                  >
                    <td className="py-1 md:py-4 px-2 md:px-6 text-white">{getRank(i)}</td>
                    <td className="py-1 md:py-4 px-2 md:px-6 text-white">{i===0 && <p className='px-2 text-xl text-amber-400'><FaCrown /></p>} {user.name}</td>
                    <td className="py-1 md:py-4 px-2 md:px-6 text-white">₹ {user.totalExpense.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-4 px-6 text-center text-lime-200" colSpan="3">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
