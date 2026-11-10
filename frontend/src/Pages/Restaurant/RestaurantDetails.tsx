import { useEffect } from "react"
import { useAppDispatch, useAppSelecter } from "../../Store/hook"
import { getShopByShopIdThunk } from "../../Store/StoreThunk/GetshopThunk"
import { useParams } from "react-router"
import RestaurantSection from "./RestaurantSection"

const RestaurantDetails = () => {
    const { socket } = useAppSelecter((state) => state.userInfo)
    const dispatch = useAppDispatch()
    const { shop } = useParams<{ shop: any }>()
    const { data: ShopDetailsbyShopid, loading: loader } = useAppSelecter((state) => state.getMyshopdata?.ShopDetailsbyShopid)
    const { name, city, items, image, address } = ShopDetailsbyShopid! && ShopDetailsbyShopid || {}

    console.log('/ShopDetailsbyShopid', ShopDetailsbyShopid)

    useEffect(() => {
        dispatch(getShopByShopIdThunk(shop))
    }, [shop])


    // Live updates
    useEffect(() => {
        if (!socket || !shop) return

        const handleNewItem = (data: { shopId: string }) => {
            console.log('/ShopDetailsbyShopid data', data)
            if (String(data.shopId) !== shop) return   // ignore other shops
            dispatch(getShopByShopIdThunk(shop))
        }

        socket.on("newShopItem", handleNewItem)
        return () => {
            socket.off("newShopItem", handleNewItem)   // remove only this handler
        }
    }, [socket, shop, dispatch])


    return (
        <div className="w-full">
            <RestaurantSection loader={loader} shopDts={{ name, city, image, address, items }} />
        </div>
    )
}

export default RestaurantDetails