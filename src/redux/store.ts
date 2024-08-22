import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer } from 'redux-persist';
import customStorage from './customStorage';
import authSlice from './slices/authSlice';
import { authApi, taskApi, weatherApi } from '@/api/services';
import { rtkQueryErrorLogger } from './middlewares/rtkQueryErrorLogger';

const rootReducer = combineReducers({
  auth: authSlice,
  [authApi.reducerPath]: authApi.reducer,
  [taskApi.reducerPath]: taskApi.reducer,
  [weatherApi.reducerPath]: weatherApi.reducer,
});

const persistedReducers = persistReducer(
  {
    key: 'app',
    version: 1,
    storage: customStorage,
  },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducers,

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(rtkQueryErrorLogger)
      .concat(authApi.middleware)
      .concat(taskApi.middleware)
      .concat(weatherApi.middleware);
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
