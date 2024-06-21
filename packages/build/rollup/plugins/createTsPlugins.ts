import { esbuildPlugin } from './esbuildPlugin'
import { replacePlugin } from './replacePlugin'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export const createTsPlugins = () => [
  nodeResolve(),
  esbuildPlugin,
  commonjs(),
  replacePlugin,
]
