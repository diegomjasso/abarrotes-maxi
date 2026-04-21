import React, { useState } from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Box,
	Chip,
	IconButton,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/features/auth/authSlice";

import "./Components.scss";

const Navbar = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user } = useSelector((state) => state.auth);

	const [openDrawer, setOpenDrawer] = useState(false);

	const handleLogout = () => {
		dispatch(logout());
		navigate("/");
	};

	const handleNavigate = (path) => {
		navigate(path);
		setOpenDrawer(false);
	};

	return (
		<>
			<AppBar position="static">
				<Toolbar className="navbar">

					{/* 🍔 HAMBURGER (MOBILE) */}
					<IconButton
						className="menu-button"
						color="inherit"
						onClick={() => setOpenDrawer(true)}
					>
						<MenuIcon />
					</IconButton>

					{/* 🏪 TÍTULO */}
					<Typography
						variant="h6"
						className="title"
						onClick={() => navigate("/")}
					>
						Abarrotes Maxi
					</Typography>

					{/* 🧭 NAV DESKTOP */}
					<Box className="nav-links">

						<Button color="inherit" onClick={() => navigate("/dashboard")}>
							Inicio
						</Button>

						<Button color="inherit" onClick={() => navigate("/punto-de-venta")}>
							POS
						</Button>

						<Button color="inherit" onClick={() => navigate("/catalogo")}>
							Catálogo
						</Button>

					</Box>

					{/* 👤 USER */}
					{user && (
						<Box className="user-box">
							<Typography>
								{user.name}
							</Typography>

							{user.isSuperAdmin && (
								<Chip label="Admin" size="small" />
							)}
						</Box>
					)}

					{/* 🚪 LOGOUT */}
					<Button
						className="logout-btn"
						color="inherit"
						startIcon={<LogoutIcon />}
						onClick={handleLogout}
					>
						Salir
					</Button>

				</Toolbar>
			</AppBar>

			{/* 📱 DRAWER MOBILE */}
			<Drawer
				anchor="left"
				open={openDrawer}
				onClose={() => setOpenDrawer(false)}
			>
				<Box className="drawer">

					<List>

						<ListItem disablePadding>
							<ListItemButton onClick={() => handleNavigate("/dashboard")}>
								<ListItemText primary="Inicio" />
							</ListItemButton>
						</ListItem>

						<ListItem disablePadding>
							<ListItemButton onClick={() => handleNavigate("/punto-de-venta")}>
								<ListItemText primary="Punto de Venta" />
							</ListItemButton>
						</ListItem>

						<ListItem disablePadding>
							<ListItemButton onClick={() => handleNavigate("/catalogo")}>
								<ListItemText primary="Catálogo" />
							</ListItemButton>
						</ListItem>

						<ListItem disablePadding>
							<ListItemButton onClick={handleLogout}>
								<ListItemText primary="Cerrar sesión" />
							</ListItemButton>
						</ListItem>

					</List>

				</Box>
			</Drawer>
		</>
	);
};

export default Navbar;