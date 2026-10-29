import { A11y, Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { heroSlides } from "./HomeSliderData"


const HomeSlider = () => {
    return (
        <section className="hero rounded-3xl overflow-hidden" aria-label="Featured offers" >
            <Swiper
                modules={[Autoplay, Navigation, Pagination, EffectFade, A11y]}
                effect="fade"
                loop
                speed={700}
                autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                navigation={false}
                pagination={{ clickable: true }}
            >
                {heroSlides.map((s) => (
                    <SwiperSlide key={s.id}>
                        <div className="hero__slide" style={{ backgroundImage: `url(${s.image})` }}>
                            <div className="hero__content">
                                <h1>{s.title}</h1>
                                <p>{s.text}</p>
                                <a className="hero__cta" href={s.link}>{s.cta}</a>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section >
    )
}
export default HomeSlider