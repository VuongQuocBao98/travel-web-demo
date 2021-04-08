import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice({
  name: "search",
  initialState: {
    listPost: [],
  },
  reducers: {
    search: (state, action) => {
      state.listPost = action.payload;
    },
  },
});

export const { search } = SearchSlice.actions;

export default SearchSlice.reducer;
