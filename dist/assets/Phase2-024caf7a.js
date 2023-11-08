import{r as u,j as f}from"./index-ee043deb.js";function M(){for(var o=0,n=0;o===0;)o=Math.random();for(;n===0;)n=Math.random();return Math.sqrt(-2*Math.log(o))*Math.cos(2*Math.PI*n)}function k(o,n,t){const e=o.getContext("2d");if(!e)return;e.lineWidth=1,e.beginPath();for(let s=n;s<=t;s+=5)e.moveTo(18+(o.width-30)/(t-n)*(s-n),o.height-12),e.lineTo(18+(o.width-30)/(t-n)*(s-n),o.height-8);e.stroke(),e.closePath();const i=5;e.font="10px Arial",e.textAlign="center",e.textBaseline="top";for(let s=n;s<=t;s+=i)e.fillText(s.toString(),18+(o.width-30)/(t-n)*(s-n),o.height-8)}function S(o,n){const t=o.getContext("2d");if(!t)return;const e=25,i=85,s=n.sort((m,h)=>m-h),c=s[Math.floor(n.length/4)],a=s[Math.floor(n.length/2)],x=s[Math.floor(n.length*3/4)];t.strokeStyle="blue",t.beginPath(),t.moveTo(18+(o.width-30)/(i-e)*(a-e),3),t.lineTo(18+(o.width-30)/(i-e)*(a-e),28),t.stroke(),t.closePath(),t.strokeStyle="red",t.beginPath(),t.moveTo(18+(o.width-30)/(i-e)*(c-e),3),t.lineTo(18+(o.width-30)/(i-e)*(x-e),3),t.lineTo(18+(o.width-30)/(i-e)*(x-e),28),t.lineTo(18+(o.width-30)/(i-e)*(c-e),28),t.lineTo(18+(o.width-30)/(i-e)*(c-e),3),t.stroke(),t.closePath()}function C(o,n){if(o){o.width=321,o.height=32;const t=o.getContext("2d");if(t){t.imageSmoothingEnabled=!1,t.clearRect(0,0,o.width,o.height),t.fillStyle="black";const e=25,i=85,s=n.sort((m,h)=>m-h),c=s[Math.floor(n.length/4)],a=s[Math.floor(n.length/2)],x=s[Math.floor(n.length*3/4)];t.lineWidth=1,t.beginPath(),t.moveTo(18+(o.width-30)/(i-e)*(c-e),3),t.lineTo(18+(o.width-30)/(i-e)*(x-e),3),t.lineTo(18+(o.width-30)/(i-e)*(x-e),28),t.lineTo(18+(o.width-30)/(i-e)*(c-e),28),t.lineTo(18+(o.width-30)/(i-e)*(c-e),3),t.stroke(),t.closePath(),t.beginPath(),t.moveTo(18+(o.width-30)/(i-e)*(a-e),3),t.lineTo(18+(o.width-30)/(i-e)*(a-e),28),t.stroke(),t.closePath(),t.beginPath(),t.moveTo(18+(o.width-30)/(i-e)*(c-e),15),t.lineTo(18+(o.width-30)/(i-e)*(s[0]-e),15),t.moveTo(18+(o.width-30)/(i-e)*(x-e),15),t.lineTo(18+(o.width-30)/(i-e)*(s[n.length-1]-e),15),t.stroke(),t.closePath()}}}function j(o=30,n=50,t=7){let e=[];for(let i=0;i<o;i++)e.push(Math.round((M()*t+n)*10)/10);return e}function R(){const[o,n]=u.useState(30),[t,e]=u.useState([]),i=u.useRef(null),s=u.useRef(null),c=u.useRef(null),[a,x]=u.useState([]);u.useEffect(()=>{const h=Math.min(Math.ceil(Math.log2(a.length+4))*10,160),g=[];for(let d=0;d<h;d++)g.push(0);for(let d=0;d<a.length;d++)g[Math.floor(a[d]/321*h)]++;const l=s.current;if(!l)return()=>{};const r=l.getContext("2d");if(!r)return()=>{};r.clearRect(0,0,l.width,l.height),r.fillStyle="white",r.fillRect(0,0,l.width,l.height);const w=h/l.width*12;r.strokeStyle="rgba(0, 0, 0, 1)",r.lineWidth=1,r.beginPath(),r.moveTo(0,l.height);for(let d=0;d<h;d++)r.lineTo(d/h*l.width,l.height-g[d]/a.length*l.height*w);r.lineTo(l.width,l.height),r.stroke(),r.closePath(),r.strokeStyle="rgba(0, 0, 0, 0.3)",r.lineWidth=1,r.beginPath(),r.moveTo(0,l.height);for(let d=0;d<160;d++){const y=.18691588785046728*(d/160*321)+25-50,P=Math.exp(-y*y/(2*7*7))/(7*Math.sqrt(2*Math.PI));r.lineTo(d/160*l.width,l.height-P*l.height*w)}r.lineTo(l.width,l.height),r.stroke(),r.closePath()},[a,321]),u.useEffect(()=>{if(i.current){const h=i.current;h.width=321,h.height=48,k(h,25,85)}},[]),u.useEffect(()=>{if(c.current){const h=c.current;h.innerHTML="";for(let g of t)h.appendChild(g)}},[t]);function m(){if(!i.current)return;const h=j(o),g=document.createElement("canvas");g.width=321,g.height=32,g.style.margin="-2px";const l=document.createElement("div");l.style.display="block",l.style.border="1px solid black",l.style.height="32px",l.style.width="321px",l.style.margin="-1px",l.appendChild(g),C(g,h),S(i.current,h),e([...t,g]);const r=25,w=85,d=h.reduce((b,T)=>b+T)/h.length;console.log(d);const p=18+(d-r)/(w-r)*321;x([...a,p])}return f.jsxs("div",{className:"Phase2",children:[f.jsx("h3",{children:"컴퓨터 표집 애니메이션"}),f.jsxs("div",{style:{display:"flex",flexDirection:"column",width:"fit-content",margin:"0 auto"},children:[f.jsxs("div",{style:{display:"flex",flexDirection:"column",width:"fit-content",margin:"0 auto",border:"1px solid black"},children:[f.jsx("button",{className:"simulateBtn",onClick:()=>m(),children:"Simulate"}),f.jsxs("div",{style:{margin:"4px"},children:["n: ",f.jsx("input",{type:"number",value:o,onChange:h=>n(parseInt(h.target.value)),style:{width:"5em"}})]}),f.jsxs("div",{style:{display:"block",border:"1px solid black",height:"128px",width:"321px",margin:"-1px"},children:[f.jsx("canvas",{id:"current_histogram",width:"321",height:"48",style:{margin:"-2px"},ref:i}),f.jsx("canvas",{width:"321",height:"80",style:{margin:"-2px"},ref:s})]})]}),f.jsx("div",{style:{display:"flex",flexDirection:"column",width:"321px",margin:"0 auto",marginTop:"-1px",border:"1px solid black",maxHeight:"52vh",overflow:"auto",overflowX:"hidden"},ref:c})]})]})}export{R as default};