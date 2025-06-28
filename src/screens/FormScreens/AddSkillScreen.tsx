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

const AddSkillScreen = () => {
  const navigation = useNavigation();
  const { addSkill } = useAppContext();

  const [formData, setFormData] = useState({
    skillName: "",
    proficiency: "",
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const proficiencyOptions = [
    { label: "Beginner", value: "Beginner" },
    { label: "Intermediate", value: "Intermediate" },
    { label: "Advanced", value: "Advanced" },
    { label: "Expert", value: "Expert" },
  ];

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.skillName.trim()) {
      newErrors.skillName = "Skill name is required";
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

    addSkill({
      skillName: formData.skillName,
      proficiency: formData.proficiency,
    });
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
      <CustomHeader title="Add Skill" />
      
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
              label="Skill Name"
              value={formData.skillName}
              onChangeText={(text) => updateFormData("skillName", text)}
              placeholder="e.g., JavaScript, Python, React"
              error={errors.skillName}
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
                title="Save Skill"
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

export default AddSkillScreen;
