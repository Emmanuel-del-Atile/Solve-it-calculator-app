import {View, Text, Pressable, StyleSheet} from 'react-native';
import { logOutUser } from "./services/auth";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<any>;


export default function Settings() {

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Settings</Text>

            <Pressable
                style={styles.signOutButton}
                onPress={logOutUser}
            >
                <Text style={styles.signOutText}>
                    Sign Out
                </Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
    },

    signOutButton: {
        padding: 15,
        borderRadius: 8,
        backgroundColor: "red",
    },

    signOutText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
});