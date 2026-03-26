import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Paper } from "@mui/material";

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

import "./Catalog.scss";

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

	const refetch = () => {
		dispatch(fetchProductsPaginatedThunk(query));
	};
	// fetch products
	useEffect(() => {
		refetch();
	// eslint-disable-next-line react-hooks/exhaustive-deps
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
		dispatch(deleteProductThunk(id)).then(refetch);
	};

	const handleSave = (args) => {
		dispatch(createProductThunk(args)).then(refetch);
	};

	const handleEdit = (id, args) => {
		dispatch(updateProductThunk(id, args)).then(refetch);
	};

	const handleSetOpenModal = (status) => {
		setOpenModal(status);
		refetch();
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

			<Paper className="paper-table">
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