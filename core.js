const SALT='bright_edu_v1:',K='bright_db_v1',S='bright_session';
const hs=async p=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(SALT+p)))].map(b=>b.toString(16).padStart(2,'0')).join('');
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const ds=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const today=()=>ds(new Date());
const ago=n=>{const d=new Date();d.setDate(d.getDate()-n);return ds(d)};
let db;
function save(){localStorage.setItem(K,JSON.stringify(db))}
function load(){try{db=JSON.parse(localStorage.getItem(K))}catch(e){db=null}
 if(!db)db={users:[
  {id:'u1',name:'Administrator',login:'admin',hash:'38dcdb417c998d1004490427729706b2bc29b055bc3657ace48f7e3a88bf2a17',role:'admin',active:true},
  {id:'u2',name:'Rahbar',login:'rahbar',hash:'838c82824c9514b4dc51270d44f91d86c5e00bd924f92f6cd447172fc3942425',role:'rahbar',active:true},
  {id:'u3',name:'Buxgalter',login:'buxgalter',hash:'79c991a1349818bd93e4e7b718bd7d6e96bd14737983bd6e2c472667190459a8',role:'buxgalteriya',active:true}],
  students:[],income:[],expense:[],staff:[{name:'Qabulxona xodimi 1',phone:''},{name:'Qabulxona xodimi 2',phone:''}]};
 const lim=ago(30);db.students=db.students.filter(s=>!s.left||s.left>lim); // 30 kundan keyin o'chadi
 save()}
load();
