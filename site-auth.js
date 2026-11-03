(()=>{const SS=sessionStorage.getItem('bright_session'),b=document.getElementById('authBtn');
let me=null;try{const db=JSON.parse(localStorage.getItem('bright_db_v1'));me=SS&&db.users.find(u=>u.id===JSON.parse(SS).id&&u.active)||null}catch(e){}
if(SS&&!me)sessionStorage.removeItem('bright_session');
if(me&&b){b.textContent='KABINET';b.href='app.html'}
const PAN={rahbariyat:['admin','rahbar','rahbariyat'],admin:['admin'],rahbar:['admin','rahbar'],buxgalteriya:['admin','buxgalteriya','rahbar'],oquvchilar:['admin','rahbar','buxgalteriya','user']};
const TIT={rahbariyat:'📊 Rahbariyat',admin:'🛡 Admin',rahbar:'👁 Rahbar',buxgalteriya:'💼 Buxgalteriya',oquvchilar:'🎓 O‘quvchilar'};
const ROLE={admin:'Admin',rahbar:'Rahbar',buxgalteriya:'Buxgalteriya',rahbariyat:'Rahbariyat',user:'Oddiy foydalanuvchi'};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const st=document.createElement('style');st.textContent=`body{transition:padding-left .4s cubic-bezier(.25,.8,.25,1)}body.bs{padding-left:248px}
#bsb{position:fixed;inset:0 auto 0 0;width:248px;z-index:40;padding:22px 14px;display:flex;flex-direction:column;gap:6px;background:color-mix(in srgb,var(--bg,#eef1fb) 94%,transparent);border-right:1px solid var(--line,rgba(20,30,90,.12));backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);transform:translateX(-100%);transition:transform .4s cubic-bezier(.25,.8,.25,1);box-shadow:20px 0 50px -30px rgba(30,40,130,.5)}#bsb.on{transform:none}
#bsb .bl{font-weight:800;font-size:20px;letter-spacing:-.03em;margin:6px 0 14px 8px}#bsb .bl b{background:var(--g);-webkit-background-clip:text;background-clip:text;color:transparent}
#bsb .bn{display:block;width:100%;text-align:left;padding:12px 14px;border-radius:14px;border:0;background:none;font:inherit;font-weight:600;font-size:15px;color:var(--ink2,#555b80);cursor:pointer;transition:background .3s,color .3s,transform .3s}
#bsb .bn:hover{background:var(--g);color:#fff;transform:translateX(4px)}#bsb .lk{opacity:.65}
#bsb .bu{margin-top:auto;padding:12px 8px 6px;border-top:1px solid var(--line,rgba(20,30,90,.12));font-size:14px}#bsb .bu small{display:block;color:var(--ink2,#555b80);font-size:12px;line-height:1.4;margin-top:2px}#bsb .bu small.r{color:var(--vio,#4f46e5);font-weight:600;font-size:13px}
#bsb .bu a{display:inline-block;margin-top:8px;padding:7px 16px;border-radius:99px;background:var(--g);color:#fff;font-size:13px;font-weight:600}
#bst{position:fixed;left:14px;bottom:calc(20px + env(safe-area-inset-bottom,0px));z-index:45;width:52px;height:52px;border-radius:50%;border:0;background:var(--g);color:#fff;font-size:22px;cursor:pointer;box-shadow:0 14px 30px -10px #4f46e5;transition:all .4s cubic-bezier(.25,.8,.25,1)}
body.bs #bst{left:196px;top:calc(16px + env(safe-area-inset-top,0px));bottom:auto;width:40px;height:40px;font-size:17px}
#btt{position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:var(--ink,#0b1030);color:var(--bg,#fff);padding:10px 18px;border-radius:99px;font-size:14px;opacity:0;transition:.3s;z-index:99;pointer-events:none}#btt.on{opacity:1}
@media(max-width:1099px){body.bs{padding-left:0}}`;document.head.appendChild(st);
const a=document.createElement('aside');a.id='bsb';
const foot=me?`<div class="bu"><b>${esc(me.name)}</b><small class="r">${ROLE[me.role]}</small>${me.role==='user'?'<small>Maxsus bo‘limlarni faqat ma’muriyat ochadi.</small>':''}</div>`:`<div class="bu"><small>🔒 Qulflarni ochish uchun hisobingizga kiring</small><a href="auth.html">Kirish</a></div>`;
a.innerHTML=`<a class="logo bl" href="#">BRIGHT<b>EDU</b></a>`+Object.keys(PAN).map(p=>{const ok=me&&PAN[p].includes(me.role);return`<a class="bn${ok?'':' lk'}" href="app.html#${p}" data-ok="${ok?1:0}">${TIT[p]}${ok?'':' 🔒'}</a>`}).join('')+(me?`<a class="bn" href="app.html">🏠 Kabinet</a><button class="bn" id="bso">↩ Chiqish</button>`:'')+foot;
const t=document.createElement('button');t.id='bst';t.setAttribute('aria-label','Bo‘limlar');
const tt=document.createElement('div');tt.id='btt';document.body.append(a,t,tt);
const toast=m=>{tt.textContent=m;tt.className='on';setTimeout(()=>tt.className='',2200)};
const set=o=>{a.classList.toggle('on',o);document.body.classList.toggle('bs',o);t.textContent=o?'✕':'☰';sessionStorage.setItem('bright_sb',o?'1':'0')};
set(!!me&&innerWidth>=1100&&sessionStorage.getItem('bright_sb')!=='0');
t.onclick=()=>set(!a.classList.contains('on'));
a.addEventListener('click',e=>{const l=e.target.closest('a[data-ok="0"]');if(l){e.preventDefault();toast(me?'Bu bo‘limga ruxsatingiz yo‘q':'Avval hisobingizga kiring 🔒')}});
const o=document.getElementById('bso');if(o)o.onclick=()=>{sessionStorage.removeItem('bright_session');location.reload()};
})();
