import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import ExpenseForm from "./ExpenseForm";
import ExpenseTable from "./ExpenseTable";
import Navbar from "../Navbar";
import axios from "axios";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  const token = window.localStorage.getItem("token");

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/expenses/fetch-all`,
          { headers: { Authorization: token } }
        );
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
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
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Navbar />
      <div className="container mx-auto mt-6 p-4 bg-zinc-800 text-white rounded-md">
        <ExpenseForm onAddExpense={handleAddExpense} />
      </div>
      <div className="container mx-auto mt-6 p-4 bg-zinc-800 text-white rounded-md">
        <ExpenseTable
          expenses={expenses}
          onDeleteExpense={handleDeleteExpense}
        />
      </div>
    </>
  );
};

export default Dashboard;
