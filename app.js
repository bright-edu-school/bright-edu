const $=s=>document.querySelector(s);
const ses=JSON.parse(sessionStorage.getItem(S)||'null');
let me=ses&&db.users.find(u=>u.id===ses.id&&u.active);if(!me)location.replace('auth.html');
const MON=['Yanvar','Fevral','Mart','Aprel','May','Iyun','Iyul','Avgust','Sentabr','Oktabr','Noyabr','Dekabr'];
const PAN={rahbariyat:['admin','rahbar','rahbariyat'],admin:['admin'],rahbar:['admin','rahbar'],buxgalteriya:['admin','buxgalteriya','rahbar'],oquvchilar:['admin','rahbar','buxgalteriya','user']};
const TIT={rahbariyat:['📊','Rahbariyat'],admin:['🛡','Admin'],rahbar:['👁','Rahbar'],buxgalteriya:['💼','Buxgalteriya'],oquvchilar:['🎓','O‘quvchilar']};
const ROLE={admin:'Admin',rahbar:'Rahbar',buxgalteriya:'Buxgalteriya',rahbariyat:'Rahbariyat',user:'Oddiy foydalanuvchi'};
const SL={paid:'To‘langan',part:'Qisman to‘langan',none:'To‘lanmagan',trial:'Sinovda',na:'—'};
const PER=[['0','Bugun'],['2','3 kun'],['6','1 hafta'],['29','1 oy'],['89','3 oy'],['364','1 yil']];
const Y=new Date().getFullYear();
let st={p:null,tab:'users',btab:'in',cls:0,mon:new Date().getMonth(),per:'0',q:'',f:'all',d1:'',d2:'',ft:'all',nav:0};const hp=location.hash.slice(1);if(PAN[hp])st.p=hp;
const sum=a=>a.reduce((s,x)=>s+ +x.amount,0),fmt=n=>Math.round(n).toLocaleString('ru-RU')+'\u00a0so‘m';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const allowed=p=>PAN[p].includes(me.role),isA=()=>me.role==='admin',isF=()=>me.role==='admin'||me.role==='buxgalteriya';
function toast(t){const e=$('#tt');e.textContent=t;e.className='on';setTimeout(()=>e.className='',2200)}
const deny=()=>toast('Bu amal uchun ruxsat yo‘q');
const NOW=new Date(),CUR=Y*12+NOW.getMonth();
const sAbs=s=>{const[y,m]=(s.start||Y+'-0').split('-');return+y*12+ +m};
const calc=(s,m=st.mon)=>{m=+m;const a=Y*12+m,k=Y+'-'+m,rec=sum(db.income.filter(x=>x.sid===s.id&&+x.month===m&&x.date.slice(0,4)==Y)),o=(s.ov||{})[k],z=(stat,paid=0,debt=0)=>({paid,debt,stat});
 if(a<sAbs(s))return z('na');
 if(o==='paid')return z('paid',s.fee);if(o==='none')return z('none',0,s.fee);
 if(s.trial&&a===sAbs(s))return z('na',rec); // sinov oyi: to'lov talab qilinmaydi
 if(a<CUR&&rec===0)return z('paid',s.fee); // eski oylar: to'langan deb hisoblanadi
 return z(s.fee<=rec?'paid':rec>0?'part':'none',rec,Math.max(s.fee-rec,0))};
const card=(l,v)=>`<div class="card"><small>${l}</small><b>${v}</b></div>`;
const chips=(arr,cur,a)=>`<div class="row">${arr.map(([v,l])=>`<button class="ch ${cur==v?'a':''}" data-a="${a}" data-i="${v}">${l}</button>`).join('')}</div>`;
const monSel=()=>`<select data-s="mon">${MON.map((m,i)=>`<option value="${i}" ${st.mon==i?'selected':''}>${m}</option>`).join('')}</select>`;


