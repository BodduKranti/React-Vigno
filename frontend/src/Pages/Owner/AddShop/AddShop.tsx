import { HandPlatter } from "lucide-react"
import { useForm } from "react-hook-form"
import { memo, useEffect, useMemo, useState } from "react"
import Button from "../../../components/field/Button"
import InputFiled from "../../../components/field/InputField"
import { useAppDispatch, useAppSelecter } from "../../../Store/hook"
import { getShopData } from "../../../Store/StoreThunk/GetshopThunk"
import { createShop, updateShop } from "../../../hooks/useShop"
import { ROUTES } from "../../../type"
import { toast } from "react-toastify"
import LoaderSpin from "../../../components/LoaderSpin"
import useCity from "../../../hooks/useCity"
import PageTitleWithMetaDetails from "../../../Layout/PageTileWithMeta"
import { useNavigate } from "react-router"

interface ShopForm {
    name: string
    image: any          // file input always gives a FileList
    city: string
    state: string
    address: string
}


const AddShop = () => {
    const navigate = useNavigate()
    const { city, state, address } = useCity()
    const [loader, setLoader] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const { myshopData: shopdata }: any = useAppSelecter((state) => state.getMyshopdata)

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<ShopForm>({
        mode: 'onBlur',
        defaultValues: { name: '', city: city, state: state, address: '' },  // keep empty, no 'kranti'
    })

    // 1. fetch once
    useEffect(() => {
        if (!shopdata) dispatch(getShopData())
    }, [dispatch])

    // 2. fill text fields when data arrives (image is handled separately)
    useEffect(() => {
        if (shopdata?.name === '') return
        reset(
            {
                name: shopdata?.name || '',
                address: shopdata?.address || address || '',
                city: shopdata?.city || city || '',
                state: shopdata?.state || state || '',
            },
            { keepDirtyValues: true }   // don't overwrite fields the user already changed
        )
    }, [shopdata, city, state, reset])


    // 3. image preview: newly picked file wins, otherwise the saved image from the API
    const pickedFile = watch('image')?.[0]
    const preview = useMemo(
        () => (pickedFile ? URL.createObjectURL(pickedFile) : shopdata?.image || ''),
        [pickedFile, shopdata?.image]
    )
    useEffect(() => {
        return () => {
            if (preview.startsWith('blob:')) URL.revokeObjectURL(preview)
        }
    }, [preview])

    const addShopFun = createShop()
    const updateShopFun = updateShop()

    const onSubmit = (values: ShopForm) => {
        setLoader(true)
        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('address', values.address)
        formData.append('city', values.city)
        formData.append('state', values.state)
        if (values.image?.[0]) formData.append('image', values.image[0])

        if (shopdata) {
            updateShopFun.mutate({
                URL: ROUTES.UPDATE_SHOP,
                payload: formData
            }, {
                onSuccess: (data: any) => {
                    setLoader(false)
                    toast.success(data?.message)
                    navigate(`/role/owner`)
                },
                onError: (errors: any) => {
                    setLoader(false)
                    toast.error(errors?.response?.data?.message)
                }
            })
        } else {
            addShopFun.mutate({
                URL: ROUTES.CREATE_SHOP,
                payload: formData
            }, {
                onSuccess: (data: any) => {
                    setLoader(false)
                    toast.success(data?.message)
                    navigate(`/role/owner`)
                },
                onError: (errors: any) => {
                    setLoader(false)
                    toast.error(errors?.response?.data?.message)
                }
            })
        }
    }

    console.log('first', shopdata)

    return (
        <div className="w-full flex justify-center items-center h-[calc(100vh-81px)] overflow-y-auto px-4 md:px-0 pt-0 lg:pt-0 md:pt-37.5 pb-5 ">
            <div className="bg-white relative w-full md:max-w-2xl overflow-hidden rounded-[28px] p-10">
                <div className="mx-auto  flex h-28 w-28 items-center justify-center rounded-full bg-orange-100">
                    <HandPlatter size={64} strokeWidth={1.5} className="text-orange-500" />
                </div>

                <h1 className="text-xl my-4 md:text-3xl font-extrabold flex justify-center text-gray-900 sm:text-5xl">
                    {shopdata ? 'Update Shop' : 'Create Shop'}
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col space-y-6">
                    <InputFiled
                        placeholder="Shop name"
                        type="text"
                        {...register('name', { required: 'Shop name is required' })}
                        error={errors?.name?.message}
                    />

                    {/* Image upload */}
                    <div className="w-full">
                        <label
                            htmlFor="shopImage"
                            className="w-full h-48 flex justify-center items-center overflow-hidden rounded-2xl border border-dashed border-[#4b4b4b] hover:border-[#ff8036] cursor-pointer"
                        >
                            {preview ? (
                                <img src={preview} alt="Shop" className="h-full w-full object-cover" />
                            ) : (
                                <span className="text-gray-500">Click to upload image</span>
                            )}
                        </label>
                        <input
                            id="shopImage"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            {...register('image', {
                                // required only when there is no saved image already
                                // validate: (files) =>
                                //     shopdata?.image || files?.length > 0 || 'Select image',
                            })}
                        />
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-1">{!errors.image.message}</p>
                        )}
                    </div>

                    <InputFiled
                        placeholder="Address.."
                        type="text"
                        {...register('address', { required: 'Address is required' })}
                        error={errors?.address?.message}
                    />

                    <div className="w-full grid grid-cols-1 md:flex gap-4">
                        <InputFiled
                            placeholder="City"
                            type="text"
                            {...register('city', { required: 'City is required' })}
                            error={errors?.city?.message}
                        />
                        <InputFiled
                            placeholder="State"
                            type="text"
                            {...register('state', { required: 'State is required' })}
                            error={errors?.state?.message}
                        />
                    </div>

                    <Button
                        btnTxt={loader ? <LoaderSpin /> : shopdata ? 'Update Shop' : "Create Shop"}
                        btnColor="warning"
                        type="submit"
                        className="w-full"
                    />
                </form>
            </div>
        </div>
    )
}

export default PageTitleWithMetaDetails(memo(AddShop), 'Owner Shop', '')