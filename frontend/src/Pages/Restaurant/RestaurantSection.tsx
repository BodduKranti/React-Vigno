import { useMemo, useState } from "react"
import RestaurantInfo from "./RestaurantInfo"
import RestaurantItemsCategory from "./RestaurantItemsCategory"
import FoodItemsListData from "../../components/FoodItemsList/FoodItemsListData"

interface RestaurantSectionprops {
    name: string
    city: string,
    image: string,
    address: string,
    items: any[]
}

interface ShopDetails {
    shopDts: RestaurantSectionprops,
    loader: boolean
}

const RestaurantSection = ({ shopDts: shop, loader }: ShopDetails) => {
    const [vegOnly, setVegOnly] = useState<boolean>(false)
    const [category, setCategory] = useState<string>('All')
    const items = Array.isArray(shop?.items) && shop.items || []
    const categories = useMemo(() => ['All', ...Array.from(new Set(items.map((i: any) => i.category)))], [items])

    const isNonVeg = (t: string) => t.toLowerCase().replace(/[\s_-]/g, '').includes('nonveg')
    const visible = items.filter((i) => (category === 'All' || i.category === category) && (!vegOnly || !isNonVeg(i.foodtype)))

    return (
        <>
            <div className="relative h-56 w-full overflow-hidden sm:h-72 lg:h-80">
                <img src={shop.image} alt={shop.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
            </div>

            <div className="my-4 cats max-w-[1600px] mx-auto">
                <RestaurantInfo shop={{ ...shop }} />

                <RestaurantItemsCategory
                    category={category}
                    setCategory={setCategory}
                    vegOnly={vegOnly}
                    setVegOnly={setVegOnly}
                    categories={categories}
                />
            </div>

            <div className="py-0! cats max-w-[1600px] mx-auto">
                <FoodItemsListData isLoading={loader} foodItemsListData={visible} />
            </div>


        </>

    )
}

export default RestaurantSection