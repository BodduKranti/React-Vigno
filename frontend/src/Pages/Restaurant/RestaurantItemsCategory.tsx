import type { Dispatch, SetStateAction } from "react"

interface categoryprops {
    categories: any[]
}
interface props extends categoryprops {
    category: string,
    setCategory: Dispatch<SetStateAction<any>>,
    vegOnly: boolean,
    setVegOnly: Dispatch<SetStateAction<boolean>>
}

const RestaurantItemsCategory = ({ categories, vegOnly, setVegOnly, setCategory, category }: props) => {
    return (
        <div className="sticky top-0 z-10 -mx-4 mt-6 flex items-center gap-3 bg-orange-50/90 px-4 py-3 backdrop-blur">
            <div className="flex flex-1 gap-2 overflow-x-auto scrollbar-none py-5 px-1">
                {categories.map((c) => (
                    <button key={c} type="button" onClick={() => setCategory(c)}
                        className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors 
                        ${category === c ? 'bg-[#ff6b06] text-white' : 'bg-white text-zinc-600 ring-2 ring-orange-400 hover:bg-orange-100'}`}>
                        {c}
                    </button>
                ))}
            </div>
            <button type="button" role="switch" aria-checked={vegOnly} onClick={() => setVegOnly(!vegOnly)}
                className="flex shrink-0 items-center gap-2 text-sm font-medium text-zinc-700">
                Veg only
                <span className={`relative h-6 w-11 rounded-full transition-colors ${vegOnly ? 'bg-green-600' : 'bg-zinc-300'}`}>
                    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${vegOnly ? 'left-5.5' : 'left-0.5'}`} />
                </span>
            </button>
        </div>
    )
}

export default RestaurantItemsCategory