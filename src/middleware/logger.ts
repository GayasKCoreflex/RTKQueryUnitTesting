import { Middleware } from '@reduxjs/toolkit';
import { Alert } from 'react-native';

const blockedWords = ['bad', 'offensive', 'dummy'];

//Middleware to log actions & filter bad todos
const logger: Middleware = store => next => (action: any) => {

  // check for Bad todos
  if (action.type === 'todos/addTodo') {
    const text: string = action.payload.toLowerCase();

    const notAllowed = blockedWords.some(word => text.includes(word));

    if (notAllowed) {
      Alert.alert('Invalid Todo', 'Contains inappropriate language.');
      return;
    }
  }

  //If action is allowed, Forwards the valid action to the reducer.
  const result = next(action);

  // Log updated state after the reducer processes the action
  console.log('Next state:', store.getState());
  console.log('Result:', result);

  return result;
};

export default logger;
