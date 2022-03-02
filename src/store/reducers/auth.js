import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminLogin, staffLogin, studentLogin } from "../../api/login/index";
import validator from "validator";

const initialState = {
  token: "",
  expiry: "",
  setUserDetails:{},
  loading:false,
  error:{}
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
      console.log(username,password);
    if (username && password) {
      if (validator.isEmail(username)) {
        try {
          const data = await adminLogin(username, password);
          console.log(data);
          return data;
        } catch (err) {
          console.log(err);
          return rejectWithValue(err.response.data);
        }
      } else {
        const role = username.substring(3, 6);
        console.log(role);
        if (role === "STF") {
          try {
            const data = await staffLogin(username, password);
            console.log(data);
            return data;
          } catch (err) {
            console.log(err);
            return rejectWithValue(err.response.data);
          }
        } else if (role === "STD") {
            try {
                const data = await studentLogin(username, password);
                console.log(data);
                return data;
              } catch (err) {
                console.log(err);
                return rejectWithValue(err.response.data);
              }
        } else {
          alert("Invalid username");
        }
      }
    } else {
      alert("Please fill all fields");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers:{
      [login.pending]:(state)=>{
          state.loading=true;
      },
      [login.fulfilled]:(state,{payload})=>{
        state.token = payload.token;
        state.userDetails=payload.user;
        state.expiry = payload.expiryTime;
      },
      [login.rejected]:(state,{payload})=>{
          state.loading=false
          state.error = payload
      }
  }
});

export const { setToken, setExpiry } = authSlice.actions;
export default authSlice.reducer;
