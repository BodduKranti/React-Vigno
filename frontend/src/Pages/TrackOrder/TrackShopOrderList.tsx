import { useSearchParams } from "react-router"
import type { Status } from "../../type"
import TrackShopOrderItems from "./TrackShopOrderItems"

interface item {
    image: string,
    name: string,
    price: any
}

interface OrderItem {
    name: string
    quantity: number
    price: number,
    item: item
}

export interface shopItem {
    _id: string,
    name: string,
    image: string
}
export interface delveryboyLocationprops {
    type: string,
    coordinates: number[]
}
export interface assignedDeliveryBoyprops {
    _id: string,
    fullname: string,
    email: any,
    mobile: any,
    location: delveryboyLocationprops
}
export interface shopOrderDetails {
    _id: string,
    shop: shopItem,
    subTotal: number,
    status: Status,
    assignedDeliveryBoy: assignedDeliveryBoyprops,
    shopOrderItems: OrderItem[]
}

interface ShopOrderListDetails {
    ShopOrderList: shopOrderDetails[],
    data?: any
}

const TrackShopOrderList = ({ ShopOrderList, data }: ShopOrderListDetails) => {
    const [searchParams] = useSearchParams()
    const shoporderId = searchParams.get('shoporderId')
    const list: shopOrderDetails = ShopOrderList?.find((s: any) => s?.shop?._id === shoporderId) || {} as any
    return (
        <div className="w-full">
            <TrackShopOrderItems data={data} shop={list} />
            {/* {
                ShopOrderList?.map((list) => {
                    console.log('TrackShopOrderItems list', list)
                    return <TrackShopOrderItems key={list._id} data={data} shop={list} />
                })
            } */}


        </div>
    )
}

export default TrackShopOrderList