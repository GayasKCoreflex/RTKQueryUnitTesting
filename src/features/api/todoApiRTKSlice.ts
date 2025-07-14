import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// RTK Query API slice for managing todo-related API calls (fetching, creating, etc.)
// Automatically generates hooks and manages caching, loading, and error states.

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  quantity: number;
}

export interface TodosState {
  list: Todo[];
  loading: boolean;
  error: string | null;
}

export const todoApi = createApi({
  reducerPath: 'todoApi', // Unique identifier for this API slice in the Redux store

  // Base query function that provides the base URL for all requests
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),

  // Optional:Tags for cache management (used to trigger re-fetching when data changes)
  tagTypes: ['Todos'],

  // Defining the available endpoints (API operations) - query (GET) and mutation (POST, PUT, DELETE)
  endpoints: (builder) => ({

    // --- QUERY ---
    // Queries are used for fetching data (GET requests).
    // RTK Query auto-caches the results, handles loading states, and supports automatic re-fetching.
    getTodos: builder.query<Todo[], void>({
      query: () => 'todos?_limit=4',
      // query: () => 'invalid-endpoint',
      providesTags: ['Todos'],
    }),
  }),
});

// Export the auto-generated React hook for the `getTodos` query
export const {
  // Hooks are generated based on the endpoint names you define (getTodos).
  // They follow the naming pattern:
  // use<EndpointName>Query

  useGetTodosQuery,
} = todoApi;



// Question: can I rename the hooks.
// No cannot rename the hooks directly inside the export statement when using RTK Query's createApi
//The hooks like useGetTodosQuery, useCreateTodoMutation are auto-generated based on the names of the endpoints you define in your API slice.

//can rename them when you import or export them manually

// export const {
//   useGetTodosQuery: useFetchTodos,
// } = todoApi;


