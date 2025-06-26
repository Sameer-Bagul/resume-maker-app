import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { colors, spacing, typography, shadows } from '../styles/globalStyles';

interface EnhancedCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  badge?: {
    text: string;
    color: string;
  };
  onPress?: () => void;
  gradientColors?: [string, string, ...string[]];
  children?: React.ReactNode;
  delay?: number;
}

export const EnhancedCard: React.FC<EnhancedCardProps> = ({
  title,
  subtitle,
  description,
  iconName,
  badge,
  onPress,
  gradientColors,
  children,
  delay = 0,
}) => {
  const CardContent = () => (
    <View style={styles.cardContent}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
        
        <View style={styles.rightSection}>
          {badge && (
            <View style={[styles.badge, { backgroundColor: badge.color }]}>
              <Text style={styles.badgeText}>{badge.text}</Text>
            </View>
          )}
          {iconName && (
            <Ionicons 
              name={iconName} 
              size={24} 
              color={colors.primary} 
              style={styles.icon}
            />
          )}
        </View>
      </View>
      
      {description && (
        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>
      )}
      
      {children}
    </View>
  );

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (gradientColors) {
      return (
        <LinearGradient
          colors={gradientColors}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {children}
        </LinearGradient>
      );
    }
    
    return <View style={styles.card}>{children}</View>;
  };

  return (
    <Animated.View 
      entering={FadeInUp.duration(500).delay(delay)}
      style={styles.container}
    >
      {onPress ? (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
          <CardWrapper>
            <CardContent />
          </CardWrapper>
        </TouchableOpacity>
      ) : (
        <CardWrapper>
          <CardContent />
        </CardWrapper>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: spacing.lg,
    ...shadows.medium,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  cardContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  titleContainer: {
    flex: 1,
    marginRight: spacing.md,
  },
  title: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    marginRight: spacing.sm,
  },
  badgeText: {
    ...typography.small,
    color: colors.cardBackground,
    fontWeight: '600',
  },
  icon: {
    marginLeft: spacing.xs,
  },
  description: {
    ...typography.body,
    color: colors.text,
    lineHeight: 22,
    marginTop: spacing.xs,
  },
});
