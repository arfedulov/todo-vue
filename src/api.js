const STORAGE_KEY = 'notes';

const getNotes = () => {
  const item = localStorage.getItem(STORAGE_KEY);

  if (item) {
    return JSON.parse(item);
  }

  return [];
};

const addNote = (note) => {
  const notes = getNotes();

  notes.push(note);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};

const deleteNote = (noteId) => {
  const notes = getNotes().filter((note) => note.id !== noteId);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};

const updateNote = (partialNote) => {
  const notes = getNotes();
  const updateIndex = notes.findIndex((note) => note.id === partialNote.id);

  if (updateIndex === -1) {
    console.error(`Imposible to update note. Note with id ${partialNote.id} does not exist.`);
    return false;
  }

  notes.splice(updateIndex, 1, { ...notes[updateIndex], ...partialNote });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));

  return true;
};

export default {
  getNotes,
  addNote,
  deleteNote,
  updateNote,
};
