import{R as s,j as w}from"./index-ee043deb.js";const y=(c,a)=>{const l=s.useRef();s.useEffect(()=>{l.current=c},[c]),s.useEffect(()=>{function u(){var h;(h=l.current)==null||h.call(l)}if(a!==null){const h=setInterval(u,a);return()=>clearInterval(h)}},[a])};function M(c,a){let l=0,u=0;for(;l===0;)l=Math.random();for(;u===0;)u=Math.random();return c+a*Math.sqrt(-2*Math.log(l))*Math.cos(2*Math.PI*u)}function C(){const c=s.useRef(null),a=s.useRef(null),[l,u]=s.useState(window.innerHeight-256),[h,v]=s.useState((window.innerHeight-256)*.5625),[g,b]=s.useState(h/2),[i,x]=s.useState([]),d=30,[m,E]=s.useState(2),[f,S]=s.useState([]);s.useEffect(()=>{const n=Math.min(Math.ceil(Math.log2(f.length+4))*5,160),t=[];for(let r=0;r<n;r++)t.push(0);for(let r=0;r<f.length;r++)t[Math.floor(f[r]/h*n)]++;const e=a.current;if(!e)return()=>{};const o=e.getContext("2d");if(!o)return()=>{};o.clearRect(0,0,e.width,e.height),o.fillStyle="white",o.fillRect(0,0,e.width,e.height);const R=n/e.width*32;o.strokeStyle="rgba(0, 0, 0, 1)",o.lineWidth=1,o.beginPath(),o.moveTo(0,e.height);for(let r=0;r<n;r++)o.lineTo(r/n*e.width,e.height-t[r]/f.length*e.height*R);o.lineTo(e.width,e.height),o.stroke(),o.closePath()},[f,h]),s.useEffect(()=>{const n=c.current;if(!n)return;const t=n.getContext("2d");if(t){t.clearRect(0,0,n.width,n.height),t.fillStyle="black",t.fillRect(0,0,n.width,n.height),t.fillStyle="white",t.fillRect(g-5,5,10,10),t.strokeStyle="rgba(255, 255, 255, 1)",t.lineWidth=2;for(let e=0;e<i.length;e++)t.beginPath(),t.moveTo(i[e].x,i[e].y),t.lineTo(i[e].x+i[e].xSpeed,i[e].y+d),t.stroke(),t.closePath();for(let e=0;e<f.length;e++)t.fillStyle="rgba(255, 255, 255, 1)",t.beginPath(),t.arc(f[e],l-10,1,0,2*Math.PI),t.fill()}},[g,i]);function p(){x(n=>[...n,{x:g,y:20,xSpeed:M(0,m)}])}return y(()=>{const n=[];for(let t=0;t<i.length;t++)i[t].y<l-10-d?n.push({x:i[t].x+i[t].xSpeed,y:i[t].y+d,xSpeed:i[t].xSpeed}):S(e=>[...e,i[t].x]);x(n)},10),s.useEffect(()=>{function n(){u(window.innerHeight-64),v(window.innerHeight*.5625)}return window.addEventListener("resize",n),()=>window.removeEventListener("resize",n)},[]),w.jsxs("div",{className:"Experiment1",children:[w.jsx("canvas",{ref:c,height:l,width:h,onClick:p,style:{margin:"0 auto",position:"absolute",left:"0",right:"0"}}),w.jsx("canvas",{ref:a,height:96,width:h,onClick:p,style:{margin:"0 auto",position:"absolute",left:"0",right:"0",top:l+96}})]})}export{C as default};