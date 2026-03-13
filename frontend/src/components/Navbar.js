import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Chip
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/features/auth/authSlice";

import "./Components.scss";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔥 Obtener usuario desde Redux
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>

        {/* Título */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Abarrotes Maxi - Punto de Venta
        </Typography>

        {/* Usuario */}
        {user && (
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            mr={2}
          >
            <Typography variant="body1">
              {user.name} {user.lastname}
            </Typography>

            {user.isSuperAdmin && (
              <Chip
                label="SuperAdmin"
                color="secondary"
                size="small"
              />
            )}
          </Box>
        )}

        {/* Logout */}
        <Button
          color="inherit"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Cerrar Sesión
        </Button>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;