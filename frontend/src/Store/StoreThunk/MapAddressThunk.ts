import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosGetolocation, AxiosGetolocationsearch } from "../../services";
import { queryClient } from "../../Providers/QueryClientProviders";

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

// map location search
export const maplocationSearchthunkController = createAsyncThunk<any, any, { rejectValue: any }>('map/search', async (Search, { rejectWithValue, signal }) => {
    console.log('searc', Search)
    try {
        const res: any = await queryClient.fetchQuery({
            queryKey: ['locatoin-search'],
            queryFn: () => AxiosGetolocationsearch.get(`${Search}&apiKey=${import.meta.env.VITE_GEOLOCATION_API_KEY}`, { signal }),
            staleTime: 0,
        })
        if (Search.length > 3) {
            return res?.data?.features
        } else {
            return null
        }
        console.log('location search', res?.data?.features)

    } catch (error) {
        return rejectWithValue(error)
    }
})