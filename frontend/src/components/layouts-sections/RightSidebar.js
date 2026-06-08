// RightSidebar.jsx

import React from "react";

import "./RightSidebar.scss";
import POSCar from "../point-of-sales/POSCar";
import OverviewSidebar from "./sub-components/Overview";
import { useSelector } from "react-redux";

const RightSidebar = () => {
	const sectionsContent = [
		{
			id: "welcome",
			title: "Bienvenido al Punto de Venta",
			content: "Selecciona un producto para agregarlo al carrito."
		},
		{
			id: "car",
			title: "Carrito de compras",
			content: "Aquí se mostrarán los productos agregados al carrito.",
		},
		{
			id: "promotions",
			title: "Promociones",
			content: "Aquí se mostrarán las promociones disponibles."
		},
		{
			id: "suggestions",
			title: "Sugerencias",
			content: "Aquí se mostrarán sugerencias de productos relacionados."
		},
		{
			id: "hide",
		}
	];

	const activeSection = useSelector((state) => state.ui.rightSidebarContent);

	return (
		<div className="right-sidebar">
			{/* HEADER */}
			<div className="right-sidebar-header">
			</div>

			{/* CONTENT */}
			<div className="right-sidebar-content">
				{activeSection === "welcome" && <OverviewSidebar />}
				{activeSection === "car" && <POSCar />}
				{activeSection === "promotions" && (
					<div className="placeholder-content">
						<p>{sectionsContent.find((s) => s.id === activeSection)?.content}</p>
					</div>
				)}
				{activeSection === "suggestions" && (
					<div className="placeholder-content">
						<p>{sectionsContent.find((s) => s.id === activeSection)?.content}</p>
					</div>
				)}
			</div>

			{/* FOOTER */}
			<div className="right-sidebar-footer"></div>
		</div>
	);
};

export default RightSidebar;
