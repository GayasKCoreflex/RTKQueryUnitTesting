import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchTodosFromAPI } from './api/todosApi'

export interface Todo {
  id: string
  text: string
  completed: boolean
}

interface TodosState {
  list: Todo[]
  loading: boolean
  error: string | null
}

const initialState: TodosState = {
  list: [],
  loading: false,
  error: null
}


// Async thunk
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  return await fetchTodosFromAPI()
})

//createAsyncThunk lifecycle
//Every createAsyncThunk action generates three internal action types automatically:

// Phase	              Action Type	                        Description

// pending	      todos/fetchTodos/pending	       Dispatched when the API request starts.
// fulfilled	    todos/fetchTodos/fulfilled	     Dispatched when the API request succeeds.
// rejected	      todos/fetchTodos/rejected	       Dispatched when the API request fails.


// Slice
const todosSlice = createSlice({
  name: 'todos',
  initialState,

  // reducers is used to handle synchronous actions
  reducers: { 
    //To add a todo in list
    addTodo(state, action: PayloadAction<string>) {
      state.list.push({
        id: Date.now().toString(),
        text: action.payload,
        completed: false
      })
    },

    //To mark a todo complete in list
    toggleTodo(state, action: PayloadAction<string>) {
      const todo = state.list.find(t => t.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },

    //To delete a todo in list
    deleteTodo(state, action: PayloadAction<string>) {
      state.list = state.list.filter(t => t.id !== action.payload)
    }
  },

  //when using asynchronous actions like createAsyncThunk, we need extraReducers to handle the different states of those actions: 
  extraReducers: (builder) => {  
    //When the request is pending (just started)
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true
      state.error = null
    })

    //When the request is fulfilled (succeeded)
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.list = action.payload
      state.loading = false
    })

    //When the request is rejected (failed)
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'Something went wrong'
    })
  }
})

// Action creators are generated for each case reducer function
export const { addTodo, toggleTodo, deleteTodo } = todosSlice.actions
export default todosSlice.reducer
