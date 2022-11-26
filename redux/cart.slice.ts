import { createSlice } from '@reduxjs/toolkit';
import { IShopItem } from '../utils/shopping-cart';

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state: Array<IShopItem>, action: { payload: IShopItem }) => {
            const incomingItem = action.payload;
            const existingItem = state.find((item) => item.id === incomingItem.id);
            if (existingItem != null) {
                existingItem.quantity++;
            } else {
                state.push({ ...incomingItem, quantity: 1 });
            }
        },
        incrementQuantity: (state: Array<IShopItem>, action: { payload: string }) => {
            const item = state.find((item) => item.id === action.payload);
            item.quantity++;
        },
        decrementQuantity: (state: Array<IShopItem>, action: { payload: string }) => {
            const item = state.find((item) => item.id === action.payload);
            if (item.quantity === 1) {
                const index = state.findIndex((item) => item.id === action.payload);
                state.splice(index, 1);
            } else {
                item.quantity--;
            }
        },
        removeFromCart: (state: Array<IShopItem>, action: { payload: string }) => {
            const index = state.findIndex((item) => item.id === action.payload);
            state.splice(index, 1);
        },
        resetCart: () => {
            return [];
        },
    },
});

export const cartReducer = cartSlice.reducer;

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart, resetCart } = cartSlice.actions;
