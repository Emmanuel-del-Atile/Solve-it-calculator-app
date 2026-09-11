import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { loginUser } from "./services/auth";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<any>;

export default function Login({navigation}: Props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

async function handleLogin() {

  const user = await loginUser(email, password);

  if (user) {
    console.log("Login successful!");

    navigation.navigate("home");
  }
}

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

      <Text style={styles.title}>Login</Text>

      <TextInput
        style = {styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style = {styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable 
      style={styles.button}
      onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10
  },
    buttonText: {
      color: "white",
      fontWeight: "bold"
    },
    input: {
      width: "80%",
      borderWidth: 1,
      borderColor: "gray",
      padding: 10,
      marginBottom: 10
    }
});