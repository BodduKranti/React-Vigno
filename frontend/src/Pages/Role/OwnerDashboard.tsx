import { useEffect } from "react"
import { useAppDispatch, useAppSelecter } from "../../Store/hook"
import { getShopData } from "../../Store/StoreThunk/GetshopThunk"
import { HandPlatter } from "lucide-react"
import PageTitleWithMetaDetails from "../../Layout/PageTileWithMeta"
import BeforeAddDataShowMessage from "../../components/BeforeAddDataShowMessage/BeforeAddDataShowMessage"
import ShopDetails from "../Owner/AddShop/ShopDestails/ShopDetails"
import ShopSection from "../../components/Shop/ShopSection"

const OwnerDashboard = () => {
    const dispatch = useAppDispatch()
    const { myshopData: shopdata } = useAppSelecter((state) => state.getMyshopdata)

    useEffect(() => {
        dispatch(getShopData())
    }, [])

    return (
        <div className="w-full md:h-[calc(100vh-82px)] h-auto md:overflow-y-auto bg-[#fff8f1] flex justify-center">

            <div className="w-full bg-[#fff8f1] md:h-[calc(100vh-82px)] md:overflow-y-auto">
                {shopdata ? (
                    <main className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 px-4 py-8 lg:grid-cols-[360px_1fr] lg:items-start">
                        {/* LEFT: shop details (stays in view while the items scroll) */}
                        <aside className="lg:sticky lg:top-6">
                            <ShopDetails shop={shopdata} />
                        </aside>

                        {/* RIGHT: shop items */}
                        <section>
                            {/* <ShopItems items={shopdata.items ?? []} /> */}
                            <ShopSection />
                        </section>
                    </main>
                ) : (
                    <BeforeAddDataShowMessage
                        pageIcon={<HandPlatter
                            size={64}
                            strokeWidth={1.5}
                            className="text-orange-500"
                        />}
                        heading={`Add Your Restaturant`}
                        description="Join our food delivery platform and reach thousands of hungry customer every day"
                        sectionBtntx='Get Statred to Add Shop'
                        url='/role/owner/addshop'
                        sectionBtncolor="warning"
                    />
                )}
            </div>
        </div>
    )
}

export default PageTitleWithMetaDetails(OwnerDashboard, 'Owner Dashboard', '')