import React from 'react';
import { render, fireEvent } from '@testing-library/react-native'; // Render + simulate events
import TodoInput from '../../src/components/TodoInputComponent'; 

describe('TodoInput Component', () => {
  // Test if input renders with given value
  it('renders the input with provided value', () => {
    const { getByDisplayValue } = render(
      <TodoInput value="Initial Text" onChangeText={() => {}} />
    );

    // Checks if the TextInput is showing the initial value
    expect(getByDisplayValue('Initial Text')).toBeTruthy();
  });

  // Test if placeholder text is rendered
  it('renders the placeholder text', () => {
    const { getByPlaceholderText } = render(
      <TodoInput value="" onChangeText={() => {}} placeholder="Type here..." />
    );

    //   Checks if the placeholder is shown
    expect(getByPlaceholderText('Type here...')).toBeTruthy();
  });

  // Test if onChangeText is called when text is typed
  it('calls onChangeText when input changes', () => {
    const mockFn = jest.fn(); // mock function to test
    const { getByPlaceholderText } = render(
      <TodoInput value="" onChangeText={mockFn} placeholder="Write..." />
    );

    const input = getByPlaceholderText('Write...');
    fireEvent.changeText(input, 'New Task');

    //   Checks if the mock onChangeText was called with the right value
    expect(mockFn).toHaveBeenCalledWith('New Task');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

});