/* ===== Fan havolalari (admin) ===== */
function lkView(){const rows=SUBJ.map((sj,si)=>{const T=sj.t.length?sj.t:[''];
 return`<div class="card" style="margin:14px 0"><small>${esc(sj.n)}</small>${T.map((t,ti)=>{const L=lkGet(sj.n,t);
  return`<div style="padding:10px 0;border-top:1px solid var(--ln)"><b style="font-size:15px">${esc(t||'Umumiy (ustoz belgilanmagan)')}</b><div class="row">${L.map((l,li)=>{const k=SRC[l.src]?l.src:srcOf(l.url);
   return`<span class="ch a" style="cursor:default">${SRC[k].i} ${SRC[k].l} · <a href="${esc(lkClean(l.url))}" target="_blank" rel="noopener noreferrer" style="color:inherit">${esc(l.url.replace(/^https?:\/\/(www\.)?/,'').slice(0,28))}</a> <button class="btn s o" style="padding:2px 8px" data-a="lkDel" data-i="${si}:${ti}:${li}" aria-label="O‘chirish">🗑</button></span>`}).join('')}<button class="btn s" data-a="lkAdd" data-i="${si}:${ti}">＋ Havola</button></div></div>`}).join('')}</div>`}).join('');
 return`<p class="mt">Fan ustiga bosilganda saytda chiqadigan havolalar. Link turi (YouTube / Telegram / Instagram) avtomatik aniqlanadi.</p>${rows}`}
function lkForm(si,ti){const sj=SUBJ[si],t=sj.t[ti]||'',d=$('#md');
 d.innerHTML=`<h3 style="margin:0 0 6px">Havola qo‘shish</h3><p style="font-size:13px;margin:0 0 6px">${esc(sj.n)}${t?' — '+esc(t):''}</p><form><label>1. Source</label><select name="src"><option value="yt">YouTube kanal</option><option value="tg">Telegram guruh</option><option value="ig">Dars jarayoni (Instagram)</option></select><label>2. Link</label><input name="url" placeholder="https://t.me/..." autocomplete="off"><p class="err" style="color:#ef4444;font-size:13px"></p><div class="row"><button class="btn s">Saqlash</button><button type="button" class="btn s o" id="mx">Bekor</button></div></form>`;
 const f=d.querySelector('form'),sel=f.elements.src,inp=f.elements.url;
 inp.addEventListener('input',()=>{const k=srcOf(lkClean(inp.value));if(k!=='ot')sel.value=k});
 f.onsubmit=e=>{e.preventDefault();if(!isA())return deny();const u=lkClean(inp.value);if(!u)return d.querySelector('.err').textContent='To‘g‘ri link kiriting';
  const k=srcOf(u),all=lkAll(),key=lkKey(sj.n,t);all[key]=[...(all[key]||[]),{src:k!=='ot'?k:sel.value,url:u}];lkSaveAll(all);d.close();toast('Havola saqlandi');render()};
 $('#mx').onclick=()=>d.close();d.showModal()}
function modal(t,F,fn){const d=$('#md');
 d.innerHTML=`<h3 style="margin:0 0 6px">${t}</h3><form>${F.map(f=>`<label>${f.l}</label>${f.o?`<select name="${f.k}">${f.o.map(([v,l])=>`<option value="${esc(v)}" ${f.v==v?'selected':''}>${esc(l)}</option>`).join('')}</select>`:`<input name="${f.k}" type="${f.t||'text'}" value="${esc(f.v)}" ${f.t==='number'?'min="0"':''}>`}`).join('')}<p class="err" style="color:#ef4444;font-size:13px"></p><div class="row"><button class="btn s">Saqlash</button><button type="button" class="btn s o" id="mx">Bekor</button></div></form>`;
 d.querySelector('form').onsubmit=async e=>{e.preventDefault();const o=Object.fromEntries(new FormData(e.target)),er=await fn(o);if(er)return d.querySelector('.err').textContent=er;save();d.close();render()};
 $('#mx').onclick=()=>d.close();d.showModal()}
const stuOpts=()=>[['','— tanlanmagan —'],...db.students.filter(s=>!s.left).map(s=>[s.id,s.name+' ('+s.cls+'-sinf)'])];
const clsOpts=()=>Array.from({length:11},(_,i)=>[i+1,(i+1)+'-sinf']);

