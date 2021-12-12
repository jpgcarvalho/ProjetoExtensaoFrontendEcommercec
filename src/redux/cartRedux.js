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
            state.products = state.products.filter(item => item._id !== action.payload._id || item.productSize !== action.payload.productSize)
            state.total -= action.payload.productPrice *action.payload.quantity
            
        },
        resetCart: (state) => {
            state.quantity = 0
            state.products = []
            state.total = 0
        },
        remQuant: (state, action) => {
            state.products = state.products.map(item => (item._id === action.payload._id && item.productSize === action.payload.productSize) ? {...item, quantity: item.quantity -= 1} : {...item})
            state.total -= action.payload.productPrice
        }

    }
})

export const { addProduct, resetCart, removeProduct, remQuant } = cartSlice.actions
export default cartSlice.reducer