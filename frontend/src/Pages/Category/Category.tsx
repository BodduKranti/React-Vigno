import { useParams } from 'react-router'
import useCity from '../../hooks/useCity'
import { useGetApi } from '../../hooks/useAxiosServices'
import { ROUTES } from '../../type'
import FoodItemsListData from '../../components/FoodItemsList/FoodItemsListData'

const Category = () => {
    const { cat } = useParams<{ cat: any }>()
    console.log('cat', cat)
    // const { foodItemsListData } = FoodItemsList()
    const { city } = useCity()
    const { data, isLoading } = useGetApi(`${ROUTES.GET_ALL_SHOP_ITEM_BY_CITY}/${city}`, undefined, !!city)
    const foodItemsListData = Array.isArray(data) && data || []
    console.log(`cate ${cat} items`, foodItemsListData.filter((cat) => cat?.category === cat))
    return (
        <section className="foods max-w-[1600px] mx-auto" aria-label="Popular near you">
            <h2 className='capitalize'>Category {cat}</h2>
            <FoodItemsListData isLoading={isLoading} foodItemsListData={foodItemsListData} />
        </section>
    )

    return (
        <div>Category</div>
    )
}

export default Category