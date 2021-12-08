import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1
            state.products.push(action.payload)
            state.total += action.payload.productPrice *action.payload.quantity
        },
        removeProduct: (state, action) => {
            state.quantity -= 1
            state.products = state.products.filter(item => item._id === action.payload._id && item.productSize !== action.payload.productSize)
            state.total -= action.payload.productPrice *action.payload.quantity
            
        },
        resetCart: (state) => {
            state.quantity = 0
            state.products = []
            state.total = 0
        },

    }
})

export const { addProduct, resetCart, removeProduct, addQuant } = cartSlice.actions
export default cartSlice.reducer