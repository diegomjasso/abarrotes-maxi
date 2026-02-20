import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";

const ProductModal = ({ open, onClose, onSave, initialData }) => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setProduct(initialData);
    } else {
      setProduct({ name: "", category: "", price: "", stock: "" });
    }
  }, [initialData, open]);

  const validate = () => {
    const newErrors = {};
    if (!product.name.trim()) newErrors.name = "Nombre obligatorio";
    if (!product.category.trim()) newErrors.category = "Categoría obligatoria";
    if (!product.price) newErrors.price = "Precio obligatorio";
    if (!product.stock) newErrors.stock = "Stock obligatorio";
    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave({
      ...product,
      price: parseFloat(product.price),
      stock: parseInt(product.stock),
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {initialData ? "Editar Producto" : "Agregar Producto"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Nombre"
            value={product.name}
            onChange={(e) =>
              setProduct({ ...product, name: e.target.value })
            }
            error={!!errors.name}
            helperText={errors.name}
          />

          <TextField
            label="Categoría"
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
            error={!!errors.category}
            helperText={errors.category}
          />

          <TextField
            label="Precio"
            type="number"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
            error={!!errors.price}
            helperText={errors.price}
          />

          <TextField
            label="Stock"
            type="number"
            value={product.stock}
            onChange={(e) =>
              setProduct({ ...product, stock: e.target.value })
            }
            error={!!errors.stock}
            helperText={errors.stock}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal;
