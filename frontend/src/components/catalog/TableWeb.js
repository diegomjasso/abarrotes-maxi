import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "../Components.scss";
import { IconButton } from "@mui/material";

const TableWeb = ({
    products,
    onEdit,
    onDelete,
    rowCount,
    paginationModel,
    onPaginationModelChange,
    loading
}) => {
    /* ========================= */
    /* DESKTOP VERSION (DataGrid) */
    /* ========================= */
    const columns = [
        { field: "name", headerName: "Producto", flex: 1, minWidth: 300 },
        { field: "brand", headerName: "Marca", flex: 1 },
        { field: "price", headerName: "Precio", flex: 1 },
        {
            field: "salePrice",
            headerName: "Precio de venta",
            flex: 1,
            cellClassName: "sale-price-cell",
        },
        { field: "stock", headerName: "Stock", flex: 1 },
        { field: "barcode", headerName: "Código", flex: 1 },
        {
            field: "actions",
            headerName: "Acciones",
            sortable: false,
            filterable: false,
            flex: 1,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => onEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onDelete(params.row.id)}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <DataGrid
            rows={products}
            columns={columns}
            autoHeight

            paginationMode="server"
            rowCount={rowCount}
            loading={loading}

            paginationModel={paginationModel}
            onPaginationModelChange={onPaginationModelChange}

            pageSizeOptions={[5, 10, 20, 50]}

            sx={{
                "& .sale-price-cell": {
                    backgroundColor: "#fff3cd",
                    fontWeight: "bold",
                },
            }}
        />
    );
};

export default TableWeb;