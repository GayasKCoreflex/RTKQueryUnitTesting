import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchTodosFromAPI } from '../../api/todosAPI'

export interface Todo {
  id: string
  text: string
  completed: boolean
  quantity: number
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


// Async thunk to fetch todos from an external API
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const result = await fetchTodosFromAPI()
  // console.log("API result:", result)
  return result
})


//createAsyncThunk lifecycle
//Every createAsyncThunk action generates three internal action types automatically:

// Phase	              Action Type	                        Description
// pending	      todos/fetchTodos/pending	       Dispatched when the API request starts.
// fulfilled	    todos/fetchTodos/fulfilled	     Dispatched when the API request succeeds.
// rejected	      todos/fetchTodos/rejected	       Dispatched when the API request fails.



// "todos/fetchTodos":
// "todos": is usually the slice name.
// "fetchTodos": is the action name you're defining.

//Why "todos/fetchTodos" used?
// Using this naming convention keeps your action types scoped and avoids name collisions in larger applications


// Slice
const todosSlice = createSlice({
  name: 'todos',// Name of the slice  
  initialState,

  // reducers is used to handle synchronous actions
  reducers: {
    //To add a todo in list
    addTodo(state, action: PayloadAction<string>) {
      state.list.push({
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
        quantity: 0
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
    },

    // Increase the quantity of a todo item like adding to cart
    incrementQuantity(state, action: PayloadAction<string>) {
      const todo = state.list.find(t => t.id === action.payload)
      if (todo) {
        todo.quantity += 1
      }
    },

    // Decrease the quantity of a todo item, but don't go below 0
    decrementQuantity(state, action: PayloadAction<string>) {
      const todo = state.list.find(t => t.id === action.payload)
      if (todo && todo.quantity > 0) {
        todo.quantity -= 1
      }
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
      state.list = action.payload.map((todo: Omit<Todo, 'quantity'>) => ({
        ...todo,
        quantity: 0,
      }))
      state.loading = false
      state.error = null
    })

    //When the request is rejected (failed)
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'Something went wrong'
    })
  }
})


// Action creators are generated for each case reducer function
export const { addTodo, toggleTodo, deleteTodo, incrementQuantity, decrementQuantity } = todosSlice.actions
export default todosSlice.reducer
