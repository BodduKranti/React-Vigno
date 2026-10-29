import CategoryList from "./components/Category/CategoryList"
import FoodItemsListsection from "./components/FoodItemsList/FoodItemsList"
import HomeSlider from "./components/HomeSlider/HomeSlider"
import './components/HomeSlider/HomeSlider.css'
import BestShop from "./components/Shop/BestShop"
import PageTitleWithMetaDetails from "./Layout/PageTileWithMeta"

const App = () => {
    return (
        <div className="w-full">
            {/* Home Slider */}
            <div className="my-4 cats max-w-[1600px] mx-auto">
                <HomeSlider />
            </div>

            {/* Food categories */}
            <CategoryList />

            {/* Best Shops */}
            <BestShop />

            {/* Food Items */}
            <FoodItemsListsection />
        </div>
    )
}

export default PageTitleWithMetaDetails(App, 'Home', '')