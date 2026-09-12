import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";

import { useState } from "react";
import { registerUser } from "./services/auth";

export default function Register({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    const user = await registerUser(email, password);

    if (user) {
      console.log("Registration successful!");

      navigation.replace("login");
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable
        style={styles.button}
        onPress={handleRegister}>
        <Text style={styles.buttonText}>
          Register
        </Text>
      </Pressable>

      <Pressable 
      style={styles.loginButton}
       onPress={() => navigation.replace("login")}>
        <Text>Already have an account? Login</Text>
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
    marginBottom: 20,
    alignSelf: "center"
  },

  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },

  button: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
loginButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },    
  buttonText: {
    fontWeight: "bold",
    color: "white",
  },
});