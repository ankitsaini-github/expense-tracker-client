import { createSlice } from "@reduxjs/toolkit";

const initialState={
    expenses:[],
}
const expenseSlice=createSlice({
    name:'expenses',
    initialState,
    reducers:{
        setexpense(state,action){
            state.expenses=action.payload
        },
    }
})

export const expenseActions=expenseSlice.actions;

export default expenseSlice.reducer