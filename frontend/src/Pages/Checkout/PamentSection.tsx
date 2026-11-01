import { useState } from "react"
import { FaRegCreditCard } from "react-icons/fa"
import { MdDeliveryDining, MdOutlineQrCodeScanner } from "react-icons/md"

// import { useAppSelecter } from "../../Store/hook"
const paymentMethod = [
    {
        paymentmode: 'cod',
        name: 'COD',
        icon: <MdDeliveryDining size={20} />,
        children: <>COD</>
    },
    {
        paymentmode: 'upi',
        name: 'UPI',
        icon: <MdOutlineQrCodeScanner size={20} />,
        children: <>UPI</>
    },
    ,
    {
        paymentmode: 'card',
        name: 'CARD',
        icon: <FaRegCreditCard size={20} />,
        children: <>CARD</>
    }
]

const PamentSection = () => {
    // const { location, address } = useAppSelecter((state) => state.map)
    const [payment, setPayment] = useState<string>('cod')
    return (
        <section className="mt-4">
            <h2>Payment Method</h2>
            <div className="grid grid-cols-3 gap-3">

                {
                    paymentMethod?.map((p) => (<>
                        <div
                            onClick={() => setPayment(p?.paymentmode!)}
                            className={`w-full border border-gray-600 
                                ${payment === p?.paymentmode ? 'bg-orange-500 text-white border-orange-500' : ''} 
                                flex justify-center gap-2 items-center py-2 px-4 rounded-3xl`}>
                            <span>{p?.icon}</span>
                            <label>{p?.name}</label>
                        </div>
                    </>
                    ))
                }


            </div>

            {
                paymentMethod?.map((p) => p?.paymentmode === payment && p.children)
            }


        </section>
    )
}

export default PamentSection