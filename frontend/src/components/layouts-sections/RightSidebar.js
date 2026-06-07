// RightSidebar.jsx

import React, { useState } from "react";

import "./RightSidebar.scss";
import POSCar from "../point-of-sales/POSCar";
import OverviewSidebar from "./sub-components/Overview";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

const RightSidebar = () => {
	const sectionsContent = [
		{
			id: "welcome",
			title: "Bienvenido al Punto de Venta",
			content: "Selecciona un producto para agregarlo al carrito."
		},
		{
			id: "cart",
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
		}
	];

	const [activeSection, setActiveSection] = useState("cart");
	const finalTotal = useSelector((state) => state.sales.finalTotal);
	const cartItems = useSelector((state) => state.sales.carItemsSelcted);

	return (
		<div className="right-sidebar">
			{/* HEADER */}
			<div className="right-sidebar-header">
			</div>

			{/* CONTENT */}
			<div className="right-sidebar-content">
				{activeSection === "welcome" && <OverviewSidebar />}
				{activeSection === "cart" && <POSCar />}
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
			<div className="right-sidebar-footer">
				<nav>
					{activeSection === "cart" && cartItems.length > 0 && (
						<>
							<button onClick={() => setActiveSection("welcome")} className="btn btn-success do-pay">
								<span className="info-do-pay"><ShoppingCart size={22} className="icon-shopping-cart" /> Cobrar</span> <span className="total total-amount"> ${finalTotal.toFixed(2)}</span>
							</button>
						</>
					)}
				</nav>
			</div>
		</div>
	);
};

export default RightSidebar;
