import { tasksSlice } from '../features/tasks/slices/tasksSlice';
import {
	configureStore,
} from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
