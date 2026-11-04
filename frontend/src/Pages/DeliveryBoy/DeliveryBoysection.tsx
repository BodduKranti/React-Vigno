import DeliveryBoyDetails from "./DeliveryBoyDetails"
import DeliveryBoyOrdersection from "./DeliveryBoyOrdersection"

const DeliveryBoysection = () => {
    return (
        <>
            {/* LEFT: shop details (stays in view while the items scroll) */}
            <aside className="lg:sticky lg:top-6">
                <DeliveryBoyDetails />
            </aside>
            {/* RIGHT: shop items */}
            <section>
                {/* <ShopItems items={shopdata.items ?? []} /> */}
                <DeliveryBoyOrdersection />
            </section>
        </>

    )
}

export default DeliveryBoysection