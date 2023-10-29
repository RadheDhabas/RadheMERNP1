import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     cart:[],
// };

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.find(item => item._id === newItem._id);

            if (!existingItem) {
                state.push({ ...newItem, quantity: 1 });
            }
            return state
        },
        RemoveItem: (state, action) => {
            const item = action.payload;
            state = state.filter(i => i._id !== item._id);
            return state;
        },
        ResetCart: (state) => {
            state = [];
            return state;
        },
        IncreaseQnty: (state, action) => {
            const item = action.payload;
            state = state.map(i => (i._id === item._id) ? { ...i, quantity: i.quantity + 1 } : i);
            return state;
        },
        DecreaseQnty: (state, action) => {
            const item = action.payload;
            state = state.map(i => (i._id === item._id && i.quantity > 1) ? { ...i, quantity: i.quantity - 1 } : { ...i });
            return state;
        },
    },
});

export const { addToCart, RemoveItem, ResetCart, IncreaseQnty, DecreaseQnty } = cartSlice.actions;
export default cartSlice.reducer;