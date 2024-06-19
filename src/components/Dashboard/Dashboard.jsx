import React, { useEffect, useState } from 'react';

import ExpenseForm from './ExpenseForm';
import ExpenseTable from './ExpenseTable';
import axios from 'axios';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/expenses/fetch-all');
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const handleDeleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  return (
      <div className="container mx-auto p-4 bg-gray-800 text-white min-h-screen">
        <h1 className="text-2xl font-bold mb-4">DhanDiary</h1>
        <ExpenseForm onAddExpense={handleAddExpense} />
        <ExpenseTable expenses={expenses} onDeleteExpense={handleDeleteExpense} />
      </div>
  );
};

export default Dashboard;
