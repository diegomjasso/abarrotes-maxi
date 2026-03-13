import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./PointOfSales.scss";

const IVA = 0.16;

const PointOfSales = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  // 🔥 Cargar productos desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const ivaAmount = subtotal * IVA;
  const total = subtotal + ivaAmount;

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const updatedProducts = products.map((product) => {
      const cartItem = cart.find((item) => item.id === product.id);
      if (cartItem) {
        return {
          ...product,
          stock: product.stock - cartItem.quantity,
        };
      }
      return product;
    });

    localStorage.setItem("products", JSON.stringify(updatedProducts));

    const storedSales = JSON.parse(localStorage.getItem("sales")) || [];
    const newSale = {
      id: Date.now(),
      items: cart,
      subtotal,
      iva: ivaAmount,
      total,
      date: new Date().toLocaleString(),
    };

    localStorage.setItem("sales", JSON.stringify([...storedSales, newSale]));

    setProducts(updatedProducts);
    setCart([]);

    alert("Venta realizada correctamente");
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Punto de Venta
      </Typography>

      <Grid container spacing={4}>
        {/* 🔎 Lista de productos */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 2 }}>
            <TextField
              label="Buscar producto"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ mb: 2 }}
            />

            <List>
              {filteredProducts.map((product) => (
                <ListItem
                  key={product.id}
                  secondaryAction={
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => addToCart(product)}
                      disabled={product.stock <= 0}
                    >
                      Agregar
                    </Button>
                  }
                >
                  <ListItemText
                    primary={product.name}
                    secondary={`$${product.price} | Stock: ${product.stock}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* 🛒 Carrito */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Carrito</Typography>
            <Divider sx={{ my: 2 }} />

            <List>
              {cart.map((item) => (
                <ListItem
                  key={item.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={`${item.name} x${item.quantity}`}
                    secondary={`$${item.price * item.quantity}`}
                  />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Box>
              <Typography>Subtotal: ${subtotal.toFixed(2)}</Typography>
              <Typography>IVA (16%): ${ivaAmount.toFixed(2)}</Typography>
              <Typography variant="h6">
                Total: ${total.toFixed(2)}
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleCheckout}
            >
              Finalizar Venta
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PointOfSales;
