import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.userData = null;
      state.isAuthenticated = false;
    },
  },
});


export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
