import { useNavigate } from "react-router"
import Button from "../../components/field/Button"
import type { cartitemsprops } from "../../Store/Reducer/AuthSlice/UserSlice"

const FREE_DELIVERY_AT = 499
const DELIVERY_FEE = 40
const GST_RATE = 0.05

interface ordersummaryprops {
    cartItems: cartitemsprops[]
}


const inr = (n: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

const Row = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
    <div className="flex items-center justify-between text-sm">
        <span className="text-zinc-500">{label}</span>
        <span className={`font-medium tabular-nums ${accent ? 'text-green-600' : 'text-zinc-800'}`}>{value}</span>
    </div>
)

const OrderSummary = ({ cartItems }: ordersummaryprops) => {
    const totalQty = cartItems?.reduce((s, i) => s + (i.quantity ?? 1), 0)
    const subtotal = cartItems?.reduce((prev, curr) => prev + curr.price * (curr?.quantity ?? 1), 0)
    const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_AT ? 0 : DELIVERY_FEE
    const progress = Math.min(100, (subtotal / FREE_DELIVERY_AT) * 100)
    const gst = Math.round(subtotal * GST_RATE)
    const total = subtotal + delivery + gst

    const navigate = useNavigate()

    return (
        <aside className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm lg:sticky lg:top-6">
            <h2 className="text-lg font-semibold text-zinc-900">Order summary</h2>

            {/* Free delivery progress */}
            <div className="mt-4 rounded-xl bg-orange-50 p-3">
                <p className="text-xs font-medium text-orange-800">
                    {delivery === 0
                        ? '🎉 You have unlocked free delivery'
                        : `Add ${inr(FREE_DELIVERY_AT - subtotal)} more for free delivery`}
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-orange-100">
                    <div className="h-full rounded-full bg-[#ff6b06] transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
            </div>

            <div className="mt-5 flex flex-col gap-3">
                <Row label={`Subtotal (${totalQty} items)`} value={inr(subtotal)} />
                <Row label="Delivery fee" value={delivery === 0 ? 'FREE' : inr(delivery)} accent={delivery === 0} />
                <Row label="GST (5%)" value={inr(gst)} />
            </div>

            <div className="my-4 border-t border-dashed border-zinc-200" />

            <div className="flex items-end justify-between mb-3">
                <span className="text-base font-semibold text-zinc-900">Total</span>
                <span className="text-2xl font-bold tabular-nums text-zinc-900">{inr(total)}</span>
            </div>

            <Button
                btnColor="warning"
                btnTxt={"Proceed to checkout"}
                type="button"
                className={`font-semibold w-full`}
                onClick={() => navigate('/checkout')}
            />
        </aside>
    )
}

export default OrderSummary