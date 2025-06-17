import React, { useEffect, useState } from 'react';
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
  fetchTodos,
  incrementQuantity,
  toggleTodo,
} from '../../features/todos/todosSlice';
import TodoInput from '../../components/TodoInputComponent';
import AddButton from '../../components/AddButtonComponent';
import { TodoListScreenProp } from '../../types/todo';
import styles from './styles';

const TodoList = () => {
  const [text, setText] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.list);
  const loading = useSelector((state: RootState) => state.todos.loading);
  const error = useSelector((state: RootState) => state.todos.error);

  const navigation = useNavigation<TodoListScreenProp>();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>

      <View style={styles.inputRow}>
        <TodoInput
          value={text}
          onChangeText={setText}
          placeholder="Add a todo..."
        />
        <AddButton onPress={handleAdd} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.todoRow}>
              <View style={styles.todoTextContainer}>
                <Text
                  onPress={() => dispatch(toggleTodo(item.id))}
                  style={[
                    styles.todoText,
                    item.completed && styles.completedText,
                  ]}>
                  {item.text}
                </Text>
              </View>

              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() => dispatch(decrementQuantity(item.id))}>
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => dispatch(incrementQuantity(item.id))}>
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => dispatch(deleteTodo(item.id))}>
                <Text style={styles.deleteButton}>x</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate('NewScreen')}
        style={styles.navigateButton}>
        <Text style={styles.navigateButtonText}>Go to Next Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodoList;