import esbuild from 'rollup-plugin-esbuild'

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

