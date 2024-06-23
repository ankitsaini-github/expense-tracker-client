import { createSlice } from "@reduxjs/toolkit";

const initialState={
    expenses:[],
    totalValue:0,
}
const expenseSlice=createSlice({
    name:'expenses',
    initialState,
    reducers:{
        setExpense(state,action){
            state.expenses=action.payload
            state.totalValue=action.payload.reduce((acc, cur) => acc + parseInt(cur.amount), 0);
        },
        addExpense(state,action){
            // state.expenses=[...state.expenses,action.payload]
            state.expenses.push(action.payload)
            state.totalValue+=parseInt(action.payload.amount)

        },
        deleteExpense(state,action){
            state.expenses = state.expenses.filter((expense) => expense.id !== action.payload);
            state.totalValue= state.expenses.reduce((acc, cur) => acc + parseInt(cur.amount), 0);
        },
    }
})

export const expenseActions=expenseSlice.actions;

export default expenseSlice.reducer