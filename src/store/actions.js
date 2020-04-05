import api from '@/api';

export const ACTION_TYPES = {
  ADD_NOTE: 'addNote',
  DELETE_NOTE: 'deleteNote',
  UPDATE_NOTE: 'updateNote',
};

export default {
  [ACTION_TYPES.ADD_NOTE]({ commit }, note) {
    api.addNote(note);
    commit('addNote', note);
  },
  [ACTION_TYPES.DELETE_NOTE]({ commit }, noteId) {
    api.deleteNote(noteId);
    commit('deleteNote', noteId);
  },
  [ACTION_TYPES.UPDATE_NOTE]({ commit }, partialNote) {
    const updated = api.updateNote(partialNote);

    if (updated) {
      commit('updateNote', partialNote);
    }
  },
};
