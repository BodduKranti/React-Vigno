import { createSlice } from "@reduxjs/toolkit";
import { getMyOrder, getShopByShopIdThunk, getShopData, getShopItemsbyId } from "../../StoreThunk/GetshopThunk";
type Async = { loading: boolean; error: string | null }
const idle: Async = { loading: false, error: null }


const getMyshopdataSlice = createSlice({
    name: "shop",
    initialState: {
        loader: false,
        error: '',
        paymentmothod: 'cod',

        myshopData: { data: null, ...idle },
        shopgetbyIditems: { data: null, ...idle },
        ShopDetailsbyShopid: { data: null, ...idle },
        myOrder: { data: null, ...idle }
    },
    reducers: {
        setPaymentMothod: (state, action) => {
            state.paymentmothod = action.payload
        }
    },
    extraReducers: (build) => {
        build
            .addCase(getShopData.pending, (state) => {
                state.myshopData.loading = true
            })
            .addCase(getShopData.fulfilled, (state, action: Partial<any>) => {
                state.myshopData.data = action.payload
                state.myshopData.loading = false
            })
            .addCase(getShopData.rejected, (state, action: Partial<any>) => {
                state.myshopData.error = action.payload
                state.myshopData.loading = false
            })

            //getshopitesm by id
            .addCase(getShopItemsbyId.pending, (state) => {
                state.shopgetbyIditems.loading = true
            })
            .addCase(getShopItemsbyId.fulfilled, (state, action: Partial<any>) => {
                const { updatedAt, createdAt, __v, ...rest } = action?.payload?.data

                state.shopgetbyIditems.loading = false
                state.shopgetbyIditems.data = rest
                state.shopgetbyIditems.error = ''
            })
            .addCase(getShopItemsbyId.rejected, (state, action: Partial<any>) => {
                state.loader = false
                state.error = action.payload
            })

            //get Shop details by shopid
            .addCase(getShopByShopIdThunk.pending, (state) => {
                state.ShopDetailsbyShopid.loading = true
            })
            .addCase(getShopByShopIdThunk.fulfilled, (state, action: Partial<any>) => {
                state.ShopDetailsbyShopid.data = action.payload
                state.ShopDetailsbyShopid.loading = false
            })
            .addCase(getShopByShopIdThunk.rejected, (state, action) => {
                state.ShopDetailsbyShopid.loading = false
                state.ShopDetailsbyShopid.error = action.payload ?? ''
            })

            // get cate items
            //get Shop Ordewr
            .addCase(getMyOrder.pending, (state) => {
                state.myOrder.loading = true
            })
            .addCase(getMyOrder.fulfilled, (state, action: Partial<any>) => {
                state.myOrder.data = action.payload
                state.myOrder.loading = false
            })
            .addCase(getMyOrder.rejected, (state, action) => {
                state.myOrder.loading = false
                state.myOrder.error = action.payload ?? ''
            })
    }
})
export const { setPaymentMothod } = getMyshopdataSlice.actions
export default getMyshopdataSlice.reducer