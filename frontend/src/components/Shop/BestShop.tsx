import { Swiper, SwiperSlide } from "swiper/react"
import useCity from "../../hooks/useCity"
import { A11y, Navigation } from "swiper/modules"
import { useGetApi } from "../../hooks/useAxiosServices"
import { ROUTES } from "../../type"
import LoaderSpin from "../LoaderSpin"
import { OverlayShopCard } from "./BestShopItems"
import NoitemShopfound from "../NoitemShopfound"
import { BsShop } from "react-icons/bs"




const BestShop = () => {
    const { city } = useCity()

    const { data, isLoading } = useGetApi(`${ROUTES.GET_SHOPS_BY_CITY}/${city}`, undefined, !!city);
    const shopList = Array.isArray(data) && data || []
    console.log('data', data)
    return (
        <section className="cats max-w-[1600px] mx-auto" aria-label="Browse by food type" >
            {/* Heading */}
            <div className="mb-5">
                <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">Restaurants near you</h1>
                <p className="mt-1 text-sm text-gray-500">
                    {shopList?.length} {shopList.length === 1 ? "place" : "places"} delivering in {city}
                </p>
            </div>
            {
                isLoading ?
                    <div className="w-full flex justify-center h-62.5 items-center"><LoaderSpin /></div>
                    :
                    shopList.length > 0 ? <Swiper
                        modules={[Navigation, A11y]}
                        navigation={false}
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            480: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1100: { slidesPerView: 4 },
                        }}
                    >
                        {shopList?.map((c) => (
                            <SwiperSlide key={c.id}>
                                <OverlayShopCard items={c} />
                            </SwiperSlide>
                        ))}
                    </Swiper> :
                        <NoitemShopfound
                            icon={<BsShop size={36} strokeWidth={1.5} className="text-orange-500" />}
                            message1='No Shops yet'
                            message2=""
                        />
            }

        </section>
    )
}

export default BestShop