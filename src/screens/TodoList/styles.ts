// src/screens/TodoList/styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  todoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  todoTextContainer: {
    width: 200,
  },
  todoText: {
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 5,
  },
  quantityButton: {
    fontSize: 18,
    paddingHorizontal: 10,
    color: '#007AFF',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  deleteButton: {
    fontSize: 20,
    fontWeight: '600',
    color: 'red',
  },
  navigateButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  navigateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default styles;
