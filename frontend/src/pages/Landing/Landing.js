import "./Landing.scss"
import { FaWhatsapp } from "react-icons/fa"
import HeaderLanding from "../../components/landing/Header"
import FooterLanding from "../../components/landing/Footer"
import SlidesLanding from "../../components/landing/Slides"

export default function Landing() {

	const phone = "524495869527"

	return (
		<div className="landing">
			<HeaderLanding />

			<section className="hero">
				<div className="heroContent">
					<img src="/assets/img/logo-no-background.png" alt="Abarrotes Maxi"/>
					<h2>Menudos y Birria Yoya</h2>
					<a className="cta" href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer">
						<FaWhatsapp /> Pedir por WhatsApp
					</a>
				</div>
			</section>

			<SlidesLanding />

			<section id="menu" className="products">
				<div className="product">
					<img src="/assets/img/menudo.jpg" alt="Menudo Tradicional" />
					<h3>Menudo Tradicional</h3>
				</div>
				<div className="product">
					<img src="/assets/img/birria.png" alt="Birria Estilo Jalisco" />
					<h3>Birria Estilo Norteño</h3>
				</div>
			</section>

			<section className="orders">
				<h2>Pedidos</h2>
				<a href={`https://wa.me/${phone}`} className="whatsapp">
					<FaWhatsapp /> 449 586 9527
				</a>
			</section>

			<section id="ubicacion" className="location">
				<h2>Ubicación</h2>
				<p>Machu Picchu #311 Int #23</p>
				<p>Balcones de Oriente</p>
				<p>Esq. Av. Próceres de la Enseñanza #208</p>
			</section>

			<FooterLanding />
		</div>
	)
}