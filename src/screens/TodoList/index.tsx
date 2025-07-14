import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { AppDispatch, RootState } from '../../store/store';
import {
  addTodo,
  decrementQuantity,
  deleteTodo,
  incrementQuantity,
  setTodosFromAPI,
  toggleTodo,
} from '../../features/todos/todosSlice';
import TodoInput from '../../components/TodoInputComponent';
import AddButton from '../../components/AddButtonComponent';
import { TodoListScreenProp } from '../../types/todo';
import styles from './styles';
import { useGetTodosQuery } from '../../features/api/todoApiRTKSlice';

const TodoList = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<TodoListScreenProp>();

  // Select state from Redux
  const todos = useSelector((state: RootState) => state.todos.list);

  // RTK Query hook
  const {
    data,              // latest fulfilled server response
    // currentData,       // most recent cache state (could be different during refetch) 
    isLoading,
    isError,
    // error,
    isSuccess,
    // isFetching
   } = useGetTodosQuery();

  useEffect(() => {
  if (isSuccess && data) {
    const transformedData = data.map(todo => ({
      id: todo.id.toString(),
      title: todo.title,
      completed: todo.completed,
    }));

    dispatch(setTodosFromAPI(transformedData));
  }
}, [isSuccess, data, dispatch]);


  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} testID="todo-title">Todo List</Text>
      <View style={styles.inputRow}>
        <TodoInput
          value={text}
          onChangeText={setText}
          placeholder="Add a todo..."
        />
        <AddButton onPress={handleAdd} />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#007AFF" testID="ActivityIndicator"/>
      ) : isError ? (
        <Text style={styles.errorText} testID="error-message">
         something went wrong
        </Text>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.todoRow}>
              <View style={styles.todoTextContainer}>
                <Text
                  onPress={() => dispatch(toggleTodo(item.id))}
                  style={[
                    styles.todoText,
                    item.completed && styles.completedText,
                  ]}>
                  {item.title}
                </Text>
              </View>

              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() => dispatch(decrementQuantity(item.id))}
                  testID={`decrement-${item.id}`}
                >
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => dispatch(incrementQuantity(item.id))}
                  testID={`increment-${item.id}`}
                >
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => dispatch(deleteTodo(item.id))}
                testID={`delete-${item.id}`}
              >
                <Text style={styles.deleteButton}>x</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate('NewScreen')}
        style={styles.navigateButton}
        testID="navigate-button"
      >
        <Text style={styles.navigateButtonText} >Go to Next Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodoList;
