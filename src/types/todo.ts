import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type TodoListScreenProp = NativeStackNavigationProp<any, 'TodoList'>


export type RootStackParamList = {
    TodoList: undefined
    NewScreen: undefined
}