import { Pressable, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Calculator from "./Calculator";
import Settings from "./Settings";
import Home from "./Home";
import Login from "./Login";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="home"
          component={Home}
        />

        <Stack.Screen
          name="Settings"
          component={Settings}
        />

        <Stack.Screen
          name="calculator"
          component={Calculator}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}