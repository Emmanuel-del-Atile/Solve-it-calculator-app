import {
  Pressable,
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";

import {
  getMyNotes,
  deleteNote,
} from "./services/notes";

import { useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from "react";

import type { Note } from "./types/note";
import { formatDate } from "./utils/date";
import { searchNotes } from "./utils/noteHelper";

import {
  colors,
  typography,
  spacing,
} from "./theme";

type ScreenStatus = "idle" | "loading" | "success" | "error";

export default function Home({ navigation }: any) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [status, setStatus] = useState<ScreenStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  const sortedNotes = [...notes].sort((a, b) => {
    const dateA = a.createdAt?.getTime() ?? 0;
    const dateB = b.createdAt?.getTime() ?? 0;

    return dateB - dateA;
  });
  
  const filteredNotes = searchNotes(notes, searchText);
  const displayedNotes =
    searchText.trim() === ""
      ? showAll
        ? sortedNotes
        : sortedNotes.slice(0, 5)
      : filteredNotes;

  async function loadNotes() {
    setStatus("loading");
    setErrorMessage(null);

    try {
      const data = await getMyNotes();

      setNotes(data);
      setStatus("success");
    } catch (error) {
      console.error("Failed to load notes:", error);

      setErrorMessage("Failed to load notes. Please try again.");
      setStatus("error");
    }
  }

  function handleShowAll() {
    setShowAll((current) => !current);
  }

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

const confirmDeleteNote = (note: Note) => {
  Alert.alert(
    "Delete Note",
    "Are you sure you want to delete this note?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteNote(note.id);

            // Update the UI immediately
            setNotes((currentNotes) =>
              currentNotes.filter((item) => item.id !== note.id)
            );
          } catch (error) {
            Alert.alert("Error", "Failed to delete note.");
          }
        },
      },
    ]
  );
};

  if (status === "loading") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            Loading notes...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (status === "error") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            {errorMessage}
          </Text>

          <Pressable
            style={styles.retryButton}
            onPress={loadNotes}
          >
            <Text style={styles.retryButtonText}>
              Try Again
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>
            Notely
          </Text>

          <Text style={styles.subtitle}>
            Your notes, your space.
          </Text>
        </View>

        <View style={styles.countBadge}>
          <Text style={styles.countNumber}>
            {notes.length}
          </Text>

          <Text style={styles.countLabel}>
            notes
          </Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>
          ⌕
        </Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search your notes..."
          placeholderTextColor={colors.mutedText}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Section header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {searchText.trim()
            ? "Search results"
            : "Recent notes"}
        </Text>

        {notes.length > 5 &&
          searchText.trim() === "" && (
            <Pressable
              onPress={handleShowAll}
            >
              <Text style={styles.showText}>
                {showAll
                  ? "Show Less"
                  : "Show All"}
              </Text>
            </Pressable>
          )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.notesContainer}
      >
        {notes.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>
                N
              </Text>
            </View>

            <Text style={styles.emptyTitle}>
              Nothing here yet
            </Text>

            <Text style={styles.emptyMessage}>
              Capture your first thought, idea or
              reminder with Notely.
            </Text>
          </View>
        ) : displayedNotes.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.searchEmptyIcon}>
              ⌕
            </Text>

            <Text style={styles.emptyTitle}>
              No notes found
            </Text>

            <Text style={styles.emptyMessage}>
              Try searching for a different word.
            </Text>
          </View>
        ) : (
          displayedNotes.map((note) => (
            <View
              key={note.id}
              style={styles.noteCard}
            >
              <Pressable
                style={styles.noteContent}
                onPress={() =>
                  navigation.navigate(
                    "NoteEditor",
                    { note }
                  )
                }
              >
                <View style={styles.noteTop}>
                  <View style={styles.noteDot} />

                  <Text
                    style={styles.noteTitle}
                    numberOfLines={1}
                  >
                    {note.title}
                  </Text>
                </View>

                <Text
                  style={styles.notePreview}
                  numberOfLines={2}
                >
                  {note.content}
                </Text>

                <Text style={styles.noteDate}>
                  {note.updatedAt
                    ? `Updated ${formatDate(note.updatedAt)}`
                    : `Created ${formatDate(note.createdAt)}`}
                </Text>
              </Pressable>

              <Pressable
                style={styles.deleteButton}
                onPress={() =>
                  confirmDeleteNote(note)
                }
              >
                <Text style={styles.deleteText}>
                  Delete
                </Text>
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <Pressable
        style={styles.createButton}
        onPress={() =>
          navigation.navigate("NoteEditor")
        }
      >
        <Text style={styles.createIcon}>
          +
        </Text>
      </Pressable>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },

  brand: {
    fontSize: typography.title,
    fontWeight: typography.bold,
    color: colors.text,
  },

  subtitle: {
    fontSize: typography.bodySmall,
    color: colors.secondaryText,
    marginTop: spacing.xs,
  },

  countBadge: {
    backgroundColor: colors.primaryLight,
    borderRadius: 14,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: "center",
  },

  countNumber: {
    fontSize: typography.heading,
    fontWeight: typography.bold,
    color: colors.primary,
  },

  countLabel: {
    fontSize: typography.caption,
    color: colors.primary,
  },

  searchContainer: {
    height: 52,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xxl,
  },

  searchIcon: {
    fontSize: 25,
    color: colors.secondaryText,
    marginRight: spacing.sm,
  },

  searchInput: {
    flex: 1,
    fontSize: typography.body,
    color: colors.text,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },

  sectionTitle: {
    fontSize: typography.subheading,
    fontWeight: typography.bold,
    color: colors.text,
  },

  showText: {
    color: colors.primary,
    fontSize: typography.bodySmall,
    fontWeight: typography.semibold,
  },

  notesContainer: {
    paddingBottom: 110,
  },

  statusContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
  },

  statusText: {
    fontSize: typography.body,
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing.md,
  },

  retryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
  },

  retryButtonText: {
    fontSize: typography.body,
    color: colors.background,
    fontWeight: "600",
  },

  noteCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },

  noteContent: {
    flex: 1,
  },

  noteTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },

  noteDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: colors.primary,
    marginRight: spacing.sm,
  },

  noteTitle: {
    flex: 1,
    fontSize: typography.subheading,
    fontWeight: typography.semibold,
    color: colors.text,
  },

  notePreview: {
    fontSize: typography.bodySmall,
    lineHeight: 20,
    color: colors.secondaryText,
    marginBottom: spacing.md,
  },

  noteDate: {
    fontSize: typography.caption,
    color: colors.mutedText,
  },

  deleteButton: {
    alignSelf: "flex-end",
    paddingTop: spacing.md,
    paddingHorizontal: spacing.sm,
  },

  deleteText: {
    color: colors.danger,
    fontSize: typography.caption,
    fontWeight: typography.semibold,
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xxxl,
    marginTop: 80,
  },

  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 26,
    backgroundColor: colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.xl,
  },

  emptyIconText: {
    fontSize: 38,
    fontWeight: typography.bold,
    color: colors.primary,
  },

  searchEmptyIcon: {
    fontSize: 54,
    color: colors.mutedText,
    marginBottom: spacing.lg,
  },

  emptyTitle: {
    fontSize: typography.heading,
    fontWeight: typography.bold,
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing.sm,
  },

  emptyMessage: {
    fontSize: typography.bodySmall,
    lineHeight: 21,
    color: colors.secondaryText,
    textAlign: "center",
  },

  createButton: {
    position: "absolute",
    right: spacing.xxl,
    bottom: spacing.xxl,
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",

    elevation: 6,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },

  createIcon: {
    color: colors.white,
    fontSize: 34,
    fontWeight: typography.regular,
    marginTop: -3,
  },
});