import {Toast} from "../index";
import Vue from 'vue';

describe('zen-toast_v_1.0.0', () => {
  describe('dom', () => {
    test('toast basic dom', async () => {
      const toast = Toast('爱过～');
      expect(toast.$el.outerHTML).toMatchSnapshot();
      expect(document.querySelector('.toast-overlay')).toBeTruthy();

      expect(document.querySelector('.base')).toBeTruthy();
      expect(toast.timer).toBeTruthy();

      // 1.5s后自动消失
      await later(1500);
      expect(toast.timer).toBeFalsy();
      expect(document.querySelector('.toast-overlay')).toBeFalsy();
    })

    test('toast success dom', async () => {
      const toast = Toast.success('爱过～');
      expect(toast.$el.outerHTML).toMatchSnapshot();
      expect(document.querySelector('.success')).toBeTruthy();
      expect(document.querySelector('.icon')).toBeTruthy();
    })

    test('toast fail dom', async () => {
      const toast = Toast.fail('爱过～');
      expect(toast.$el.outerHTML).toMatchSnapshot();
      expect(document.querySelector('.fail')).toBeTruthy();
      expect(document.querySelector('.icon')).toBeTruthy();
    })

    test('toast loading dom', async () => {
      const toast = Toast.loading('loading...');
      expect(toast.$el.outerHTML).toMatchSnapshot();
      expect(document.querySelector('.loading')).toBeTruthy();
      expect(document.querySelector('.icon')).toBeTruthy();
    })
  })

  describe('props', () => {
    test('props should set correct', async () => {
      const toast = Toast({
        message: 'message'
      })
      expect(toast.$el.outerHTML).toMatchSnapshot();

      await later();
      expect(toast.message).toBe('message');
      expect(toast.duration).toBe(1.5);
      expect(toast.closeOnClick).toBeFalsy()
      expect(toast.type).toBe('base');
    })

    test('message length should less than 18', async () => {
      const toast = Toast({
        message: 'messagemessagemessagemessagemessagemessagemessagemessage'
      })
      expect(toast.$el.outerHTML).toMatchSnapshot();

      await later();
      expect(toast.message).toHaveLength(18);
      expect(toast.duration).toBe(3);
    })
  })

  describe('event', () => {
    test('click overlay should close toast', () => {
      const toast = Toast({
        duration: 0,
        message: 'message',
        closeOnClick: true
      });
      expect(toast.$el.outerHTML).toMatchSnapshot();
      toast.$el.click();
      expect(document.querySelector('.toast-overlay')).toBeFalsy();
    })
  })

  describe('plugin', () => {
    test('install method should invoke', () => {
      Vue.use(Toast);
      expect(Vue.prototype.$toast).toEqual(Toast);
    })
  })

});

function later(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}
