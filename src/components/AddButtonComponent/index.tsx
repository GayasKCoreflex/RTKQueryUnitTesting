import { TouchableOpacity, Text } from 'react-native'
import styles from './styles'

interface AddButtonProps {
  onPress: () => void
  title?: string
}

const AddButton: React.FC<AddButtonProps> = ({ onPress, title = 'Add' }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default AddButton
