import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import uiReducer from "./features/ui/uiSlice";
import errorReducer from './features/errors/errorSlice';
import productsReducer from "./features/products/productsSlice";
import salesReducer from "./features/sales/salesSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		ui: uiReducer,
		error: errorReducer,
		products: productsReducer,
		sales: salesReducer,
	},
});
