import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { todoApi } from '../features/api/todoApiRTKSlice';

export const store = configureStore({
  reducer: {
    //Registering the todos slice reducer under `todos` key in the state
    [todoApi.reducerPath]: todoApi.reducer,
    todos: todosReducer,
    // Can add other reducers below
  },

  //getDefaultMiddleware() includes Redux Toolkit's default middleware
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(todoApi.middleware),
});

// Middleware in Redux is software that sits between dispatching an action and the moment it reaches the reducer.
// It can Modify actions, Delay actions, Log actions.

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself.
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
