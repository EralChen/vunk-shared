
/**
 * @example
 * ```ts
 * unocss({
 *  theme: {
 *   colors: { ...elThemeColors }
 * })
 * ```
 */
export const elThemeColors = {
  primary: 'var(--el-color-primary)',
  success: 'var(--el-color-success)',
  warning: 'var(--el-color-warning)',
  danger: 'var(--el-color-danger)',
  info: 'var(--el-color-info)',

  white: 'var(--el-color-white)',
  black: 'var(--el-color-black)',

  

  text: {
    primary: 'var(--el-text-color-primary)',
    secondary: 'var(--el-text-color-secondary)',
    tertiary: 'var(--el-text-color-tertiary)',
    placeholder: 'var(--el-text-color-placeholder)',
    disabled: 'var(--el-text-color-disabled)',
  },


  border: {
    base: 'var(--el-border-color)',
    light: 'var(--el-border-color-light)',
    lighter: 'var(--el-border-color-lighter)',
    extraLight: 'var(--el-border-color-extra-light)',
    dark: 'var(--el-border-color-dark)',
    darker: 'var(--el-border-color-darker)',
  },


  fill: {
    base: 'var(--el-fill-color)',
    light: 'var(--el-fill-color-light)',
    lighter: 'var(--el-fill-color-lighter)',
    extraLight: 'var(--el-fill-color-extra-light)',
    dark: 'var(--el-fill-color-dark)',
    darker: 'var(--el-fill-color-darker)',
    blank: 'var(--el-fill-color-blank)',
  },

  bg: {
    base: 'var(--el-bg-color)',
    page: 'var(--el-bg-color-page)',
    overlay: 'var(--el-bg-color-overlay)',
  },
 

}