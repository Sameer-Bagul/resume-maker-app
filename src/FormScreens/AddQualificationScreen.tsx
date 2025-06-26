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

const AddQualificationScreen = () => {
  const navigation = useNavigation();
  const { addQualification } = useAppContext();

  const [formData, setFormData] = useState({
    degree: "",
    institution: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    description: "",
    grade: "",
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.degree.trim()) {
      newErrors.degree = "Degree is required";
    }
    if (!formData.institution.trim()) {
      newErrors.institution = "Institution is required";
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

    const qualification = {
      degree: formData.degree.trim(),
      institution: formData.institution.trim(),
      duration: `${formatDateForDisplay(formData.startDate)} - ${formatDateForDisplay(formData.endDate)}`,
      description: formData.description.trim() || undefined,
      grade: formData.grade.trim() || undefined,
    };
    
    addQualification(qualification);
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
      <CustomHeader title="Add Qualification" />
      
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
              label="Degree"
              value={formData.degree}
              onChangeText={(text) => updateFormData("degree", text)}
              placeholder="e.g., Bachelor of Computer Science"
              error={errors.degree}
              required
            />

            <CustomTextInput
              label="Institution"
              value={formData.institution}
              onChangeText={(text) => updateFormData("institution", text)}
              placeholder="e.g., Stanford University"
              error={errors.institution}
              required
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

            <CustomTextInput
              label="Grade/GPA (Optional)"
              value={formData.grade}
              onChangeText={(text) => updateFormData("grade", text)}
              placeholder="e.g., 3.8 GPA, First Class"
            />

            <CustomTextInput
              label="Description (Optional)"
              value={formData.description}
              onChangeText={(text) => updateFormData("description", text)}
              placeholder="Additional details about your qualification, achievements, etc."
              multiline
              numberOfLines={4}
              style={globalStyles.multilineInput}
            />

            <View style={formStyles.buttonContainer}>
              <CustomButton
                title="Save Qualification"
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

export default AddQualificationScreen;
