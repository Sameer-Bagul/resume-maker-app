import { StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import SectionScreen from './SectionScreen';


const QualificationsScreen = () => {
  const navigation = useNavigation()

  return (
    <SectionScreen
      sectionName='Qualifications'
      section='qualifications'
      iconName='school-outline'
    />
  )
}

export default QualificationsScreen

const styles = StyleSheet.create({})