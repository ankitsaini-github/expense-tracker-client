import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CSVLink } from 'react-csv';
import ExpenseDonutChart from "./ExpenseDonutChart";
import ExpenseForm from "./ExpenseForm";
import ExpenseTable from "./ExpenseTable";
import { FaFileCsv } from "react-icons/fa6";
import Navbar from "../Navbar";
import axios from "axios";
import { expenseActions } from "../../store/expenseReducer";
import { toast } from "react-toastify";

const Dashboard = () => {
  
  const dispatch = useDispatch();
  const isPro = useSelector((state) => state.auth.isPro);
  const expenses = useSelector((state) => state.expenses.expenses);

  const token = window.localStorage.getItem("token");

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/expenses/fetch-all`,
          { headers: { Authorization: token } }
        );
        // console.log(response.data);
        dispatch(expenseActions.setExpense(response.data))
   
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  const handleAddExpense = (newExpense) => {
    dispatch(expenseActions.addExpense(newExpense))
  };

  const handleDeleteExpense = (id) => {
    dispatch(expenseActions.deleteExpense(id))
  };

  const csvheaders = [
    { label: 'Description', key: 'description' },
    { label: 'Category', key: 'category' },
    { label: 'Amount', key: 'amount' },
    { label: 'Date', key: 'createdAt' },
  ];

  return (
    <>
      <Navbar />

      {isPro && <div className="container mx-auto mt-6 p-4 bg-zinc-800 text-white rounded-md">
      <h1 className="text-xl text-lime-400 font-semibold mb-2 border-b border-lime-800 pb-2">Expense Chart</h1>
        <ExpenseDonutChart />
      </div>}

      <div className="container mx-auto mt-6 p-4 bg-zinc-800 text-white rounded-md">
      <h1 className="text-xl text-lime-400 font-semibold mb-2 border-b border-lime-800 pb-2">Expense Form</h1>
        <ExpenseForm onAddExpense={handleAddExpense} />
      </div>

      <div className="container mx-auto mt-6 p-4 bg-zinc-800 text-white rounded-md">
        <h1 className="text-xl text-lime-400 font-semibold mb-2 border-b border-lime-800 pb-2">My Expenses</h1>
        <div className='my-3 p-3 bg-zinc-900 flex justify-end rounded'>
          {/* {isPro?
          <CSVLink data={expenses} headers={csvheaders} filename="expense_report.csv" className="bg-zinc-400 hover:bg-lime-500 text-black px-3 py-2 rounded font-bold flex items-center gap-2">
            <p>Export</p><FaFileCsv className="text-2xl"/>
          </CSVLink>
          :<p className="text-zinc-400 text-md">Get <span className="text-lime-500 font-semibold">Pro Membership</span> to export expenses</p>
          } */}
        </div>
        <ExpenseTable
          onDeleteExpense={handleDeleteExpense}
        />
      </div>
    </>
  );
};

export default Dashboard;
