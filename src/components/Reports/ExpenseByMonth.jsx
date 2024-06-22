import React from "react";

const ExpenseByMonth = ({ onMonthChange }) => {
  
  const submitHandler = (e) => {
    e.preventDefault();
    const month = e.target.month.value;
    onMonthChange(month);
  };
  
  const getCurrentMonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    return `${year}-${month}`;
  };

  return (
    <form className="flex flex-col gap-2 max-w-fit" onSubmit={submitHandler}>
      <label htmlFor="month">Select Month</label>
      <input
        type="month"
        name="month"
        id="month"
        className="text-lime-300 bg-zinc-900 p-2 rounded"
        style={{ colorScheme: "dark" }}
        max={getCurrentMonth()}
        required
      />
      <button className="bg-zinc-400 hover:bg-lime-500 text-zinc-900 font-semibold py-1 px-3 rounded mr-auto">
        Show by Month
      </button>
    </form>
  );
};

export default ExpenseByMonth;
