import React, { useEffect, useState } from "react";

import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const ExpenseTable = ({ onDeleteExpense }) => {
  const [expenses, setExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = window.localStorage.getItem('token');
  const expensesPerPage = 10;

  const fetchExpenses = async (page) => {
    try {
      const res = await axios.get(`http://localhost:3000/expenses/fetch-all?page=${page}&limit=${expensesPerPage}`, {
        headers: { 'Authorization': token }
      });
      if(res.status!=200){
        throw new Error('res status not 200')
      }
      console.log('got expenses ',res.data.expenses)
      setExpenses(res.data.expenses);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      toast.error("Error fetching expenses");
    }
  };

  useEffect(() => {
    fetchExpenses(currentPage);
  }, [currentPage]);

  const handleDelete = async (id) => {
    if (confirm('Do you want to delete this expense?')) {
      try {
        const res = await axios.delete(`http://localhost:3000/expenses/delete-expense/${id}`, {
          headers: { 'Authorization': token }
        });
        onDeleteExpense(id);
        fetchExpenses(currentPage); // Refresh the expenses after deletion
        toast.success(res.data.message);
      } catch (error) {
        console.error("Error deleting expense:", error);
        toast.error("Error deleting expense");
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="overflow-x-auto p-3">
      <table className="min-w-full text-white rounded-md overflow-hidden">
        <thead>
          <tr className="bg-black text-left">
            <th className="py-3 px-6 font-semibold tracking-wider uppercase">
              Amount
            </th>
            <th className="py-3 px-6 font-semibold tracking-wider uppercase">
              Description
            </th>
            <th className="py-3 px-6 font-semibold tracking-wider uppercase">
              Category
            </th>
            <th className="py-3 px-6 font-semibold tracking-wider uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses.length>0 && expenses.map((expense) => (
            <tr
              key={expense.id}
              className={`border-b-2 border-l-2 ${expense.category === "Salary" ? 'border-l-green-500' : 'border-l-red-500'} border-b-zinc-700 bg-zinc-800 hover:bg-neutral-900`}
            >
              <td className="py-4 px-6">{expense.amount}</td>
              <td className="py-4 px-6">{expense.description}</td>
              <td className="py-4 px-6">{expense.category}</td>
              <td className="py-4 px-6">
                <button
                  onClick={() => handleDelete(expense.id)}
                  className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 rounded-md ${currentPage === index + 1 ? 'bg-lime-600 text-white' : 'bg-zinc-300 text-black'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExpenseTable;
