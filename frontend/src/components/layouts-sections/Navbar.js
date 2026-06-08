import React, { memo, useMemo, useState } from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	Box,
	Chip,
	IconButton,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Avatar,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/features/auth/authSlice";

import "./Navbar.scss";

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

	const userInitial = useMemo(() => {
		return user?.name?.[0]?.toUpperCase() || "?";
	}, [user?.name]);

	const colors = [
		"#3b82f6",
		"#8b5cf6",
		"#06b6d4",
		"#22c55e",
		"#f97316",
		"#ef4444",
		"#ec4899",
		"#14b8a6",
	];

	const randomColor = colors[Math.floor(Math.random() * colors.length)];

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


					{/* 👤 USER */}
					<Box className="user-box">
						<Avatar 
							sx={{
								bgcolor: randomColor,
							}}
							className="user-avatar"
						>
							{userInitial}
						</Avatar>

						<Box className="user-info">
							<Typography className="user-name">
								{user.name}
							</Typography>

							{user.isSuperAdmin && (
								<Chip
									label="Admin"
									size="small"
								/>
							)}
						</Box>
					</Box>
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

export default memo(Navbar);