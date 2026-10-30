import BestShop from "../../components/Shop/BestShop"
import PageTitleWithMetaDetails from "../../Layout/PageTileWithMeta"

const Restaurant = () => {
    return (
        <div className="w-full">
            {/* Best Shops */}
            <BestShop />
        </div>
    )
}

export default PageTitleWithMetaDetails(Restaurant, 'Restaurants', '')