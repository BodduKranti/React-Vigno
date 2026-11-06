import NoitemShopfound from "../../components/NoitemShopfound"
import TrackShopOrderList from "./TrackShopOrderList"

interface getData {
    data: any
}

const TrackOrderSection = ({ data }: getData) => {
    return (
        <div className="w-full bg-white rounded-2xl ring-4 ring-orange-500">

            {
                data?.shopOrder?.length > 0 ?
                    <TrackShopOrderList
                        ShopOrderList={data?.shopOrder}
                        data={data}
                    /> :
                    <NoitemShopfound
                        message1="No Shop Order yet"
                        message2=""
                    />
            }

        </div>
    )
}

export default TrackOrderSection