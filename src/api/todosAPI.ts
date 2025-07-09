import axios, { AxiosError } from 'axios';

export const fetchTodosFromAPI = async () => {
  try {
    const response = await axios.get('http://jsonplaceholder.typicode.com/todos?_limit=4');

    return response.data.map((todo: any) => ({
      id: todo.id.toString(),
      text: todo.title,
      completed: todo.completed,
    }));
  } catch (error) {
    const err = error as AxiosError;
    console.error('Error fetching todos:', err);
    throw new Error(err.message || 'Failed to fetch todos');
  }
};
