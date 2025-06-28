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
  CustomDatePicker,
  CustomPicker 
} from '../../components';
import { globalStyles, formStyles } from '../../styles/globalStyles';

const AddOrganizationScreen = () => {
  const navigation = useNavigation();
  const { addOrganization } = useAppContext();

  const [formData, setFormData] = useState({
    organizationName: "",
    role: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    description: "",
    isCurrentlyActive: false,
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.organizationName.trim()) {
      newErrors.organizationName = "Organization name is required";
    }
    if (!formData.role.trim()) {
      newErrors.role = "Role is required";
    }
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }
    if (!formData.isCurrentlyActive && !formData.endDate) {
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

    const organization = {
      organizationName: formData.organizationName.trim(),
      role: formData.role.trim(),
      duration: `${formatDateForDisplay(formData.startDate)} - ${
        formData.isCurrentlyActive ? "Present" : formatDateForDisplay(formData.endDate)
      }`,
      description: formData.description.trim() || undefined,
    };
    
    addOrganization(organization);
    navigation.goBack();
  };

  const updateFormData = (field: string, value: string | boolean | Date) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <View style={globalStyles.container}>
      <CustomHeader title="Add Organization" />
      
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
              label="Organization Name"
              value={formData.organizationName}
              onChangeText={(text) => updateFormData("organizationName", text)}
              placeholder="e.g., IEEE Computer Society, Red Cross"
              error={errors.organizationName}
              required
            />

            <CustomTextInput
              label="Your Role"
              value={formData.role}
              onChangeText={(text) => updateFormData("role", text)}
              placeholder="e.g., President, Volunteer, Member"
              error={errors.role}
              required
            />

            <View style={formStyles.fieldRow}>
              <View style={formStyles.fieldHalf}>
                <CustomDatePicker
                  label="Start Date"
                  value={formData.startDate}
                  onDateChange={(date) => updateFormData("startDate", date)}
                  error={errors.startDate}
                  required
                />
              </View>

              <View style={formStyles.fieldHalf}>
                <CustomDatePicker
                  label="End Date"
                  value={formData.isCurrentlyActive ? undefined : formData.endDate}
                  onDateChange={(date) => {
                    if (!formData.isCurrentlyActive) {
                      updateFormData("endDate", date);
                    }
                  }}
                  placeholder={formData.isCurrentlyActive ? "Present" : "Select end date"}
                  error={errors.endDate}
                />
              </View>
            </View>

            <CustomPicker
              label="Currently Active"
              value={formData.isCurrentlyActive.toString()}
              options={[
                { label: "Yes", value: "true" },
                { label: "No", value: "false" },
              ]}
              onValueChange={(value) => updateFormData("isCurrentlyActive", value === "true")}
              placeholder="Select option"
            />

            <CustomTextInput
              label="Description (Optional)"
              value={formData.description}
              onChangeText={(text) => updateFormData("description", text)}
              placeholder="Describe your contributions and activities in the organization..."
              multiline
              numberOfLines={4}
              style={globalStyles.multilineInput}
            />

            <View style={formStyles.buttonContainer}>
              <CustomButton
                title="Save Organization"
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

export default AddOrganizationScreen;