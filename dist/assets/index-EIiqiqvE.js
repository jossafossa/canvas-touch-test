(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();class h extends Event{constructor(t,e){super(t),this.pointers=[];let s=e.type??"drag";s==="drag"&&this.drag(e),s==="pointermove"&&this.pointerMove(e),s==="touchmove"&&this.touchMove(e)}drag(t){this.pointers=t.pointers}pointerMove(t){this.pointers.push({id:t.pointerId,x:t.clientX,y:t.clientY,size:10})}touchMove(t){for(let e=0;e<t.touches.length;e++){let s=t.touches[e];console.log(s),this.pointers.push({id:s.identifier,x:s.clientX,y:s.clientY,size:(s.radiusX+s.radiusY)*s.force/2})}}}class E extends EventTarget{constructor(t){super(),this.root=t,this.root.addEventListener("touchmove",e=>{this.dispatchEvent(new h("drag",e))}),this.root.addEventListener("touchend",e=>{this.dispatchEvent(new h("dragend",e))})}}class y extends EventTarget{constructor(t){super(),this.root=t,this.isDragging=!1,this.root.addEventListener("pointerdown",e=>{this.isDragging=!0}),this.root.addEventListener("pointerup",e=>{this.dispatchEvent(new h("dragend",{pointers:[]})),this.isDragging=!1}),this.root.addEventListener("pointermove",e=>{this.isDragging&&this.dispatchEvent(new h("drag",e))})}}class L{constructor(t){this.size=t,this.buffer=new Array(t).fill(0),this.index=0,this.count=0,this.sum=0}smooth(t){return this.sum-=this.buffer[this.index],this.buffer[this.index]=t,this.sum+=t,this.index=(this.index+1)%this.size,this.count=Math.min(this.count+1,this.size),this.sum/this.count}}class p{constructor(t,e=["x","y"]){this.buffers=new Map,this.size=t,this.attributes=e;for(let s of e)this.buffers.set(s,new L(t))}smooth(t){const e={...t};for(let s of this.attributes)e[s]=this.buffers.get(s).smooth(t[s]);return e}}class M extends EventTarget{constructor(t,e={}){super(),this.settings={smooth:30,...e},this.buffers=new Map,this.event=new h("drag",{pointers:[]}),this.pointers=[],this.buffer=new p(this.settings.smooth),this.root=t,this.touchListener=new E(this.root),this.mouseListener=new y(this.root),[this.mouseListener,this.touchListener].forEach(s=>{s.addEventListener("drag",i=>{this.event=i}),s.addEventListener("dragend",()=>{this.buffers.clear(),this.event=new h("dragend",{pointers:[]}),this.dispatchEvent(this.event)})}),this.loop()}loop(){var s;let t=((s=this.event)==null?void 0:s.pointers)??[],e=[];for(let i of t){let r=this.buffers.get(i.id);r||(r=new p(this.settings.smooth,["x","y","size"]),this.buffers.set(i.id,r));let n=r.smooth(i);e.push(n)}this.dispatchEvent(new h("drag",{pointers:e})),window.requestAnimationFrame(()=>{this.loop()})}}let c=document.querySelector("#root"),a=window.devicePixelRatio??1;c.width=window.innerWidth*a;c.height=window.innerHeight*a;let m=new M(c,{smooth:5});const l=c.getContext("2d"),P=(o,t=1)=>{let e=[`rgba( 255, 0, 0, ${t} )`,`rgba( 0, 255, 0, ${t} )`,`rgba( 0, 0, 255, ${t} )`,`rgba( 255, 255, 0, ${t} )`,`rgba( 0, 255, 255, ${t} )`,`rgba( 255, 0, 255, ${t} )`];o=o.toString();let s=0;for(let i=0;i<o.length;i++)s+=o.charCodeAt(i);return s=s%e.length,e[s]};let v=0,u=new Map;m.addEventListener("dragend",o=>{console.log("dragend"),u=new Map,v++});const z=(o,t,e=2)=>{let s=[],i=t.x-o.x,r=t.y-o.y,n=Math.sqrt(i**2+r**2),f=Math.atan2(r,i),g=Math.floor(n/e);for(let d=0;d<g;d++){let w=o.x+Math.cos(f)*d*e,b=o.y+Math.sin(f)*d*e,x=o.size+(t.size-o.size)*(d/g);s.push({x:w,y:b,size:x})}return s};m.addEventListener("drag",o=>{let t=o.pointers??[];for(let e of t){c.setPointerCapture(e.id);let s=P(e.id+v);l.fillStyle=s;let i=z(u.get(e.id)??e,e);console.log(i);for(let r of i)l.beginPath(),l.arc(r.x*a,r.y*a,r.size*a,0,Math.PI*2),l.fill(),l.closePath();u.set(e.id,e)}});