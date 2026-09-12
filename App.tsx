import { useEffect, useState } from "react";
import { Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./services/firebase";

import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}