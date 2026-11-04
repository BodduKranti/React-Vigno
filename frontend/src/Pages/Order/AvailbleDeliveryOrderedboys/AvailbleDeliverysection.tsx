import AvailbleDeliveryitem from "./AvailbleDeliveryitem"

const AvailbleDeliverysection = ({ boysData }: { boysData: any }) => {
    console.log('availbleBoys', boysData)

    return (
        <div className="w-full bg-[#FFF3EC] rounded-2xl p-7 space-y-4">
            <div className="w-full flex justify-between">
                <div className="w-auto">
                    <h3 className="font-semibold">Available delivery partners</h3>
                    <p className="text-xs">Pick who should deliver this order.</p>
                </div>
                <div className="w-auto">
                    <span className="border border-[#ffe0d0] text-[#ff7a45] 
                    font-semibold rounded-2xl py-2 px-3 text-xs flex justify-center items-center bg-white">
                        {boysData?.length} Near by you
                    </span>
                </div>
            </div>

            <ul className="w-full space-y-2 ">
                {
                    boysData?.map((list: any) => {
                        return <AvailbleDeliveryitem boy={{
                            fullName: list?.fullName,
                            id: list?.id,
                            latitude: Number(list?.latitude),
                            longitude: Number(list?.longitude),
                            mobile: list?.mobile
                        }} />
                    })
                }
            </ul>

        </div>
    )
}

export default AvailbleDeliverysection