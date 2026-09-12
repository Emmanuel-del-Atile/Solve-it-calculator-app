import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";

import { useState } from "react";
import { resetPassword } from "./services/auth";

export default function ForgotPassword({ navigation }: any) {
  const [email, setEmail] = useState("");

  async function handleReset() {
    const success = await resetPassword(email);

    if (success) {
      console.log("Reset email sent!");
      navigation.navigate("login");
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Forgot Password?</Text>

      <Text style={styles.description}>
        Enter your email and we'll send you a password reset link.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Pressable
        style={styles.button}
        onPress={handleReset}
      >
        <Text style={styles.buttonText}>
          Send Reset Email
        </Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("login")}>
        <Text>Back to Login</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  description: {
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },

  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },

  buttonText: {
    fontWeight: "bold",
  },
});