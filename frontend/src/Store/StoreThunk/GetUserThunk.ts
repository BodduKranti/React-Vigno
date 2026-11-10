import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../services";
import { ROUTES } from "../../type";
import { queryClient } from "../../Providers/QueryClientProviders";
interface UserAuth {
    fullname: string;
    email: string;
}
export const getUserfun = createAsyncThunk<UserAuth, void, { rejectValue: string }>("userinfo/getUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await AxiosInstance.get(ROUTES.GET_USER, { withCredentials: true, });

            return response.data.user ?? response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message ??
                "Unable to fetch user"
            );
        }
    }
);

export const getuserOrder = createAsyncThunk<any, void, { rejectValue: string }>('user/order', async (_, { rejectWithValue, signal }) => {
    try {
        const res: any = await queryClient.fetchQuery({
            queryKey: ['user', 'order'],
            queryFn: () => AxiosInstance.get(ROUTES.GET_USER_ORDERS, { withCredentials: true, signal }),
            staleTime: Infinity
        })
        return res.data
    } catch (error: any) {
        return rejectWithValue(error?.response?.data?.message ?? 'Failed to fetch orders')
    }
})

export const getOwnerOrder = createAsyncThunk<any, void, { rejectValue: string }>(
    "owner/order",
    async (_, { rejectWithValue }) => {
        try {
            const res: any = await queryClient.fetchQuery({
                queryKey: ["owner", "order"], // was ['user','order'], which clashes with the user thunk
                queryFn: () => AxiosInstance.get(ROUTES.GET_OWNER_ORDER, { withCredentials: true }),
                staleTime: Infinity
            })
            return res.data
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message ?? "Failed to load orders") // `return` was missing
        }
    }
)

