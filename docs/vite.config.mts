import type { AliasOptions, UserConfig } from 'vite'
import path from 'node:path'
// import { fixPath } from '@lib-env/build-utils'



import { packagesDir, workRoot } from '@lib-env/path'
import vue from '@vitejs/plugin-vue'

import vueJsx from '@vitejs/plugin-vue-jsx'

import { explorerTree, createMarkdownPlugin } from '@lib-env/app-utils'
import unocss from 'unocss/vite'
import IconsResolver from 'unplugin-icons/resolver'

import Icons from 'unplugin-icons/vite'

import Components from 'unplugin-vue-components/vite'
import vike from 'vike/plugin'
import { defineConfig, loadEnv } from 'vite'
import Inspect from 'vite-plugin-inspect'
import { appRoot, srcRoot } from './path.config'
import { LIB_ALIAS, LIB_NAME } from '@lib-env/build-constants'

export const fixPath = (id: string) => id.replaceAll(`${LIB_ALIAS}`, LIB_NAME)

const alias: AliasOptions = [
  {
    find: '#s',
    replacement: srcRoot,
  },
  {
    find: '#r',
    replacement: path.resolve(appRoot, './renderer'),
  },
  {
    find: '#p',
    replacement: path.resolve(appRoot, './pages'),
  },
  {
    find: '#e',
    replacement: path.resolve(appRoot, './examples'),
  },
  {
    find: '#',
    replacement: path.resolve(appRoot),
  }
]

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd()) as unknown as ImportMetaEnv
  const base = `${env.VITE_BASE_URL}/`

  const config: UserConfig = {

    base,
    resolve: {
      alias,
    },

    server: {
      port: 9995,
    },
    ssr: {
      noExternal: [
        '@vuesri-core/**',
        '@arcgis/core/**',
        '@vunk/skzz/**',
        '@skzz/platform/**',
        'esri/**',
        '@vunk/gsap/**',
      ],

    },
    build: {
      target: ['esnext'],
    },

    plugins: [

      explorerTree({
        root: packagesDir,
        ignore: [
          '**/node_modules**',
          '**/__tests__**',
          '**/src**',
          '**/index.ts',
          '**/package.json',
          '**/gulpfile.ts',
          '**/types.ts',
          'entry',
          'win32',
        ],
      }),

      
      vike({
        prerender: true,
      }),

      vue({
        include: [/\.vue$/, /\.md$/],
      }),
      vueJsx({}),

      unocss(),

      await createMarkdownPlugin({
        base,
        demoContainerPluginSettings: {
          root: path.resolve(appRoot, './examples'),
          codeSourceTransform: fixPath,
        },
        sourceContainerPluginSettings: {
          root: path.resolve(workRoot, 'packages'),
        },
        propsContainerPluginSettings: {
          root: path.resolve(workRoot, 'packages/components'),
        },
      }),

      Components({
        resolvers: [
          IconsResolver(),
        ],
      }),

      Icons(),
      Inspect(),
    ],
    // We manually add a list of dependencies to be pre-bundled, in order to avoid a page reload at dev start which breaks vike's CI
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext',
        define: {
          global: 'globalThis',
        },
        supported: {
          bigint: true,
        },
      },

    },

    css: { // https://www.cnblogs.com/crispyChicken/p/18420010
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
  }
  return config
})
