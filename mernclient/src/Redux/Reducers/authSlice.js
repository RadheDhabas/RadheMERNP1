import { createSlice } from '@reduxjs/toolkit';
 
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    token:'',
  },
  reducers: {
    loginUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
       state.token= action.payload.authToken
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token= ''
    },
  },
  
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;