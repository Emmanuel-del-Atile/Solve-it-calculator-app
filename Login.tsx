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
  }
}

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>

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
       <View 
       style={styles.btnRow}
       >
          <Pressable 
          style={styles.button}
          onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
          <Pressable 
          style={[styles.button, styles.forgotPassBtn]}
          onPress={()=>navigation.replace("forgotPassword")}
         >
            <Text style={styles.buttonText}>Forgot Password</Text>
          </Pressable>

       </View>
      <Pressable 
         style={styles.registerButton}
         onPress={() => navigation.replace("register")}>
          <Text>Don't have an account? Register</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center"
  },
  btnRow:{
     flexDirection: "row",
     gap: 10,
     width: "100%"
  },
  button: {
    flex:1,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center"
  },
  forgotPassBtn:{
    backgroundColor: "lightgray",
  },
  registerButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
    buttonText: {
      color: "white",
      fontWeight: "bold"
    },
    
    input: {
      width: "100%",
      borderWidth: 1,
      borderColor: "gray",
      padding: 10,
      marginBottom: 10
    }
});