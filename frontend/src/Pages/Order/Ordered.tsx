import { useNavigate, useSearchParams } from "react-router"
import PageTitleWithMetaDetails from "../../Layout/PageTileWithMeta"
import OrderConfirmation from "./OrderConfirmation"
import { useAppDispatch } from "../../Store/hook"
import { getuserOrder } from "../../Store/StoreThunk/GetUserThunk"

const Ordered = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    // const { orderid } = useParams<{ orderid: any }>()
    const [searchParams] = useSearchParams()
    const orderid = searchParams.get('orderid')


    return (
        <div className="cats max-w-[1600px] mx-auto">
            <OrderConfirmation
                orderId={orderid}
                onViewOrder={() => {
                    navigate('/view-order')
                    dispatch(getuserOrder())
                }}
                onContinue={() => navigate('/')} />
        </div>
    )
}

export default PageTitleWithMetaDetails(Ordered, 'Oreder', '')