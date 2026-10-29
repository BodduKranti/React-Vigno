import { MapPin, Building2, Map, Pencil, Store } from "lucide-react"
import { useNavigate } from "react-router"

export interface Shop {
    name: string
    image?: string
    address: string
    city: string
    state: string
}

const Row = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => (
    <div className="flex items-start gap-3 rounded-2xl bg-orange-50/70 p-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm">
            <Icon size={20} strokeWidth={1.8} />
        </div>
        <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">{label}</p>
            <p className="mt-0.5 wrap-break-word text-sm font-semibold text-gray-900">{value || "—"}</p>
        </div>
    </div>
)

const ShopDetails = ({ shop }: { shop: Shop }) => {
    const navigate = useNavigate()

    return (
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-orange-100">
            <div className="relative h-48 w-full">
                {shop.image ? (
                    <img src={shop.image} alt={shop.name} className="h-full w-full object-cover" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-orange-100">
                        <Store size={56} strokeWidth={1.3} className="text-orange-400" />
                    </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="inline-block rounded-full bg-green-500/90 px-3 py-0.5 text-xs font-semibold text-white">
                        Active
                    </span>
                    <h1 className="mt-1.5 truncate text-2xl font-extrabold text-white">{shop.name}</h1>
                </div>
            </div>

            <div className="space-y-3 p-5">
                <Row icon={MapPin} label="Address" value={shop.address} />
                <div className="grid grid-cols-2 gap-3">
                    <Row icon={Building2} label="City" value={shop.city} />
                    <Row icon={Map} label="State" value={shop.state} />
                </div>

                <button
                    onClick={() => navigate("/role/owner/addshop")}
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white shadow-md shadow-orange-200 transition hover:bg-orange-600"
                >
                    <Pencil size={16} />
                    Edit Shop
                </button>
            </div>
        </div>
    )
}

export default ShopDetails