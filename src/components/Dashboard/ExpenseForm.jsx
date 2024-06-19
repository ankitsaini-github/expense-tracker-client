import React, { useState } from 'react';

import axios from 'axios';

const ExpenseForm = ({ onAddExpense }) => {
  const [expenseAmount, setExpenseAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleAddExpense = async (e) => {
    e.preventDefault();
    const newExpense = { amount: expenseAmount, description, category };

    try {
      const response = await axios.post('http://localhost:3000/expenses/add-expense', newExpense);
      onAddExpense(response.data);
      setExpenseAmount('');
      setDescription('');
      setCategory('');
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <form onSubmit={handleAddExpense} className="mb-4">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-300">Expense Amount:</label>
        <input
          type="number"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-300">Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-300">Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
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
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
