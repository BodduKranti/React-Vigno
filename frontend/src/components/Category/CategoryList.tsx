import { Swiper, SwiperSlide } from 'swiper/react'
import CategoryListData from './CagetoryData'
import { A11y, Navigation } from 'swiper/modules'
import CategoryItems from './CategoryItems'

const CategoryList = () => {

    const { categoryList } = CategoryListData()
    return (
        <section className="cats max-w-[1600px] mx-auto" aria-label="Browse by food type" >
            <h2>What are you craving?</h2>
            <Swiper
                modules={[Navigation, A11y]}
                navigation={false}
                spaceBetween={20}
                slidesPerView={3}
                breakpoints={{
                    480: { slidesPerView: 3.5 },
                    768: { slidesPerView: 5 },
                    1100: { slidesPerView: 9 },
                }}
            >
                {categoryList.map((c) => (
                    <SwiperSlide key={c.id}>
                        <CategoryItems {...c} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section >
    )
}

export default CategoryList