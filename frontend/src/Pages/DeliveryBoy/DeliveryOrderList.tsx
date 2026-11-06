import { toast } from "react-toastify";
import { acceptAssignment } from "../../hooks/useShop"
import { ROUTES } from "../../type";
import DeliveryOrderItem from "./DeliveryOrderItem"
import { ErrorAxios } from "../../services/ErrorIntersects";

const DeliveryOrderList = ({ availbleAssignments, refetch }: { availbleAssignments: any, refetch: () => void }) => {

    const acceptAssignmentOrder = acceptAssignment();

    const acptAssignOrder = (assignmentId: any) => {
        acceptAssignmentOrder.mutate({
            URL: `${ROUTES.DELIVERY_BOY_ACCEPT_ORDER}/${assignmentId}`,
            payload: {}
        }, {
            onSuccess: (data: any) => {
                toast.success(data?.message)
                refetch()
                // setAssignOrder(true)
            },
            onError: (error: any) => {
                const err = ErrorAxios(error)
                toast.error(err)
            }
        })
    }


    return (
        <div className="w-full">
            <ul className="space-y-3">
                {
                    availbleAssignments?.map((list: any) => {
                        return <DeliveryOrderItem o={{ ...list }} acptAssignOrder={acptAssignOrder} />
                    })
                }
            </ul>
        </div>
    )
}

export default DeliveryOrderList