import { mergeImport } from '@lib-env/shared'
import { LIB_NAME, LIB_ALIAS } from '@lib-env/build-constants'

export const fixPath = (id: string) => id.replaceAll(`${LIB_ALIAS}`, LIB_NAME)


/**
 * 还原别名
 * @param source 
 * @returns 
 */
export const fixSourceCodeImport = (source: string) => {
  const componentRe = new RegExp(`import(.+)from\\s['"]${LIB_NAME.replace('/', '\\/')}\\/components\\/(.+)['"]`, 'g')
  source = source
    .replace(
      componentRe, 
      function (a, p1){
        return `import${p1}from '${LIB_NAME}'`
      },
    )
  source = mergeImport(source)
  return source
}
