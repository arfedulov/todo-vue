import ConfirmDialog from '@/components/ConfirmDialog.vue';

const createDialogModule = (Vue) => {
  const confirm = (text) => {
    return new Promise((resolve) => {
      const DialogCtor = Vue.extend(ConfirmDialog);
      const vm = new DialogCtor({
        propsData: {
          text,
        },
      });

      const component = vm.$mount();
      document.documentElement.append(component.$el);

      const cleanup = () => {
        vm.$destroy();
        component.$el.remove();
      };

      vm.$on('confirm', () => {
        resolve(true);
        cleanup();
      });

      vm.$on('cancel', () => {
        resolve(false);
        cleanup();
      });
    });
  };

  return { confirm };
};

export default {
  install(Vue) {
    Vue.prototype.$dialog = createDialogModule(Vue);
  },
};
