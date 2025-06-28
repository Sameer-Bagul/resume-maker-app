import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TemplateScreen from "../screens/main-screens/TemplateScreen";
import TemplatePreviewScreen from "../screens/template-screens/TemplatePreviewScreen";

const Stack = createNativeStackNavigator();

const TemplateStackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Template"
            component={TemplateScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="TemplatePreview"
            component={TemplatePreviewScreen}
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
)

export default TemplateStackNavigator;
