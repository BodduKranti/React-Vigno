import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SearchFoodState {
    searchFood: string;
}

const initialState: SearchFoodState = {
    searchFood: "",
};

const SearchFoodslice = createSlice({
    name: "search-food",
    initialState,
    reducers: {
        searchFoodTitle: (state, action: PayloadAction<string>) => {
            state.searchFood = action.payload;
        },
    },
});

export const { searchFoodTitle } = SearchFoodslice.actions;
export default SearchFoodslice.reducer;