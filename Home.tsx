import { Pressable, Text, View,StyleSheet, ScrollView } from "react-native";
import {createNote, getMyNotes, updateNote , deleteNote} from "./services/notes";
import { useState } from "react";

import {logOutUser, registerUser, loginUser} from "./services/auth";
    

export default function Home() {
    const [notes, setNotes] = useState<any[]>([]);
    
    async function handleReadNotes(){
        const data = await getMyNotes();
        setNotes(data);
    }
    return(
        <View>
            <Text style={styles.title}>My Notes</Text>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
             //create user
            <Pressable
            style={styles.button}
             onPress={registerUser}>
              <Text>Register Test User</Text>
            </Pressable>
            
            //sign out
            <Pressable 
            style={styles.button}
            onPress={logOutUser}>
              <Text>Sign Out</Text>
            </Pressable>
            </View>

            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
               <Pressable 
                   style={styles.button}
                   onPress={async () => {
                    const newNote = await createNote();
                    if (newNote) {
                      setNotes((currentNotes) => [
                        ...currentNotes, newNote
                    ]);
                    }
                  }}>

                  <Text>Create Note</Text>
                </Pressable>

                <Pressable 
                   style={styles.button}
                   onPress={handleReadNotes}>
                   <Text>View Note</Text>
                </Pressable>
            </View>

            <Text style={styles.noteCount}>Total Notes: {notes.length}</Text>
            <ScrollView>
           {
            notes.map((note) =>(
                <View key={note.id} style={styles.noteItem}>
                    <Text>Title: {note.title}</Text>
                    <Text>Owner: {note.ownerId}</Text>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Pressable
                            style={styles.button}
                            onPress={() => updateNote(note.id)}>
                            <Text>Update Note</Text>
                        </Pressable>

                        <Pressable
                            style={styles.deleteButton}
                            onPress={ async () => {
                                await deleteNote(note.id);

                                setNotes((currentNotes) => 
                                    currentNotes.filter((item) => item.id !== note.id)
                                );
                            }}>
                            <Text style={styles.deleteButtonText}>Delete Note</Text>
                        </Pressable>
                    </View>

                </View>
            ))}
            </ScrollView>
        </View>
    )
}
    const styles = StyleSheet.create({
        button: {
            backgroundColor: "lightblue",
            padding: 10,
            margin: 10,
            borderRadius: 5
         },
         deleteButton:{
            backgroundColor: "red",
            padding: 10,
            margin: 10,
            borderRadius: 5
         },
            deleteButtonText: {
            color: "white",
            fontWeight: "bold"
        },
        noteCount: {
            fontSize: 18,
            fontWeight: "bold",
        },  
        noteItem: {
            backgroundColor: "lightgray",
            padding: 10,
            margin: 10,
            borderRadius: 5
        },
        title: {
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 10
        }
    });