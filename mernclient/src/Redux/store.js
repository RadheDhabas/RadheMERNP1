import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './Reducers/authSlice';
import cartReducer from './Reducers/cartSlice';
import thunk from 'redux-thunk'; 

const persistConfig = {
  key: 'root',
  storage,
  whitelist:['auth','cart']
};
const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };