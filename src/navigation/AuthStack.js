import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screens/LoginScreen";
import { Register } from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator()

export default AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login}>
            </Stack.Screen>
            <Stack.Screen name="Register" component={Register}>
            </Stack.Screen>
        </Stack.Navigator>
    )
}