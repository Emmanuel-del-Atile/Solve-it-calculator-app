import type { Note } from "../types/note";

export const searchNotes = (
  notes: Note[],
  searchTerm: string
): Note[] => {
  const term = searchTerm.trim().toLowerCase();

  if (!term) {
    return notes;
  }

  return notes.filter(
    (note) =>
      note.title.toLowerCase().includes(term) ||
      note.content.toLowerCase().includes(term)
  );
};