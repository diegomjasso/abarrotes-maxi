import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	allItems: [],
	items: [],
	total: 0,
	page: 0,
	pageSize: 10,
	selectedProduct: null
};

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {

		/* ========================= */
		/* SET PRODUCTS (FETCH)      */
		/* ========================= */
		setProducts: (state, action) => {
			state.allItems = action.payload;
			state.total = action.payload.length;

			// 👇 recalcular página actual automáticamente
			const start = state.page * state.pageSize;
			const end = start + state.pageSize;

			state.items = state.allItems.slice(start, end);
		},
		setProductsPage: (state, action) => {
			const { page, pageSize } = action.payload;

			state.page = page;
			state.pageSize = pageSize;

			const start = page * pageSize;
			const end = start + pageSize;

			state.items = state.allItems.slice(start, end);
		},
		resetPagination: (state) => {
			state.page = 0;

			const start = 0;
			const end = state.pageSize;

			state.items = state.allItems.slice(start, end);
		}
	},
});

/* ========================= */
/* EXPORT ACTIONS            */
/* ========================= */
export const {
	setProducts,
	setProductsPage,
	resetPagination,
} = productsSlice.actions;

/* ========================= */
/* EXPORT REDUCER            */
/* ========================= */
export default productsSlice.reducer;