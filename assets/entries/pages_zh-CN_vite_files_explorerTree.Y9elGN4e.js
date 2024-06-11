import{o as l,c as h,j as k,a as i,g as s,e as t,i as e,_ as n}from"../chunks/chunk-BwwYENSb.js";import{u as r}from"../chunks/chunk-BIbgiuQN.js";import"../chunks/chunk-HCS4kJPh.js";const p={class:"vp-doc VPDoc doc-content"},E=k('<h1 id="explorertree" tabindex="-1">explorerTree <a class="header-anchor" href="#explorertree" aria-label="Permalink to &quot;explorerTree&quot;">​</a></h1><p>获取文件目录树</p><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><h3 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-label="Permalink to &quot;配置&quot;">​</a></h3>',4),d=i("div",{class:"language-ts"},[i("button",{class:"copy"}),i("span",{class:"lang"},"ts"),i("pre",{class:"shiki shiki-themes github-dark github-light vp-code",tabindex:"0"},[i("code",{"v-pre":""},[i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}},"// vite.config.ts")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"import"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," { fileURLToPath, URL } "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"from"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}}," 'node:url'")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"import"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," { defineConfig } "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"from"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}}," 'vite'")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"import"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," vue "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"from"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}}," '@vitejs/plugin-vue'")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"import"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," { explorerTree } "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"from"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}}," '@vunk/shared/vite/files'")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}},"// https://vitejs.dev/config/")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"export"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," default"),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}}," defineConfig"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"({")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"  plugins: [")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}},"    vue"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"(),")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}},"    explorerTree"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"({")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"      root: "),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}},"fileURLToPath"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"("),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"new"),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}}," URL"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"("),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}},"'./src'"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},", "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"import"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"."),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}},"meta"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},".url)),")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"      ignore: [")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}},"        'assets'"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},", "),i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}},"// (or 'assets**') ignore assets folder and its contents")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}},"        // 'assets/**', ignore assets folder's contents only")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"      ]")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"    }),")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"  ]")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"})")])])])],-1),g=i("h3",{id:"类型定义",tabindex:"-1"},[s("类型定义 "),i("a",{class:"header-anchor",href:"#类型定义","aria-label":'Permalink to "类型定义"'},"​")],-1),y=i("div",{class:"language-ts"},[i("button",{class:"copy"}),i("span",{class:"lang"},"ts"),i("pre",{class:"shiki shiki-themes github-dark github-light vp-code",tabindex:"0"},[i("code",{"v-pre":""},[i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}},"// .d.ts, 可以写入到 env.d.ts 或者项目中的其他 .d.ts 文件中")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"declare"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," module"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}}," 'virtual:explorer*'"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"  import"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," type"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," { ExplorerTreeNode } "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"from"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}}," '@vunk/shared/types'")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"  const"),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}}," tree"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},":"),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}}," ExplorerTreeNode"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"[]")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"  export"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," default"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," tree")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"}")])])])],-1),o=i("h3",{id:"使用",tabindex:"-1"},[s("使用 "),i("a",{class:"header-anchor",href:"#使用","aria-label":'Permalink to "使用"'},"​")],-1),F=i("div",{class:"language-vue"},[i("button",{class:"copy"}),i("span",{class:"lang"},"vue"),i("pre",{class:"shiki shiki-themes github-dark github-light vp-code",tabindex:"0"},[i("code",{"v-pre":""},[i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"<"),i("span",{style:{"--shiki-dark":"#85E89D","--shiki-light":"#22863A"}},"script"),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}}," lang"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"="),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}},'"ts"'),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}}," setup"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"import"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," explorerTreeList "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"from"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}}," 'virtual:explorer'")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}},"// import componentsExplorer from 'virtual:explorer/components'")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"</"),i("span",{style:{"--shiki-dark":"#85E89D","--shiki-light":"#22863A"}},"script"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"<"),i("span",{style:{"--shiki-dark":"#85E89D","--shiki-light":"#22863A"}},"template"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"  <"),i("span",{style:{"--shiki-dark":"#85E89D","--shiki-light":"#22863A"}},"div"),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}}," class"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"="),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}},'"app-page-x"'),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"    <"),i("span",{style:{"--shiki-dark":"#85E89D","--shiki-light":"#22863A"}},"ul"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"      <"),i("span",{style:{"--shiki-dark":"#85E89D","--shiki-light":"#22863A"}},"li"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," v-for"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"="),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}},'"'),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"item "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"in"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," explorerTreeList"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}},'"'),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"        {{ item }}")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"      </"),i("span",{style:{"--shiki-dark":"#85E89D","--shiki-light":"#22863A"}},"li"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"    </"),i("span",{style:{"--shiki-dark":"#85E89D","--shiki-light":"#22863A"}},"ul"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"  </"),i("span",{style:{"--shiki-dark":"#85E89D","--shiki-light":"#22863A"}},"div"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"</"),i("span",{style:{"--shiki-dark":"#85E89D","--shiki-light":"#22863A"}},"template"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},">")])])])],-1),c=i("div",{class:"language-txt"},[i("button",{class:"copy"}),i("span",{class:"lang"},"txt"),i("pre",{class:"shiki shiki-themes github-dark github-light vp-code",tabindex:"0"},[i("code",{"v-pre":""},[i("span",{class:"line"},[i("span",null,'{ "filename": "App.vue", "id": "D:\\\\labCode\\\\vunk-shared-play\\\\src\\\\App.vue", "pid": "D:\\\\labCode\\\\vunk-shared-play\\\\src", "isDirectory": false, "label": "App" }')]),s(`
`),i("span",{class:"line"},[i("span",null,'{ "filename": "components", "id": "D:\\\\labCode\\\\vunk-shared-play\\\\src\\\\components", "pid": "D:\\\\labCode\\\\vunk-shared-play\\\\src", "isDirectory": true, "label": "components" }')]),s(`
`),i("span",{class:"line"},[i("span",null,'{ "filename": "main.ts", "id": "D:\\\\labCode\\\\vunk-shared-play\\\\src\\\\main.ts", "pid": "D:\\\\labCode\\\\vunk-shared-play\\\\src", "isDirectory": false, "label": "main" }')]),s(`
`),i("span",{class:"line"},[i("span",null,'{ "filename": "Page.md", "id": "D:\\\\labCode\\\\vunk-shared-play\\\\src\\\\components\\\\Page.md", "pid": "D:\\\\labCode\\\\vunk-shared-play\\\\src\\\\components", "isDirectory": false, "label": "Page" }')])])])],-1),A=i("h2",{id:"source",tabindex:"-1"},[s("Source "),i("a",{class:"header-anchor",href:"#source","aria-label":'Permalink to "Source"'},"​")],-1),D=i("div",{class:"language-ts"},[i("button",{class:"copy"}),i("span",{class:"lang"},"ts"),i("pre",{class:"shiki shiki-themes github-dark github-light vp-code",tabindex:"0"},[i("code",{"v-pre":""},[i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"import"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," type"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," { Plugin } "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"from"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}}," 'vite'")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"import"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," path "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"from"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}}," 'path'")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"import"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," { readdirAsFlattenedTree, DirFlattenedTreeNode } "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"from"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}}," '@vunk-shared/node/fs'")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"export"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," interface"),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}}," ExplorerTreeNode"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," extends"),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}}," DirFlattenedTreeNode"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}},"  /**")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}},"   * file basename")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}},"   */")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#FFAB70","--shiki-light":"#E36209"}},"  label"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},":"),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}}," string")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"}")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"export"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," interface"),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}}," ExplorerTreeSettings"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#FFAB70","--shiki-light":"#E36209"}},"  root"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"?:"),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}}," string")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#FFAB70","--shiki-light":"#E36209"}},"  ignore"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"?:"),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}}," string"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"[]")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"}")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}},"/**")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," * 获取文件目录树")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," * "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"@param"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," settings"),i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," ")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," * "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"@param"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," settings.root"),i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," - root directory")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," * "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"@param"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," settings.ignore"),i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," - ignore files")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," * "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"@returns"),i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," ")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," * ")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," * "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"@example")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," * \\`\\`\\`ts")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," import explorerTreeList from 'virtual:explorer/packages'")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}},"  console.log(explorerTreeList)")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," * \\`\\`\\`")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," */")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"export"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," function"),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}}," explorerTree"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," (")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#FFAB70","--shiki-light":"#E36209"}},"  settings"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"?:"),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}}," ExplorerTreeSettings"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},",")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},") {")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"  const"),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}}," root"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," ="),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," settings?.root "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"||"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," process."),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}},"cwd"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"()")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"  const"),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}}," ignore"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," ="),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," settings?.ignore "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"||"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," []")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"  ")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"  const"),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}}," virtualModulePre"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," ="),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}}," 'virtual:explorer'")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"  ")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"  return"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"    name: "),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}},"'vite-plugin-explorer-tree'"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},",")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}},"    resolveId"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," ("),i("span",{style:{"--shiki-dark":"#FFAB70","--shiki-light":"#E36209"}},"id"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},") {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"      if"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," (id."),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}},"startsWith"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"(virtualModulePre)) {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"        return"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}}," '"),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}},"\\0"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}},"'"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," +"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," id")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"      }")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"    },")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}},"    load"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," ("),i("span",{style:{"--shiki-dark":"#FFAB70","--shiki-light":"#E36209"}},"id"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},") {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"      if"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," (id."),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}},"startsWith"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"("),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}},"'"),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}},"\\0"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}},"'"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," +"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," virtualModulePre)) {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}},"        // +2 to remove '/' and '\\0'")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"        const"),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}}," url"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," ="),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," id."),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}},"slice"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"(virtualModulePre."),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}},"length"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," +"),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}}," 2"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},")")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"        const"),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}}," rootdir"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," ="),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," path."),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}},"resolve"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"(root, url)")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"        const"),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}}," tree"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," ="),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}}," readdirAsFlattenedTree"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"(rootdir, {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"          ignore: ignore,")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"        })."),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}},"map"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"("),i("span",{style:{"--shiki-dark":"#FFAB70","--shiki-light":"#E36209"}},"item"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," =>"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"          return"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"            ..."),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"item,")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}},"            // 去掉文件后缀")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"            label: item.filename."),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}},"replace"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"("),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}},"/"),i("span",{style:{"--shiki-dark":"#85E89D","--shiki-light":"#22863A","--shiki-dark-font-weight":"bold","--shiki-light-font-weight":"bold"}},"\\."),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}},"["),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"^"),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}},"/.]"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"+$"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}},"/"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},", "),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}},"''"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"),")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"          } "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"as"),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}}," ExplorerTreeNode")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"        })")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"        return"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}}," `export default ${"),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}},"JSON"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}},"."),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}},"stringify"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}},"("),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"tree"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}},")"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}},"}`")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"      }")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"    },")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"  } "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"as"),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}}," Plugin")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"}")])])])],-1),u=i("p",null,"vite/files/explorerTree",-1),C=[E,d,g,y,o,F,c,A,D,u],m={__name:"+Page",setup(f,{expose:a}){return a({frontmatter:{}}),r(),(x,b)=>(l(),h("div",p,C))}},B=Object.freeze(Object.defineProperty({__proto__:null,default:m},Symbol.toStringTag,{value:"Module"})),N=[{configName:"onRenderClient",importPath:"/renderer/onRenderClient.ts",isValueFile:!1,exportValue:t,exportName:"onRenderClient"},{configName:"onCreateApp",importPath:"/pages/+onCreateApp.ts",isValueFile:!0,exportValues:e},{configName:"Layout",importPath:"/src/layouts/default/index.vue",isValueFile:!1,exportValue:n,exportName:"default"},{configName:"Page",importPath:"/pages/zh-CN/vite/files/explorerTree/+Page.md",isValueFile:!0,exportValues:B}],S={onBeforeRenderEnv:{valueSerialized:"null",type:"computed",definedAtData:null},dataEnv:{valueSerialized:"null",type:"computed",definedAtData:null},hydrationCanBeAborted:{valueSerialized:"true",type:"classic",definedAtData:{filePathToShowToUser:"/renderer/+config.ts",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]}}};export{N as configValuesImported,S as configValuesSerialized};
