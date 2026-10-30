import { useNavigate } from "react-router"
import Button from "./field/Button"

interface Noproductitemsprops {
    icon?: any,
    message1: string,
    message2: string,
    btnTxt?: any,
    URL?: string
}
const NoitemShopfound = ({ icon, message1, message2, btnTxt, URL }: Noproductitemsprops) => {
    const Navigate = useNavigate()
    return (
        <div className="w-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-orange-200 bg-orange-50/50 px-6 py-16 text-center">
            {icon &&
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
                    {/* <UtensilsCrossed size={36} strokeWidth={1.5} className="text-orange-500" /> */}
                    {icon}
                </div>}
            {message1 && <p className="text-lg font-semibold text-gray-900">{message1}</p>}
            {message2 && <p className="mt-1 text-sm text-gray-500">{message2}</p>}
            {
                btnTxt && <div className="w-full flex justify-center mt-3">
                    <Button
                        btnTxt={btnTxt}
                        type="button"
                        onClick={() => Navigate(`${URL}`)}
                        btnColor="warning"
                        className={`min-w-30`}
                    />
                </div>
            }

        </div>
    )
}

export default NoitemShopfound