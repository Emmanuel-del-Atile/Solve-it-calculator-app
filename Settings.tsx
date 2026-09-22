import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import { logOutUser } from "./services/auth";
import { auth } from "./services/firebase";

import {
  colors,
  typography,
  spacing,
} from "./theme";

export default function Settings({ navigation }: any) {
  const user = auth.currentUser;

  function handleSignOut() {
    Alert.alert(
      "Sign out",
      "Are you sure you want to sign out of Notely?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: logOutUser,
        },
      ]
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
    >

      <Text style={styles.title}>
        Settings
      </Text>

      <Text style={styles.subtitle}>
        Manage your Notely account.
      </Text>

      {/* Account */}
      <Text style={styles.sectionTitle}>
        ACCOUNT
      </Text>

      <View style={styles.accountCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.email
              ?.charAt(0)
              .toUpperCase() || "N"}
          </Text>
        </View>

        <View style={styles.accountInfo}>
          <Text style={styles.accountLabel}>
            Signed in as
          </Text>

          <Text
            style={styles.email}
            numberOfLines={1}
          >
            {user?.email || "Unknown user"}
          </Text>
        </View>
      </View>

      {/* Security */}
      <Text style={styles.sectionTitle}>
        SECURITY
      </Text>

      <Pressable
        style={styles.settingCard}
        onPress={() =>
          navigation.navigate(
            "forgotPassword",
            { from: "settings" }
          )
        }
      >
        <View style={styles.settingIcon}>
          <Text style={styles.settingIconText}>
            ↻
          </Text>
        </View>

        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>
            Reset Password
          </Text>

          <Text style={styles.settingDescription}>
            Change your account password
          </Text>
        </View>

        <Text style={styles.chevron}>
          ›
        </Text>
      </Pressable>

      {/* About */}
      <Text style={styles.sectionTitle}>
        ABOUT
      </Text>

      <Pressable
        style={styles.settingCard}
        onPress={() =>
          navigation.navigate("About")
        }
      >
        <View style={styles.settingIcon}>
          <Text style={styles.settingIconText}>
            i
          </Text>
        </View>

        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>
            About Notely
          </Text>

          <Text style={styles.settingDescription}>
            Learn more about the app
          </Text>
        </View>

        <Text style={styles.chevron}>
          ›
        </Text>
      </Pressable>

      {/* Sign out */}
      <Pressable
        style={styles.signOutButton}
        onPress={handleSignOut}
      >
        <Text style={styles.signOutText}>
          Sign Out
        </Text>
      </Pressable>

      <Text style={styles.version}>
        Notely • Version 1.0.0
      </Text>

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

  title: {
    fontSize: typography.title,
    fontWeight: typography.bold,
    color: colors.text,
  },

  subtitle: {
    color: colors.secondaryText,
    fontSize: typography.bodySmall,
    marginTop: spacing.xs,
  },

  sectionTitle: {
    fontSize: typography.caption,
    fontWeight: typography.bold,
    color: colors.mutedText,
    letterSpacing: 1,
    marginTop: spacing.xxxl,
    marginBottom: spacing.md,
  },

  accountCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: colors.white,
    fontSize: typography.heading,
    fontWeight: typography.bold,
  },

  accountInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },

  accountLabel: {
    fontSize: typography.caption,
    color: colors.secondaryText,
    marginBottom: spacing.xs,
  },

  email: {
    fontSize: typography.bodySmall,
    fontWeight: typography.semibold,
    color: colors.text,
  },

  settingCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },

  settingIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },

  settingIconText: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: typography.bold,
  },

  settingInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },

  settingTitle: {
    fontSize: typography.body,
    fontWeight: typography.semibold,
    color: colors.text,
  },

  settingDescription: {
    fontSize: typography.caption,
    color: colors.secondaryText,
    marginTop: spacing.xs,
  },

  chevron: {
    fontSize: 28,
    color: colors.mutedText,
  },

  signOutButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: colors.dangerLight,
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.xxxl,
  },

  signOutText: {
    color: colors.danger,
    fontSize: typography.body,
    fontWeight: typography.bold,
  },

  version: {
    textAlign: "center",
    color: colors.mutedText,
    fontSize: typography.caption,
    marginTop: spacing.xxl,
  },
});