import type { shopOrderDetails } from "./TrackShopOrderList"
import { itemImage, itemName, money, Thumb, Tracker } from "../Order/UserOrder/UserOrderCardItem";
import TrackDeliveryBoyDetails from "./TrackDeliveryBoyDetails";
import DeliveryBoyTracking from "../DeliveryBoy/DeliveryBoyTracking";

interface shopOderGetItem {
    shop: shopOrderDetails,
    data?: any
}

const TrackShopOrderItems = ({ shop: s, data }: shopOderGetItem) => {
    return (
        <div className="ov-body border-t-0! grid grid-cols-1 md:flex items-center gap-4 ">
            <div className="w-full md:w-1/2">
                <section key={s._id} className="ov-shop flex flex-col mb-4">
                    <div className="ov-shop-head border-b border-orange-500 pb-5 mb-5">
                        <Thumb src={s.shop?.image} label={s.shop?.name ?? "S"} size={45} />
                        <h3>{s.shop?.name ?? "Shop"}</h3>
                        <span className={`ov-pill s-${s.status.replace(/\s/g, "-")}`}>{s.status}</span>
                    </div>

                    <Tracker status={s.status} />

                    <ul className="ov-items">
                        {(s.shopOrderItems ?? []).map((i, idx) => (
                            <li key={idx}>
                                <Thumb src={itemImage(i)} label={itemName(i)} />
                                <span className="ov-iname">
                                    {itemName(i)}
                                    <small>{i.quantity} × {money(i.price)}</small>
                                </span>
                                <b>{money(i.price * i.quantity)}</b>
                            </li>
                        ))}
                    </ul>

                    <div className="ov-foot flex! justify-between! border-t-3! border-dashed!">
                        <span className="font-semibold">Subtotal</span>
                        {s.subTotal !== undefined && <b>{money(s.subTotal)}</b>}
                    </div>

                </section>

                <div className={`w-full flex flex-col ${s.status !== 'delivered' ? ' pb-4' : 'pb-0'} text-sm`}>
                    <span className="font-semibold">Delivery Address:</span>
                    <span className="text-xs">{data?.deliveryAddress?.text}</span>
                </div>


                {
                    s.status !== 'delivered' && s?.assignedDeliveryBoy && <TrackDeliveryBoyDetails deliverB={s?.assignedDeliveryBoy} />
                }

            </div>

            {/* ORder Track section */}
            <div className="w-full md:w-1/2">
                {
                    s.status !== 'delivered' && s?.assignedDeliveryBoy &&
                    <DeliveryBoyTracking
                        currentorder={{
                            deliveryBoylocation: {
                                lat: Number(s?.assignedDeliveryBoy?.location?.coordinates[1]),
                                lon: Number(s?.assignedDeliveryBoy?.location?.coordinates[0])
                            },
                            customerLocation: {
                                lat: Number(data?.deliveryAddress?.latitude),
                                lon: Number(data?.deliveryAddress?.longitude)
                            }
                        }}
                    />
                }

            </div>

        </div>
    )
}

export default TrackShopOrderItems