import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import markdown from 'unplugin-vue-markdown/vite'
import vike from 'vike/plugin'

import { AliasOptions, UserConfig, defineConfig, loadEnv } from 'vite'
import { unocssPreferences, containerPlugin, getDefaultHighlight, preWrapperPlugin } from '@lib-env/app-utils'
import { appRoot, srcRoot } from './path.config'

import path from 'path'

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

import Components from 'unplugin-vue-components/vite'

import { MarkdownTransform } from './vitepress/plugins/markdown-transform'
import { linkPlugin } from './vitepress/plugins/link'
import { anchorPlugin } from './vitepress/plugins/anchor'
import VueDevTools from 'vite-plugin-vue-devtools'



const alias: AliasOptions = [
  {
    find: '#s',
    replacement: srcRoot,
  },
  {
    find: '#r',
    replacement: path.resolve(appRoot,'./renderer'),
  },
  {
    find: '#p',
    replacement: path.resolve(appRoot,'./pages'),
  },
  {
    find: '#e',
    replacement: path.resolve(appRoot,'./examples'),
  },
  {
    find: '#',
    replacement: path.resolve(appRoot),
  },
]


export default defineConfig(async ({ mode }) => {

  const env = loadEnv(mode, process.cwd()) as unknown as ImportMetaEnv
  const base = env.VITE_BASE_URL + '/'

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
      VueDevTools(),
      MarkdownTransform(),
      vike({
        prerender: true, 
      }),

      unocssPreferences(),
      
      vue({
        include: [/\.vue$/, /\.md$/],
      }),
      vueJsx({}),

 

      markdown({
        
        markdownItOptions: {
          html: true,
          linkify: true,
          highlight: (await getDefaultHighlight()),
        },
        
        markdownItSetup (md) {
          md
            .use(preWrapperPlugin)
            .use(containerPlugin)
            .use(linkPlugin,
              { 
                target: '_blank', 
                rel: 'noreferrer', 
              },
              {
                base,
                cleanUrls: true,
              },
            )
            .use(anchorPlugin)
  
        },
        wrapperClasses: [
          'vp-doc',
          'VPDoc',
          'doc-content',
        ],
        
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
  }
  return config
})
