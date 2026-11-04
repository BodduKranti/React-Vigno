import { useState } from "react";

const Thumb = ({ src, label }: { src?: string; label: string }) => {
    const [failed, setFailed] = useState(false)
    return src && !failed ? (
        <img src={src} alt={label} loading="lazy" onError={() => setFailed(true)} />
    ) : (
        <span className="oc-fallback" aria-hidden="true">{label.charAt(0).toUpperCase()}</span>
    )
}

const money = (n = 0) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n)

const OrderItem = ({ idx, i, name }: { idx: any, i: any, name: string }) => {
    return (
        <li key={idx}>
            <span className="oc-img">
                <Thumb src={i.item?.image || i?.image} label={name} />
                <em>×{i.quantity}</em>
            </span>
            <b>{name}</b>
            <small>{money(i.price)} each</small>
        </li>
    )
}

export default OrderItem