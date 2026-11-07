import { IndianRupee } from 'lucide-react'
import LoaderSpin from '../../components/LoaderSpin'
import NoitemShopfound from '../../components/NoitemShopfound'
import { useGetApi } from '../../hooks/useAxiosServices'
import { ROUTES } from '../../type'
import TodayDeliveryOrderRecordsList from './TodayDeliveryOrderRecordsList'

const TodayDeliveryOrderRecords = () => {
    const { data, isLoading } = useGetApi(ROUTES.TODAY_DELIVERY)
    const totalEarnings = Array.isArray(data) && data?.reduce((sum, i) => sum + i.count * 50, 0)
    console.log(`TotalEarnings`, totalEarnings)
    return (
        <div className='w-full px-5 bg-white pt-8 pb-4 ring-1 mb-4 ring-orange-200 shadow-2xl rounded-2xl'>
            <div className='w-full md:flex grid gap-3 space-y-2 justify-between mb-4'>
                <h2 className="text-lg font-bold">Today Delivery Records</h2>
                <div className='w-auto flex mb-3 md:mb-0 px-4 bg-red-100 ring ring-orange-300 rounded-3xl py-1'>
                    <span>Total Earnings : </span> <span className='flex gap-1 items-center'><IndianRupee size={14} /> {totalEarnings}</span>
                </div>
            </div>

            {
                isLoading ?
                    <div className='w-full h-62.5 flex justify-center items-center'>
                        <LoaderSpin />
                    </div> :
                    Array.isArray(data) && data?.length === 0 ?
                        <NoitemShopfound
                            message1='No food items delivery yet'
                            message2='Please take any food delivery then you have to check how many food items delivery today!'
                        /> :
                        <TodayDeliveryOrderRecordsList data={data} />
            }
        </div>
    )
}

export default TodayDeliveryOrderRecords