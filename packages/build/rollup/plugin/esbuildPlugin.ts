import esbuild from 'rollup-plugin-esbuild'

export const esbuildPlugin = esbuild({
  target: 'esnext',
  tsconfigRaw: {
    compilerOptions: {
      experimentalDecorators: true,
      useDefineForClassFields: false,
    },
  },
})

