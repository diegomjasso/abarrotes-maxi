import React, { useState } from "react";
import { Container, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";


function Dashboard({ setIsAuthenticated }) {
    const [products, setProducts] = useState([
        { id: 1, name: "Arroz 1kg", price: 25 },
        { id: 2, name: "Frijol 1kg", price: 32 },
        { id: 3, name: "Aceite 900ml", price: 45 },
    ]);


    const addProduct = (product) => {
        setProducts([...products, { ...product, id: products.length + 1 }]);
    };


    return (
        <>
            <Navbar setIsAuthenticated={setIsAuthenticated} />
            <Container sx={{ marginTop: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <ProductForm addProduct={addProduct} />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <ProductTable products={products} />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}


export default Dashboard;