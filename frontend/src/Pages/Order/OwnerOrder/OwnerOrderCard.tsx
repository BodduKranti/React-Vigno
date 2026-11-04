import OwnerOrderCardItems from "./OwnerOrderCardItems"
import "./OwnerOrderCard.css"
import { useAppSelecter } from "../../../Store/hook"
import NoitemShopfound from "../../../components/NoitemShopfound"



const OwnerOrderCard = () => {
    const { order } = useAppSelecter((state) => state.userInfo)
    // riders keyed by "orderId-shopId"


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
                    {order?.map((list: any) => (
                        <OwnerOrderCardItems
                            items={list}
                            key={list?._id}
                        // onStatusChange={orderStatus}
                        // availbleBoys={availbleBoys[`${list?._id}-${list?.shopOrder?.shop?._id}`] ?? []}
                        />
                    ))}
                </div>
            </div>
    )
}

export default OwnerOrderCard