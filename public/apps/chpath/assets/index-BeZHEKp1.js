(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function C(t){return t.type==="line"?t.from:b(t,t.startAngle)}function F(t){return t.type==="line"?t.to:b(t,t.endAngle)}function b(t,e){return{x:t.center.x+t.radius*Math.cos(e),y:t.center.y+t.radius*Math.sin(e)}}function v(t){return C(t[0])}function P(t){return F(t[t.length-1])}function H(t){return t.type==="line"?{type:"line",from:t.to,to:t.from}:{type:"arc",center:t.center,radius:t.radius,startAngle:t.endAngle,endAngle:t.startAngle,ccw:!t.ccw}}function R(t){return t.slice().reverse().map(H)}function p(t,e){return Math.hypot(t.x-e.x,t.y-e.y)}function B(t,e){if(t.length<2)return[];const n=E(t,e);return Q(n,e)}function G(t,e){return{char:t.char,advance:t.advance,strokes:t.strokes.map(n=>B(n,e)).filter(n=>n.length>0)}}function E(t,e){const n=t[0],o=t[t.length-1];if(t.length<=2)return[{type:"line",from:n,to:o}];if(z(t,n,o)<=e)return[{type:"line",from:n,to:o}];if(t.length===3)return[{type:"line",from:n,to:t[1]},{type:"line",from:t[1],to:o}];const s=Math.floor((t.length-1)/2),a=K(n,t[s],o),c=a?U(t,a):1/0;if(a&&c<=e)return[a];let i=s,l=-1/0;for(let h=1;h<t.length-1;h++){const m=a?X(t[h],a):I(t[h],n,o);m>l&&(l=m,i=h)}const u=E(t.slice(0,i+1),e),d=E(t.slice(i),e);return[...u,...d]}function I(t,e,n){const o=n.x-e.x,r=n.y-e.y,s=Math.hypot(o,r);return s<1e-9?p(t,e):Math.abs((t.x-e.x)*r-(t.y-e.y)*o)/s}function z(t,e,n){let o=0;for(const r of t){const s=I(r,e,n);s>o&&(o=s)}return o}function U(t,e){const n=c=>(c%(2*Math.PI)+2*Math.PI)%(2*Math.PI),o=e.ccw?n(e.endAngle-e.startAngle):n(e.startAngle-e.endAngle),r=1e-6;let s=0,a=-1/0;for(const c of t){const i=Math.abs(p(c,e.center)-e.radius),l=Math.atan2(c.y-e.center.y,c.x-e.center.x),u=e.ccw?n(l-e.startAngle):n(e.startAngle-l);if(u>o+r||u<a-r)return 1/0;a=u,i>s&&(s=i)}return s}function X(t,e){const n=Math.abs(p(t,e.center)-e.radius),o=i=>(i%(2*Math.PI)+2*Math.PI)%(2*Math.PI),r=e.ccw?o(e.endAngle-e.startAngle):o(e.startAngle-e.endAngle),s=Math.atan2(t.y-e.center.y,t.x-e.center.x);return(e.ccw?o(s-e.startAngle):o(e.startAngle-s))>r+1e-6?1/0:n}function K(t,e,n){const o=Y(t,e,n);if(!o)return null;const r=p(o,t);if(!Number.isFinite(r)||r>1e6)return null;const s=Math.atan2(t.y-o.y,t.x-o.x),a=Math.atan2(e.y-o.y,e.x-o.x),c=Math.atan2(n.y-o.y,n.x-o.x),i=J(s,a,c);return{type:"arc",center:o,radius:r,startAngle:s,endAngle:c,ccw:i}}function Y(t,e,n){const o=t.x,r=t.y,s=e.x,a=e.y,c=n.x,i=n.y,l=2*(o*(a-i)+s*(i-r)+c*(r-a));if(Math.abs(l)<1e-9)return null;const u=((o*o+r*r)*(a-i)+(s*s+a*a)*(i-r)+(c*c+i*i)*(r-a))/l,d=((o*o+r*r)*(c-s)+(s*s+a*a)*(o-c)+(c*c+i*i)*(s-o))/l;return{x:u,y:d}}function J(t,e,n){const o=a=>(a%(2*Math.PI)+2*Math.PI)%(2*Math.PI),r=o(e-t),s=o(n-t);return r<=s}function Q(t,e){const n=[];for(const o of t){const r=n[n.length-1],s=r?W(r,o,e):null;if(s){n[n.length-1]=s;continue}n.push(o)}return n}function W(t,e,n){if(t.type==="line"&&e.type==="line")return I(t.to,t.from,e.to)<=n?{type:"line",from:t.from,to:e.to}:null;if(t.type==="arc"&&e.type==="arc"){const o=p(t.center,e.center)<=n,r=Math.abs(t.radius-e.radius)<=n,s=Z(t.endAngle,e.startAngle)&&t.ccw===e.ccw;return o&&r&&s?{...t,endAngle:e.endAngle}:null}return null}function Z(t,e){const n=r=>(r%(2*Math.PI)+2*Math.PI)%(2*Math.PI),o=Math.abs(n(t)-n(e));return o<.001||Math.abs(o-2*Math.PI)<.001}function tt(t,e){const n=t.slice(),o=[];let r=e;for(;n.length>0;){let s=0,a=!1,c=1/0;for(let u=0;u<n.length;u++){const d=n[u],h=p(r,v(d)),m=p(r,P(d));h<c&&(c=h,s=u,a=!1),m<c&&(c=m,s=u,a=!0)}const i=n.splice(s,1)[0],l=a?R(i):i;o.push(l),r=P(l)}return o}function et(t,e,n,o){return t.map(r=>nt(r,e,n,o))}function nt(t,e,n,o){return t.type==="line"?{type:"line",from:{x:t.from.x*e+n,y:t.from.y*e+o},to:{x:t.to.x*e+n,y:t.to.y*e+o}}:{...t,center:{x:t.center.x*e+n,y:t.center.y*e+o},radius:t.radius*e}}const rt=.001;function ot(t,e,n,o=n*1.6){const r=n/1e3,s=n*.5,a=n*1.2;let c=s,i=a,l=s;const u=[],d=[],h=[];let m=null;for(const x of t){if(x===`
`){c=s,i+=o;continue}const M=e.get(x);if(!M){x!==" "&&h.push({char:x,x:c,y:i,size:n}),c+=n*.6,l=Math.max(l,c);continue}const $=M.strokes.map(g=>et(g,r,c,i)),_=tt($,m??($[0]?v($[0]):{x:c,y:i}));for(const g of _)m&&p(m,v(g))>rt&&d.push({from:m,to:v(g)}),u.push(g),m=P(g);c+=M.advance*r,l=Math.max(l,c)}return{strokes:u,travels:d,missing:h,width:l+s,height:i+n*1.2}}const st=8;function ct(t,e){let n=0;const o=t.strokes.flatMap(i=>i.map(l=>{const u=`M ${k(C(l))} ${it(l)}`,d=e.colorMode==="order"?` style="stroke: var(--series-${n%st+1})"`:"";return n++,`<path d="${u}"${d} />`})).join(`
`),r=e.showTravel?t.travels.map(i=>`<line x1="${f(i.from.x)}" y1="${f(i.from.y)}" x2="${f(i.to.x)}" y2="${f(i.to.y)}" />`).join(`
`):"",s=t.missing.map(i=>{const l=i.size*.1,u=i.size-l*2;return`<rect x="${f(i.x+l)}" y="${f(i.y+l)}" width="${f(u)}" height="${f(u)}" />`}).join(`
`),a=f(t.width),c=f(t.height);return`<svg xmlns="http://www.w3.org/2000/svg" width="${a}" height="${c}" viewBox="0 0 ${a} ${c}">
  <g class="missing">${s}</g>
  <g class="travel">${r}</g>
  <g class="drawing">${o}</g>
</svg>`}function it(t){return t.type==="line"?`L ${k(t.to)}`:at(t)}function at(t){const e=b(t,t.endAngle),n=a=>(a%(2*Math.PI)+2*Math.PI)%(2*Math.PI),r=(t.ccw?n(t.endAngle-t.startAngle):n(t.startAngle-t.endAngle))>Math.PI?1:0,s=t.ccw?1:0;return`A ${f(t.radius)} ${f(t.radius)} 0 ${r} ${s} ${k(e)}`}function k(t){return`${f(t.x)} ${f(t.y)}`}function f(t){return Math.round(t*100)/100+""}function lt(t){const e=[];return t.strokes.forEach((n,o)=>{e.push(`# stroke ${o+1}`);for(const r of n)r.type==="line"?e.push(`L (${y(r.from.x)}, ${y(r.from.y)}) -> (${y(r.to.x)}, ${y(r.to.y)})`):e.push(`A center=(${y(r.center.x)}, ${y(r.center.y)}) r=${y(r.radius)} angle=${y(r.startAngle)}->${y(r.endAngle)} ${r.ccw?"ccw":"cw"}`)}),e.join(`
`)}function y(t){return String(Math.round(t*100)/100)}const ut=`常用漢字と英数字を
直線と円弧に変換する 🤖`,dt=document.querySelector("#app");dt.innerHTML=`
  <main>
    <h1>chpath</h1>
    <p class="lead">入力した文字を、ペンプロッタで描けるように、できるだけ少ない「直線」と「円弧」の組み合わせに変換します。</p>

    <section class="panel">
      <label class="field">
        文字列
        <textarea id="text" rows="3">${pt(ut)}</textarea>
      </label>

      <div class="sliders">
        <label class="field">
          誤差許容値(大きいほどコマンド数が減る): <span id="toleranceValue"></span>
          <input id="tolerance" type="range" min="1" max="30" step="1" value="6" />
        </label>
        <label class="field">
          文字サイズ: <span id="fontSizeValue"></span>
          <input id="fontSize" type="range" min="24" max="200" step="4" value="48" />
        </label>
      </div>

      <div class="toggles">
        <div class="segmented" id="colorModeGroup">
          <label><input type="radio" name="colorMode" value="black" checked />仕上がり(黒)</label>
          <label><input type="radio" name="colorMode" value="order" />構造(色分け)</label>
        </div>
        <label class="field checkbox">
          <input id="showTravel" type="checkbox" checked />
          ペンアップの移動(点線)を表示
        </label>
      </div>
    </section>

    <div id="stats" class="stats"></div>
    <div id="svgContainer" class="svg-container"></div>

    <section class="panel commands">
      <div class="commands-head">
        <span>生成された直線・円弧の一覧</span>
        <button id="copyCommands" type="button">コピー</button>
      </div>
      <p class="hint">
        <code># stroke N</code> はペンを下ろしたまま描き続ける一区切り(ストローク)の開始です。
        <code>L (x1, y1) -&gt; (x2, y2)</code> は開始点から終了点までの直線、
        <code>A center=(cx, cy) r=半径 angle=開始-&gt;終了 ccw/cw</code> は中心・半径と、
        開始角度から終了角度まで反時計回り(ccw)・時計回り(cw)に描く円弧を表します
        (角度の単位はラジアン、座標・半径の単位はpx)。
      </p>
      <textarea id="commandList" readonly rows="8" spellcheck="false"></textarea>
    </section>

    <footer>
      <p>
        英数字は <a href="https://github.com/techninja/hersheytextjs" target="_blank" rel="noopener">Hershey Fonts</a>(Public Domain)、
        漢字・かなは <a href="http://kanjivg.tagaini.net/" target="_blank" rel="noopener">KanjiVG</a>
        (© 2009-2011 Ulrich Apel, CC BY-SA 3.0) のストロークデータを、直線・円弧に変換して使用しています。
        未対応の文字は破線の枠で表示されます。
      </p>
    </footer>
  </main>
`;const L=document.querySelector("#text"),O=document.querySelector("#tolerance"),ft=document.querySelector("#toleranceValue"),q=document.querySelector("#fontSize"),ht=document.querySelector("#fontSizeValue"),j=document.querySelector("#showTravel"),N=document.querySelector("#colorModeGroup"),V=document.querySelector("#stats"),mt=document.querySelector("#svgContainer"),w=document.querySelector("#commandList"),A=document.querySelector("#copyCommands");let D=new Map;async function yt(){V.textContent="グリフデータを読み込み中...";const e=await(await fetch("/apps/chpath/glyphs.json")).json();D=new Map(e.map(n=>[n.char,n]));for(const n of[L,O,q,j])n.addEventListener("input",S);N.addEventListener("change",S),w.addEventListener("focus",()=>w.select()),A.addEventListener("click",async()=>{await navigator.clipboard.writeText(w.value),A.textContent="コピーしました",setTimeout(()=>A.textContent="コピー",1500)}),S()}function S(){const t=Number(O.value),e=Number(q.value),n=j.checked,o=N.querySelector("input:checked").value;ft.textContent=String(t),ht.textContent=`${e}px`;const r=L.value,s=new Set(r),a=new Map([...s].map(d=>D.get(d)).filter(d=>d!==void 0).map(d=>[d.char,G(d,t)])),c=ot(r,a,e);mt.innerHTML=ct(c,{showTravel:n,colorMode:o}),w.value=lt(c);const i=T(c.strokes,"line"),l=T(c.strokes,"arc"),u=c.missing.length>0?` / 未対応文字 ${c.missing.length}字(${[...new Set(c.missing.map(d=>d.char))].join("")})`:"";V.textContent=`直線 ${i}本 + 円弧 ${l}本 = 描画コマンド ${i+l}個 / ペンアップ移動 ${c.travels.length}回${u}`}function T(t,e){return t.reduce((n,o)=>n+o.filter(r=>r.type===e).length,0)}function pt(t){return t.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}yt();
