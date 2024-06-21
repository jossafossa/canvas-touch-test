(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();class h extends Event{constructor(t,e){super(t),this.pointers=[];let s=e.type??"drag";["drag","dragstart","dragend"].includes(s)&&this.drag(e),["pointermove","pointerdown","pointerup"].includes(s)&&this.pointerMove(e),["touchmove","touchstart","touchend"].includes(s)&&this.touchMove(e)}drag(t){this.pointers=t.pointers}pointerMove(t){this.pointers.push({id:t.pointerId,x:t.clientX,y:t.clientY,size:10})}touchMove(t){for(let e=0;e<t.touches.length;e++){let s=t.touches[e];console.log(s),this.pointers.push({id:s.identifier,x:s.clientX,y:s.clientY,size:s.force*20})}}}class M extends EventTarget{constructor(t){super(),this.root=t,this.root.addEventListener("touchmove",e=>{this.dispatchEvent(new h("drag",e))}),this.root.addEventListener("touchend",e=>{this.dispatchEvent(new h("dragend",e))}),this.root.addEventListener("touchstart",e=>{this.dispatchEvent(new h("dragstart",e))})}}class P extends EventTarget{constructor(t){super(),this.root=t,this.isDragging=!1,this.root.addEventListener("pointermove",e=>{this.isDragging&&this.dispatchEvent(new h("drag",e))}),this.root.addEventListener("pointerdown",e=>{this.isDragging=!0,this.dispatchEvent(new h("dragstart",e))}),this.root.addEventListener("pointerup",e=>{this.dispatchEvent(new h("dragend",{pointers:[]})),this.isDragging=!1})}}class z{constructor(t){this.size=t,this.buffer=new Array(t).fill(0),this.index=0,this.count=0,this.sum=0}smooth(t){return this.sum-=this.buffer[this.index],this.buffer[this.index]=t,this.sum+=t,this.index=(this.index+1)%this.size,this.count=Math.min(this.count+1,this.size),this.sum/this.count}}class w{constructor(t,e=["x","y"]){this.buffers=new Map,this.size=t,this.attributes=e;for(let s of e)this.buffers.set(s,new z(t))}smooth(t){const e={...t};for(let s of this.attributes)e[s]=this.buffers.get(s).smooth(t[s]);return e}}class S extends EventTarget{constructor(t,e={}){super(),this.settings={smooth:30,...e},this.buffers=new Map,this.event=new h("drag",{pointers:[]}),this.pointers=[],this.buffer=new w(this.settings.smooth),this.root=t,this.touchListener=new M(this.root),this.mouseListener=new P(this.root);let s=this.isTouch()?this.touchListener:this.mouseListener;s.addEventListener("dragstart",i=>{this.event=i,this.dispatchEvent(new h("dragstart",i))}),s.addEventListener("drag",i=>{this.event=i}),s.addEventListener("dragend",()=>{this.buffers.clear(),this.event=new h("dragend",{pointers:[]}),this.dispatchEvent(this.event)}),this.loop()}isTouch(){return"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0}loop(){var s;let t=((s=this.event)==null?void 0:s.pointers)??[],e=[];for(let i of t){let r=this.buffers.get(i.id);r||(r=new w(this.settings.smooth,["x","y","size"]),this.buffers.set(i.id,r));let n=r.smooth(i);e.push(n)}this.dispatchEvent(new h("drag",{pointers:e})),window.requestAnimationFrame(()=>{this.loop()})}}const T=o=>{o=Object.fromEntries(o.entries());for(let t in o){let e=document.querySelector(`[name="${t}"]`);console.log({key:t,input:e}),e&&(e.value=o[t])}};let d=document.querySelector("#root"),u=window.devicePixelRatio??1;d.width=window.innerWidth*u;d.height=window.innerHeight*u;d.style.height=window.innerHeight+"px";d.style.width=window.innerWidth+"px";let p=new URLSearchParams(window.location.search);T(p);let c=p.get("smoothing")??5,f=p.get("dots")??2;f=parseInt(f);c=parseInt(c);let E=new S(d,{smooth:c});const l=d.getContext("2d"),O=(o,t=1)=>{let e=[`rgba( 255, 0, 0, ${t} )`,`rgba( 0, 255, 0, ${t} )`,`rgba( 0, 0, 255, ${t} )`,`rgba( 255, 255, 0, ${t} )`,`rgba( 0, 255, 255, ${t} )`,`rgba( 255, 0, 255, ${t} )`];o=o.toString();let s=0;for(let i=0;i<o.length;i++)s+=o.charCodeAt(i);return s=s%e.length,e[s]};let x=0,g=new Map;E.addEventListener("dragend",o=>{console.log("dragend"),g=new Map,x++});const q=(o,t,e=2)=>{let s=[],i=t.x-o.x,r=t.y-o.y,n=Math.sqrt(i**2+r**2),m=Math.atan2(r,i),v=Math.floor(n/e);for(let a=0;a<v;a++){let b=o.x+Math.cos(m)*a*e,y=o.y+Math.sin(m)*a*e,L=o.size+(t.size-o.size)*(a/v);s.push({x:b,y,size:L})}return s},$=o=>{let t=o.pointers??[];for(let e of t){d.setPointerCapture(e.id);let s=O(e.id+x);l.fillStyle=s;let i=g.get(e.id),r=[e];i&&(r=q(i,e,f));for(let n of r)l.beginPath(),l.arc(n.x*u,n.y*u,n.size*u,0,Math.PI*2),l.fill(),l.closePath();g.set(e.id,e)}};["drag","dragstart"].forEach(o=>E.addEventListener(o,$));const A=document.querySelectorAll("output");for(let o of A){let t=document.querySelector("#"+o.htmlFor),e=o.getAttribute("suffix")??"";o.value=t.value+e,t.addEventListener("input",()=>{o.value=t.value+e})}
