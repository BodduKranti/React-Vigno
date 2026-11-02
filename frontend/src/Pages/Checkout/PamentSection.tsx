import { useState } from "react"
import { MdDeliveryDining, MdOutlineQrCodeScanner } from "react-icons/md"
import { useAppDispatch } from "../../Store/hook"
import { setPaymentMothod } from "../../Store/Reducer/ShopSlice/ShopSlice"

// import { useAppSelecter } from "../../Store/hook"
const paymentMethod = [
    {
        paymentmode: 'cod',
        name: 'Cash On Delivery',
        icon: <MdDeliveryDining size={30} />,
        children: <>COD</>
    },
    {
        paymentmode: 'online',
        name: 'UPI/Debit Card/Credit Card',
        icon: <MdOutlineQrCodeScanner size={30} />,
        children: <>UPI</>
    },
    // ,
    // {
    //     paymentmode: 'card',
    //     name: 'CARD',
    //     icon: <FaRegCreditCard size={20} />,
    //     children: <>CARD</>
    // }
]

const PamentSection = () => {
    const dispatch = useAppDispatch()
    // const { location, address } = useAppSelecter((state) => state.map)
    const [payment, setPayment] = useState<string>('cod')
    return (
        <section className="mt-4">
            <h2>Payment Method</h2>
            <div className="grid grid-cols-1 md:flex flex-1 gap-3 ">

                {
                    paymentMethod?.map((p) => (<>
                        <div
                            onClick={() => {
                                setPayment(p?.paymentmode!)
                                dispatch(setPaymentMothod(p?.paymentmode!))
                            }}
                            className={`w-full border border-gray-600 
                                ${payment === p?.paymentmode ? 'bg-orange-500 text-white border-orange-500' : ''} 
                                 py-2 px-4 rounded-3xl`}>
                            <div className="flex  gap-2 items-center">
                                <span className="w-12.5 h-12.5 bg-white flex justify-center items-center text-orange-500 border border-orange-500 rounded-full">{p?.icon}</span>
                                <div className="w-auto">
                                    <label>{p?.name}</label>
                                    {
                                        p?.paymentmode === 'cod' && <div className={`text-xs text-gray-600 ${p?.paymentmode === 'cod' && payment === p?.paymentmode ? 'text-white' : 'text-gray-600'} flex flex-col   w-full`}>
                                            <p>Pay when food arrives</p>
                                        </div>
                                    }

                                    {
                                        p?.paymentmode === 'online' &&
                                        <div className={`text-xs text-gray-600 ${p?.paymentmode === 'online' && payment === p?.paymentmode ? 'text-white' : 'text-gray-600'} flex flex-col   w-full`}>
                                            <p>Pay Secury</p>
                                        </div>
                                    }
                                </div>

                            </div>



                            {/* {
                                p?.paymentmode === 'card' && <div className={`text-xs  ${p?.paymentmode === 'card' && payment === p?.paymentmode ? 'text-white' : 'text-gray-600'} flex flex-col   w-full`}>
                                    <p>Pay online</p>
                                    <p>Pay Secury</p>
                                </div>
                            } */}
                        </div>
                    </>
                    ))
                }


            </div>
            {/* 
            {
                paymentMethod?.map((p) => p?.paymentmode === payment && p.children)
            } */}


        </section>
    )
}

export default PamentSection