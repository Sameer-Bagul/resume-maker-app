import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/main-screens/HomeScreen";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }} 
        />
    </Stack.Navigator>
)

export default HomeStackNavigator;
