import { StyleSheet, StatusBar } from 'react-native';

export const colors = {
  // Primary Colors
  primary: '#007AFF',
  primaryDark: '#0056CC',
  primaryLight: '#4DA2FF',
  
  // Secondary Colors
  secondary: '#34C759',
  secondaryDark: '#248A3D',
  secondaryLight: '#5DD577',
  
  // Accent Colors
  accent: '#FF9500',
  accentDark: '#CC7700',
  accentLight: '#FFB84D',
  
  // Background Colors
  background: '#F2F2F7',
  backgroundDark: '#E5E5EA',
  cardBackground: '#FFFFFF',
  modalBackground: 'rgba(0, 0, 0, 0.5)',
  
  // Text Colors
  text: '#000000',
  textSecondary: '#8E8E93',
  textLight: '#C7C7CC',
  textPlaceholder: '#999999',
  
  // Border Colors
  border: '#E5E5EA',
  borderLight: '#F2F2F7',
  borderDark: '#D1D1D6',
  
  // Status Colors
  error: '#FF3B30',
  errorLight: '#FF6B60',
  warning: '#FF9500',
  warningLight: '#FFB84D',
  success: '#34C759',
  successLight: '#5DD577',
  info: '#007AFF',
  infoLight: '#4DA2FF',
  
  // Gradient Colors
  gradientStart: '#007AFF',
  gradientEnd: '#34C759',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // Header styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: (StatusBar.currentHeight || 40) + spacing.sm,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    ...shadows.medium,
  },
  
  headerTitle: {
    ...typography.h3,
    color: colors.cardBackground,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: spacing.lg,
  },
  
  headerButton: {
    padding: spacing.sm,
    borderRadius: 20,
  },
  
  // Card styles
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.small,
  },
  
  cardTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  
  cardSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  
  cardDescription: {
    ...typography.caption,
    color: colors.text,
    lineHeight: 20,
  },
  
  // Form styles
  formContainer: {
    flex: 1,
    padding: spacing.lg,
  },
  
  inputGroup: {
    marginBottom: spacing.lg,
  },
  
  label: {
    ...typography.bodyBold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  
  input: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: spacing.md,
    ...typography.body,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.small,
  },
  
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  
  inputError: {
    borderColor: colors.error,
    borderWidth: 2,
  },
  
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  
  errorText: {
    ...typography.small,
    color: colors.error,
    marginTop: spacing.xs,
  },
  
  // Button styles
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.small,
  },
  
  primaryButtonText: {
    ...typography.bodyBold,
    color: colors.cardBackground,
  },
  
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  
  secondaryButtonText: {
    ...typography.bodyBold,
    color: colors.primary,
  },
  
  // Floating Action Button
  fab: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
    backgroundColor: colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.large,
  },
  
  // List styles
  listContainer: {
    flex: 1,
    padding: spacing.lg,
  },
  
  listContent: {
    paddingBottom: 100,
  },
  
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  
  emptyStateIcon: {
    marginBottom: spacing.lg,
  },
  
  emptyStateTitle: {
    ...typography.h3,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  
  emptyStateSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  
  // Section styles
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    marginBottom: spacing.md,
    ...shadows.small,
  },
  
  sectionIcon: {
    marginRight: spacing.md,
  },
  
  sectionTitle: {
    ...typography.bodyBold,
    color: colors.text,
    flex: 1,
  },
  
  sectionCheckmark: {
    marginLeft: spacing.sm,
  },
  
  // Picker styles
  picker: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.small,
  },
  
  pickerItem: {
    ...typography.body,
    color: colors.text,
  },
});

export const formStyles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
  
  formSection: {
    marginBottom: spacing.xl,
  },
  
  formSectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  
  buttonContainer: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  
  fieldRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  
  fieldHalf: {
    flex: 1,
  },
});
