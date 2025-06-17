import { configureStore } from '@reduxjs/toolkit'
import todosReducer from '../features/todos/todosSlice'
import logger from '../middleware/logger'

export const store = configureStore({
  reducer: {
    //Registering the todos slice reducer under `todos` key in the state
    todos: todosReducer,
     // Can add other reducers below
  },

  //getDefaultMiddleware() includes Redux Toolkit's default middleware 
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
})

// Middleware in Redux is software that sits between dispatching an action and the moment it reaches the reducer.
// It can Modify actions, Delay actions, Log actions.


// Infer the `RootState` and `AppDispatch` types from the store itself.
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
