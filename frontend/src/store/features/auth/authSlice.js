import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Users as UserServices } from "../../../firebase/services/index";

/* ========================= */
/* ASYNC LOGIN */
/* ========================= */
export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ identifier, password }, { rejectWithValue }) => {
    try {
      const user = await UserServices.loginUser(identifier, password);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const storedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: storedUser || null,
  isAuthenticated: !!storedUser,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("user");
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* LOGIN SUCCESS */
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;

        localStorage.setItem(
          "user",
          JSON.stringify(action.payload)
        );
      })

      /* LOGIN ERROR */
      .addCase(loginThunk.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout, clearAuthError } =
  authSlice.actions;

export default authSlice.reducer;