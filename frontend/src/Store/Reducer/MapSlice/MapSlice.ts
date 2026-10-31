import { createSlice } from "@reduxjs/toolkit";
import { MapAddressThunkController, maplocationSearchthunkController } from "../../StoreThunk/MapAddressThunk";



const mapSlice = createSlice({
    name: "Map",
    initialState: {
        location: {
            lat: null,
            lon: null
        },
        address: null,
        isLoading: false,
        isError: '',
        searhlist: null
    },
    reducers: {
        //get the lat and lon value from the useCity
        setLocation: (state, action) => {
            const { lat, lon } = action.payload
            state.location.lat = lat
            state.location.lon = lon
        },
        //get the lat and lon value from the useCity
        setAddress: (state, action) => {
            state.address = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(MapAddressThunkController.pending, (state) => {
                state.isLoading = true
            })
            .addCase(MapAddressThunkController.fulfilled, (state, action) => {
                state.address = action.payload
                state.isLoading = false
            })
            .addCase(MapAddressThunkController.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.payload
            })

            //search location
            .addCase(maplocationSearchthunkController.fulfilled, (state, action) => {
                state.searhlist = action.payload
            })
    }
})
export const { setLocation, setAddress } = mapSlice.actions
export default mapSlice.reducer