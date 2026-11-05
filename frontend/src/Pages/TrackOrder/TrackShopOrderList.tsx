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
    return (
        <div className="w-full">

            {
                ShopOrderList?.map((list) => {
                    return <TrackShopOrderItems data={data} shop={list} />
                })
            }


        </div>
    )
}

export default TrackShopOrderList