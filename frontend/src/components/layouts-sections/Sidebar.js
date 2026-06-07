import React from "react";

import {
	LayoutDashboard,
	ShoppingCart,
	Package,
	BarChart3,
	Users,
	Settings,
	LogOut as LogoutIcon,
} from "lucide-react";

import "./Sidebar.scss";
import { useDispatch } from "react-redux";
import { logout } from "../../store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		navigate("/");
	};

	const menuItems = [
		{
			label: "Dashboard",
			icon: <LayoutDashboard size={20} />,
			action: () => navigate("/dashboard"),
		},
		{
			label: "POS",
			icon: <ShoppingCart size={20} />,
			action: () => navigate("/punto-de-venta"),
		},
		{
			label: "Catálogo",
			icon: <Package size={20} />,
			action: () => navigate("/catalogo")
		},
		{
			label: "Ventas",
			icon: <BarChart3 size={20} />,
		},
		{
			label: "Clientes",
			icon: <Users size={20} />,
		},
		{
			label: "Configuración",
			icon: <Settings size={20} />,
		}
	];

	const menuItemsBottom = [
		{
			label: "Cerrar sesión",
			icon: <LogoutIcon size={20} />,
			action: handleLogout,
		},
	];
	return (
		<div className="sidebar">
			{/* MENU */}

			<nav className="sidebar-menu-top">
				{menuItems.map((item) => (
					<button key={item.label} className="sidebar-menu-item" onClick={item.action}>
						<span className="sidebar-menu-icon">{item.icon}</span>

						<span>{item.label}</span>
					</button>
				))}
			</nav>
			<nav className="sidebar-menu-bottom">
				{menuItemsBottom.map((item) => (
					<button key={item.label} className="sidebar-menu-item" onClick={item.action}>
						<span className="sidebar-menu-icon">{item.icon}</span>

						<span>{item.label}</span>
					</button>
				))}
			</nav>
		</div>
	);
};

export default Sidebar;
