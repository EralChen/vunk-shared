import{o as t,c as e,a as i,g as s,e as l,i as h,_ as n}from"../chunks/chunk-B086DW9f.js";import{u as k}from"../chunks/chunk-BIbgiuQN.js";import"../chunks/chunk-mSJOzi9A.js";const r={class:"vp-doc VPDoc doc-content"},p=i("h1",{id:"stripbase",tabindex:"-1"},[s("stripBase "),i("a",{class:"header-anchor",href:"#stripbase","aria-label":'Permalink to "stripBase"'},"​")],-1),d=i("h2",{id:"source",tabindex:"-1"},[s("Source "),i("a",{class:"header-anchor",href:"#source","aria-label":'Permalink to "Source"'},"​")],-1),o=i("div",{class:"language-ts"},[i("button",{class:"copy"}),i("span",{class:"lang"},"ts"),i("pre",{class:"shiki shiki-themes github-dark github-light vp-code",tabindex:"0"},[i("code",{"v-pre":""},[i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"import"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," { withTrailingSlash } "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"from"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}}," './withTrailingSlash'")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}},"/**")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," * 从路径中移除指定的基础路径。如果路径与基础路径完全相同，则返回根路径 '/'。")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," * 如果路径以基础路径开头，则移除基础路径及其后面的斜杠。")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," * 如果路径不以基础路径开头，则返回原始路径。")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," *")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," * "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"@param"),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}}," {string}"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," path"),i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," - 要处理的路径。")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," * "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"@param"),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}}," {string}"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," base"),i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," - 要移除的基础路径。")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," * "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"@returns"),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}}," {string}"),i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," 处理后的路径，可能已经移除了基础路径。")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," *")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," * "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"@example")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," * \\`\\`\\`javascript")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," * stripBase('/path/to/something', '/path/to'); // 返回 '/something'")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," * stripBase('/path/to', '/path/to'); // 返回 '/'")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," * stripBase('/other/path', '/path/to'); // 返回 '/other/path'")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," * \\`\\`\\`")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," */")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"export"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," function"),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}}," stripBase"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," ("),i("span",{style:{"--shiki-dark":"#FFAB70","--shiki-light":"#E36209"}},"path"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},":"),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}}," string"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},", "),i("span",{style:{"--shiki-dark":"#FFAB70","--shiki-light":"#E36209"}},"base"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},":"),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}}," string"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},")"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},":"),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}}," string"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"  if"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," (path "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"==="),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," base) {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"    return"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}}," '/'")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"  }")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"  const"),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}}," devBase"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," ="),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}}," withTrailingSlash"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"(base)")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"  return"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," path."),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}},"startsWith"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"(devBase) ")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"    ?"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," path."),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}},"slice"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"(devBase."),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}},"length"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," -"),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}}," 1"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},") ")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"    :"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," path")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"}")])])])],-1),g=i("p",null,"string/url/stripBase",-1),c=[p,d,o,g],y={__name:"+Page",setup(A,{expose:a}){return a({frontmatter:{}}),k(),(F,u)=>(t(),e("div",r,c))}},E=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"})),C=[{configName:"onRenderClient",importPath:"/renderer/onRenderClient.ts",isValueFile:!1,exportValue:l,exportName:"onRenderClient"},{configName:"onCreateApp",importPath:"/pages/+onCreateApp.ts",isValueFile:!0,exportValues:h},{configName:"Layout",importPath:"/src/layouts/default/index.vue",isValueFile:!1,exportValue:n,exportName:"default"},{configName:"Page",importPath:"/pages/zh-CN/string/url/stripBase/+Page.md",isValueFile:!0,exportValues:E}],_={onBeforeRenderEnv:{valueSerialized:"null",type:"computed",definedAtData:null},dataEnv:{valueSerialized:"null",type:"computed",definedAtData:null},hydrationCanBeAborted:{valueSerialized:"true",type:"classic",definedAtData:{filePathToShowToUser:"/renderer/+config.ts",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]}}};export{C as configValuesImported,_ as configValuesSerialized};
