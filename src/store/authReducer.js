import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:'authentication',
    initialState:{
        isloggedin: window.localStorage.getItem('token')?true:false,

    },
    reducers:{
        login(state){
            state.isloggedin=true
        },
        logout(state){
            state.isloggedin=false
        }
    }
})

export const authActions=authSlice.actions;
export default authSlice.reducer;