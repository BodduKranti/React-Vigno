import { useEffect, useState } from "react"
import PageTitleWithMetaDetails from "../../Layout/PageTileWithMeta"
import { useSearchParams } from "react-router"
import { useGetApi } from "../../hooks/useAxiosServices"
import { ROUTES } from "../../type"
import LoaderSpin from "../../components/LoaderSpin"
import TrackOrderSection from "./TrackOrderSection"

const Trackpage = () => {
    // /getOrderByID/

    const [useorderId, setUseOrderId] = useState<any>(null)
    const [searchParams] = useSearchParams()
    const orderId = searchParams.get('orderId')

    const { data, isLoading } = useGetApi(`${ROUTES.GET_USER_ORDER_BY_ID}/${orderId}`, undefined, !!useorderId)

    useEffect(() => {
        setUseOrderId(orderId)
    }, [orderId])
    return (
        <div className="cats max-w-[1600px] mx-auto">
            <h2>Track Order</h2>
            {
                isLoading ?
                    <div className="w-full h-50 border border-orange-500 rounded-2xl flex justify-center items-center">
                        <LoaderSpin />
                    </div> :
                    <div className="w-full">
                        <TrackOrderSection
                            data={data}
                        />
                    </div>
            }
        </div>

    )
}

export default PageTitleWithMetaDetails(Trackpage, 'Track Order', '')