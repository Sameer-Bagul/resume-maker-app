import { Image, StyleSheet, StatusBar, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from "@expo/vector-icons"

const ProfileScreen = () => {

  const navigation = useNavigation() as any

  const ProfileSection = [
    { id: '0', title: 'Personal Details', icon: 'person-outline', screen: 'PersonalDetails' },
    { id: '1', title: 'Objective ', icon: 'flag-outline', screen: 'Objective' },
    { id: '2', title: 'Experience ', icon: 'briefcase-outline', screen: 'Experience' },
    { id: '3', title: 'Qualifications', icon: 'school-outline', screen: 'Qualifications' },
    { id: '4', title: 'Organizations', icon: 'book-outline', screen: 'Organizations' },
    { id: '5', title: 'Projects', icon: 'code-working-outline', screen: 'Projects' },
    { id: '6', title: 'Certificates', icon: 'document-outline', screen: 'Certificates' },
    { id: '7', title: 'Awards/Scholorships', icon: 'trophy-outline', screen: 'AwardsScholarships' },
    { id: '8', title: 'Skills', icon: 'key-outline', screen: 'Skills' },
    { id: '9', title: 'Languages', icon: 'language-outline', screen: 'Languages' },
    { id: '10', title: 'Hobbies/Interests', icon: 'heart-outline', screen: 'HobbiesInterests' },
    { id: '11', title: 'References', icon: 'people-outline', screen: 'References' },
  ]

  const renderSection = ({ item, index }: { item: typeof ProfileSection[0]; index: number }) => {
    return (
      <View>
        <TouchableOpacity 
          style={styles.section}  
          onPress={() => navigation.navigate(item.screen)}>
          <Ionicons name={item.icon as any} size={24} color="#007AFF"  />
          <Text style={styles.sectionTitle}>{item?.title}</Text>
          <Ionicons name={'chevron-forward'} size={24} color="#ccc" />
        </TouchableOpacity>
      </View>
    )

  }

  return (
    <View style={styles.container}>

      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"#fff"}
      />

      <View style={styles.header}>
        <Image
          source={{ uri: 'https://res.cloudinary.com/dceysplwm/image/upload/v1740252954/IMG_20241228_134355_yglesr.jpg' }}
          style={styles.avatar}
        />

        <View style={styles.headerTextContainer}>
          <Text style={styles.name}>sameer Bagul</Text>
          <Text style={styles.title}>Professional Title</Text>
        </View>

      </View>

      <FlatList
        data={ProfileSection}
        renderItem={renderSection}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: 15
  },
  header: {
    alignItems: 'center',
    padding: 30,
    paddingTop: StatusBar.currentHeight || 40,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignSelf: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    color: '#666',
    fontStyle: 'italic',
  },
  list: {
    padding: 15,
    paddingHorizontal: 16,
  },
  sectionItem: {
    padding: 16,
    borderBottomWidth: 1,
    color: '#000',

    borderBottomColor: '#eee',
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 15,
  },
  tickIcon: {
    marginLeft: 10,
  },
})