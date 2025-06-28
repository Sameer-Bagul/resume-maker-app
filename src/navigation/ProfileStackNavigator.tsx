import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/main-screens/ProfileScreen";
import PersonalDetailsScreen from "../screens/profile-screens/PersonalDetailsScreen";
import ObjectiveScreen from "../screens/profile-screens/ObjectiveScreen";
import ExperienceScreen from "../screens/profile-screens/ExperienceScreen";
import QualificationsScreen from "../screens/profile-screens/QualificationsScreen";
import OrganizationsScreen from "../screens/profile-screens/OrganizationsScreen";
import ProjectsScreen from "../screens/profile-screens/ProjectsScreen";
import CertificatesScreen from "../screens/profile-screens/CertificatesScreen";
import AwardsScholarshipsScreen from "../screens/profile-screens/AwardsScholarshipsScreen";
import SkillsScreen from "../screens/profile-screens/SkillsScreen";
import LanguagesScreen from "../screens/profile-screens/LanguagesScreen";
import HobbiesInterestsScreen from "../screens/profile-screens/HobbiesInterestsScreen";
import ReferencesScreen from "../screens/profile-screens/ReferencesScreen";
import AddExperienceScreen from "../screens/FormScreens/AddExperienceScreen";
import AddOrganizationScreen from "../screens/FormScreens/AddOrganizationScreen";
import AddLanguageScreen from "../screens/FormScreens/AddLanguageScreen";
import AddCertificatesScreen from "../screens/FormScreens/AddCertificatesScreen";
import AddSkillScreen from "../screens/FormScreens/AddSkillScreen";
import AddReferencesScreen from "../screens/FormScreens/AddReferencesScreen";
import AddProjectScreen from "../screens/FormScreens/AddProjectScreen";
import AddAwardsScholarshipsScreen from "../screens/FormScreens/AddAwardsScholarshipsScreen";
import AddHobbyScreen from "../screens/FormScreens/AddHobbyScreen";
import AddQualificationScreen from "../screens/FormScreens/AddQualificationScreen";

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }} 
        />
        <Stack.Screen
            name="PersonalDetails"
            component={PersonalDetailsScreen}
            options={{ headerShown: false }} 
        />
        <Stack.Screen
            name="Objective"
            component={ObjectiveScreen}
            options={{ headerShown: false }} 
        />
        <Stack.Screen
            name="Experience"
            component={ExperienceScreen}
            options={{ headerShown: false }} 
        />
        <Stack.Screen
            name="Qualifications"
            component={QualificationsScreen}
            options={{ headerShown: false }} 
        />
        <Stack.Screen
            name="Organizations"
            component={OrganizationsScreen}
            options={{ headerShown: false }} 
        />
        <Stack.Screen
            name="Projects"
            component={ProjectsScreen}
            options={{ headerShown: false }} 
        />
        <Stack.Screen
            name="Certificates"
            component={CertificatesScreen}
            options={{ headerShown: false }} 
        />
        <Stack.Screen
            name="AwardsScholarships"
            component={AwardsScholarshipsScreen}
            options={{ headerShown: false }} 
        />
        <Stack.Screen
            name="Skills"
            component={SkillsScreen}
            options={{ headerShown: false }} 
        />
        <Stack.Screen
            name="Languages"
            component={LanguagesScreen}
            options={{ headerShown: false }} 
        />
        <Stack.Screen
            name="HobbiesInterests"
            component={HobbiesInterestsScreen}
            options={{ headerShown: false }} 
        />
        <Stack.Screen
            name="References"
            component={ReferencesScreen}
            options={{ headerShown: false }} 
        />
        {/* ------ Form Screens ------- */}
        <Stack.Screen
            name="AddExperience"
            component={AddExperienceScreen}
            options={{ headerShown: false }} 
        />
        <Stack.Screen
            name="AddProjects"
            component={AddProjectScreen}
            options={{ headerShown: false }} 
        />
        <Stack.Screen
            name="AddOrganization"
            component={AddOrganizationScreen}
            options={{ headerShown: false }} 
        />
        <Stack.Screen
            name="AddLanguage"
            component={AddLanguageScreen}
            options={{ headerShown: false }} 
        />
        <Stack.Screen
            name="AddCertificates"
            component={AddCertificatesScreen}
            options={{ headerShown: false }} 
        />
        <Stack.Screen
            name="AddSkill"
            component={AddSkillScreen}
            options={{ headerShown: false }} 
        />
        <Stack.Screen
            name="AddReferences"
            component={AddReferencesScreen}
            options={{ headerShown: false }} 
        />
        <Stack.Screen
            name="AddAwardsScholarships"
            component={AddAwardsScholarshipsScreen}
            options={{ headerShown: false }} 
        />
        <Stack.Screen
            name="AddHobby"
            component={AddHobbyScreen}
            options={{ headerShown: false }} 
        />
        <Stack.Screen
            name="AddQualifications"
            component={AddQualificationScreen}
            options={{ headerShown: false }} 
        />
    </Stack.Navigator>
);

export default ProfileStackNavigator;
