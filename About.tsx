import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";

import {
  colors,
  typography,
  spacing,
} from "./theme";

export default function About({
  navigation,
}: any) {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
    >

      <View style={styles.hero}>

        <View style={styles.logo}>
          <Text style={styles.logoText}>
            N
          </Text>
        </View>

        <Text style={styles.brand}>
          Notely
        </Text>

        <Text style={styles.tagline}>
          Your thoughts, organized.
        </Text>

        <View style={styles.versionBadge}>
          <Text style={styles.versionText}>
            Version 1.0.0
          </Text>
        </View>

      </View>

      <View style={styles.card}>

        <Text style={styles.heading}>
          About Notely
        </Text>

        <Text style={styles.paragraph}>
          Notely is a simple and focused space for
          capturing your thoughts, ideas, reminders
          and important information.
        </Text>

        <Text style={styles.paragraph}>
          The goal is simple: make writing down,
          finding and managing your thoughts feel
          effortless.
        </Text>

      </View>

      <View style={styles.card}>

        <Text style={styles.heading}>
          Built for simplicity
        </Text>

        <View style={styles.feature}>
          <Text style={styles.featureIcon}>
            ✓
          </Text>

          <Text style={styles.featureText}>
            Create and organize your notes
          </Text>
        </View>

        <View style={styles.feature}>
          <Text style={styles.featureIcon}>
            ✓
          </Text>

          <Text style={styles.featureText}>
            Search your notes quickly
          </Text>
        </View>

        <View style={styles.feature}>
          <Text style={styles.featureIcon}>
            ✓
          </Text>

          <Text style={styles.featureText}>
            Keep your notes synchronized securely
          </Text>
        </View>

      </View>

      <Text style={styles.footer}>
        Made with curiosity, code and a lot of learning.
      </Text>

      <Pressable
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>
          ← Back to Settings
        </Text>
      </Pressable>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    padding: spacing.xxl,
    paddingBottom: spacing.huge,
  },

  hero: {
    alignItems: "center",
    paddingVertical: spacing.xxxl,
  },

  logo: {
    width: 78,
    height: 78,
    borderRadius: 26,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.lg,
  },

  logoText: {
    color: colors.white,
    fontSize: 42,
    fontWeight: typography.bold,
  },

  brand: {
    fontSize: typography.display,
    fontWeight: typography.bold,
    color: colors.text,
  },

  tagline: {
    color: colors.secondaryText,
    fontSize: typography.body,
    marginTop: spacing.xs,
  },

  versionBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginTop: spacing.lg,
  },

  versionText: {
    color: colors.primary,
    fontSize: typography.caption,
    fontWeight: typography.semibold,
  },

  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: spacing.xl,
    marginBottom: spacing.lg,
  },

  heading: {
    fontSize: typography.subheading,
    fontWeight: typography.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },

  paragraph: {
    fontSize: typography.bodySmall,
    lineHeight: 21,
    color: colors.secondaryText,
    marginBottom: spacing.md,
  },

  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },

  featureIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.successLight,
    color: colors.success,
    textAlign: "center",
    lineHeight: 24,
    fontWeight: typography.bold,
    marginRight: spacing.md,
  },

  featureText: {
    flex: 1,
    color: colors.text,
    fontSize: typography.bodySmall,
  },

  footer: {
    textAlign: "center",
    color: colors.mutedText,
    fontSize: typography.caption,
    lineHeight: 18,
    marginVertical: spacing.lg,
  },

  backButton: {
    alignItems: "center",
    padding: spacing.lg,
  },

  backText: {
    color: colors.primary,
    fontWeight: typography.semibold,
  },
});