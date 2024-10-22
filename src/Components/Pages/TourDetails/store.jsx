import { configureStore } from '@reduxjs/toolkit';
import packageReducer from './packageSlice';

export const store = configureStore({
  reducer: {
    package: packageReducer,
  },
});
