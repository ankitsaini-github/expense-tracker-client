import React from 'react';
import axios from 'axios';

const ExpenseTable = ({ expenses, onDeleteExpense }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/expenses/delete-expense/${id}`);
      onDeleteExpense(id);
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-900 text-left">
            <th className="py-3 px-6 font-semibold tracking-wider uppercase">Amount</th>
            <th className="py-3 px-6 font-semibold tracking-wider uppercase">Description</th>
            <th className="py-3 px-6 font-semibold tracking-wider uppercase">Category</th>
            <th className="py-3 px-6 font-semibold tracking-wider uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="border-b border-gray-700 bg-gray-700">
              <td className="py-4 px-6">{expense.amount}</td>
              <td className="py-4 px-6">{expense.description}</td>
              <td className="py-4 px-6">{expense.category}</td>
              <td className="py-4 px-6">
                <button
                  onClick={() => handleDelete(expense.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;