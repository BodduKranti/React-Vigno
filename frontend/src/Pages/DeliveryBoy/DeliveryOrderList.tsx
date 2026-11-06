import { toast } from "react-toastify";
import { acceptAssignment } from "../../hooks/useShop"
import { ROUTES } from "../../type";
import DeliveryOrderItem from "./DeliveryOrderItem"
import { ErrorAxios } from "../../services/ErrorIntersects";
import { useGetApi } from "../../hooks/useAxiosServices";

const DeliveryOrderList = ({ availbleAssignments }: { availbleAssignments: any }) => {

    const acceptAssignmentOrder = acceptAssignment();
    // const [assignOrder, setAssignOrder] = useState<any>(true)
    // const { data: current } = getCurrentOrder()
    const { data } = useGetApi(`${ROUTES.GET_CURRENT_ORDER}`)

    const acptAssignOrder = (assignmentId: any) => {
        acceptAssignmentOrder.mutate({
            URL: `${ROUTES.DELIVERY_BOY_ACCEPT_ORDER}/${assignmentId}`,
            payload: {}
        }, {
            onSuccess: (data: any) => {
                toast.success(data?.message)
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