import { ShoppingCartIcon } from 'lucide-react'
import NoitemShopfound from '../../components/NoitemShopfound'
import { useAppDispatch, useAppSelecter } from '../../Store/hook'
import { addCart, deleteCart, removeCart } from '../../Store/Reducer/AuthSlice/UserSlice'
import OrderPlaceCartItem from './OrderPlaceCartItem'
import PlaceOrdered from './PlaceOrdered'

const OrderPlaceandPaymentsection = () => {
    const { cartItems } = useAppSelecter((state) => state.userInfo)
    const dispatch = useAppDispatch()

    return (
        cartItems?.length > 0 ?
            <section className='w-full'>
                <h2>Order Items</h2>
                <div className=" flex  flex-col gap-3">
                    {cartItems.map((item) => (
                        <OrderPlaceCartItem
                            key={item._id}
                            item={item}
                            onIncrease={() => dispatch(addCart(item))}
                            onDecrease={() => dispatch(removeCart(item._id))}
                            onRemove={() => dispatch(deleteCart(item._id))}
                        />
                    ))}
                </div>

                <PlaceOrdered cartItems={cartItems} />

            </section> :
            <NoitemShopfound
                icon={<ShoppingCartIcon size={36} strokeWidth={1.5} className="text-orange-500" />}
                message1="Your cart is empty"
                message2="Add a dish to get started."
                btnTxt={'Continue choose food'}
                URL="/"
            />
    )
}

export default OrderPlaceandPaymentsection