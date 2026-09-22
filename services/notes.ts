import { db, auth } from "./firebase";
import {Note} from "../types/note";
import { 
    collection,
    addDoc,
    query, 
    where,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    serverTimestamp
    } from "firebase/firestore/lite";


// CREATING NOTES
export async function createNote(title: string, content: string) {
  try {
    if(!title.trim()){
      console.log("Title is required");
      return null;
    }

    if(!content.trim()){
      console.log("Content is required")
      return null;
    }

    const user = auth.currentUser;

    if (!user) {
      console.log("No user is signed in");
      return null;
    }

    const notesCollection = collection(db, "notes");

    const note = {
      title: title.trim(),
      content: content.trim(),
      ownerId: user.uid,
      createdAt: serverTimestamp()
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
export async function getMyNotes(): Promise<Note[]> {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not authenticated");
  }

  const notesCollection = collection(db, "notes");

  const q = query(
    notesCollection,
    where("ownerId", "==", user.uid)
  );

  const snapshot = await getDocs(q);

  const notes: Note[] = snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title ?? "",
      content: data.content ?? "",
      ownerId: data.ownerId,
      createdAt: data.createdAt?.toDate() ?? null,
      updatedAt: data.updatedAt?.toDate() ?? null,
    };
  });

  return notes;
}

// UPDATING NOTES
export async function updateNote(noteId: string, title: string, content:string) {
  try {
    const noteRef = doc(db, "notes", noteId);

    await updateDoc(noteRef, {
      title: title.trim(),
      content: content.trim(),
      updatedAt: serverTimestamp()
    });

    console.log("Note updated:", noteId);

    return true;
  } catch (error) {
    console.error("Update error:", error);
    return false;
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
