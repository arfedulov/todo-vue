<template>
  <div class="edit-note-page">
    <todo-note v-if="note" class="edit-note-page__note" :note="note">
      <template v-slot:actions>
        <app-button title="delete note" danger @click="onDeleteNote(note.id)">delete</app-button>
      </template>
    </todo-note>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import TodoNote from '@/components/TodoNote.vue';
import AppButton from '@/components/AppButton.vue';
import { ACTION_TYPES } from '@/store/actions';

export default {
  name: 'EditNotePage',
  components: { TodoNote, AppButton },
  props: {
    noteId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      note(state) {
        return state.notes.find((note) => note.id === this.noteId);
      },
    }),
  },
  methods: {
    ...mapActions({
      deleteNote: ACTION_TYPES.DELETE_NOTE,
    }),
    async onDeleteNote(noteId) {
      const confirmed = await this.$dialog.confirm('Are you sure you want to delete the note?');

      if (confirmed) {
        this.deleteNote(noteId);
        this.$router.replace('/');
      }
    },
  },
}
</script>

<style scoped>
.edit-note-page__note {
  box-sizing: border-box;
}
</style>
