import{R as n,j as c}from"./index-ee043deb.js";/* empty css                 */const L=(f,d)=>{const l=n.useRef();n.useEffect(()=>{l.current=f},[f]),n.useEffect(()=>{function g(){var o;(o=l.current)==null||o.call(l)}if(d!==null){const o=setInterval(g,d);return()=>clearInterval(o)}},[d])};function N(f,d){let l=0,g=0;for(;l===0;)l=Math.random();for(;g===0;)g=Math.random();return f+d*Math.sqrt(-2*Math.log(l))*Math.cos(2*Math.PI*g)}function F(){const f=n.useRef(null),d=n.useRef(null),[l,g]=n.useState(window.innerHeight-256),[o,C]=n.useState((window.innerHeight-256)*.5625),[m,E]=n.useState(o*(Math.random()*.6+.2)),[s,y]=n.useState([]),S=30,[W,X]=n.useState(2),[a,M]=n.useState([]),[x,P]=n.useState(!0),[v,T]=n.useState(!1),[H,k]=n.useState(0);n.useEffect(()=>{const e=Math.min(Math.ceil(Math.log2(a.length+4)*5),160),i=[];for(let r=0;r<e;r++)i.push(0);for(let r=0;r<a.length;r++)i[Math.floor(a[r]/o*e)]++;const t=d.current;if(!t)return()=>{};const h=t.getContext("2d");if(!h)return()=>{};h.clearRect(0,0,t.width,t.height),h.fillStyle="white",h.fillRect(0,0,t.width,t.height);const I=e/t.width*32;if(h.strokeStyle="rgba(0, 0, 0, 1)",h.lineWidth=1,h.beginPath(),h.moveTo(0,t.height),!v||a.length<2){for(let r=0;r<e;r++)h.lineTo(r/e*t.width,t.height-i[r]/a.length*t.height*I);h.lineTo(t.width,t.height)}else{const r=a.reduce((u,w)=>u+w)/a.length,j=Math.sqrt(a.reduce((u,w)=>u+Math.pow(w-r,2))/a.length);for(let u=1;u<320;u++){const w=u/320*t.width,_=Math.abs(w-r)/j,B=Math.exp(-Math.pow(_,2)/2)/Math.sqrt(2*Math.PI)/j;h.lineTo(u/320*t.width,t.height-B*t.height*(320/t.width*32))}h.lineTo(t.width,t.height)}h.stroke(),h.closePath()},[a,o,v]),n.useEffect(()=>{const e=f.current;if(!e)return;const i=e.getContext("2d");if(i){i.clearRect(0,0,e.width,e.height),i.fillStyle="black",i.fillRect(0,0,e.width,e.height),i.fillStyle="white",x||i.fillRect(m-5,5,10,10),i.strokeStyle="rgba(255, 255, 255, 1)",i.lineWidth=2;for(let t=0;t<s.length;t++)x&&s[t].y<l-32||(i.beginPath(),i.moveTo(s[t].x+s[t].xSpeed,s[t].y),i.lineTo(s[t].x+s[t].xSpeed,s[t].y+S),i.stroke(),i.closePath());for(let t=0;t<a.length;t++)i.fillStyle="rgba(255, 255, 255, 0.3)",i.beginPath(),i.arc(a[t],l-10,2,0,2*Math.PI),i.fill();if(x){i.fillStyle="rgba(64, 64, 64, 1)",i.fillRect(0,0,e.width,e.height*.9);for(let t=0;t<20;t++)i.fillStyle=`rgba(64, 64, 64, ${1-t/20})`,i.fillRect(0,e.height*.9+t*e.height*.07/20-2,e.width,e.height*.2/20)}}},[m,s]);function R(){y(e=>[...e,{x:m,y:20,xSpeed:N(0,W)}])}L(()=>{const e=[];for(let i=0;i<s.length;i++)s[i].y<l-10-S?e.push({x:s[i].x+s[i].xSpeed,y:s[i].y+S,xSpeed:s[i].xSpeed}):M(t=>[...t,s[i].x]);y(e)},10),n.useEffect(()=>{function e(){g(window.innerHeight-64),C(window.innerHeight*.5625)}return window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]);const b=-32,p=96;return c.jsxs("div",{className:"Experiment2",style:{fontWeight:"bold"},children:[c.jsx("canvas",{ref:f,height:l,width:o,onClick:R,style:{margin:"0 auto",position:"absolute",left:"0",right:"0"}}),c.jsx("canvas",{ref:d,height:96,width:o,onClick:R,style:{border:"1px solid black",margin:"0 auto",position:"absolute",left:"0",right:"0",top:l+96}}),c.jsx("input",{className:"checkbox",type:"checkbox",checked:x,onChange:e=>P(e.target.checked),style:{position:"absolute",left:window.innerWidth/2+o/2-12+b,top:p+88}}),c.jsx("label",{style:{color:"white",position:"absolute",left:window.innerWidth/2+o/2-44+b,top:p+84},children:"Fog"}),c.jsx("input",{className:"checkbox",type:"checkbox",checked:v,onChange:e=>T(e.target.checked),style:{position:"absolute",left:window.innerWidth/2+o/2-12+b,top:p+118}}),c.jsx("label",{style:{color:"white",position:"absolute",left:window.innerWidth/2+o/2-57+b,top:p+116},children:"Norm"}),c.jsx("button",{onClick:()=>{M([]),E(o/2),y([])},style:{position:"absolute",left:window.innerWidth/2+o/2-56,top:p+158},children:"Reset"}),c.jsxs("div",{style:{borderBottom:"1px solid lightgray",width:"321px",backgroundColor:"white",userSelect:"none",position:"absolute",left:window.innerWidth/2-160,top:l+200,height:"368px"},onTouchMove:e=>k(e.touches[0].clientX),onMouseMove:e=>k(e.clientX),children:["비교",c.jsx("div",{style:{position:"fixed",backgroundColor:"green",width:"1px",height:"90vh",top:"72px",left:H+"px"}})]})]})}export{F as default};