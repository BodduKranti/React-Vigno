
import useCity from '../../hooks/useCity'
import { ROUTES } from '../../type'
import { useGetApi } from '../../hooks/useAxiosServices'

import FoodItemsListData from './FoodItemsListData'
import { useAppSelecter } from '../../Store/hook'
import NoitemShopfound from '../NoitemShopfound'
import { FaBowlFood } from 'react-icons/fa6'
const FoodItemsListsection = () => {
    // const { foodItemsListData } = FoodItemsList()
    const { searchFood } = useAppSelecter((state) => state.searchFoodlist)
    const { city } = useCity()
    const { searchCity } = useAppSelecter((state) => state.map)
    const { data, isLoading } = searchCity ? useGetApi(`${ROUTES.GET_ALL_SHOP_ITEM_BY_CITY}/${searchCity}`, undefined, !!searchCity) : useGetApi(`${ROUTES.GET_ALL_SHOP_ITEM_BY_CITY}/${city}`, undefined, !!city)
    const foodItemsListData = Array.isArray(data) && data || []
    const { data: search, isLoading: searchloading } = useGetApi(`${ROUTES.SEARCH_ITEMS}?query=${searchFood}&city=${searchCity ? searchCity : city}`, undefined, !!searchFood)
    const searchItemList = Array.isArray(search) && search || []
    const searchFoodListItems = searchFood.trim().length > 1 ? searchItemList : foodItemsListData;

    return (
        <section className="foods max-w-[1600px] mx-auto" aria-label="Popular near you">
            <h2>Popular near you</h2>
            {
                searchFoodListItems?.length === 0
                    ?
                    <NoitemShopfound
                        icon={<FaBowlFood size={50} />}
                        message1={`No Items found`}
                        message2=''
                    /> :
                    <FoodItemsListData isLoading={isLoading || searchloading} foodItemsListData={searchFoodListItems} />
            }


        </section>
    )
}

export default FoodItemsListsection