import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categoriesSlice";
import baseketItemReducer from "./slices/basketItemSlice";
import pickCategoryHomePageReducer from "./slices/pickCategoryHomePageSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    basketItem: baseketItemReducer,
    pickCategoryHomePage: pickCategoryHomePageReducer,
  },
});
