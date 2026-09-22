import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { useState } from "react";
import { resetPassword } from "./services/auth";

import {
  colors,
  typography,
  spacing,
} from "./theme";

export default function ForgotPassword({
  navigation,
  route,
}: any) {
  const from = route?.params?.from;

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleReset() {
    setMessage("");
    setError("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError(
        "Please enter your email address."
      );
      return;
    }

    if (!trimmedEmail.includes("@")) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }

    const success = await resetPassword(
      trimmedEmail
    );

    if (success) {
      setMessage(
        "Password reset link sent. Check your email."
      );
    } else {
      setError(
        "We couldn't send the reset link. Please try again."
      );
    }
  }

  function handleBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else if (from === "settings") {
      navigation.navigate("Settings");
    } else {
      navigation.navigate("login");
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.container}>

          <View style={styles.icon}>
            <Text style={styles.iconText}>
              ↻
            </Text>
          </View>

          <Text style={styles.title}>
            Reset your password
          </Text>

          <Text style={styles.description}>
            Enter the email connected to your Notely
            account and we'll send you a reset link.
          </Text>

          <Text style={styles.label}>
            Email
          </Text>

          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            placeholderTextColor={colors.mutedText}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          {error !== "" && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>
                {error}
              </Text>
            </View>
          )}

          {message !== "" && (
            <View style={styles.successBox}>
              <Text style={styles.successText}>
                {message}
              </Text>
            </View>
          )}

          <Pressable
            style={styles.primaryButton}
            onPress={handleReset}
          >
            <Text style={styles.primaryButtonText}>
              Send Reset Link
            </Text>
          </Pressable>

          <Pressable
            style={styles.backButton}
            onPress={handleBack}
          >
            <Text style={styles.backText}>
              ← Back
            </Text>
          </Pressable>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scroll: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.huge,
  },

  icon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.xl,
  },

  iconText: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: typography.bold,
  },

  title: {
    fontSize: typography.title,
    fontWeight: typography.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },

  description: {
    fontSize: typography.body,
    lineHeight: 23,
    color: colors.secondaryText,
    marginBottom: spacing.xxl,
  },

  label: {
    fontSize: typography.bodySmall,
    fontWeight: typography.semibold,
    color: colors.text,
    marginBottom: spacing.sm,
  },

  input: {
    height: 54,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: spacing.lg,
    fontSize: typography.body,
    color: colors.text,
  },

  errorBox: {
    backgroundColor: colors.dangerLight,
    borderRadius: 12,
    padding: spacing.md,
    marginTop: spacing.md,
  },

  errorText: {
    color: colors.danger,
    fontSize: typography.bodySmall,
  },

  successBox: {
    backgroundColor: colors.successLight,
    borderRadius: 12,
    padding: spacing.md,
    marginTop: spacing.md,
  },

  successText: {
    color: colors.success,
    fontSize: typography.bodySmall,
  },

  primaryButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.xl,
  },

  primaryButtonText: {
    color: colors.white,
    fontSize: typography.body,
    fontWeight: typography.bold,
  },

  backButton: {
    alignItems: "center",
    padding: spacing.lg,
    marginTop: spacing.sm,
  },

  backText: {
    color: colors.secondaryText,
    fontSize: typography.bodySmall,
    fontWeight: typography.semibold,
  },
});