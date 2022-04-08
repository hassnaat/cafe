import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../store/user"
import cartReducer from "../store/cart"
export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer
    },
})