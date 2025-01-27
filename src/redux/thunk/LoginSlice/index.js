import { createSlice } from "@reduxjs/toolkit";
import { EditUserThunk, getUserThunk, LoginThunk } from "../allthunks";

const LoginSlice = createSlice({
  name: "user",
  initialState: {
    userData: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(LoginThunk.fulfilled, (state, action) => {
        state.status == "succeeded";
        console.log("action data=", action.payload);
        const { accessToken, refreshToken, id, username, email } =
          action.payload;
        const data = { id, email, username };

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        state.userData = data;
      })
      .addCase(LoginThunk.rejected, (state) => {
        state.status = "failed";
        console.log("present in failed");
        state.error = "failed to update";
      })
      .addCase(getUserThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.status == "succeeded";
        console.log("action data=", action.payload);

        state.userData = action.payload;
      })
      .addCase(getUserThunk.rejected, (state) => {
        state.status = "failed";

        state.error = "failed to update";
      })
      .addCase(EditUserThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(EditUserThunk.fulfilled, (state, action) => {
        state.status == "succeeded";
        console.log("action data=", action.payload);

        state.userData = action.payload;
      })
      .addCase(EditUserThunk.rejected, (state) => {
        state.status = "failed";
        state.error = "failed to update";
      });
  },
});
export default LoginSlice.reducer;
