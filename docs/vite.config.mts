import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vike from 'vike/plugin'
import { AliasOptions, UserConfig, defineConfig, loadEnv } from 'vite'
import { appRoot, srcRoot } from './path.config'
import path from 'path'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import { packagesDir, workRoot } from '@lib-env/path'
import { fixPath } from '@lib-env/build-utils'
import { explorerTree, createMarkdownPlugin } from '@lib-env/app-utils'
import unocss from 'unocss/vite'
import { PluginOption } from 'vite'


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
  },
  {
    find: '@vunk/shared/function',
    replacement: path.resolve(packagesDir, 'function'),
  },
  {
    find: '@vunk/shared/object',
    replacement: path.resolve(packagesDir, 'object'),
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
        '@vunk/form/**',
      ],

    },
    build: {
      target: ['esnext'],
    },

    plugins: [
      vueDevTools(),
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
        redirects: {
          '/': '/zh-CN/guide/introduction',
        }
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
          root: path.resolve(workRoot, 'packages'),
        },
      }),

      Components({
        resolvers: [
          IconsResolver(),
        ],
      }),

      Icons(),
    ] as PluginOption[],
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
