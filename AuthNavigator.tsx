import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        component={Register}
      />
      <Stack.Screen
      name="forgotPassword"
      component={ForgotPassword}
      />
    </Stack.Navigator>
  );
}