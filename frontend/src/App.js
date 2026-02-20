import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoutes";


import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Catalog from "./pages/Catalog/Catalog";
import PointOfSales from "./pages/PointOfSales/PointOfSales";
//import Inventory from "./pages/Inventory";
//import Domicilios from "./pages/Domicilios";

import "./App.scss"; // 👉 Archivo SASS principal
import MainLayout from "./layouts/MainLayouts";


const App = () => {
	return (
		<Routes>
			{/* Ruta pública */}
			<Route path="/login" element={<Login />} />

			{/* Rutas privadas con Layout */}
			<Route
				element={
					<PrivateRoute>
						<MainLayout />
					</PrivateRoute>
				}
			>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/catalogo" element={<Catalog />} />
				<Route path="/punto-de-venta" element={<PointOfSales />} />
			</Route>
		</Routes>
	);
}


export default App;