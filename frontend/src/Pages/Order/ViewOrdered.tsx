import { useEffect } from "react"
import { useAppDispatch, useAppSelecter } from "../../Store/hook"
import { getOwnerOrder, getuserOrder } from "../../Store/StoreThunk/GetUserThunk"
import UserOrderCard from "./UserOrder/UserOrderCard"
import OwnerOrderCard from "./OwnerOrder/OwnerOrderCard"
import NoitemShopfound from "../../components/NoitemShopfound"
import './ViewOrderlist.css'

const ViewOrdered = () => {
    const dispatch = useAppDispatch()
    const { order, role } = useAppSelecter((state) => state.userInfo)
    console.log('order', order)

    useEffect(() => {
        // dispatch(getuserOrder())
        if (role === 'user') {
            dispatch(getuserOrder())
        }
        if (role === 'owner') {
            dispatch(getOwnerOrder())
        }
    }, [dispatch])
    return (
        <div className="cats max-w-[1600px] mx-auto">
            <h2>My Order</h2>

            {
                Array.isArray(order) && order?.length > 0 ? <>
                    {role === 'user' && <UserOrderCard order={order} />}
                    {role === 'owner' && <OwnerOrderCard order={order} />}
                </> :
                    <NoitemShopfound
                        message1="No orders here yet"
                        message2="Orders you place will show up in this list."
                        btnTxt={'Continue food order'}
                        URL="/"
                    />
            }

        </div>
    )
}

export default ViewOrdered