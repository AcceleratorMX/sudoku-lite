import{c as N,a as P,B as k,j as a}from"./index-HljpsB4r.js";import"./iframe-DWcw5Cki.js";import"./preload-helper-PPVm8Dsz.js";const r=S=>{const e=N.c(20);let s,t,n,i,o,c,d,l;e[0]!==S?({children:s,variant:i,size:o,disabled:c,type:d,className:l,onClick:t,...n}=S,e[0]=S,e[1]=s,e[2]=t,e[3]=n,e[4]=i,e[5]=o,e[6]=c,e[7]=d,e[8]=l):(s=e[1],t=e[2],n=e[3],i=e[4],o=e[5],c=e[6],d=e[7],l=e[8]);const A=i===void 0?"primary":i,D=o===void 0?"medium":o,z=c===void 0?!1:c,x=d===void 0?"button":d,B=l===void 0?"":l,C=k[A],j=k[D];let f;e[9]!==B||e[10]!==C||e[11]!==j?(f=P(k.button,C,j,B),e[9]=B,e[10]=C,e[11]=j,e[12]=f):f=e[12];const V=f;let h;return e[13]!==V||e[14]!==s||e[15]!==z||e[16]!==t||e[17]!==n||e[18]!==x?(h=a.jsx("button",{type:x,className:V,disabled:z,onClick:t,...n,children:s}),e[13]=V,e[14]=s,e[15]=z,e[16]=t,e[17]=n,e[18]=x,e[19]=h):h=e[19],h};r.__docgenInfo={description:`Button Component\r
\r
Reusable button with multiple variants and sizes.\r
\r
@param {React.ReactNode} children - Button content\r
@param {string} variant - Button style variant (primary, secondary, success, danger)\r
@param {string} size - Button size (small, medium, large)\r
@param {boolean} disabled - Whether button is disabled\r
@param {string} type - Button type (button, submit, reset)\r
@param {string} className - Additional CSS classes\r
@param {Function} onClick - Click handler`,methods:[],displayName:"Button",props:{variant:{defaultValue:{value:'"primary"',computed:!1},required:!1},size:{defaultValue:{value:'"medium"',computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1},type:{defaultValue:{value:'"button"',computed:!1},required:!1},className:{defaultValue:{value:'""',computed:!1},required:!1}}};const I={title:"Common/Button",component:r,tags:["autodocs"],parameters:{docs:{description:{component:"A reusable button component with multiple visual variants and sizes. Used throughout the application for actions like starting a game, navigating, and submitting forms."}}},argTypes:{variant:{control:{type:"select"},options:["primary","secondary","success","danger"],description:"Visual style variant of the button",table:{defaultValue:{summary:"primary"}}},size:{control:{type:"select"},options:["small","medium","large"],description:"Size of the button",table:{defaultValue:{summary:"medium"}}},disabled:{control:"boolean",description:"Whether the button is disabled",table:{defaultValue:{summary:!1}}},children:{control:"text",description:"Button label text"},onClick:{action:"clicked",description:"Click event handler"}}},m={args:{children:"Start Game",variant:"primary",size:"medium"}},u={args:{children:"Cancel",variant:"secondary",size:"medium"}},p={args:{children:"Save Progress",variant:"success",size:"medium"}},y={args:{children:"Exit Game",variant:"danger",size:"medium"}},v={args:{children:"Unavailable",variant:"primary",size:"medium",disabled:!0}},g={render:()=>a.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"center"},children:[a.jsx(r,{size:"small",variant:"primary",children:"Small"}),a.jsx(r,{size:"medium",variant:"primary",children:"Medium"}),a.jsx(r,{size:"large",variant:"primary",children:"Large"})]})},b={render:()=>a.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"center"},children:[a.jsx(r,{variant:"primary",children:"Primary"}),a.jsx(r,{variant:"secondary",children:"Secondary"}),a.jsx(r,{variant:"success",children:"Success"}),a.jsx(r,{variant:"danger",children:"Danger"})]})};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Start Game",
    variant: "primary",
    size: "medium"
  }
}`,...m.parameters?.docs?.source},description:{story:'Primary button — used for main actions like "Start Game" or "Play Again".',...m.parameters?.docs?.description}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Cancel",
    variant: "secondary",
    size: "medium"
  }
}`,...u.parameters?.docs?.source},description:{story:"Secondary button — used for alternative or less prominent actions.",...u.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Save Progress",
    variant: "success",
    size: "medium"
  }
}`,...p.parameters?.docs?.source},description:{story:'Success button — used for positive confirmations like "Save" or "Complete".',...p.parameters?.docs?.description}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Exit Game",
    variant: "danger",
    size: "medium"
  }
}`,...y.parameters?.docs?.source},description:{story:'Danger button — used for destructive actions like "Exit" or "Clear Data".',...y.parameters?.docs?.description}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Unavailable",
    variant: "primary",
    size: "medium",
    disabled: true
  }
}`,...v.parameters?.docs?.source},description:{story:"Disabled state — demonstrates the disabled appearance across variants.",...v.parameters?.docs?.description}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "12px",
    alignItems: "center"
  }}>\r
      <Button size="small" variant="primary">Small</Button>\r
      <Button size="medium" variant="primary">Medium</Button>\r
      <Button size="large" variant="primary">Large</Button>\r
    </div>
}`,...g.parameters?.docs?.source},description:{story:"All sizes — shows small, medium, and large button sizes side by side.",...g.parameters?.docs?.description}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "12px",
    alignItems: "center"
  }}>\r
      <Button variant="primary">Primary</Button>\r
      <Button variant="secondary">Secondary</Button>\r
      <Button variant="success">Success</Button>\r
      <Button variant="danger">Danger</Button>\r
    </div>
}`,...b.parameters?.docs?.source},description:{story:"All variants — shows every button variant side by side for comparison.",...b.parameters?.docs?.description}}};const R=["Primary","Secondary","Success","Danger","Disabled","AllSizes","AllVariants"];export{g as AllSizes,b as AllVariants,y as Danger,v as Disabled,m as Primary,u as Secondary,p as Success,R as __namedExportsOrder,I as default};
