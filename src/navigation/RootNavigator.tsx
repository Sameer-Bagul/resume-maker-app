import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "./HomeStackNavigator";
import TemplateStackNavigator from "./TemplatesStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import { Ionicons } from "@expo/vector-icons"

const Tab = createBottomTabNavigator();

const RootNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: string;
                    if (route.name == "HomeTab") {
                        iconName = focused ? "home" : "home-outline"
                    } else if (route.name == "TemplateTab") {
                        iconName = focused ? "document-text" : "document-text-outline"
                    } else if (route.name == "ProfileTab") {
                        iconName = focused ? "person" : "person-outline"
                    } else {
                        iconName = "ellipsis-horizontal"
                    }

                    return <Ionicons name={iconName as any} size={size} color={color} />
                },

                tabBarActiveTintColor: "#007AFF",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: { backgroundColor: "#f5f5f5" }
            })}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeStackNavigator}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="TemplateTab"
                component={TemplateStackNavigator}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileStackNavigator}
                options={{ headerShown: false }}
            />

        </Tab.Navigator>
    )
}

export default RootNavigator;
// This file sets up the root navigator for the app, which includes three tabs: