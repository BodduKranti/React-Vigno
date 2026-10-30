import { useEffect } from "react"
import { useAppDispatch, useAppSelecter } from "../../Store/hook"
import { getShopByShopIdThunk } from "../../Store/StoreThunk/GetshopThunk"
import { useParams } from "react-router"
import FoodItemsListData from "../../components/FoodItemsList/FoodItemsListData"
import RestaurantSection from "./RestaurantSection"
import ErrorBoundary from "../../components/ErrorBoundry/ErrorBoundary"

const RestaurantDetails = () => {
    const dispatch = useAppDispatch()
    const { shop } = useParams<{ shop: any }>()
    const { ShopDetailsbyShopid, loader } = useAppSelecter((state) => state.getMyshopdata)
    const { name, city, items, image, address } = ShopDetailsbyShopid! && ShopDetailsbyShopid || {}

    useEffect(() => {
        dispatch(getShopByShopIdThunk(shop))
    }, [shop])
    return (
        <div className="w-full">
            <RestaurantSection loader={loader} shopDts={{ name, city, image, address, items }} />


        </div>
    )
}

export default RestaurantDetails