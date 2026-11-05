import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosGetolocation } from "../../services";
import { queryClient } from "../../Providers/QueryClientProviders";
import axios from "axios";

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
export const maplocationSearchthunkController = createAsyncThunk<any, any, { rejectValue: any }>('map/item/search', async (Search, { rejectWithValue, signal }) => {
    console.log('searc', Search)
    try {

        if (Search.length > 3) {
            let res: any = await queryClient.fetchQuery({
                queryKey: ['location', 'search'],
                queryFn: () => axios.get(`https://api.geoapify.com/v1/geocode/search?text=${Search}&apiKey=${import.meta.env.VITE_GEOLOCATION_API_KEY}`, { signal }),
                // staleTime: Infinity,

            })

            return res?.data?.features

        } else {
            return null
        }


    } catch (error) {
        return rejectWithValue(error)
    }
})