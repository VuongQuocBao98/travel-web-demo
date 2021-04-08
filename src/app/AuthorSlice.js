import { createSlice } from "@reduxjs/toolkit";

const AuthorSlice = createSlice({
  name: "author",
  initialState: {
    author: [],
  },
  reducers: {
    listAuthors: (state, action) => {
      state.author = action.payload;
    },
  },
});

export const { listAuthors } = AuthorSlice.actions;

export default AuthorSlice.reducer;
