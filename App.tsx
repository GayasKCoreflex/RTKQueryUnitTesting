import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import TodoList from './features/todos/TodoList'

export default function App() {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  )
}
