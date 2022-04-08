import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: []
}

export const counterSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const found = state.products.some(el => el.product_id === action.payload.product_id);
            if (!found) {
                state.products.push({ ...action.payload, qty: 1 })
            }
            else {
                state.products = state.products.map(item => {
                    if (item.product_id === action.payload.product_id) {
                        item.qty += 1
                        return item
                    }
                    else {
                        return item
                    }
                })
            }
        },
        incrementItem: (state, action) => {
            state.products[action.payload].qty += 1
        },
        decrementItem: (state, action) => {
            state.products[action.payload].qty -= 1
        },
        removeItem: (state, action) => {
            state.products = state.products.filter(item => item.product_id !== action.payload)
        },
        clearCart: (state) => {
            state = {}
        },
    },
})

// Action creators are generated for each case reducer function
export const { addItem, incrementItem, decrementItem, removeItem, clearCart } = counterSlice.actions

export default counterSlice.reducer