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

  const renderItem = ({ item }: { item: any }) => {
    if (section == "experience") {
      return (
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item?.jobTitle}</Text>
          <Text style={styles.itemSubtitle}>
            {item?.companyName} • {item?.location}
          </Text>
          <Text style={styles.itemDetail}>{item?.duration}</Text>
          <Text style={styles.itemDescription}>{item?.description}</Text>
        </View>
      );
    } else if (section == "hobbies/interests") {
      return (
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item?.hobby}</Text>
        </View>
      );
    } else if (section == "skills") {
      return (
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item?.skillName}</Text>
          <Text style={styles.itemDetail}>
            Proficiecny: {item?.proficiency}
          </Text>
        </View>
      );
    } else if (section == "projects") {
      return (
        <View>
          <Text>{item?.projectName}</Text>
          <Text>Role: {item?.role}</Text>
          <Text>Duration: {item?.duration}</Text>
          <Text>{item?.description}</Text>
        </View>
      );
    } else if (section === "qualifications") {
      return (
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item.degree}</Text>
          <Text style={styles.itemSubtitle}>{item.institution}</Text>
          <Text style={styles.itemDetail}>Duration: {item.duration}</Text>
          {item.description && (
            <Text style={styles.itemDescription}>{item.description}</Text>
          )}
        </View>
      );    } else if (section == "languages") {
      return (
        <View>
          <Text>{item?.language}</Text>
          <Text>Proficiency: {item.proficiency}</Text>
        </View>
      );
    } else if (section == "certificates") {
      return (
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item?.certificateName}</Text>
          <Text style={styles.itemSubtitle}>{item?.issuingOrganization}</Text>
          <Text style={styles.itemDetail}>Issue Date: {item?.issueDate}</Text>
          {item?.expirationDate && (
            <Text style={styles.itemDetail}>Expires: {item?.expirationDate}</Text>
          )}
          {item?.description && (
            <Text style={styles.itemDescription}>{item?.description}</Text>
          )}
        </View>
      );
    } else if (section == "awards/scholarships") {
      return (
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item?.awardName}</Text>
          <Text style={styles.itemSubtitle}>{item?.issuingOrganization}</Text>
          <Text style={styles.itemDetail}>Date Received: {item?.dateReceived}</Text>
          {item?.description && (
            <Text style={styles.itemDescription}>{item?.description}</Text>
          )}
        </View>
      );
    } else if (section == "organizations") {
      return (
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item?.organizationName}</Text>
          <Text style={styles.itemSubtitle}>Role: {item?.role}</Text>
          <Text style={styles.itemDetail}>Duration: {item?.duration}</Text>
          {item?.description && (
            <Text style={styles.itemDescription}>{item?.description}</Text>
          )}
        </View>
      );
    } else if (section == "references") {
      return (
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item?.name}</Text>
          <Text style={styles.itemSubtitle}>{item?.position} at {item?.company}</Text>
          <Text style={styles.itemDetail}>Email: {item?.email}</Text>
          <Text style={styles.itemDetail}>Phone: {item?.phone}</Text>
        </View>
      );
    }

    return null;
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
    console.log("hello");
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

    const routeName = sectionToRouteMap[section];    console.log("data",routeName);
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

      {data.length == 0 ? (
        <Animated.View
          entering={FadeInUp.duration(500).delay(200)}
          style={styles.content}
        >
          <Ionicons name={iconName} size={24} color="#fff" />
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
    paddingTop: StatusBar.currentHeight || 40,
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
    paddingTop: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 20,
  },
  message: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 20,
  },
  subMessage: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    marginBottom: 20,
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
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  itemDetail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
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
