import{l as i}from"./chunk-8hXFf3E9.js";import{T as c}from"./chunk-BIbgiuQN.js";import{d as g,J as m,K as u,o as p,c as f,f as r,w as n,g as l,b as s}from"./chunk-CMGRsrPl.js";import"./chunk-HCS4kJPh.js";const S={id:"loadStyleStringDemoNode","sk-flex":"row-center2"},C=g({__name:"basic",setup(_){class a extends c{color="red";get cssRule(){return`
    #loadStyleStringDemoNode{
      background: ${this.color};
    }
    `}constructor(e){super(),this.color=e}add(e){e&&(this.color=e),this.removeHandler=i(this.cssRule)}}const o=new a("red");return o.add(),m(()=>{o.remove()}),(d,e)=>{const t=u("el-button");return p(),f("div",S,[r(t,{onClick:e[0]||(e[0]=()=>s(o).toggle())},{default:n(()=>[l(" toggleLoadStyleStringDemoNodeBg ")]),_:1}),r(t,{onClick:e[1]||(e[1]=()=>s(o).reset("blue"))},{default:n(()=>[l(" blue ")]),_:1})])}}});export{C as default};
