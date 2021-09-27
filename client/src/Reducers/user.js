import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: "idle",
    user: {}
  },
  reducers: {
    userLoading(state, action) {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    userRecieved(state, action) {
      if (state.loading === "pending") {
        state.loading = "idle";
      }
      state.user = action.payload;
    }
  }
});

export const {userLoading, userRecieved} = userSlice.actions;

const selectLoadingStatus = state => state.user.loading;
const selectUser = state => state.user.user;

export {selectLoadingStatus, selectUser};

export default userSlice.reducer;
