import{o as t,c as e,a as i,g as s,e as l,i as h,_ as n}from"../chunks/chunk-CMGRsrPl.js";import{u as k}from"../chunks/chunk-BIbgiuQN.js";import"../chunks/chunk-HCS4kJPh.js";const r={class:"vp-doc VPDoc doc-content"},p=i("h1",{id:"parsecommentfromranges",tabindex:"-1"},[s("parseCommentFromRanges "),i("a",{class:"header-anchor",href:"#parsecommentfromranges","aria-label":'Permalink to "parseCommentFromRanges"'},"​")],-1),d=i("p",null,"解析 jsdoc 注释",-1),o=i("h2",{id:"source",tabindex:"-1"},[s("Source "),i("a",{class:"header-anchor",href:"#source","aria-label":'Permalink to "Source"'},"​")],-1),E=i("div",{class:"language-ts"},[i("button",{class:"copy"}),i("span",{class:"lang"},"ts"),i("pre",{class:"shiki shiki-themes github-dark github-light vp-code",tabindex:"0"},[i("code",{"v-pre":""},[i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"import"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," { CommentRange } "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"from"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}}," 'ts-morph'")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"import"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," { parse } "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"from"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}}," 'comment-parser'")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"import"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," { NormalObject } "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"from"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}}," '@vunk/shared'")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}},"/**")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," * parseCommentFromRanges ")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," * "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"@param"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," ranges"),i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," ")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," * "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"@returns"),i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," ")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#6A737D","--shiki-light":"#6A737D"}}," */")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"export"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," function"),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}}," parseCommentFromRanges"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," (")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#FFAB70","--shiki-light":"#E36209"}},"  ranges"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},":"),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}}," CommentRange"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"[],")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},")"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},":"),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}}," NormalObject"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"[] {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"  let"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," comment "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"="),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}}," ''")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"  for"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," ("),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"const"),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}}," range"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," of"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," ranges) {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"    const"),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}}," text"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," ="),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," range."),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}},"getText"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"()")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"    comment "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"+="),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," text")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"  }")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"  const"),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}}," commentItems"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," ="),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}}," parse"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"(comment)")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"  return"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," commentItems."),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}},"map"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"("),i("span",{style:{"--shiki-dark":"#FFAB70","--shiki-light":"#E36209"}},"item"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," =>"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"    const"),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}}," obj"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},":"),i("span",{style:{"--shiki-dark":"#B392F0","--shiki-light":"#6F42C1"}}," NormalObject"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," ="),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"      default: item.description,")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"    }")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"    for"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," ("),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"const"),i("span",{style:{"--shiki-dark":"#79B8FF","--shiki-light":"#005CC5"}}," tag"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," of"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," item.tags) {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"      obj[tag.tag] "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"="),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," tag.name "),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"+"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," (tag.description ")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"        ?"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}}," ' '"),i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}}," +"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}}," `${"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"tag"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}},"."),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"description"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}},"}`")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"        :"),i("span",{style:{"--shiki-dark":"#9ECBFF","--shiki-light":"#032F62"}}," ''"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},")")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"    }")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#F97583","--shiki-light":"#D73A49"}},"    return"),i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}}," obj")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"  })")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-dark":"#E1E4E8","--shiki-light":"#24292E"}},"}")])])])],-1),g=i("p",null,"typescript/morph/parseCommentFromRanges",-1),c=[p,d,o,E,g],y={__name:"+Page",setup(m,{expose:a}){return a({frontmatter:{}}),k(),(D,u)=>(t(),e("div",r,c))}},F=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"})),B=[{configName:"onRenderClient",importPath:"/renderer/onRenderClient.ts",isValueFile:!1,exportValue:l,exportName:"onRenderClient"},{configName:"onCreateApp",importPath:"/pages/+onCreateApp.ts",isValueFile:!0,exportValues:h},{configName:"Layout",importPath:"/src/layouts/default/index.vue",isValueFile:!1,exportValue:n,exportName:"default"},{configName:"Page",importPath:"/pages/zh-CN/typescript/morph/parseCommentFromRanges/+Page.md",isValueFile:!0,exportValues:F}],b={onBeforeRenderEnv:{valueSerialized:"null",type:"computed",definedAtData:null},dataEnv:{valueSerialized:"null",type:"computed",definedAtData:null},hydrationCanBeAborted:{valueSerialized:"true",type:"classic",definedAtData:{filePathToShowToUser:"/renderer/+config.ts",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]}}};export{B as configValuesImported,b as configValuesSerialized};
