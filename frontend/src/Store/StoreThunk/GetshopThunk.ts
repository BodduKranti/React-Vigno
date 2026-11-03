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
            staleTime: Infinity,
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
                staleTime: Infinity,   // 👈 always hit the API
            })
            return res
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message)
        }
    },
    { condition: (id) => Boolean(id) }
)

export const cateItemsThunkcontroler = createAsyncThunk<any, void, { rejectValue: any }>('cateitems/cat', async (cat, { rejectWithValue }) => {
    try {
        const res = await queryClient.fetchQuery({
            queryKey: ['cate-items'],
            queryFn: () => AxiosInstance.get(`${ROUTES.GET_CATE_ITEMS_BY_CAT}/${cat}`, { withCredentials: true }),
            staleTime: Infinity
        })
        return res
    } catch (error: any) {
        return rejectWithValue(error?.response?.data?.message)
    }
})


export const getMyOrder = createAsyncThunk<any, void, { rejectValue: string }>(
    "owner/user/order",
    async (_, { rejectWithValue }) => {
        try {
            const res: any = await queryClient.fetchQuery({
                queryKey: ["owner/shop", "user"], // was ['user','order'], which clashes with the user thunk
                queryFn: () => AxiosInstance.get(ROUTES.GET_USER_OWNER_ORDER, { withCredentials: true }),
                staleTime: Infinity
            })
            console.log('order list muorder back', res.data)
            return res.data
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message ?? "Failed to load orders") // `return` was missing
        }
    }
)