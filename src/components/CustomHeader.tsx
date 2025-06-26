import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, globalStyles } from '../styles/globalStyles';

interface CustomHeaderProps {
  title: string;
  showBackButton?: boolean;
  rightButton?: React.ReactNode;
  onBackPress?: () => void;
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  showBackButton = true,
  rightButton,
  onBackPress,
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={globalStyles.header}>
        {showBackButton ? (
          <TouchableOpacity
            style={globalStyles.headerButton}
            onPress={handleBackPress}
          >
            <Ionicons name="arrow-back" size={24} color={colors.cardBackground} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 40 }} />
        )}
        
        <Text style={globalStyles.headerTitle}>{title}</Text>
        
        {rightButton || <View style={{ width: 40 }} />}
      </View>
    </>
  );
};
