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
import { registerUser } from "./services/auth";

import {
  colors,
  typography,
  spacing,
} from "./theme";

export default function Register({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  async function handleRegister() {
    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    if (!password) {
      setError("Please create a password.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    const user = await registerUser(
      email.trim(),
      password
    );

    if (!user) {
      setError(
        "Unable to create your account. Please try again."
      );
    }

    // No navigation here.
    // App.tsx will react to Firebase auth state.
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
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>

          {/* Brand */}
          <View style={styles.brandContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>
                N
              </Text>
            </View>

            <Text style={styles.brand}>
              Notely
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>
              Create your account
            </Text>

            <Text style={styles.description}>
              Start capturing your ideas with Notely.
            </Text>
          </View>

          {/* Email */}
          <View style={styles.field}>
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
          </View>

          {/* Password */}
          <View style={styles.field}>
            <Text style={styles.label}>
              Password
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Create a password"
              placeholderTextColor={colors.mutedText}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {error !== "" && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>
                {error}
              </Text>
            </View>
          )}

          <Pressable
            style={styles.primaryButton}
            onPress={handleRegister}
          >
            <Text style={styles.primaryButtonText}>
              Create Account
            </Text>
          </Pressable>

          <View style={styles.loginContainer}>
            <Text style={styles.secondaryText}>
              Already have an account?
            </Text>

            <Pressable
              onPress={() =>
                navigation.navigate("login")
              }
            >
              <Text style={styles.link}>
                Sign In
              </Text>
            </Pressable>
          </View>

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

  brandContainer: {
    alignItems: "center",
    marginBottom: spacing.xxxl,
  },

  logo: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.sm,
  },

  logoText: {
    color: colors.white,
    fontSize: 28,
    fontWeight: typography.bold,
  },

  brand: {
    fontSize: typography.heading,
    fontWeight: typography.bold,
    color: colors.text,
  },

  header: {
    marginBottom: spacing.xxl,
  },

  title: {
    fontSize: typography.title,
    fontWeight: typography.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },

  description: {
    color: colors.secondaryText,
    fontSize: typography.body,
  },

  field: {
    marginBottom: spacing.lg,
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
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.lg,
  },

  errorText: {
    color: colors.danger,
    fontSize: typography.bodySmall,
  },

  primaryButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  primaryButtonText: {
    color: colors.white,
    fontSize: typography.body,
    fontWeight: typography.bold,
  },

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.xs,
    marginTop: spacing.xxl,
  },

  secondaryText: {
    color: colors.secondaryText,
    fontSize: typography.bodySmall,
  },

  link: {
    color: colors.primary,
    fontWeight: typography.bold,
    fontSize: typography.bodySmall,
  },
});