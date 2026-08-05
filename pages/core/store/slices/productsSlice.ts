import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type SortOption = "newest" | "expensive" | "cheap" | "bestseller";

interface ProductsState {
    sort: SortOption;
    searchQuery: string;
    selectedCategory: string | null;
}

const initialState: ProductsState = {
    sort: "newest",
    searchQuery: "",
    selectedCategory: null,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setSort: (state, action: PayloadAction<SortOption>) => {
            state.sort = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setCategory: (state, action: PayloadAction<string | null>) => {
            state.selectedCategory = action.payload;
        },
        resetFilters: (state) => {
            state.sort = "newest";
            state.searchQuery = "";
            state.selectedCategory = null;
        },
    },
});

export const { setSort, setSearchQuery, setCategory, resetFilters } = productsSlice.actions;
export default productsSlice.reducer;