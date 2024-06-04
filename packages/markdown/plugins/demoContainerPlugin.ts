import type MarkdownIt from 'markdown-it'
import type { Token } from 'markdown-it'
import container, { type ContainerOpts } from 'markdown-it-container'
import fs from 'fs'
import path from 'path'
import { markdownSetupInject } from '@vunk-shared/vite/markdown'
import { globSync } from 'fast-glob'
import { relativeOfFile } from '@vunk-shared/node/path'
import type { MarkdownEnv } from 'vitepress'
import { isCallable } from '@vunk-shared/function'

export interface DemoContainerPluginSettings {
  /**
   * @description
   * 示例代码根目录
   */
  root: string

  /**
   * @description
   * 源码转换函数
   */
  codeSourceTransform?: (code: string) => string

  /**
   * @description
   * 示例代码文件匹配规则
   */
  globSource?: string | ((env: MarkdownEnv & {
    id: string
  }) => string)
} 


const defaultGlobSource = (env: MarkdownEnv & {
  id: string
}) => {
  const currentMdPath: string = env.id
  let componentId = path.basename(currentMdPath, '.md')
  if (
    componentId === '+Page'
    || componentId === 'index'
  ) { // 如果是入口文件, 取上一级目录名
    componentId = path.basename(path.dirname(currentMdPath))
  }
  return `${componentId}/**/*.vue`
}

export const demoContainerPlugin = async (
  md: MarkdownIt,
  options?: DemoContainerPluginSettings,
) => {
  const demoRoot = options?.root || path.resolve(process.cwd(), 'examples')

  const globSource = options?.globSource || defaultGlobSource

  const codeSourceTransform = options?.codeSourceTransform || ((code: string) => code)

  md.core.ruler.before(
    'normalize', 
    'add_demos_script', 
    (state) => {
      const currentMdPath: string = state.env.id
      if (!currentMdPath) return
      if (state.env.__vunk_noMarkdownSetupInject) return

      const globSourceStr = isCallable(globSource) 
        ? globSource(state.env) 
        : globSource

      // 遍历 demo 目录，找到对应的组件目录下所有的 .vue 文件
      const vueFiles = globSync(globSourceStr, {
        cwd: demoRoot,
        absolute: true,
      })

      const rawDemos = vueFiles.map(filepath => {
        return {
          // filepath 相对 demoRoot 的路径
          key: path
            .relative(demoRoot, filepath)
            .replace(/\\/g, '/'),
          // 导入 vue 文件， file path 相对 state.env.id 的路径 
          value: `defineAsyncComponent(() => import('${relativeOfFile(currentMdPath, filepath)
            .replace(/\\/g, '/')
          }'))`,
        }
      })

      const demoLeadings = process.env.ROLLUP_BUILD ? [
        `import { DemoContainer } from '@vunk/shared/markdown/components/DemoContainer'`,
        `import '@vunk/shared/markdown/components/DemoContainer/index.css'`,
      ] 
        : [
          `import { DemoContainer } from '@vunk-shared/markdown/components/DemoContainer'`,
        ]

      const mdSetupInject = markdownSetupInject({
        leadingCode: [
          `import { defineAsyncComponent } from 'vue'`,
          ...demoLeadings,
        ],
        trailingCode: [
          'const demos = {',
          ...rawDemos.map(raw => `'${raw.key}': ${raw.value},`),
          '}',
        ],
      })

      state.src = mdSetupInject.transform(
        state.src, currentMdPath,
      )
    },
  )

  md.use(container, 'demo', {
    validate (params: string) {
      return !!params.trim().match(/^demo\s*(.*)$/)
    }, 

    render (tokens: Token[], idx: number) {
          
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
      if (tokens[idx].nesting === 1 /* means the tag is opening */) {
        const description = m && m.length > 1 ? m[1] : ''
        const sourceFileToken = tokens[idx + 2]
        let source = ''
        const sourceFile = sourceFileToken.children?.[0].content ?? ''
      
        if (sourceFileToken.type === 'inline') {
          source = readCodeInfo(sourceFile)?.code || ''
        }
        if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)
  
  
    
        let tabsTokenIndex = idx + 2
        while (!['blockquote_open', 'container_demo_close'].includes(tokens[tabsTokenIndex].type)) {
          tabsTokenIndex++
        }
        let tabsToken = tokens[tabsTokenIndex]
        const tabsSource: Record<string, string> = {}
        if (
          tabsToken?.type === 'blockquote_open' 
            && tabsToken.nesting === 1
        ) {
          tabsToken = tokens[tabsTokenIndex + 4]
                    
          if (tabsToken.type === 'inline') {
            const subsRE = /^subs\s*\[(.+)\]/
            const m = tabsToken.content.match(subsRE)
            const content = m && m.length > 1 ? m[1] : ''
          
            content && content.split(',').forEach(item => {
              item = item.trim()
              tabsSource[item] = genMdSource(item)
            })
          }
    
        }
        /* end of tabs add  */
  
        return `<DemoContainer subsources="${
          encodeURIComponent(JSON.stringify(tabsSource))
        }" :demos="demos" source="${
          encodeURIComponent(
            md.render('```vue\n' + source + '\n```'),
          )
        }"  path="${sourceFile}" raw-source="${encodeURIComponent(
          source,
        )}" description="${
          encodeURIComponent(md.render(description))
        }">`
      } else {
        return '</DemoContainer>'
      }
    },
    
  } as ContainerOpts)
  

  function genMdSource (filename: string) {
    const info = readCodeInfo(filename)
    if (!info) return ''
    return md.render('```' + info.suffix + '\n' + info.code + '\n```')
  }


  function readCodeInfo (
    filename: string,
  ) {
    const suffix = [ 'vue', 'ts' ]
    const fileIndex = suffix
      .map(sfx => path.resolve(demoRoot, `${filename}.${sfx}`))
      .findIndex(item => fs.existsSync(item))
      
    if (fileIndex === -1) return 
    const code = codeSourceTransform(
      fs.readFileSync(
        path.resolve(
          demoRoot, 
          `${filename}.${suffix[fileIndex]}`,
        ),
        'utf-8',
      ),
    )

    return {
      code,
      suffix: suffix[fileIndex],
    }
  }
  
}
