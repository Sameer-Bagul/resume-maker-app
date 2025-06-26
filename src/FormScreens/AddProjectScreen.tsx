import React, { useState } from "react";
import {
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useAppContext } from "../context/AppContext";
import { 
  CustomHeader, 
  CustomTextInput, 
  CustomButton,
  CustomDatePicker 
} from "../components";
import { globalStyles, formStyles } from "../styles/globalStyles";

const AddProjectScreen = () => {
  const navigation = useNavigation();
  const { addProject } = useAppContext();

  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    role: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    technologies: "",
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.projectName.trim()) {
      newErrors.projectName = "Project name is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.role.trim()) {
      newErrors.role = "Your role is required";
    }
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }
    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDateForDisplay = (date: Date | undefined) => {
    if (!date) return "";
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  const handleSave = () => {
    if (!validateForm()) {
      Alert.alert("Validation Error", "Please fill in all required fields");
      return;
    }

    addProject({
      projectName: formData.projectName,
      description: formData.description,
      role: formData.role,
      duration: `${formatDateForDisplay(formData.startDate)} - ${formatDateForDisplay(formData.endDate)}`,
    });
    navigation.goBack();
  };

  const updateFormData = (field: string, value: string | Date) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <View style={globalStyles.container}>
      <CustomHeader title="Add Project" />
      
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
              label="Project Name"
              value={formData.projectName}
              onChangeText={(text) => updateFormData("projectName", text)}
              placeholder="e.g., E-commerce Mobile App"
              error={errors.projectName}
              required
            />

            <CustomTextInput
              label="Project Description"
              value={formData.description}
              onChangeText={(text) => updateFormData("description", text)}
              placeholder="Describe the project, technologies used, and key features..."
              error={errors.description}
              multiline
              numberOfLines={6}
              style={globalStyles.multilineInput}
              required
            />

            <CustomTextInput
              label="Your Role"
              value={formData.role}
              onChangeText={(text) => updateFormData("role", text)}
              placeholder="e.g., Lead Developer, UI/UX Designer"
              error={errors.role}
              required
            />

            <CustomTextInput
              label="Technologies Used"
              value={formData.technologies}
              onChangeText={(text) => updateFormData("technologies", text)}
              placeholder="e.g., React Native, TypeScript, Firebase"
              multiline
              numberOfLines={2}
            />

            <View style={formStyles.fieldRow}>
              <View style={formStyles.fieldHalf}>
                <CustomDatePicker
                  label="Start Date"
                  value={formData.startDate}
                  onDateChange={(date) => updateFormData("startDate", date)}
                  placeholder="Select start date"
                  error={errors.startDate}
                  required
                />
              </View>

              <View style={formStyles.fieldHalf}>
                <CustomDatePicker
                  label="End Date"
                  value={formData.endDate}
                  onDateChange={(date) => updateFormData("endDate", date)}
                  placeholder="Select end date"
                  error={errors.endDate}
                  required
                />
              </View>
            </View>

            <View style={formStyles.buttonContainer}>
              <CustomButton
                title="Save Project"
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

export default AddProjectScreen;
