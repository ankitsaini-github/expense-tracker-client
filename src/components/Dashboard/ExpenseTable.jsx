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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash3-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                  </svg>
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
