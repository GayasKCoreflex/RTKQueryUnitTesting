export const fetchTodosFromAPI = async () => {
  try {
    const response = await fetch('http://jsonplaceholder.typicode.com/todos?_limit=4');

    if (!response.ok) {
      console.error("Response NOT ok:", response.status, response.statusText);
      throw new Error(`Failed to fetch todos: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();

    return data.map((todo: any) => ({
      id: todo.id.toString(),
      text: todo.title,
      completed: todo.completed,
    }));

  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};
