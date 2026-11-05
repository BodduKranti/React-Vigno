import { Pin } from "lucide-react"
import OrderItem from "../Order/OrderItem"
import DeliveryBoyTracking from "./DeliveryBoyTracking"
import Button from "../../components/field/Button"
import { useState } from "react"
import VerifyOtpSection from "../../components/VerifyOtp/VerifyOtpSection"
import { sendDeliveryOTP, verifyDeliveryOTP } from "../../hooks/useShop"
import { ROUTES } from "../../type"
import { toast } from "react-toastify"
import { ErrorAxios } from "../../services/ErrorIntersects"
import LoaderSpin from "../../components/LoaderSpin"

interface shopOrderItemsporp {
    _id: string,
    item: string,
    name: string,
    image: string,
    price: number,
    quantity: number,
}

interface shopOrderprps {
    _id: string,
    shopName: string,
    subTotal: any,
    shopOrderItems: shopOrderItemsporp[]
}

interface deliveryAddressprops {
    text: string
}

interface userprops {
    fullname: string,
    email: string,
    mobile: any
}

interface allDetails {
    deliveryAddress: deliveryAddressprops,
    shopOrder: shopOrderprps
    user: userprops,
    _id: string
}

interface currentOrderprops {
    currentorder: allDetails
}


const CurrentOrderSection = ({ currentorder }: currentOrderprops) => {

    const [showOtpbox, setShowOtpbox] = useState<boolean>(false)
    const [loader, setLoader] = useState<boolean>(false)

    const deliveryOTP = sendDeliveryOTP()
    const verifyOTP = verifyDeliveryOTP()

    //send otp on mobile
    const handleSendOtp = () => {
        setLoader(true)
        deliveryOTP.mutate({
            URL: ROUTES.SEND_DELIVERY_OTP,
            payload: {
                orderId: currentorder?._id,
                shopOrderId: currentorder?.shopOrder?._id
            }
        }, {
            onSuccess: (data: any) => {
                toast.success(data?.message)
                setShowOtpbox(true)
                setLoader(false)
            },
            onError: (error: any) => {
                const errmsg = ErrorAxios(error)
                toast.error(errmsg)
                setLoader(false)
            }
        })

    }

    //verify otp
    const onVerify = (otp: any) => {
        console.log('otp', otp)
        verifyOTP.mutate({
            URL: ROUTES.VERYFIE_DELIVERY_OTP,
            payload: {
                orderId: currentorder?._id,
                shopOrderId: currentorder?.shopOrder?._id,
                OTP: otp
            }
        }, {
            onSuccess: (data: any) => {
                toast.success(data?.message)
                setShowOtpbox(false)
            },
            onError: (error: any) => {
                const errmsg = ErrorAxios(error)
                toast.error(errmsg)
            }
        })
    }

    //resend OTP
    const onResend = () => {
        handleSendOtp()
    }


    const onBack = () => {

    }


    console.log('currentorder deliverbosy', currentorder)

    return (
        <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-orange-100">
            <h2 className="text-lg font-bold">Current Order</h2>
            <div className="mb-4 flex flex-col  justify-between space-y-4" >

                <div className="rounded-2xl border border-orange-100 p-4">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <p className="truncate font-bold">
                                {currentorder?.shopOrder?.shopName || ''}
                            </p>
                            <p className="mt-0.5 flex items-start gap-1.5 text-sm text-gray-500">
                                <span className="mt-0.5 text-orange-500"><Pin /></span>
                                <span className="line-clamp-2">
                                    {currentorder?.deliveryAddress?.text}
                                </span>
                            </p>
                        </div>
                        <p className="text-xl font-extrabold">
                            ₹{currentorder?.shopOrder?.subTotal || 0}
                        </p>
                    </div>

                    <div className="w-full">
                        <ul className="oc-items">
                            {currentorder?.shopOrder?.shopOrderItems?.map((i, idx) => {
                                const name = i.name ?? "Item"
                                return (
                                    <OrderItem idx={idx} i={i} name={name} key={i.item} />
                                )
                            })}
                        </ul>
                    </div>
                </div>

                <DeliveryBoyTracking
                    currentorder={currentorder}
                />

                {
                    !showOtpbox ? <Button
                        btnColor="warning"
                        btnTxt={loader ? <LoaderSpin /> : "Mark as Delivered"}
                        type="button"
                        onClick={handleSendOtp}
                    /> :

                        <div className="w-full mt-4 relative flex flex-col justify-center items-center">
                            <h2 className="text-lg font-bold">User Details</h2>
                            <h3>{currentorder?.user?.fullname}</h3>

                            <VerifyOtpSection
                                data={currentorder?.user?.fullname}
                                onVerify={onVerify}
                                onResend={onResend}
                                onBack={onBack}
                                length={4}
                            />
                        </div>
                }

            </div>

        </section>
    )
}

export default CurrentOrderSection
