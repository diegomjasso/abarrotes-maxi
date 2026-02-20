import React, { useState, useMemo, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Paper,
  Box,
  Button,
  IconButton,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductModal from "../../components/ProductModal";
import "./Catalog.scss";

const Catalog = () => {
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [products, setProducts] = useState([]);

  // 🔥 Persistencia localStorage
  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts([
        { id: 1, name: "Arroz 1kg", category: "Granos", price: 25, stock: 5 },
        { id: 2, name: "Frijol 1kg", category: "Granos", price: 32, stock: 40 },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);

  const handleSaveProduct = (product) => {
    if (editingProduct) {
      setProducts(
        products.map((p) => (p.id === editingProduct.id ? { ...product, id: p.id } : p))
      );
      setEditingProduct(null);
    } else {
      const newProduct = { ...product, id: Date.now() };
      setProducts([...products, newProduct]);
    }
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const columns = [
    { field: "name", headerName: "Producto", flex: 1 },
    { field: "category", headerName: "Categoría", flex: 1 },
    { field: "price", headerName: "Precio ($)", width: 130 },
    {
      field: "stock",
      headerName: "Stock",
      width: 130,
      renderCell: (params) =>
        params.row.stock <= 10 ? (
          <Chip label={params.row.stock} color="error" />
        ) : (
          <Chip label={params.row.stock} color="success" />
        ),
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              setEditingProduct(params.row);
              setOpenModal(true);
            }}
          >
            <EditIcon />
          </IconButton>

          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon color="error" />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Catálogo de Productos
      </Typography>

      <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
        <TextField
          label="Buscar"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditingProduct(null);
            setOpenModal(true);
          }}
        >
          Agregar
        </Button>
      </Box>

      <Paper sx={{ height: 500, p: 2 }}>
        <DataGrid rows={filteredProducts} columns={columns} />
      </Paper>

      <ProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSaveProduct}
        initialData={editingProduct}
      />
    </Container>
  );
};

export default Catalog;
