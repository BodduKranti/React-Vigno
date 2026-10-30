
import useCity from '../../hooks/useCity'
import { ROUTES } from '../../type'
import { useGetApi } from '../../hooks/useAxiosServices'

import FoodItemsListData from './FoodItemsListData'
const FoodItemsListsection = () => {
    // const { foodItemsListData } = FoodItemsList()
    const { city } = useCity()
    const { data, isLoading } = useGetApi(`${ROUTES.GET_ALL_SHOP_ITEM_BY_CITY}/${city}`, undefined, !!city)
    const foodItemsListData = Array.isArray(data) && data || []
    return (
        <section className="foods max-w-[1600px] mx-auto" aria-label="Popular near you">
            <h2>Popular near you</h2>
            <FoodItemsListData isLoading={isLoading} foodItemsListData={foodItemsListData} />

        </section>
    )
}

export default FoodItemsListsection