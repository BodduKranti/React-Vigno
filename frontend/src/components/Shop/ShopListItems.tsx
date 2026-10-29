import { useCallback, useState } from "react"
import ShopItems from "./ShopItems"
import Modal from "../Modal/Modal"
import AddFoodItemForm from "./AddFoodItemForm"
import { useAppDispatch, useAppSelecter } from "../../Store/hook"
import { getShopData, getShopItemsbyId } from "../../Store/StoreThunk/GetshopThunk"
import DeletePopupMessage from "../DeletePopupMessage"
import LoaderSpin from "../LoaderSpin"
import { deleteShopItems } from "../../hooks/useShop"
import { ROUTES } from "../../type"
import { toast } from "react-toastify"
import { ErrorAxios } from "../../services/ErrorIntersects"

export interface FoodItem {
    _id: string
    name: string
    image?: string
    price: number
    category?: string,
    foodtype: string
}
const ShopListItems = ({ items }: { items: FoodItem[] }) => {
    const [loader, setLoader] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const { shopgetbyIditems } = useAppSelecter((state) => state.getMyshopdata)

    const [open, setOpen] = useState<any>({
        isOpen: false,
        items: null,
        message: ''
    })

    //edit items
    const foodItemFun = useCallback(async (values: any) => {
        console.log('get values', values)
        setOpen({ isOpen: true, items: values, message: 'Edit' })
        try {
            const result = await dispatch(getShopItemsbyId(values?._id)).unwrap()
            console.log('result', result)
        } catch (err) {
            console.error('fetch failed', err)
        }
    }, [dispatch])


    const onDelete = useCallback((id: any) => {
        setOpen({
            isOpen: true,
            items: id,
            message: 'Delete'
        })
    }, [open, setOpen])

    const deleteShopitemsfun = deleteShopItems()

    const finalDelete = useCallback(() => {
        setLoader(true)
        deleteShopitemsfun.mutate({
            URL: `${ROUTES.DELETE_SHOT_ITEM_BY_ID}/${open.items}`,
            params: {}
        }, {
            onSuccess: (data: any) => {
                setLoader(false)
                toast.success(data?.message)
                setOpen({
                    isOpen: false,
                    items: null,
                    message: ''
                })
                dispatch(getShopData())
            },
            onError: (error) => {
                ErrorAxios(error)
                setLoader(false)
                setOpen({
                    isOpen: false,
                    items: null,
                    message: ''
                })
            }
        })

    }, [open, setOpen, dispatch])



    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {
                items.map((items: FoodItem) => (<ShopItems
                    onEdit={foodItemFun}
                    key={items?._id}
                    item={items}
                    onDelete={onDelete}
                />))
            }

            <Modal
                key={1}
                open={open.isOpen}
                onClose={() => setOpen({ isOpen: false })}
                title={open?.items ? open.message === 'Delete' ? '' : "Update Food Items" : "Add Food Items"}
                size={open.message === 'Delete' ? 'lg' : "4xl"}
            >
                {open.message === 'Edit' && <AddFoodItemForm items={shopgetbyIditems ?? undefined} setOpen={setOpen} />}
                {open.message === 'Delete' && <DeletePopupMessage
                    title="Do you want to delete this item"
                    message="This Shop item will be permanently removed."
                    yesBtntext={loader ? <LoaderSpin /> : "Yes"}
                    yesbtnOnclick={finalDelete}
                    noBtntext="No"
                    noBtntextOnClick={() => setOpen({ isOpen: false })}
                    className={`w-35!`}
                />}

            </Modal>
        </div>
    )
}

export default ShopListItems