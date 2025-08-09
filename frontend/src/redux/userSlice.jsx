import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    isAuthenticated: false,
    loading:true,
  },
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
      state.loading=false;
    },
    clearUser: (state) => {
      state.userData = null;
      state.isAuthenticated = false;
      state.loading=false;
    },
    finishLoading : (state) =>{
        state.loading = false;
    }
  },
});


export const { setUser, clearUser,finishLoading } = userSlice.actions;
export default userSlice.reducer;
