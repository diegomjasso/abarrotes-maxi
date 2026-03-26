import React from "react";
import {
	useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "../Components.scss";
import TableMobile from "./TableMobile";
import TableWeb from "./TableWeb";

const ProductsTable = ({
	products,
	onEdit,
	onDelete,
	rowCount,
	paginationModel,
	onPaginationModelChange,
	loading
}) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	/* ========================= */
	/* MOBILE VERSION (Cards) */
	/* ========================= */
	if (isMobile) {
		return (
			<TableMobile products={products}
				onEdit={onEdit}
				onDelete={onDelete}
				rowCount={rowCount}
				paginationModel={paginationModel}
				onPaginationModelChange={onPaginationModelChange}
			/>
		);
	}

	/* ========================= */
	/* DESKTOP VERSION (DataGrid) */
	/* ========================= */
	return (
		<TableWeb
			products={products}
			onEdit={onEdit}
			onDelete={onDelete}
			rowCount={rowCount}
			paginationModel={paginationModel}
			onPaginationModelChange={onPaginationModelChange}
			loading={loading}
		/>
	);
};

export default ProductsTable;