
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
    const { data, isLoading } = useGetApi(`${ROUTES.GET_ALL_SHOP_ITEM_BY_CITY}/${city}`, undefined, !!city)
    const foodItemsListData = Array.isArray(data) && data || []

    const searchFoodListItems =
        searchFood.trim().length > 1
            ? foodItemsListData.filter((item) =>
                item.name.toLowerCase().includes(searchFood.trim().toLowerCase())
            )
            : foodItemsListData;


    console.log('searchFood', searchFood)
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
                    <FoodItemsListData isLoading={isLoading} foodItemsListData={searchFoodListItems} />
            }


        </section>
    )
}

export default FoodItemsListsection