import { createSlice } from "@reduxjs/toolkit";

const initialState={
    setClass:[],
}

export const classSlice = createSlice({
    name:"class",
    initialState,
    reducers:{
        setClass:(state,{payload})=>{
            state.setClass = payload;
        }
    }
})

export const {setClass} = classSlice.actions;
export default classSlice.reducer;