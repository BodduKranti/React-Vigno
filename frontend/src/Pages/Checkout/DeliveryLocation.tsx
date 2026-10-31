import { MapPin, Search } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { MdMyLocation } from 'react-icons/md'
import { useAppDispatch, useAppSelecter } from '../../Store/hook'
import Map from '../../components/Map/Map'
import LoaderSpin from '../../components/LoaderSpin'
import { setLocation } from '../../Store/Reducer/MapSlice/MapSlice'
import { MapAddressThunkController } from '../../Store/StoreThunk/MapAddressThunk'

const DeliveryLocation = () => {
    const dispatch = useAppDispatch()
    const { location, address } = useAppSelecter((state) => state.map)
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        setSearch(address ?? '')
    }, [address])

    // ✅ Hooks first, before any conditional return
    const currentPositiong = useCallback(() => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported')
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const currentLocation = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                }
                dispatch(setLocation(currentLocation))
                dispatch(MapAddressThunkController(currentLocation))
            },
            (error) => console.error('Location error:', error.message),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        )
    }, [dispatch])

    // ✅ Early return only after all hooks
    if (!location || !address) {
        return (
            <div className="w-full flex justify-center items-center">
                <LoaderSpin />
            </div>
        )
    }


    return (
        location && address &&
        <div className='w-full'>
            <h5 className='flex gap-2 items-center'>
                <MapPin size={15} className={'text-orange-500'} />
                Delivery Location
            </h5>
            <div
                className="mt-3 flex items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 focus-within:border-orange-400"
            >
                <Search size={20} className="ml-3 shrink-0 text-gray-500" />
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Current location..."
                    aria-label="Current location"
                    className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none"
                />
                <button
                    type="submit"
                    aria-label="Search"
                    className="bg-orange-500 border-r border-r-orange-800 px-4 py-3 text-white hover:bg-orange-600"
                >
                    <Search size={19} />
                </button>
                <button
                    type="button"
                    aria-label="Current Location"
                    onClick={currentPositiong}
                    className="bg-orange-500 px-4 py-3 text-white hover:bg-orange-600"
                >
                    <MdMyLocation size={19} />
                </button>
            </div>


            {/* Map */}
            <Map
                location={{ lat: location?.lat!, lon: location?.lon! }}
            />

        </div>
    )
}

export default DeliveryLocation