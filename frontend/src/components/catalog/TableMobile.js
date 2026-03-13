import {
	IconButton,
	Chip,
	Box,
	Card,
	CardContent,
	Typography,
	Button
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "../Components.scss";

const TableMobile = ({
	products,
	onEdit,
	onDelete,
	rowCount,
	paginationModel,
	onPaginationModelChange,
}) => {
	/* ========================= */
	/* MOBILE VERSION (Cards) */
	/* ========================= */
	return (
		<Box display="flex" flexDirection="column" gap={2}>

			{products.map((product) => (
				<Card key={product.id}>
					<CardContent>
						<Typography variant="h6">
							{product.name}
						</Typography>

						<Typography variant="body2">
							Marca: {product.brand || "—"}
						</Typography>

						<Typography variant="body2">
							Precio: $ {product.price || 0}
						</Typography>

						<Typography
							variant="body2"
							className="sale-price-cell"
						>
							Precio de venta: $ {product.salePrice || 0}
						</Typography>

						<Typography variant="body2">
							Stock:
							<Chip
								label={product.stock || ""}
								size="small"
								color={
									product.stock && product.stock <= 10
										? "error"
										: "success"
								}
								sx={{ ml: 1 }}
							/>
						</Typography>

						<Typography variant="body2">
							Código: {product.barcode || "—"}
						</Typography>

						<Box mt={1}>
							<IconButton
								onClick={() => onEdit(product)}
							>
								<EditIcon />
							</IconButton>

							<IconButton
								onClick={() =>
									onDelete(product.id)
								}
							>
								<DeleteIcon color="error" />
							</IconButton>
						</Box>
					</CardContent>
				</Card>
			))}

			{/* 🔥 PAGINACIÓN MOBILE */}
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				mt={2}
			>

				<Button
					variant="outlined"
					disabled={paginationModel.page === 0}
					onClick={() =>
						onPaginationModelChange({
							...paginationModel,
							page: paginationModel.page - 1
						})
					}
				>
					Anterior
				</Button>

				<Typography variant="body2">
					Página {paginationModel.page + 1}
				</Typography>

				<Button
					variant="outlined"
					disabled={
						(paginationModel.page + 1) *
						paginationModel.pageSize >=
						rowCount
					}
					onClick={() =>
						onPaginationModelChange({
							...paginationModel,
							page: paginationModel.page + 1
						})
					}
				>
					Siguiente
				</Button>

			</Box>
		</Box>

	);
};

export default TableMobile;