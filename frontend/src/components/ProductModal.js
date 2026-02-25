import React, { useState, useEffect, useMemo, useRef } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	Stack,
	IconButton,
	FormControlLabel,
	Switch,
	Typography,
	Box,
	Chip,
	Tooltip
} from "@mui/material";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import BarcodeScanner from "./shared/BarcodeScanner";
import BluetoothSearchingIcon from "@mui/icons-material/BluetoothSearching";

import { findByBarcode } from "../firebase/services/products.service";

import { useSelector } from "react-redux";


const ProductModal = ({
	open,
	onClose,
	onSave,
	initialData
}) => {
	const barcodeInputRef = useRef(null);
	const activateScannerMode = () => {
		barcodeInputRef.current?.focus();
	};
	const [product, setProduct] = useState({
		name: "",
		brand: "",
		price: "",
		salePrice: "",
		stock: "",
		barcode: "",
		barcodes: "",
		isActive: true
	});

	const [openScanner, setOpenScanner] = useState(false);
	const [barcodeExists, setBarcodeExists] = useState(false);

	const { user } = useSelector((state) => state.auth);

	/* ========================= */
	/* CARGA INICIAL */
	/* ========================= */
	useEffect(() => {
		if (initialData) {
			setProduct({
				...initialData,
				price: initialData.price ?? "",
				salePrice: initialData.salePrice ?? "",
				stock: initialData.stock ?? "",
				barcodes:
					initialData?.barcodes?.join(", ") || "",
			});
		} else {
			setProduct({
				name: "",
				brand: "",
				price: "",
				salePrice: "",
				stock: "",
				barcode: "",
				barcodes: "",
				isActive: true
			});
		}
	}, [initialData, open]);

	/* ========================= */
	/* MARGEN AUTOMÁTICO */
	/* ========================= */
	const margin = useMemo(() => {
		const sale = parseFloat(product.price || 0);
		const salePrice = parseFloat(product.salePrice || 0)
		return salePrice - sale;
	}, [product.price, product.salePrice]);

	/* ========================= */
	/* VALIDAR BARCODE DUPLICADO */
	/* ========================= */
	useEffect(() => {
		const checkBarcode = async () => {
			if (!product.barcode) return;

			const existing = await findByBarcode(
				product.barcode
			);

			if (
				existing &&
				existing.id !== initialData?.id
			) {
				setBarcodeExists(true);
			} else {
				setBarcodeExists(false);
			}
		};

		const timeout = setTimeout(checkBarcode, 400);
		return () => clearTimeout(timeout);
	}, [product.barcode, initialData]);

	/* ========================= */
	/* VALIDACIÓN GLOBAL */
	/* ========================= */
	const isFormValid = useMemo(() => {
		return (
			product.name.trim() &&
			product.brand.trim() &&
			product.price &&
			product.stock &&
			product.barcode.trim() &&
			!barcodeExists
		);
	}, [product, barcodeExists]);

	/* ========================= */
	/* SUBMIT */
	/* ========================= */
	const handleSubmit = (e) => {
		e.preventDefault();

		if (!isFormValid) return;

		onSave({
			...product,
			price: parseFloat(product.price),
			salePrice: parseFloat(product.salePrice || 0),
			stock: parseInt(product.stock),
			barcodes: product.barcodes
				? product.barcodes
					.split(",")
					.map((b) => b.trim())
				: [],
			registredBy: {
				id: user.id,
				name: user.name,
				lastname: user.lastname,
			},
		});

		onClose();
	};

	return (
		<>
			{/* ========================= */}
			{/* MODAL PRINCIPAL */}
			{/* ========================= */}
			<Dialog open={open} onClose={onClose} fullWidth>
				<DialogTitle>
					{initialData
						? "Editar Producto"
						: "Agregar Producto"}
				</DialogTitle>

				<form onSubmit={handleSubmit}>
					<DialogContent>
						<Stack spacing={2} sx={{ mt: 1 }}>

							<TextField
								label="Nombre"
								required
								value={product.name}
								onChange={(e) =>
									setProduct({
										...product,
										name: e.target.value
									})
								}
							/>

							<TextField
								label="Marca"
								required
								value={product.brand}
								onChange={(e) =>
									setProduct({
										...product,
										brand: e.target.value
									})
								}
							/>

							<TextField
								label="Precio"
								type="number"
								required
								inputProps={{ min: 0, step: "0.01" }}
								value={product.price}
								onChange={(e) =>
									setProduct({
										...product,
										price: e.target.value
									})
								}
							/>

							<TextField
								label="Precio de Venta"
								type="number"
								inputProps={{ min: 0, step: "0.01" }}
								value={product.salePrice}
								onChange={(e) =>
									setProduct({
										...product,
										salePrice: e.target.value
									})
								}
							/>

							{/* MARGEN */}
							<Box>
								<Typography variant="body2">
									Margen:
								</Typography>
								<Chip
									label={`$${margin.toFixed(2)}`}
									color={
										margin > 0
											? "success"
											: "error"
									}
								/>
							</Box>

							<TextField
								label="Stock"
								type="number"
								required
								inputProps={{ min: 0 }}
								value={product.stock}
								onChange={(e) =>
									setProduct({
										...product,
										stock: e.target.value
									})
								}
							/>

							<TextField
								label="Código de Barras Principal"
								required
								value={product.barcode}
								inputRef={barcodeInputRef}
								onChange={(e) =>
									setProduct({
										...product,
										barcode: e.target.value
									})
								}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										// Aquí puedes validar automáticamente
										console.log("Código capturado:", product.barcode);
									}
								}}
								InputProps={{
									endAdornment: (
										<>
											{/* 📷 Cámara */}
											<Tooltip title="Escanear con cámara">
												<IconButton onClick={() => setOpenScanner(true)}>
													<CameraAltIcon />
												</IconButton>
											</Tooltip>

											{/* 📡 Lector Bluetooth */}
											<Tooltip title="Usar lector Bluetooth">
												<IconButton onClick={activateScannerMode}>
													<BluetoothSearchingIcon />
												</IconButton>
											</Tooltip>
										</>
									),
								}}
							/>

							<TextField
								label="Códigos Secundarios"
								value={product.barcodes}
								onChange={(e) =>
									setProduct({
										...product,
										barcodes: e.target.value
									})
								}
							/>

							<FormControlLabel
								control={
									<Switch
										checked={product.isActive}
										onChange={(e) =>
											setProduct({
												...product,
												isActive:
													e.target.checked
											})
										}
									/>
								}
								label="Producto Activo"
							/>

						</Stack>
					</DialogContent>

					<DialogActions>
						<Button onClick={onClose}>
							Cancelar
						</Button>
						<Button
							variant="contained"
							type="submit"
							disabled={!isFormValid}
						>
							Guardar
						</Button>
					</DialogActions>
				</form>
			</Dialog>

			{/* ========================= */}
			{/* SCANNER */}
			{/* ========================= */}
			<Dialog
				open={openScanner}
				onClose={() =>
					setOpenScanner(false)
				}
				fullWidth
			>
				<DialogTitle>
					Escanear Código
				</DialogTitle>

				<DialogContent>
					<BarcodeScanner
						onDetected={(code) => {
							setProduct({
								...product,
								barcode: code
							});
							setOpenScanner(false);
						}}
					/>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ProductModal;