function stu(){const LIM=me.role==='user'; // oddiy akkaunt: summalar yashirin (ko'rsatish uchun false qiling)
 let L=db.students.filter(s=>!s.left);const q=st.q.toLowerCase();
 if(st.cls)L=L.filter(s=>s.cls==st.cls);if(q)L=L.filter(s=>s.name.toLowerCase().includes(q));
 L=L.map(s=>({s,...calc(s)})).filter(r=>st.f==='all'||r.stat===st.f||(st.f==='debt'&&r.debt>0));
 return `<div class="row"><button class="ch ${st.cls?'':'a'}" data-a="cls" data-i="0">Hammasi</button>${clsOpts().map(([v,l])=>`<button class="ch ${st.cls==v?'a':''}" data-a="cls" data-i="${v}">${l} (${db.students.filter(s=>!s.left&&s.cls==v).length})</button>`).join('')}</div>
 <div class="row"><input data-s="q" placeholder="🔍 Qidirish…" value="${esc(st.q)}">${monSel()}<select data-s="f"><option value="all">Barcha holat</option><option value="debt" ${st.f=='debt'?'selected':''}>Qarzdorlar</option>${Object.entries(SL).filter(([k])=>k!='na'&&k!='trial').map(([k,v])=>`<option value="${k}" ${st.f==k?'selected':''}>${v}</option>`).join('')}</select>${isA()?'<button class="btn s" data-a="sNew">＋ O‘quvchi</button>':''}</div>
 <div class="tw"><table><tr><th>Ism familiya</th><th>Sinf</th><th>Oxirgi o‘qish holati</th>${LIM?'':'<th>Oylik to‘lov</th><th>To‘langan</th><th>Qarz</th>'}<th>Holat</th>${isF()||isA()?'<th></th>':''}</tr>
 ${L.map(({s,paid,debt,stat})=>`<tr><td>${esc(s.name)}</td><td>${s.cls}</td><td>${esc(s.status)||'—'}</td>${LIM?'':`<td>${fmt(s.fee)}</td><td>${fmt(paid)}</td><td>${fmt(debt)}</td>`}<td><span class="bd ${stat}">${SL[stat]}</span></td>${isF()||isA()?`<td><div class="ac">${isA()?`<button class="btn s o" title="Tahrirlash" data-a="sEdit" data-i="${s.id}">✎</button> <button class="btn s o" data-a="ov" data-i="${s.id}" title="To‘lov holatini qo‘lda belgilash">⚙</button> <button class="btn s o" title="O‘chirish" data-a="sDel" data-i="${s.id}">🗑</button>`:''} ${isF()?`<button class="btn s o" title="Kirim qo‘shish" data-a="pay" data-i="${s.id}">💰</button> <button class="btn s o" title="Maktabdan ketdi" data-a="left" data-i="${s.id}">Ketdi</button>`:''}</div></td>`:''}</tr>`).join('')||'<tr><td class="mt" colspan="8">O‘quvchi topilmadi</td></tr>'}</table></div>
 <p class="mt">${LIM?'Siz oddiy akkauntsiz: ma’lumotlarni faqat ko‘ra olasiz, summalar yashirilgan. ':''}To‘lov holati va qarz tanlangan oy (${MON[st.mon]} ${Y}) bo‘yicha kirimlardan avtomatik hisoblanadi. «—» — o‘quvchi hali qo‘shilmagan yoki sinov oyi (to‘lov talab qilinmaydi).</p>`}

function txTable(t){let L=[...db.income.map(x=>({...x,t:'in'})),...db.expense.map(x=>({...x,t:'out'}))];
 if(t!=='all')L=L.filter(x=>x.t===t);else if(st.ft!=='all')L=L.filter(x=>x.t===st.ft);
 if(st.d1)L=L.filter(x=>x.date>=st.d1);if(st.d2)L=L.filter(x=>x.date<=st.d2);L.sort((a,b)=>b.date.localeCompare(a.date));
 const nm=id=>(db.students.find(s=>s.id===id)||{}).name||'';
 return `<div class="row">${t==='all'?`<select data-s="ft"><option value="all">Kirim + chiqim</option><option value="in" ${st.ft=='in'?'selected':''}>Faqat kirim</option><option value="out" ${st.ft=='out'?'selected':''}>Faqat chiqim</option></select>`:''}<input type="date" data-s="d1" value="${st.d1}"><input type="date" data-s="d2" value="${st.d2}">${t!=='all'&&isF()?`<button class="btn s" data-a="${t==='in'?'inNew':'outNew'}">＋ Yangi ${t==='in'?'kirim':'chiqim'}</button>`:''}</div>
 <div class="tw"><table><tr><th>Sana</th><th>Tur</th><th>Summa</th><th>${t==='out'?'Qayerga':'Kimdan / qayerga'}</th><th>O‘quvchi</th><th>Oy</th><th>Izoh</th><th></th></tr>
 ${L.map(x=>`<tr><td>${x.date}</td><td><span class="bd ${x.t}">${x.t==='in'?'Kirim':'Chiqim'}</span></td><td>${fmt(x.amount)}</td><td>${esc(x.t==='in'?x.from:x.to)}</td><td>${esc(nm(x.sid))}</td><td>${x.t==='in'&&x.sid?MON[x.month]:''}</td><td>${esc(x.note)}</td><td>${isF()?`<button class="btn s o" data-a="txEdit" data-i="${x.id}" data-t="${x.t}">✎</button> <button class="btn s o" data-a="txDel" data-i="${x.id}" data-t="${x.t}">🗑</button>`:''}</td></tr>`).join('')||'<tr><td class="mt" colspan="8">Yozuv yo‘q</td></tr>'}</table></div>`}

