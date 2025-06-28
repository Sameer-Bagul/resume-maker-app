import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { 
  CustomHeader, 
  CustomTextInput, 
  CustomButton,
  LoadingOverlay 
} from '../../components';
import { globalStyles, formStyles } from '../../styles/globalStyles';
import { ResumeData } from '../../types/index';

const ResumeFormScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    title: "",
    objective: "",
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert("Validation Error", "Please fill in all required fields correctly");
      return;
    }

    setIsLoading(true);

    // Simulate processing time
    setTimeout(() => {
      const resumeData: ResumeData = {
        ...formData,
        experience: [],
        education: [],
        projects: [],
        skills: [],
        languages: [],
        certificates: [],
        qualifications: [],
        awards: [],
        organizations: [],
        hobbies: [],
        references: [],
        template: "modern",
        color: "#007AFF",
      };

      setIsLoading(false);
      navigation.navigate("TemplateSelection", { resumeData });
    }, 1000);
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
      <CustomHeader title="Create Resume" />
      
      <LoadingOverlay visible={isLoading} message="Setting up your resume..." />
      
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
              value={formData.fullName}
              onChangeText={(text) => updateFormData("fullName", text)}
              placeholder="e.g., John Doe"
              error={errors.fullName}
              required
            />

            <CustomTextInput
              label="Professional Title"
              value={formData.title}
              onChangeText={(text) => updateFormData("title", text)}
              placeholder="e.g., Software Engineer, Marketing Manager"
              error={errors.title}
            />

            <CustomTextInput
              label="Email Address"
              value={formData.email}
              onChangeText={(text) => updateFormData("email", text)}
              placeholder="e.g., john.doe@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
              required
            />

            <CustomTextInput
              label="Phone Number"
              value={formData.phone}
              onChangeText={(text) => updateFormData("phone", text)}
              placeholder="e.g., +1 (555) 123-4567"
              keyboardType="phone-pad"
              error={errors.phone}
              required
            />

            <CustomTextInput
              label="Address"
              value={formData.address}
              onChangeText={(text) => updateFormData("address", text)}
              placeholder="e.g., 123 Main St, City, State, Country"
              error={errors.address}
              required
            />

            <CustomTextInput
              label="Professional Objective (Optional)"
              value={formData.objective}
              onChangeText={(text) => updateFormData("objective", text)}
              placeholder="Brief description of your career goals and what you bring to the role..."
              multiline
              numberOfLines={4}
              style={globalStyles.multilineInput}
            />

            <View style={formStyles.buttonContainer}>
              <CustomButton
                title="Continue to Template Selection"
                onPress={handleSubmit}
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

export default ResumeFormScreen;
