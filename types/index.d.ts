import {Vue} from "vue/types/vue";

export interface ToastOptions {
  duration?: number,
  message: ToastMessage,
  closeOnClick?: boolean
}

export type ToastMessage = string | boolean | number;

export interface ToastInstance extends Vue {
  clear(): void
}

export interface Toast {
  (message: ToastMessage | ToastOptions): ToastInstance

  success(message: ToastMessage | ToastOptions): ToastInstance

  loading(message: ToastMessage | ToastOptions): ToastInstance

  fail(message: ToastMessage | ToastOptions): ToastInstance

  install(): void
}

declare module 'vue/types/vue' {
  interface Vue {
    $toast: Toast;
  }
}

export const Toast:Toast
