<script lang="ts" setup>
import { nextTick, onMounted } from 'vue'
import docsearch from '@docsearch/js'
import { useLang } from '@vunk-shared/vike'
import { locales } from './algolia'

const lang = useLang()

type DocSearchProps = Parameters<typeof docsearch>[0]

onMounted(update)


onMounted(() => {
  docsearch({
    apiKey: import.meta.env.VITE_ALGOLIA_SEARCH_KEY,
    indexName: import.meta.env.VITE_ALGOLIA_INDEX_NAME,
    appId: import.meta.env.VITE_ALGOLIA_APP_ID,
    container: '#docsearch',


    transformItems (items) {
      return items.map((item) => {
        return Object.assign({}, item, {
          url: getRelativePath(item.url),
        })
      })
    },

    hitComponent ({ hit, children }) {
      return {
        __v: null,
        type: 'a',
        ref: undefined,
        constructor: undefined,
        key: undefined,
        props: { href: hit.url, children },
      } as never
    },
  })
})

async function update () {
  await nextTick()
  const options = {
    ...locales?.[lang],
  }

  const facetFilters = [
    `lang:${lang}`,
  ]


  initialize({
    ...options,
    searchParameters: {
      ...options.searchParameters,
      facetFilters,
    },
  })
  
}


function initialize (userOptions: Partial<DocSearchProps>) {
  const internalOptions = {
    apiKey: import.meta.env.VITE_ALGOLIA_SEARCH_KEY,
    indexName: import.meta.env.VITE_ALGOLIA_INDEX_NAME,
    appId: import.meta.env.VITE_ALGOLIA_APP_ID,
    container: '#docsearch',
    transformItems (items) {
      return items.map((item) => {
        return Object.assign({}, item, {
          url: getRelativePath(item.url),
        })
      })
    },
    hitComponent ({ hit, children }) {
      return {
        __v: null,
        type: 'a',
        ref: undefined,
        constructor: undefined,
        key: undefined,
        props: { href: hit.url, children },
      } as never
    },
  } satisfies DocSearchProps

  const options = {
    ...internalOptions,
    ...userOptions,
  }

  docsearch(options)
}

function getRelativePath (url: string) {
  const { pathname, hash } = new URL(url, location.origin)
  return pathname.replace(/\.html$/, '') + hash
}

</script>
<template>
  <div id="docsearch" />
</template>
<style>
.DocSearch-Hit-icon {
  display: flex;
}
.DocSearch-Logo a {
  align-items: center;
}
.DocSearch-Hit > a{
  padding-top: var(--gap-xxs);
  padding-bottom: var(--gap-xxs);
}
.DocSearch-Hit {

  padding-bottom: var(--gap-xxs);
}
</style>