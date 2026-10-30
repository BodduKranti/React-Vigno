import { createSlice } from "@reduxjs/toolkit";
import { getShopByShopIdThunk, getShopData, getShopItemsbyId } from "../../StoreThunk/GetshopThunk";


const getMyshopdataSlice = createSlice({
    name: "shop",
    initialState: {
        myshopData: null,
        loader: false,
        error: '',
        shopgetbyIditems: null,
        ShopDetailsbyShopid: null
    },
    reducers: {

    },
    extraReducers: (build) => {
        build
            .addCase(getShopData.pending, (state) => {
                state.loader = true
            })
            .addCase(getShopData.fulfilled, (state, action: Partial<any>) => {
                state.myshopData = action.payload
                state.loader = false
            })
            .addCase(getShopData.rejected, (state, action: Partial<any>) => {
                state.error = action.payload
                state.loader = false
            })

            //getshopitesm by id
            .addCase(getShopItemsbyId.pending, (state) => {
                state.loader = true
            })
            .addCase(getShopItemsbyId.fulfilled, (state, action: Partial<any>) => {
                const { updatedAt, createdAt, __v, ...rest } = action?.payload?.data

                state.loader = false
                state.shopgetbyIditems = rest
                state.error = ''
            })
            .addCase(getShopItemsbyId.rejected, (state, action: Partial<any>) => {
                state.loader = false
                state.error = action.payload
            })

            //get Shop details by shopid
            .addCase(getShopByShopIdThunk.pending, (state) => {
                state.loader = true
            })
            .addCase(getShopByShopIdThunk.fulfilled, (state, action: Partial<any>) => {
                state.loader = false
                state.ShopDetailsbyShopid = action.payload
                state.error = ''
            })
            .addCase(getShopByShopIdThunk.rejected, (state, action) => {
                state.loader = false
                state.error = action.payload ?? ''
            })
    }
})

export default getMyshopdataSlice.reducer