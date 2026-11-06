import { useState } from "react"
import type { Status } from "../../../type"
import Button from "../../../components/field/Button"
import { useNavigate } from "react-router"

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

interface ShopOrder {
    _id: string
    shop?: { _id: string; name: string, image: string }
    owner?: { fullname: string; email?: string; mobile?: string }
    status: Status
    subTotal?: number
    shopOrderItems?: OrderItem[]
}

interface Order {
    _id: string
    createdAt: string
    paymentMethod?: string
    totalAmount?: number
    shopOrder: ShopOrder[],
    payment: any
}
interface UserOrderCardItem {
    items: Order
}

export const money = (n = 0) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n)

export const dateText = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })

// Image with graceful fallback to a letter tile
export const Thumb = ({ src, label, size = 42 }: { src?: string; label: string; size?: number }) => {
    const [failed, setFailed] = useState(false)
    return (
        <span className="ov-thumb" style={{ width: size, height: size }}>
            {src && !failed ? (
                <img src={src} alt={label} loading="lazy" onError={() => setFailed(true)} />
            ) : (
                <span aria-hidden="true">{label.charAt(0).toUpperCase()}</span>
            )}
        </span>
    )
}

export const STEPS: Status[] = ["pending", "preparing", "out of delivery", "delivered"]
export const Tracker = ({ status }: { status: Status }) => {
    if (status === "cancelled") return <p className="ov-cancelled">This order was cancelled</p>
    const at = STEPS.indexOf(status)
    return (
        <ol className="ov-track" aria-label={`Status: ${status}`}>
            {STEPS.map((s, i) => (
                <li key={s} className={i <= at ? "done" : ""} aria-current={i === at ? "step" : undefined}>
                    <i />
                    <span>{s}</span>
                </li>
            ))}
        </ol>
    )
}

// const Skeleton = () => (
//     <div className="ov-skel" aria-hidden="true">
//         {[0, 1, 2].map((n) => <div key={n} />)}
//     </div>
// )

export const itemImage = (i: OrderItem) => i.item?.image ?? i.item?.image
export const itemName = (i: OrderItem) => i.name ?? i.item?.name ?? "Item"

const UserOrderCardItem = ({ items: o }: UserOrderCardItem) => {
    const navigate = useNavigate()
    // const [open, setOpen] = useState<string | null>(null)
    // const isOpen = open === o._id
    const allItems = o.shopOrder.flatMap((s) => s.shopOrderItems ?? [])
    const itemCount = allItems.reduce((n, i) => n + i.quantity, 0)


    return (
        <li key={o._id} className="ov-card flex flex-col">
            <button
                className="ov-summary bg-[#f8804d]! text-white!"
            // aria-expanded={isOpen}
            // onClick={() => setOpen(isOpen ? null : o._id)}
            >
                <span className="ov-stack">
                    {allItems.slice(0, 3).map((i, idx) => (
                        <Thumb key={idx} src={itemImage(i)} label={itemName(i)} size={45} />
                    ))}
                    {allItems.length > 3 && <span className="ov-more-count" style={{ width: '45px', height: '45px' }}>+{allItems.length - 3}</span>}
                </span>
                <span className="ov-meta ">
                    <b>Order #{o._id.slice(-6)}</b>
                    <small className="text-white!">
                        {dateText(o.createdAt)} · {itemCount} item{itemCount === 1 ? "" : "s"}
                    </small>
                </span>

                <span className="ov-amount">
                    <b>{money(o.totalAmount)}</b>
                    <small className="text-white!">
                        {o.paymentMethod === 'online' ? o.payment ? "true" : "false" : <>{o.paymentMethod?.toUpperCase()}</>}

                    </small>
                </span>
                {/* <span className="ov-chev" aria-hidden="true" /> */}
            </button>

            <div className="ov-body flex-1 flex flex-col">
                {o.shopOrder.map((s) => (
                    <section key={s._id} className="ov-shop flex flex-col ">
                        <div className="ov-shop-head ">
                            <Thumb src={s.shop?.image} label={s.shop?.name ?? "S"} size={45} />
                            <h3>{s.shop?.name ?? "Shop"}</h3>
                            <span>
                                <Button
                                    btnTxt={"Track Order"}
                                    onClick={() => navigate(`/track?orderid=${o._id}&shoporderId=${s?.shop?._id}`)}
                                    type="button"
                                    btnColor="warning"
                                    className={"py-2! text-xs! ring-2 ring-white"}
                                />
                            </span>
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

                        <div className="ov-foot border-t-3! border-dashed!">
                            <span>
                                {s.owner?.fullname}
                                {s.owner?.mobile && <a className="text-orange-500! hover:text-orange-400!" href={`tel:${s.owner.mobile}`}>Call shop</a>}
                                {s.owner?.email && <a className="text-orange-500! hover:text-orange-400!" href={`mailto:${s.owner.email}`}>Email</a>}
                            </span>
                            {s.subTotal !== undefined && <b>{money(s.subTotal)}</b>}
                        </div>

                    </section>
                ))}
            </div>
        </li>
    )
}

export default UserOrderCardItem