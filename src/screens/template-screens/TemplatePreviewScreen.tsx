import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../../context/AppContext';
import { CustomHeader, CustomButton } from '../../components';
import { colors, spacing, typography, shadows } from '../../styles/globalStyles';

const { width } = Dimensions.get('window');

const TemplatePreviewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { template, color } = route?.params as { template: string; color: string };
  const { state } = useAppContext();

  const handleCreateResume = () => {
    // Generate resume data from context
    const resumeData = {
      fullName: state.personalDetails?.name || "Your Name",
      email: state.personalDetails?.email || "your.email@example.com",
      phone: state.personalDetails?.phone || "+1 (555) 123-4567",
      address: state.personalDetails?.address || "Your Address",
      title: state.personalDetails?.title || "Professional Title",
      objective: state.objective?.text || "Your professional objective...",
      
      experience: state.experiences.map(exp => ({
        jobTitle: exp.jobTitle,
        companyName: exp.companyName,
        location: exp.location,
        duration: exp.duration,
        description: exp.description,
        isCurrentlyWorking: exp.isCurrentlyWorking,
      })),
      
      education: state.qualifications.map(qual => ({
        degree: qual.degree,
        institution: qual.institution,
        duration: qual.duration,
        description: qual.description,
      })),
      
      projects: state.projects,
      skills: state.skills,
      languages: state.languages,
      certificates: state.certificates,
      qualifications: state.qualifications,
      awards: state.awards,
      organizations: state.organizations,
      hobbies: state.hobbies,
      references: state.references,
      
      template,
      color,
    };

    // Navigate to appropriate screen - for now let's go back to home
    navigation.navigate('Home' as never);
  };

  return (
    <View style={styles.container}>
      <CustomHeader title={`${template} Template`} />
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.previewContainer}>
          <Text style={styles.previewTitle}>Template Preview</Text>
          <Text style={styles.previewSubtitle}>
            This is how your resume will look with the {template} template
          </Text>
          
          <View style={[styles.resumePreview, { backgroundColor: color }]}>
            <View style={styles.resumeContainer}>
              <LinearGradient
                colors={[color, `${color}CC`]}
                style={styles.header}
              >
                <Text style={styles.name}>
                  {state.personalDetails?.name || "Your Name"}
                </Text>
                <Text style={styles.title}>
                  {state.personalDetails?.title || "Professional Title"}
                </Text>
                <Text style={styles.contact}>
                  {state.personalDetails?.email || "your.email@example.com"}
                </Text>
              </LinearGradient>

              <View style={styles.body}>
                <View style={styles.section}>
                  <Text style={[styles.sectionTitle, { color }]}>OBJECTIVE</Text>
                  <Text style={styles.sectionText}>
                    {state.objective?.text || "Your professional objective will appear here..."}
                  </Text>
                </View>

                <View style={styles.section}>
                  <Text style={[styles.sectionTitle, { color }]}>EXPERIENCE</Text>
                  {state.experiences.length > 0 ? (
                    state.experiences.slice(0, 2).map((exp, index) => (
                      <View key={index} style={styles.experienceItem}>
                        <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
                        <Text style={styles.company}>{exp.companyName}</Text>
                        <Text style={styles.description} numberOfLines={2}>
                          {exp.description}
                        </Text>
                      </View>
                    ))
                  ) : (
                    <Text style={styles.placeholderText}>
                      Your work experience will appear here...
                    </Text>
                  )}
                </View>

                <View style={styles.section}>
                  <Text style={[styles.sectionTitle, { color }]}>SKILLS</Text>
                  {state.skills.length > 0 ? (
                    <View style={styles.skillsContainer}>
                      {state.skills.slice(0, 6).map((skill, index) => (
                        <View key={index} style={[styles.skillTag, { borderColor: color }]}>
                          <Text style={[styles.skillText, { color }]}>
                            {skill.skillName}
                          </Text>
                        </View>
                      ))}
                    </View>
                  ) : (
                    <Text style={styles.placeholderText}>
                      Your skills will appear here...
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.actionsContainer}>
            <CustomButton
              title="Use This Template"
              onPress={handleCreateResume}
              size="large"
            />
            
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={20} color={colors.primary} />
              <Text style={styles.backButtonText}>Try Another Template</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TemplatePreviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  previewContainer: {
    padding: spacing.lg,
  },
  previewTitle: {
    ...typography.h2,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  previewSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  resumePreview: {
    width: width - (spacing.lg * 2),
    aspectRatio: 0.7,
    borderRadius: 12,
    overflow: 'hidden',
    ...shadows.large,
    marginBottom: spacing.xl,
    backgroundColor: colors.cardBackground,
  },
  resumeContainer: {
    flex: 1,
    backgroundColor: colors.cardBackground,
  },
  header: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  name: {
    ...typography.h1,
    color: colors.cardBackground,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.h3,
    color: colors.cardBackground,
    fontSize: 14,
    marginBottom: spacing.sm,
  },
  contact: {
    ...typography.small,
    color: colors.cardBackground,
    fontSize: 10,
  },
  body: {
    flex: 1,
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.bodyBold,
    fontSize: 12,
    marginBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: spacing.xs,
  },
  sectionText: {
    ...typography.small,
    color: colors.text,
    fontSize: 10,
    lineHeight: 14,
  },
  placeholderText: {
    ...typography.small,
    color: colors.textSecondary,
    fontSize: 10,
    fontStyle: 'italic',
  },
  experienceItem: {
    marginBottom: spacing.sm,
  },
  jobTitle: {
    ...typography.bodyBold,
    fontSize: 11,
    color: colors.text,
  },
  company: {
    ...typography.small,
    fontSize: 9,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.small,
    fontSize: 9,
    color: colors.text,
    lineHeight: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  skillTag: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  skillText: {
    ...typography.small,
    fontSize: 8,
  },
  actionsContainer: {
    gap: spacing.md,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    gap: spacing.sm,
  },
  backButtonText: {
    ...typography.body,
    color: colors.primary,
  },
});
