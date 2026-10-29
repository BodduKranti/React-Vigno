import { useEffect, useState } from "react"
import { AxiosGetolocation } from "../services"
import { useAppSelecter } from "../Store/hook"

const useCity = () => {

    const [city, setCity] = useState<string>('')
    const [state, setState] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const userData = useAppSelecter((state) => state.userInfo)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position?.coords?.latitude
            const longitude = position?.coords?.longitude

            const getCity = await AxiosGetolocation.get(`?lat=${latitude}&lon=${longitude}&format=json&apiKey=${import.meta.env.VITE_GEOLOCATION_API_KEY}`)
            setCity(getCity?.data?.results[0]?.city)
            setState(getCity?.data?.results[0]?.state)
            const mainAddress = `${getCity?.data?.results[0]?.address_line1}, ${getCity?.data?.results[0]?.address_line2}`;
            setAddress(mainAddress)
        })

    }, [userData])
    return ({ city, state, address })
}
export default useCity