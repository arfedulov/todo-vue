export const MUTATION_TYPES = {
  ADD_NOTE: 'addNote',
  DELETE_NOTE: 'deleteNote',
  UPDATE_NOTE: 'updateNote',
};

export default {
  [MUTATION_TYPES.ADD_NOTE]({ notes }, note) {
    notes.push(note);
  },
  [MUTATION_TYPES.DELETE_NOTE](state, noteId) {
    state.notes = state.notes.filter((note) => note.id !== noteId);
  },
  [MUTATION_TYPES.UPDATE_NOTE]({ notes }, partialNote) {
    const updateIndex = notes.findIndex((note) => note.id === partialNote.id);

    if (updateIndex === -1) {
      throw Error(`Imposible to update note. Note with id ${partialNote.id} does not exist.`);
    }

    notes.splice(updateIndex, 1, { ...notes[updateIndex], ...partialNote });
  },
};
