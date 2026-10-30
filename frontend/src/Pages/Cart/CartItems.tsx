import { Link } from "react-router"
import { type cartitemsprops } from "../../Store/Reducer/AuthSlice/UserSlice"

interface cartItem {
    item: cartitemsprops,
    onIncrease: (value: any) => void
    onDecrease: (value: any) => void
    onRemove: (value: any) => void
}

const formatPrice = (n: number) =>
    new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(n)

// Indian food-labelling mark: square outline with a dot (green = veg, red = non-veg)
const FoodTypeMark = ({ foodtype }: { foodtype: string }) => {
    const isNonVeg = foodtype.toLowerCase().replace(/[\s_-]/g, '').includes('nonveg')
    const color = isNonVeg ? 'border-red-600' : 'border-green-600'
    const dot = isNonVeg ? 'bg-red-600' : 'bg-green-600'

    return (
        <span
            title={isNonVeg ? 'Non-veg' : 'Veg'}
            aria-label={isNonVeg ? 'Non-veg' : 'Veg'}
            className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border-[1.5px] bg-white ${color}`}
        >
            <span className={`h-2 w-2 rounded-full ${dot}`} />
        </span>
    )
}
const CartItems = ({ item, onIncrease, onDecrease, onRemove }: cartItem) => {
    const lineTotal = item.price * item.quantity!


    return (
        <article className="group relative flex gap-4 rounded-2xl border border-orange-100 bg-white p-3 shadow-sm transition-shadow hover:shadow-md sm:gap-5 sm:p-4">
            {/* Image */}
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-orange-50 sm:h-32 sm:w-32">
                {!item.image ? (
                    <div className="flex h-full w-full items-center justify-center text-3xl">🍽️</div>
                ) : (
                    <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                )}
            </div>

            {/* Details */}
            <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div className="pr-8">
                    <div className="flex items-center gap-2">
                        <FoodTypeMark foodtype={item.foodtype} />
                        <Link to={`/restaurants/${item?.shop}`} className="cursor-pointer hover:text-orange-500">
                            <h3 className="truncate text-base font-semibold text-zinc-900 sm:text-lg">
                                {item.name}
                            </h3>
                        </Link>

                    </div>

                    <p className="mt-1 text-sm text-zinc-500">
                        {item.category}
                        {/* {item.shop && <span className="text-zinc-400"> from {item.shop}</span>} */}
                    </p>

                    <p className="mt-1 text-sm text-zinc-500">{formatPrice(item.price)} each</p>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                    {/* Quantity stepper */}
                    <div className="inline-flex items-center rounded-full bg-orange-50 p-1 ring-1 ring-orange-200">
                        <button
                            type="button"
                            onClick={() => onDecrease(item._id)}
                            disabled={item?.quantity! <= 1}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-medium text-[#ff6b06] transition-colors hover:bg-orange-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6b06] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent"
                        >
                            −
                        </button>

                        <span
                            className="min-w-8 text-center text-sm font-semibold tabular-nums text-zinc-900"
                            aria-live="polite"
                        >
                            {item?.quantity}
                        </span>

                        <button
                            type="button"
                            onClick={() => onIncrease(item)}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff6b06] text-lg font-medium text-white transition-colors hover:bg-[#e85f00] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6b06]"
                        >
                            +
                        </button>
                    </div>

                    {/* Line total */}
                    <p className="text-lg font-bold tabular-nums text-zinc-900 sm:text-xl">
                        {formatPrice(lineTotal)}
                    </p>
                </div>
            </div>

            {/* Remove */}
            <button
                type="button"
                onClick={() => onRemove(item._id)}
                aria-label={`Remove ${item.name} from cart`}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-red-500 sm:right-3 sm:top-3"
            >
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 6h18" />
                    <path d="M8 6V4h8v2" />
                    <path d="M6 6l1 14h10l1-14" />
                    <path d="M10 11v5M14 11v5" />
                </svg>
            </button>
        </article>
    )
}

export default CartItems