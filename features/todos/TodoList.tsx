import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, toggleTodo, deleteTodo, fetchTodos } from './todosSlice'
import { AppDispatch, RootState } from '../../store'

const TodoList = () => {
  const [text, setText] = useState('')
  const dispatch = useDispatch<AppDispatch>()

  const todos = useSelector((state: RootState) => state.todos.list)
  const loading = useSelector((state: RootState) => state.todos.loading)
  const error = useSelector((state: RootState) => state.todos.error)

  console.log("todos-->",todos.length);
  

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])


  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text))
      setText('')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={text}
          placeholder="Add a todo..."
          onChangeText={setText}
        />
        <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoRow}>
            <Text
              onPress={() => dispatch(toggleTodo(item.id))}
              style={[styles.todoText, item.completed && styles.completedText]}
            >
              {item.text}
            </Text>
            <TouchableOpacity onPress={() => dispatch(deleteTodo(item.id))}>
              <Text style={styles.deleteButton}>x</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {loading && <ActivityIndicator size="large" color="#007AFF" />}
      {error && <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>}
    </View>

  )
}

export default TodoList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ccc',
    borderRadius: 5
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  todoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    width: 350
  },
  todoText: {
    fontSize: 16
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray'
  },
  deleteButton: {
    fontSize: 20,
    fontWeight: 600,
    color: "red"
  }
})
