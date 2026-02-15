import{c as q,a as _,C as s,j as u}from"./index-HljpsB4r.js";import{r as H}from"./iframe-DWcw5Cki.js";import"./preload-helper-PPVm8Dsz.js";const S=H.memo(r=>{const e=q.c(16),{value:$,isEditable:k,rowIndex:t,colIndex:l,onChange:m,disabled:B,id:h,className:j}=r,f=$===void 0?"":$,A=k===void 0?!0:k,N=B===void 0?!1:B,x=j===void 0?"":j;let b;e[0]!==l||e[1]!==m||e[2]!==t?(b=W=>{const V=W.target.value;(V===""||/^[1-9]$/.test(V))&&m&&m(t,l,V)},e[0]=l,e[1]=m,e[2]=t,e[3]=b):b=e[3];const y=b,M=t%3===2&&t!==8,R=l%3===2&&l!==8,v=M&&s.bottomBorder,I=R&&s.rightBorder,w=!A&&s.readonly,C=N&&s.disabled;let a;e[4]!==x||e[5]!==v||e[6]!==I||e[7]!==w||e[8]!==C?(a=_(s.cell,v,I,w,C,x),e[4]=x,e[5]=v,e[6]=I,e[7]=w,e[8]=C,e[9]=a):a=e[9];const E=!A||N;let g;return e[10]!==y||e[11]!==h||e[12]!==a||e[13]!==E||e[14]!==f?(g=u.jsx("input",{type:"text",inputMode:"numeric",pattern:"[1-9]",className:a,value:f,onChange:y,maxLength:"1",disabled:E,placeholder:"",id:h,autoComplete:"off",autoCorrect:"off",autoCapitalize:"off",spellCheck:"false","data-form-type":"other"}),e[10]=y,e[11]=h,e[12]=a,e[13]=E,e[14]=f,e[15]=g):g=e[15],g});S.__docgenInfo={description:`Cell Component\r
\r
Represents a single cell in the Sudoku grid.\r
Handles user input validation (only digits 1-9 or empty).\r
Applies special styling for 3x3 box borders and non-editable cells.\r
\r
@param {Object} props - Component props\r
@param {string} [props.value=""] - Current value of the cell (1-9 or empty)\r
@param {boolean} [props.isEditable=true] - Whether the cell can be edited\r
@param {number} props.rowIndex - Row index in the grid (0-8)\r
@param {number} props.colIndex - Column index in the grid (0-8)\r
@param {Function} props.onChange - Callback when cell value changes\r
@param {boolean} [props.disabled=false] - Whether the cell is disabled\r
@param {string} props.id - Unique identifier for the cell\r
@param {string} [props.className=""] - Additional CSS class names\r
@returns {JSX.Element} Cell component`,methods:[],displayName:"Cell",props:{value:{defaultValue:{value:'""',computed:!1},required:!1},isEditable:{defaultValue:{value:"true",computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1},className:{defaultValue:{value:'""',computed:!1},required:!1}}};const D={title:"Game/Cell",component:S,tags:["autodocs"],parameters:{docs:{description:{component:"A single cell in the Sudoku grid. Handles user input validation (only digits 1-9 allowed), applies visual styling for 3×3 box borders, read-only pre-filled cells, and disabled states. This is the core interactive element of the game."}}},argTypes:{value:{control:"text",description:"Current cell value (1-9 or empty string)",table:{defaultValue:{summary:'""'}}},isEditable:{control:"boolean",description:"Whether the cell can be edited by the player. Pre-filled cells are not editable.",table:{defaultValue:{summary:!0}}},disabled:{control:"boolean",description:"Whether the cell is disabled (e.g., when the game is paused or completed)",table:{defaultValue:{summary:!1}}},rowIndex:{control:{type:"number",min:0,max:8},description:"Row position in the grid (0-8). Affects thick border rendering at 3×3 boundaries.",table:{defaultValue:{summary:0}}},colIndex:{control:{type:"number",min:0,max:8},description:"Column position in the grid (0-8). Affects thick border rendering at 3×3 boundaries.",table:{defaultValue:{summary:0}}},onChange:{action:"changed",description:"Callback fired when the cell value changes: (rowIndex, colIndex, newValue)"}},decorators:[r=>u.jsx("div",{style:{padding:"20px",background:"#f8f9fa"},children:u.jsx(r,{})})]},o={args:{value:"",isEditable:!0,rowIndex:0,colIndex:0,id:"cell-0-0"}},n={args:{value:"5",isEditable:!0,rowIndex:1,colIndex:1,id:"cell-1-1"}},d={args:{value:"8",isEditable:!1,rowIndex:0,colIndex:0,id:"cell-prefilled"}},i={args:{value:"3",isEditable:!0,disabled:!0,rowIndex:0,colIndex:0,id:"cell-disabled"}},c={args:{value:"7",isEditable:!0,rowIndex:2,colIndex:2,id:"cell-boundary"}},p={render:()=>u.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 45px)",gap:0,border:"2px solid #333"},children:[0,1,2].flatMap(r=>[0,1,2].map(e=>u.jsx(S,{value:r===1&&e===1?"5":"",isEditable:!(r===0&&e===0),rowIndex:r,colIndex:e,id:`cell-${r}-${e}`,onChange:()=>{}},`${r}-${e}`)))})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    value: "",
    isEditable: true,
    rowIndex: 0,
    colIndex: 0,
    id: "cell-0-0"
  }
}`,...o.parameters?.docs?.source},description:{story:"Empty editable cell — the default state when a player starts a new game.",...o.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    value: "5",
    isEditable: true,
    rowIndex: 1,
    colIndex: 1,
    id: "cell-1-1"
  }
}`,...n.parameters?.docs?.source},description:{story:"Editable cell with a value — represents a player-entered number.",...n.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    value: "8",
    isEditable: false,
    rowIndex: 0,
    colIndex: 0,
    id: "cell-prefilled"
  }
}`,...d.parameters?.docs?.source},description:{story:"Pre-filled (read-only) cell — a number that was part of the original puzzle.",...d.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    value: "3",
    isEditable: true,
    disabled: true,
    rowIndex: 0,
    colIndex: 0,
    id: "cell-disabled"
  }
}`,...i.parameters?.docs?.source},description:{story:"Disabled cell — appears when the game is paused or completed.",...i.parameters?.docs?.description}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    value: "7",
    isEditable: true,
    rowIndex: 2,
    colIndex: 2,
    id: "cell-boundary"
  }
}`,...c.parameters?.docs?.source},description:{story:"Cell at 3×3 boundary — demonstrates the thick bottom and right borders.",...c.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 45px)",
    gap: 0,
    border: "2px solid #333"
  }}>\r
      {[0, 1, 2].flatMap(row => [0, 1, 2].map(col => <Cell key={\`\${row}-\${col}\`} value={row === 1 && col === 1 ? "5" : ""} isEditable={!(row === 0 && col === 0)} rowIndex={row} colIndex={col} id={\`cell-\${row}-\${col}\`} onChange={() => {}} />))}\r
    </div>
}`,...p.parameters?.docs?.source},description:{story:"Mini grid — shows a 3×3 section of cells to demonstrate border styling.",...p.parameters?.docs?.description}}};const F=["Empty","WithValue","PreFilled","Disabled","AtBoxBoundary","MiniGrid"];export{c as AtBoxBoundary,i as Disabled,o as Empty,p as MiniGrid,d as PreFilled,n as WithValue,F as __namedExportsOrder,D as default};