const fin=(f,t)=>{const i=sum(db.income.filter(x=>x.date>=f&&x.date<=t)),o=sum(db.expense.filter(x=>x.date>=f&&x.date<=t));return{i,o,p:i-o}};
const PV={
rahbariyat:()=>{const a=fin(today(),today()),b=fin(ago(+st.per),today()),ac=db.students.filter(s=>!s.left).map(s=>({s,...calc(s,NOW.getMonth())})),plan=sum(ac.filter(x=>x.stat!=='trial'&&x.stat!=='na').map(x=>({amount:x.s.fee}))),dbt=sum(ac.map(x=>({amount:x.debt})));
 return `<h3>Qabulxona xodimlari</h3><div class="grid">${db.staff.map(s=>card(esc(s.name),esc(s.phone)||'—')).join('')}</div>${chips(PER,st.per,'per')}<div class="grid">${card('Bugungi tushum',fmt(a.i))}${card('Bugungi xarajat',fmt(a.o))}${card('Bugungi sof foyda',fmt(a.p))}${card('Davr tushumi',fmt(b.i))}${card('Davr xarajati',fmt(b.o))}${card('Davr sof foyda',fmt(b.p))}${card('Oylik reja ('+MON[NOW.getMonth()]+')',fmt(plan))}${card('Joriy oy qarzi',fmt(dbt))}</div><h3>Barcha davrlar bo‘yicha</h3><div class="tw"><table><tr><th>Davr</th><th>Tushum</th><th>Xarajat</th><th>Sof foyda</th></tr>${PER.map(([d,l])=>{const r=fin(ago(+d),today());return`<tr><td>${l}</td><td>${fmt(r.i)}</td><td>${fmt(r.o)}</td><td>${fmt(r.p)}</td></tr>`}).join('')}</table></div><p class="mt">Sof foyda = jami tushum − jami xarajat. Ma’lumotlar Buxgalteriya yozuvlaridan olinadi.</p>`},
rahbar:()=>{const act=db.students.filter(s=>!s.left),c=act.map(s=>calc(s)),f=fin('0000','9999');
 return `<div class="grid">${card('O‘quvchilar',act.length)}${card('Qarzdorlar ('+MON[st.mon]+')',c.filter(x=>x.debt>0).length)}${card('To‘langan',fmt(sum(c.map(x=>({amount:x.paid})))))}${card('To‘lanmagan',fmt(sum(c.map(x=>({amount:x.debt})))))}${card('Umumiy kirim',fmt(f.i))}${card('Umumiy chiqim',fmt(f.o))}${card('Sof foyda',fmt(f.p))}</div>`+stu()},
oquvchilar:()=>stu(),
buxgalteriya:()=>`${chips([['in','Kirimlar'],['out','Chiqimlar'],['hist','Moliyaviy tarix'],['left','Ketganlar']],st.btab,'btab')}`+(st.btab==='left'?`<div class="tw"><table><tr><th>Ism</th><th>Sinf</th><th>Ketgan sana</th><th>Saqlanadi</th><th></th></tr>${db.students.filter(s=>s.left).map(s=>`<tr><td>${esc(s.name)}</td><td>${s.cls}</td><td>${s.left}</td><td>${Math.max(0,30-Math.round((new Date(today())-new Date(s.left))/864e5))} kun</td><td>${isF()?`<button class="btn s o" data-a="restore" data-i="${s.id}">Qaytarish</button>`:''}</td></tr>`).join('')||'<tr><td class="mt" colspan="5">Ketgan o‘quvchi yo‘q</td></tr>'}</table></div>`:txTable(st.btab)),
admin:()=>`${chips([['users','Foydalanuvchilar'],['links','Fan havolalari'],['staff','Qabulxona'],['tools','Tizim']],st.tab,'tab')}`+(st.tab==='users'?`<div class="row"><button class="btn s" data-a="uNew">＋ Foydalanuvchi</button></div><div class="tw"><table><tr><th>Ism</th><th>Login/email</th><th>Rol</th><th>Holat</th><th></th></tr>${db.users.map(u=>`<tr><td>${esc(u.name)}</td><td>${esc(u.login)}</td><td><select data-a="role" data-i="${u.id}" ${u.id===me.id?'disabled':''}>${Object.entries(ROLE).map(([k,v])=>`<option value="${k}" ${u.role==k?'selected':''}>${v}</option>`).join('')}</select></td><td><span class="bd ${u.active?'paid':'none'}">${u.active?'Faol':'Bloklangan'}</span></td><td>${u.id===me.id?'':`<button class="btn s o" data-a="uAct" data-i="${u.id}">${u.active?'Bloklash':'Faollash'}</button> <button class="btn s o" data-a="uPw" data-i="${u.id}">Parol</button> <button class="btn s o" data-a="uDel" data-i="${u.id}">🗑</button>`}</td></tr>`).join('')}</table></div>`:st.tab==='links'?lkView():st.tab==='staff'?`<div class="grid">${db.staff.map((s,i)=>`<div class="card"><small>${esc(s.name)}</small><b>${esc(s.phone)||'—'}</b><br><button class="btn s o" data-a="stf" data-i="${i}">✎ Tahrirlash</button></div>`).join('')}</div>`:`<div class="card"><p>O‘quvchilar va moliya yozuvlarini «O‘quvchilar» va «Buxgalteriya» panellarida boshqaring.</p><div class="row"><button class="btn s" data-a="demo">Demo (soxta) ma’lumot qo‘shish</button><button class="btn s o" data-a="wipe">Hamma ma’lumotni tozalash</button></div><p class="mt">Haqiqiy shaxsiy/moliyaviy ma’lumot kiritmang: bu lokal prototip.</p></div>`)};

