import { ShoppingCartIcon } from "lucide-react"
import NoitemShopfound from "../../components/NoitemShopfound"
import { useAppSelecter } from "../../Store/hook"
import CartList from "./CartList"
import OrderSummary from "./OrderSummary"

const Cart = () => {
    const { cartItems } = useAppSelecter((state) => state.userInfo)
    const totalQty = cartItems.reduce((s, i) => s + (i.quantity ?? 1), 0)
    // const subtotal = cartItems.reduce((s, i) => s + i.price * (i.quantity ?? 1), 0)

    return (
        <div className="mx-auto max-w-[1600px] items-center gap-5 px-6 py-4  xl:gap-7">
            <h1 className="text-2xl font-bold text-zinc-900">Your cart</h1>
            <p className="mb-6 mt-1 text-sm text-zinc-500">{totalQty} item{totalQty > 1 ? 's' : ''}</p>
            {cartItems?.length > 0 ?
                <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
                    {/* Items */}
                    <section className="flex flex-col gap-3">
                        <CartList items={cartItems} />
                    </section>

                    <OrderSummary cartItems={cartItems} />
                </div>
                :
                <NoitemShopfound
                    icon={<ShoppingCartIcon size={36} strokeWidth={1.5} className="text-orange-500" />}
                    message1="Your cart is empty"
                    message2="Add a dish to get started."
                    btnTxt={'Continue choose food'}
                    URL="/"
                />
            }



        </div>

    )
}

export default Cart