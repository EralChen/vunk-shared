

export const props = {
  /**
   * 组件示例合集
   *  - key: filepath 相对 demoRoot 的路径
   *  - value: 示例对象
   * @link https://github.com/element-plus/element-plus/blob/dev/docs/.vitepress/vitepress/components/vp-demo.vue
   */
  demos: {
    type: Object,
    required: true as const,
  },

  /**
   * 当前示例的路径 （省略后缀名）
   */
  path: {
    type: String,
    required: true as const,
  },

  /**
   * md.render 后的组件代码
   */
  source: {
    type: String,
    required: true as const,
  },

  /**
   * 组件源码
   */
  rawSource: {
    type: String,
    default: '',
  },

  /**
   * jsonstring 
   *  - key: filepath 相对 demoRoot 的路径
   *  - value: 对应的 md.render 后的文件代码
   */
  subsources: {
    type: String,
    default: '{}',
  },

  /**
   * @description 示例描述（md.render）
   */
  description: {
    type: String,
    default: '',
  },
}