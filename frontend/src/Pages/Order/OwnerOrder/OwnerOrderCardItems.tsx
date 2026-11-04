import { useState } from "react"
import { paymentMethods, ROUTES, type Status } from "../../../type"
import AvailbleDeliverysection from "../AvailbleDeliveryOrderedboys/AvailbleDeliverysection"
import NoitemShopfound from "../../../components/NoitemShopfound"
import { AxiosInstance } from "../../../services"
import { toast } from "react-toastify"
import OrderItem from "../OrderItem"
import AcceptedDeliveryBoyItem from "../AvailbleDeliveryOrderedboys/AcceptedDeliveryBoyItem"

interface shopItem {
    _id: string,
    name: string
}


interface OrderItem {
    quantity: number
    price: number
    name?: string
    item?: { name?: string; image?: string }
}
interface OwnerOrder {
    _id: string
    createdAt?: string
    paymentMethod?: string | undefined
    user: { fullname: string; email?: string; mobile?: string }
    deliveryAddress?: { text: string; latitude?: number; longitude?: number }
    shopOrder: {
        _id: string
        status: Status
        subTotal?: number
        shopOrderItems: OrderItem[],
        shop: shopItem,
        assignedDeliveryBoy: any
    }
}
interface Props {
    items: OwnerOrder
    // Call your API here, return a promise so the card can show "Saving…"
    onStatusChange?: ((orderId: string, shopOrderId: string, status: Status) => Promise<void> | void),
}

// const DELIVERYBOU_STATUSES: Status[] = ["pending", "preparing", "out of delivery", "delivered", "cancelled"]
const STATUSES: Status[] = ["pending", "preparing", "out of delivery"]

const money = (n = 0) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n)

const timeText = (d?: string) =>
    d ? new Date(d).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }) : ""

const initials = (name: string) =>
    name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("")


const OwnerOrderCardItems = ({ items: order, }: Props) => {
    const { user, shopOrder, deliveryAddress: addr } = order
    const [availbleBoys, setAvailbleBoys] = useState<any>([])
    const [status, setStatus] = useState<Status>(shopOrder?.status)
    const mapsUrl =
        addr?.latitude !== undefined && addr?.longitude !== undefined
            ? `https://www.google.com/maps?q=${addr.latitude},${addr.longitude}`
            : undefined
    // const [saving, setSaving] = useState(false)
    const closed =
        status === "delivered" ||
        status === "cancelled"

    // const change = async (next: Status) => {



    //     // if (next === status) return
    //     setStatus(next)
    //     // setSaving(true)
    //     onStatusChange(orderId, shopId, status)

    // }

    // const orderStatus = async (orderId: string, shopId: string, status: Status) => {
    const change = async (next: any) => {
        try {

            let orderId: string = String(order?._id)
            let shopId: string = String(shopOrder?.shop?._id)
            let status = next
            setStatus(next)
            const res = await AxiosInstance.post(
                `${ROUTES.ORDERED_STATUS}/${orderId}/${shopId}`,
                { status },
                { withCredentials: true }
            )

            // const key = `${orderId}-${shopId}`
            const boys = res?.data?.availbelboys ?? []

            setAvailbleBoys(boys)
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed to update status")
        }
    }
    console.log('status', status)
    return (
        <article key={order._id} className={`w-full! oc s-${status.replace(/\s/g, "-")}`}>
            {/*USer details*/}
            <header className="oc-head">
                <span className="oc-avatar" aria-hidden="true">{initials(user.fullname)}</span>
                <div className="oc-who">
                    <h3>{user.fullname}</h3>
                    <small>
                        Order #{order._id.slice(-6)}
                        {order.createdAt && ` · ${timeText(order.createdAt)}`}
                    </small>
                </div>
                <span className="oc-pill">{status}</span>
            </header>

            <div className="oc-contact">
                {user.mobile && (
                    <a href={`tel:${user.mobile}`}>
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11 11 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.6 3.6a1 1 0 0 1-.25 1z" /></svg>
                        {user.mobile}
                    </a>
                )}
                {user.email && (
                    <a href={`mailto:${user.email}`}>
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7 8-5H4l8 5zm0 2L4 9v8h16V9l-8 5z" /></svg>
                        {user.email}
                    </a>
                )}
            </div>

            {addr && (
                <div className="oc-addr">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" /></svg>
                    <p>{addr.text}</p>
                    {mapsUrl && <a href={mapsUrl} target="_blank" rel="noreferrer">Open in Maps</a>}
                </div>
            )}

            <ul className="oc-items">
                {shopOrder.shopOrderItems.map((i, idx) => {
                    const name = i.name ?? i.item?.name ?? "Item"
                    return (
                        <OrderItem idx={idx} i={i} name={name} />
                    )
                })}
            </ul>

            <footer className="oc-foot">
                <label className="oc-update py-2! text-xs!">
                    <span>Update status</span>
                    <select
                        value={status}
                        disabled={closed}
                        onChange={(e) =>
                            change(e.target.value as Status)
                        }
                    >
                        {STATUSES.map((st) => (
                            <option key={st} value={st}>
                                {st}
                            </option>
                        ))}
                    </select>
                </label>
                <div className="oc-total">
                    <small>{paymentMethods[order.paymentMethod as keyof typeof paymentMethods] ?? "Total"}</small>
                    <strong>{money(shopOrder.subTotal)}</strong>
                </div>
            </footer>


            {
                availbleBoys?.length === 0 && status === 'out of delivery' ?
                    shopOrder?.assignedDeliveryBoy &&
                    <AcceptedDeliveryBoyItem
                        boy={{
                            _id: shopOrder?.assignedDeliveryBoy?._id,
                            fullname: shopOrder?.assignedDeliveryBoy?.fullname,
                            email: shopOrder?.assignedDeliveryBoy?.email,
                            mobile: shopOrder?.assignedDeliveryBoy?.mobile
                        }}
                    />
                    :

                    status === 'out of delivery' &&
                    <div className="w-full mt-5">
                        {
                            availbleBoys?.length === 0 ?

                                <NoitemShopfound
                                    message1="No delivery partners within 5 km right now."
                                    message2=""
                                />
                                :
                                <AvailbleDeliverysection boysData={availbleBoys} />
                        }
                    </div>

            }
        </article>

    )
}

export default OwnerOrderCardItems