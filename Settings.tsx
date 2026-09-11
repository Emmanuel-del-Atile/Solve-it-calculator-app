import {View, Text, Pressable} from 'react-native';

import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<any>;
export default function Settings({navigation}: Props) {
    return(
        <View>
            <Text> This is my Settings</Text>
            <Pressable
                onPress={() => navigation.navigate("calculator")}>
                <Text>Go to Calculator</Text>
            </Pressable> 




            <Pressable onPress={() => navigation.navigate("home")}>
                <Text>Go to Home</Text>
            </Pressable>   
        </View>
    );
}