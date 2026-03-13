import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [],
	total: 0,
	page: 0,
	pageSize: 10,
	cursors: {},
	search: "",
	selectedProduct: null,  // Producto seleccionado para editar/ver
};

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {

		/* ========================= */
		/* SET PRODUCTS (FETCH)      */
		/* ========================= */
		setProducts: (state, action) => {
			state.items = action.payload;
		},
		setProductsPage: (state, action) => {
			const { items, total, page, pageSize, cursor } = action.payload;

			state.items = items;
			state.total = total;
			state.page = page;
			state.pageSize = pageSize;

			state.cursors = {
				...state.cursors,
				[page]: cursor
			};
		},
		setSearchTerm: (state, action) => {
			state.search = action.payload;
			state.page = 0;
			state.cursors = {};
		}
	},
});

/* ========================= */
/* EXPORT ACTIONS            */
/* ========================= */
export const {
	setProducts,
	setProductsPage,
	setSearchTerm
} = productsSlice.actions;

/* ========================= */
/* EXPORT REDUCER            */
/* ========================= */
export default productsSlice.reducer;