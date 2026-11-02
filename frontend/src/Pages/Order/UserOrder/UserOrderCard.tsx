import { useMemo } from "react"
import UserOrderCardItem from "./UserOrderCardItem"
import '../ViewOrderlist.css'
interface userOrderList {
    order: any
}

const UserOrderCard = ({ order }: userOrderList) => {

    const list = useMemo(() => {
        const all = order ?? []
        return all
        // if (filter === "all") return all
        // return all.filter((o) =>
        //     o.shopOrder.some((s) =>
        //         filter === "active" ? isActive(s.status) : s.status === filter
        //     )
        // )
    }, [order])
    return (
        <div className="w-full">
            <p>{list?.length ?? 0} orders placed</p>
            <ul className="ov-list mt-4 grid grid-cols-1 md:grid-cols-2">
                {
                    list?.map((items: any) => {
                        return <UserOrderCardItem items={items} key={items?._id} />
                    })
                }
            </ul>

        </div>
    )
}

export default UserOrderCard