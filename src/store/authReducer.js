import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:'authentication',
    initialState:{
        isloggedin: window.localStorage.getItem('token')?true:false,
        isPro: window.localStorage.getItem('isPro')?true:false,
    },
    reducers:{
        login(state,action){
            state.isloggedin=true
            state.isPro=action.payload?true:false
        },
        logout(state){
            state.isloggedin=false
            state.isPro=false
        },
        setIsPro(state,action){
            state.isPro=action.payload;
        }
    }
})

export const authActions=authSlice.actions;
export default authSlice.reducer;