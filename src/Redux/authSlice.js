import { createSlice } from '@reduxjs/toolkit';


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
     
      state.isLogin = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;