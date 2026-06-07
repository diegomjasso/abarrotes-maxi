import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "./TableWeb.scss";
import { IconButton, Chip } from "@mui/material";

const TableWeb = ({
	products,
	onEdit,
	onDelete,
	rowCount,
	paginationModel,
	onPaginationModelChange,
	loading,
}) => {
	/* ========================= */
	/* DESKTOP VERSION (DataGrid) */
	/* ========================= */
	
	const columns = [
		{
			field: "name",
			headerName: "Producto",
			flex: 2,
			renderCell: ({ row }) => (
				<div className="product-cell">
					<div className="product-details">
						<div className="product-title">{row.name}</div>

						<div className="product-subtitle">
							{row.brand || "Sin marca"}
						</div>
					</div>
				</div>
			),
		},

		{
			field: "price",
			headerName: "Costo",
			flex: 1,
			renderCell: ({ value }) => (
				<span className="cost-price">${Number(value).toFixed(2)}</span>
			),
		},

		{
			field: "salePrice",
			headerName: "Venta",
			flex: 1,
			renderCell: ({ value }) => (
				<span className="sale-price">${Number(value).toFixed(2)}</span>
			),
		},

		{
			field: "stock",
			headerName: "Stock",
			flex: 1,
			renderCell: ({ value }) => {
				let color = "success";

				if (value <= 0) {
					color = "error";
				} else if (value <= 5) {
					color = "warning";
				}

				return <Chip label={value} color={color} size="small" />;
			},
		},

		{
			field: "barcode",
			headerName: "Código",
			flex: 1.2,
            renderCell: ({ row }) => (
                <span className="barcode-cell">
                    {row.barcode || "--"}
                </span>
            ),
		},

		{
			field: "actions",
			headerName: "Acciones",
			sortable: false,
			renderCell: (params) => (
                <div className="actions-cell" >
                    <IconButton className="actions-button edit-button" onClick={() => onEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton className="actions-button delete-button" onClick={() => onDelete(params.row.id)}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </div>
            ),
		},
	];

	return (
        <div className="catalog-grid-wrapper">
            <DataGrid
                rows={products}
                columns={columns}
                autoHeight

                paginationMode="server"
                rowCount={rowCount}
                loading={loading}

                paginationModel={paginationModel}
                onPaginationModelChange={onPaginationModelChange}

                pageSizeOptions={[10, 20, 50]}

                disableColumnMenu
                disableRowSelectionOnClick

                className="catalog-grid"
            />
        </div>
	);
};

export default TableWeb;
