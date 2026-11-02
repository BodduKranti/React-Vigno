import OwnerOrderCardItems from "./OwnerOrderCardItems"

interface OwnerOrder {
    order: any
}
const OwnerOrderCard = ({ order }: OwnerOrder) => {
    return (
        <div className="w-full">
            <p>{order?.length ?? 0} orders placed</p>
            {
                order?.map((list: any) => {
                    <OwnerOrderCardItems items={list} key={list?.id} />
                })
            }
        </div>
    )
}

export default OwnerOrderCard