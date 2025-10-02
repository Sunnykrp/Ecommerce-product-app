import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductAPI } from "../utils/api.js"

//Async thunk to fetch all products
export const fetchProducts = createAsyncThunk(
    "products/fetch",
    async () => {
        const data = await fetchProductAPI();
        return data;
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState: {
        items: [],          // list of products
        status: "idle",     // idle | loading | succeeded | failed
        error: null,        // error message if API fails
        search: ""          // search query
    },
    reducers: {
        // set the search query in state
        setSearch(state, action) {
            state.search = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
});

export const { setSearch } = productsSlice.actions;

// Selector: filters products by search query
export const selectFilteredProducts = (state) => {
    const q = state.products.search.toLowerCase().trim();
    if (!q) return state.products.items;
    return state.products.items.filter((p) =>
        p.title.toLowerCase().includes(q)
    );
};

// Reducer
export default productsSlice.reducer;