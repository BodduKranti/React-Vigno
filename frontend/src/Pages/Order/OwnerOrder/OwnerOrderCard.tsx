import OwnerOrderCardItems from "./OwnerOrderCardItems"
import "./OwnerOrderCard.css"
import { ROUTES, type Status } from "../../../type"
import { ShopOrderStatus } from "../../../hooks/useShop"
import { toast } from "react-toastify"
import { ErrorAxios } from "../../../services/ErrorIntersects"
import { useAppDispatch } from "../../../Store/hook"
import { getOwnerOrder } from "../../../Store/StoreThunk/GetUserThunk"

interface OwnerOrder {
    order: any,
}
const OwnerOrderCard = ({ order }: OwnerOrder) => {
    const dispatch = useAppDispatch()

    const orderStatusChangefun = ShopOrderStatus();

    const orderStatusChange = async (
        orderId: string,
        shopId: string,
        status: Status
    ) => {
        orderStatusChangefun.mutate(
            {
                URL: `${ROUTES.ORDERED_STATUS}/${orderId}/${shopId}`,
                payload: { status }
            },
            {
                onSuccess: async () => {
                    toast.success("Order status changed successfully!");
                    dispatch(getOwnerOrder()).unwrap();

                },

                onError: (error: any) => {
                    const errMsg = ErrorAxios(error);
                    toast.error(errMsg);
                }
            }
        );
    };

    return (
        <div className="w-full space-y-4  ">
            <p>{order?.length ?? 0} orders placed</p>
            <div className="w-full grid grid-cols-1 md:grid-cols-1 space-y-4 gap-3">
                {
                    order?.map((list: any) => {
                        return <OwnerOrderCardItems
                            items={list}
                            key={list?.id}
                            onStatusChange={orderStatusChange}
                        />
                    })
                }
            </div>

        </div>
    )
}

export default OwnerOrderCard