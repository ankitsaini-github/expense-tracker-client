import { FaTrashAlt } from "react-icons/fa";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ExpenseTable = ({ expenses, onDeleteExpense }) => {
  const token=window.localStorage.getItem('token');
  
  const handleDelete = async (id) => {
    if(confirm('Do you want to delete this expense ?')){
      try {
        const res=await axios.delete(`http://localhost:3000/expenses/delete-expense/${id}`,{headers : {'Authorization' : token}});
        onDeleteExpense(id);
        toast.success(res.data.message)
      } catch (error) {
        console.error("Error deleting expense:", error);
        toast.error(error.error);
      }
    }
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
          {expenses.map((expense) => (
            <tr
              key={expense.id}
              className={`border-b-2 border-l-2 ${expense.category=="Salary"?'border-l-green-500':'border-l-red-500'}  border-b-zinc-700 bg-zinc-800 hover:bg-neutral-900`}
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
    </div>
  );
};

export default ExpenseTable;
