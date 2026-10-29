import { useForm } from "react-hook-form"
import Button from "../field/Button"
import InputFiled from "../field/InputField"
import { useCallback, useEffect, useMemo, useState } from "react"
import LoaderSpin from "../LoaderSpin"
import { createshopItems, updateShopItems } from "../../hooks/useShop"
import { ROUTES } from "../../type"
import { toast } from "react-toastify"
import SelectField from "../field/SelectField"
import { categories, foodType } from "../../utils/FoodUtils"
import { getShopData } from "../../Store/StoreThunk/GetshopThunk"
import { useAppDispatch } from "../../Store/hook"

interface addFoodItemprops {
    _id: any,
    name: string,
    image: any,
    price: number,
    category: string,
    foodtype: string
}

interface editFoodItemid {
    items?: addFoodItemprops,
    setOpen?: any
}

const AddFoodItemForm = ({ items, setOpen }: editFoodItemid) => {
    const dispatch = useAppDispatch()
    const [loader, setLoader] = useState(false)

    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm<addFoodItemprops>({
        mode: 'onBlur',
        defaultValues: { name: '', price: 0, category: '', foodtype: '' },
    })

    // fill text fields only. Do NOT put `image` in here
    useEffect(() => {
        if (!items) return
        reset({
            name: items.name ?? '',
            price: items.price ?? 0,
            category: items.category ?? '',
            foodtype: items.foodtype ?? '',
        })
    }, [items, reset])

    // preview: a newly picked File wins, otherwise the saved image URL
    const pickedFile = watch('image')?.[0]
    const preview = useMemo(
        () => (pickedFile instanceof File ? URL.createObjectURL(pickedFile) : items?.image || ''),
        [pickedFile, items?.image]
    )
    useEffect(() => {
        return () => {
            if (preview.startsWith('blob:')) URL.revokeObjectURL(preview)
        }
    }, [preview])

    const categoryOptions = categories.map((list) => {
        return {
            label: list,
            value: list
        }
    })

    const foodOptions = foodType.map((list) => {
        return {
            label: list,
            value: list
        }
    })

    const creatFoodItemfun = createshopItems()

    const updateFoodItemFun = updateShopItems()

    const onSubmit = useCallback((value: addFoodItemprops) => {
        setLoader(true)
        const formData = new FormData()
        formData.append('name', value.name)
        formData.append('price', String(value.price ?? ''))
        formData.append('category', value.category)
        formData.append('foodtype', value.foodtype)
        if (value.image?.[0]) formData.append('image', value.image[0])


        if (items) {
            updateFoodItemFun.mutate({
                URL: `${ROUTES.UPDATE_SHOP_ITEMS}/${items?._id}`,
                payload: formData
            }, {
                onSuccess: (data: any) => {
                    setLoader(false)
                    toast.success(data.message)
                    dispatch(getShopData())
                    setOpen({
                        isOpen: false,
                        items: null
                    })
                },
                onError: (errors: any) => {
                    toast.error(errors?.response?.data?.message)
                    setLoader(false)
                }
            })
        } else {
            creatFoodItemfun.mutate({
                URL: ROUTES.CREATE_SHOP_ITEMS,
                payload: formData
            }, {
                onSuccess: (data: any) => {
                    setLoader(false)
                    toast.success(data.message)
                    dispatch(getShopData())
                    setOpen({
                        isOpen: false,
                        items: null
                    })
                },
                onError: (errors: any) => {
                    toast.error(errors?.response?.data?.message)
                    setLoader(false)
                }
            })
        }
    }, [items, setOpen, dispatch, updateFoodItemFun, creatFoodItemfun])


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col space-y-6">

            {/* Image upload */}
            <div className="w-full">
                <label
                    htmlFor="foodImage"
                    className="w-full h-60 flex justify-center items-center overflow-hidden rounded-2xl border border-dashed border-[#4b4b4b] hover:border-[#ff8036] cursor-pointer"
                >
                    {preview ? (
                        <img src={preview} alt="Shop" className="h-full w-full object-cover" />
                    ) : (
                        <span className="text-gray-500">Click to upload image</span>
                    )}
                </label>
                <input
                    id="foodImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register('image', {
                        validate: (files) =>
                            !!items?.image || (files && files.length > 0) || 'Food image is required',
                    })}
                />
                {errors.image && (
                    <p className="text-red-500 text-sm mt-1">{!errors.image.message}</p>
                )}
            </div>

            <InputFiled
                placeholder="Food name"
                type="text"
                {...register('name', { required: 'Food name is required' })}
                error={errors?.name?.message}
            />

            <InputFiled
                placeholder="Price"
                type="number"
                {...register('price', { required: 'Food price is required' })}
                error={errors?.price?.message}
            />

            <div className="w-full grid grid-cols-1 md:flex gap-4">
                <SelectField
                    placeholder="Category"
                    options={categoryOptions}
                    {...register('category', { required: 'Category is required' })}
                    error={errors?.category?.message}
                />
                <SelectField
                    placeholder="Food Type"
                    options={foodOptions}
                    {...register('foodtype', { required: 'Food Type is required' })}
                    error={errors?.foodtype?.message}
                />
            </div>

            <Button
                btnTxt={loader ? <LoaderSpin /> : items ? 'Update Food Item' : "Create Food Item"}
                btnColor="warning"
                type="submit"
                className="w-full"
            />
        </form>
    )
}

export default AddFoodItemForm