function render(){me=db.users.find(u=>u.id===me.id);if(!me||!me.active)return out();
 const P=Object.keys(PAN);if(!st.p||!allowed(st.p))st.p=P.find(allowed)||null;
 $('#app').innerHTML=`<aside id="sb" class="${st.nav?'on':''}"><a class="lg" href="index.html">BRIGHT<b>EDU</b></a>${P.map(p=>`<button class="nv ${st.p===p?'a':''}" data-a="nav" data-i="${p}">${TIT[p][0]} ${TIT[p][1]}${allowed(p)?'':' 🔒'}</button>`).join('')}<a class="nv" href="index.html">🏠 Bosh sahifa</a><button class="nv" data-a="out">↩ Chiqish</button></aside><div id="mn"><header class="tb"><button class="bg" data-a="menu">☰</button><h1>${st.p?TIT[st.p][1]:'Kabinet'}</h1><div class="us"><b>${esc(me.name)}</b><small>${ROLE[me.role]}</small></div></header><main>${st.p?PV[st.p]():'<div class="card"><h3 style="margin:0 0 6px">Xush kelibsiz!</h3><p>Sizda oddiy akkaunt bor. Maxsus panellarni faqat Admin ochib beradi.</p></div>'}</main></div>`;
 if(st.fx){const e=$('[data-s="'+st.fx+'"]');if(e){e.focus();e.setSelectionRange?.(99,99)}st.fx=null}}
const out=()=>{sessionStorage.removeItem(S);location.href='index.html'};

