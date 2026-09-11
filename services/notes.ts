import { db, auth } from "./firebase";
import { collection,
    addDoc,
    query, 
    where,
    getDocs,
    doc,
    updateDoc,
    deleteDoc
    } from "firebase/firestore/lite";
// CREATING NOTES
export async function createNote() {
  try {
    const user = auth.currentUser;

    if (!user) {
      console.log("No user is signed in");
      return null;
    }

    const notesCollection = collection(db, "notes");

    const note = {
      title: "Learn Firebase",
      ownerId: user.uid,
    };

    const docRef = await addDoc(notesCollection, note);

    console.log("Note created:", docRef.id);

    return {
      id: docRef.id,
      ...note,
    };
  } catch (error) {
    console.error("Firestore error:", error);
    return null;
  }
}

// READING NOTES
export async function getMyNotes() {
  try {
    const user = auth.currentUser;

    if (!user) {
      console.log("No user is signed in");
      return [];
    }

    const notesCollection = collection(db, "notes");

    const q = query(
      notesCollection,
      where("ownerId", "==", user.uid)
    );

    const snapshot = await getDocs(q);

    const notes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("My notes:", notes);

    return notes;

  } catch (error) {
    console.error("Read error:", error);
    return [];
  }
}

// UPDATING NOTES
export async function updateNote(noteId: string) {
  try {
    const noteRef = doc(db, "notes", noteId);

    await updateDoc(noteRef, {
      title: "Master Firebase",
    });

    console.log("Note updated:", noteId);
  } catch (error) {
    console.error("Update error:", error);
  }
}

// DELETING NOTES
export async function deleteNote(noteId: string) {
  try {
    const noteRef = doc(db, "notes", noteId);

    await deleteDoc(noteRef);

    console.log("Note deleted:", noteId);
  } catch (error) {
    console.error("Delete error:", error);
  }
}
