import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { decrementQuantity, incrementQuantity } from '../../features/todos/todosSlice';
import styles from './styles';

const NewScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) =>
    state.todos.list.filter(todo => todo.quantity > 0)
  );

  const handleDecrement = (id: string) => dispatch(decrementQuantity(id));
  const handleIncrement = (id: string) => dispatch(incrementQuantity(id));
  const handleGoBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart Items</Text>

      <View style={{ flex: 1 }}>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>No items in cart</Text>
        ) : (
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                <Text style={styles.itemText}>{item.title}</Text>
                <View style={styles.quantityControls}>
                  <TouchableOpacity onPress={() => handleDecrement(item.id)}>
                    <Text style={styles.quantityBtn}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => handleIncrement(item.id)}>
                    <Text style={styles.quantityBtn}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>

      <Button title="Go Back" onPress={handleGoBack} />
    </View>
  );
};

export default NewScreen;

