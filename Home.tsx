import {
  Pressable,
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
} from "react-native";

import {
  getMyNotes,
  deleteNote,
} from "./services/notes";

import { useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from "react";

export default function Home({ navigation }: any) {
  const [notes, setNotes] = useState<any[]>([]);
  const [showNotes, setShowNotes] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Load notes whenever Home becomes active
  useFocusEffect(
    useCallback(() => {
      if (showNotes) {
        loadNotes();
      }
    }, [showNotes])
  );

  // Format Firestore timestamp
  function formatDate(timestamp: any) {
    if (!timestamp) return "Just now";

    const date = timestamp.toDate
      ? timestamp.toDate()
      : new Date(timestamp);

    return date.toLocaleString();
  }

  // Decide which notes should be displayed
  const displayedNotes =
    searchText.trim() === ""
      ? [...notes]
          .sort((a, b) => {
            const dateA = a.createdAt?.toMillis?.() ?? 0;
            const dateB = b.createdAt?.toMillis?.() ?? 0;

            return dateB - dateA;
          })
          .slice(0, 5)
      : notes.filter(
          (note) =>
            note.title
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            note.content
              .toLowerCase()
              .includes(searchText.toLowerCase())
        );

  // Load notes from Firestore
  async function loadNotes() {
    const data = await getMyNotes();
    setNotes(data);
  }

  // Show / Hide notes
  async function handleReadNotes() {
    if (!showNotes) {
      await loadNotes();
    }

    setShowNotes((current) => !current);
  }

  // Delete note
  async function handleDelete(noteId: string) {
    const success = await deleteNote(noteId);

    if (success) {
      setNotes((currentNotes) =>
        currentNotes.filter(
          (note) => note.id !== noteId
        )
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.row}>

        <Text style={styles.title}>
          My Notes
        </Text>

        <Text style={styles.noteCount}>
          Total Notes: {notes.length}
        </Text>

      </View>

      {/* Search Box */}
      <TextInput
        style={styles.searchInput}
        placeholder="🔍Search notes..."
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Note Actions */}
      <View style={styles.row}>
        <Pressable
          style={styles.button}
          onPress={handleReadNotes}
        >
          <Text>
            {showNotes ? "Hide Notes" : "View Notes"}
          </Text>
        </Pressable>

      </View>

      {/* Notes */}
      {showNotes && (
        <ScrollView>

          {displayedNotes.length === 0 ? (
            <Text style={styles.noResults}>
              No notes found
              📝
            </Text>
          ) : (
            displayedNotes.map((note) => (

              <View
                key={note.id}
                style={styles.noteItem}
              >

                {/* Tappable Note Content */}
                <Pressable
                  onPress={() =>
                    navigation.navigate("NoteEditor", {
                      note: note,
                    })
                  }
                >

                  {/* Note title */}
                  <Text
                    style={styles.noteTitle}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {note.title}
                  </Text>

                  {/* Created / Updated date */}
                  <Text style={styles.noteDate}>
                    {note.updatedAt
                      ? `Updated: ${formatDate(note.updatedAt)}`
                      : `Created: ${formatDate(note.createdAt)}`
                    }
                  </Text>

                </Pressable>

                {/* Delete */}
                <Pressable
                  style={styles.deleteButton}
                  onPress={() =>
                    handleDelete(note.id)
                  }
                >
                  <Text style={styles.deleteButtonText}>
                    Delete
                  </Text>
                </Pressable>

              </View>

            ))
          )}

        </ScrollView>
      )}

        <Pressable
          style={styles.createButton}
          onPress={() =>
            navigation.navigate("NoteEditor")
          }
        >
          <Text style={styles.createButtonText}>
            +
          </Text>
        </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    margin: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  button: {
    backgroundColor: "lightblue",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  createButton:{
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 99,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5
  },
  createButtonText:{
   fontSize: 35,
   fontWeight: "bold",
   color: "blue"
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },

  deleteButton: {
    backgroundColor: "red",
    padding: 8,
    marginTop: 10,
    borderRadius: 5,
    alignSelf: "flex-end",
  },

  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  noteCount: {
    fontSize: 18,
    fontWeight: "bold",
  },

  noteItem: {
    backgroundColor: "lightgray",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },

  noteTitle: {
    fontSize: 17,
    marginTop: 5,
    marginBottom: 5,
    fontWeight: "bold",
    flexShrink: 1,
  },

  noteDate: {
    fontSize: 13,
    color: "gray",
  },

  noResults: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

});