import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./slices/apiSlice";
import authReducer from './slices/authSlice'

const store = configureStore({
    reducer:{
        auth:authReducer,

        [userApi.reducerPath]:userApi.reducer,
    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(userApi.middleware),
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store