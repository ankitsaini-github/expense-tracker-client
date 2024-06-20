// import React, { useEffect, useState } from 'react';

// import Navbar from '../Navbar';
// import axios from 'axios';

// const Leaderboard = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:3000/premium/leaderboard',{headers:{'Authorization': token}});
//         console.log(response.data);
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   },[]);

//   return (
//     <>
//       <Navbar />
//       <div className="container mx-auto mt-6 p-4 bg-zinc-800 text-white rounded-md">
//         <h1 className="text-2xl mb-4">Leaderboard</h1>
//         <table className="min-w-full bg-zinc-900">
//           <thead>
//             <tr>
//               <th className="py-2 px-4">Rank</th>
//               <th className="py-2 px-4">Name</th>
//               <th className="py-2 px-4">Total Expenses</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length > 0 ? (
//               users.map((user,i) => (
//                 <tr key={user.id} className='border-t-2 border-zinc-800 bg-zinc-700 hover:bg-slate-700'>
//                   <td className="py-2 px-4 text-center">{i+1}</td>
//                   <td className="py-2 px-4 text-center">{user.name}</td>
//                   <td className="py-2 px-4 text-center">{user.totalExpense}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td className="py-2 px-4 border-t border-zinc-700" colSpan="3">No users found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default Leaderboard;

import React, { useEffect, useState } from 'react';

import Navbar from '../Navbar';
import axios from 'axios';
import { generateConfetti } from '../../utils/generateConfetti';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/premium/leaderboard', {
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
      <div className="container mx-auto mt-6 p-6 bg-zinc-800 text-lime-300 rounded-lg shadow-lg">
        <h1 className="text-3xl mb-6 font-bold text-center text-lime-400">Leaderboard</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-zinc-900 rounded-lg overflow-hidden">
            <thead>
              <tr className=" bg-gradient-to-r from-lime-500 to-lime-600 text-black text-lg">
                <th className="py-3 px-6 text-left ">Rank</th>
                <th className="py-3 px-6 text-left ">Name</th>
                <th className="py-3 px-6 text-left ">Total Expenses</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, i) => (
                  <tr
                    key={user.id}
                    className={`${i % 2 === 0 ? 'bg-zinc-900' : 'bg-neutral-700'} text-lg`}
                  >
                    <td className="py-4 px-6 text-white">{getRank(i)}</td>
                    <td className="py-4 px-6 text-white">{user.name}</td>
                    <td className="py-4 px-6 text-white">₹ {user.totalExpense.toFixed(2)}</td>
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
