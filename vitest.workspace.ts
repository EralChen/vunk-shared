import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  {
    test: {
      name: 'unit',
      include: [
        '**/__tests__/*.{test,spec}.{js,ts,tsx,jsx}',
        '**/__tests__/**/*.unit.{test,spec}.{js,ts,tsx,jsx}',
      ],
      environment: 'node',
    },
  },
])
