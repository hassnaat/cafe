import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")) : {}

export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state = action.payload
        },
        removeUser: (state) => {
            state = {}
        },
    },
})

// Action creators are generated for each case reducer function
export const { addUser, removeUser } = counterSlice.actions

export default counterSlice.reducer