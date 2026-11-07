import { useEffect } from "react"
import { useAppDispatch, useAppSelecter } from "../../Store/hook"
import { getOwnerOrder, getuserOrder } from "../../Store/StoreThunk/GetUserThunk"
import UserOrderCard from "./UserOrder/UserOrderCard"
import OwnerOrderCard from "./OwnerOrder/OwnerOrderCard"
import NoitemShopfound from "../../components/NoitemShopfound"
import PageTitleWithMetaDetails from "../../Layout/PageTileWithMeta"
import { ROLE_HOME } from "../../type"


const ViewOrdered = () => {
    const dispatch = useAppDispatch()
    const { order, role } = useAppSelecter((state) => state.userInfo)

    useEffect(() => {
        // dispatch(getuserOrder())
        if (role === 'user') {
            dispatch(getuserOrder())
        }
        if (role === 'owner') {
            dispatch(getOwnerOrder())
        }
    }, [dispatch, order, role])

    console.log('view order', order)
    return (
        <div className="cats max-w-[1600px] mx-auto">
            <h2>My Order</h2>

            {
                Array.isArray(order) && order?.length > 0 ? <>
                    {role === 'user' && <UserOrderCard />}
                    {role === 'owner' && <OwnerOrderCard />}
                </> :
                    <NoitemShopfound
                        message1="No orders here yet"
                        message2="Orders you place will show up in this list."
                        btnTxt={'Go Back'}
                        URL={ROLE_HOME[role]}
                    />
            }

        </div>
    )
}

export default PageTitleWithMetaDetails(ViewOrdered, 'My Order', '')