import { TextInput } from 'react-native'
import styles from './styles'

interface TodoInputProps {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
}

const TodoInput: React.FC<TodoInputProps> = ({ value, onChangeText, placeholder }) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
    />
  )
}

export default TodoInput

