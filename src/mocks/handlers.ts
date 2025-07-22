import { http, HttpResponse } from 'msw';

// Defining request handlers
export const handlers = [

  // http.get(...)	Intercepts GET requests to the specified endpoint
  http.get('https://jsonplaceholder.typicode.com/todos', ({ request }) => {
    console.log('MSW intercepted GET /todos');

     // URL(request.url)	Parses the incoming request’s full URL
    const url = new URL(request.url);

    // url.searchParams.get	Extracts query parameters (_limit)
    const limit = url.searchParams.get('_limit');

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

    // HttpResponse.json()	Sends back a mock JSON response as JSON with a 200 OK status
    return HttpResponse.json(limitedTodos);
  }),
];

// Note:  when using MSW, it never calls the actual API during tests (or development, if MSW is enabled).

// MSW intercepts the request.
// Checks if there’s a matching handler.
// If matched (like your http.get(...)), it returns the mocked response (like allTodos).
// Sets isSuccess = true in RTK Query
// Your UI renders the mock todos
// To app or test, it looks like a real response — but it's 100% simulated.
