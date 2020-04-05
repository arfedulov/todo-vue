<template>
  <div class="todo-item">
    <input
      type="checkbox"
      class="app-checkbox"
      :disabled="readonly"
      :checked="checked"
      @input="onCheckboxValueChange"
    />
    <input
      type="text"
      placeholder="to do"
      class="app-text-input"
      :class="textClasses"
      :disabled="readonly"
      :value="text"
      @input="onTextChange"
    />
    <app-button v-if="showDeleteButton" class="icon" title="delete" danger icon="trash" @click="onDelete" />
  </div>
</template>

<script>
import AppButton from '@/components/AppButton.vue';

export default {
  name: 'TodoItem',
  components: {
    AppButton,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    showDeleteButton() {
      return !this.readonly;
    },
    checked() {
      return this.value.checked;
    },
    text() {
      return this.value.text;
    },
    textClasses() {
      return {
        'app-text-input--checked': this.checked,
        'app-text-input--disabled': this.readonly,
      };
    },
  },
  methods: {
    onDelete() {
      this.$emit('delete', this.value.id);
    },
    onTextChange(event) {
      this.$emit('input', { ...this.value, text: event.target.value });
    },
    onCheckboxValueChange(event) {
      this.$emit('input', { ...this.value, checked: event.target.checked });
    },
  },
}
</script>

<style scoped>
.todo-item {
  margin: 5px;
  display: flex;
  align-items: center;
  font-size: 16px;
}

.icon {
  font-size: inherit;
}
</style>
