import { MapPin, Search } from 'lucide-react';
import { useState } from 'react'
import { useAuthContext } from '../../utils/ContextApi';
import useCity from '../../hooks/useCity';

const CurrentLocation = () => {
    const { city } = useCity()
    // const [location, setLocation] = useState<string>('Hyderabad')
    const { dropdownRef } = useAuthContext()
    const [search, setSearch] = useState("");

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const query = search.trim();
        if (!query) return;

        window.location.href = `/restaurants?search=${encodeURIComponent(query)}`;
    };

    return (
        <>

            {/* Location dropdown */}
            <div className="relative shrink-0 hidden lg:block" ref={dropdownRef}>
                <button
                    type="button"
                    // onClick={() => setOpen((prev) => !prev)}
                    className="flex items-center gap-2 rounded-full bg-gray-50 px-4 py-3 text-sm font-medium text-gray-800 transition hover:bg-orange-50"
                // aria-expanded={open}
                >
                    <MapPin size={20} className="text-orange-500" />
                    <span>{city ?? 'loading...'}</span>
                    {/* <ChevronDown size={16} /> */}
                </button>

                {/* {open && (
                    <div className="absolute left-0 top-full mt-3 w-64 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl">
                        <p className="mb-3 text-sm font-semibold text-gray-900">
                            Choose your location
                        </p>
                        <div
                            className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-orange-50 hover:text-orange-600 ${location === city
                                ? "bg-orange-50 font-semibold text-orange-600"
                                : "text-gray-700"
                                }`}
                        >
                            {city ?? ''}
                        </div>

                        {["Hyderabad", "Bengaluru", "Chennai", "Mumbai"].map(
                            (city) => (
                                <button
                                    type="button"
                                    key={city}
                                    onClick={() => {
                                        setLocation(city);
                                    }}
                                    className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-orange-50 hover:text-orange-600 ${location === city
                                        ? "bg-orange-50 font-semibold text-orange-600"
                                        : "text-gray-700"
                                        }`}
                                >
                                    {city}
                                </button>
                            )
                        )}
                    </div>
                )} */}
            </div>

            {/* Search */}
            <form
                onSubmit={handleSearch}
                className="hidden lg:flex min-w-45 flex-1 items-center overflow-hidden rounded-full border border-gray-200 bg-white transition focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100"
            >
                <Search size={21} className="ml-4 shrink-0 text-gray-500" />

                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search restaurants, cuisines or dishes..."
                    aria-label="Search restaurants, cuisines or dishes"
                    className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                />

                <button
                    type="submit"
                    className="bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                    Search
                </button>
            </form>

            {/* Mobile location */}
            <button
                type="button"
                // onClick={() => setOpen(!open)}
                className="mt-3 flex lg:hidden items-center gap-2 text-sm text-gray-600"
            >
                <MapPin size={17} className="text-orange-500" />
                <span>Deliver to:</span>
                <span className="font-semibold text-gray-900">{city ?? 'loading...'}</span>
                {/* <ChevronDown size={15} /> */}
            </button>

            {/* {open && (
                <div className="mt-2 rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
                    {["Hyderabad", "Bengaluru", "Chennai", "Mumbai"].map(
                        (city) => (
                            <button
                                key={city}
                                type="button"
                                onClick={() => {
                                    setLocation(city);
                                    setLocationOpen(false);
                                }}
                                className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-orange-50"
                            >
                                {city}
                            </button>
                        )
                    )}
                </div>
            )} */}

            {/* Mobile search */}
            <form
                onSubmit={handleSearch}
                className="mt-3 flex lg:hidden items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 focus-within:border-orange-400"
            >
                <Search size={20} className="ml-3 shrink-0 text-gray-500" />
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search food, restaurants..."
                    aria-label="Search food and restaurants"
                    className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none"
                />
                <button
                    type="submit"
                    aria-label="Search"
                    className="bg-orange-500 px-4 py-3 text-white hover:bg-orange-600"
                >
                    <Search size={19} />
                </button>
            </form>

        </>
    )
}

export default CurrentLocation