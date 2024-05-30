import type MarkdownIt from 'markdown-it'
import type { Token } from 'markdown-it'
import container, { type ContainerOpts } from 'markdown-it-container'
import fs from 'fs'
import path from 'path'
import { markdownSetupInject } from '@vunk-shared/vite/plugins'
import { globSync } from 'fast-glob'
import { relativeOfFile } from '@vunk-shared/node/path'

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
} 


export const demoContainerPlugin = async (
  md: MarkdownIt,
  options?: DemoContainerPluginSettings,
) => {
  const demoRoot = options?.root || path.resolve(process.cwd(), 'examples')

  const codeSourceTransform = options?.codeSourceTransform || ((code: string) => code)

  md.core.ruler.before(
    'normalize', 
    'add_demos_script', 
    (state) => {
      const currentMdPath: string = state.env.id
      if (!currentMdPath) return
      
      let componentId = path.basename(currentMdPath, '.md')
      
      if (
        componentId === '+Page'
        || componentId === 'index'
      ) { // 如果是入口文件, 取上一级目录名
        componentId = path.basename(path.dirname(state.env.id))
      }

      // 遍历 demo 目录，找到对应的组件目录下所有的 .vue 文件
      const vueFiles = globSync(`${componentId}/**/*.vue`, {
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

      const demoLeadings = process.env.ROLLUP_BUILD === 'production' 
        ? [
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
        )}" description="${encodeURIComponent(md.render(description))}"
          >
            <template #code>
              ${md.render('```vue\n' + source + '\n```')}
            </template>
          `
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
