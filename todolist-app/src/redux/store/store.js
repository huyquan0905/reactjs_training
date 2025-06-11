// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../tasks/reducer';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

