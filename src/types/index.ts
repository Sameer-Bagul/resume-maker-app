// Navigation types
export type RootStackParamList = {
  // Tab screens
  HomeTab: undefined;
  TemplateTab: undefined;
  ProfileTab: undefined;

  // Profile screens
  Profile: undefined;
  PersonalDetails: undefined;
  Objective: undefined;
  Experience: undefined;
  Skills: undefined;
  Projects: undefined;
  Qualifications: undefined;
  Languages: undefined;
  HobbiesInterests: undefined;
  Certificates: undefined;
  AwardsScholarships: undefined;
  Organizations: undefined;
  References: undefined;

  // Form screens
  AddExperience: { section?: string };
  AddSkill: { section?: string };
  AddProjects: { section?: string };
  AddQualifications: { section?: string };
  AddLanguage: { section?: string };
  AddHobby: { section?: string };
  AddCertificates: { section?: string };
  AddAwardsScholarships: { section?: string };
  AddOrganization: { section?: string };
  AddReferences: { section?: string };

  // Main flow screens
  Home: undefined;
  ResumeForm: undefined;
  TemplateSelection: { resumeData: ResumeData };
  Template: undefined;
  TemplatePreview: { template: string; color: string };
  ResumePreview: { resumeData: ResumeData };
};

// Form validation types
export interface FormValidation {
  isValid: boolean;
  errors: { [key: string]: string };
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message?: string;
}

export interface FormField {
  name: string;
  value: string;
  rules?: ValidationRule;
}

// Common component props
export interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  required?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'numeric';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export interface PickerOption {
  label: string;
  value: string;
}

export interface PickerProps {
  label?: string;
  value?: string;
  options: PickerOption[];
  placeholder?: string;
  onValueChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
}

export interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  rightButton?: React.ReactNode;
  onBackPress?: () => void;
}

// Resume section types (unified with AppContext)
export interface SectionItem {
  id?: string;
  [key: string]: any;
}

// Unified Resume Data Types
export interface PersonalDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
  title?: string;
}

export interface Objective {
  text: string;
}

export interface Skill {
  skillName: string;
  proficiency: string;
}

export interface Project {
  projectName: string;
  description: string;
  role: string;
  duration: string;
  technologies?: string;
}

export interface Experience {
  jobTitle: string;
  companyName: string;
  location: string;
  duration: string;
  description: string;
  isCurrentlyWorking?: string;
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
  description?: string;
  grade?: string;
}

export interface Hobby {
  hobby: string;
}

export interface Qualification {
  degree: string;
  institution: string;
  duration: string;
  description?: string;
  grade?: string;
}

export interface Language {
  language: string;
  proficiency: string;
}

export interface Certificate {
  certificateName: string;
  issuingOrganization: string;
  issueDate: string;
  expirationDate?: string;
  description?: string;
}

export interface Award {
  awardName: string;
  issuingOrganization: string;
  dateReceived: string;
  description?: string;
}

export interface Organization {
  organizationName: string;
  role: string;
  duration: string;
  description?: string;
}

export interface Reference {
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
}

// Complete Resume Data (for the resume generation flow)
export interface ResumeData {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  address: string;
  title?: string;
  objective?: string;

  // Experience and Education
  experience: Experience[];
  education: Education[];
  projects: Project[];
  
  // Skills and Qualifications
  skills: Skill[];
  languages: Language[];
  certificates: Certificate[];
  qualifications: Qualification[];
  
  // Additional Sections
  awards: Award[];
  organizations: Organization[];
  hobbies: Hobby[];
  references: Reference[];
  
  // Template Settings
  template: string;
  color: string;
}

// Template types
export interface Template {
  id: string;
  name: string;
  color: string;
  layout: 'single-column' | 'two-column' | 'modern' | 'creative';
  preview?: string;
}

export interface TemplateSection {
  key: string;
  title: string;
  order: number;
  visible: boolean;
}