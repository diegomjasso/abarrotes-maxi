import React from "react";
import {
  DataGrid
} from "@mui/x-data-grid";
import {
  IconButton,
  Chip,
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductsTable = ({ products, onEdit, onDelete }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  /* ========================= */
  /* MOBILE VERSION (Cards) */
  /* ========================= */
  if (isMobile) {
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
                Precio: ${product.price || 0}
              </Typography>

              <Typography variant="body2">
                Precio de venta: ${product.priceSale || 0}
              </Typography>

              <Typography variant="body2">
                Stock:{" "}
                <Chip
                  label={product.stock}
                  size="small"
                  color={
                    product.stock <= 10
                      ? "error"
                      : "success"
                  }
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
      </Box>
    );
  }

  /* ========================= */
  /* DESKTOP VERSION (DataGrid) */
  /* ========================= */
  const columns = [
    { field: "name", headerName: "Producto", flex: 1 },
    { field: "brand", headerName: "Marca", flex: 1 },
    { field: "price", headerName: "Precio", flex: 1 },
    { field: "priceSale", headerName: "Precio de venta", flex: 1 },
    { field: "stock", headerName: "Stock", flex: 1 },
    { field: "barcode", headerName: "Código", flex: 1 },
    {
      field: "actions",
      headerName: "Acciones",
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
      pageSize={10}
    />
  );
};

export default ProductsTable;