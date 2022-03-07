import { createSlice } from "@reduxjs/toolkit";

const initialState={
    staffEditing:false,
}

export const studentSlice = createSlice({
    name:"student",
    initialState,
    reducers:{
        setStaffEditing:(state,{payload})=>{
            state.staffEditing = payload;
        }
    }
})

export const {setStaffEditing} = studentSlice.actions;
export default studentSlice.reducer;