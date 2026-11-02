import OwnerOrderCardItems from "./OwnerOrderCardItems"
import "./OwnerOrderCard.css"

interface OwnerOrder {
    order: any
}
const OwnerOrderCard = ({ order }: OwnerOrder) => {
    return (
        <div className="w-full space-y-4  ">
            <p>{order?.length ?? 0} orders placed</p>
            <div className="w-full grid grid-cols-1 md:grid-cols-1 space-y-4 gap-3">
                {
                    order?.map((list: any) => {
                        return <OwnerOrderCardItems items={list} key={list?.id} />
                    })
                }
            </div>

        </div>
    )
}

export default OwnerOrderCard