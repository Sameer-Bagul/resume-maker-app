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
  CustomButton,
  CustomDatePicker,
  SuccessFeedback,
  LoadingOverlay 
} from '../components';
import { globalStyles, formStyles } from '../styles/globalStyles';

const AddAwardsScholarshipsScreen = () => {
  const navigation = useNavigation();
  const { addAward } = useAppContext();

  const [formData, setFormData] = useState({
    awardName: "",
    issuingOrganization: "",
    dateReceived: undefined as Date | undefined,
    description: "",
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.awardName.trim()) {
      newErrors.awardName = "Award name is required";
    }
    if (!formData.issuingOrganization.trim()) {
      newErrors.issuingOrganization = "Issuing organization is required";
    }
    if (!formData.dateReceived) {
      newErrors.dateReceived = "Date received is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDateForStorage = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleSave = async () => {
    if (!validateForm()) {
      Alert.alert("Validation Error", "Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    // Simulate async operation
    setTimeout(() => {
      const award = {
        awardName: formData.awardName.trim(),
        issuingOrganization: formData.issuingOrganization.trim(),
        dateReceived: formData.dateReceived ? formatDateForStorage(formData.dateReceived) : "",
        description: formData.description.trim() || undefined,
      };
      
      addAward(award);
      setIsLoading(false);
      setShowSuccess(true);
      
      // Navigate back after showing success
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    }, 1000);
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
      <CustomHeader title="Add Award/Scholarship" />
      
      <SuccessFeedback
        visible={showSuccess}
        message="Award/Scholarship saved successfully!"
        onHide={() => setShowSuccess(false)}
      />
      
      <LoadingOverlay visible={isLoading} message="Saving award..." />
      
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
              label="Award/Scholarship Name"
              value={formData.awardName}
              onChangeText={(text) => updateFormData("awardName", text)}
              placeholder="e.g., Dean's List, Academic Excellence Award"
              error={errors.awardName}
              required
            />

            <CustomTextInput
              label="Issuing Organization"
              value={formData.issuingOrganization}
              onChangeText={(text) => updateFormData("issuingOrganization", text)}
              placeholder="e.g., Stanford University, IEEE"
              error={errors.issuingOrganization}
              required
            />

            <CustomDatePicker
              label="Date Received"
              value={formData.dateReceived}
              onDateChange={(date) => updateFormData("dateReceived", date)}
              placeholder="Select date received"
              error={errors.dateReceived}
              required
            />

            <CustomTextInput
              label="Description (Optional)"
              value={formData.description}
              onChangeText={(text) => updateFormData("description", text)}
              placeholder="Additional details about the award or scholarship..."
              multiline
              numberOfLines={4}
              style={globalStyles.multilineInput}
            />

            <View style={formStyles.buttonContainer}>
              <CustomButton
                title="Save Award/Scholarship"
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

export default AddAwardsScholarshipsScreen;