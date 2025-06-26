import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, shadows } from '../styles/globalStyles';

interface CustomDatePickerProps {
  label: string;
  value: Date | undefined;
  onDateChange: (date: Date) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  mode?: 'date' | 'datetime' | 'time';
  maximumDate?: Date;
  minimumDate?: Date;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  value,
  onDateChange,
  placeholder = 'Select date',
  error,
  required = false,
  mode = 'date',
  maximumDate,
  minimumDate,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const formatDate = (date: Date) => {
    if (mode === 'date') {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } else if (mode === 'time') {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else {
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  };

  const handleDateSelect = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, error && styles.labelError]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.dateButton,
          error && styles.dateButtonError,
          value && styles.dateButtonSelected,
        ]}
        onPress={() => setShowPicker(true)}
        activeOpacity={0.7}
      >
        <View style={styles.dateButtonContent}>
          <Ionicons
            name={mode === 'time' ? 'time-outline' : 'calendar-outline'}
            size={20}
            color={value ? colors.primary : colors.textSecondary}
            style={styles.icon}
          />
          <Text style={[
            styles.dateText,
            !value && styles.placeholderText,
            error && styles.dateTextError,
          ]}>
            {value ? formatDate(value) : placeholder}
          </Text>
          <Ionicons
            name="chevron-down-outline"
            size={16}
            color={colors.textSecondary}
          />
        </View>
      </TouchableOpacity>

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode={mode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateSelect}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  labelContainer: {
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.bodyBold,
    color: colors.text,
  },
  labelError: {
    color: colors.error,
  },
  required: {
    color: colors.error,
  },
  dateButton: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    ...shadows.small,
  },
  dateButtonError: {
    borderColor: colors.error,
    borderWidth: 2,
  },
  dateButtonSelected: {
    borderColor: colors.primary,
  },
  dateButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: spacing.sm,
  },
  dateText: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  placeholderText: {
    color: colors.textSecondary,
  },
  dateTextError: {
    color: colors.error,
  },
  errorText: {
    ...typography.small,
    color: colors.error,
    marginTop: spacing.xs,
  },
});
