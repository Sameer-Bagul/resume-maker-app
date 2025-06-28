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
  CustomButton 
} from '../../components';
import { globalStyles, formStyles } from '../../styles/globalStyles';

const AddHobbyScreen = () => {
  const navigation = useNavigation();
  const { addHobby } = useAppContext();

  const [hobby, setHobby] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!hobby.trim()) {
      setError("Hobby/Interest is required");
      return false;
    }
    setError('');
    return true;
  };

  const handleSave = () => {
    if (!validateForm()) {
      Alert.alert("Validation Error", "Please enter a hobby or interest");
      return;
    }

    const hobbyData = {
      hobby: hobby.trim(),
    };
    
    addHobby(hobbyData);
    navigation.goBack();
  };

  const updateHobby = (value: string) => {
    setHobby(value);
    if (error) {
      setError('');
    }
  };

  return (
    <View style={globalStyles.container}>
      <CustomHeader title="Add Hobby/Interest" />
      
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
              label="Hobby or Interest"
              value={hobby}
              onChangeText={updateHobby}
              placeholder="e.g., Photography, Reading, Hiking, Gaming"
              error={error}
              required
            />

            <View style={formStyles.buttonContainer}>
              <CustomButton
                title="Save Hobby/Interest"
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

export default AddHobbyScreen;