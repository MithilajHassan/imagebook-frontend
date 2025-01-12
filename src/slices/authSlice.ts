import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
    token: string | null
}

const initialState: AuthState = {
    token: localStorage.getItem('token') ? localStorage.getItem('token')! : null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<string>) => {
            state.token = action.payload
            localStorage.setItem('token', action.payload)
        },
        clearAuth: (state) => {
            state.token = null
            localStorage.removeItem('token')
        },
    }
})

export const {
    setCredentials,
    clearAuth,
} = authSlice.actions
export default authSlice.reducer