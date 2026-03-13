// src/pages/Dashboard.js

import React from "react";
import { Container, Grid, Paper, Typography, Button } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from '@mui/icons-material/Inventory';
import { useNavigate } from "react-router-dom";

import "./Dashboard.scss";

const Dashboard = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Catálogo", icon: <StoreIcon fontSize="large" />, path: "/catalogo" },
    { label: "Punto de Venta", icon: <PointOfSaleIcon fontSize="large" />, path: "/punto-de-venta" },
    { label: "Ventas", icon: <AssessmentIcon fontSize="large" /> },
    { label: "Pedidos a domicilio", icon: <LocalShippingIcon fontSize="large" /> },
    { label: "Inventario", icon: <InventoryIcon fontSize="large" /> }
  ];

  return (
    <>
      <Container sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Panel Principal
        </Typography>

        <Grid container spacing={4} className="grid-buttons">
          {menuItems.map((item, index) => (

            <Grid item xs={12} sm={4} md={3} xl={6} lg={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                  },
                }}
              >
                {item.icon}

                <Typography variant="h6" sx={{ my: 2 }}>
                  {item.label}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate(item.path)}
                >
                  Entrar
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
