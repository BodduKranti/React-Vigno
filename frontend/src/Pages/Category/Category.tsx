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
    const CategoryItems = foodItemsListData.filter((i) => i.category.toLowerCase().includes(cat.trim().toLowerCase()))
    console.log(`data items`, foodItemsListData)
    console.log(`cate ${cat} items`, foodItemsListData.filter((i) => i.category.toLowerCase().includes(cat.trim().toLowerCase())))


    return (
        <section className="foods max-w-[1600px] mx-auto" aria-label="Popular near you">
            <h2 className='capitalize'>Category {cat}</h2>
            <FoodItemsListData isLoading={isLoading} foodItemsListData={CategoryItems} />
        </section>
    )

    return (
        <div>Category</div>
    )
}

export default Category