import replace from '@rollup/plugin-replace'
import type { Plugin } from 'rollup'

export const replacePlugin = replace({
  preventAssignment: true,
  values: {
    'process.env.ROLLUP_BUILD': 'true',
  },
}) as Plugin


