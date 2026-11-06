import NoitemShopfound from "../../components/NoitemShopfound"
import { useGetApi } from "../../hooks/useAxiosServices"
import { getAssignments } from "../../hooks/useShop"
import { ROUTES } from "../../type"
import DeliveryOrderList from "./DeliveryOrderList"
import CurrentOrderSection from "./CurrentOrderSection"
import { useEffect, useState } from "react"
import { useAppSelecter } from "../../Store/hook"

const DeliveryBoyOrdersection = () => {
    const { socket, userData, } = useAppSelecter((state) => state.userInfo)
    const { data, refetch } = getAssignments()
    const availbleAssignments = Array.isArray(data) && data || []
    const [noCurrentOrder, setNoCurrentOrder] = useState(true)
    // const { data: current } = getCurrentOrder()
    const { data: currentorder, isError, refetch: refetchCurrentOrder }: any = useGetApi(`${ROUTES.GET_CURRENT_ORDER}`, undefined, noCurrentOrder)



    useEffect(() => {

        if (isError) {
            setNoCurrentOrder(false)
        }
        console.log('isError', isError)
    }, [isError])



    useEffect(() => {
        if (!socket || userData?.role !== "deliveryboy") {
            return
        }
        let watch: any = null;
        if (navigator.geolocation) {
            watch = navigator.geolocation.watchPosition(position => {
                const { latitude, longitude } = position.coords
                socket.emit("updateLocation", {
                    userId: userData?._id,
                    longitude,
                    latitude
                })
            }), (error: any) => {
                console.error("Error getting location:", error)
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        }


        return () => {
            if (watch && navigator.geolocation) {
                navigator.geolocation.clearWatch(watch)
            }
        }
    }, [socket, userData?.id, userData?.role])

    useEffect(() => {
        socket?.on("newDeliveryAssignment", (data: any) => {
            console.log('new order', data)
            if (data?.sentTo === userData?.id) {
                refetch()
                refetchCurrentOrder()
            }
        })

        return () => {
            socket?.off("newDeliveryAssignment")
        }
    }, [socket])

    console.log('currentorder', currentorder)

    return (
        <div className="w-full">

            {
                !isError && currentorder ?
                    <CurrentOrderSection
                        currentorder={currentorder}
                        refetchCurrentOrder={refetchCurrentOrder}
                        refetchAvailableOrders={refetch}
                    />
                    :
                    <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-orange-100">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-bold">Available Orders</h2>
                            <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-500">
                                {
                                    availbleAssignments.length || 0
                                }
                            </span>
                        </div>

                        {
                            availbleAssignments.length === 0 ?
                                <NoitemShopfound
                                    icon={<div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-2xl">🛵</div>}
                                    message1="No available orders"
                                    message2="New orders near you will show up here."
                                /> :
                                <DeliveryOrderList availbleAssignments={availbleAssignments} refetch={refetch} />
                        }
                    </section>

            }


        </div>
    )
}

export default DeliveryBoyOrdersection