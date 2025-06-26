import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../context/AppContext";
import Animated, { FadeInUp } from "react-native-reanimated";

type SectionScreenProps = {
  sectionName: string;
  section: string;
  iconName: keyof typeof Ionicons.glyphMap;
};

const SectionScreen: React.FC<SectionScreenProps> = ({
  sectionName,
  section,
  iconName,
}) => {
  const navigation = useNavigation();
  const { state } = useAppContext();

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency?.toLowerCase()) {
      case 'expert':
      case 'native':
        return { backgroundColor: '#34C759' };
      case 'advanced':
      case 'fluent':
        return { backgroundColor: '#007AFF' };
      case 'intermediate':
        return { backgroundColor: '#FF9500' };
      case 'beginner':
      case 'basic':
        return { backgroundColor: '#FF3B30' };
      default:
        return { backgroundColor: '#8E8E93' };
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    switch (section) {
      case "experience":
        return (
          <Animated.View entering={FadeInUp.duration(500)} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{item?.jobTitle}</Text>
              <Ionicons name="briefcase" size={20} color="#007AFF" />
            </View>
            <Text style={styles.itemSubtitle}>
              {item?.companyName} • {item?.location}
            </Text>
            <Text style={styles.itemDetail}>{item?.duration}</Text>
            {item?.description && (
              <Text style={styles.itemDescription}>{item?.description}</Text>
            )}
          </Animated.View>
        );

      case "hobbies/interests":
        return (
          <Animated.View entering={FadeInUp.duration(500)} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{item?.hobbyName}</Text>
              <Ionicons name="heart" size={20} color="#007AFF" />
            </View>
            {item?.description && (
              <Text style={styles.itemDescription}>{item?.description}</Text>
            )}
          </Animated.View>
        );

      case "skills":
        return (
          <Animated.View entering={FadeInUp.duration(500)} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{item?.skillName}</Text>
              <View style={[styles.proficiencyBadge, getProficiencyColor(item?.proficiency)]}>
                <Text style={styles.proficiencyText}>{item?.proficiency}</Text>
              </View>
            </View>
          </Animated.View>
        );

      case "projects":
        return (
          <Animated.View entering={FadeInUp.duration(500)} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{item?.projectName}</Text>
              <Ionicons name="rocket" size={20} color="#007AFF" />
            </View>
            <Text style={styles.itemSubtitle}>{item?.technologies}</Text>
            <Text style={styles.itemDetail}>Duration: {item?.duration}</Text>
            {item?.description && (
              <Text style={styles.itemDescription}>{item?.description}</Text>
            )}
          </Animated.View>
        );

      case "qualifications":
        return (
          <Animated.View entering={FadeInUp.duration(500)} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{item?.degree}</Text>
              <Ionicons name="school" size={20} color="#007AFF" />
            </View>
            <Text style={styles.itemSubtitle}>{item?.institutionName}</Text>
            <Text style={styles.itemDetail}>Completion: {item?.completionYear}</Text>
            {item?.grade && (
              <Text style={styles.itemDetail}>Grade: {item?.grade}</Text>
            )}
          </Animated.View>
        );

      case "languages":
        return (
          <Animated.View entering={FadeInUp.duration(500)} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{item?.language}</Text>
              <View style={[styles.proficiencyBadge, getProficiencyColor(item?.proficiency)]}>
                <Text style={styles.proficiencyText}>{item?.proficiency}</Text>
              </View>
            </View>
          </Animated.View>
        );

      case "certificates":
        return (
          <Animated.View entering={FadeInUp.duration(500)} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{item?.certificateName}</Text>
              <Ionicons name="document" size={20} color="#007AFF" />
            </View>
            <Text style={styles.itemSubtitle}>{item?.issuingOrganization}</Text>
            <Text style={styles.itemDetail}>Issue Date: {item?.issueDate}</Text>
            {item?.expirationDate && (
              <Text style={styles.itemDetail}>Expires: {item?.expirationDate}</Text>
            )}
            {item?.description && (
              <Text style={styles.itemDescription}>{item?.description}</Text>
            )}
          </Animated.View>
        );

      case "awards/scholarships":
        return (
          <Animated.View entering={FadeInUp.duration(500)} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{item?.awardName}</Text>
              <Ionicons name="trophy" size={20} color="#007AFF" />
            </View>
            <Text style={styles.itemSubtitle}>{item?.issuingOrganization}</Text>
            <Text style={styles.itemDetail}>Date Received: {item?.dateReceived}</Text>
            {item?.description && (
              <Text style={styles.itemDescription}>{item?.description}</Text>
            )}
          </Animated.View>
        );

      case "organizations":
        return (
          <Animated.View entering={FadeInUp.duration(500)} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{item?.organizationName}</Text>
              <Ionicons name="business" size={20} color="#007AFF" />
            </View>
            <Text style={styles.itemSubtitle}>Role: {item?.role}</Text>
            <Text style={styles.itemDetail}>Duration: {item?.duration}</Text>
            {item?.description && (
              <Text style={styles.itemDescription}>{item?.description}</Text>
            )}
          </Animated.View>
        );

      case "references":
        return (
          <Animated.View entering={FadeInUp.duration(500)} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{item?.name}</Text>
              <Ionicons name="person" size={20} color="#007AFF" />
            </View>
            <Text style={styles.itemSubtitle}>{item?.position} at {item?.company}</Text>
            <Text style={styles.itemDetail}>Email: {item?.email}</Text>
            <Text style={styles.itemDetail}>Phone: {item?.phone}</Text>
          </Animated.View>
        );

      default:
        return null;
    }
  };

  const getSectionData = () => {
    switch (section) {
      case "experience":
        return state.experiences;
      case "hobbies/interests":
        return state.hobbies;
      case "skills":
        return state.skills;
      case "projects":
        return state.projects;
      case "qualifications":
        return state.qualifications;
      case "languages":
        return state.languages;
      case "certificates":
        return state.certificates;
      case "awards/scholarships":
        return state.awards;
      case "organizations":
        return state.organizations;
      case "references":
        return state.references;
      default:
        return [];
    }
  };

  const data = getSectionData();

  const handleAddPress = () => {
    const sectionToRouteMap: { [key: string]: string } = {
      projects: "AddProjects",
      skills: "AddSkill",
      "hobbies/interests": "AddHobby",
      qualifications: "AddQualifications",
      organizations: "AddOrganization",
      certificates: "AddCertificates",
      "awards/scholarships": "AddAwardsScholarships",
      languages: "AddLanguage",
      references: "AddReferences",
      experience: "AddExperience",
    };

    const routeName = sectionToRouteMap[section];
    if (routeName) {
      (navigation as any).navigate(routeName, { section });
    } else {
      console.warn(`No route defined for section: ${section}`);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      <Animated.View entering={FadeInUp.duration(500)} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{sectionName}</Text>
        <View style={{ width: 24 }} />
      </Animated.View>

      {data.length === 0 ? (
        <Animated.View
          entering={FadeInUp.duration(500).delay(200)}
          style={styles.content}
        >
          <Ionicons name={iconName} size={64} color="#007AFF" />
          <Text style={styles.message}>No {section} added yet...</Text>
          <Text style={styles.subMessage}>
            Click on the plus button to add {section}
          </Text>
          <TouchableOpacity onPress={handleAddPress} style={styles.addButton}>
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${section}-${index}`}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
          <TouchableOpacity
            onPress={handleAddPress}
            style={styles.addButtonFloating}
          >
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 20,
    paddingTop: (StatusBar.currentHeight || 0) + 20,
    backgroundColor: "#007AFF",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  message: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 20,
    textAlign: "center",
  },
  subMessage: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    marginBottom: 30,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  listContainer: {
    flex: 1,
    padding: 20,
  },
  listContent: {
    paddingBottom: 80,
  },
  itemContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  itemDetail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: "#333",
    marginTop: 8,
    lineHeight: 20,
  },
  proficiencyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  proficiencyText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  addButtonFloating: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
