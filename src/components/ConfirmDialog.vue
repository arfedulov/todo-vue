<template>
  <div class="dialog-backdrop">
    <div class="dialog">
      <p>
        {{ text }}
      </p>
      <div class="actions">
        <app-button class="actions__action-button" @click="onConfirm">ok</app-button>
        <app-button class="actions__action-button" @click="onCancel">cancel</app-button>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton.vue';

export default {
  name: 'ConfirmDialog',
  components: {
    AppButton,
  },
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  methods: {
    onConfirm() {
      this.$emit('confirm');
    },
    onCancel() {
      this.$emit('cancel');
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background-color: rgba(42, 42, 42, 0.26);
}

.dialog {
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  background-color: #ffffff;
}

.actions {
  &__action-button {
    margin: 0 4px;
  }
}
</style>
