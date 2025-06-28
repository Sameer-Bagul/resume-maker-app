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
import { useAppContext } from "../../context/AppContext";
import { 
  CustomHeader, 
  CustomTextInput, 
  CustomButton,
  CustomPicker,
  CustomDatePicker,
  SuccessFeedback
} from "../../components";
import { globalStyles, formStyles, colors, spacing } from "../../styles/globalStyles";

const AddExperienceScreen = () => {
  const navigation = useNavigation();
  const { addExperience } = useAppContext();
  
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    description: "",
    isCurrentlyWorking: false,
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required";
    }
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }
    if (!formData.isCurrentlyWorking && !formData.endDate) {
      newErrors.endDate = "End date is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
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

    const experience = {
      jobTitle: formData.jobTitle,
      companyName: formData.companyName,
      location: formData.location,
      duration: `${formatDateForDisplay(formData.startDate)} - ${
        formData.isCurrentlyWorking ? "Present" : formatDateForDisplay(formData.endDate)
      }`,
      description: formData.description,
      isCurrentlyWorking: formData.isCurrentlyWorking ? "Yes" : "No",
    };

    addExperience(experience);
    setShowSuccess(true);
    
    // Navigate back after showing success
    setTimeout(() => {
      navigation.goBack();
    }, 1500);
  };

  const updateFormData = (field: string, value: string | boolean | Date) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const currentlyWorkingOptions = [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
  ];

  return (
    <View style={globalStyles.container}>
      <CustomHeader title="Add Experience" />
      <SuccessFeedback
        visible={showSuccess}
        message="Experience saved successfully!"
        onHide={() => setShowSuccess(false)}
      />
      
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
              label="Job Title"
              value={formData.jobTitle}
              onChangeText={(text) => updateFormData("jobTitle", text)}
              placeholder="e.g., Software Engineer"
              error={errors.jobTitle}
              required
            />

            <CustomTextInput
              label="Company Name"
              value={formData.companyName}
              onChangeText={(text) => updateFormData("companyName", text)}
              placeholder="e.g., Tech Corp Inc."
              error={errors.companyName}
              required
            />

            <CustomTextInput
              label="Location"
              value={formData.location}
              onChangeText={(text) => updateFormData("location", text)}
              placeholder="e.g., San Francisco, CA"
              error={errors.location}
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
                  value={formData.isCurrentlyWorking ? undefined : formData.endDate}
                  onDateChange={(date) => updateFormData("endDate", date)}
                  placeholder={formData.isCurrentlyWorking ? "Present" : "Select end date"}
                  error={errors.endDate}
                />
              </View>
            </View>

            <CustomPicker
              label="Currently Working Here"
              value={formData.isCurrentlyWorking.toString()}
              options={currentlyWorkingOptions}
              onValueChange={(value) => updateFormData("isCurrentlyWorking", value === "true")}
              placeholder="Select option"
              required
            />

            <CustomTextInput
              label="Job Description"
              value={formData.description}
              onChangeText={(text) => updateFormData("description", text)}
              placeholder="Describe your role, responsibilities, and achievements..."
              error={errors.description}
              multiline
              numberOfLines={6}
              style={globalStyles.multilineInput}
              required
            />

            <View style={formStyles.buttonContainer}>
              <CustomButton
                title="Save Experience"
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

export default AddExperienceScreen;
