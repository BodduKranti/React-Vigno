import Button from "../../components/field/Button"
import type { cartitemsprops } from "../../Store/Reducer/AuthSlice/UserSlice"

const FREE_DELIVERY_AT = 499
const DELIVERY_FEE = 40
const GST_RATE = 0.05

interface PlaceOrderprops {
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

const PlaceOrdered = ({ cartItems }: PlaceOrderprops) => {
    const totalQty = cartItems?.reduce((s, i) => s + (i.quantity ?? 1), 0)
    const subtotal = cartItems?.reduce((prev, curr) => prev + curr.price * (curr?.quantity ?? 1), 0)
    const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_AT ? 0 : DELIVERY_FEE
    const gst = Math.round(subtotal * GST_RATE)
    const total = subtotal + delivery + gst

    // const navigate = useNavigate()

    return (
        <aside className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm lg:sticky lg:top-6 mt-5">
            <div className=" flex flex-col gap-3">
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
                btnTxt={"Proceed to Pay"}
                type="button"
                className={`font-semibold w-full`}
            // onClick={() => navigate('/checkout')}
            />
        </aside>
    )
}

export default PlaceOrdered