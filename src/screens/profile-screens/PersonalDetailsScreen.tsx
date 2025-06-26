import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAppContext } from '../../context/AppContext';
import { colors, spacing } from '../../styles/globalStyles';
import { CustomTextInput, CustomButton, CustomHeader } from '../../components';

const PersonalDetailsScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { state, updatePersonalDetails } = useAppContext();
  
  const [formData, setFormData] = useState({
    name: state.personalDetails?.name || "",
    email: state.personalDetails?.email || "",
    phone: state.personalDetails?.phone || "",
    address: state.personalDetails?.address || "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const validateForm = () => {
    const newErrors = { name: "", email: "", phone: "", address: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
      updatePersonalDetails(formData);
      navigation.goBack();
    } else {
      Alert.alert("Validation Error", "Please fill in all required fields correctly.");
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
        title="Personal Details"
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
            label="Full Name"
            value={formData.name}
            onChangeText={(text) => updateField('name', text)}
            placeholder="Enter your full name"
            error={errors.name}
          />

          <CustomTextInput
            label="Email Address"
            value={formData.email}
            onChangeText={(text) => updateField('email', text)}
            placeholder="Enter your email"
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <CustomTextInput
            label="Phone Number"
            value={formData.phone}
            onChangeText={(text) => updateField('phone', text)}
            placeholder="Enter your phone number"
            error={errors.phone}
            keyboardType="phone-pad"
          />

          <CustomTextInput
            label="Address"
            value={formData.address}
            onChangeText={(text) => updateField('address', text)}
            placeholder="Enter your address"
            error={errors.address}
            multiline={true}
            numberOfLines={3}
          />

          <CustomButton
            title="Save Personal Details"
            onPress={handleSave}
            style={styles.saveButton}
          />
        </Animated.View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default PersonalDetailsScreen;

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
