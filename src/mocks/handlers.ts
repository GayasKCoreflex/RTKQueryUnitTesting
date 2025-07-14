import { http, HttpResponse } from 'msw';

// Defining request handlers
export const handlers = [

  // Handle GET requests to the todos endpoint
  http.get('https://jsonplaceholder.typicode.com/todos', ({ request }) => {
    console.log('MSW intercepted GET /todos');

     // Parse the incoming request URL to extract query parameters
    const url = new URL(request.url);

    // Extract the `_limit` query parameter (e.g., ?_limit=4)
    const limit = url.searchParams.get('_limit=4');

    // Define mock todo data to return
    const allTodos = [
      { id: 1, title: 'Learn MSW', completed: false },
      { id: 2, title: 'Write Tests', completed: true },
      { id: 3, title: 'Read Docs', completed: false },
      { id: 4, title: 'Build App', completed: true },
    ];

    // If a limit is provided, return only that number of todos
    // Otherwise return the full list
    const limitedTodos = limit ? allTodos.slice(0, Number(limit)) : allTodos;

    // Return the mock response as JSON with a 200 OK status
    return HttpResponse.json(limitedTodos);
  }),
];
