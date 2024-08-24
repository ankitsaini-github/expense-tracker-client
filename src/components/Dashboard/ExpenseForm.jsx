import React, { useState } from 'react';

import axios from 'axios';
import { toast } from "react-toastify";

const ExpenseForm = ({ onAddExpense }) => {
  const [expenseAmount, setExpenseAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  
  const token=window.localStorage.getItem('token');

  const handleAddExpense = async (e) => {
    e.preventDefault();
    const newExpense = { amount: expenseAmount, description, category };
    
    try {
    const response = await axios.post(`${import.meta.env.VITE_SERVER_IP}/expenses/add-expense`, newExpense, {headers:{'Authorization' : token}});
      onAddExpense(response.data);
      toast.success('Expense Added.')
      setExpenseAmount('');
      setDescription('');
      setCategory('');
    } catch (error) {
      console.error('Error adding expense:', error);
      toast.error(error.error)
    }
  };

  return (
    <form onSubmit={handleAddExpense} className="mb-4 p-3">
      
      <div className="mb-3">
        <label className="block text-md font-medium text-gray-300">Expense Amount:</label>
        <input
          type="number"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
          className="mt-1 block w-full p-2 border-2 border-transparent focus:outline-none focus:ring-0 focus:border-lime-500 rounded-md bg-zinc-900 text-white"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block text-md font-medium text-gray-300">Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full p-2 border-2 border-transparent focus:outline-none focus:ring-0 focus:border-lime-500 rounded-md bg-zinc-900 text-white"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block text-md font-medium text-gray-300">Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full p-2 border-2 border-transparent focus:outline-none focus:ring-0 focus:border-lime-600 rounded-md bg-zinc-900 text-white"
          required
        >
          <option value="" disabled>Select category</option>
          <option value="Salary">Salary</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <button type="submit" className="mt-2 px-4 py-2 bg-gradient-to-b from-lime-500 to-lime-700 hover:from-lime-600 hover:to-lime-800  text-zinc-900 text-lg font-bold rounded">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
