import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
  name: "login",
  initialState: {
    isLogin: false,
    isRegister: true,
    user: {
      email: null,
      userId: null,
      role: 0,
      emailVerified: false,
      name: null,
      avatarUrl: null,
    },
  },
  reducers: {
    isLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    isRegister: (state) => {
      state.isRegister = !state.isRegister;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { isLogin, isRegister, setUser } = LoginSlice.actions;

export default LoginSlice.reducer;
