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
  CustomDatePicker
} from '../components';
import { globalStyles, formStyles } from '../styles/globalStyles';

const AddCertificatesScreen = () => {
  const navigation = useNavigation();
  const { addCertificate } = useAppContext();

  const [formData, setFormData] = useState({
    certificateName: "",
    issuingOrganization: "",
    issueDate: undefined as Date | undefined,
    expirationDate: undefined as Date | undefined,
    description: "",
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.certificateName.trim()) {
      newErrors.certificateName = "Certificate name is required";
    }
    if (!formData.issuingOrganization.trim()) {
      newErrors.issuingOrganization = "Issuing organization is required";
    }
    if (!formData.issueDate) {
      newErrors.issueDate = "Issue date is required";
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

  const handleSave = () => {
    if (!validateForm()) {
      Alert.alert("Validation Error", "Please fill in all required fields");
      return;
    }

    const certificate = {
      certificateName: formData.certificateName.trim(),
      issuingOrganization: formData.issuingOrganization.trim(),
      issueDate: formData.issueDate ? formatDateForStorage(formData.issueDate) : "",
      expirationDate: formData.expirationDate ? formatDateForStorage(formData.expirationDate) : undefined,
      description: formData.description.trim() || undefined,
    };
    
    addCertificate(certificate);
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
      <CustomHeader title="Add Certificate" />
      
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
              label="Certificate Name"
              value={formData.certificateName}
              onChangeText={(text) => updateFormData("certificateName", text)}
              placeholder="e.g., AWS Certified Solutions Architect"
              error={errors.certificateName}
              required
            />

            <CustomTextInput
              label="Issuing Organization"
              value={formData.issuingOrganization}
              onChangeText={(text) => updateFormData("issuingOrganization", text)}
              placeholder="e.g., Amazon Web Services"
              error={errors.issuingOrganization}
              required
            />

            <View style={formStyles.fieldRow}>
              <View style={formStyles.fieldHalf}>
                <CustomDatePicker
                  label="Issue Date"
                  value={formData.issueDate}
                  onDateChange={(date) => updateFormData("issueDate", date)}
                  placeholder="Select issue date"
                  error={errors.issueDate}
                  required
                />
              </View>

              <View style={formStyles.fieldHalf}>
                <CustomDatePicker
                  label="Expiration Date (Optional)"
                  value={formData.expirationDate}
                  onDateChange={(date) => updateFormData("expirationDate", date)}
                  placeholder="Select expiration date"
                />
              </View>
            </View>

            <CustomTextInput
              label="Description (Optional)"
              value={formData.description}
              onChangeText={(text) => updateFormData("description", text)}
              placeholder="Additional details about the certificate..."
              multiline
              numberOfLines={4}
              style={globalStyles.multilineInput}
            />

            <View style={formStyles.buttonContainer}>
              <CustomButton
                title="Save Certificate"
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

export default AddCertificatesScreen;