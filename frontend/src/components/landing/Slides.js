import '../../pages/Landing/Landing.scss';
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

export default function SlidesLanding() {
	return (
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
	)
}