/* Fanlar, ustozlar va havolalar (index.html va app.html uchun umumiy) */
const SUBJ=[
 {n:'English',t:['Husniddin Ismoilov','Abbosbek Madrahimov','Norinboyev Saidolim']},
 {n:'Matematika',t:['Elmurod Turdialiyev','Shukurjon','Azizbek','Islomjon']},
 {n:'IT Savodxonlik',t:['Adhamjon']},
 {n:'Fizika',t:['Shohruh Niyozov']},
 {n:'SAT',t:['Yorqinjon Niyozov']},
 {n:'Ona tili',t:['Rustamjon','Zarina']},
 {n:'Adabiyot',t:['Axrorbek','Zarina']},
 {n:'Huquq',t:['Mansurjon']},
 {n:'Tarix',t:['Mansurjon']},
 {n:'Turk tili',t:['Xafizaxon']},
 {n:'Koreys tili',t:['Asliddin']},
 {n:'Kimyo',t:['Shavkatjon']},
 {n:'Biologiya',t:[]},
 {n:'Science',t:[]},
 {n:'Rus tili',t:['Xafizaxon']}
];
const LK_KEY='bright_links_v1';
/* source turlari: yt / tg / ig */
const SRC={yt:{l:'YouTube kanal',i:'▶'},tg:{l:'Telegram guruh',i:'✈'},ig:{l:'Dars jarayoni',i:'◎'},ot:{l:'Havola',i:'↗'}};
function lkAll(){try{return JSON.parse(localStorage.getItem(LK_KEY))||{}}catch(e){return{}}}
function lkSaveAll(o){localStorage.setItem(LK_KEY,JSON.stringify(o))}
/* kalit: "Fan|Ustoz" (ustozi yo'q fanlar uchun "Fan|") */
const lkKey=(s,t)=>s+'|'+(t||'');
function lkGet(s,t){const a=lkAll()[lkKey(s,t)];return Array.isArray(a)?a:[]}
/* linkni ko'rib source ni aniqlaydi */
function srcOf(url){let h='';try{h=new URL(url).hostname.replace(/^www\.|^m\./,'').toLowerCase()}catch(e){return'ot'}
 if(h==='youtube.com'||h==='youtu.be'||h.endsWith('.youtube.com'))return'yt';
 if(h==='t.me'||h==='telegram.me'||h==='telegram.org')return'tg';
 if(h==='instagram.com'||h.endsWith('.instagram.com')||h==='instagr.am')return'ig';
 return'ot'}
/* faqat http/https; https:// avtomatik qo'shiladi */
function lkClean(u){u=String(u||'').trim();if(!u)return'';if(!/^https?:\/\//i.test(u))u='https://'+u;
 try{const x=new URL(u);return/^https?:$/.test(x.protocol)&&x.hostname.includes('.')?x.href:''}catch(e){return''}}
