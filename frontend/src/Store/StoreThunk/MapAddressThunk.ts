import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosGetolocation } from "../../services";

export interface locationAdd {
    lat: any,
    lon: any
}

export const MapAddressThunkController = createAsyncThunk<any, locationAdd, { rejectValue: any }>('map/address', async (location, { rejectWithValue }) => {
    try {
        const getCity = await AxiosGetolocation.get(`?lat=${location?.lat}&lon=${location?.lon}&format=json&apiKey=${import.meta.env.VITE_GEOLOCATION_API_KEY}`)
        const mainAddress = `${getCity?.data?.results[0]?.address_line1}, ${getCity?.data?.results[0]?.address_line2}`;
        return mainAddress
    } catch (error) {
        return rejectWithValue(error)
    }
})