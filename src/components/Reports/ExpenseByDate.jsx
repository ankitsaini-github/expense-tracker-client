import React from "react";

const ExpenseByDate = ({ onDateChange }) => {
  const submitHandler = (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    onDateChange(date);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <form className="flex flex-col gap-2 max-w-fit" onSubmit={submitHandler}>
      <label htmlFor="date">Select Date</label>
      <input
        type="date"
        name="date"
        id="date"
        className="text-lime-300 bg-zinc-900 p-2 rounded"
        style={{ colorScheme: "dark" }}
        max={getCurrentDate()}
        required
      />
      <button className="bg-zinc-400 hover:bg-lime-500 text-zinc-900 font-semibold py-1 px-3 mr-auto rounded">
        Show by Date
      </button>
    </form>
  );
};

export default ExpenseByDate;
