import { Plus } from "lucide-react"
import { useAppSelecter } from "../../Store/hook"
import ShopHasNoData from "./ShopHasNoData"
import Button from "../field/Button"
import ShopListItems from "./ShopListItems"
import Modal from "../Modal/Modal"
import { useState } from "react"
import AddFoodItemForm from "./AddFoodItemForm"



const ShopItemsList = () => {
    const { myshopData: shopdata }: any = useAppSelecter((state) => state.getMyshopdata)
    const { items } = shopdata
    const [open, setOpen] = useState<any>({ isOpen: false, items: null })
    return (
        <div className="w-full">
            <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Menu items</h2>
                    <p className="text-sm text-gray-500">{items.length} item{items.length !== 1 && "s"}</p>
                </div>
                <Button
                    btnColor="warning"
                    onClick={() => setOpen({ isOpen: true })}
                    btnTxt={<>
                        <Plus size={16} />
                        Add Item
                    </>}
                    type="button"
                />

                <Modal
                    key={2}
                    open={open.isOpen}
                    onClose={() => setOpen({ isOpen: false })}
                    title="Add Food Items"
                    size="4xl"
                >
                    <AddFoodItemForm setOpen={setOpen} />
                </Modal>
            </div>


            {items?.length > 0 ? <ShopListItems items={items} /> : <ShopHasNoData />}


        </div>
    )
}

export default ShopItemsList