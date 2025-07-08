import React from 'react';
// Import testing utilities from React Native Testing Library
import { render, fireEvent } from '@testing-library/react-native';
// Import the component you're going to test
import AddButton from '../../src/components/AddButtonComponent';


// Start a test suite for the AddButton component
describe('AddButton Component', () => {


  // Test case 1: Checks if the button renders with default title "Add"
  it('renders with default title', () => {
    // Render the AddButton component with only onPress prop
    const { getByText } = render(<AddButton onPress={() => {}} />);

    // Assert that the button with text "Add" is present in the tree
    expect(getByText('Add')).toBeTruthy();
  });


  // Test case 2: Checks if the button renders with a custom title
  it('renders with custom title', () => {
    // Render the AddButton with title set to "Save"
    const { getByText } = render(<AddButton onPress={() => {}} title="Save" />);

    // Assert that the button displays "Save"
    expect(getByText('Save')).toBeTruthy();
  });

  
  // Test case 3: Checks if the onPress handler is called when button is pressed
  it('calls onPress when pressed', () => {
    // Create a mock function to pass as the onPress prop
    const onPressMock = jest.fn();

    // Render the AddButton and pass the mock as onPress
    const { getByTestId } = render(<AddButton onPress={onPressMock} />);

    // Simulate a button press using the testID
    fireEvent.press(getByTestId('add-button'));

    // Assert that the onPress function was called exactly once
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
