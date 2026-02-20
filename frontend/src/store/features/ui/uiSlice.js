import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  loadingMessage: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    startLoading: (state, action) => {
      state.loading = true;
      state.loadingMessage =
        action.payload || "Cargando...";
    },
    stopLoading: (state) => {
      state.loading = false;
      state.loadingMessage = "";
    },
  },
});

export const loading = uiSlice.actions;

export default uiSlice.reducer;