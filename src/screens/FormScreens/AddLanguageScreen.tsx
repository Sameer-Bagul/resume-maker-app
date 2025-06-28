import React, { useState } from 'react';
import {
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAppContext } from '../../context/AppContext';
import { 
  CustomHeader, 
  CustomTextInput, 
  CustomButton,
  CustomPicker 
} from '../../components';
import { globalStyles, formStyles } from '../../styles/globalStyles';

const AddLanguageScreen = () => {
  const navigation = useNavigation();
  const { addLanguage } = useAppContext();

  const [formData, setFormData] = useState({
    language: '',
    proficiency: '',
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const proficiencyOptions = [
    { label: "Native", value: "Native" },
    { label: "Fluent", value: "Fluent" },
    { label: "Advanced", value: "Advanced" },
    { label: "Intermediate", value: "Intermediate" },
    { label: "Basic", value: "Basic" },
  ];

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.language.trim()) {
      newErrors.language = "Language is required";
    }
    if (!formData.proficiency.trim()) {
      newErrors.proficiency = "Proficiency level is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      Alert.alert("Validation Error", "Please fill in all required fields");
      return;
    }

    const languageData = {
      language: formData.language.trim(),
      proficiency: formData.proficiency,
    };
    
    addLanguage(languageData);
    navigation.goBack();
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <View style={globalStyles.container}>
      <CustomHeader title="Add Language" />
      
      <KeyboardAvoidingView 
        style={formStyles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={formStyles.scrollContainer}
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          extraScrollHeight={100}
        >
          <Animated.View 
            entering={FadeInUp.duration(500).delay(200)}
            style={globalStyles.formContainer}
          >
            <CustomTextInput
              label="Language"
              value={formData.language}
              onChangeText={(text) => updateFormData("language", text)}
              placeholder="e.g., English, Spanish, French"
              error={errors.language}
              required
            />

            <CustomPicker
              label="Proficiency Level"
              value={formData.proficiency}
              options={proficiencyOptions}
              onValueChange={(value) => updateFormData("proficiency", value)}
              placeholder="Select proficiency level"
              error={errors.proficiency}
              required
            />

            <View style={formStyles.buttonContainer}>
              <CustomButton
                title="Save Language"
                onPress={handleSave}
                size="large"
              />
              
              <CustomButton
                title="Cancel"
                onPress={() => navigation.goBack()}
                variant="outline"
                size="large"
              />
            </View>
          </Animated.View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddLanguageScreen;