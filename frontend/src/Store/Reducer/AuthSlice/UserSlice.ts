import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { getOwnerOrder, getUserfun, getuserOrder } from '../../StoreThunk/GetUserThunk'

export interface cartitemsprops {
    _id: string,
    name: string,
    image: string,
    category: string,
    price: number,
    quantity?: number,
    shop?: string,
    foodtype: string
}

interface userAuth {
    fullname: string,
    email: string,
    loading: boolean,
    location: any,
    error: any,
    role: string,
    isAuthenitcate: boolean,
    cartItems: cartitemsprops[],
    order: any[],
    userData: any
}

// interface userToken extends userAuth {
//     token: string
// }

const inititalValue: userAuth = {
    fullname: '',
    email: '',
    loading: true,
    error: '',
    role: '',
    location: null,
    isAuthenitcate: false,
    cartItems: [],
    order: [],
    userData: null
}

const userAuthSlice = createSlice({
    name: 'userinfo',
    initialState: {
        ...inititalValue
    },
    reducers: {
        setUser: (state, action: PayloadAction<Partial<userAuth>>) => (
            Object.assign(state, action.payload)
        ),
        logout: () => {
            localStorage.clear()   // works, but it's a side effect inside a reducer
            return {
                ...inititalValue,
                loading: false,
            }
        },

        //Add cartitems
        addCart: (state, action: PayloadAction<cartitemsprops>) => {
            const qty = (action.payload.quantity ?? 1)

            const existing = state.cartItems.find((i) => i?._id === action.payload?._id)
            if (existing) {
                existing.quantity = existing.quantity! + 1
            } else {
                state.cartItems.push({ ...action.payload, quantity: qty })
            }
        },
        removeCart: (state, action: PayloadAction<string>) => {
            const item = state.cartItems.find((i) => i._id === action.payload)
            if (item && (item.quantity ?? 1) > 1) item.quantity = (item.quantity ?? 1) - 1
        },
        deleteCart: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter((i) => i._id !== action.payload)
        },
        clearCart: (state) => {
            state.cartItems = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserfun.pending, (state) => {
                state.loading = true
                state.error = ''
            })
            .addCase(getUserfun.fulfilled, (state, action: Partial<any>) => {
                // console.log(`user data`, action.payload)
                state.userData = action.payload
                state.loading = false,
                    state.fullname = action?.payload?.fullname || '',
                    state.email = action?.payload?.email || '',
                    state.role = action?.payload?.role || '',
                    state.location = action?.payload?.location || null,
                    state.isAuthenitcate = true
            })
            .addCase(getUserfun.rejected, (state, action: Partial<any>) => {
                state.loading = false
                state.error = action?.payload?.message || ''
                state.isAuthenitcate = false
            })

            //user odered
            .addCase(getuserOrder.fulfilled, (state, action) => {
                state.order = action.payload
            })

            //Owner Order
            .addCase(getOwnerOrder.fulfilled, (state, action) => {
                state.order = action.payload
            })
    }
})

export const {
    setUser,
    logout,
    addCart,
    removeCart,
    deleteCart,
    clearCart
} = userAuthSlice.actions;
export default userAuthSlice.reducer
