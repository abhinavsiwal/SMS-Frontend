import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signIn } from "../../api/login/index";
import CryptoJS from "crypto-js";
// import validator from "validator";


const initialState = {
  token: "",
  expiry: "",
  userDetails: {},
  loading: false,
  error: {},
};


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:{
    setToken:(state,{payload})=>{
      if(!payload){
        return
      }
     console.log(payload);
      state.token = payload;
    },
    setExpiry:(state,action)=>{
      state.expiry=action.payload;
    },
    setUserDetails:(state,action)=>{
      state.userDetails=action.payload;
    }
  },
 
});

export const {setToken,setExpiry,setUserDetails} = authSlice.actions;
export default authSlice.reducer;
