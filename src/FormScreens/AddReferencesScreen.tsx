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
import { useAppContext } from '../context/AppContext';
import { 
  CustomHeader, 
  CustomTextInput, 
  CustomButton 
} from '../components';
import { globalStyles, formStyles } from '../styles/globalStyles';

const AddReferencesScreen = () => {
  const navigation = useNavigation();
  const { addReference } = useAppContext();

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    company: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    }
    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSave = () => {
    if (!validateForm()) {
      Alert.alert("Validation Error", "Please fill in all required fields correctly");
      return;
    }

    const reference = {
      name: formData.name.trim(),
      position: formData.position.trim(),
      company: formData.company.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
    };
    
    addReference(reference);
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
      <CustomHeader title="Add Reference" />
      
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
              label="Full Name"
              value={formData.name}
              onChangeText={(text) => updateFormData("name", text)}
              placeholder="e.g., John Smith"
              error={errors.name}
              required
            />

            <CustomTextInput
              label="Position"
              value={formData.position}
              onChangeText={(text) => updateFormData("position", text)}
              placeholder="e.g., Senior Software Engineer"
              error={errors.position}
              required
            />

            <CustomTextInput
              label="Company"
              value={formData.company}
              onChangeText={(text) => updateFormData("company", text)}
              placeholder="e.g., Google Inc."
              error={errors.company}
              required
            />

            <CustomTextInput
              label="Email Address"
              value={formData.email}
              onChangeText={(text) => updateFormData("email", text)}
              placeholder="e.g., john.smith@company.com"
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              required
            />

            <CustomTextInput
              label="Phone Number"
              value={formData.phone}
              onChangeText={(text) => updateFormData("phone", text)}
              placeholder="e.g., +1 (555) 123-4567"
              error={errors.phone}
              keyboardType="phone-pad"
              required
            />

            <View style={formStyles.buttonContainer}>
              <CustomButton
                title="Save Reference"
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

export default AddReferencesScreen;