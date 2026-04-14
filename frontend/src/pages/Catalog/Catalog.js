import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Paper } from "@mui/material";

import CatalogHeader from "../../components/catalog/CatalogHeader";
import CatalogToolbar from "../../components/catalog/CatalogToolbar";
import ProductsTable from "../../components/catalog/ProductsTable";
import ProductModal from "../../components/ProductModal";

import {
	fetchProductsFilteredThunk,
	deleteProductThunk,
	createProductThunk,
	updateProductThunk,
} from "../../store/features/products/productsThunk";

import {
	setProductsPage,
} from "../../store/features/products/productsSlice";

import "./Catalog.scss";
import { startLoading, stopLoading } from "../../store/features/ui/uiSlice";

const CatalogPage = () => {

	const dispatch = useDispatch();

	const products = useSelector((state) => state.products.items);
	const totalProducts = useSelector((state) => state.products.total);
	const page = useSelector((state) => state.products.page);
	const pageSize = useSelector((state) => state.products.pageSize);
	const loading = useSelector((state) => state.ui.loading);

	const [search, setSearch] = useState("");

	const [openModal, setOpenModal] = useState(false);
	const [editingProduct, setEditingProduct] = useState(null);

	/* ========================= */
	/* FETCH (SOLO DATA) */
	/* ========================= */

	const refetch = useCallback(() => {
		dispatch(startLoading());
		setTimeout(() => {
			dispatch(fetchProductsFilteredThunk({ search }));
			dispatch(stopLoading());
		}, 300);
		//
	}, [dispatch, search]);

	/* ========================= */
	/* FETCH ON SEARCH */
	/* ========================= */

	useEffect(() => {
		refetch();
	}, [refetch]);

	/* ========================= */
	/* DEBOUNCE SEARCH */
	/* ========================= */
	useEffect(() => {
		const delay = setTimeout(() => {
			refetch();
		}, 500);

		return () => clearTimeout(delay);
	}, [search, refetch]);

	/* ========================= */
	/* HANDLERS */
	/* ========================= */

	const handleDelete = useCallback((id) => {
		dispatch(deleteProductThunk(id)).then(refetch);
	}, [dispatch, refetch]);

	const handleSave = useCallback((args) => {
		dispatch(createProductThunk(args)).then(refetch);
	}, [dispatch, refetch]);

	const handleEdit = useCallback((id, args) => {
		dispatch(updateProductThunk(id, args)).then(refetch);
	}, [dispatch, refetch]);

	const handleSetOpenModal = useCallback((status) => {
		setOpenModal(status);
		if (!status) refetch();
	}, [refetch]);

	const handleSearchChange = useCallback((value) => {
		setSearch(value);
		dispatch(setProductsPage({
			page: 0,
			pageSize,
		}));
	}, [dispatch, pageSize]);

	/* ========================= */
	/* PAGINACIÓN (REDUX) */
	/* ========================= */
	const handlePaginationChange = useCallback((model) => {
		dispatch(startLoading());
		setTimeout(() => {
			dispatch(setProductsPage({
				page: model.page,
				pageSize: model.pageSize,
			}));
			dispatch(stopLoading());
		}, 300);
	}, [dispatch]);

	const handleEditProduct = useCallback((product) => {
		setEditingProduct(product);
		setOpenModal(true);
	}, []);

	/* ========================= */
	/* RENDER */
	/* ========================= */

	return (
		<Container sx={{ mt: 5 }}>

			<CatalogHeader />

			<CatalogToolbar
				search={search}
				setSearch={handleSearchChange}
				onAdd={() => {
					setEditingProduct(null);
					setOpenModal(true);
				}}
			/>

			<Paper className="paper-table">
				<ProductsTable
					products={products}
					rowCount={totalProducts}
					loading={loading}
					paginationModel={{
						page,
						pageSize,
					}}
					onEdit={handleEditProduct}
					onDelete={handleDelete}
					onPaginationModelChange={handlePaginationChange}
				/>
			</Paper>

			<ProductModal
				open={openModal}
				onClose={() => handleSetOpenModal(false)}
				onSuccess={refetch}
				onSave={handleSave}
				onEdit={handleEdit}
				initialData={editingProduct}
			/>

		</Container>
	);
};

export default CatalogPage;