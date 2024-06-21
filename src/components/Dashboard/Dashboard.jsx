import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ExpenseDonutChart from "./ExpenseDonutChart";
import ExpenseForm from "./ExpenseForm";
import ExpenseTable from "./ExpenseTable";
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

  return (
    <>
      <Navbar />

      {isPro && <div className="container mx-auto mt-6 p-4 bg-zinc-800 text-white rounded-md" onClick={()=>toast.error('hello')}>
      <h1 className="text-xl text-lime-400 font-semibold mb-2 border-b border-lime-800 pb-2">Expense Chart</h1>
        <ExpenseDonutChart />
      </div>}

      <div className="container mx-auto mt-6 p-4 bg-zinc-800 text-white rounded-md">
      <h1 className="text-xl text-lime-400 font-semibold mb-2 border-b border-lime-800 pb-2">Expense Form</h1>
        <ExpenseForm onAddExpense={handleAddExpense} />
      </div>

      <div className="container mx-auto mt-6 p-4 bg-zinc-800 text-white rounded-md">
        <h1 className="text-xl text-lime-400 font-semibold mb-2 border-b border-lime-800 pb-2">My Expenses</h1>
        <ExpenseTable
          expenses={expenses}
          onDeleteExpense={handleDeleteExpense}
        />
      </div>
    </>
  );
};

export default Dashboard;
