import React from "react";

import { Outlet } from "react-router-dom";

import Navbar from "../components/layouts-sections/Navbar";

import Sidebar from "../components/layouts-sections/Sidebar";

import RightSidebar from "../components/layouts-sections/RightSidebar";

import "./MainLayouts.scss";

const MainLayout = () => {
	return (
		<div className="layout">
			{/* NAVBAR */}

			<header className="layout-navbar" paper-shadow={0}>
				<Navbar />
			</header>

			{/* BODY */}

			<div className="layout-body">
				{/* LEFT SIDEBAR */}
				<aside className="layout-sidebar-left">
					<Sidebar />
				</aside>

				{/* MAIN CONTENT */}
				<main className="layout-content">
					<Outlet />
				</main>

				{/* RIGHT SIDEBAR */}
				<aside className="layout-sidebar-right">
					<RightSidebar />
				</aside>
			</div>
		</div>
	);
};

export default MainLayout;
