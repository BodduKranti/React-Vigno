import NoitemShopfound from "../../components/NoitemShopfound"
import { useGetApi } from "../../hooks/useAxiosServices"
import { getAssignments } from "../../hooks/useShop"
import { ROUTES } from "../../type"
import DeliveryOrderList from "./DeliveryOrderList"
import CurrentOrderSection from "./CurrentOrderSection"
import { useEffect } from "react"
import { useAppSelecter } from "../../Store/hook"

const DeliveryBoyOrdersection = () => {
    const { socket, userData } = useAppSelecter((state) => state.userInfo)
    const { data, refetch } = getAssignments()
    const availbleAssignments = Array.isArray(data) && data || []
    // const { data: current } = getCurrentOrder()
    const { data: currentorder }: any = useGetApi(`${ROUTES.GET_CURRENT_ORDER}`)

    useEffect(() => {
        socket?.on("newDeliveryAssignment", (data: any) => {
            console.log('new order', data)
            if (data?.sentTo === userData?.id) {
                refetch()
            }
        })

        return () => {
            socket?.off("newDeliveryAssignment")
        }
    }, [])

    return (
        <div className="w-full">

            {
                currentorder ?
                    <CurrentOrderSection
                        currentorder={currentorder}
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
                                <DeliveryOrderList availbleAssignments={availbleAssignments} />
                        }
                    </section>

            }


        </div>
    )
}

export default DeliveryBoyOrdersection