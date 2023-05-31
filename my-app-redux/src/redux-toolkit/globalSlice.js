import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: true,
};

const GlobalSlice = createSlice({
  name:"global",
  initialState,
  reducers:{
    toggleDarkMode: (state, action)=>({
      ...state,
      darkMode: action.payload
    })
  }
})

export const {toggleDarkMode} = GlobalSlice.actions;

export default GlobalSlice.reducer

