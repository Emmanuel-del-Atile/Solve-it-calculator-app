import { Text, StyleSheet, Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./Home";
import NoteEditor from "./NoteEditor";
import Settings from "./Settings";
import Calculator from "./Calculator";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
     <Stack.Screen
      name="home"
      component={Home}
      options={({navigation})=>({
        title: "My Notes",
        headerRight: ()=>(
            <Pressable
            onPress={()=>navigation.navigate("Settings")}
            style={{marginRight:10}}
            >
                <Text style={{fontSize:22}}>⚙️</Text>
            </Pressable>
        ),
      })
    }/>
      <Stack.Screen name="Settings" component={Settings}/>
      <Stack.Screen name= "NoteEditor" component={NoteEditor}/>
      <Stack.Screen name="calculator" component={Calculator} />
    </Stack.Navigator>
  );
}