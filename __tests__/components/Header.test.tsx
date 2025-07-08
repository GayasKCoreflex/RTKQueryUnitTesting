import React from 'react';
import { render, fireEvent } from '@testing-library/react-native'; // RTL functions for rendering and simulating user events
import Header from '../../src/components/HeaderComponent'; // Import the Header component
import * as reactRedux from 'react-redux'; // Import everything from react-redux to mock useSelector

// Start of test suite for Header component
describe('Header Component', () => {

  // Create a mock for useSelector
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');


  // Clear all mocks before each test to avoid state leakage between tests
  beforeEach(() => {
    jest.clearAllMocks();
  });


  // Test if the Header renders the title correctly
  it('renders the title correctly', () => {
    useSelectorMock.mockReturnValue(0); // Simulate cart count = 0
    const { getByText } = render(<Header title="My App" />);
    expect(getByText('My App')).toBeTruthy(); // Check if title is rendered
  });

  // Test if the cart icon is always visible
  it('shows the cart icon', () => {
    useSelectorMock.mockReturnValue(0); // Simulate cart count = 0
    const { getByText } = render(<Header title="My App" />);
    expect(getByText('🛒')).toBeTruthy(); // Ensure cart icon is shown
  });


  // Test that the badge is NOT shown when cart count is 0
  it('does not show badge if cart count is 0', () => {
    useSelectorMock.mockReturnValue(0); // Simulate empty cart
    const { queryByTestId } = render(<Header title="No Items" />);
    expect(queryByTestId('cart-badge-count')).toBeNull(); // Badge should not exist(It does not throw an error if the element is missing )
  });


  // Test that the badge is shown with correct number when cart count > 0
  it('shows badge with correct cart count', () => {
    useSelectorMock.mockReturnValue(5); // Simulate 5 items in cart
    const { getByText } = render(<Header title="Cart Test" />);
    expect(getByText('5')).toBeTruthy(); // Badge should show "5"
  });

  // Test that pressing the cart icon calls the provided onCartPress function
  it('calls onCartPress when cart is pressed', () => {
    useSelectorMock.mockReturnValue(2); // Simulate cart count

    const onCartPressMock = jest.fn(); // Create mock callback

    const { getByText } = render(
      <Header title="Click Test" onCartPress={onCartPressMock} />
    );

    fireEvent.press(getByText('🛒')); // Simulate user pressing the cart icon
    expect(onCartPressMock).toHaveBeenCalledTimes(1); // Check if function is called
  });
});
