import { createSlice } from "@reduxjs/toolkit"



interface locationprops {
    lat: number,
    lon: number
}

const DeliveryBoyTrackingLocationslice = createSlice({
    name: 'deliveryBoyLocation',
    initialState: {
        location: null as { [key: string]: locationprops } | null
    },
    reducers: {
        setDeliveryBoyLocation: (state, action) => {
            state.location = {
                [action.payload.deliveryuserId]: {
                    lat: action.payload.lat,
                    lon: action.payload.lon
                }
            }
        }
    }
})

export const { setDeliveryBoyLocation } = DeliveryBoyTrackingLocationslice.actions
export default DeliveryBoyTrackingLocationslice.reducer