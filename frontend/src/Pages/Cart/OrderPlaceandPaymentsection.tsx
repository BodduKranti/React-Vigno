import { ShoppingCartIcon } from 'lucide-react'
import NoitemShopfound from '../../components/NoitemShopfound'
import { useAppDispatch, useAppSelecter } from '../../Store/hook'
import { addCart, clearCart, deleteCart, removeCart } from '../../Store/Reducer/AuthSlice/UserSlice'
import OrderPlaceCartItem from './OrderPlaceCartItem'
import PlaceOrdered from './PlaceOrdered'
import { useNavigate } from 'react-router'
import { placeOrderShop } from '../../hooks/useShop'
import { ROUTES } from '../../type'
import { toast } from 'react-toastify'
import { ErrorAxios } from '../../services/ErrorIntersects'
import { useState } from 'react'

const OrderPlaceandPaymentsection = () => {
    const [loader, setLoader] = useState<boolean>(false)
    const { cartItems } = useAppSelecter((state) => state.userInfo)
    const { paymentmothod } = useAppSelecter((state) => state.getMyshopdata)
    const { location, address } = useAppSelecter((state) => state.map)
    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const placeOrderFun = placeOrderShop()

    const paymentPlace = (totalAmount: any) => {
        setLoader(true)
        let paymentMethod = paymentmothod
        let deliveryAddress = {
            text: address,
            latitude: location?.lat,
            longitude: location?.lon,
        }

        const payload = {
            cartItems,
            paymentMethod,
            deliveryAddress,
            totalAmount
        }

        placeOrderFun.mutate({
            URL: ROUTES.CREAT_SHOP_ORDER,
            payload
        }, {
            onSuccess: (data: any) => {
                toast.success(`Order Place successfully`)
                setLoader(false)
                console.log('data', data)
                //after succes
                navigate(`/order?orderid=${data?._id}`)
                dispatch(clearCart())
            },
            onError: (error: any) => {
                const err = ErrorAxios(error)
                toast.error(err)
                setLoader(false)
            }
        })


    }


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

                <PlaceOrdered
                    cartItems={cartItems}
                    paymentPlace={paymentPlace}
                    paymentmod={paymentmothod}
                    loader={loader}
                />

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