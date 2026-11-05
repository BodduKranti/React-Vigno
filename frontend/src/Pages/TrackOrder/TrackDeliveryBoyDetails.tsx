import type { assignedDeliveryBoyprops } from "./TrackShopOrderList"

interface delveryboy {
    deliverB: assignedDeliveryBoyprops
}
export const initials = (n = "") => n.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("") || "D";
const TrackDeliveryBoyDetails = ({ deliverB: boy }: delveryboy) => {
    return (
        <div className="flex items-center gap-3 rounded-2xl bg-orange-50/70 p-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                {initials(boy.fullname)}
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Delivery partner</p>
                <p className="truncate font-bold capitalize text-gray-900">{boy.fullname}</p>
                <p className="truncate text-sm text-gray-500">📞 {boy.mobile}</p>
                {boy.email && (
                    <a href={`mailto:${boy.email}`} className="block truncate text-sm text-gray-500 hover:text-orange-500">
                        ✉️ {boy.email}
                    </a>
                )}
            </div>
            <a href={`tel:${boy.mobile}`} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-orange-500 ring-1 ring-orange-200 transition hover:bg-orange-100">
                Call
            </a>
            {/* {onTheWay && onTrack && (
                <button onClick={() => onTrack(order)} className="rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-600">
                    Track live
                </button>
            )} */}
        </div>
    )
}

export default TrackDeliveryBoyDetails