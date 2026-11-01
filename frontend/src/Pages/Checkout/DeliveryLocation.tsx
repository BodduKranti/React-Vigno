import { MapPin, Search } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { MdMyLocation } from 'react-icons/md'
import { useAppDispatch, useAppSelecter } from '../../Store/hook'
import Map from '../../components/Map/Map'
import LoaderSpin from '../../components/LoaderSpin'
import { setLocation } from '../../Store/Reducer/MapSlice/MapSlice'
import { MapAddressThunkController, maplocationSearchthunkController } from '../../Store/StoreThunk/MapAddressThunk'

const DeliveryLocation = () => {
    const dispatch = useAppDispatch()
    const { location, address, searhlist } = useAppSelecter((state) => state.map)
    const [search, setSearch] = useState<string>('')
    const searchList = Array.isArray(searhlist)! && searhlist || []
    const debounceRef = useRef<any>(null)
    const handleSearch = (e: any) => {
        const values = e.target.value
        setSearch(values)

        // clear time out
        clearTimeout(debounceRef.current)

        const q = values.trim()
        console.log('q', q)
        if (q.length < 3) return

        debounceRef.current = setTimeout(() => {
            dispatch(maplocationSearchthunkController(q))
        }, 400)

    }

    // search list select address
    const selectAddress = (listSrch: any) => {
        setSearch(listSrch?.address ?? '')
        const currentLocation = {
            lat: listSrch?.lat,
            lon: listSrch?.lon,
        }
        dispatch(setLocation(currentLocation))
        dispatch(MapAddressThunkController(currentLocation))
        dispatch(maplocationSearchthunkController(''))
    }

    useEffect(() => {
        setSearch(address ?? '')
    }, [address])

    useEffect(() => {
        if (search.length < 3) {
            dispatch(maplocationSearchthunkController(''))
        }
    }, [search])

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
            <div className='w-full'>
                <div
                    className="mt-3 flex items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 focus-within:border-orange-400"
                >
                    <Search size={20} className="ml-3 shrink-0 text-gray-500" />
                    <input
                        type="search"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Current location more than 3 character..."
                        aria-label="Current location"
                        className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none"
                    />
                    {/* <button
                        type="submit"
                        aria-label="Search"
                        className="bg-orange-500 border-r border-r-orange-800 px-4 py-3 text-white hover:bg-orange-600"
                    >
                        <Search size={19} />
                    </button> */}
                    <button
                        type="button"
                        aria-label="Current Location"
                        onClick={currentPositiong}
                        className="bg-orange-500 px-4 py-3 text-white hover:bg-orange-600"
                    >
                        <MdMyLocation size={19} />
                    </button>
                </div>

                {/* Search text after three charactors then only its shows */}
                {
                    searchList.length > 0 &&

                    <div className='w-full border border-orange-400 rounded-4xl space-y-2 mt-3 bg-[rgba(255,255,255.5)]'>
                        {
                            searchList?.map((list: any) => list.properties).map((item) => {
                                let address = `${item?.address_line1}, ${item?.address_line2}`
                                let getAddress = {
                                    address,
                                    lat: item?.lat,
                                    lon: item?.lon
                                }
                                return (
                                    <div
                                        onClick={() => selectAddress(getAddress)}
                                        className="w-full px-4 first:mt-4 last:mb-4 cursor-pointer hover:text-orange-500">
                                        {address}
                                    </div>
                                )
                            })
                        }

                    </div>
                }
            </div>


            {/* Map */}
            <Map
                location={{ lat: location?.lat!, lon: location?.lon! }}
            />

        </div>
    )
}

export default DeliveryLocation