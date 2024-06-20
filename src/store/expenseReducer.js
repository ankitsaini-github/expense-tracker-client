import { createSlice } from "@reduxjs/toolkit";

const initialState={
    expenses:[],
}
const expenseSlice=createSlice({
    name:'expenses',
    initialState,
    reducers:{
        setExpense(state,action){
            state.expenses=action.payload
        },
        addExpense(state,action){
            // state.expenses=[...state.expenses,action.payload]
            state.expenses.push(action.payload)
        },
        deleteExpense(state,action){
            state.expenses = state.expenses.filter((expense) => expense.id !== action.payload);
        },
    }
})

export const expenseActions=expenseSlice.actions;

export default expenseSlice.reducer