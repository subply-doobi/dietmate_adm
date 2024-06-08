import { configureStore } from "@reduxjs/toolkit";
import orderFilterReducer from "../../features/filter/orderFilterSlice";
import productFilterReducer from "../../features/filter/productFilterSlice";
import rightModalReducer from "../../features/modal/modalSlice";
import productInputReducer from "../../features/productInput/productInputSlice";

export const store = configureStore({
  reducer: {
    orderFilter: orderFilterReducer,
    productFilter: productFilterReducer,
    rightModal: rightModalReducer,
    productInput: productInputReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
