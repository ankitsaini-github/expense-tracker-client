import React, { useEffect, useState } from 'react';

import Navbar from '../Navbar';
import axios from 'axios';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/premium/leaderboard',{headers:{'Authorization': token}});
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  },[]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-6 p-4 bg-zinc-800 text-white rounded-md">
        <h1 className="text-2xl mb-4">Leaderboard</h1>
        <table className="min-w-full bg-zinc-900">
          <thead>
            <tr>
              <th className="py-2 px-4">Rank</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Total Expenses</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user,i) => (
                <tr key={user.id} className='border-t-2 border-zinc-800 bg-zinc-700 hover:bg-slate-700'>
                  <td className="py-2 px-4 text-center">{i+1}</td>
                  <td className="py-2 px-4 text-center">{user.name}</td>
                  <td className="py-2 px-4 text-center">{user.totalExpenses}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-2 px-4 border-t border-zinc-700" colSpan="3">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Leaderboard;