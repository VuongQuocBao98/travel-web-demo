import { configureStore } from "@reduxjs/toolkit";
import AuthorSlice from "./AuthorSlice";
import LoginSlice from "./LoginSlice";
import PostSlice from "./PostSlice";
import SearchSlice from "./SearchSlice";

const rootReducer = {
  login: LoginSlice,
  posts: PostSlice,
  author: AuthorSlice,
  search: SearchSlice,
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
