import { NormalObject } from '@vunk-shared/types'
import _esbuild from 'rollup-plugin-esbuild'


const esbuild: typeof _esbuild = (_esbuild as NormalObject).default ?? _esbuild

export const esbuildPlugin = esbuild({
  target: 'esnext',
  jsx: 'preserve',
  tsconfigRaw: {
    compilerOptions: {
      experimentalDecorators: true,
      useDefineForClassFields: false,
    },
  },
})

