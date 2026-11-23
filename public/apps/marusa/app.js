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
    ten:{sym:'D△9',rh:['C#4','E4','F#4','A4'],rr:['7','9','3','5'],note:'ド#・ミ・ファ#・ラ = <b>F#m7</b> と同じ音。D の上に F#m7 を重ねると D△9。'},
    scale:'Dリディアン(=Aメジャーを D から)'},
  C7:{sym:'C#7',deg:'Ⅲ7',bass:'C#2',
    rh:['C#4','E#4','G#4','B4'],rr:['R','3','5','♭7'],
    smooth:['C#4','E#4','G#4','B4'],sr:['R','3','5','♭7'],
    guide:['E#3','B3'],gr:['3','♭7'],
    lh:['C#2','C#3'],lr:['R','R'],
    ten:{sym:'C#7(♭9,♭13)',rh:['E#4','A4','B4','D5'],rr:['3','♭13','♭7','♭9'],note:'ファ(E#)・ラ・シ・レ = <b>Bm7♭5</b> と同じ音。C# の上に Bm7♭5 を重ねると C#7(♭9,♭13)。'},
    scale:'C#ミクソリディアン♭9♭13 = F#ハーモニックマイナーを C# から'},
  F7:{sym:'F#m7',deg:'Ⅵm7',bass:'F#2',
    rh:['F#3','A3','C#4','E4'],rr:['R','♭3','5','♭7'],
    smooth:['C#4','E4','F#4','A4'],sr:['5','♭7','R','♭3'],
    guide:['A3','E4'],gr:['♭3','♭7'],
    lh:['F#2','E3'],lr:['R','♭7'],
    ten:{sym:'F#m9',rh:['A3','C#4','E4','G#4'],rr:['♭3','5','♭7','9'],note:'ラ・ド#・ミ・ソ# = <b>A△7</b> と同じ音。F# の上に A△7 を重ねると F#m9。3小節目の上昇の元。'},
    scale:'F#ドリアン(F# G# A B C# D# E)= Eメジャーと同じ音を F# から'},
  A7:{sym:'A7',deg:'Ⅰ7',bass:'A2',
    rh:['A3','C#4','E4','G4'],rr:['R','3','5','♭7'],
    smooth:['C#4','E4','G4','A4'],sr:['3','5','♭7','R'],
    guide:['C#4','G4'],gr:['3','♭7'],
    lh:['A2','G3'],lr:['R','♭7'],
    ten:{sym:'A7sus4(9,13)',rh:['B3','D4','F#4','G4'],rr:['9','11','13','♭7'],note:'シ・レ・ファ#・ソ = <b>G△7</b> と同じ音。A の上に G△7 を重ねると A7sus4(9,13)。3rd(ド#)は弾かない。'},
    scale:'Aミクソリディアン(A B C# D E F# G)'},
  G7:{sym:'G#m7',deg:'Ⅶm7',bass:'G#2',
    rh:['G#3','B3','D#4','F#4'],rr:['R','♭3','5','♭7'],
    smooth:['G#3','B3','D#4','F#4'],sr:['R','♭3','5','♭7'],
    guide:['B3','F#4'],gr:['♭3','♭7'],
    lh:['G#2','F#3'],lr:['R','♭7'],
    ten:{sym:'G#m7(11)',rh:['B3','D#4','F#4','C#5'],rr:['♭3','5','♭7','11'],note:'シ・レ#・ファ#(+ド#) = <b>B</b> のトライアド(+9th)。G# の上に B を重ねると G#m7(11)。'},
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
  {title:'形1「3rd の半音下から入って、3→5→7→9 と駆け上がる」(実譜4小節目の形)',
   desc:'実譜4小節目(ファ→ファ#→ラ→ド#→ミ)を別のコードに移す。「接近音(灰)→3rd→5th→7th→9th」。5つのコードすべてで自然に響く。',
   dir:'up',seq:['app','3','5','7','9'],chords:PH_ALL5,
   note:{'D△9':'実譜4小節目と同じ音。','G#m7':'接近音は 9th のラ#。','F#m9':'接近音は 9th のソ#。','C#7':'接近音はミ(E)。9th は ♭9(レ)になる。','A7':'接近音はド(ナチュラル)。'}}
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
/* 各形の元ネタ(intro.json と照合済み)。bars は 0 始まりの小節番号(表示は +2。小節1は全休符) */
const GEN_TXT='実譜にはない一般的な型(こちらで用意したもの)。';
const PH_SRC = {
  '形1':{bars:[2],text:'実譜 小節4(拍8.5〜9.25):ファ→ファ#→ラ→ド#→ミ。'},
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
function barEvents(hand,bar,src,opt){
  opt=opt||{};
  const t0=bar*384,t1=t0+384;
  const by=new Map();
  (src||INTRO_NOTES).forEach(n=>{ if(n.h===hand&&n.on>=t0&&n.on<t1){ if(!by.has(n.on))by.set(n.on,[]); by.get(n.on).push(n);} });
  const ons=[...by.keys()].sort((a,b)=>a-b); const evs=[]; let cur=0;
  // 前の小節から続いている音(タイでつなぐ側)。opt.carry のときだけ
  if(opt.carry){
    const cn=(src||INTRO_NOTES).filter(n=>n.h===hand&&n.on<t0&&n.on+n.du>t0);
    if(cn.length){
      const end=Math.max(...cn.map(n=>n.on+n.du)), lim=Math.min(end-t0,ons.length?ons[0]-t0:384,384);
      const d=lim===16?[16,'16',0]:pickDur(0,lim,false);
      if(d){ evs.push({pos:0,dur:d[0],s:d[1],dot:d[2],notes:cn.map(n=>({...n,on:t0})),tick:t0,tieIn:cn.map(n=>n.p)}); cur=d[0]; }
    }
  }
  ons.forEach((on,i)=>{
    const pos=on-t0; if(pos>cur) pushRests(evs,cur,pos);
    const g=by.get(on); const maxd=Math.max(...g.map(n=>n.du));
    const next=i+1<ons.length?ons[i+1]-t0:384;
    const lim=Math.min(maxd,next-pos,384-pos);
    let d,trip=false;
    if(lim===16){d=[16,'16',0];trip=true;} else d=pickDur(pos,lim,false);
    const ev={pos,dur:d[0],s:d[1],dot:d[2],notes:g,trip,tick:on};
    // 最後の音が小節線をまたいで伸びているなら、またぐ音を記録(次の小節の先頭とタイでつなぐ)
    if(opt.tieOut&&i===ons.length-1&&pos+d[0]===384){ const o=g.filter(n=>n.on+n.du>t1).map(n=>n.p); if(o.length) ev.tieOut=o; }
    evs.push(ev);
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
    if(ev.barline){ notes.push(new VF.BarNote()); return; }
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
    d.innerHTML=`<div class="h"><b>小節${b+2}</b><button class="btn">▶</button><span>${chs}</span></div><div class="sv"></div>`;
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
function renderFragStaff(el,rh,bar,hl){
  // フレーズが小節をまたぐときは、各小節のイベントを小節線(barline)でつなぐ
  const b0=Math.floor(Math.min(...rh.map(n=>n.on))/384), b1=Math.floor(Math.max(...rh.map(n=>n.on))/384);
  const evs=[];
  for(let b=b0;b<=b1;b++){ if(b>b0) evs.push({barline:true}); evs.push(...barEvents('R',b,rh,{carry:b>b0,tieOut:b<b1})); }
  while(evs.length&&!evs[0].notes) evs.shift();
  while(evs.length&&!evs[evs.length-1].notes) evs.pop();
  drawEvStaff(el,evs,Math.min(...rh.map(n=>n.p)),Math.max(...rh.map(n=>n.p)),true,hl);
}
/* 段階練習用:音の並び(8分音符・上行)だけの譜面。色はコード tick の上での役割 */
function renderSeqStaff(el,pitches,tick){
  drawEvStaff(el,pitches.map(p=>({s:'8',dot:0,notes:[{p}],tick})),Math.min(...pitches),Math.max(...pitches),false);
}
function drawEvStaff(el,evs,lowP,hiP,labels,hl){
  const {Renderer,Stave,Formatter,Beam}=VF;
  const nEv=evs.filter(e=>e.notes).length;
  const topY=hiP>=81?52:42, W=Math.min(760,Math.max(300,110+nEv*46+(evs.some(e=>e.barline)?50:0))), Ht=topY+(lowP<55?135:lowP<60?110:90)+(hiP>=72?40:0);
  const r=new Renderer(el,Renderer.Backends.SVG); r.resize(W+40,Ht); const ctx=r.getContext();   // 右に余白(コード名ラベルが切れないように)
  const st=new Stave(2,topY,W-8); st.addClef('treble').addKeySignature('A'); st.setContext(ctx).draw();
  const X=buildHand(evs,'R');
  let beams=[]; try{beams=Beam.generateBeams(X.notes);}catch(e){} // 音符を描く前に作る(フラッグを消すため)
  const fm=new Formatter(); fm.joinVoices([X.v]);
  fm.format([X.v],st.getNoteEndX()-st.getNoteStartX()-22);
  X.v.draw(ctx,st);
  beams.forEach(b=>b.setContext(ctx).draw()); X.tups.forEach(t=>t.setContext(ctx).draw());
  // 小節をまたぐ音をタイで結ぶ
  evs.forEach((ev,i)=>{
    if(!ev.tieOut) return;
    const nx=evs.slice(i+1).find(e=>e.notes); if(!nx||!nx.tieIn) return;
    const pa=[...new Set(ev.notes.map(n=>n.p))].sort((a,b)=>a-b), pb=[...new Set(nx.notes.map(n=>n.p))].sort((a,b)=>a-b);
    const ps=ev.tieOut.filter(p=>pb.includes(p));
    if(!ps.length) return;
    new VF.StaveTie({first_note:ev.sn,last_note:nx.sn,first_indices:ps.map(p=>pa.indexOf(p)),last_indices:ps.map(p=>pb.indexOf(p))}).setContext(ctx).draw();
  });
  // 対応部分の背景色(hl: 音の開始tick → 色)。音符より後ろに敷くため SVG の先頭に挿入
  if(hl&&hl.size){
    const svg=el.querySelector('svg'), xs=evs.filter(e=>e.sn).map(e=>({e,x:e.sn.getAbsoluteX()}));
    for(let i=0;i<xs.length;i++){
      const col=xs[i].e.notes&&hl.get(xs[i].e.tick); if(!col) continue;
      const x=xs[i].x, l=i>0?(xs[i-1].x+x)/2:x-16, rr=i+1<xs.length?(x+xs[i+1].x)/2:x+24;
      const rc=document.createElementNS('http://www.w3.org/2000/svg','rect');
      rc.setAttribute('x',l); rc.setAttribute('y',topY-6); rc.setAttribute('width',Math.max(10,rr-l)); rc.setAttribute('height',Ht-topY+2);
      rc.setAttribute('rx',4); rc.setAttribute('fill',col); svg.insertBefore(rc,svg.firstChild);
    }
  }
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
  return {title:`丸サ イントロ 小節${b0+2}${b1>b0?'-'+(b1+2):''}${label?'('+label+')':''}`,bpm:PT_BPM,
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
/* 他のフレーズ(fid)との対応表 + 中身(折りたたみ)。対比の説明用 */
function phraseBar(f){ return Math.floor((f.a+f.b)/2/4)+2; }
function phraseRH(f){ const t0=Math.round(f.a*96), t1=Math.round(f.b*96); return INTRO_NOTES.filter(n=>n.h==='R'&&n.on>=t0&&n.on<t1); }
/* 右手を「同時に鳴る音のかたまり(スロット)」の列にする */
function slotsOf(f){
  const by=new Map(); phraseRH(f).sort((x,y)=>x.on-y.on||x.p-y.p).forEach(n=>{ if(!by.has(n.on))by.set(n.on,[]); by.get(n.on).push(n); });
  return [...by.values()].map(g=>({on:g[0].on,notes:g.map(n=>({p:n.p,pc:n.p%12}))}));
}
/* 音の並びを位置合わせ(Needleman-Wunsch)。同じ音=+3、一部共通=+1、別の音への置きかわり=-1、片方にだけある=-1.5 */
function alignSlots(A,B){
  const sc=(x,y)=>{ const sa=new Set(x.notes.map(n=>n.pc)), sb=new Set(y.notes.map(n=>n.pc)); const i=[...sa].filter(v=>sb.has(v)).length;
    return i===sa.size&&i===sb.size?3:i>0?(sa.size>1&&sb.size>1?2.5:1):-1; };   // 和音どうしは優先してそろえる
  const n=A.length,m=B.length, G=-1.5, D=Array.from({length:n+1},()=>Array(m+1).fill(0));
  for(let i=1;i<=n;i++) D[i][0]=i*G; for(let j=1;j<=m;j++) D[0][j]=j*G;
  for(let i=1;i<=n;i++) for(let j=1;j<=m;j++) D[i][j]=Math.max(D[i-1][j-1]+sc(A[i-1],B[j-1]),D[i-1][j]+G,D[i][j-1]+G);
  const out=[]; let i=n,j=m;
  while(i>0||j>0){
    if(i>0&&j>0&&D[i][j]===D[i-1][j-1]+sc(A[i-1],B[j-1])){ out.push([A[i-1],B[j-1]]); i--; j--; }
    else if(i>0&&D[i][j]===D[i-1][j]+G){ out.push([A[i-1],null]); i--; }
    else { out.push([null,B[j-1]]); j--; }
  }
  return out.reverse();
}
/* 対応する音の背景色。{mine: このフレーズ用, other: 比べる先用} それぞれ 音の開始tick → 色 */
const HL_SAME='rgba(74,222,128,.30)', HL_DIFF='rgba(250,204,21,.38)';
const HL_GROUPS=['rgba(74,222,128,.32)','rgba(96,165,250,.32)','rgba(244,114,182,.30)','rgba(251,146,60,.32)','rgba(167,139,250,.32)'];
function cmpMarks(f,rf,spec){
  const A=slotsOf(f), B=slotsOf(rf), mine=new Map(), other=new Map();
  if(spec.groups){
    // 対応を手で指定(並びが逆向きなど、位置合わせでは出ない場合)。同じ色どうしが対応
    spec.groups.forEach((g,k)=>{ const col=HL_GROUPS[k%HL_GROUPS.length];
      g.a.forEach(b=>mine.set(Math.round(b*96),col)); g.b.forEach(b=>other.set(Math.round(b*96),col)); });
  }else{
    alignSlots(A,B).forEach(([a,b])=>{
      if(!a||!b) return;
      const same=a.notes.length===b.notes.length&&a.notes.every(n=>b.notes.some(o=>o.pc===n.pc));
      mine.set(a.on,same?HL_SAME:HL_DIFF); other.set(b.on,same?HL_SAME:HL_DIFF);
    });
  }
  return {mine,other};
}
/* 実譜(右手)で、このコード(TL の sym のリスト)の区間に使われている音を鍵盤で見せる */
function makeUsageBlock(syms){
  const e=TL.find(x=>x.sym===syms[0]);
  const ns=INTRO_NOTES.filter(n=>n.h==='R'&&syms.includes(chordAt(n.on).sym));
  const outs=new Map(); ns.forEach(n=>{ if(!e.scaleSet.has(n.p%12)) outs.set(n.p%12,(outs.get(n.p%12)||0)+1); });
  const NM=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
  const outTxt=[...outs.entries()].map(([pc,c])=>`<b>${lab(NM[pc])}</b>×${c}`).join('・');
  const div=document.createElement('div'); div.className='card usage';
  div.innerHTML=`<div class="h"><b>実譜で使われている音</b><span class="deg">${syms.join('・')}</span></div>
    <div class="kb">${segKeyboard(e,ns)}</div>
    <div class="names">右手 ${ns.length} 音のうち、スケール外は <b>${[...outs.values()].reduce((a,b)=>a+b,0)}</b> 音${outs.size?`(${outTxt})`:'(ぜんぶスケール内)'}</div>`;
  return div;
}
/* 1フレーズ分の「見出し + 譜面(背景色つき) + 音の並び」 */
function makePhraseView(f,hl,title){
  const t0=Math.round(f.a*96), rh=phraseRH(f);
  const by=new Map(); rh.slice().sort((x,y)=>x.on-y.on||x.p-y.p).forEach(n=>{ if(!by.has(n.on))by.set(n.on,[]); by.get(n.on).push(n); });
  const one=n=>{ const r=roleTxt(n.p,n.on); return `<span style="color:${COL[roleOf(n.p,n.on)]}">${lab(midiName(n.p))}${r?`<small>(${r})</small>`:''}</span>`; };
  const seq=[...by.values()].map(g=>g.length>1?'<span class="chd">('+g.map(one).join(' ')+')</span>':one(g[0])).join(' → ');
  const box=document.createElement('div'); box.className='pview';
  box.innerHTML=`<div class="pvt">${title}</div><div class="staff"></div><div class="fseq">${seq}</div>`;
  const el=box.querySelector('.staff');
  try{ renderFragStaff(el,rh,Math.floor(t0/384),hl); }catch(e){ el.innerHTML='<span class="err">譜面の描画に失敗: '+e.message+'</span>'; console.error(e); }
  return box;
}
/* 他のフレーズとの比較(トグル)。このフレーズと比べる先の両方の譜面に、対応する音の背景色を付ける */
function makeRefDetails(f,rf,cm,spec){
  const t0=Math.round(rf.a*96), t1=Math.round(rf.b*96);
  const rh=phraseRH(rf), lh=INTRO_NOTES.filter(n=>n.h==='L'&&n.on<t1&&n.on+n.du>t0);
  const d=document.createElement('details'); d.className='ref';
  const sid='ph'+String(rf.fid).padStart(2,'0');
  d.innerHTML=`<summary>他のフレーズと比べる:小節${phraseBar(rf)}「${rf.title.split(':')[0]}」</summary>
    <div class="refbody"><div class="hlg">${spec.groups?`<span class="sw" style="background:${HL_GROUPS[0]}"></span><span class="sw" style="background:${HL_GROUPS[1]}"></span><span class="sw" style="background:${HL_GROUPS[2]}"></span><span class="sw" style="background:${HL_GROUPS[3]}"></span>同じ色どうしが対応(同じ高さの音を逆の順にたどっている)`:'<span class="sw same"></span>同じ音 <span class="sw diff"></span>ちがう音(置きかわり)<small>対応する音の背景に色が付きます</small>'}</div>
    <div class="pvs"></div>
    <div class="refpt">${rf.pt}</div>
    <div class="refbtn"><button class="btn sm">▶ 比べる先を聴く</button> <a href="#${sid}" class="reflink">比べる先のステップへ</a></div></div>`;
  const pvs=d.querySelector('.pvs');
  pvs.appendChild(makePhraseView(f,cm.mine,`このフレーズ(小節${phraseBar(f)})`));
  pvs.appendChild(makePhraseView(rf,cm.other,`比べる先(小節${phraseBar(rf)})`));
  d.querySelector('button').onclick=()=>playItems([...rh,...lh].map(n=>{
    const on=Math.max(n.on,t0), off=n.h==='R'?n.on+n.du:Math.min(n.on+n.du,t1+48);
    return {m:n.p,at:(on-t0)/96,d:Math.max(.1,(off-on)/96)};
  }));
  return d;
}
function makeFragCard(f,opt){
  opt=opt||{};
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
  const tail=segs.slice(1).reduce((a,x)=>a+x.sn.length,0);   // 次のコードに入ってしまった音(着地の1音など)
  if(segs[0].e.scaleSet&&tail<=1){
    const e=segs[0].e, ps=segs[0].sn.map(n=>n.p), lo=Math.min(...ps), hi=Math.max(...ps), tick=segs[0].sn[0].on;
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
  card.innerHTML=`<div class="h">${opt.step?'':`<b>${f.title}</b>`}<span class="plays"><button class="btn main-play" title="前後の和音つき(練習する音だけ大きく)→ 休符 → 練習する部分だけ">▶ 前後つき→単独</button><button class="btn solo-play">▶ 単独だけ</button></span></div>
    <div class="fsub">小節${Math.floor((t0+t1)/2/384)+2}(拍${f.a}〜${f.b})・${segs.map(x=>x.e.sym+' '+x.e.deg).join(' → ')}</div>
    ${stageHtml}
    ${stages.length?'<div class="stl" style="margin-top:8px"><span class="fno">③</span><b>フレーズ(実譜)</b><small>①の音を、②の中から選んで並べるとこうなる</small></div>':''}
    <div class="staff"></div>
    <div class="fseq">${seq}</div>
    ${segs.map(x=>`<div class="fp"><div class="sc">${x.e.sym} のスケール: ${x.e.scaleName}</div><div class="kb">${segKeyboard(x.e,x.sn)}</div></div>`).join('')}
    <div class="lhline">左手(実譜・音名のみ): ${[...new Set(lh.map(n=>lab(midiName(n.p))))].join(' → ')||'—'}</div>
    <div class="pt">${f.pt}</div><div class="refs"></div>`;
  const staffEls=card.querySelectorAll('.staff');
  const refSpec=(f.refs||[])[0], refPh=refSpec&&PHRASES.find(p=>p.fid===refSpec.id), cm=refPh?cmpMarks(f,refPh,refSpec):null;
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
  if(refPh) card.querySelector('.refs').appendChild(makeRefDetails(f,refPh,cm,refSpec));
  return card;
}
/* コードごとの「使える音」説明(TL_DEF から自動生成) */
function chordInfoHtml(key){
  const d=TL_DEF[key]; const nm=(arr)=>arr.map(n=>`${lab(n)}(${d.roles[n]||''})`).join('・');
  return `<b>${d.sym}</b>(${d.deg}): コードトーン ${nm(d.tones)} / テンション ${nm(d.tens)} / スケール ${d.scale.name}`;
}
/* イントロ全体(右手)を、コードの区間ごとに 1拍〜1小節ほどのフレーズに切ったもの(曲の進行順)。
   a,b=拍(0始まり)。title=フレーズの形、pt=成り立ちの解説。 */
const PHRASES = [
 {a:0,b:1.75,title:'3rd を半音下で飾る:(3・5・7)→ 3 → 経 → 3 → 5 → 9',
  pt:'頭に D△7 の和音(ファ#・ラ・ド#=3・5・7)。そのあと 3rd のファ#を、半音下のファ(灰色)でかすめて、ラ(5th)→ミ(9th)と上がる。'},
 {a:1.75,b:3.75,title:'C#7alt:和音 → R → ♭7 → 経 → ♭7 → ♭13',
  pt:'ファ・ラ・シ・レ(3・♭13・♭7・♭9)の和音を先取りで入れてから、ド#(R)→シ(♭7)。シをド(灰色)で上から飾って(シ→ド→シ)、ラ(♭13)へ。'},
 {a:3.75,b:5.75,title:'F#m9:9+11 の和音 → 駆け上がり 9 → ♭3 → 5 → ♭7 → 9 → 11',
  pt:'ソ#+シ(9+11)の和音のあと、ソ#から ラ・ド#・ミ(♭3・5・♭7)と上がり、ソ#(9th)・シ(11th)で止まる。F#m9 のアルペジオに、頭のソ#(9th)を足した形。最初の4音は32分音符。'},
 {a:5.75,b:8,title:'A13sus:13 → ♭7 → R(+経)→ R → ♭7 → 11 → 5',
  pt:'シ・レ・ファ#・ソ(9・11・13・♭7)の和音から、ファ#(13th)・ソ(♭7)・ラ(R)と上がり、ラの隣のラ#(灰色)をぶつけてから、ラ→ソへ戻る。最後のレ・ミ(11・5)が次の D△9 への橋渡し。3rd(ド#)は弾かない。'},
 {a:8,b:9.75,refs:[{id:1}],title:'半音下から入る:(7・9・3)→ 経 → 3 → 5 → 7 → 9',
  pt:'ド#・ミ・ファ#(7・9・3)の和音のあと、ファ(灰色)から ファ#・ラ・ド#・ミ(3・5・7・9)と上がる。小節2の「ファ#を半音下で飾る」の続きの形。ファ・ファ#・ラは三連符。'},
 {a:9.75,b:11,title:'G#m7:上3音の和音から降りる',
  pt:'シ・レ#・ファ#(♭3・5・♭7)の和音から、ミ(♭13)→ド#(11)→シ(♭3)と降りる。'},
 {a:11,b:12,title:'C#7:和音 → ♭7 → ♭13 → 11',
  pt:'ド(灰色)+ミ(#9)の和音のあと、シ(♭7)・ラ(♭13)・ファ#(11th)と降りる。ドだけスケール外。'},
 {a:12,b:13.75,title:'F#m7:和音と単音のかけ合い',
  pt:'ミ+ソ#(♭7+9th)の和音 → ラ → ラ+レ#(♭3+13th)の和音 → ミ → ド#。レ#(13th)は F#ドリアンの特徴音。'},
 {a:13.75,b:16,title:'A9sus4:和音 → 13 → 5 → (♭7+経)→ 9 → R → 13',
  pt:'ソ・シ・レ・ミ(♭7・9・11・5)の和音のあと、ファ#(13)→ミ(5)→ソ+ド(♭7+灰色)の和音→シ(9)→ラ(R)→ファ#(13)。3rdのド#は弾かない。'},
 {a:16,b:17.75,refs:[{id:5}],title:'テンションで始まりテンションで終わる:(9・3・5・7)→ 9 → 3 → 5 → 7 → 9',
  pt:'ミ・ファ#・ラ・ド#の和音のあと、ミ(9th)から 3rd・5th・7th と上がって、ミ(9th)で終わる。小節4の「半音下から入る」のファを、ミ(9th)に替えた形。'},
 {a:17.75,b:19.75,title:'C#7alt:ファ・ラ・シ を保って上の音だけ動かす',
  pt:'ファ・ラ・シ(3・♭13・♭7)は同じ指のまま、一番上だけレ(♭9)→ド#(R)に動く。そのあと ファ+ラ#(灰色)→シ→ラ。'},
 {a:19.75,b:22,refs:[{id:3,groups:[
   {a:[21.5],b:[4.5]},            // ソ#(低): 小節7では最後、小節3では最初
   {a:[21.25],b:[4.625]},         // ラ(♭3)
   {a:[20.75],b:[4.75]},          // ド#(5th)
   {a:[20.5],b:[4.875,5]}         // ミ+ソ#(♭7+9): 小節7は和音、小節3は ミ→ソ# と順に
 ]}],title:'F#m9:和音 → 降りてくる (♭7+9) → 5 → 11 → ♭3 → 9 → 次のRへ',
  pt:'ラ・ド#・シ(♭3・5・11)の和音のあと、ミ+ソ#(♭7+9)から ド#・シ・ラ・ソ#と降りて、ソ#(9th)から最後のラへ。最後のラは、次の A13sus のルート(ベースの A と同時)。小節3の駆け上がりの逆向き。'},
 {a:22,b:23,title:'1拍の16分:13 → ♭7 → 9 → 11',
  pt:'ファ#(13)→ソ(♭7)→シ(9)→レ(11)。16分音符で切れ目なくつなぐ。3rdのド#は弾かず、テンションとミクソリディアンの音だけで作る。'},
 {a:23,b:24,title:'A13sus:(♭7+9+13)の和音 → 5 → 11 → 5',
  pt:'ソ・シ・ファ#(♭7・9・13)の和音から、ミ・レ・ミ。次の小節の D△9 につなぐ。'},
 {a:24,b:25.75,title:'コードトーンだけ:7 → R → 3 → 5 → 7 →(R+3+9)',
  pt:'ぜんぶコードトーン。ド#(7th)から、ルート・3rd・5th・7th と1音ずつ上がり、最後に レ+ファ#+ミ(R+3+9)の和音を先取りで入れる。'},
 {a:25.75,b:27,refs:[{id:6}],title:'G#m7:上3音の和音 → ♭13 → ♭7 → 経',
  pt:'小節4と似た形。頭の和音はシ・レ・ファ#で、小節4の シ・レ#・ファ# の レ#(5th)が半音下のレ(灰色)に替わっている。そこから ミ(♭13)→ファ#(♭7)→ラ(灰色)と、今度は上へ向かう。'},
 {a:27,b:28,title:'C#7:3rd+♭13 の和音 → #9 → ♭9 → 11',
  pt:'ファ(3rd)+ラ(♭13)の和音から、ミ(#9)・レ(♭9)と半音ずつ降りて、低いファ#(11th)へ。'},
 {a:28,b:30,title:'平行下降:A/F# → G#/F → G/E',
  pt:'スケールもコードトーンの番号も関係なく、<b>同じ形の和音を半音ずつ平行移動</b>しているだけ。ミ・ラ・ド#→レ#・ソ#・ド→レ・ソ・シ。左手も F#→F→E。'}
];
PHRASES.forEach((f,k)=>{ f.fid=k+1; });   // JSON のファイル名用の通し番号

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
  think:['速そうなフレーズの多くは、コードトーンを順に弾いているだけ。','3小節目の上昇(ソ#・ラ・ド#・ミ・ソ#・シ)は F#m9 のアルペジオ。'],
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
  do:['ステップ2のブロックコードに、オレンジの音(テンション)を足して弾き比べる。D△7→D△9、F#m7→F#m9、A7→A7sus4(9,13)、C#7→C#7(♭9,♭13)。','次に、右手だけで <b>F#m7 → Bm7♭5 → A△7 → G△7</b> と弾く。左手のルート(D → C# → F# → A)の上で、それぞれ D△9 → C#7(♭9,♭13) → F#m9 → A7sus4(9,13) になる。'],
  think:['<b>右手は「ルートの上に重ねた別のコード」</b>と見ると覚えやすい:D=F#m7、C#=Bm7♭5、F#=A△7、A=G△7、G#=B。どれも 3rd か ♭7th から3度ずつ積んだ形で、9・11・13 が自然に入る。','テンション=9th(ルートの2音上)・11th(4音上)・13th(6音上)。','C#7(♭9,♭13) は、ドミナントが F#m に解決する前の「ひねり」。','A7sus4(9,13) は 3rd(ド#)を弾かないので宙に浮く。'],
  cards:{kind:'tension',list:['D7','C7','F7','A7','G7']}},
 {id:'s10',title:'全体を組み立てる(2〜9小節)',goal:'コード名・度数・役割を意識して通して弾く',
  do:['左手だけ→右手だけ(2小節ごと)→両手。最後は「今のコード名」を心の中で言いながら(♩=60から)。'],
  think:['A ブロック(2-3, 6-7)=丸サ進行そのもの。B ブロック(4-5, 8-9)=間に G#m7 を挟んだ変形。6〜8小節は2〜4小節の繰り返し+メロが1オクターブ上。','9小節目は A/F#→G#/F→G/E と、コード全体が半音ずつ下がる平行移動(ベースも F#→F→E)。'],
  bars:[0,7]},
 {id:'tr1',title:'フレーズの形を別のコードに移す(アドリブへの第一歩)',goal:'実譜のフレーズの形を、ほかのコードでも弾く',
  do:['フレーズ断片を1つ選び、度数の並びを保ったまま別のコードの上で弾く(例:D△9 の 9→3→5→7→9 を G#m7 で)。','下の形1〜3を5つのコードで。丸サ進行の各コードで、1コード=1小節で同じ形を順に。','リズムを変えて遊ぶ。慣れたら形を2つ組み合わせる。'],
  think:['フレーズ=度数の並び。別のコードに移すと、音は変わっても形は同じ。','灰色の接近音は、コードトーンの半音上か下から入る飾り。ほぼどのコードでも使える。','合わない組み合わせ(長3度のコードの上の 11th など)は、濁ったら避ける。'],
  note:'灰色=接近音、青=コードトーン、オレンジ=テンション。8分音符で書いてあります。',
  groups:[...PH_REAL,...PH_EXT].map(phGroup)}
];

/* フレーズごとに1ステップ(小節の若い順)。s10(全体)の直前に差し込む */
{
  const phSteps=PHRASES.map(f=>{
    const t0=Math.round(f.a*96), t1=Math.round(f.b*96);
    const chs=TL.filter((e,i)=>e.start<t1&&(i+1<TL.length?TL[i+1].start:1e9)>t0).map(e=>e.sym).join(' → ');
    return {id:'ph'+String(f.fid).padStart(2,'0'),title:`小節${Math.floor((t0+t1)/2/384)+2}・${chs}`,goal:f.title,phrase:f};
  });
  STEPS.splice(STEPS.findIndex(s=>s.id==='s10'),0,...phSteps);
}

/* ============ スケール編 ============ */
const SCALE_RULE_HTML=`
<div class="callout"><b>選び方の手順</b>:① コード名から <b>3rd と 7th</b> を確認 → ② その2音を含むスケールを選ぶ → ③ スケールの残り3音が<b>テンション</b> → ④ <b>避ける音</b>を確認。</div>
<div style="overflow-x:auto"><table class="rule"><tr><th>コードの種類</th><th>基本のスケール</th><th>使えるテンション</th><th>避ける音(長く伸ばさない)</th><th>この曲では</th></tr>
<tr><td><b>△7</b>(メジャー7)</td><td>リディアン(キーの音をそのまま)<br>イオニアン</td><td>9・<b>#11</b>・13</td><td>イオニアンの4度(11th)= 3rd の半音上</td><td>D△7・D△9</td></tr>
<tr><td><b>m7</b>(マイナー7)</td><td>ドリアン(13th を使う)<br>エオリアン(♭13th を使う)</td><td>9・11・13<br>(エオリアンは 9・11・♭13)</td><td>エオリアンの ♭13th = 5th の半音上で濁りやすい</td><td>F#m7・F#m9(ドリアン)<br>G#m7(エオリアン)</td></tr>
<tr><td><b>7</b>(長調へ解決)</td><td>ミクソリディアン</td><td>9・13</td><td>11th(= 3rd の半音上)</td><td>(A7 は下の sus4 の形で使用)</td></tr>
<tr><td><b>7sus4</b>(3rd を弾かない)</td><td>ミクソリディアン</td><td>9・<b>11</b>・13</td><td>3rd を弾かなければ 11th も使える</td><td>A13sus4・A9sus4</td></tr>
<tr><td><b>7</b>(短調へ解決)</td><td>ミクソ♭9♭13<br>(ハーモニックマイナーを5度から)</td><td><b>♭9</b>・#9・<b>♭13</b></td><td>(♭9・♭13 のひねりが特徴)</td><td>C#7</td></tr>
<tr class="ref"><td><b>m7♭5</b></td><td>ロクリアン</td><td>11・♭13</td><td>♭9</td><td>(曲中には出ない)</td></tr></table></div>`;
const SCALE_STEPS=[
 {id:'sx0',title:'原則:コードからスケールを選ぶルール',goal:'「このコードならこのスケール」を自分で決められるようにする',
  do:['下の表を見ながら、曲中のコード(D△7・C#7・F#m7・A7sus4・G#m7)に使えるスケールを<b>自分で当ててから</b>、次のステップで答え合わせする。'],
  think:['<b>スケール7音 = コードトーン4音(R・3・5・7)+ 残り3音(9・11・13)</b>。スケールを選ぶ = どのテンションを使うかを選ぶこと。',
    '<b>3rd と 7th は動かせない</b>。長/短、△7/7/m7 で候補が絞られる(表)。',
    '<b>避ける音(アヴォイド)</b> = コードトーンの半音上の音。長く伸ばすと濁る。短い経過音ならOK。',
    '<b>キーの音</b>(A メジャーの7音)を、そのコードのルートから並べれば基本のスケール(Ⅳ△7 = リディアン)。キーからずれる音が、この曲の「おしゃれ」の元。',
    '<b>ドミナント7</b>は次のコードで決める:長調へ → ミクソリディアン、短調へ → ♭9・♭13 のひねり。'],
  html:SCALE_RULE_HTML},
 {id:'sx1',title:'D△7・D△9(Ⅳ)→ Dリディアン',goal:'キーの音をそのまま D から並べる',
  do:['右手で D リディアン(D E F# G# A B C#)を上行→下行(♩=60→80)。左手は D の全音符。','青(コードトーン)=D・F#・A・C#、オレンジ=E・G#・B を声に出しながら。'],
  think:['<b>理由</b>:Ⅳ△7 は A メジャーの音を D から並べた形 = リディアン。キーの音だけなので自然。','<b>他の候補</b>:イオニアン(G=4度)は 3rd(F#)の半音上でぶつかる。G#(#11)なら大丈夫。','<b>実譜の外れ音</b>:ファ(F)だけ(小節2・4)。3rd(ファ#)の半音下から入る接近音。'],
  cards:{kind:'scale',list:[SCALE_CARDS[0]]},usage:['D△7','D△9']},
 {id:'sx2',title:'C#7(Ⅲ7)→ C# ミクソ♭9♭13',goal:'解決先が短調のドミナントは、♭9・♭13 でひねる',
  do:['右手で C#・D・E#(ファ)・F#・G#・A・B を上行→下行。左手は C#。','レ(♭9)とラ(♭13)はオレンジ。この2音が「ひねり」。'],
  think:['<b>理由</b>:C#7 は F#m7(Ⅵm7)へ向かうドミナント。解決先が短調なので、F# ハーモニックマイナーを C# から並べた形(♭9・♭13)。','<b>他の候補</b>:ミクソリディアン(♮9・♮13)でも弾けるが、F#m に入る緊張感が弱くなる。','<b>実譜の外れ音</b>:ミ(E=#9)・ド(C)・ラ#(A#)。ミはドミナントの定番の飾り(#9)、ドとラ#は接近音。'],
  cards:{kind:'scale',list:[SCALE_CARDS[1]]},usage:['C#7alt','C#7']},
 {id:'sx3',title:'F#m7・F#m9(Ⅵm)→ F#ドリアン',goal:'レ#(13th)を使うのがこの曲の色',
  do:['右手で F# ドリアン(F# G# A B C# D# E)を上行→下行。左手は F#。','レ#(13th)だけ強調して、F#m7 のコードトーンと比べる。'],
  think:['<b>理由</b>:キーの音だけなら F# エオリアン(レ=♭13)。実譜はレ#(13th)を使うドリアン。','<b>他の候補</b>:エオリアンはレ(♭13)が 5th(ド#)の半音上で濁りやすい。ドリアンが無難。','<b>実譜の外れ音</b>:なし。スケール内の音だけでできている。'],
  cards:{kind:'scale',list:[SCALE_CARDS[2]]},usage:['F#m9','F#m7']},
 {id:'sx4',title:'A13sus4・A9sus4(Ⅰ7)→ Aミクソリディアン',goal:'3rd を弾かないと、11th が使える',
  do:['右手で A ミクソリディアン(A B C# D E F# G)を上行→下行。左手は A。','ド#(3rd)は弾かずに、シ(9)・レ(11)・ファ#(13)を強調して弾く。'],
  think:['<b>理由</b>:Ⅰ7 は、キーの音の G# を G(♭7)に下げた形。D△7(Ⅳ)へ向かう7thコード。','<b>sus4</b>:3rd(ド#)を弾かないので、11th(レ)が3rdとぶつからず使える。実譜の右手もド#を弾いていない。','<b>実譜の外れ音</b>:ラ#(A#)とド(C)。ラの隣と、ソ(♭7)と一緒に鳴る接近音。'],
  cards:{kind:'scale',list:[SCALE_CARDS[3]]},usage:['A13sus4','A9sus4']},
 {id:'sx5',title:'G#m7(Ⅶm7)→ G#エオリアン',goal:'短調への ii–V は、♭13(ミ)を含むスケール',
  do:['右手で G# エオリアン(G# A# B C# D# E F#)を上行→下行。左手は G#。','ミ(♭13)とド#(11)を意識して弾く。'],
  think:['<b>理由</b>:G#m7 → C#7 → F#m は短調への ii–V。実譜はミ(♭13)を使うので、B メジャーの音を G# から並べたエオリアン。','<b>他の候補</b>:ドリアン(ミ# = 13th)でも弾ける。','<b>実譜の外れ音</b>:レ(♭5)とラ(♭9)。ロクリアン寄りの音が一瞬混じる。'],
  cards:{kind:'scale',list:[SCALE_CARDS[4]]},usage:['G#m7']}
];
STEPS.splice(STEPS.findIndex(s=>s.id==='s7')+1,0,...SCALE_STEPS);

/* ============ ページ構成 ============ */
const PAGES = [
  {file:'index.html',   title:'はじめに',          desc:'コード進行の地図と、全体の進め方。',ids:[]},
  {file:'p1-chords.html',title:'1. コード編',      desc:'ルート → 4和音 → 転回形 → アルペジオ → つなぎ方 → ガイドトーン → 左手 → テンション。',ids:['s1','s2','inv1','s3','s4','s5','s6','s7']},
  {file:'p1b-scale.html',title:'2. スケール編',desc:'コードの種類から使えるスケールを選ぶ原則と、この曲のコードごとのスケール。',intro:'原則を表で確認してから、曲中の5種類のコードそれぞれのスケールを、理由・他の候補・実譜で使っているスケール外の音まで見る。',ids:['sx0','sx1','sx2','sx3','sx4','sx5']},
  {file:'p2-phrase.html',title:'3. フレーズ編(小節2〜5)',desc:'イントロを1〜2拍〜1小節のフレーズに切って、1つずつ「コードトーン → スケール → 実譜」で練習する。',ids:['ph01','ph02','ph03','ph04','ph05','ph06','ph07','ph08','ph09']},
  {file:'p3-score.html', title:'4. フレーズ編(小節6〜9)',desc:'続きのフレーズ(小節6〜9)と、最後に2〜9小節を通す。',ids:['ph10','ph11','ph12','ph13','ph14','ph15','ph16','ph17','ph18','s10']},
  {file:'p4-improv.html',title:'5. アドリブ編',     desc:'実譜のフレーズの形を、ほかのコードに移して弾く。',ids:['tr1']}
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
  document.getElementById('strip').innerHTML=all.map((ch,i)=>`<div class="bar ${i>=4&&i<7?'rep':''}"><div class="no">小節${i+2}${i>=4&&i<7?'(2-4の繰り返し)':''}${i===7?'(平行下降)':''}</div><div class="chs">${ch.map(c=>`<div class="c" style="--w:${c[2]}"><b>${c[0]}</b><i>${c[1]}</i></div>`).join('')}</div></div>`).join('');
}
function renderSteps(){
  const prog=loadProg(); const host=document.getElementById('steps'); if(!host){updateProg();return;} host.innerHTML='';
  if(PAGE.intro){ const c=document.createElement('div'); c.className='callout'; c.style.marginBottom='12px'; c.innerHTML=PAGE.intro; host.appendChild(c); }
  if(PAGE.ids.some(id=>/^(ph|sx[1-5])/.test(id))) host.appendChild(kbLegend());
  STEPS.forEach((s,i)=>{
    if(!PAGE.ids.includes(s.id)) return;
    const sec=document.createElement('section'); sec.className='step'+(prog[s.id]?' done':'')+(prog['_c_'+s.id]?' closed':''); sec.id=s.id;
    const cols=s.do?`<div class="cols">
        <div><h3><span class="tag">弾く</span></h3><ul>${s.do.map(x=>`<li>${x}</li>`).join('')}</ul></div>
        <div><h3><span class="tag th">考える</span></h3><ul>${s.think.map(x=>`<li>${x}</li>`).join('')}</ul></div>
      </div>`:'';
    sec.innerHTML=`<header><div class="num">${i+1}</div><div><h2>${s.title}</h2><div class="goal">${s.goal}</div></div>
      <label class="chk" onclick="event.stopPropagation()"><input type="checkbox" ${prog[s.id]?'checked':''}> できた</label></header>
      <div class="body">${cols}<div class="vis"></div></div>`;
    const vis=sec.querySelector('.vis');
    if(s.note){ const c=document.createElement('div'); c.className='callout'; c.innerHTML=s.note; vis.appendChild(c); }
    if(s.html){ const h=document.createElement('div'); h.innerHTML=s.html; vis.appendChild(h); }
    if(s.cards){ const g=document.createElement('div'); g.className='cards'; s.cards.list.forEach(k=>g.appendChild(makeCard(typeof k==='string'?CH[k]:k,s.cards.kind))); vis.appendChild(g); }
    if(s.groups){ s.groups.forEach(g=>{
      const dt=document.createElement('details'); dt.className='grp'; dt.open=true;
      dt.innerHTML=`<summary>${g.title}</summary><p class="small" style="margin:4px 0 0">${g.desc}</p>`;
      if(g.src){
        const sl=document.createElement('div'); sl.className='srcline';
        sl.innerHTML=`<span class="badge ${g.src.generic?'gen':'sc'}">${g.src.generic?'一般的な型':'実譜由来'}</span><span>${g.src.text}</span>`;
        (g.src.bars||[]).forEach(b=>{ const bt=document.createElement('button'); bt.className='btn'; bt.textContent=`▶ 実譜 小節${b+2}`; bt.onclick=()=>playBars(b,b); sl.appendChild(bt); });
        dt.appendChild(sl);
      }
      const cg=document.createElement('div'); cg.className='cards'; g.list.forEach(o=>cg.appendChild(makeCard(o,g.kind||'phrase'))); dt.appendChild(cg); vis.appendChild(dt);
    }); }
    if(s.usage){ vis.appendChild(makeUsageBlock(s.usage)); }
    if(s.phrase){ vis.appendChild(makeFragCard(s.phrase,{step:true})); }
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
  const pb=ptButton('intro-all',()=>barsSong(0,7),'🎹 piano-trainer で全体を練習','イントロ2〜9小節を piano-trainer に読み込む'); pb.style.marginLeft='8px'; $('btn-all').after(pb); }
if($('strip')) renderStrip();
renderTabs(); renderPager();
renderSteps();
