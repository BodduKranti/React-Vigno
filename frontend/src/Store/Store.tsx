import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userAuthReducer from './Reducer/AuthSlice/UserSlice'
import getMyshopdataReducer from './Reducer/ShopSlice/ShopSlice'
import mapReducer from './Reducer/MapSlice/MapSlice'
const rootReducer = combineReducers({
    userInfo: userAuthReducer,
    getMyshopdata: getMyshopdataReducer,
    map: mapReducer
})

export const MainStore = configureStore({
    reducer: rootReducer,
    // middleware:(getDefautMiddleware)=>{
    //     getDefautMiddleware({
    //         serializableCheck:{
    //             ignoreActions:[
    //                 "PERSIST/"
    //             ]
    //         }
    //     })
    // }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof MainStore.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof MainStore.dispatch

