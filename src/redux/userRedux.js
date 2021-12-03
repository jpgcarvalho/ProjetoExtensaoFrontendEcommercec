import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFethcing: false,
        error: false
    },
    reducers: {
        loginStart: (state) => {
            state.isFethcing = true
        },
        loginSuccess: (state, action) => {
            state.isFethcing = false
            state.currentUser = action.payload
        },
        loginFailure: (state) => {
            state.isFethcing = false
            state.error = true

        },
        logoutStart: (state) => {
            state.isFethcing = true
        },
        logoutSuccess: (state) => {
            state.currentUser = null
            state.error = false
        },
        logoutFailure: (state) => {
            state.error = true
        },
        registerStart: (state) => {
            state.isFethcing = true
        },
        registerSuccess: (state, action) => {
            state.isFethcing = false
            state.currentUser = action.payload
            state.error = false
        },
        registerFailure: (state) => {
            state.error = true
        }
        

    }
})

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logoutStart,
    logoutSuccess,
    logoutFailure,
    registerStart,
    registerSuccess,
    registerFailure

} = userSlice.actions
export default userSlice.reducer