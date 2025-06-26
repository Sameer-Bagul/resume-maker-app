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
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, shadows } from "../../styles/globalStyles";
import { EnhancedCard } from "../../components";

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

  const getProficiencyColorValue = (proficiency: string) => {
    switch (proficiency?.toLowerCase()) {
      case 'expert':
      case 'native':
        return colors.success;
      case 'advanced':
      case 'fluent':
        return colors.primary;
      case 'intermediate':
        return colors.warning;
      case 'beginner':
      case 'basic':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    switch (section) {
      case "experience":
        return (
          <EnhancedCard
            title={item?.jobTitle}
            subtitle={`${item?.companyName} • ${item?.location}`}
            description={item?.description}
            iconName="briefcase"
            delay={index * 100}
          >
            <Text style={styles.itemDetail}>{item?.duration}</Text>
          </EnhancedCard>
        );

      case "hobbies/interests":
        return (
          <EnhancedCard
            title={item?.hobbyName}
            description={item?.description}
            iconName="heart"
            delay={index * 100}
          />
        );

      case "skills":
        return (
          <EnhancedCard
            title={item?.skillName}
            iconName="trophy"
            badge={{
              text: item?.proficiency,
              color: getProficiencyColorValue(item?.proficiency)
            }}
            delay={index * 100}
          />
        );

      case "projects":
        return (
          <EnhancedCard
            title={item?.projectName}
            subtitle={item?.technologies}
            description={item?.description}
            iconName="rocket"
            delay={index * 100}
          >
            <Text style={styles.itemDetail}>Duration: {item?.duration}</Text>
          </EnhancedCard>
        );

      case "qualifications":
        return (
          <EnhancedCard
            title={item?.degree}
            subtitle={item?.institutionName}
            iconName="school"
            delay={index * 100}
          >
            <Text style={styles.itemDetail}>Completion: {item?.completionYear}</Text>
            {item?.grade && (
              <Text style={styles.itemDetail}>Grade: {item?.grade}</Text>
            )}
          </EnhancedCard>
        );

      case "languages":
        return (
          <EnhancedCard
            title={item?.language}
            iconName="language"
            badge={{
              text: item?.proficiency,
              color: getProficiencyColorValue(item?.proficiency)
            }}
            delay={index * 100}
          />
        );

      case "certificates":
        return (
          <EnhancedCard
            title={item?.certificateName}
            subtitle={item?.issuingOrganization}
            description={item?.description}
            iconName="document"
            delay={index * 100}
          >
            <Text style={styles.itemDetail}>Issue Date: {item?.issueDate}</Text>
            {item?.expirationDate && (
              <Text style={styles.itemDetail}>Expires: {item?.expirationDate}</Text>
            )}
          </EnhancedCard>
        );

      case "awards/scholarships":
        return (
          <EnhancedCard
            title={item?.awardName}
            subtitle={item?.issuingOrganization}
            description={item?.description}
            iconName="trophy"
            delay={index * 100}
          >
            <Text style={styles.itemDetail}>Date Received: {item?.dateReceived}</Text>
          </EnhancedCard>
        );

      case "organizations":
        return (
          <EnhancedCard
            title={item?.organizationName}
            subtitle={`Role: ${item?.role}`}
            description={item?.description}
            iconName="business"
            delay={index * 100}
          >
            <Text style={styles.itemDetail}>Duration: {item?.duration}</Text>
          </EnhancedCard>
        );

      case "references":
        return (
          <EnhancedCard
            title={item?.name}
            subtitle={`${item?.position} at ${item?.company}`}
            iconName="person"
            delay={index * 100}
          >
            <Text style={styles.itemDetail}>Email: {item?.email}</Text>
            <Text style={styles.itemDetail}>Phone: {item?.phone}</Text>
          </EnhancedCard>
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
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View entering={FadeInUp.duration(500)} style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{sectionName}</Text>
          <View style={{ width: 24 }} />
        </Animated.View>
      </LinearGradient>

      {data.length === 0 ? (
        <Animated.View
          entering={FadeInUp.duration(500).delay(200)}
          style={styles.content}
        >
          <View style={styles.emptyStateIcon}>
            <Ionicons name={iconName} size={64} color={colors.primary} />
          </View>
          <Text style={styles.message}>No {section} added yet...</Text>
          <Text style={styles.subMessage}>
            Click on the plus button to add {section}
          </Text>
          <TouchableOpacity onPress={handleAddPress} style={styles.addButton}>
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              style={styles.addButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="add" size={24} color="#fff" />
            </LinearGradient>
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
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              style={styles.addButtonFloatingGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="add" size={24} color="#fff" />
            </LinearGradient>
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
    backgroundColor: colors.background,
  },
  header: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: (StatusBar.currentHeight || 0) + spacing.lg,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...shadows.medium,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    padding: spacing.xs,
    borderRadius: 8,
  },
  headerTitle: {
    ...typography.h2,
    color: "#fff",
    fontWeight: "700",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  emptyStateIcon: {
    padding: spacing.lg,
    borderRadius: 60,
    backgroundColor: colors.cardBackground,
    marginBottom: spacing.lg,
    ...shadows.small,
  },
  message: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  subMessage: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    textAlign: "center",
  },
  addButton: {
    borderRadius: 30,
    ...shadows.medium,
  },
  addButtonGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    padding: spacing.lg,
  },
  listContent: {
    paddingBottom: 100,
  },
  itemDetail: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  addButtonFloating: {
    position: "absolute",
    bottom: spacing.lg,
    right: spacing.lg,
    borderRadius: 30,
    ...shadows.large,
  },
  addButtonFloatingGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
