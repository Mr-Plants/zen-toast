import Vue from 'vue';
import toastComponent from "./src/toast.vue";

Toast.target = null;

export function Toast(options) {
  if (Toast.target) {
    Toast.target.clear();
  }
  const toastConstructor = Vue.extend(toastComponent);
  const toastInstance = new toastConstructor();

  Object.assign(toastInstance, parseOptions(options));
  toastInstance.$mount();

  toastInstance['clear'] = () => {
    document.body.removeChild(toastInstance.$el);
    toastInstance.$destroy();
    Toast.target = null;
  }

  document.body.appendChild(toastInstance.$el);
  return Toast.target = toastInstance;
}

function parseOptions(message) {
  return isObject(message) ? message : {message};
}

function isObject(val) {
  return val !== null && typeof val === 'object';
}

['success', 'fail', 'loading'].forEach(type => {
  Toast[type] = options => {
    options = parseOptions(options);
    options.type = type;
    return Toast(options)
  }
})

Toast.install = (Vue) => {
  Vue.prototype.$toast = Toast;
}

// export default Toast;
