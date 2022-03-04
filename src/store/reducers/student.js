import { createSlice } from "@reduxjs/toolkit";

const initialState={
    student:{},
}

export const studentSlice = createSlice({
    name:"student",
    initialState,
    reducers:{
        setStudent:(state,{payload})=>{
            state.student = payload;
        }
    }
})

export const {setStudent} = studentSlice.actions;
export default studentSlice.reducer;