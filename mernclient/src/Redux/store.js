import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './Reducers/authSlice';
import cartReducer from './Reducers/cartSlice';
import wishlistReducer from './Reducers/wishlistSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist:['auth','cart','wishlist']
};
const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  wishlist:wishlistReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };