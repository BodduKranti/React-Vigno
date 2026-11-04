import { Pin } from "lucide-react"
import OrderItem from "../Order/OrderItem"
import DeliveryBoyTracking from "./DeliveryBoyTracking"

interface shopOrderItemsporp {
    _id: string,
    item: string,
    name: string,
    image: string,
    price: number,
    quantity: number,
}

interface shopOrderprps {
    shopName: string,
    subTotal: any,
    shopOrderItems: shopOrderItemsporp[]
}

interface deliveryAddressprops {
    text: string
}


interface allDetails {
    deliveryAddress: deliveryAddressprops,
    shopOrder: shopOrderprps
}

interface currentOrderprops {
    currentorder: allDetails
}


const CurrentOrderSection = ({ currentorder }: currentOrderprops) => {
    return (
        <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-orange-100">
            <h2 className="text-lg font-bold">Current Order</h2>
            <div className="mb-4 flex flex-col  justify-between space-y-4" >

                <div className="rounded-2xl border border-orange-100 p-4">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <p className="truncate font-bold">
                                {currentorder?.shopOrder?.shopName || ''}
                            </p>
                            <p className="mt-0.5 flex items-start gap-1.5 text-sm text-gray-500">
                                <span className="mt-0.5 text-orange-500"><Pin /></span>
                                <span className="line-clamp-2">
                                    {currentorder?.deliveryAddress?.text}
                                </span>
                            </p>
                        </div>
                        <p className="text-xl font-extrabold">
                            ₹{currentorder?.shopOrder?.subTotal || 0}
                        </p>
                    </div>

                    <div className="w-full">
                        <ul className="oc-items">
                            {currentorder?.shopOrder?.shopOrderItems?.map((i, idx) => {
                                const name = i.name ?? "Item"
                                return (
                                    <OrderItem idx={idx} i={i} name={name} key={i.item} />
                                )
                            })}
                        </ul>
                    </div>
                </div>

                <DeliveryBoyTracking
                    currentorder={currentorder}
                />
            </div>

        </section>
    )
}

export default CurrentOrderSection
