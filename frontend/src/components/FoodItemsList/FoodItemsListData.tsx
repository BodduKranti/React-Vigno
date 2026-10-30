import { UtensilsCrossed } from "lucide-react"
import LoaderSpin from "../LoaderSpin"
import NoitemShopfound from "../NoitemShopfound"
import { Swiper, SwiperSlide } from "swiper/react"
import { A11y, Navigation } from "swiper/modules"
import FoodItems from "./FoodItems"

interface FoodItemsListprops {
    isLoading: boolean,
    foodItemsListData: any
}

const FoodItemsListData = ({ isLoading, foodItemsListData }: FoodItemsListprops) => {
    const foodItemsListDataList = Array.isArray(foodItemsListData) && foodItemsListData || []
    return (
        <>
            {
                isLoading ?
                    <div className='w-full flex h-62.5 justify-center items-center'>
                        <LoaderSpin />
                    </div>
                    : foodItemsListDataList?.length < 0 ?
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
                            {foodItemsListDataList.map((f: any) => (
                                <SwiperSlide key={f._id}>
                                    <FoodItems f={f} key={f._id} />
                                </SwiperSlide>
                            ))}
                        </Swiper>

            }
        </>
    )
}

export default FoodItemsListData