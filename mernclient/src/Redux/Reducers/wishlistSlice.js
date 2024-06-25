import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks
export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async (userId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_USER_AUTH}/api/wishlist/${userId}`);
        return response.data.products;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : 'An error occurred');
    }
});

export const addToWishlist = createAsyncThunk('wishlist/addToWishlist', async ({ userId, productId }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_USER_AUTH}/api/wishlist/${userId}`, { productId });
        return response.data.wishlist.products;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : 'An error occurred');
    }
});

export const removeFromWishlist = createAsyncThunk('wishlist/removeFromWishlist', async ({ userId, productId }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_USER_AUTH}/api/wishlist/${userId}`, { productId });
        return response.data.wishlist.products;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : 'An error occurred');
    }
});

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: [],
    reducers: {
        ResetWishlist: (state) => {
            return []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state =action.payload;
                return state;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state = action.payload;
                return state
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state = action.payload;
                return state
            });
    },
});
export const {ResetWishlist} = wishlistSlice.actions
export default wishlistSlice.reducer;
