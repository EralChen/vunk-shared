import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { cssOnlyPlugin } from './cssOnlyPlugin'

export const createVuePlugins = () => {
  return [
    vue(),
    vueJsx({}),
    cssOnlyPlugin,
  ]
}
