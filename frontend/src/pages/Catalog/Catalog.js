import React, { useState, useEffect, useMemo } from "react";
import { Container, Paper, Box, CircularProgress } from "@mui/material";

import CatalogHeader from "../../components/catalog/CatalogHeader";
import CatalogToolbar from "../../components/catalog/CatalogToolbar";
import ProductsTable from "../../components/catalog/ProductsTable";
import ProductModal from "../../components/ProductModal";

import {
	getProducts,
	deleteProduct,
	searchProducts,
	createProduct
} from "../../firebase/services/products.service";

const CatalogPage = () => {
	const [search, setSearch] = useState("");
	const [openModal, setOpenModal] = useState(false);
	const [editingProduct, setEditingProduct] = useState(null);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchProducts = async () => {
		try {
			setLoading(true);
			const data = await getProducts();
			setProducts(data);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const delayDebounce = setTimeout(async () => {
			if (!search.trim()) {
				fetchProducts(); // carga inicial
				return;
			}

			try {
				setLoading(true);
				const results = await searchProducts(search);
				setProducts(results);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		}, 400); // 🔥 debounce 400ms

		return () => clearTimeout(delayDebounce);
	}, [search]);

	const filteredProducts = useMemo(() => {
		const term = (search || "").toLowerCase();

		return products.filter((product) => {
			const name = (product?.name || "").toLowerCase();
			const brand = (product?.brand || "").toLowerCase();
			const barcode = (product?.barcode || "").toString();

			return (
				name.includes(term) ||
				brand.includes(term) ||
				barcode.includes(term)
			);
		});
	}, [search, products]);

	const handleDelete = async (id) => {
		await deleteProduct(id);
		fetchProducts();
	};

	const handleSave = async (args) => {
		await createProduct(args);
		fetchProducts()
	}

	return (
		<Container sx={{ mt: 5 }}>
			<CatalogHeader />

			<CatalogToolbar
				search={search}
				setSearch={setSearch}
				onAdd={() => {
					setEditingProduct(null);
					setOpenModal(true);
				}}
			/>

			<Paper sx={{ height: 600, p: 2 }}>
				{loading ? (
					<Box display="flex" justifyContent="center" alignItems="center" height="100%">
						<CircularProgress />
					</Box>
				) : (
					<ProductsTable
						products={filteredProducts}
						onEdit={(product) => {
							setEditingProduct(product);
							setOpenModal(true);
						}}
						onDelete={handleDelete}
					/>
				)}
			</Paper>

			<ProductModal
				open={openModal}
				onClose={() => setOpenModal(false)}
				onSuccess={fetchProducts}
				onSave={handleSave}
				initialData={editingProduct}
			/>
		</Container>
	);
};

export default CatalogPage;