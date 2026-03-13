import React from "react";
import { Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./Components.scss"

const ProductTable = ({ products }) => {
    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "name", headerName: "Producto", flex: 1 },
        { field: "price", headerName: "Precio ($)", width: 150 },
    ];

    return (
        <Paper sx={{ height: 400, padding: 2 }} elevation={2} className="paper-precios">
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Catálogo de Precios
            </Typography>
            <DataGrid rows={products} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
        </Paper>
    );
}


export default ProductTable;