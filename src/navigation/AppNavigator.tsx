import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/todo'
import Header from '../components/HeaderComponent'
import TodoList from '../screens/TodoList'
import NewScreen from '../screens/NewScreen'

const Stack = createNativeStackNavigator<RootStackParamList>()

const AppNavigator = () => {
    return (
        <>
            <Header title="Redux Toolkit" onCartPress={() => console.log('Cart clicked')} />
            <NavigationContainer>
                <Stack.Navigator initialRouteName="TodoList">
                    <Stack.Screen name="TodoList" component={TodoList} options={{ headerShown: false }} />
                    <Stack.Screen name="NewScreen" component={NewScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

export default AppNavigator
