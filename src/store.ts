import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cart';
import productReducer from './reducers/products';
import settingReducer from './reducers/settings';
// ...

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    settings: settingReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;