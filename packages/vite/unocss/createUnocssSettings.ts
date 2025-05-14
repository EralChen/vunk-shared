import type { UserConfig } from 'unocss'
import { presetAttributify, presetWind4 } from 'unocss'
import { presetFlex, presetFont, presetGap } from 'unocss-preset-vunk'
import { elThemeColors } from './elThemeColors'
import { fontTheme } from './fontTheme'
import { gapTheme } from './gapTheme'

export interface CreateUnocssSettingsOptions {
  presetFontTheme?: Record<string, string>
  presetGapTheme?: Record<string, string>
  /**
   * @default 'g'
   * @example
   * class="gmt-m"
   */
  presetGapPrefix?: string
  /**
   * @default 'sk'
   * @example
   * class="sk-flex"
   */
  presetFlexPrefix?: string
}

export function createUnocssSettings (
  options?: CreateUnocssSettingsOptions,
) {
  const presetFontTheme = options?.presetFontTheme
  const presetGapTheme = options?.presetGapTheme
  const presetGapPrefix = options?.presetGapPrefix ?? 'g'
  const presetFlexPrefix = options?.presetFlexPrefix ?? 'sk'

  return {
    presets: [
      presetAttributify(),
      presetWind4(),
      presetFont({
        theme: {
          ...fontTheme,
          ...presetFontTheme,
        },
      }),
      presetFlex({
        prefix: presetFlexPrefix,
      }),
      presetGap({
        prefix: presetGapPrefix,
        theme: {
          ...gapTheme,
          ...presetGapTheme,
        },
      }),
    ],
    theme: {
      colors: {
        ...elThemeColors,
      },
    },
  } as UserConfig
}
