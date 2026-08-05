import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
    id: string;
    name: string;
    image: string;
    price: number;
    discountPrice?: number;
    color?: string;
    size?: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (
            state,
            action: PayloadAction<Omit<CartItem, "quantity"> & { quantity?: number }>
        ) => {
            const existing = state.items.find(
                (item) =>
                    item.id === action.payload.id &&
                    item.color === action.payload.color &&
                    item.size === action.payload.size
            );

            if (existing) {
                existing.quantity += action.payload.quantity || 1;
            } else {
                state.items.push({
                    ...action.payload,
                    quantity: action.payload.quantity || 1,
                });
            }
        },

        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },

        increaseQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (item) item.quantity += 1;
        },

        decreaseQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (item && item.quantity > 1) item.quantity -= 1;
        },

        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const {
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export const selectCartTotalQuantity = (state: { cart: CartState }) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotalPrice = (state: { cart: CartState }) =>
    state.cart.items.reduce(
        (sum, item) => sum + (item.discountPrice ?? item.price) * item.quantity,
        0
    );

export const selectCartTotalDiscount = (state: { cart: CartState }) =>
    state.cart.items.reduce(
        (sum, item) =>
            sum + (item.discountPrice ? (item.price - item.discountPrice) * item.quantity : 0),
        0
    );