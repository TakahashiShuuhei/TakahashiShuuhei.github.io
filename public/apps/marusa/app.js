"use strict";
/* ============ 基本ユーティリティ ============ */
const state = { jp:false, color:true, bpm:80 };
const SET_KEY='marusa-settings-v1';
try{ Object.assign(state,JSON.parse(localStorage.getItem(SET_KEY)||'{}')); }catch(e){}
function saveSettings(){ try{localStorage.setItem(SET_KEY,JSON.stringify(state));}catch(e){} }
const PCN = {C:0,D:2,E:4,F:5,G:7,A:9,B:11};
const SHARP = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const JP = {C:'ド',D:'レ',E:'ミ',F:'ファ',G:'ソ',A:'ラ',B:'シ'};
function parseN(s){
  const m=/^([A-G])([#b]?)(-?\d)$/.exec(s); if(!m) throw new Error('bad note '+s);
  const acc=m[2]; const o=+m[3];
  return {l:m[1],acc,o,midi:12*(o+1)+PCN[m[1]]+(acc==='#'?1:acc==='b'?-1:0),name:s};
}
function midiName(m){return SHARP[m%12]+(Math.floor(m/12)-1);}
function pcOf(s){ // 'E#' -> 5
  const m=/^([A-G])([#b]?)/.exec(s); return ((PCN[m[1]]+(m[2]==='#'?1:m[2]==='b'?-1:0))%12+12)%12;
}
function lab(name){ // octave を落として表示名に
  const m=/^([A-G])([#b]?)/.exec(name);
  return state.jp ? JP[m[1]]+m[2] : m[1]+m[2];
}
const COL = {root:'#1e40af', ct:'#2563eb', ten:'#ea580c', pass:'#9ca3af', lh:'#0f766e'};
function roleCls(r){ if(r==='R') return 'root'; if(r==='経') return 'pass'; if(/9|11|13/.test(r)) return 'ten'; return 'ct'; }

/* ============ コード定義 ============ */
const CH = {
  D7:{sym:'D△7',deg:'Ⅳ△7',bass:'D2',
    rh:['D4','F#4','A4','C#5'],rr:['R','3','5','7'],
    smooth:['D4','F#4','A4','C#5'],sr:['R','3','5','7'],
    guide:['F#3','C#4'],gr:['3','7'],
    lh:['D2','D3'],lr:['R','R'],
    ten:{sym:'D△9',rh:['C#4','E4','F#4','A4'],rr:['7','9','3','5'],note:'E(9th)を足すだけで一気に「おしゃれ」な響きに。'},
    scale:'Dリディアン(=Aメジャーを D から)'},
  C7:{sym:'C#7',deg:'Ⅲ7',bass:'C#2',
    rh:['C#4','E#4','G#4','B4'],rr:['R','3','5','♭7'],
    smooth:['C#4','E#4','G#4','B4'],sr:['R','3','5','♭7'],
    guide:['E#3','B3'],gr:['3','♭7'],
    lh:['C#2','C#3'],lr:['R','R'],
    ten:{sym:'C#7(♭9,♭13)',rh:['E#4','A4','B4','D5'],rr:['3','♭13','♭7','♭9'],note:'1小節目の「ファ・ラ・シ・レ」がこれ。ルート・5度は弾かず、3rd+テンションだけ。'},
    scale:'C#ミクソリディアン♭9♭13 = F#ハーモニックマイナーを C# から'},
  F7:{sym:'F#m7',deg:'Ⅵm7',bass:'F#2',
    rh:['F#3','A3','C#4','E4'],rr:['R','♭3','5','♭7'],
    smooth:['C#4','E4','F#4','A4'],sr:['5','♭7','R','♭3'],
    guide:['A3','E4'],gr:['♭3','♭7'],
    lh:['F#2','E3'],lr:['R','♭7'],
    ten:{sym:'F#m9',rh:['A3','C#4','E4','G#4'],rr:['♭3','5','♭7','9'],note:'2小節目の上昇アルペジオ(ソ#ラド#ミソ#シ)の元になるコード。'},
    scale:'F#ドリアン(F# G# A B C# D# E)= Eメジャーと同じ音を F# から'},
  A7:{sym:'A7',deg:'Ⅰ7',bass:'A2',
    rh:['A3','C#4','E4','G4'],rr:['R','3','5','♭7'],
    smooth:['C#4','E4','G4','A4'],sr:['3','5','♭7','R'],
    guide:['C#4','G4'],gr:['3','♭7'],
    lh:['A2','G3'],lr:['R','♭7'],
    ten:{sym:'A7sus4(9,13)',rh:['B3','D4','F#4','G4'],rr:['9','11','13','♭7'],note:'5.75拍の「シ・レ・ファ#・ソ」。3rd(ド#)を避けて sus 的に浮かせている。'},
    scale:'Aミクソリディアン(A B C# D E F# G)'},
  G7:{sym:'G#m7',deg:'Ⅶm7',bass:'G#2',
    rh:['G#3','B3','D#4','F#4'],rr:['R','♭3','5','♭7'],
    smooth:['G#3','B3','D#4','F#4'],sr:['R','♭3','5','♭7'],
    guide:['B3','F#4'],gr:['♭3','♭7'],
    lh:['G#2','F#3'],lr:['R','♭7'],
    ten:{sym:'G#m7(11)',rh:['B3','D#4','F#4','C#5'],rr:['♭3','5','♭7','11'],note:'9.75拍の「シ・レ#・ファ#」は B のトライアドだが、G# が下にあるので G#m7 として響く。'},
    scale:'G#エオリアン = Bメジャーの音(G# A# B C# D# E F#)。E や C# は ♭13th・11th として出てくる'}
};
const CARDS_A = ['D7','C7','F7','A7'];



/* ============ イントロ全体のコード・タイムライン ============ */
/* コードごとの「役割ラベル」とスケール(鍵盤図用) */
const ROLE_D  ={'D':'R','F#':'3','A':'5','C#':'7','E':'9','B':'13','G#':'#11'};
const ROLE_C  ={'C#':'R','E#':'3','G#':'5','B':'♭7','D':'♭9','A':'♭13','E':'#9','F#':'11'};
const ROLE_F  ={'F#':'R','A':'♭3','C#':'5','E':'♭7','G#':'9','B':'11','D#':'13'};
const ROLE_A  ={'A':'R','C#':'3','E':'5','G':'♭7','B':'9','D':'11','F#':'13'};
const ROLE_G  ={'G#':'R','B':'♭3','D#':'5','F#':'♭7','C#':'11','E':'♭13','A#':'9'};
const SC_D={name:'Dリディアン(D E F# G# A B C#)',notes:['D','E','F#','G#','A','B','C#']};
const SC_C={name:'F#ハーモニックマイナーを C# から(C# D E# F# G# A B)',notes:['C#','D','E#','F#','G#','A','B']};
const SC_F={name:'F#ドリアン(F# G# A B C# D# E)',notes:['F#','G#','A','B','C#','D#','E']};
const SC_A={name:'Aミクソリディアン(A B C# D E F# G)',notes:['A','B','C#','D','E','F#','G']};
const SC_G={name:'G#エオリアン = Bメジャーの音(G# A# B C# D# E F#)',notes:['G#','A#','B','C#','D#','E','F#']};
const TL_DEF = {
  'D△7':   {sym:'D△7',deg:'Ⅳ△7', tones:['D','F#','A','C#'],tens:['E','B','G#'],roles:ROLE_D,scale:SC_D},
  'C#7alt':{sym:'C#7alt',deg:'Ⅲ7', tones:['C#','E#','G#','B'],tens:['D','A','E','F#'],roles:ROLE_C,scale:SC_C},
  'F#m9':  {sym:'F#m9',deg:'Ⅵm9',  tones:['F#','A','C#','E'],tens:['G#','B','D#'],roles:ROLE_F,scale:SC_F},
  'A13sus':{sym:'A13sus4',deg:'Ⅰ7', tones:['A','C#','E','G'],tens:['B','D','F#'],roles:ROLE_A,scale:SC_A},
  'D△9':   {sym:'D△9',deg:'Ⅳ△9',  tones:['D','F#','A','C#'],tens:['E','B','G#'],roles:ROLE_D,scale:SC_D},
  'G#m7':  {sym:'G#m7',deg:'Ⅶm7',  tones:['G#','B','D#','F#'],tens:['C#','E'],roles:ROLE_G,scale:SC_G},
  'C#7':   {sym:'C#7',deg:'Ⅲ7',    tones:['C#','E#','G#','B'],tens:['D','A','E','F#'],roles:ROLE_C,scale:SC_C},
  'F#m7':  {sym:'F#m7',deg:'Ⅵm7',  tones:['F#','A','C#','E'],tens:['G#','B','D#'],roles:ROLE_F,scale:SC_F},
  'A9sus4':{sym:'A9sus4',deg:'Ⅰ7', tones:['A','C#','E','G'],tens:['B','D','F#'],roles:ROLE_A,scale:SC_A},
  'A/F#':  {sym:'A/F#',deg:'',      tones:['A','C#','E','F#'],tens:[]},
  'G#/F':  {sym:'G#/F',deg:'',      tones:['G#','B#','D#','E#'],tens:[]},
  'G/E':   {sym:'G/E',deg:'',       tones:['G','B','D','E'],tens:[]}
};
const TL = [
  [0,'D△7'],[1.75,'C#7alt'],[3.75,'F#m9'],[5.75,'A13sus'],
  [8,'D△9'],[9.75,'G#m7'],[11,'C#7'],[12,'F#m7'],[13.75,'A9sus4'],
  [16,'D△9'],[17.75,'C#7alt'],[19.75,'F#m9'],[21.75,'A13sus'],
  [24,'D△9'],[25.75,'G#m7'],[27,'C#7'],[28,'A/F#'],[28.5,'G#/F'],[29,'G/E']
].map(([b,k])=>{
  const d=TL_DEF[k], rp={};
  Object.entries(d.roles||{}).forEach(([n,r])=>{rp[pcOf(n)]=r;});
  return {start:Math.round(b*96),key:k,...d,
    tp:d.tones.map(pcOf),np:d.tens.map(pcOf),rp,
    scaleSet:d.scale?new Set(d.scale.notes.map(pcOf)):null,
    scaleName:d.scale?d.scale.name:'(スケールではなく、コード全体を半音ずつ平行移動)'};
});
function chordAt(tick){let c=TL[0];for(const e of TL){if(e.start<=tick)c=e;else break;}return c;}
function roleOf(p,tick){
  const c=chordAt(tick),pc=p%12;
  if(c.tp.includes(pc))return 'ct'; if(c.np.includes(pc))return 'ten'; return 'pass';
}

/* スケール練習カード用(右手=8分音符で上行、左手=ルート) */
function scaleCard(sym,deg,bass,name,notes,roleMap,note){
  return {sym,deg,bass,sn:notes,sr:notes.map(n=>roleMap[n.replace(/\d/,'')]||''),snote:note+'('+name+')'};
}
const SCALE_CARDS = [
  scaleCard('Dリディアン','D△7 のとき','D2','D E F# G# A B C#',['D4','E4','F#4','G#4','A4','B4','C#5','D5'],ROLE_D,'Aメジャーと同じ7音を D から。'),
  scaleCard('C# ミクソ♭9♭13','C#7 のとき','C#2','C# D E# F# G# A B',['C#4','D4','E#4','F#4','G#4','A4','B4','C#5'],ROLE_C,'F#ハーモニックマイナーを C# から。ミがファ(E#)になるのが特徴。'),
  scaleCard('F#ドリアン','F#m7 のとき','F#2','F# G# A B C# D# E',['F#3','G#3','A3','B3','C#4','D#4','E4','F#4'],ROLE_F,'Eメジャーと同じ7音を F# から。レ#(13th)が特徴。'),
  scaleCard('Aミクソリディアン','A7 のとき','A2','A B C# D E F# G',['A3','B3','C#4','D4','E4','F#4','G4','A4'],ROLE_A,'Dメジャーと同じ7音を A から。ソ(♭7)が特徴。'),
  scaleCard('G#エオリアン','G#m7 のとき','G#2','G# A# B C# D# E F#',['G#3','A#3','B3','C#4','D#4','E4','F#4','G#4'],ROLE_G,'Bメジャーと同じ7音を G# から。')
];

/* ============ フレーズの「形」を別コードへ移す ============ */
// d: コードトーン番号→音名 / rl: 表示ラベル / app: 3rdの半音下の接近音 / lo: 右手の最低音の目安(MIDI)
// app=3rdの半音下 / au=3rdの半音上(どちらもスケール外のことがある=経過音)
const PH_CHORDS = {
  'D△9': {sym:'D△9',deg:'Ⅳ△9',bass:'D2',lo:50,d:{R:'D','3':'F#','5':'A','7':'C#','9':'E','11':'G#'},rl:{R:'R','3':'3','5':'5','7':'7','9':'9','11':'#11'},app:'F',au:'G'},
  'G#m7':{sym:'G#m7(9)',deg:'Ⅶm7',bass:'G#2',lo:50,d:{R:'G#','3':'B','5':'D#','7':'F#','9':'A#','11':'C#'},rl:{R:'R','3':'♭3','5':'5','7':'♭7','9':'9','11':'11'},app:'A#',ar:'9',au:'C'},
  'F#m9':{sym:'F#m9',deg:'Ⅵm9',bass:'F#2',lo:50,d:{R:'F#','3':'A','5':'C#','7':'E','9':'G#','11':'B'},rl:{R:'R','3':'♭3','5':'5','7':'♭7','9':'9','11':'11'},app:'G#',ar:'9',au:'A#'},
  'C#7': {sym:'C#7(♭9)',deg:'Ⅲ7',bass:'C#2',lo:58,d:{R:'C#','3':'E#','5':'G#','7':'B','9':'D'},rl:{R:'R','3':'3','5':'5','7':'♭7','9':'♭9'},app:'E',au:'F#'},
  'A7':  {sym:'A7(9)',deg:'Ⅰ7',bass:'A2',lo:58,d:{R:'A','3':'C#','5':'E','7':'G','9':'B'},rl:{R:'R','3':'3','5':'5','7':'♭7','9':'9'},app:'C',au:'D'}
};
const PH_ALL5=['D△9','G#m7','F#m9','C#7','A7'];
// 最後のステップ用: 実譜の形を別コードへ移す
const PH_REAL = [
  {title:'形1「3rd の半音下から入って、3→5→7→9 と駆け上がる」(実譜3小節目の形)',
   desc:'実譜3小節目(ファ→ファ#→ラ→ド#→ミ)を別のコードに移す。「接近音(灰)→3rd→5th→7th→9th」。5つのコードすべてで自然に響く。',
   dir:'up',seq:['app','3','5','7','9'],chords:PH_ALL5,
   note:{'D△9':'実譜3小節目と同じ音。','G#m7':'接近音は 9th のラ#。','F#m9':'接近音は 9th のソ#。','C#7':'接近音はミ(E)。9th は ♭9(レ)になる。','A7':'接近音はド(ナチュラル)。'}}
];
const PH_EXT = [
  {title:'形2「3→5→7→9 と上がって 7→5 と戻る」(往復)',
   desc:'形1から接近音を外し、上がってからコードトーンで折り返す。「戻る」動きでフレーズに呼吸が生まれる。',
   dir:'up',seq:['3','5','7','9','7<','5<'],chords:PH_ALL5,
   note:{}},
  {title:'形3「3rd を上と下の半音で挟む」(囲い込み)',
   desc:'3rd の半音上 → 半音下 → 3rd → 5th → 7th。挟む2音はスケール外でも、すぐ 3rd に解決するので気にならない。',
   dir:'up',seq:['appU','app<','3','5','7'],chords:PH_ALL5,
   note:{'D△9':'ソ(上)→ファ(下)→ファ#。','G#m7':'ド(上)→ラ#(下)→シ。','F#m9':'ラ#(上)→ソ#(下)→ラ。','C#7':'ファ#(上)→ミ(下)→ファ(E#)。','A7':'レ(上)→ド(下)→ド#。'}}
];
/* 各形の元ネタ(intro.json と照合済み)。bars は 0 始まりの小節番号(表示は +1) */
const GEN_TXT='実譜にはない一般的な型(こちらで用意したもの)。';
const PH_SRC = {
  '形1':{bars:[2],text:'実譜 小節3(拍8.5〜9.25):ファ→ファ#→ラ→ド#→ミ。'},
  '形2':{generic:true,text:GEN_TXT},
  '形3':{generic:true,text:GEN_TXT}
};
/* ============ 転回形 ============ */
// 4和音(ルート・3rd・5th・7th)の並べ替え。一番下の音=lo(MIDI56)以上で最も近い音、残りはその上に積む
const INV_LABELS=[
  {l:'基本形',n:'ルートが一番下。いちばん安定した形。まずここから。'},
  {l:'第1転回',n:'3rd が一番下。基本形のルートを1オクターブ上に移した形。'},
  {l:'第2転回',n:'5th が一番下。基本形のルートと 3rd を1オクターブ上に移した形。'},
  {l:'第3転回',n:'7th が一番下。7th とルートが隣り合うので、半音・全音のぶつかりが近くで聞こえる。'}
];
function buildInversions(key){
  const C=CH[key]; const names=C.rh.map(n=>n.replace(/\d/,'')); const lo=56;
  return INV_LABELS.map((iv,k)=>{
    const nm=[...names.slice(k),...names.slice(0,k)], rr=[...C.rr.slice(k),...C.rr.slice(0,k)];
    let prev=null; const rh=nm.map(n=>{ const m=prev===null?pitchAt(n,{min:lo}):pitchAt(n,{above:prev}); prev=m; return nameOfMidi(n,m); });
    return {sym:C.sym,deg:C.deg,bass:C.bass,rh,rr,ilabel:iv.l,inote:iv.n};
  });
}
function invGroup(key){
  const C=CH[key]; const names=C.rh.map(n=>n.replace(/\d/,'')).join('・');
  return {kind:'inv',title:`${C.sym}(${C.deg})の転回形`,desc:`構成音: ${names}(ルート・3rd・5th・7th)`,list:buildInversions(key)};
}
function phGroup(ph){ return {title:ph.title,desc:ph.desc,src:PH_SRC[ph.title.slice(0,2)],list:ph.chords.map(c=>buildPhrase(ph,c))}; }
function pitchAt(name,cond){
  const pc=pcOf(name); let m;
  if(cond.below!==undefined){ m=cond.below-1; while(((m%12)+12)%12!==pc) m--; }
  else { m=cond.min!==undefined?cond.min:cond.above+1; while(m%12!==pc) m++; }
  return m;
}
function nameOfMidi(name,midi){
  const m=/^([A-G])([#b]?)/.exec(name); const adj=m[2]==='#'?1:m[2]==='b'?-1:0;
  return m[1]+m[2]+(Math.floor((midi-PCN[m[1]]-adj)/12)-1);
}
function buildPhrase(ph,cn){
  const C=PH_CHORDS[cn]; let prev=null; const sn=[],sr=[];
  ph.seq.forEach(tk0=>{
    const back=tk0.endsWith('<'), tk=tk0.replace('<','');   // '<' = 直前より下の音を選ぶ
    const nm=tk==='app'?C.app:tk==='appU'?C.au:C.d[tk];
    const goDown=back||ph.dir==='down';
    const midi=prev===null?pitchAt(nm,{min:ph.dir==='down'?C.lo+9:C.lo}):pitchAt(nm,goDown?{below:prev}:{above:prev});
    prev=midi; sn.push(nameOfMidi(nm,midi));
    sr.push(tk==='app'?(C.ar||'経'):tk==='appU'?'経':C.rl[tk]);
  });
  return {sym:C.sym,deg:C.deg,bass:C.bass,sn,sr,snote:(ph.note&&ph.note[cn])||''};
}

/* ============ 音 ============ */
let AC=null;
function audio(){ if(!AC) AC=new (window.AudioContext||window.webkitAudioContext)(); if(AC.state==='suspended') AC.resume(); return AC; }
function stopAll(){ if(AC){try{AC.close();}catch(e){} AC=null; } }
function tone(m,t,d,v){
  const a=audio(), o=a.createOscillator(), o2=a.createOscillator(), g=a.createGain();
  const f=440*Math.pow(2,(m-69)/12);
  o.type='triangle'; o2.type='sine'; o.frequency.value=f; o2.frequency.value=f*2;
  const g2=a.createGain(); g2.gain.value=.25; o2.connect(g2); g2.connect(g);
  o.connect(g); g.connect(a.destination);
  const vol=(v||.16);
  g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(vol,t+.01);
  g.gain.exponentialRampToValueAtTime(vol*.3,t+Math.max(d,.15));
  g.gain.linearRampToValueAtTime(0,t+Math.max(d,.15)+.15);
  o.start(t); o2.start(t); o.stop(t+Math.max(d,.15)+.2); o2.stop(t+Math.max(d,.15)+.2);
}
function playItems(items,opt){ // {m, at(拍), d(拍), v(音量の倍率・省略可)}  opt.base=基本音量
  stopAll(); const a=audio(); const t0=a.currentTime+.06, spb=60/state.bpm;
  const n=Math.max(1,items.length); const v=(opt&&opt.base)||Math.min(.2,.9/Math.sqrt(n)*.5);
  items.forEach(it=>tone(it.m,t0+it.at*spb,it.d*spb,v*(it.v===undefined?1:it.v)));
}
function playBars(b0,b1,src){
  const t0=b0*384,t1=(b1+1)*384;
  playItems((src||INTRO_NOTES).filter(n=>n.on>=t0&&n.on<t1).map(n=>({m:n.p,at:(n.on-t0)/96,d:n.du/96})));
}

/* ============ 鍵盤SVG ============ */
function normRange(minM,maxM){ // C 始まり〜B 終わりに揃え、最低2オクターブにする
  let lo=minM-minM%12, hi=maxM-maxM%12+11;
  while(hi-lo<23) hi+=12;
  return [lo,hi];
}
/* hl: {midi:{cls,txt}}  opt: {range:[lo,hi], scale:Set(pc), played:Set(midi)} */
function keyboard(hl,opt){
  opt=opt||{};
  const ms=Object.keys(hl).map(Number).concat(opt.range||[]);
  const [lo,hi]=normRange(Math.min(...ms),Math.max(...ms));
  const sc=opt.scale, pl=opt.played;
  const W=17,H=64,BH=40,BW=10;
  const white=[]; for(let m=lo;m<=hi;m++) if([0,2,4,5,7,9,11].includes(m%12)) white.push(m);
  const wx=m=>white.indexOf(m)*W;
  let s=`<svg viewBox="0 0 ${white.length*W} ${H+2}" style="max-width:${Math.round(white.length*W*1.15)}px" xmlns="http://www.w3.org/2000/svg" role="img">`;
  white.forEach(m=>{
    const h=hl[m]; const x=wx(m); const inSc=sc&&sc.has(m%12);
    s+=`<rect x="${x}" y="1" width="${W}" height="${H}" fill="${h?COL[h.cls]:(inSc?'#dbe7ff':'#fff')}" stroke="#9aa3af" stroke-width=".8"/>`;
    if(h&&h.txt) s+=`<text x="${x+W/2}" y="${H-6}" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">${h.txt}</text>`;
    else if(!h&&m%12===0) s+=`<text x="${x+W/2}" y="${H-5}" text-anchor="middle" font-size="7.5" fill="#9aa3af">C${Math.floor(m/12)-1}</text>`;
  });
  for(let m=lo;m<=hi;m++){
    if(![1,3,6,8,10].includes(m%12)) continue;
    const x=wx(m-1)+W-BW/2; const h=hl[m]; const inSc=sc&&sc.has(m%12);
    s+=`<rect x="${x}" y="1" width="${BW}" height="${BH}" rx="1.5" fill="${h?COL[h.cls]:(inSc?'#6f86bd':'#222')}" stroke="#111" stroke-width=".6"/>`;
    if(h&&h.txt) s+=`<text x="${x+BW/2}" y="${BH-5}" text-anchor="middle" font-size="7.5" font-weight="700" fill="#fff">${h.txt}</text>`;
  }
  if(pl){ // 実際に弾く音=白丸
    pl.forEach(m=>{
      if(m<lo||m>hi) return;
      const black=[1,3,6,8,10].includes(m%12);
      const cx=black?wx(m-1)+W:wx(m)+W/2, cy=black?BH-17:H-21, r=black?3.4:4.2;
      s+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="#111" stroke-width="1.4"/>`;
    });
  }
  return s+'</svg>';
}

/* ============ VexFlow ============ */
const VF = (window.Vex&&Vex.Flow)||null;
function vfKeyOf(name){const p=parseN(name);return p.l.toLowerCase()+'/'+p.o;} // アクシデンタルは別付け

/* コード1つ分のグランドスタッフ(小節1つ) */
function renderChordStaff(el,spec){
  if(!VF){el.innerHTML='<span class="err">VexFlow を読み込めませんでした</span>';return;}
  const {Renderer,Stave,StaveNote,Voice,Formatter,Accidental,Beam,StaveConnector}=VF;
  const W=330,Ht=250;
  const r=new Renderer(el,Renderer.Backends.SVG); r.resize(W,Ht); const ctx=r.getContext();
  const top=new Stave(34,24,W-44); top.addClef('treble'); top.setContext(ctx).draw();
  const bot=new Stave(34,124,W-44); bot.addClef('bass'); bot.setContext(ctx).draw();
  new StaveConnector(top,bot).setType(StaveConnector.type.BRACE).setContext(ctx).draw();
  new StaveConnector(top,bot).setType(StaveConnector.type.SINGLE_LEFT).setContext(ctx).draw();
  new StaveConnector(top,bot).setType(StaveConnector.type.SINGLE_RIGHT).setContext(ctx).draw();

  const accState={};
  function mk(items,clef,dur,restKey){ // items: [{n,role}]
    if(!items.length) return new StaveNote({clef,keys:[restKey],duration:dur+'r',align_center:dur==='w'});
    const sorted=items.map(i=>({...i,p:parseN(i.n)})).sort((a,b)=>a.p.midi-b.p.midi);
    const sn=new StaveNote({clef,keys:sorted.map(i=>vfKeyOf(i.n)),duration:dur});
    sorted.forEach((i,idx)=>{
      const k=i.p.l+i.p.o; const cur=accState[k]||'';
      if(i.p.acc!==cur){ sn.addModifier(new Accidental(i.p.acc===''?'n':i.p.acc),idx); accState[k]=i.p.acc; }
      const c=COL[i.cls]; sn.setKeyStyle(idx,{fillStyle:c,strokeStyle:c});
    });
    return sn;
  }
  let rhNotes=[],lhNotes=[];
  if(spec.pattern==='scale'){
    rhNotes=spec.rh.map(i=>mk([i],'treble','8','b/4'));
    while(rhNotes.length<8) rhNotes.push(new StaveNote({clef:'treble',keys:['b/4'],duration:'8r'}));
  } else if(spec.pattern==='arp'){
    const seq=spec.rh; const n=seq.length; let order=[];
    for(let i=0;i<n;i++)order.push(i); for(let i=n-2;i>=(n===4?0:1);i--)order.push(i);
    order=order.slice(0,8);
    order.forEach(i=>rhNotes.push(mk([seq[i]],'treble','8','b/4')));
    while(rhNotes.length<8) rhNotes.push(new StaveNote({clef:'treble',keys:['b/4'],duration:'8r'}));
  } else if(spec.rh.length){
    rhNotes=[mk(spec.rh,'treble','w','b/4')];
  } else rhNotes=[new StaveNote({clef:'treble',keys:['b/4'],duration:'wr',align_center:true})];
  lhNotes=spec.lh.length?[mk(spec.lh,'bass','w','d/3')]:[new StaveNote({clef:'bass',keys:['d/3'],duration:'wr',align_center:true})];

  const vR=new Voice({num_beats:4,beat_value:4}).setMode(Voice.Mode.SOFT).addTickables(rhNotes);
  const vL=new Voice({num_beats:4,beat_value:4}).setMode(Voice.Mode.SOFT).addTickables(lhNotes);
  let beams=[];
  if(spec.pattern==='arp'||spec.pattern==='scale'){ try{beams=Beam.generateBeams(rhNotes);}catch(e){} } // 音符を描く前に作る(フラッグを消すため)
  const fm=new Formatter(); fm.joinVoices([vR]); fm.joinVoices([vL]);
  fm.format([vR,vL],top.getNoteEndX()-top.getNoteStartX()-24);
  vR.draw(ctx,top); vL.draw(ctx,bot);
  beams.forEach(b=>b.setContext(ctx).draw());
}

/* コードカード */
function makeCard(ch,kind){
  const spec={pattern:kind==='arp'?'arp':(kind==='scale'||kind==='phrase')?'scale':'block',lh:[],rh:[]};
  let title=ch.sym,note='';
  const L=(names,roles)=>names.map((n,i)=>({n,role:roles[i],cls:'lh'}));
  const R=(names,roles)=>names.map((n,i)=>({n,role:roles[i],cls:roleCls(roles[i])}));
  const bass=[{n:ch.bass,role:'R',cls:'lh'}];
  switch(kind){
    case 'root': spec.lh=bass; spec.pattern='block'; break;
    case 'block': spec.lh=bass; spec.rh=R(ch.rh,ch.rr); break;
    case 'arp': spec.lh=bass; spec.rh=R(ch.rh,ch.rr); break;
    case 'smooth': spec.lh=bass; spec.rh=R(ch.smooth,ch.sr); break;
    case 'guide': spec.lh=bass; spec.rh=R(ch.guide,ch.gr); break;
    case 'lh': spec.lh=L(ch.lh,ch.lr); break;
    case 'scale': spec.lh=bass; spec.rh=R(ch.sn,ch.sr); note=ch.snote; break;
    case 'phrase': spec.lh=bass; spec.rh=R(ch.sn,ch.sr); note=ch.snote; break;
    case 'inv': spec.lh=bass; spec.rh=R(ch.rh,ch.rr); title=ch.sym+' '+ch.ilabel; note=ch.inote; break;
    case 'tension': spec.lh=bass; spec.rh=R(ch.ten.rh,ch.ten.rr); title=ch.ten.sym; note=ch.ten.note; break;
  }
  const card=document.createElement('div'); card.className='card';
  const hl={}; [...spec.lh,...spec.rh].forEach(i=>{hl[parseN(i.n).midi]={cls:i.cls,txt:i.role};});
  const names=(arr)=>arr.map(i=>lab(i.n)+(i.role?`<small>(${i.role})</small>`:'')).join(' ');
  card.innerHTML=`<div class="h"><b>${title}</b><span class="deg">${ch.deg}</span><button class="btn">▶ 鳴らす</button></div>
    <div class="staff"></div><div class="kb">${keyboard(hl)}</div>
    <div class="names">${spec.rh.length?'右手: '+names(spec.rh)+'　':''}左手: ${names(spec.lh)}</div>
    ${note?`<div class="note">${note}</div>`:''}`;
  try{renderChordStaff(card.querySelector('.staff'),spec);}catch(e){card.querySelector('.staff').innerHTML='<span class="err">譜面の描画に失敗: '+e.message+'</span>';console.error(e);}
  card.querySelector('button').onclick=()=>{
    const items=[]; spec.lh.forEach(i=>items.push({m:parseN(i.n).midi,at:0,d:kind==='arp'?4:kind==='scale'?8:2}));
    if(kind==='scale'){
      const seq=spec.rh.map(i=>parseN(i.n).midi); const ord=[...seq,...seq.slice(0,-1).reverse()];
      ord.forEach((m,k)=>items.push({m,at:k*.5,d:.5}));
    } else if(kind==='phrase'){
      spec.rh.forEach((i,k)=>items.push({m:parseN(i.n).midi,at:k*.5,d:.5}));
    } else if(kind==='arp'){
      const seq=spec.rh.map(i=>parseN(i.n).midi); const n=seq.length; let ord=[];
      for(let i=0;i<n;i++)ord.push(i); for(let i=n-2;i>=(n===4?0:1);i--)ord.push(i);
      ord.slice(0,8).forEach((ix,k)=>items.push({m:seq[ix],at:k*.5,d:.5}));
    } else spec.rh.forEach(i=>items.push({m:parseN(i.n).midi,at:0,d:2}));
    playItems(items);
  };
  return card;
}

/* ============ イントロ実譜(小節単位) ============ */
const DURS=[[384,'w',0],[288,'h',1],[192,'h',0],[144,'q',1],[96,'q',0],[72,'8',1],[48,'8',0],[36,'16',1],[24,'16',0],[12,'32',0]];
function pickDur(pos,rem,align){
  for(const d of DURS){ const v=d[0]; if(v>rem) continue;
    if(align){const base=d[2]?v*2/3:v; if(pos%base!==0) continue;}
    return d; }
  return null;
}
function pushRests(evs,from,to){
  while(from<to){ const d=pickDur(from,to-from,true); if(!d)break; evs.push({pos:from,dur:d[0],s:d[1],dot:d[2],notes:null}); from+=d[0]; }
}
/* 簡略版の元データ: 'stab'=右手は和音(同時2音以上)だけ / 'melody'=右手は単音のコードトーン・テンションだけ */
function srcFor(mode){
  if(!mode) return INTRO_NOTES;
  const L=INTRO_NOTES.filter(n=>n.h==='L'), grp=new Map();
  INTRO_NOTES.filter(n=>n.h==='R').forEach(n=>{ if(!grp.has(n.on))grp.set(n.on,[]); grp.get(n.on).push(n); });
  const keep=[];
  grp.forEach(g=>{
    if(mode==='stab'){ if(g.length>=2) keep.push(...g); }
    else if(mode==='melody'){ if(g.length===1&&g[0].du>=24&&roleOf(g[0].p,g[0].on)!=='pass') keep.push(g[0]); }
  });
  return [...L,...keep];
}
function barEvents(hand,bar,src){
  const t0=bar*384,t1=t0+384;
  const by=new Map();
  (src||INTRO_NOTES).forEach(n=>{ if(n.h===hand&&n.on>=t0&&n.on<t1){ if(!by.has(n.on))by.set(n.on,[]); by.get(n.on).push(n);} });
  const ons=[...by.keys()].sort((a,b)=>a-b); const evs=[]; let cur=0;
  ons.forEach((on,i)=>{
    const pos=on-t0; if(pos>cur) pushRests(evs,cur,pos);
    const g=by.get(on); const maxd=Math.max(...g.map(n=>n.du));
    const next=i+1<ons.length?ons[i+1]-t0:384;
    const lim=Math.min(maxd,next-pos,384-pos);
    let d,trip=false;
    if(lim===16){d=[16,'16',0];trip=true;} else d=pickDur(pos,lim,false);
    evs.push({pos,dur:d[0],s:d[1],dot:d[2],notes:g,trip,tick:on});
    cur=pos+d[0];
  });
  if(cur<384) pushRests(evs,cur,384);
  return evs;
}
function buildHand(evs,hand){
  const {StaveNote,Voice,Accidental,Tuplet,Dot}=VF;
  const clef=hand==='R'?'treble':'bass';
  const notes=[],tups=[]; let tgrp=[];
  evs.forEach(ev=>{
    const dur=ev.s+(ev.dot?'d':'');
    let sn;
    if(!ev.notes){ sn=new StaveNote({clef,keys:[hand==='R'?'b/4':'d/3'],duration:dur+'r'}); }
    else{
      const ps=[...new Set(ev.notes.map(n=>n.p))].sort((a,b)=>a-b);
      const keys=ps.map(p=>{const nm=midiName(p);return nm[0].toLowerCase()+(nm[1]==='#'?'#':'')+'/'+(Math.floor(p/12)-1);});
      sn=new StaveNote({clef,keys,duration:dur});
      ps.forEach((p,i)=>{ const c=state.color?COL[roleOf(p,ev.tick)]:'#000'; sn.setKeyStyle(i,{fillStyle:c,strokeStyle:c}); });
    }
    if(ev.dot) Dot.buildAndAttach([sn],{all:true});
    ev.sn=sn; notes.push(sn);
    if(ev.trip){ tgrp.push(sn); if(tgrp.length===3){tups.push(new Tuplet(tgrp));tgrp=[];} } else tgrp=[];
  });
  const v=new Voice({num_beats:4,beat_value:4}).setMode(Voice.Mode.SOFT).addTickables(notes);
  Accidental.applyAccidentals([v],'A');
  return {notes,v,tups};
}
function renderBar(el,bar,opt){
  const {Renderer,Stave,StaveNote,Voice,Formatter,Accidental,Beam,Tuplet,Dot,StaveConnector}=VF;
  const evR=barEvents('R',bar,opt.src), evL=barEvents('L',bar,opt.src);
  const nEv=Math.max(evR.filter(e=>e.notes).length,evL.filter(e=>e.notes).length,6);
  const W=Math.min(980,Math.max(480,170+nEv*34)), Ht=270;
  const r=new Renderer(el,Renderer.Backends.SVG); r.resize(W,Ht); const ctx=r.getContext();
  const top=new Stave(8,40,W-18); top.addClef('treble').addKeySignature('A'); if(bar===opt.first)top.addTimeSignature('4/4');
  const bot=new Stave(8,140,W-18); bot.addClef('bass').addKeySignature('A'); if(bar===opt.first)bot.addTimeSignature('4/4');
  top.setContext(ctx).draw(); bot.setContext(ctx).draw();
  new StaveConnector(top,bot).setType(StaveConnector.type.BRACE).setContext(ctx).draw();
  new StaveConnector(top,bot).setType(StaveConnector.type.SINGLE_LEFT).setContext(ctx).draw();
  new StaveConnector(top,bot).setType(StaveConnector.type.SINGLE_RIGHT).setContext(ctx).draw();

  const R=buildHand(evR,'R'), L=buildHand(evL,'L');
  [R,L].forEach(X=>{ X.beams=[]; try{X.beams=Beam.generateBeams(X.notes);}catch(e){} }); // 音符を描く前に作る(フラッグを消すため)
  const fm=new Formatter(); fm.joinVoices([R.v]); fm.joinVoices([L.v]);
  fm.format([R.v,L.v],top.getNoteEndX()-top.getNoteStartX()-26);
  R.v.draw(ctx,top); L.v.draw(ctx,bot);
  [R,L].forEach(X=>{ X.beams.forEach(b=>b.setContext(ctx).draw()); X.tups.forEach(t=>t.setContext(ctx).draw()); });

  // コード名ラベル
  const t0=bar*384; let lastX=-99,flip=0;
  ctx.setFont('sans-serif',12,'bold');
  if(!TL.some(e=>e.start===t0)){ // 前の小節から続いているコードを薄く表示
    const f0=[...evR,...evL].filter(ev=>ev.notes).sort((a,b)=>a.pos-b.pos)[0];
    if(f0){ lastX=f0.sn.getAbsoluteX()-4; ctx.setFillStyle('#9ca3af'); ctx.fillText(chordAt(t0).sym,lastX,28); }
  }
  TL.filter(e=>e.start>=t0&&e.start<t0+384).forEach(e=>{
    const pos=e.start-t0;
    const cand=[...evR,...evL].filter(ev=>ev.notes&&ev.pos>=pos).sort((a,b)=>a.pos-b.pos)[0];
    if(!cand) return;
    const x=cand.sn.getAbsoluteX()-4;
    flip=(x-lastX<48)?(flip?0:1):0; lastX=x;
    ctx.setFillStyle('#111'); ctx.fillText(e.sym,x,28-flip*13);
  });
}
/* コード e の上で notes ns を弾くときの鍵盤(コードトーン・テンション・スケール・実際に弾く音) */
function segKeyboard(e,ns){
  const [lo,hi]=normRange(Math.min(...ns.map(n=>n.p)),Math.max(...ns.map(n=>n.p)));
  const hl={};
  for(let m=lo;m<=hi;m++){
    const pc=m%12;
    if(e.tp.includes(pc)||e.np.includes(pc)){
      const r=e.rp[pc]; hl[m]={cls:r?roleCls(r):'ct',txt:r||''};
    }
  }
  return keyboard(hl,{range:[lo,hi],scale:e.scaleSet,played:new Set(ns.map(n=>n.p))});
}
/* 小節内のコード区間ごとに「鍵盤+弾く順」パネルを作る */
function segPanels(b){
  const t0=b*384,t1=t0+384; const wrap=document.createElement('div'); wrap.className='segs';
  TL.forEach((e,i)=>{
    const s=Math.max(e.start,t0), end=Math.min(i+1<TL.length?TL[i+1].start:1e9,t1);
    if(s>=end) return;
    const ns=INTRO_NOTES.filter(n=>n.on>=s&&n.on<end);
    if(!ns.length) return;
    const seq=(hand)=>{
      const by=new Map(); ns.filter(n=>n.h===hand).sort((a,c)=>a.on-c.on||a.p-c.p).forEach(n=>{ if(!by.has(n.on))by.set(n.on,[]); by.get(n.on).push(n); });
      return [...by.values()].map(g=>{
        const one=n=>`<span style="color:${COL[roleOf(n.p,n.on)]};font-weight:700">${lab(midiName(n.p))}</span>`;
        return g.length>1?'('+g.map(one).join(' ')+')':one(g[0]);
      }).join(' → ');
    };
    const p=document.createElement('div'); p.className='seg';
    p.innerHTML=`<div class="sh"><b>${e.sym}</b><span class="deg">${e.deg}</span><button class="btn">▶</button></div>
      <div class="sc">スケール: ${e.scaleName}</div>
      <div class="kb">${segKeyboard(e,ns)}</div>
      <div class="sq"><div><span class="tag">右手</span>${seq('R')||'—'}</div><div><span class="tag">左手</span>${seq('L')||'—'}</div></div>`;
    p.querySelector('button').onclick=()=>playItems(ns.map(n=>({m:n.p,at:(n.on-s)/96,d:n.du/96})));
    wrap.appendChild(p);
  });
  return wrap;
}
function kbLegend(){
  const lg=document.createElement('div'); lg.className='kblegend';
  lg.innerHTML=`<b>鍵盤の見方</b>:
    <span><span class="dot" style="background:var(--ct)"></span>コードトーン(R=ルート/3/5/7)</span>
    <span><span class="dot" style="background:var(--ten)"></span>テンション(9・11・13 など)</span>
    <span><span class="dot" style="background:#dbe7ff;border:1px solid #9aa3af"></span>スケール上の音</span>
    <span><span class="dot" style="background:#fff;border:2px solid #111"></span>この区間で実際に弾く音(色なし白鍵の丸=スケール外の経過音)</span>`;
  return lg;
}
function makeBarsView(b0,b1,opt){
  opt=opt||{};
  const box=document.createElement('div'); box.className='bars';
  if(opt.kb){
    box.appendChild(kbLegend());
  }
  for(let b=b0;b<=b1;b++){
    const d=document.createElement('div'); d.className='sbar';
    const chs=TL.filter(e=>e.start>=b*384&&e.start<(b+1)*384).map(e=>e.sym).join(' → ');
    d.innerHTML=`<div class="h"><b>小節${b+1}</b><button class="btn">▶</button><span>${chs}</span></div><div class="sv"></div>`;
    d.querySelector('button').onclick=()=>playBars(b,b,opt.src);
    d.querySelector('.h').appendChild(ptButton('bar-'+(b+1)+(opt.srcKey?'-'+opt.srcKey:''),()=>barsSong(b,b,opt.src,opt.srcLabel),'🎹 練習','piano-trainer でこの小節を練習(左右の手の切り替えも可)'));
    try{ renderBar(d.querySelector('.sv'),b,{first:b0,src:opt.src}); }catch(e){ d.querySelector('.sv').innerHTML='<span class="err">譜面の描画に失敗: '+e.message+'</span>'; console.error(e); }
    if(opt.kb) d.appendChild(segPanels(b));
    box.appendChild(d);
  }
  return box;
}

/* ============ 実譜の断片(短いフレーズ)カード ============ */
/* コード e の上で音 p(on で鳴る)が何の役割か。コードトーン/テンションなら度数、どちらでもなければ「経」 */
function roleTxt(p,on){
  const e=chordAt(on), pc=p%12;
  if(e.tp.includes(pc)||e.np.includes(pc)) return e.rp[pc]||'';
  return '経';
}
function renderFragStaff(el,rh,bar){
  const evs=barEvents('R',bar,rh);
  while(evs.length&&!evs[0].notes) evs.shift();
  while(evs.length&&!evs[evs.length-1].notes) evs.pop();
  drawEvStaff(el,evs,Math.min(...rh.map(n=>n.p)),Math.max(...rh.map(n=>n.p)),true);
}
/* 段階練習用:音の並び(8分音符・上行)だけの譜面。色はコード tick の上での役割 */
function renderSeqStaff(el,pitches,tick){
  drawEvStaff(el,pitches.map(p=>({s:'8',dot:0,notes:[{p}],tick})),Math.min(...pitches),Math.max(...pitches),false);
}
function drawEvStaff(el,evs,lowP,hiP,labels){
  const {Renderer,Stave,Formatter,Beam}=VF;
  const nEv=evs.filter(e=>e.notes).length;
  const topY=hiP>=81?52:42, W=Math.min(760,Math.max(300,110+nEv*46)), Ht=topY+(lowP<55?135:lowP<60?110:90)+(hiP>=72?40:0);
  const r=new Renderer(el,Renderer.Backends.SVG); r.resize(W,Ht); const ctx=r.getContext();
  const st=new Stave(2,topY,W-8); st.addClef('treble').addKeySignature('A'); st.setContext(ctx).draw();
  const X=buildHand(evs,'R');
  let beams=[]; try{beams=Beam.generateBeams(X.notes);}catch(e){} // 音符を描く前に作る(フラッグを消すため)
  const fm=new Formatter(); fm.joinVoices([X.v]);
  fm.format([X.v],st.getNoteEndX()-st.getNoteStartX()-22);
  X.v.draw(ctx,st);
  beams.forEach(b=>b.setContext(ctx).draw()); X.tups.forEach(t=>t.setContext(ctx).draw());
  // コード名ラベル(最初の音の上 + 途中でコードが変わる位置)
  const first=evs.find(e=>e.notes); if(!first||!labels) return;
  ctx.setFont('sans-serif',12,'bold'); ctx.setFillStyle('#111');
  const marks=[{tick:first.tick,sym:chordAt(first.tick).sym}];
  TL.forEach(e=>{ if(e.start>first.tick){ const c=evs.find(v=>v.notes&&v.tick>=e.start); if(c&&!marks.some(m=>m.tick===c.tick)) marks.push({tick:c.tick,sym:e.sym}); } });
  marks.forEach(m=>{ const ev=evs.find(v=>v.notes&&v.tick===m.tick); ctx.fillText(m.sym,ev.sn.getAbsoluteX()-4,topY-14); });
}
/* ============ piano-trainer 連携 ============ */
/* 曲データ(JSON)は json/ に置いてあり、piano-trainer へは ?song=<JSONのURL> で渡す。
   JSON は各ページの 🎹 ボタンが持つ build() から書き出したもの(exportSongs() 参照)。 */
const PT_URL='https://takahashishuuhei.github.io/apps/piano-practice/';
const JSON_BASE='https://takahashishuuhei.github.io/apps/marusa/json/';
const PT_BPM=80;   // JSON に入れる BPM(piano-trainer 側で変更できる)
const r3=x=>Math.round(x*1000)/1000;
function ptButton(name,build,label,title){
  const b=document.createElement('button'); b.className='btn pt'; b.textContent=label||'🎹 piano-trainer で練習';
  if(title) b.title=title;
  b._name=name; b._build=build;
  b.onclick=()=>{ window.open(PT_URL+'?song='+encodeURIComponent(JSON_BASE+name+'.json'),'_blank','noopener'); };
  return b;
}
/* 開いているページにあるボタンの曲データを {ファイル名:曲} で返す(json/ への書き出し用) */
function exportSongs(){
  const out={}; document.querySelectorAll('.btn.pt').forEach(b=>{ if(b._name) out[b._name]=b._build(); }); return out;
}
const sNote=(p,beat,dur,hand)=>({pitch:p,timing:{beat:r3(beat),duration:Math.max(.05,r3(dur))},velocity:80,hand});
const memoOf=(beat,text,color,align)=>({timing:{beat:r3(beat)},text,align:align||'center',color:color||'default'});
function memoColor(ns){ const rs=ns.map(n=>roleOf(n.p,n.on)); return rs.includes('ten')?'orange':rs.includes('ct')?'blue':'default'; }
function memoText(ns){
  const g=ns.map(n=>{ const r=roleTxt(n.p,n.on); return lab(midiName(n.p))+(r?`(${r})`:''); });
  return g.length>1?'('+g.join(' ')+')':g[0];
}
/* 窓 [w0,w1) に入るコードの開始位置にコード名メモ(紫) */
function chordMemos(w0,w1,toBeat){
  const out=[{tick:w0,e:chordAt(w0)}];
  TL.forEach(e=>{ if(e.start>w0&&e.start<w1) out.push({tick:e.start,e}); });
  return out.map(x=>memoOf(toBeat(x.tick),x.e.sym+(x.e.deg?' '+x.e.deg:''),'purple','left'));
}
/* 小節 b0〜b1(0始まり)をそのまま。src は簡略版の元データ */
function barsSong(b0,b1,src,label){
  const t0=b0*384,t1=(b1+1)*384, toB=t=>(t-t0)/96;
  const ns=(src||INTRO_NOTES).filter(n=>n.on>=t0&&n.on<t1);
  return {title:`丸サ イントロ 小節${b0+1}${b1>b0?'-'+(b1+1):''}${label?'('+label+')':''}`,bpm:PT_BPM,
    notes:ns.map(n=>sNote(n.p,toB(n.on),n.du/96,n.h==='L'?'left':'right')),
    memos:chordMemos(t0,t1,toB).sort((a,b)=>a.timing.beat-b.timing.beat)};
}
/* フレーズ断片: ①コードトーン → ②スケール → ③フレーズ → ④前後つき実譜 をつなげた1曲 */
function buildFragSong(f,d){
  const {t0,t1,rh,lh,segs,stages}=d, LEAD=2, GAP=2, notes=[], memos=[]; let c=0;
  const head=(txt)=>memos.push(memoOf(c,txt,'green','left'));
  stages.forEach(g=>{
    const e=segs[0].e; head(`${g.no} ${g.name}(${e.sym})`);
    const s=c+LEAD, rootPc=e.tp[0], roots=lh.filter(n=>n.p%12===rootPc).map(n=>n.p);
    g.ms.forEach((m,k)=>{ notes.push(sNote(m,s+k,1,'right')); const ns=[{p:m,on:g.tick}]; memos.push(memoOf(s+k,memoText(ns),memoColor(ns))); });
    if(roots.length) notes.push(sNote(Math.min(...roots),s,g.ms.length,'left'));
    c=s+g.ms.length+GAP;
  });
  const no=(k)=>stages.length?['①','②','③','④'][k]+' ':'';
  // フレーズだけ
  head(`${no(2)}フレーズ(実譜)`); let s=c+LEAD;
  const groups=new Map(); rh.slice().sort((a,b)=>a.on-b.on).forEach(n=>{ if(!groups.has(n.on))groups.set(n.on,[]); groups.get(n.on).push(n); });
  rh.forEach(n=>notes.push(sNote(n.p,s+(n.on-t0)/96,n.du/96,'right')));
  lh.forEach(n=>{ const on=Math.max(n.on,t0), off=Math.min(n.on+n.du,t1+48); notes.push(sNote(n.p,s+(on-t0)/96,(off-on)/96,'left')); });
  groups.forEach((g,on)=>memos.push(memoOf(s+(on-t0)/96,memoText(g),memoColor(g))));
  c=s+(t1-t0)/96+GAP;
  // 前後つき(2拍前〜1拍後・両手)
  const w0=Math.max(0,t0-192), w1=Math.min(3072,t1+96);
  head(`${no(3)}前後つき(実譜・両手)`); s=c+LEAD; const toB=t=>s+(t-w0)/96;
  INTRO_NOTES.filter(n=>n.on<w1&&n.on+n.du>w0).forEach(n=>{
    const on=Math.max(n.on,w0), off=Math.min(n.on+n.du,w1+24);
    notes.push(sNote(n.p,toB(on),(off-on)/96,n.h==='L'?'left':'right'));
  });
  memos.push(...chordMemos(w0,w1,toB));
  groups.forEach((g,on)=>memos.push(memoOf(toB(on),memoText(g),memoColor(g))));
  memos.sort((a,b)=>a.timing.beat-b.timing.beat);   // 時間順(安定ソート)
  return {title:'丸サ '+f.title,bpm:PT_BPM,notes,memos};
}
function makeFragCard(f,idx){
  const t0=Math.round(f.a*96), t1=Math.round(f.b*96), bar=Math.floor(t0/384);
  const rh=INTRO_NOTES.filter(n=>n.h==='R'&&n.on>=t0&&n.on<t1);
  const lh=INTRO_NOTES.filter(n=>n.h==='L'&&n.on<t1&&n.on+n.du>t0).sort((a,b)=>a.on-b.on);
  const by=new Map(); rh.slice().sort((x,y)=>x.on-y.on||x.p-y.p).forEach(n=>{ if(!by.has(n.on))by.set(n.on,[]); by.get(n.on).push(n); });
  const one=n=>{ const r=roleTxt(n.p,n.on); return `<span style="color:${COL[roleOf(n.p,n.on)]}">${lab(midiName(n.p))}${r?`<small>(${r})</small>`:''}</span>`; };
  const seq=[...by.values()].map(g=>g.length>1?'<span class="chd">('+g.map(one).join(' ')+')</span>':one(g[0])).join(' → ');
  const segs=[];
  TL.forEach((e,i)=>{
    const s=Math.max(e.start,t0), end=Math.min(i+1<TL.length?TL[i+1].start:1e9,t1);
    if(s>=end) return;
    const sn=rh.filter(n=>n.on>=s&&n.on<end);
    if(sn.length) segs.push({e,sn});
  });
  // 段階練習: ① コードトーン(+このフレーズで使うテンション) → ② スケール → ③ フレーズ。音域はフレーズの最低音〜最高音
  const stages=[];
  if(segs.length===1&&segs[0].e.scaleSet){
    const e=segs[0].e, ps=rh.map(n=>n.p), lo=Math.min(...ps), hi=Math.max(...ps), tick=segs[0].sn[0].on;
    const used=new Set(ps.map(p=>p%12)), ct=[], sc=[];
    for(let m=lo;m<=hi;m++){
      const pc=m%12;
      if(e.tp.includes(pc)||(e.np.includes(pc)&&used.has(pc))) ct.push(m);
      if(e.scaleSet.has(pc)) sc.push(m);
    }
    const names=a=>a.map(m=>one({p:m,on:tick})).join(' ');
    stages.push({no:'①',name:'コードトーン',sub:'この音域のコードトーン(+このフレーズで使うテンション)を上へ',ms:ct,html:names(ct),tick});
    stages.push({no:'②',name:'スケール',sub:`この音域の ${e.scaleName.replace(/\(.*$/,'')} を上へ`,ms:sc,html:names(sc),tick});
  }
  const stageHtml=stages.map((g,i)=>`<div class="stg"><div class="stl"><span class="fno">${g.no}</span><b>${g.name}</b><small>${g.sub}</small><button class="btn sm" data-i="${i}">▶</button></div><div class="staff st${i}"></div><div class="fseq">${g.html}</div></div>`).join('');
  const card=document.createElement('div'); card.className='card frag';
  card.innerHTML=`<div class="h"><span class="fno">${idx}</span><b>${f.title}</b><span class="plays"><button class="btn main-play" title="前後の和音つき(練習する音だけ大きく)→ 休符 → 練習する部分だけ">▶ 前後つき→単独</button><button class="btn solo-play">▶ 単独だけ</button></span></div>
    <div class="fsub">小節${bar+1}(拍${f.a}〜${f.b})・${segs.map(x=>x.e.sym+' '+x.e.deg).join(' → ')}</div>
    ${stageHtml}
    ${stages.length?'<div class="stl" style="margin-top:8px"><span class="fno">③</span><b>フレーズ(実譜)</b><small>①の音を、②の中から選んで並べるとこうなる</small></div>':''}
    <div class="staff"></div>
    <div class="fseq">${seq}</div>
    ${segs.map(x=>`<div class="fp"><div class="sc">${x.e.sym} のスケール: ${x.e.scaleName}</div><div class="kb">${segKeyboard(x.e,x.sn)}</div></div>`).join('')}
    <div class="lhline">左手(実譜・音名のみ): ${[...new Set(lh.map(n=>lab(midiName(n.p))))].join(' → ')||'—'}</div>
    <div class="pt">${f.pt}</div>`;
  const staffEls=card.querySelectorAll('.staff');
  try{ renderFragStaff(staffEls[staffEls.length-1],rh,bar); }catch(e){ staffEls[staffEls.length-1].innerHTML='<span class="err">譜面の描画に失敗: '+e.message+'</span>'; console.error(e); }
  stages.forEach((g,i)=>{
    try{ renderSeqStaff(card.querySelector('.st'+i),g.ms,g.tick); }catch(e){ card.querySelector('.st'+i).innerHTML='<span class="err">譜面の描画に失敗: '+e.message+'</span>'; console.error(e); }
    card.querySelector(`.stg button[data-i="${i}"]`).onclick=()=>playItems(g.ms.map((m,k)=>({m,at:k*.5,d:.5})));
  });
  const soloItems=()=>[...rh,...lh].map(n=>{
    const on=Math.max(n.on,t0), off=n.h==='R'?n.on+n.du:Math.min(n.on+n.du,t1+48);
    return {m:n.p,at:(on-t0)/96,d:Math.max(.1,(off-on)/96)};
  });
  card.querySelector('.solo-play').onclick=()=>playItems(soloItems());
  card.querySelector('.plays').appendChild(ptButton('frag-'+String(f.fid).padStart(2,'0'),()=>buildFragSong(f,{t0,t1,rh,lh,segs,stages}),'🎹 練習','piano-trainer で ①コードトーン→②スケール→③フレーズ→④前後つき を続けて練習(MIDI鍵盤対応)'));
  // 前後(2拍前〜1拍後)を両手で鳴らす(練習する右手の音だけ大きく)→ 2拍の休符 → 練習する部分だけ
  card.querySelector('.main-play').onclick=()=>{
    const w0=Math.max(0,t0-192), w1=Math.min(3072,t1+96);
    const ctxItems=INTRO_NOTES.filter(n=>n.on<w1&&n.on+n.du>w0).map(n=>{
      const on=Math.max(n.on,w0), off=Math.min(n.on+n.du,w1+24), target=n.h==='R'&&n.on>=t0&&n.on<t1;
      return {m:n.p,at:(on-w0)/96,d:Math.max(.1,(off-on)/96),v:target?1:.4};
    });
    const gap=(w1-w0)/96+2;
    playItems([...ctxItems,...soloItems().map(i=>({...i,at:i.at+gap}))],{base:.14});
  };
  return card;
}
/* コードごとの「使える音」説明(TL_DEF から自動生成) */
function chordInfoHtml(key){
  const d=TL_DEF[key]; const nm=(arr)=>arr.map(n=>`${lab(n)}(${d.roles[n]||''})`).join('・');
  return `<b>${d.sym}</b>(${d.deg}): コードトーン ${nm(d.tones)} / テンション ${nm(d.tens)} / スケール ${d.scale.name}`;
}
const FRAG_GROUPS = [
 {title:'Ⅳ(D△7・D△9)の上のフレーズ',keys:['D△9'],list:[
  {a:24,b:25.25,title:'コードトーンだけ:7 → R → 3 → 5 → 7',
   pt:'ぜんぶコードトーン。ド#(7th)から、ルート・3rd・5th・7th と1音ずつ上がる。(小節7)'},
  {a:16.5,b:17.75,title:'テンションで始まりテンションで終わる:9 → 3 → 5 → 7 → 9',
   pt:'小節7と同じ「3rd・5th・7th」の上りに、9th(オレンジ)を頭とおしりにつけた形。(小節5)'},
  {a:8.5,b:9.5,title:'半音下から入る:経 → 3 → 5 → 7 → 9',
   pt:'小節5の頭の ミ(9th)を、ファ(3rdの半音下・灰色)に替えた形。ファ・ファ#・ラは三連符。ファはスケール外だが、すぐ半音上のファ#に解決する。(小節3)'},
  {a:0.5,b:1.75,title:'3rd を半音下で飾る:3 → 経 → 3 → 5 → 9',
   pt:'ファ#(3rd)を半音下のファ(灰色)でかすめてから、ラ(5th)、ミ(9th)へ。(小節1)'}
 ]},
 {title:'Ⅵm(F#m7・F#m9)の上のフレーズ',keys:['F#m9'],list:[
  {a:4.5,b:5.5,title:'駆け上がり:9 → ♭3 → 5 → ♭7 → 9 → 11',
   pt:'ソ#(9th)から ♭3・5・♭7 と上がり、9th・11th で止まる。小節5の「9→3→5→7→9」に11thを足した形。最初の4音は32分音符。(小節2)'},
  {a:20.5,b:21.75,title:'降りてくる:(♭7+9) → 5 → 11 → ♭3 → 9',
   pt:'小節2の逆向きに降りる。ミ+ソ#で入って、ド#・シ・ラ・ソ#(9th)に着地。(小節6)'},
  {a:12,b:13.75,title:'F#m7:和音と単音のかけ合い',
   pt:'ミ+ソ#(♭7+9th)の和音 → ラ → ラ+レ#(♭3+13th)の和音 → ミ → ド#。レ#(13th)は F#ドリアンの特徴音。(小節4)'}
 ]},
 {title:'ドミナント(G#m7・C#7)の上のフレーズ',keys:['G#m7','C#7'],list:[
  {a:9.75,b:11,title:'G#m7:上3音の和音から降りる',
   pt:'シ・レ#・ファ#(♭3・5・♭7)の和音から、ミ(♭13)→ド#(11)→シ(♭3)と降りる。(小節3)'},
  {a:11,b:12,title:'C#7:ド+ミの和音 → ♭7 → ♭13 → 11',
   pt:'ド(灰色)+ミ(#9)の和音のあと、シ(♭7)・ラ(♭13)・ファ#(11th)と降りる。ドだけスケール外。(小節3)'},
  {a:27,b:28,title:'C#7:3rd+♭13 の和音 → #9 → ♭9 → 11',
   pt:'ファ(3rd)+ラ(♭13)の和音から、ミ(#9)・レ(♭9)と半音ずつ降りて、低いファ#(11th)へ。(小節7)'},
  {a:2.25,b:3.75,title:'C#7alt:R → ♭7 → 経 → ♭7 → ♭13',
   pt:'ド#(R)→シ(♭7)。シをド(灰色)で上から飾って(シ→ド→シ)、ラ(♭13)へ。(小節1)'},
  {a:17.75,b:19.75,title:'C#7alt:ファ・ラ・シ を保って上の音だけ動かす',
   pt:'ファ・ラ・シ(3・♭13・♭7)は同じ指のまま、一番上だけレ(♭9)→ド#(R)に動く。そのあと ファ+ラ#(灰色)→シ→ラ。(小節5)'}
 ]},
 {title:'Ⅰ7(A13sus・A9sus4)の上のフレーズ',keys:['A13sus'],list:[
  {a:21.75,b:23,title:'テンションだけで作る:R → 13 → 9 → 11',
   pt:'ラ(R)→ファ#(13)→シ(9)→レ(11)。3rdのド#は弾かず、テンションだけで浮いた響き。(小節6)'},
  {a:23,b:24,title:'(9+13)の和音 → 5 → 11 → 5',
   pt:'シ+ファ#(9+13)の和音から、ミ・レ・ミ。次の小節の D△9 につなぐ。(小節6)'},
  {a:6.25,b:7.5,title:'ミクソリディアンの音:13 → ♭7 → R(+経)→ R → ♭7',
   pt:'ファ#(13th)・ソ(♭7)・ラ(R)と上がり、ラの隣のラ#(灰色)をぶつけてから、ラ→ソへ戻る。(小節2)'},
  {a:14.5,b:16,title:'A9sus4:13 → 5 → (♭7+経)→ 9 → R → 13',
   pt:'ファ#(13)→ミ(5)→ソ+ド(♭7+灰色)の和音→シ(9)→ラ(R)→ファ#(13)。3rdのド#は弾かない。ドだけスケール外。(小節4)'}
 ]},
 {title:'小節8:コード全体が半音ずつ下がる',keys:[],desc:'スケールもコードトーンの番号も関係なく、<b>同じ形の和音を半音ずつ平行移動</b>しているだけ。',list:[
  {a:28,b:30,title:'平行下降:A/F# → G#/F → G/E',
   pt:'ミ・ラ・ド#→レ#・ソ#・ド→レ・ソ・シ。右手の形を保ったまま半音ずつ下げる(左手も F#→F→E)。(小節8)'}
 ]}
];

{ let k=0; FRAG_GROUPS.forEach(g=>g.list.forEach(f=>{ f.fid=++k; })); }
FRAG_GROUPS.forEach(g=>g.list.sort((x,y)=>x.a-y.a));   // 表示は曲の進行順(小節の若い順)。fid はファイル名用に固定   // 断片の通し番号(JSON のファイル名用)
/* ============ 練習ステップ定義 ============ */
const STEPS = [
 {id:'s1',title:'左手でルートだけ',goal:'「今のコード」を左手の1音で言えるようにする',
  do:['左手でルートを全音符で:D → C# → F# → A(♩=50〜60)。声に出しながら。','慣れたら小節頭からループ。'],
  think:['D=Ⅳ、C#=Ⅲ、F#=Ⅵ、A=Ⅰ(A major基準)。曲の「家」は F#m。','動き:D→C#(半音下)→F#(4度上)→A(短3度上)。'],
  cards:{kind:'root',list:CARDS_A}},
 {id:'s2',title:'4和音を全音符で(ブロックコード)',goal:'4音を押さえて、コードの種類を区別する',
  do:['左手=ルート、右手=4和音(下からルート・3rd・5th・7th)を全音符で。♩=60。'],
  think:['7th は D△7=C#(ルートの半音下)、A7=G(全音下)。','D△7=明るい / C#7=不安定 / F#m7=切ない / A7=次へ行きたい。耳で比べる。','G#m7(3拍目に出てくる)もここで押さえる。'],
  cards:{kind:'block',list:[...CARDS_A,'G7']}},
 {id:'inv1',title:'転回形を弾く(各コード×4つの形)',goal:'同じコードを4通りの形で押さえる',
  do:['各コードを 基本形 → 第1 → 第2 → 第3転回 の順に右手で(全音符)。左手はルート。','一番下の音を声に出す。慣れたら順番をバラバラに。'],
  think:['転回形=同じ4音の並べ替え。コード名は変わらない。','手の形と「ルート・3rd・5th・7th の位置」を結びつける。次の「近い形でつなぐ」で使う。'],
  note:'青=コードトーン、濃い青=ルート、緑=左手のルート。五線譜は右手。',
  groups:['D7','C7','F7','A7','G7'].map(invGroup)},
 {id:'s3',title:'単純なアルペジオ',goal:'コードトーンを順に鳴らす=アルペジオ',
  do:['4和音を下→上、上→下(8分音符)。♩=60→80→100。左手はルートの全音符。'],
  think:['速そうなフレーズの多くは、コードトーンを順に弾いているだけ。','2小節目の上昇(ソ#・ラ・ド#・ミ・ソ#・シ)は F#m9 のアルペジオ。'],
  cards:{kind:'arp',list:[...CARDS_A,'G7']}},
 {id:'s4',title:'近い形でつなぐ(ボイスリーディング)',goal:'動く音だけ動かす',
  do:['カードの形で D△7 → C#7 → F#m7 → A7 → D△7 とつなぐ。動く指だけ動かす。'],
  think:['C#7→F#m7:C# は動かず、E#→E、G#→F#、B→A。','F#m7→A7:F#→G の1音だけ。','A7→D△7:G(♭7)→F#(3rd)。「7thが3rdに解決する」が一番大事。'],
  cards:{kind:'smooth',list:CARDS_A}},
 {id:'s5',title:'ガイドトーン(3rdと7th)だけ',goal:'コードの「顔」の2音を意識する',
  do:['右手は3rdと7thの2音、左手はルート。D△7 → C#7 → F#m7 → A7。'],
  think:['3rd=長調か短調か、7th=7thの種類。この2音で性格が決まる。'],
  cards:{kind:'guide',list:CARDS_A}},
 {id:'s6',title:'左手の形(実際の弾き方)',goal:'実際の左手を「ルート+7th」として理解する',
  do:['左手だけで:D+D、C#+C#、F#+E、A+G、G#+F#。拍通りにゆっくり。'],
  think:['F#m7 の F#2+E3、A7 の A2+G3 は「ルート+♭7th」。','左手がルート+7th、右手が3rd(とテンション)を足してコードが完成。'],
  cards:{kind:'lh',list:['D7','C7','F7','A7','G7']}},
 {id:'s7',title:'テンションを1つずつ足す',goal:'テンション=おしゃれな響きの正体',
  do:['ステップ2のブロックコードに、オレンジの音(テンション)を足して弾き比べる。D△7→D△9、F#m7→F#m9、A7→A7sus4(9,13)、C#7→C#7(♭9,♭13)。'],
  think:['テンション=9th(ルートの2音上)・11th(4音上)・13th(6音上)。','C#7(♭9,♭13) は、ドミナントが F#m に解決する前の「ひねり」。','A7sus4(9,13) は 3rd(ド#)を弾かないので宙に浮く。'],
  cards:{kind:'tension',list:['D7','C7','F7','A7','G7']}},
 {id:'sc1',title:'コードに合うスケールを弾く',goal:'フレーズの音が、どのスケールの音かを指に覚えさせる',
  do:['右手でスケールを8分音符で上行→下行(♩=60→80)。左手はルートの全音符。青い音を少し強く。','D → C# → F# → A を1コード=1小節でつなぐ(上行だけでOK)。'],
  think:['イントロの右手は、ほぼこの5つのスケールの音(灰色の経過音だけ例外)。','隣のコードとの違いは1〜2音:C#7 は「ミ→ファ(E#)」、F#m7 は「レ#」、A7 は「ソ#→ソ」。'],
  cards:{kind:'scale',list:SCALE_CARDS}},
 {id:'fr1',title:'実譜を短いフレーズに切って、音の役割を確かめる',goal:'コードトーン・テンション・スケールの関係を見ながら弾く',
  do:['カードごとに <b>①コードトーン → ②スケール → ③フレーズ</b> の順に右手で(♩=60)。①②はそのフレーズの音域だけ。左手はルートの全音符でOK。','「▶ 前後つき→単独」で前後の和音の中での位置を聴いてから単独で。「🎹 練習」で piano-trainer に読み込める。','鍵盤の白丸=実際に弾く音。薄い青(スケール)の上を飛び飛びに拾っているのを見る。灰色は「経過音」と声に出す。'],
  think:['フレーズ=スケールの中から、コードトーンを中心に飛び飛びで拾ったもの。','灰色(スケール外)は、コードトーンの半音上か下から入って、すぐ解決する。','ドミナント(G#m7・C#7)は ♭9・#9・♭13 などひねったテンションが多い。','A13sus・A9sus4 は 3rd(ド#)を弾かない。'],
  note:'実譜のリズムのままです。まず音の並びと役割だけ覚えて、速さは後から。',
  fgroups:FRAG_GROUPS},
 {id:'sk1',title:'コードの刻みだけ(右手=先取りの和音)',goal:'和音が入るタイミングだけを練習する',
  do:['右手は和音だけを、実際のリズムで。左手は譜面どおり。▶で聴いて手を叩いてから両手で。'],
  think:['和音は先取りで「拍の16分前」(1 e & a の a)に入る。小節1の最後の和音は、3拍目のベース C# の直前。'],
  note:'メロディ(単音)は省いています。',
  bars:[0,3],src:'stab'},
 {id:'sk2',title:'メロディの骨格だけ(経過音を抜く)',goal:'コードトーンとテンションだけの骨組みを弾く',
  do:['青(コードトーン)とオレンジ(テンション)の単音だけを残した譜面を弾く(経過音・32分音符は省略)。左手→右手→両手。','弾けたら次の実譜と見比べて「何が足されているか」を探す。'],
  think:['フレーズがどのコードトーンに向かうかが見える(小節2は F#m9 のアルペジオが上がるだけ)。','足されているのは主に半音の経過音と装飾。'],
  note:'和音も省いています(前のステップで練習済み)。',
  bars:[0,3],src:'melody'},
 {id:'s8',title:'先取りのリズム(実譜 1〜2小節)',goal:'右手のコードが16分音符ぶん早く入るのを体感する',
  do:['実譜の1〜2小節を、左手→右手→両手で。'],
  think:['C#7 の和音は、ベース C#(3拍目)の16分前=2拍目の最後。F#m9 は4拍目の最後、A13sus は6拍目の最後。','左手は拍の頭、右手のコードが前のめり。これがグルーヴの正体。','半音で下から入る音(0.75拍目のファ)は経過音。'],
  bars:[0,1],kb:true},
 {id:'s9',title:'フレーズをコードトーンで読む(実譜 3〜4小節)',goal:'「今どのコードのどの音か」を言いながら弾く',
  do:['1小節ずつ、色を見て「コードトーン?テンション?経過音?」と声に出して弾く。▶を聴いて真似してから譜面と照らす。'],
  think:['小節3:ファ→ファ#→ラ→ド#→ミ は D△9 のアルペジオ(ファは経過音)。','小節3後半:G#m7 の上で ミ・ド#・シ と下りて C#7 へ。C(ナチュラル)は経過音。','小節4:F#m7 の音に D#(13th)を挟んで、A9sus4 へ。'],
  table:true,
  bars:[2,3],kb:true},
 {id:'s10',title:'全体を組み立てる(1〜8小節)',goal:'コード名・度数・役割を意識して通して弾く',
  do:['左手だけ→右手だけ(2小節ごと)→両手。最後は「今のコード名」を心の中で言いながら(♩=60から)。'],
  think:['A ブロック(1-2, 5-6)=丸サ進行そのもの。B ブロック(3-4, 7-8)=間に G#m7 を挟んだ変形。5〜7小節は1〜3小節の繰り返し+メロが1オクターブ上。','8小節目は A/F#→G#/F→G/E と、コード全体が半音ずつ下がる平行移動(ベースも F#→F→E)。'],
  bars:[0,7]},
 {id:'tr1',title:'フレーズの形を別のコードに移す(アドリブへの第一歩)',goal:'実譜のフレーズの形を、ほかのコードでも弾く',
  do:['フレーズ断片を1つ選び、度数の並びを保ったまま別のコードの上で弾く(例:D△9 の 9→3→5→7→9 を G#m7 で)。','下の形1〜3を5つのコードで。丸サ進行の各コードで、1コード=1小節で同じ形を順に。','リズムを変えて遊ぶ。慣れたら形を2つ組み合わせる。'],
  think:['フレーズ=度数の並び。別のコードに移すと、音は変わっても形は同じ。','灰色の接近音は、コードトーンの半音上か下から入る飾り。ほぼどのコードでも使える。','合わない組み合わせ(長3度のコードの上の 11th など)は、濁ったら避ける。'],
  note:'灰色=接近音、青=コードトーン、オレンジ=テンション。8分音符で書いてあります。',
  groups:[...PH_REAL,...PH_EXT].map(phGroup)}
];

/* ============ ページ構成 ============ */
const PAGES = [
  {file:'index.html',   title:'はじめに',          desc:'コード進行の地図と、全体の進め方。',ids:[]},
  {file:'p1-chords.html',title:'1. コード編',      desc:'ルート → 4和音 → 転回形 → アルペジオ → つなぎ方 → ガイドトーン → 左手 → テンション。',ids:['s1','s2','inv1','s3','s4','s5','s6','s7']},
  {file:'p2-phrase.html',title:'2. スケール・フレーズ編',desc:'コードに合うスケールを弾き、実譜を短いフレーズに切って「コードトーン → スケール → フレーズ」で理解する。',ids:['sc1','fr1']},
  {file:'p3-score.html', title:'3. 実譜編',         desc:'和音の刻み・メロの骨格 → 先取り → フレーズ読み → 1〜8小節を通す。',ids:['sk1','sk2','s8','s9','s10']},
  {file:'p4-improv.html',title:'4. アドリブ編',     desc:'実譜のフレーズの形を、ほかのコードに移して弾く。',ids:['tr1']}
];
const PAGE = PAGES.find(p=>p.file===(document.body.dataset.page||'index.html'))||PAGES[0];
function renderTabs(){
  const el=document.getElementById('tabs'); if(!el) return;
  el.innerHTML=PAGES.map(p=>`<a class="tab${p===PAGE?' cur':''}" href="${p.file}">${p.title}</a>`).join('');
}
function renderPager(){
  const el=document.getElementById('pager'); if(!el) return;
  const i=PAGES.indexOf(PAGE), prev=PAGES[i-1], next=PAGES[i+1];
  el.innerHTML=(prev?`<a class="pg" href="${prev.file}">← ${prev.title}</a>`:'<span></span>')+(next?`<a class="pg" href="${next.file}">${next.title} →</a>`:'<span></span>');
}
function renderToc(){
  const el=document.getElementById('toc'); if(!el) return;
  const prog=loadProg();
  el.innerHTML=PAGES.filter(p=>p.ids.length).map(p=>`<section class="panel toc"><h2><a href="${p.file}">${p.title}</a></h2><p class="small" style="margin:0">${p.desc}</p><ol>${
    p.ids.map(id=>{ const k=STEPS.findIndex(s=>s.id===id); return `<li value="${k+1}"><a href="${p.file}#${id}">${STEPS[k].title}</a>${prog[id]?' <span class="okmark">✓</span>':''}</li>`; }).join('')}</ol></section>`).join('');
}

/* ============ 描画 ============ */
const LS_KEY='marusa-progress-v1';
function loadProg(){try{return JSON.parse(localStorage.getItem(LS_KEY)||'{}');}catch(e){return {};}}
function saveProg(p){try{localStorage.setItem(LS_KEY,JSON.stringify(p));}catch(e){}}
function renderStrip(){
  const B=[
    [['D△7','Ⅳ△7',2],['C#7alt','Ⅲ7',2]],
    [['F#m9','Ⅵm9',2],['A13sus4','Ⅰ7',2]],
    [['D△9','Ⅳ△9',2],['G#m7','Ⅶm7',1],['C#7','Ⅲ7',1]],
    [['F#m7','Ⅵm7',2],['A9sus4','Ⅰ7',2]]
  ];
  const last=[['A/F#','',0.5],['G#/F','',0.5],['G/E','',1],['(休)','',2]];
  const all=[...B,B[0],B[1],B[2],last];
  document.getElementById('strip').innerHTML=all.map((ch,i)=>`<div class="bar ${i>=4&&i<7?'rep':''}"><div class="no">小節${i+1}${i>=4&&i<7?'(1-3の繰り返し)':''}${i===7?'(平行下降)':''}</div><div class="chs">${ch.map(c=>`<div class="c" style="--w:${c[2]}"><b>${c[0]}</b><i>${c[1]}</i></div>`).join('')}</div></div>`).join('');
}
function renderSteps(){
  const prog=loadProg(); const host=document.getElementById('steps'); if(!host){updateProg();return;} host.innerHTML='';
  STEPS.forEach((s,i)=>{
    if(!PAGE.ids.includes(s.id)) return;
    const sec=document.createElement('section'); sec.className='step'+(prog[s.id]?' done':'')+(prog['_c_'+s.id]?' closed':''); sec.id=s.id;
    sec.innerHTML=`<header><div class="num">${i+1}</div><div><h2>${s.title}</h2><div class="goal">${s.goal}</div></div>
      <label class="chk" onclick="event.stopPropagation()"><input type="checkbox" ${prog[s.id]?'checked':''}> できた</label></header>
      <div class="body"><div class="cols">
        <div><h3><span class="tag">弾く</span></h3><ul>${s.do.map(x=>`<li>${x}</li>`).join('')}</ul></div>
        <div><h3><span class="tag th">考える</span></h3><ul>${s.think.map(x=>`<li>${x}</li>`).join('')}</ul></div>
      </div><div class="vis"></div></div>`;
    const vis=sec.querySelector('.vis');
    if(s.note){ const c=document.createElement('div'); c.className='callout'; c.innerHTML=s.note; vis.appendChild(c); }
    if(s.cards){ const g=document.createElement('div'); g.className='cards'; s.cards.list.forEach(k=>g.appendChild(makeCard(typeof k==='string'?CH[k]:k,s.cards.kind))); vis.appendChild(g); }
    if(s.groups){ s.groups.forEach(g=>{
      const dt=document.createElement('details'); dt.className='grp'; dt.open=true;
      dt.innerHTML=`<summary>${g.title}</summary><p class="small" style="margin:4px 0 0">${g.desc}</p>`;
      if(g.src){
        const sl=document.createElement('div'); sl.className='srcline';
        sl.innerHTML=`<span class="badge ${g.src.generic?'gen':'sc'}">${g.src.generic?'一般的な型':'実譜由来'}</span><span>${g.src.text}</span>`;
        (g.src.bars||[]).forEach(b=>{ const bt=document.createElement('button'); bt.className='btn'; bt.textContent=`▶ 実譜 小節${b+1}`; bt.onclick=()=>playBars(b,b); sl.appendChild(bt); });
        dt.appendChild(sl);
      }
      const cg=document.createElement('div'); cg.className='cards'; g.list.forEach(o=>cg.appendChild(makeCard(o,g.kind||'phrase'))); dt.appendChild(cg); vis.appendChild(dt);
    }); }
    if(s.fgroups){
      vis.appendChild(kbLegend());
      s.fgroups.forEach(g=>{
        const dt=document.createElement('details'); dt.className='grp'; dt.open=true;
        const info=g.keys.map(chordInfoHtml).join('<br>');
        dt.innerHTML=`<summary>${g.title}</summary><p class="gdesc">${g.desc||info}</p>`;
        const fg=document.createElement('div'); fg.className='frags';
        g.list.forEach((f,k)=>fg.appendChild(makeFragCard(f,k+1)));
        dt.appendChild(fg); vis.appendChild(dt);
      });
    }
    if(s.bars){ vis.appendChild(makeBarsView(s.bars[0],s.bars[1],{kb:s.kb,src:s.src?srcFor(s.src):null,srcKey:s.src||'',srcLabel:s.src==='stab'?'和音の刻みだけ':s.src==='melody'?'メロの骨格だけ':''})); }
    if(s.table){
      const t=document.createElement('div'); t.style.marginTop='14px';
      t.innerHTML=`<h3>スケール早見表(各コードで使える音の集合)</h3><table><tr><th>コード</th><th>スケール</th></tr>`+
        Object.values(CH).map(c=>`<tr><td><b>${c.sym}</b> <span class="small">${c.deg}</span></td><td>${c.scale}</td></tr>`).join('')+`</table>
        <div class="callout">灰色の音はスケール外=半音でつなぐ経過音。意識するのは「どのコードトーンに向かうか」だけ。</div>`;
      vis.appendChild(t);
    }
    sec.querySelector('header').onclick=()=>{ sec.classList.toggle('closed'); const p=loadProg(); p['_c_'+s.id]=sec.classList.contains('closed'); saveProg(p); };
    sec.querySelector('input').onchange=(e)=>{ const p=loadProg(); p[s.id]=e.target.checked; saveProg(p); sec.classList.toggle('done',e.target.checked); updateProg(); };
    host.appendChild(sec);
  });
  updateProg();
}
function updateProg(){
  const p=loadProg(); const n=STEPS.filter(s=>p[s.id]).length;
  document.getElementById('prog').textContent=`進捗 ${n} / ${STEPS.length}`;
  renderToc();
}

/* ============ 起動 ============ */
const $=id=>document.getElementById(id);
$('tg-jp').checked=state.jp; $('tg-col').checked=state.color; $('tg-bpm').value=String(state.bpm);
$('tg-jp').onchange=e=>{state.jp=e.target.checked;saveSettings();renderSteps();};
$('tg-col').onchange=e=>{state.color=e.target.checked;saveSettings();renderSteps();};
$('tg-bpm').onchange=e=>{state.bpm=+e.target.value;saveSettings();};
$('btn-stop').onclick=stopAll;
if($('btn-all')){ $('btn-all').onclick=()=>playBars(0,7);
  const pb=ptButton('intro-all',()=>barsSong(0,7),'🎹 piano-trainer で全体を練習','イントロ1〜8小節を piano-trainer に読み込む'); pb.style.marginLeft='8px'; $('btn-all').after(pb); }
if($('strip')) renderStrip();
renderTabs(); renderPager();
renderSteps();
