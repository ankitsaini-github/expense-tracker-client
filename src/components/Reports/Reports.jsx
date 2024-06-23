import React, { useEffect, useState } from "react";

import ExpenseByDate from "./ExpenseByDate";
import ExpenseByMonth from "./ExpenseByMonth";
import Navbar from "../Navbar";
import axios from "axios";

const Reports = () => {
  const [expenses, setExpenses] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bool, setbool] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFiles = async () => {
      console.log("started");
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("http://localhost:3000/premium/all-files", {
          headers: { Authorization: token },
        });
        console.log("files ", res.data);
        if (res.status != 200) {
          throw new Error("fetching error try again");
        }
        setFiles(res.data);
      } catch (error) {
        console.log("error fetching file details : ", error);
        setError(error.error);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, [bool]);

  const fetchExpenses = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(url, {
        headers: { Authorization: token },
      });
      if (response.status != 200) {
        throw new Error("Network response was not ok");
      }
      const data = response.data;
      console.log(data);
      setExpenses(data);
    } catch (error) {
      console.log(error);
      setError(error.error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date) => {
    fetchExpenses(`http://localhost:3000/premium/reports?date=${date}`);
  };

  const handleMonthChange = (month) => {
    fetchExpenses(`http://localhost:3000/premium/reports?month=${month}`);
  };

  const downloadHandler = async () => {
    try {
      const res = await axios("http://localhost:3000/premium/download", {
        headers: { Authorization: token },
      });
      if (res.data.fileURL) {
        setbool((prev) => !prev);
      }
      console.log("aws link = ", res.data.fileURL);
    } catch (error) {
      console.log("aws err = ", error);
    }
  };
  return (
    <>
      <Navbar />

      <div className="container mx-auto mt-6 p-4 bg-zinc-800 text-white rounded-md">
        <h1 className="text-xl text-lime-400 font-semibold mb-2 border-b border-lime-800 pb-2">
          Expense Report
        </h1>

        <div className="flex p-3 flex-col md:flex-row justify-evenly">
          <div className="flex flex-row justify-center md:justify-start md:flex-col gap-5 p-1">
            <div className="py-3 px-1">
              <ExpenseByDate onDateChange={handleDateChange} />
            </div>
            <div className="py-3 px-1">
              <ExpenseByMonth onMonthChange={handleMonthChange} />
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : expenses.length > 0 ? (
              <>
                <table className="min-w-full text-white rounded-md overflow-hidden text-sm md:text-md">
                  <thead>
                    <tr className="bg-zinc-900 text-left font-semibold tracking-wider uppercase">
                      <th className="py-3 px-2 lg:px-6 ">Description</th>
                      <th className="py-3 px-2 lg:px-6 ">Amount</th>
                      <th className="py-3 px-2 lg:px-6 ">Category</th>
                      <th className="py-3 px-2 lg:px-6 ">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense) => (
                      <tr
                        key={expense.id}
                        className={`border-b-2 border-b-zinc-700 bg-zinc-800 hover:bg-neutral-900`}
                      >
                        <td className="py-4 px-2 lg:px-6">
                          {expense.description}
                        </td>
                        <td className="py-4 px-2 lg:px-6">{expense.amount}</td>
                        <td className="py-4 px-2 lg:px-6">
                          {expense.category}
                        </td>
                        <td className="py-4 px-2 lg:px-6">{expense.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="my-3 font-bold text-zinc-300">
                  Total Value :{" "}
                  {expenses.reduce((acc, curr) => acc + curr.amount, 0)}
                </p>
              </>
            ) : (
              <p>No expenses found for the selected date/month.</p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-6 p-4 bg-zinc-800 text-white rounded-md">
        <h1 className="text-xl text-lime-400 font-semibold mb-2 border-b border-lime-800 pb-2">
          Previous Files
        </h1>

        <div className="my-3 p-3 bg-zinc-900 flex justify-between rounded gap-8 items-center">
          <p className="text-zinc-400 ">Latest file on Top, click name to Download.</p>
          <button
            className="flex-shrink-0 px-3 py-2 text-zinc-900 font-semibold rounded shadow bg-lime-500"
            onClick={downloadHandler}
          >
            Generate New
          </button>
        </div>

        <div className="my-3 p-3 bg-zinc-900 flex justify-center rounded">
          <ul className="px-2">
            {files.length > 0 ? (
              <>
                {files.toReversed().map((file, i) => (
                  <li key={file.id} className="flex flex-wrap gap-4 py-4 text-sm sm:text-lg border-b-2 border-b-zinc-700">
                    <span className="text-zinc-300">{i==0? 'Latest' : i + 1} </span>
                    <span className="text-lime-500 hover:text-lime-300 font-semibold">
                      <a
                        href={file.link}
                        download={file.link.split("Expenses/")[1]}
                      >
                        {file.link.split("Expenses/")[1]} Download
                      </a>
                    </span>
                  </li>
                ))}
              </>
            ) : (
              <>
                <p>None file generated.</p>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Reports;
