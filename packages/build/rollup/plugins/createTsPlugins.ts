import { esbuildPlugin } from './esbuildPlugin'
import { replacePlugin } from './replacePlugin'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export const createTsPlugins = () => [
  nodeResolve(),
  esbuildPlugin,
  replacePlugin,
]
