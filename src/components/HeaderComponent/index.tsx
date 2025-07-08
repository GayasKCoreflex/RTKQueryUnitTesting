import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './styles';


interface HeaderProps {
  title: string;
  onCartPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onCartPress }) => {
  
  // Redux state
  const cartCount = useSelector((state: RootState) =>
    state.todos.list.reduce((total, todo) => total + todo.quantity, 0)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity 
        onPress={onCartPress} 
        style={styles.cartContainer}
        activeOpacity={0.7}
      >
        <Text style={styles.cartIcon}>🛒</Text>

        {cartCount > 0 && (
          <View style={styles.badge} testID="cart-count-badge">
            <Text style={styles.badgeText}>
              {cartCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;