import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: string
  title: string
  completed: boolean
  quantity: number
}

export interface TodosState {
  list: Todo[]
  loading: boolean
  error: string | null
}

const initialState: TodosState = {
  list: [],
  loading: false,
  error: null,
};


// Slice
const todosSlice = createSlice({
  name: 'todos',// Name of the slice
  initialState,

  // reducers is used to handle synchronous actions
  reducers: {
    setTodosFromAPI(state, action: PayloadAction<Omit<Todo, 'quantity'>[]>) {
      state.list = action.payload.map(todo => ({
        ...todo,
        quantity: 0,
      }));
    },

    //To add a todo in list
    addTodo(state, action: PayloadAction<string>) {
      state.list.push({
        id: Date.now().toString(),
        title: action.payload,
        completed: false,
        quantity: 0,
      });
    },

    //To mark a todo complete in list
    toggleTodo(state, action: PayloadAction<string>) {
      const todo = state.list.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    //To delete a todo in list
    deleteTodo(state, action: PayloadAction<string>) {
      state.list = state.list.filter(t => t.id !== action.payload);
    },

    // Increase the quantity of a todo item like adding to cart
    incrementQuantity(state, action: PayloadAction<string>) {
      const todo = state.list.find(t => t.id === action.payload);
      if (todo) {
        todo.quantity += 1;
      }
    },

    // Decrease the quantity of a todo item, but don't go below 0
    decrementQuantity(state, action: PayloadAction<string>) {
      const todo = state.list.find(t => t.id === action.payload);
      if (todo && todo.quantity > 0) {
        todo.quantity -= 1;
      }
    },

  },

});


// Action creators are generated for each case reducer function
export const { addTodo, toggleTodo, deleteTodo, incrementQuantity, decrementQuantity, setTodosFromAPI } = todosSlice.actions;
export default todosSlice.reducer;
