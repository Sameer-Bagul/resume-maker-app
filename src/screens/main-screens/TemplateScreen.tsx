import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { template } from '@babel/core';

const TemplateScreen = () => {

  const navigation = useNavigation();

  const templates = [
    { id: '1', name: 'Professional', color: "white", layout: "two-column" },
    { id: '2', name: 'Modern', color: "#E5E7EB", layout: "single-column" },
    { id: '3', name: 'Creative', color: "#FEE2E2", layout: "two-column" },
    { id: '4', name: 'Classic', color: "#E0F2FE", layout: "single-column" },
    { id: '5', name: 'Elegant', color: "#ECFDF5", layout: "two-column" },
    { id: '6', name: 'Minimalist', color: "#FEF3C7", layout: "single-column" },
  ];

  const renderTemplate = ({ item }: { item: { id: string; name: string; color: string; layout: string } }) => (
    <View style={[styles.templateContainer, { backgroundColor: item.color }]}>
      <View style={styles.template}>
        <View style={styles.header}>
          <Image
            style={styles.avatar}
            source={{ uri: 'https://res.cloudinary.com/dceysplwm/image/upload/v1740252954/IMG_20241228_134355_yglesr.jpg' }}
          />

          <View style={styles.headerTextContent}>
            <Text style={styles.name}>Sameer Bagul</Text>
            <Text style={styles.title}>Graphic Designer</Text>
            <Text style={styles.about}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi soluta doloremque illo maxime iste quod, quam sed dolorum similique aut officia in numquam nobis qui hic earum, sint culpa. Nemo?
            </Text>
          </View>
        </View>

        <View style={styles.columnsContainer}>
          {/* Left Column */}
          <View style={styles.leftColumn}>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Profile</Text>
              <Text style={styles.description}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet quos maiores expedita dolore, modi fuga.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              <Text style={styles.date}>2020 - Present</Text>
              <Text style={styles.subtitle}>Senior Designer</Text>
              <Text style={styles.subtext}>Creative Minds Agency</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              <Text style={styles.date}>2015 - 2019</Text>
              <Text style={styles.subtitle}>Master's In Graphic Design</Text>
              <Text style={styles.subtext}> Univercity od Arts, London</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certificates</Text>
              <Text style={styles.subtitle}>Adobe Creative Suite MasterClass</Text>
              <Text style={styles.subtext}>Adobe Training Center</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              <Text style={styles.date}>2021 - 2022</Text>
              <Text style={styles.subtitle}>Branding Campaign</Text>
              <Text style={styles.subtext}>Lead Designer</Text>
              <Text style={styles.description}>Designed a Full Branding Campaign for a Tech Startup</Text>
            </View>

          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <Text style={styles.skill}>Illustrator</Text>
              <Text style={styles.skill}>Photoshop</Text>
              <Text style={styles.skill}>UX/UI design</Text>
              <Text style={styles.skill}>3D modeling</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Languages</Text>
              <Text style={styles.skill}>English (Native)</Text>
              <Text style={styles.skill}>German (FLuent)</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Awards</Text>
              <Text style={styles.subtitle}>Best Graphic Designer 2022</Text>
              <Text style={styles.subtext}>SIH Runner up</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Hobbies</Text>
              <Text style={styles.skill}>Photography</Text>
              <Text style={styles.skill}>Sketching</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>References</Text>
              <Text style={styles.subtitle}>John Doe</Text>
              <Text style={styles.subtext}>Art of Director at Creative Minds</Text>
              <Text style={styles.subtext}>johndoe@gmail.com</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact</Text>
              <Text style={styles.contactText}>Phone: +1234567890</Text>
              <Text style={styles.contactText}>
                Email: sameerbagul@gmail.com
              </Text>
            </View>
          </View>
        </View>
      </View>

        <TouchableOpacity style={styles.useButton}>
          <Text style={styles.useButtonText}>Use This Template</Text>
        </TouchableOpacity>
    </View>
  )

  return (
    <FlatList
      data={templates}
      renderItem={renderTemplate}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.list}
    />
  )
}

export default TemplateScreen

const styles = StyleSheet.create({
  list: {
    padding: 20,
  },
  templateContainer: {
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden"
  },
  template: {
    padding: 15
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd"
  },
  headerTextContent: {
    alignItems: "center"
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  title: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 5,
  },
  about: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    lineHeight: 20
  },
  // 
  columnsContainer: {
    flexDirection: 'row',
    // flexWrap: "wrap",
    alignItems:"stretch"
  },
  leftColumn: {
    flex: 1,
    paddingRight: 10,
    minWidth: 150, 
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#007AFF",
    paddingBottom: 2,
  },
  description: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  date: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000"
  },
  subtext: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2
  },
  rightColumn:{
   flex: 1, 
   paddingRight:10, 
   minWidth:150, 
  }, 
  contactText:{
    fontSize:14,
    color:"#333", 
    marginBottom:2 
  }, 
  skill:{
    fontSize:14, 
    color:"#333",
    marginBottom:4 
  }, 
  useButton:{
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    alignItems: "center",
  },
  useButtonText:{
    fontSize: 16,
    fontWeight: 600,
    color: "#fff"
  }
})

