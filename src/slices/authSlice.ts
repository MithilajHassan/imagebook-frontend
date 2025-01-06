import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserInfo {
    _id: string;
    name: string;
    email: string;
    phone: number;
}

interface InitialState {
    userInfo:UserInfo | null
} 

const initialState: InitialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<UserInfo>) => {
            state.userInfo = action.payload
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
        clearAuth: (state) => {
            state.userInfo = null
            localStorage.removeItem('userInfo')
        },
    }
})

export const {
    setCredentials,
    clearAuth,
} = authSlice.actions
export default authSlice.reducer