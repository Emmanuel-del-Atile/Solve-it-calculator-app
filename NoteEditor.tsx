import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";

import { useState } from "react";

import {
  createNote,
  updateNote,
} from "./services/notes";

export default function NoteEditor({ navigation, route }: any) {

  const { note } = route.params || {};

  const [title, setTitle] = useState(
    note?.title || ""
  );

  const [content, setContent] = useState(
    note?.content || ""
  );

  async function handleSave() {

    if (!title.trim()) {
      console.log("Title is required");
      return;
    }

    if (!content.trim()) {
      console.log("Content is required");
      return;
    }

    // EDIT
    if (note) {

      const success = await updateNote(
        note.id,
        title,
        content
      );

      if (success) {
        console.log("Note updated!");
        navigation.goBack();
      }

      return;
    }

    // CREATE
    const newNote = await createNote(
      title,
      content
    );

    if (newNote) {
      console.log("Note created!");
      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        {note ? "Edit Note" : "New Note"}
      </Text>

      <TextInput
        style={styles.titleInput}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.contentInput}
        placeholder="Write your note..."
        value={content}
        onChangeText={setContent}
        multiline
      />

      <Pressable
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveText}>
          Save
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

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  titleInput: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },

  contentInput: {
    borderWidth: 1,
    padding: 12,
    height: 200,
    borderRadius: 8,
    textAlignVertical: "top",
  },

  saveButton: {
    backgroundColor: "lightblue",
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    alignItems: "center",
  },

  saveText: {
    fontWeight: "bold",
    fontSize: 16,
  },

});