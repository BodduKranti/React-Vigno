import { Pencil, Trash2, UtensilsCrossed } from 'lucide-react'
export interface FoodItem {
    _id: any
    name: string
    image?: string
    price: number
    category?: string,
    foodtype: string
}

interface Props {
    item: FoodItem
    onEdit?: (item: FoodItem) => void
    onDelete?: (item: FoodItem) => void,
}

const FoodTypeMark = ({ type }: { type: string }) => {
    const isVeg = type === "veg"
    return (
        <span
            title={isVeg ? "Veg" : "Non-veg"}
            className={`flex h-5 w-5 items-center justify-center rounded-sm border-2 bg-white ${isVeg ? "border-green-600" : "border-red-600"
                }`}
        >
            <span className={`h-2.5 w-2.5 rounded-full ${isVeg ? "bg-green-600" : "bg-red-600"}`} />
        </span>
    )
}

const ShopItems = ({ item, onEdit, onDelete }: Props) => {
    const isVeg = item.foodtype === "veg"
    return (
        <div className="group flex flex-col overflow-hidden rounded-3xl border border-orange-400 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100">
            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden bg-orange-50">
                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <UtensilsCrossed size={40} strokeWidth={1.3} className="text-orange-300" />
                    </div>
                )}

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/50 to-transparent" />

                {/* veg / non-veg marker */}
                <div className="absolute left-3 top-3 rounded-md bg-white p-1 shadow">
                    <FoodTypeMark type={item.foodtype} />
                </div>

                {/* category chip */}
                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-orange-600 backdrop-blur">
                    {item.category}
                </span>

                {/* actions */}
                <div className="absolute right-3 top-3 flex gap-2 transition sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                    {onEdit && (
                        <button
                            type="button"
                            onClick={() => onEdit(item)}
                            aria-label={`Edit ${item.name}`}
                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-orange-600 shadow-md transition hover:bg-orange-500 hover:text-white"
                        >
                            <Pencil size={16} />
                        </button>
                    )}


                    {onDelete && (
                        <button
                            type="button"
                            onClick={() => onDelete(item?._id)}
                            aria-label={`Delete ${item.name}`}
                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-red-500 shadow-md transition hover:bg-red-500 hover:text-white"
                        >
                            <Trash2 size={16} />
                        </button>
                    )}
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-4">
                <h3 className="truncate text-lg font-bold capitalize text-gray-900" title={item.name}>
                    {item.name}
                </h3>

                <p className={`mt-0.5 text-xs font-semibold ${isVeg ? "text-green-600" : "text-red-600"}`}>
                    {isVeg ? "Vegetarian" : "Non-vegetarian"}
                </p>

                <div className="mt-4 border-t border-dashed border-orange-100 pt-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Price</p>
                    <p className="text-2xl font-extrabold text-orange-600">
                        ₹{Number(item.price).toLocaleString("en-IN")}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ShopItems