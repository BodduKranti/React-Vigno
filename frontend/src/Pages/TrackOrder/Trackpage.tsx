import { useEffect, useState } from "react"
import PageTitleWithMetaDetails from "../../Layout/PageTileWithMeta"
import { useSearchParams } from "react-router"
import { useGetApi } from "../../hooks/useAxiosServices"
import { ROUTES } from "../../type"
import LoaderSpin from "../../components/LoaderSpin"
import TrackOrderSection from "./TrackOrderSection"
import { useAppDispatch, useAppSelecter } from "../../Store/hook"
import { setDeliveryBoyLocation } from "../../Store/Reducer/DeliveryBoyLiveLocation/DeliveryBoyLiveLocation"

const Trackpage = () => {
    // /getOrderByID/
    const dispatch = useAppDispatch()
    const [useorderId, setUseOrderId] = useState<any>(null)
    const [searchParams] = useSearchParams()
    const orderId = searchParams.get('orderid')
    const { socket, userData } = useAppSelecter((state) => state.userInfo)

    const { data: userOrder, isLoading } = useGetApi(`${ROUTES.GET_USER_ORDER_BY_ID}/${orderId}`, undefined, !!useorderId)

    useEffect(() => {
        setUseOrderId(orderId)
    }, [orderId])


    useEffect(() => {
        socket?.on("locationUpdated", (data: any) => {
            console.log('locationUpdated ', data)
            console.log('locationUpdated userOrder', userOrder)

            setUseOrderId(orderId)
            dispatch(setDeliveryBoyLocation({ deliveryuserId: data?.deliveryuserId, lat: data.latitude, lon: data.longitude }))
        })

        return () => {
            if (socket) {
                socket.off("locationUpdated")
            }
        }
    }, [socket, userData, dispatch, userOrder])


    return (
        <div className="cats max-w-[1600px] mx-auto">
            <h2>Track Order</h2>
            {
                isLoading ?
                    <div className="w-full h-50 border border-orange-500 rounded-2xl flex justify-center items-center">
                        <LoaderSpin />
                    </div> :
                    <div className="w-full">
                        <TrackOrderSection
                            data={userOrder}
                        />
                    </div>
            }
        </div>

    )
}

export default PageTitleWithMetaDetails(Trackpage, 'Track Order', '')