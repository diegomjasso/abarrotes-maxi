import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Paper, Box, CircularProgress } from "@mui/material";

import CatalogHeader from "../../components/catalog/CatalogHeader";
import CatalogToolbar from "../../components/catalog/CatalogToolbar";
import ProductsTable from "../../components/catalog/ProductsTable";
import ProductModal from "../../components/ProductModal";

import {
	fetchProductsPaginatedThunk,
	deleteProductThunk,
	createProductThunk,
	updateProductThunk
} from "../../store/features/products/productsThunk";
import { setSearchTerm } from "../../store/features/products/productsSlice";

const CatalogPage = () => {

	const dispatch = useDispatch();

	const products = useSelector(state => state.products.items);
	const totalProducts = useSelector(state => state.products.total);
	const loading = useSelector(state => state.ui.loading);

	const [search, setSearch] = useState("");

	const [query, setQuery] = useState({
		page: 0,
		pageSize: 10,
		search: ""
	});

	const [openModal, setOpenModal] = useState(false);
	const [editingProduct, setEditingProduct] = useState(null);

	// fetch products
	useEffect(() => {
		dispatch(fetchProductsPaginatedThunk(query));
	}, [query, dispatch]);

	// debounce search
	useEffect(() => {

		const delay = setTimeout(() => {

			setQuery(prev => ({
				...prev,
				page: 0,
				search: search
			}));

		}, 400);

		return () => clearTimeout(delay);

	}, [search]);

	const handleDelete = (id) => {
		dispatch(deleteProductThunk(id));
	};

	const handleSave = (args) => {
		dispatch(createProductThunk(args));
	};

	const handleEdit = (id, args) => {
		dispatch(updateProductThunk(id, args));
	};

	return (
		<Container sx={{ mt: 5 }}>

			<CatalogHeader />

			<CatalogToolbar
				search={search}
				setSearch={(value) => {
					setSearch(value);
					dispatch(setSearchTerm(value));
				}}
				onAdd={() => {
					setEditingProduct(null);
					setOpenModal(true);
				}}
			/>

			<Paper sx={{ height: 600, p: 2 }}>

				{loading ? (

					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						height="100%"
					>
						<CircularProgress />
					</Box>

				) : (
					<ProductsTable
						products={products}
						rowCount={totalProducts}
						loading={loading}
						paginationModel={{ page: query.page, pageSize: query.pageSize }}
						onEdit={(product) => {
							setEditingProduct(product);
							setOpenModal(true);
						}}
						onDelete={handleDelete}
						onPaginationModelChange={(model) => {
							setQuery(prev => ({
								...prev,
								page: model.page,
								pageSize: model.pageSize
							}));
						}}
					/>

				)}

			</Paper>

			<ProductModal
				open={openModal}
				onClose={() => setOpenModal(false)}
				onSuccess={() => dispatch(fetchProductsPaginatedThunk(query))}
				onSave={handleSave}
				onEdit={handleEdit}
				initialData={editingProduct}
			/>

		</Container>
	);
};

export default CatalogPage;