function inForm(x={}){modal(x.id?'Kirimni tahrirlash':'Yangi kirim',[{k:'date',l:'To‘lov sanasi',t:'date',v:x.date||today()},{k:'amount',l:'Summa',t:'number',v:x.amount||''},{k:'from',l:'Kimdan',v:x.from||''},{k:'sid',l:'O‘quvchi',o:stuOpts(),v:x.sid||''},{k:'month',l:'Qaysi oy uchun',o:MON.map((m,i)=>[i,m]),v:x.month??st.mon},{k:'note',l:'Izoh',v:x.note||''}],o=>{if(!isF())return'Ruxsat yo‘q';if(!(+o.amount>0))return'Summani kiriting';if(!o.date)return'Sanani tanlang';Object.assign(x,o,{amount:+o.amount,month:+o.month});if(!x.id){x.id=uid();db.income.push(x)}})}
function outForm(x={}){modal(x.id?'Chiqimni tahrirlash':'Yangi chiqim',[{k:'date',l:'Sana',t:'date',v:x.date||today()},{k:'amount',l:'Summa',t:'number',v:x.amount||''},{k:'to',l:'Pul qayerga sarflandi',v:x.to||''},{k:'note',l:'Izoh',v:x.note||''}],o=>{if(!isF())return'Ruxsat yo‘q';if(!(+o.amount>0))return'Summani kiriting';if(!o.to.trim())return'Qayerga sarflanganini yozing';Object.assign(x,o,{amount:+o.amount});if(!x.id){x.id=uid();db.expense.push(x)}})}
function sForm(x={}){modal(x.id?'O‘quvchini tahrirlash':'Yangi o‘quvchi',[{k:'name',l:'Ism va familiya',v:x.name||''},{k:'cls',l:'Sinf',o:clsOpts(),v:x.cls||1},{k:'fee',l:'Oylik to‘lov (so‘m)',t:'number',v:x.fee||''},{k:'start',l:'Qo‘shilgan oy',o:MON.map((m,i)=>[Y+'-'+i,m+' '+Y]),v:x.start||Y+'-'+NOW.getMonth()},{k:'trial',l:'Birinchi oy',o:[['1','Sinovda (to‘lovsiz)'],['0','Oddiy (to‘lov bilan)']],v:x.id?(x.trial?'1':'0'):'1'},{k:'status',l:'Oxirgi o‘qish holati / natijasi',v:x.id?x.status||'':'Sinovda'}],o=>{if(!isA())return'Ruxsat yo‘q';if(o.name.trim().length<3)return'Ismni kiriting';Object.assign(x,o,{cls:+o.cls,fee:+o.fee||0,trial:o.trial==='1'});if(!x.id&&o.trial==='1'&&!x.status.trim())x.status='Sinovda';if(!x.id&&o.trial==='0'&&x.status==='Sinovda')x.status='';if(!x.id){x.id=uid();db.students.push(x)}})}

document.addEventListener('input',e=>{if(e.target.dataset.s==='q'){st.q=e.target.value;st.fx='q';render()}});
document.addEventListener('change',e=>{const t=e.target,k=t.dataset.s;
 if(k){st[k]=k==='mon'?+t.value:t.value;return render()}
 if(t.dataset.a==='role'){if(!isA())return deny();const u=db.users.find(x=>x.id===t.dataset.i);u.role=t.value;save();toast('Rol yangilandi');render()}});
