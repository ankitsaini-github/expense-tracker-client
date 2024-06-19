import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from './expenseReducer'
import authSlice from './authReducer'

const store=configureStore({
    reducer:{
        expenses:expenseSlice,
        auth:authSlice,
    }
})

export default store;