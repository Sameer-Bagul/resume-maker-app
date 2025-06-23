import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons"


import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    TemplateTab: { screen: string };
    // add other routes here if needed
};

const HomeScreen = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <LinearGradient style={styles.container} colors={["#4B6CB7", "#182848"]}>
            <View style={styles.circleTopLeft} />
            <View style={styles.circleBottomRight} />

            <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Build Your Perfect CV</Text>
                    <Text style={styles.Subtitle}>Create Professional Resume In Minutes Wit our Easy to Use Templates</Text>
                </View>

                <View style={styles.iconContainer}>
                    <Ionicons name="document-text-outline" size={80} color="white" />
                </View>

                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("TemplateTab", { screen: "Templates" })}
                    style={styles.createButton}>
                    <LinearGradient style={styles.ButtonGradient} colors={["#007AFF", "#005BB5"]}>
                        <Ionicons
                            name="add"
                            size={28}
                            color="white"
                            style={styles.buttonIcon}
                        />
                        <Text style={styles.ButtonText}>Create With Template</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.manualButton}>
                    <Text style={styles.manualButtonText}>Or create Manually</Text>
                </TouchableOpacity>

            </View>


        </LinearGradient>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleTopLeft: {
        position: 'absolute',
        top: -50,
        left: -50,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    circleBottomRight: {
        position: 'absolute',
        bottom: -30,
        right: -30,
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    contentContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 3, height: 2 },
        textShadowRadius: 2,
    },
    Subtitle: {
        fontSize: 16,
        color: '#E0E0E0',
        lineHeight: 24,
        paddingHorizontal: 20,
        textAlign: 'center',
    },
    iconContainer: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        // elevation: 8,
    },
    createButton: {
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        elevation: 8,
        shadowOpacity: 0.3,
    },
    ButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 30,
    },
    buttonIcon: {
        marginRight: 10,
    },
    ButtonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: '600',
    },
    manualButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderWidth: 1,
    },
    manualButtonText: {
        fontSize: 16,
        color: '#fff',
        lineHeight: 24,
        fontWeight: '500',
    },

})