interface info {
    city: string,
    name: string,
    address: string
}

interface details {
    shop: info
}

const RestaurantInfo = ({ shop }: details) => {
    return <div className="w-full">
        {/* Info card overlapping the hero */}
        <div className="relative -mt-16 rounded-3xl border border-orange-100 bg-white p-5 shadow-lg sm:-mt-20 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                    <h1 className="text-2xl font-extrabold text-zinc-900 sm:text-3xl">{shop.name}</h1>
                    {/* {shop.cuisines && <p className="mt-1 text-sm text-zinc-500">{shop.cuisines.join(' • ')}</p>} */}
                    <p className="mt-1 text-sm text-zinc-500">📍{shop.city} {shop.address}</p>
                </div>
                {/* {shop.rating !== undefined && (
                    <div className="rounded-2xl bg-green-600 px-3 py-2 text-center text-white">
                        <p className="text-lg font-bold leading-none">★ {shop.rating.toFixed(1)}</p>
                        {shop.reviews !== undefined && <p className="mt-1 text-[11px] opacity-90">{shop.reviews}+ ratings</p>}
                    </div>
                )} */}
            </div>

            {/* <div className="mt-5 flex flex-wrap gap-2 text-sm">
                {shop.isOpen !== undefined && (
                    <span className={`rounded-full px-3 py-1 font-medium ${shop.isOpen ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                        ● {shop.isOpen ? 'Open now' : 'Closed'}
                    </span>
                )}
                {shop.deliveryTime && <span className="rounded-full bg-orange-50 px-3 py-1 font-medium text-orange-800">🛵 {shop.deliveryTime}</span>}
                {shop.costForTwo !== undefined && <span className="rounded-full bg-orange-50 px-3 py-1 font-medium text-orange-800">{inr(shop.costForTwo)} for two</span>}
            </div> */}
        </div>
    </div>
}

export default RestaurantInfo