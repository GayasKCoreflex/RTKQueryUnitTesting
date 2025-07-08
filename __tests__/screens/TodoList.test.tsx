// Import required React and testing utilities
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { NavigationContainer } from '@react-navigation/native';
import { thunk } from 'redux-thunk';

import TodoList from '../../src/screens/TodoList';

// Creating mock Redux store with thunk middleware
const middlewares = [thunk];
const mockStore = configureStore(middlewares);


// Creating a mock dispatch function to capture dispatched actions
const mockDispatch = jest.fn();
// Mocking the useDispatch hook from react-redux to return mockDispatch
jest.mock('react-redux', () => {
    const actualRedux = jest.requireActual('react-redux');
    return {
        ...actualRedux,
        useDispatch: () => mockDispatch, // override only useDispatch
    };
});

// Mocking useNavigation to intercept navigation without a real navigator
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: mockNavigate, // override navigate function
        }),
    };
});


// Renders TodoList with mocked Redux store
const renderWithStore = (customState = {}) => {
    const store = mockStore({
        todos: {
            list: [
                { id: '1', text: 'Buy Milk', completed: false, quantity: 1 },
                { id: '2', text: 'Do Homework', completed: true, quantity: 3 },
            ],
            loading: false,
            error: null,
            ...customState, // allows overriding state like loading/error
        },
    });

    return render(
        <Provider store={store}>
            <NavigationContainer>
                <TodoList />
            </NavigationContainer>
        </Provider>
    );
};



describe('TodoList Screen', () => {
    // UI rendering test
    it('shows the title', () => {
        const { getByTestId } = renderWithStore();
        expect(getByTestId('todo-title')).toBeTruthy();
    });

    it('shows the input field', () => {
        const { getByPlaceholderText } = renderWithStore();
        expect(getByPlaceholderText('Add a todo...')).toBeTruthy();
    });

    it('shows the add button and can press it', () => {
        const { getByTestId } = renderWithStore();
        fireEvent.press(getByTestId('add-button'));
    });

    // Conditional rendering based on loading and error states
    it('shows a loading spinner when loading', () => {
        const { getByTestId } = renderWithStore({ loading: true });
        expect(getByTestId('loading-indicator')).toBeTruthy();
    });

    it('shows an error message if there is an error', () => {
        const errorMessage = 'Something went wrong';
        const { getByTestId } = renderWithStore({ error: errorMessage });

        const errorText = getByTestId('error-message');
        expect(errorText).toBeTruthy();
        expect(errorText.props.children).toBe(errorMessage);
    });

    // Text input functionality
    it('updates text input when typing', () => {
        const { getByPlaceholderText } = renderWithStore();
        const input = getByPlaceholderText('Add a todo...');
        fireEvent.changeText(input, 'New Task');
        expect(input.props.value).toBe('New Task');
    });

    // Action dispatch tests
    it('dispatches addTodo when add button is pressed', () => {
        const { getByPlaceholderText, getByTestId } = renderWithStore();
        const input = getByPlaceholderText('Add a todo...');
        const button = getByTestId('add-button');

        fireEvent.changeText(input, 'New Task');
        fireEvent.press(button);

        expect(mockDispatch).toHaveBeenCalledWith({ type: 'todos/addTodo', payload: 'New Task' });
    });

    it('dispatches toggleTodo when todo text is pressed', () => {
        const { getByTestId } = renderWithStore();
        fireEvent.press(getByTestId('todo-text-1'));
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'todos/toggleTodo',
            payload: '1',
        });
    });

    it('dispatches incrementQuantity when "+" is pressed', () => {
        const { getByTestId } = renderWithStore();
        fireEvent.press(getByTestId('increment-1'));
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'todos/incrementQuantity', payload: '1' });
    });

    it('dispatches decrementQuantity when "-" is pressed', () => {
        const { getByTestId } = renderWithStore();
        fireEvent.press(getByTestId('decrement-1'));
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'todos/decrementQuantity', payload: '1' });
    });

    it('dispatches deleteTodo when delete button is pressed', () => {
        const { getByTestId } = renderWithStore();
        fireEvent.press(getByTestId('delete-1'));
        expect(mockDispatch).toHaveBeenCalledWith({ type: 'todos/deleteTodo', payload: '1' });
    });

    // Navigation
    it('navigates to next screen when button is pressed', () => {
        const { getByTestId } = renderWithStore();
        fireEvent.press(getByTestId('navigate-button'));
        expect(mockNavigate).toHaveBeenCalledWith('NewScreen');
    });
});
