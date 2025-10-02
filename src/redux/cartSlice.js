import { createSlice } from "@reduxjs/toolkit";

//load cart state from localstorage if available
const loadCart = () => {
    if (typeof window === "undefined") return { items: {} };
    try {
        const cart = localStorage.getItem("cart_v1");
        return cart ? JSON.parse(cart) : { items: {} };
    } catch (e) {
        console.error("Error loading cart from localStorage", e);
        return { items: {} };
    }
};

//save current cart state to localstorge
const saveCart = (state) => {
    try {
        localStorage.setItem("cart_v1", JSON.stringify(state));
    } catch (e) {
        console.error("Error saving cart to localStorage", e);
    }
};

const cartSlice = createSlice({
    name: "cart",
    initialState: loadCart(),
    reducers: {
        //Add a product to the cart
        addToCart(state, action) {
            const product = action.payload; // full product object
            const id = product.id;

            if (!state.items[id]) {
                state.items[id] = { product, qty: 0 };
            }

            state.items[id].qty += 1;
            saveCart(state);
        },

        //Remove a product from the cart
        removeFromCart(state, action) {
            const id = action.payload;
            delete state.items[id];
            saveCart(state);
        },

        //Update quantity of a product in the cart
        updateQty(state, action) {
            const { id, qty } = action.payload;
            if (state.items[id]) {
                state.items[id].qty = Math.max(1, qty); // minimum quantity is 1
            }
            saveCart(state);
        },

        //Clear all items from the cart
        clearCart(state) {
            state.items = {};
            saveCart(state);
        },
    },
});

// Export actions
export const { addToCart, removeFromCart, updateQty, clearCart } = cartSlice.actions;

//Selectors
export const selectCartItemsArray = (state) =>
    Object.values(state.cart.items); // convert items object to array

export const selectCartCount = (state) =>
    Object.values(state.cart.items).reduce((total, item) => total + item.qty, 0); // total number of items

export const selectCartTotal = (state) =>
    Object.values(state.cart.items).reduce(
        (total, item) => total + item.qty * item.product.price,
        0
    ); // total price

// Export reducer
export default cartSlice.reducer;