document.addEventListener('click',async e=>{const b=e.target.closest('[data-a]');if(!b||b.tagName==='SELECT')return;
 const a=b.dataset.a,i=b.dataset.i,t=b.dataset.t,s=db.students.find(x=>x.id===i),u=db.users.find(x=>x.id===i);
 const tx=()=>(t==='in'?db.income:db.expense).find(x=>x.id===i);
 switch(a){
 case'nav':if(!allowed(i))return deny();st.p=i;st.nav=0;st.q='';st.f='all';st.cls=0;break;
 case'menu':st.nav=!st.nav;break;case'out':return out();
 case'per':st.per=i;break;case'cls':st.cls=+i;break;case'tab':st.tab=i;break;case'btab':st.btab=i;break;
 case'sNew':if(!isA())return deny();return sForm();
 case'sEdit':if(!isA())return deny();return sForm(s);
 case'ov':if(!isA())return deny();{const k=Y+'-'+st.mon;return modal('To‘lov holati — '+MON[st.mon],[{k:'v',l:s.name,o:[['','Avtomatik'],['paid','To‘langan'],['none','To‘lanmagan']],v:(s.ov||{})[k]||''}],o=>{if(!isA())return'Ruxsat yo‘q';s.ov=s.ov||{};if(o.v)s.ov[k]=o.v;else delete s.ov[k]})}
 case'sDel':if(!isA())return deny();if(confirm('O‘quvchi o‘chirilsinmi?')){db.students=db.students.filter(x=>x!==s);save()}break;
 case'pay':if(!isF())return deny();return inForm({sid:i,month:st.mon});
 case'left':if(!isF())return deny();if(confirm(s.name+' «Ketdi» deb belgilansinmi? 30 kundan so‘ng o‘chiriladi.')){s.left=today();save()}break;
 case'restore':if(!isF())return deny();delete s.left;save();break;
 case'inNew':return inForm();case'outNew':return outForm();
 case'txEdit':return t==='in'?inForm(tx()):outForm(tx());
 case'txDel':if(!isF())return deny();if(confirm('Yozuv o‘chirilsinmi?')){const k=t==='in'?'income':'expense';db[k]=db[k].filter(x=>x.id!==i);save()}break;
 case'lkAdd':if(!isA())return deny();{const[a1,a2]=i.split(':');return lkForm(+a1,+a2)}
 case'lkDel':if(!isA())return deny();{const[a1,a2,a3]=i.split(':').map(Number),sj=SUBJ[a1],k=lkKey(sj.n,sj.t[a2]||''),all=lkAll();if(confirm('Havola o‘chirilsinmi?')){(all[k]||[]).splice(a3,1);lkSaveAll(all)}}break;
 case'uNew':if(!isA())return deny();return modal('Yangi foydalanuvchi',[{k:'name',l:'Ism va familiya'},{k:'login',l:'Login yoki email'},{k:'pw',l:'Parol (kamida 8 belgi)',t:'password'},{k:'role',l:'Rol',o:Object.entries(ROLE),v:'user'}],async o=>{if(!isA())return'Ruxsat yo‘q';if(o.name.trim().length<3||!o.login.trim())return'Ism va loginni kiriting';if(o.pw.length<8)return'Parol kamida 8 belgi';if(db.users.some(x=>x.login.toLowerCase()===o.login.trim().toLowerCase()))return'Bu login band';db.users.push({id:uid(),name:o.name.trim(),login:o.login.trim(),hash:await hs(o.pw),role:o.role,active:true})});
 case'uPw':if(!isA())return deny();return modal('Yangi parol',[{k:'pw',l:'Yangi parol',t:'password'}],async o=>{if(o.pw.length<8)return'Kamida 8 belgi';u.hash=await hs(o.pw)});
 case'uAct':if(!isA())return deny();u.active=!u.active;save();break;
 case'uDel':if(!isA())return deny();if(confirm('Foydalanuvchi o‘chirilsinmi?')){db.users=db.users.filter(x=>x!==u);save()}break;
 case'stf':if(!isA())return deny();{const x=db.staff[+i];return modal('Qabulxona xodimi',[{k:'name',l:'Ism',v:x.name},{k:'phone',l:'Telefon',v:x.phone}],o=>{Object.assign(x,o)})}
 case'demo':if(!isA())return deny();{const N=['Aziza','Bobur','Dilshod','Gulnora','Jasur','Madina','Nodira','Otabek','Sardor','Zilola'],F=['Karimov','Yusupova','Tursunov','Rahimova','Aliyev','Nazarova'];for(let k=0;k<24;k++){const id=uid()+k,fee=300000+Math.floor(Math.random()*5)*50000;db.students.push({id,name:'[DEMO] '+N[k%10]+' '+F[k%6],cls:1+k%11,fee,status:['A’lo','Yaxshi','Qoniqarli'][k%3],});if(k%3<2)db.income.push({id:uid()+'i'+k,date:today(),amount:k%3?fee/2:fee,from:'Demo ota-ona',sid:id,month:st.mon,note:'demo'})}save()}break;
 case'wipe':if(!isA())return deny();if(confirm('Barcha o‘quvchi va moliya yozuvlari o‘chadi. Davom etasizmi?')){db.students=[];db.income=[];db.expense=[];save()}break}
 render()});
render();
