<template>
  <button class="button" :class="buttonClasses" :disabled="disabled" v-on="$listeners">
    <span v-if="icon" class="button__icon">{{ iconChar }}</span>
    <slot></slot>
  </button>
</template>

<script>

const ICON_NAME_TO_CHAR_MAP = {
  add: '\u00A1',
  edit: '\u00A2',
  trash: '\u00A3',
};

export default {
  name: 'AppButton',
  props: {
    icon: {
      type: String,
      default: '',
    },
    danger: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    primary: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    iconChar() {
      return ICON_NAME_TO_CHAR_MAP[this.icon] || '';
    },
    buttonClasses() {
      return {
        'button--icon': this.icon,
        'button--danger': this.danger,
        'button--primary': this.primary,
        'button--disabled': this.disabled,
      };
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  padding: 4px 8px;
  border-radius: 2px;
  text-transform: uppercase;

  background-color: transparent;
  border: 1px solid lightgray;
  color: lightgray;
  cursor: pointer;

  &:hover {
    border-color: gray;
    color: gray;
  }

  &--disabled {
    background-color: transparent;
    border-color: #cecece;
    color: #cecece;
    cursor: auto;

    &:hover {
      border-color: #cecece;
      color: #cecece;
    }
  }

  &--icon {
    border: none;
    outline: none;
    padding: 8px;
  }

  &--danger {
    color: #ffadad;
    border-color: #ffadad;

    &:hover {
      color: #ff0000;
      border-color: #ff0000;
    }
  }

  &--primary {
    color: #3949ab;
    border-color: #3949ab;

    &:hover {
      color: #091888;
      border-color: #091888;
    }
  }

  &__icon {
    font-family: 'Icons';
  }
}
</style>
