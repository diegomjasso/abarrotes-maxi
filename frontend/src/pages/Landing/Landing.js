import "./Landing.scss"
import { FaWhatsapp } from "react-icons/fa"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

export default function Landing() {

	const phone = "524495869527"

	return (
		<div className="landing">

			<header className="navbar">
				<div className="logo">Abarrotes Maxi</div>
				<nav>
					<a href="#menu">Menú</a>
					<a href="#ubicacion">Ubicación</a>
					<a href="/login">POS</a>
				</nav>
			</header>

			<section className="hero">
				<div className="heroContent">
					<h1>Abarrotes Maxi</h1>
					<h2>Menudos y Birria Yoya</h2>
					<a className="cta" href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer">
						<FaWhatsapp /> Pedir por WhatsApp
					</a>
				</div>
			</section>

			<section className="slider">
				<Swiper modules={[Autoplay, Pagination, EffectFade]} autoplay={{ delay: 4000 }} loop effect="fade" pagination={{ clickable: true }} className="swiper">
					<SwiperSlide>
						<div className="slide">
							<img src="/assets/img/family.png" alt="Familia" />
							<div className="slideText">
								<h2>Tradición Familiar</h2>
								<p>Disfruta de nuestros platillos caseros</p>
							</div>
						</div>
					</SwiperSlide>

					<SwiperSlide>
						<div className="slide">
							<img src="/assets/img/birria.png" alt="Birria" />
							<div className="slideText">
								<h2>Birria Estilo Norteño</h2>
								<p>Sabor auténtico y tradicional</p>
							</div>
						</div>
					</SwiperSlide>

					<SwiperSlide>
						<div className="slide">
							<img src="/assets/img/menudo.jpg" alt="Menudo" />
							<div className="slideText">
								<h2>Menudo Casero</h2>
								<p>Preparado con ingredientes frescos</p>
							</div>
						</div>
					</SwiperSlide>
				</Swiper>
			</section>

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

			<footer className="footer">
				Powered By Bonza Marketing Corporation
			</footer>

		</div>
	)
}