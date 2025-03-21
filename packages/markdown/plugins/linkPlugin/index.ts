

import type MarkdownIt from 'markdown-it'
import {
  externalUrlRE,
} from '@vunk-shared/regexp'
import { MarkdownEnv } from 'vitepress'



const indexRE = /(^|.*\/)index.md(#?.*)$/i


/**
 *  markdown-it plugin for:
1. adding target="_blank" to external links
2. normalize internal links to end with `.html`
3. for vike page +Page link resolve
 * @param md  markdown-it instance
 * @param externalAttrs  external link attributes
 * @param base  base url
 * 
 * @example 
 * 
 * ```ts
  
 * ```
 */
export const linkPlugin = (
  md: MarkdownIt,
  externalAttrs: Record<string, string>,
  settings?: {
    base: string
    cleanUrls: boolean
  },
) => {

  const base = settings?.base || '/'
  const cleanUrls = settings?.cleanUrls || true

  md.renderer.rules.link_open = (
    tokens,
    idx,
    options,
    env: MarkdownEnv & { id: string },
    self,
  ) => {
    const token = tokens[idx]
    const hrefIndex = token.attrIndex('href')

   

    if (hrefIndex >= 0) {

      const hrefAttr = token.attrs![hrefIndex]
      const url = hrefAttr[1]


      /* for vike page +Page */
      const filePath = new URL(url, 'http://a.com').pathname
      const fileBasename = filePath.split('/').pop()
        ?.replace('.md', '') || ''

      const isEntry = fileBasename === '+Page'
      // for vikepage 
      //  ../map-view/+Page.md#mapview-slots 
      //  => ./map-view#mapview-slots
      if (isEntry && hrefAttr[1].startsWith('../')) {
        hrefAttr[1] = hrefAttr[1]
          .replace('../', './')
          .replace('/+Page', '')
      } 
      
      /* end of  for vike page +Page */

      if (externalUrlRE.test(url)) {
        Object.entries(externalAttrs).forEach(([key, val]) => {
          token.attrSet(key, val)
        })
        // catch localhost links as dead link
        if (url.replace(externalUrlRE, '').startsWith('//localhost:')) {
          pushLink(url, env)
        }
        hrefAttr[1] = url
      } else {
        const { protocol } = new URL(url, 'http://a.com')

        if (
          // skip internal anchor links
          !url.startsWith('#') &&
          // skip mail/custom protocol links
          protocol.startsWith('http')
          // skip links to files (other than html/md)
          // && treatAsHtml(pathname)
        ) {
          normalizeHref(hrefAttr, env)
        } else if (url.startsWith('#')) {
          hrefAttr[1] = decodeURI(hrefAttr[1])
        }

        // append base to internal (non-relative) urls
        if (hrefAttr[1].startsWith('/')) {
          hrefAttr[1] = `${base}${hrefAttr[1]}`.replace(/\/+/g, '/')
        }
      }
    }
    return self.renderToken(tokens, idx, options)
  }

  function normalizeHref (hrefAttr: [string, string], env:
     MarkdownEnv) {
    let url = hrefAttr[1]

    const indexMatch = url.match(indexRE)
    if (indexMatch) {
      const [, path, hash] = indexMatch
      url = path + hash
    } else {
      let cleanUrl = url.replace(/[?#].*$/, '')
      // transform foo.md -> foo[.html]
      if (cleanUrl.endsWith('.md')) {
        cleanUrl = cleanUrl.replace(/\.md$/, cleanUrls ? '' : '.html')
      }
      // transform ./foo -> ./foo[.html]
      if (
        !cleanUrls &&
        !cleanUrl.endsWith('.html') &&
        !cleanUrl.endsWith('/')
      ) {
        cleanUrl += ''
      }
      const parsed = new URL(url, 'http://a.com')
      url = cleanUrl + parsed.search + parsed.hash
    }

    // ensure leading . for relative paths
    if (!url.startsWith('/') && !/^\.\//.test(url)) {
      url = './' + url
    }

    // export it for existence check
    pushLink(url.replace(/\.html$/, ''), env)

    // markdown-it encodes the uri
    hrefAttr[1] = decodeURI(url)
  }

  function pushLink (link: string, env: MarkdownEnv) {
    const links = env.links || (env.links = [])
    links.push(link)
  }
}
