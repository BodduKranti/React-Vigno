import { Swiper, SwiperSlide } from 'swiper/react'
// import FoodItemsList from './FoodItemsData'
import { A11y, Navigation } from 'swiper/modules'
import FoodItems from './FoodItems'
import useCity from '../../hooks/useCity'
import { ROUTES } from '../../type'
import { useGetApi } from '../../hooks/useAxiosServices'
import LoaderSpin from '../LoaderSpin'
import NoitemShopfound from '../NoitemShopfound'
import { UtensilsCrossed } from 'lucide-react'
const FoodItemsListsection = () => {
    // const { foodItemsListData } = FoodItemsList()
    const { city } = useCity()
    const { data, isLoading } = useGetApi(`${ROUTES.GET_ALL_SHOP_ITEM_BY_CITY}/${city}`, undefined, !!city)
    const foodItemsListData = Array.isArray(data) && data || []
    return (
        <section className="foods max-w-[1600px] mx-auto" aria-label="Popular near you">
            <h2>Popular near you</h2>
            {
                isLoading ?
                    <div className='w-full flex h-62.5 justify-center items-center'>
                        <LoaderSpin />
                    </div>
                    : foodItemsListData?.length < 0 ?
                        <NoitemShopfound
                            icon={<UtensilsCrossed size={36} strokeWidth={1.5} className="text-orange-500" />}
                            message1='No items yet'
                            message2=''
                        /> :
                        <Swiper
                            modules={[Navigation, A11y]}
                            navigation={false}
                            loop={true}
                            spaceBetween={16}
                            slidesPerView={2}
                            breakpoints={{
                                480: { slidesPerView: 3 },
                                768: { slidesPerView: 3 },
                                1100: { slidesPerView: 7 },
                            }}
                        >
                            {foodItemsListData.map((f) => (
                                <SwiperSlide key={f.id}>
                                    <FoodItems f={f} key={f.id + 1} />
                                </SwiperSlide>
                            ))}
                        </Swiper>

            }

        </section>
    )
}

export default FoodItemsListsection