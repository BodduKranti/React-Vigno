import OwnerOrderCardItems from "./OwnerOrderCardItems"
import "./OwnerOrderCard.css"
import { useAppDispatch, useAppSelecter } from "../../../Store/hook"
import NoitemShopfound from "../../../components/NoitemShopfound"
import React, { useEffect } from "react"
import { setMyOrder } from "../../../Store/Reducer/AuthSlice/UserSlice"
import { getOwnerOrder } from "../../../Store/StoreThunk/GetUserThunk"



const OwnerOrderCard = () => {
    const { order, socket, userData } = useAppSelecter((state) => state.userInfo)
    const dispatch = useAppDispatch()
    // riders keyed by "orderId-shopId"
    useEffect(() => {
        if (socket) {
            socket.on('newOrder', (data: any) => {
                if (data?.shopOrder?.owner?._id === userData?._id) {
                    dispatch(setMyOrder([data, ...order]))
                    dispatch(getOwnerOrder())
                }
            })
        }

        return () => {
            if (socket) {
                socket.off('newOrder')
                socket.off('updateStatus')
            }
        }
    }, [socket])

    return (
        order?.length == 0 ?
            <NoitemShopfound
                message1="No orders here yet"
                message2="Orders you place will show up in this list."
                btnTxt={'Continue food order'}
                URL="/"
            /> :

            <div className="w-full space-y-4">
                <p>{order?.length ?? 0} orders placed</p>
                <div className="w-full grid grid-cols-1 gap-3">
                    {order?.map((list: any, index) => (
                        <React.Fragment key={index}>
                            <OwnerOrderCardItems
                                items={list}
                                key={list?._id}
                            />
                        </React.Fragment>

                    ))}
                </div>
            </div>
    )
}

export default OwnerOrderCard