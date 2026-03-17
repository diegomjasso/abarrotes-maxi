import { useState } from "react";
import { FiX, FiMenu } from 'react-icons/fi';

import "../../pages/Landing/Landing.scss";


export default function HeaderLanding() {
	const [open, setOpen] = useState(false);

	return (
		<header className="navbar">
			<div className="navbar-first-section">
				<div className="logo">
					<img src="/assets/img/logo-no-background.png" alt="Abarrotes Maxi" />
					<span>Abarrotes Maxi</span>
				</div>

				{/* BURGER ICON */}
				<button
					className="burger"
					onClick={() => setOpen(!open)}
				>
					{open ? <FiX /> : <FiMenu />}
				</button>
			</div>

			<nav className={open ? "navOpen" : ""}>
				<a href="#menu">Menú</a>
				<a href="#ubicacion">Ubicación</a>
				<a href="/login">POS</a>
			</nav>
		</header>
	)
}