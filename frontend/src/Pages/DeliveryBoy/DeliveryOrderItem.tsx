import { Pin } from "lucide-react"
import OrderItem from "../Order/OrderItem"
import { useState } from "react"
import LoaderSpin from "../../components/LoaderSpin"
import Button from "../../components/field/Button"

interface deliveryItemsNeed {
    o?: any,
    acptAssignOrder: (acptAssignOrder: any) => void
}

const DeliveryOrderItem = ({ o, acptAssignOrder }: deliveryItemsNeed) => {
    const [loading, setLoading] = useState<boolean>(false)
    const accpetFun = async (assignmentId: any) => {
        setLoading(true)
        try {
            acptAssignOrder(assignmentId)
            setTimeout(() => setLoading(false), 300)
        } catch (error) {
            setLoading(false)
        }
    }

    return (
        <li key={o?.id || 1} className="rounded-2xl border border-orange-100 p-4">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="truncate font-bold">
                        {o?.shopName || 'Panjabhi Dhaba'}

                    </p>
                    <p className="mt-0.5 flex items-start gap-1.5 text-sm text-gray-500">
                        <span className="mt-0.5 text-orange-500"><Pin /></span>
                        <span className="line-clamp-2">
                            {o?.deliveryAdd?.text || 'Mailardevpalli'}

                        </span>
                    </p>
                </div>
                <p className="text-xl font-extrabold">
                    ₹{o.subtotal || 0}
                </p>
            </div>

            <div className="w-full">
                <ul className="oc-items">
                    {o.items.map((i: any, idx: number) => {
                        const name = i.name ?? i.item?.name ?? "Item"
                        return (
                            <OrderItem idx={idx} i={i} name={name} key={i.item} />
                        )
                    })}
                </ul>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-gray-600">
                        {o.items?.length} items
                        {/* 2 items */}
                    </span>
                    {/* {o.distanceKm != null && (
                        <span className="rounded-full bg-orange-50 px-2.5 py-1 text-orange-600">{o.distanceKm.toFixed(1)} km</span>
                    )} */}
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-600">{o?.paymentMethod || 'COD'}</span>
                </div>

                <Button
                    btnTxt={loading ? <LoaderSpin /> : "Accept"}
                    btnColor="warning"
                    type="button"
                    onClick={() => accpetFun(o.assignmentId)}
                    className={`py-2! text-sm! w-30!`}
                />
                {/* <button
                    onClick={() => accpetFun(o.assignmentId)}
                    disabled={loading}
                    className="rounded-full bg-orange-500 px-5 py-2 text-sm font-bold text-white transition hover:bg-orange-600 disabled:bg-gray-300"
                >
                    {loading ? <LoaderSpin /> : "Accept"}
                </button> */}
            </div>
        </li>
    )
}

export default DeliveryOrderItem