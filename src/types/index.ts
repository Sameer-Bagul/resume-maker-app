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
  custom?: (value: string) => string | null;
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
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  rightButton?: React.ReactNode;
  onBackPress?: () => void;
}

// Resume section types (already defined in AppContext, but can be imported here if needed)
export interface SectionItem {
  id?: string;
  [key: string]: any;
}
