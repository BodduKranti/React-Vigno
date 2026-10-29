import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../services";
import { ROUTES } from "../../type";
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