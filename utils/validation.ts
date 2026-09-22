export const validateNote = (
  title: string,
  content: string
): string | null => {
  if (!title.trim()) {
    return "Please give your note a title.";
  }

  if (!content.trim()) {
    return "Your note is empty.";
  }

  return null;
};