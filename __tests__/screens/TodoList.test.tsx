import React from 'react';
import { render, waitFor, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import TodoList from '../../src/screens/TodoList';
import { server } from '../../src/mocks/server';
import { http, HttpResponse } from 'msw';
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../../src/features/todos/todosSlice';
import { todoApi } from '../../src/features/api/todoApiRTKSlice';


//function to render a component with necessary providers
const renderWithProviders = (ui: React.ReactElement) => {

  // Create a Redux store instance for each test
  const store = configureStore({
    reducer: {
      // Register the todoApi reducer (RTK Query)
      [todoApi.reducerPath]: todoApi.reducer,
      // Register the todos reducer (for normal Redux slice)
      todos: todosReducer,
    },

    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(todoApi.middleware),
  });

  // Wrap the component with Redux and Navigation providers and render it
  return render(
    <Provider store={store}>
      <NavigationContainer>{ui}</NavigationContainer>
    </Provider>
  );
};


// Start of the test suite.
describe('TodoList with MSW', () => {

  // Start MSW server before running any tests
  beforeAll(() => server.listen());

  // Reset all request handlers after each test to avoid test contamination
  afterEach(() => server.resetHandlers());

  // Clean up MSW server after all tests complete
  afterAll(() => server.close());


  //Test 1: Successful rendering of todos from the API
  it('renders todos from API', async () => {
    // Render the TodoList component using our helper
    renderWithProviders(<TodoList />);

    // Initially, the ActivityIndicator (loader) should appear
    expect(screen.getByTestId('ActivityIndicator')).toBeTruthy();

    // Wait for the todos to appear in the UI after successful fetch
    await waitFor(() => {
      // These are sample titles returned by the mock response
      expect(screen.getByText('Learn MSW')).toBeTruthy();
      expect(screen.getByText('Write Tests')).toBeTruthy();
    });
  });


  //Test 2: Show error message on API failure
  it('shows error on API failure', async () => {
    // Override the default MSW handler to return a 500 error
    server.use(
      http.get('https://jsonplaceholder.typicode.com/todos', () => {
        return new HttpResponse(null, { status: 500 }); // Simulating server error
      })
    );

    // Render the TodoList again
    renderWithProviders(<TodoList />);

    // The ActivityIndicator should still appear while loading
    expect(screen.getByTestId('ActivityIndicator')).toBeTruthy();

    // Wait for the error state to appear
    await waitFor(() => {
      // Confirm that the error UI is shown
      expect(screen.getByTestId('error-message')).toBeTruthy();
      expect(screen.getByText('something went wrong')).toBeTruthy();
    });

    // Confirm that the original todos are not shown when there's an error
    expect(screen.queryByText('Learn MSW')).toBeNull();
  });

});
