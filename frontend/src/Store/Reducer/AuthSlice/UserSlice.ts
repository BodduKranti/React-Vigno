import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { getUserfun } from '../../StoreThunk/GetUserThunk'

interface userAuth {
    fullname: string,
    email: string,
    loading: boolean,
    error: any,
    role: string,
    isAuthenitcate: boolean
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
    isAuthenitcate: false
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserfun.pending, (state) => {
                state.loading = true
                state.error = ''
            })
            .addCase(getUserfun.fulfilled, (state, action: Partial<any>) => {
                state.loading = false,
                    state.fullname = action?.payload?.fullname || '',
                    state.email = action?.payload?.email || '',
                    state.role = action?.payload?.role || '',
                    state.isAuthenitcate = true
            })
            .addCase(getUserfun.rejected, (state, action: Partial<any>) => {
                state.loading = false
                state.error = action?.payload?.message || ''
                state.isAuthenitcate = false
            })
    }
})

export const { setUser, logout } = userAuthSlice.actions;
export default userAuthSlice.reducer
