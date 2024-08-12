import{l as i}from"./chunk-8hXFf3E9.js";import{T as c}from"./chunk-BIbgiuQN.js";import{d as g,K as m,L as u,o as p,c as S,h as r,w as n,g as l,b as s}from"./chunk-DmNnn0to.js";import"./chunk-CJMEDYvw.js";const f={id:"loadStyleStringDemoNode","sk-flex":"row-center2"},h=g({__name:"basic",setup(_){class a extends c{color="red";get cssRule(){return`
    #loadStyleStringDemoNode{
      background: ${this.color};
    }
    `}constructor(e){super(),this.color=e}add(e){e&&(this.color=e),this.removeHandler=i(this.cssRule)}}const o=new a("red");return o.add(),m(()=>{o.remove()}),(d,e)=>{const t=u("el-button");return p(),S("div",f,[r(t,{onClick:e[0]||(e[0]=()=>s(o).toggle())},{default:n(()=>[l(" toggleLoadStyleStringDemoNodeBg ")]),_:1}),r(t,{onClick:e[1]||(e[1]=()=>s(o).reset("blue"))},{default:n(()=>[l(" blue ")]),_:1})])}}});export{h as default};
