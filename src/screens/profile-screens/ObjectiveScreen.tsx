import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAppContext } from '../../context/AppContext';
import { colors, spacing } from '../../styles/globalStyles';
import { CustomTextInput, CustomButton, CustomHeader } from '../../components';

const ObjectiveScreen = () => {
  const { state, updateObjective } = useAppContext();
  const navigation = useNavigation();
  
  const [formData, setFormData] = useState({
    text: state.objective?.text || "",
  });

  const [errors, setErrors] = useState({
    text: "",
  });

  const validateForm = () => {
    const newErrors = { text: "" };
    let isValid = true;

    if (!formData.text.trim()) {
      newErrors.text = "Objective is required";
      isValid = false;
    } else if (formData.text.trim().length < 10) {
      newErrors.text = "Objective should be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
      updateObjective({ text: formData.text.trim() });
      navigation.goBack();
    } else {
      Alert.alert("Validation Error", "Please provide a meaningful objective.");
    }
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      
      <CustomHeader
        title="Career Objective"
        onBackPress={() => navigation.goBack()}
      />

      <KeyboardAwareScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          entering={FadeInUp.duration(500).delay(200)}
          style={styles.formContainer}
        >
          <CustomTextInput
            label="Career Objective"
            value={formData.text}
            onChangeText={(text) => updateField('text', text)}
            placeholder="Write a brief career objective that highlights your goals and aspirations..."
            error={errors.text}
            multiline={true}
            numberOfLines={6}
          />

          <CustomButton
            title="Save Objective"
            onPress={handleSave}
            style={styles.saveButton}
          />
        </Animated.View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default ObjectiveScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  formContainer: {
    padding: spacing.lg,
  },
  saveButton: {
    marginTop: spacing.xl,
  },
});
