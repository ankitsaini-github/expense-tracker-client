import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';

import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

// import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.defaults.font.size = 18;

const ExpenseDonutChart = () => {
  // const expenses = useSelector((state) => state.expenses.expenses);

  const [expenses, setExpenses] = useState([]);
  const token = window.localStorage.getItem('token');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get('http://localhost:3000/expenses/fetch-all', {
          headers: { 'Authorization': token }
        });
        console.log('chart data = ',res.data);
        setExpenses(res.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  const categories = expenses.map(expense => expense.category);
  const uniqueCategories = [...new Set(categories)];
  const categorySums = uniqueCategories.map(category =>
    expenses
      .filter(expense => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0)
  );

  const data = {
    labels: uniqueCategories,
    datasets: [
      {
        label: 'Expenses',
        data: categorySums,
        borderColor: '#27272a',
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ]
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div className="container mx-auto mt-6 p-6 bg-zinc-900 text-lime-300 rounded-lg shadow-lg">
      {/* <h2 className="text-3xl mb-6 font-bold text-center text-lime-400">Expense Distribution</h2> */}
      <div className=' relative w-[300px] h-[300px] md:w-[350px] md:h-[350px] mx-auto'>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default ExpenseDonutChart;
