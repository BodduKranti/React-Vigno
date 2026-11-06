import { useEffect, useMemo } from "react"
import UserOrderCardItem from "./UserOrderCardItem"
import '../ViewOrderlist.css'
import { useAppDispatch, useAppSelecter } from "../../../Store/hook"
import { updateRealtimeorderStatus } from "../../../Store/Reducer/AuthSlice/UserSlice"


const UserOrderCard = () => {

    const { order, socket, userData } = useAppSelecter((state) => state.userInfo)
    const dispatch = useAppDispatch()
    const list = useMemo(() => {
        const all = order ?? []
        return all
        // if (filter === "all") return all
        // return all.filter((o) =>
        //     o.shopOrder.some((s) =>
        //         filter === "active" ? isActive(s.status) : s.status === filter
        //     )
        // )
    }, [order])

    useEffect(() => {

        if (socket) {
            socket.on('updateStatus', (data: any) => {

                const { orderId, shopId, status, userId } = data
                if (userId === userData?._id) {
                    dispatch(updateRealtimeorderStatus({ orderId, shopId, status, userId }))
                }
            })

            return () => {
                if (socket) {
                    socket.off('newOrder')
                    socket.off('updateStatus')
                }
            }
        }



    }, [socket, order])


    return (
        <div className="w-full">
            <p>{list?.length ?? 0} orders placed</p>
            <ul className="ov-list mt-4 grid grid-cols-1 md:grid-cols-2">
                {
                    list?.map((items: any) => {
                        return <UserOrderCardItem items={items} key={items?._id} />
                    })
                }
            </ul>

        </div>
    )
}

export default UserOrderCard