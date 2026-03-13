import React, { useState } from "react";
import { Paper, Typography, TextField, Button, Stack } from "@mui/material";
import "./Components.scss"

const ProductForm = ({ addProduct }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");


    const handleSubmit = () => {
        if (!name || !price) return;
        addProduct({ name, price: parseFloat(price) });
        setName("");
        setPrice("");
    };

    return (
        <Paper sx={{ padding: 3 }} elevation={2}>
            <Stack spacing={2}>
                <Typography variant="h6">Agregar Producto</Typography>

                <TextField
                    label="Nombre del producto"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                />

                <TextField
                    label="Precio"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    fullWidth
                />

                <Button variant="contained" onClick={handleSubmit} fullWidth>
                    Guardar Producto
                </Button>
            </Stack>
        </Paper>
    );
}


export default ProductForm;