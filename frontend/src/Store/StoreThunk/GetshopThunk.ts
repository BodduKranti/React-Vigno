import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../services";
import { ROUTES } from "../../type";
import { queryClient } from "../../Providers/QueryClientProviders";


export const getShopData = createAsyncThunk<any, void, { rejectValue: string }>('shop/data', async (_, { rejectWithValue }) => {
    try {
        const response = await AxiosInstance.get(ROUTES.GET_SHOP, { withCredentials: true, });

        return response.data.shop ?? response.data;
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message ??
            "Unable to fetch Shop"
        );
    }
}
);

// Get shop by shop id
export const getShopByShopIdThunk = createAsyncThunk<any, void, { rejectValue: string }>('get-shop/shopid', async (shopid: any, { rejectWithValue }) => {
    try {
        const response = await AxiosInstance.get(`${ROUTES.GET_SHOP_BY_SHOP_ID}/${shopid}`, { withCredentials: true })
        return response?.data
    } catch (error: any) {
        return rejectWithValue(error?.response?.data?.error)
    }
})

export const getAllShopFoodItems = createAsyncThunk<any, void, { rejectValue: string }>('getAll/shopfooditems', async (_, { rejectWithValue }) => {
    try {
        return await queryClient.fetchQuery({
            queryKey: ['shop-items'],
            queryFn: () => AxiosInstance.get(ROUTES.GET_SHOT_ITEMS),
            staleTime: 60_000,
        })
    } catch (error: any) {
        return rejectWithValue(error?.response?.data?.message)
    }
})

export const getShopItemsbyId = createAsyncThunk<any, any, { rejectValue: string }>(
    'getshopitems/id',
    async (id, { rejectWithValue }) => {
        try {
            const res = await queryClient.fetchQuery({
                queryKey: ['getshopitems-byid', id],
                queryFn: () =>
                    AxiosInstance.get(`${ROUTES.GET_SHOT_ITEMS_BY_ID}/${id}`, { withCredentials: true }),
                staleTime: 0,   // 👈 always hit the API
            })
            return res
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message)
        }
    },
    { condition: (id) => Boolean(id) }
)