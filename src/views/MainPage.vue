<template>
  <div class="main-page">
    <todo-note v-for="note of notes" class="note main-page__note" readonly :key="note.id" :note="note">
      <template v-slot:actions>
        <app-button class="note__edit-button" title="edit note" icon="edit" @click="onEditNote(note.id)" />
        <app-button title="delete note" danger @click="onDeleteNote(note.id)">delete</app-button>
      </template>
    </todo-note>
    <app-button
      v-if="showObtrusiveCreateButton"
      class="main-page__create-note-button main-page__create-note-button--obtrusive"
      title="create note"
      primary
      @click="onCreateNote"
    >
      create note
    </app-button>
    <app-button class="main-page__create-note-button" title="create note" primary icon="add" @click="onCreateNote" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import TodoNote from '@/components/TodoNote.vue';
import AppButton from '@/components/AppButton.vue';
import { ACTION_TYPES } from '@/store/actions';
import createNote from '@/models/createNote';

export default {
  name: 'MainPage',
  components: { TodoNote, AppButton },
  computed: {
    ...mapState({
      notes: state => state.notes,
    }),
    showObtrusiveCreateButton() {
      return this.notes.length === 0;
    },
  },
  methods: {
    ...mapActions({
      deleteNote: ACTION_TYPES.DELETE_NOTE,
      addNote: ACTION_TYPES.ADD_NOTE,
    }),
    async onDeleteNote(noteId) {
      const confirmed = await this.$dialog.confirm('Are you sure you want to delete note?');

      if (confirmed) {
        this.deleteNote(noteId);
      }
    },
    onEditNote(noteId) {
      this.$router.push(`/edit/${noteId}/`);
    },
    onCreateNote() {
      const note = createNote();
      this.addNote(note);
      this.$router.push(`/edit/${note.id}/`);
    },
  },
}
</script>

<style lang="scss" scoped>
.main-page {
  &__create-note-button {
    position: fixed;
    right: 25px;
    bottom: 25px;
    font-size: 40px;

    &--obtrusive {
      right: 50vw;
      bottom: 50vh;
      transform: translate(50%, -50%);
      font-size: 18px;
    }
  }

  &__note {
    margin: 15px 0;
    width: 100%;
    box-sizing: border-box;
  }
}

.note {
  &__edit-button {
    margin-right: auto;
    font-size: inherit;
  }
}
</style>
