import{d as f,o as a,c as h,h as n,w as u,l as m,m as V,n as x,p as L,q as H,b as e,V as k,s as d,a as l,r as S,F as I,v as q,E as M,x as O,y as P,z,A as B,B as R,C as w,D as j,G as b,H as C,T as U,I as A,t as N}from"./chunk-hHCmjxmj.js";/* empty css              *//* empty css              *//* empty css              */const F={class:"vunk-shared-demo-example-showcase"},G=f({__name:"DemoContainerExample",props:{file:{type:String,required:!0},demo:{type:Object,required:!0}},setup(r){return(t,c)=>(a(),h("div",F,[n(e(k),null,{default:u(()=>[r.demo?(a(),m(V(r.demo),x(L({key:0},t.$attrs)),null,16)):H("",!0)]),_:1})]))}}),K={class:"vunk-shared-demo-code"},J=["innerHTML"],Q=f({__name:"DemoContainerCode",props:{source:{type:String,required:!0}},setup(r){const t=r,c=d(()=>decodeURIComponent(t.source));return(_,p)=>(a(),h("div",K,[l("div",{innerHTML:c.value},null,8,J)]))}}),W={class:"vunk-shared-demo-codes"},X=["innerHTML"],Y=f({__name:"DemoContainerCodes",props:{data:{type:Array,required:!0}},setup(r){const c=S(r.data[0].path);return(_,p)=>(a(),h("div",W,[n(e(O),{modelValue:c.value,"onUpdate:modelValue":p[0]||(p[0]=s=>c.value=s),type:"border-card"},{default:u(()=>[(a(!0),h(I,null,q(r.data,s=>(a(),m(e(M),{key:s.path,name:s.path,label:s.path},{default:u(()=>[l("div",{innerHTML:s.source},null,8,X)]),_:2},1032,["name","label"]))),128))]),_:1},8,["modelValue"])]))}}),Z={},ee={viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"};function te(r,t){return a(),h("svg",ee,t[0]||(t[0]=[l("path",{fill:"currentColor",d:"m23 12l-7.071 7.071l-1.414-1.414L20.172 12l-5.657-5.657l1.414-1.414zM3.828 12l5.657 5.657l-1.414 1.414L1 12l7.071-7.071l1.414 1.414z"},null,-1)]))}const oe=P(Z,[["render",te]]),se={demos:{type:Object,required:!0},path:{type:String,required:!0},source:{type:String,required:!0},rawSource:{type:String,default:""},subsources:{type:String,default:"{}"},description:{type:String,default:""}},ne=["innerHTML"],re={class:"vunk-shared-demo-container"},ae={class:"vunk-shared-demo-op-btns"},ue=["aria-label"],pe=f({__name:"DemoContainer",props:se,setup(r){const t=r,c=d(()=>t.path.split("/")[0]+"/"),_=d(()=>{const o=decodeURIComponent(t.subsources);return JSON.parse(o)}),p=d(()=>[{path:t.path.replace(c.value,""),source:decodeURIComponent(t.source)},...Object.keys(_.value).map(o=>({path:o.replace(c.value,""),source:_.value[o]}))]),[s,y]=z(),g=S(),E=d(()=>{const o={};return Object.keys(t.demos).forEach(i=>{o[i.replace(".vue","")]=t.demos[i]}),o}),v=d(()=>({"view-source":"View source","hide-source":"Hide source","edit-in-editor":"Edit in Playground","edit-on-github":"Edit on GitHub","edit-in-codepen":"Edit in Codepen.io","copy-code":"Copy code","switch-button-option-text":"Switch to Options API","switch-button-setup-text":"Switch to Composition API","copy-success":"Copied!","copy-error":"This browser does not support automatic copy！"})),T=d(()=>decodeURIComponent(t.description)),D=o=>{["Enter","Space"].includes(o.code)&&(o.preventDefault(),y(!1),g.value?.focus())};return(o,i)=>(a(),m(e(k),null,{default:u(()=>[l("p",{innerHTML:T.value},null,8,ne),l("div",re,[n(G,{file:o.path,demo:E.value[o.path]},null,8,["file","demo"]),n(e(B),{class:"m-0"}),l("div",ae,[n(e(R),{content:v.value["view-source"],"show-arrow":!1,trigger:["hover","focus"],"trigger-keys":[]},{default:u(()=>[l("button",{ref_key:"sourceCodeRef",ref:g,"aria-label":e(s)?v.value["hide-source"]:v.value["view-source"],class:"reset-btn el-icon vunk-shared-demo-op-btn",onClick:i[0]||(i[0]=$=>e(y)())},[n(e(w),{size:16},{default:u(()=>[n(oe)]),_:1})],8,ue)]),_:1},8,["content"])]),n(e(j),null,{default:u(()=>[p.value.length>1?b((a(),m(Y,{key:0,data:p.value},null,8,["data"])),[[C,e(s)]]):b((a(),m(Q,{key:1,source:o.source},null,8,["source"])),[[C,e(s)]])]),_:1}),n(U,{name:"el-fade-in-linear"},{default:u(()=>[b(l("div",{class:"vunk-shared-demo-float-control",tabindex:"0",role:"button",onClick:i[1]||(i[1]=$=>e(y)(!1)),onKeydown:D},[n(e(w),{size:16},{default:u(()=>[n(e(A))]),_:1}),l("span",null,N(v.value["hide-source"]),1)],544),[[C,e(s)]])]),_:1})])]),_:1}))}});export{pe as _};
