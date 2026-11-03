import { useEffect } from "react"
import { useAppDispatch, useAppSelecter } from "../../Store/hook"
import { getShopByShopIdThunk } from "../../Store/StoreThunk/GetshopThunk"
import { useParams } from "react-router"
import RestaurantSection from "./RestaurantSection"

const RestaurantDetails = () => {
    const dispatch = useAppDispatch()
    const { shop } = useParams<{ shop: any }>()
    const { data: ShopDetailsbyShopid, loading: loader } = useAppSelecter((state) => state.getMyshopdata?.ShopDetailsbyShopid)
    const { name, city, items, image, address } = ShopDetailsbyShopid! && ShopDetailsbyShopid || {}

    console.log('/ShopDetailsbyShopid', ShopDetailsbyShopid)

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