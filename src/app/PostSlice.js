import { createSlice } from "@reduxjs/toolkit";

const PostSlice = createSlice({
  name: "posts",
  initialState: {},
  reducers: {
    actionName: (state) => state - 1,
  },
});

export const { actionName } = PostSlice.actions;

export default PostSlice.reducer;
