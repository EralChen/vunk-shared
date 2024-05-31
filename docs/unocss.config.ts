import { defineConfig } from 'unocss'
import { createUnocssSettings } from '@vunk-shared/vite/unocss'

const settings = createUnocssSettings({
  presetFlexPrefix: 'sk',
  presetGapPrefix: 'g',
})

export default defineConfig(settings)
