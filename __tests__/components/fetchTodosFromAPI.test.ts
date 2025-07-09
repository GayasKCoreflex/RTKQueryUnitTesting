// Import axios and the function to be tested
import axios from 'axios';
import { fetchTodosFromAPI } from '../../src/api/todosAPI';

// Mocking the axios library globally  (no actual calls made)
jest.mock('axios');

describe('fetchTodosFromAPI using axios', () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>; // Type-safe mock reference

    // Reset mocks after each test to avoid test pollution
    afterEach(() => {
        jest.resetAllMocks();
    });


    it('fetches todos and returns formatted data', async () => {
        // Sample API response to be returned by the mock
        const mockTodos = [
            { id: 1, title: 'Test Todo 1', completed: false },
            { id: 2, title: 'Test Todo 2', completed: true },
        ];

        // Simulating axios.get returning this mock data
        mockedAxios.get.mockResolvedValueOnce({ data: mockTodos });

        // Call the actual function
        const result = await fetchTodosFromAPI();

        // Validate axios call was made with the correct URL
        expect(mockedAxios.get).toHaveBeenCalledWith('http://jsonplaceholder.typicode.com/todos?_limit=4');

        // Validate transformed output from the API response
        expect(result).toEqual([
            { id: '1', text: 'Test Todo 1', completed: false },
            { id: '2', text: 'Test Todo 2', completed: true },
        ]);
    });


    it('throws error if axios response fails (network error)', async () => {
        // Suppress console.error in test output
        jest.spyOn(console, 'error').mockImplementation(() => { });

        // Simulate axios throwing an error
        mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

        // Validate the function throws that error
        await expect(fetchTodosFromAPI()).rejects.toThrow('Network error');
    });
});
