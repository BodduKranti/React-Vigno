import { ShoppingCartIcon } from 'lucide-react'
import NoitemShopfound from '../../components/NoitemShopfound'
import { useAppDispatch, useAppSelecter } from '../../Store/hook'
import { addCart, clearCart, deleteCart, removeCart } from '../../Store/Reducer/AuthSlice/UserSlice'
import OrderPlaceCartItem from './OrderPlaceCartItem'
import PlaceOrdered from './PlaceOrdered'
import { useNavigate } from 'react-router'
import { placeOrderShop, verifyOrderPayment } from '../../hooks/useShop'
import { ROUTES } from '../../type'
import { toast } from 'react-toastify'
import { ErrorAxios } from '../../services/ErrorIntersects'
import { useState } from 'react'
import { getuserOrder } from '../../Store/StoreThunk/GetUserThunk'


interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name?: string;
    description?: string;
    order_id: string;
    handler: (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
    }) => void;
    prefill?: { name?: string; email?: string; contact?: string };
    theme?: { color?: string };
    modal?: { ondismiss?: () => void };
}

interface RazorpayInstance {
    open(): void;
    on(event: string, callback: (response: any) => void): void;
}

declare global {
    interface Window {
        Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
    }
}

const OrderPlaceandPaymentsection = () => {
    const [loader, setLoader] = useState<boolean>(false)
    const { cartItems } = useAppSelecter((state) => state.userInfo)
    const { paymentmothod } = useAppSelecter((state) => state.getMyshopdata)
    const { location, address } = useAppSelecter((state) => state.map)
    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const placeOrderFun = placeOrderShop()

    const verifyRazorpayorderPayment = verifyOrderPayment()

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


                if (paymentMethod === 'cod') {
                    //after succes
                    navigate(`/order?orderid=${data?._id}`)
                    dispatch(clearCart())
                    dispatch(getuserOrder())
                } else {
                    //orderId
                    //
                    const orderId = data?.orderId
                    const razorOrder = data?.razorOrder

                    console.log('orderId', orderId)
                    console.log('razorOrder', razorOrder)
                    console.log('VITE_TEST_ROZAR_API_KEY', import.meta.env.VITE_TEST_ROZAR_API_KEY);
                    openRazorpayWindow(orderId, razorOrder)
                }

            },
            onError: (error: any) => {
                const err = ErrorAxios(error)
                toast.error(err)
                setLoader(false)
            }
        })


    }

    // Razorpay verify
    const openRazorpayWindow = (orderId: string, razorOrder: any) => {
        const options: RazorpayOptions = {
            key: import.meta.env.VITE_TEST_ROZAR_API_KEY,          // key_id sent from your backend
            amount: razorOrder.amount,       // in paise
            currency: razorOrder.currency,   // "INR"
            name: 'QuickBite',
            description: 'Food Delivery payment',
            order_id: razorOrder.id,               // razorOrder.id
            handler: async (response) => {
                console.log('verify response', response)
                verifyRazorpayorderPayment.mutate({
                    URL: ROUTES.VERIFY_PAYMENT,
                    payload: {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        orderId, // your own DB order id
                    },
                }, {
                    onSuccess: () => {
                        toast.success(`Payment successful!`)
                        navigate(`/order?orderid=${orderId}`)
                        dispatch(clearCart())
                        dispatch(getuserOrder())
                    },
                    onError: (err: any) => {
                        const errmsg = ErrorAxios(err)
                        toast.error(errmsg)
                    }
                });

                // send to backend to verify the signature
                // const res = await fetch('http://localhost:5000/api/payment/verify', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(response),
                // });
                // const result = await res.json();
                // alert(result.success ? 'Payment successful!' : 'Verification failed');

            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };


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