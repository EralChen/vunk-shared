import type MarkdownIt from 'markdown-it'
import type { Token } from 'markdown-it'
import container from 'markdown-it-container'
import fs from 'fs'
import path from 'path'
import { fixPath } from '@lib-env/build-utils'


export const demoContainerPlugin = (
  md: MarkdownIt,
  options = {
    root: process.cwd(),
  },
) => {
  const appRoot = options.root

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
          source = fixPath(
            fs.readFileSync(
              path.resolve(appRoot, 'examples', `${sourceFile}.vue`),
              'utf-8',
            ),
          ) 
        }
        if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)
  
  
        /* tabs add */
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
            const tabsRE = /^tabs\s*\[(.+)\]/
            const m = tabsToken.content.match(tabsRE)
            const content = m && m.length > 1 ? m[1] : ''
          
            content && content.split(',').forEach(item => {
              item = item.trim()
              tabsSource[item] = genCodeSource(item)
            })
          }
    
        }
        /* end of tabs add  */
  
        return `<Demo raw-tabs-source="${
          encodeURIComponent(JSON.stringify(tabsSource))
        }" :demos="demos" source="${
          encodeURIComponent(
            md.render('```vue\n' + source + '\n```'),
          )
        }"  path="${sourceFile}" raw-source="${encodeURIComponent(
          source,
        )}" description="${encodeURIComponent(md.render(description))}"
          >`
      } else {
        return '</Demo>'
      }
    },
  })
  
  
  const genCodeSource = (
    filename: string, 
    exPath = path.resolve(appRoot, 'examples'),
  ) => {
    const suffix = [ 'vue', 'ts' ]
    const files = suffix.map(
      sfx => path.resolve(exPath, `${filename}.${sfx}`),
    )
      
    const fileIndex = files.findIndex(item => fs.existsSync(item))
    if (fileIndex === -1) return ''
    return md.render(
      '```' + suffix[fileIndex] + '\n' 
        + fixPath(
          fs.readFileSync(
            path.resolve(
              appRoot, 'examples', 
              `${files[fileIndex]}`,
            ),
            'utf-8',
          ),
        )
        + '\n```',
    )
  }
  
}
