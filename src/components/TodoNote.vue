<template>
  <div class="todo-note">
    <div class="todo-note__actions">
      <slot name="actions"></slot>
    </div>
    <h2 class="todo-note__title">
      <span v-if="readonly">{{ title }}</span>
      <input
        v-else
        type="text"
        placeholder="title"
        class="app-text-input app-text-input--big"
        :class="titleInputClasses"
        :value="title"
        @input="onTitleChange"
      />
    </h2>
    <div class="todo-note__todo-list">
      <todo-item
        v-for="item of todoList"
        :key="item.id"
        :value="item"
        :readonly="readonly"
        @delete="onItemDelete"
        @input="onItemChange"
      />
      <app-button
        v-if="showAddItemButton"
        title="add item to list"
        class="todo-note__add-button"
        icon="add"
        :disabled="readonly"
        @click="onAddItem"
      />
    </div>
    <div v-if="hasUnsavedChanges" class="bottom-actions todo-note__bottom-actions">
      <app-button class="bottom-actions__action-button" @click="onSave">save</app-button>
      <app-button class="bottom-actions__action-button" @click="onCancel">cancel</app-button>
      <app-button class="bottom-actions__action-button" @click="undoNoteUpdate">undo</app-button>
      <app-button class="bottom-actions__action-button" @click="redoNoteUpdate">redo</app-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import TodoItem from '@/components/TodoItem.vue';
import AppButton from '@/components/AppButton.vue';
import { ACTION_TYPES } from '@/store/actions';
import createTodoListItem from '@/models/createTodoListItem';

const REDUCED_TODO_LIST_MAX_SIZE = 3;

export default {
  name: 'TodoNote',
  components: {
    TodoItem,
    AppButton,
  },
  props: {
    note: {
      type: Object,
      required: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editsStack: [],
      undoneEditsStack: [],
      noteDataIntermediate: this.note,
      hasUnsavedChanges: false,
    };
  },
  computed: {
    title() {
      return this.noteDataIntermediate.title;
    },
    todoList() {
      if (this.readonly) {
        return this.noteDataIntermediate.todoList.slice(0, REDUCED_TODO_LIST_MAX_SIZE);
      }

      return this.noteDataIntermediate.todoList;
    },
    titleInputClasses() {
      return {
        'app-text-input--disabled': this.readonly,
      };
    },
    showAddItemButton() {
      return !this.readonly;
    },
  },
  methods: {
    ...mapActions({
      updateNote: ACTION_TYPES.UPDATE_NOTE,
    }),
    pushEdit(edit) {
      this.noteDataIntermediate = { ...edit.after };
      this.editsStack.push(edit);
      this.hasUnsavedChanges = true;
    },
    popEdit(edit) {
      this.noteDataIntermediate = { ...edit.before };
      this.undoneEditsStack.push(edit);
      this.hasUnsavedChanges = true;
    },
    doNoteUpdate(partialNote) {
      const updatedNote = { ...this.noteDataIntermediate, ...partialNote };
      const edit = { before: { ...this.noteDataIntermediate }, after: updatedNote };

      this.pushEdit(edit);
    },
    redoNoteUpdate() {
      const edit = this.undoneEditsStack.pop();

      if (edit) {
        this.pushEdit(edit);
      }
    },
    undoNoteUpdate() {
      const edit = this.editsStack.pop();

      if (edit) {
        this.popEdit(edit);
      }
    },
    onAddItem() {
      const item = createTodoListItem();
      this.doNoteUpdate({ todoList: [ ...this.noteDataIntermediate.todoList, item ] });
    },
    onItemChange(updatedItem) {
      const itemIndex = this.noteDataIntermediate.todoList.findIndex((item) => item.id === updatedItem.id);

      if (itemIndex !== -1) {
        const todoList = [ ...this.noteDataIntermediate.todoList ];

        todoList.splice(itemIndex, 1, { ...todoList[itemIndex], ...updatedItem });
        this.doNoteUpdate({ todoList });
      }
    },
    onItemDelete(itemId) {
      const todoList = this.noteDataIntermediate.todoList.filter((item) => item.id !== itemId);

      this.doNoteUpdate({ todoList });
    },
    onTitleChange(event) {
      this.doNoteUpdate({ title: event.target.value });
    },
    onSave() {
      this.updateNote(this.noteDataIntermediate);
      this.resetState();
    },
    resetState() {
      this.hasUnsavedChanges = false;
      this.editsStack = [];
      this.undoneEditsStack = [];
    },
    async onCancel() {
      const confirmed = await this.$dialog.confirm('Are you sure you want to cancel all unsaved changes?');

      if (confirmed) {
        this.noteDataIntermediate = this.note;
        this.resetState();
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.todo-note {
  padding: 15px;
  width: 100%;
  border: 1px solid lightgray;
  border-radius: 4px;

  &__title {
    display: flex;
    width: 50%;
    margin-left: 24px;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__add-button {
    margin: 6px 18px;
    font-size: inherit;
  }

  &__bottom-actions {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.bottom-actions {
  &__action-button {
    margin: 0 5px;
  }
}
</style>
