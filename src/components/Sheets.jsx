import {useState} from 'react'
import {C,IC,mk,pd,cal,monthName,ymd,D0} from '../lib/core.js'
import {ITEMS,RAR} from '../lib/chest.js'
import {useApp,KEY,seed} from '../store.jsx'
import Icon from './Icon.jsx'

function Sheet({title,children}){
  const {setSh}=useApp(),[out,setOut]=useState(false)
  const close=()=>{setOut(true);setTimeout(()=>setSh(null),220)}
  return <div className={'ov'+(out?' out':'')} onPointerDown={e=>e.target===e.currentTarget&&close()}>
    <div className="sheet"><div className="sh-h"><button className="rb" onClick={close}><Icon n="x"/></button><h2>{title}</h2><span style={{width:39}}/></div>{children(close)}</div></div>
}
const Lb=({children})=><span className="lb" style={{cursor:'default'}}>{children}</span>
const Seg=({v,opts,on})=><div className="seg" style={{gridTemplateColumns:`repeat(${opts.length},1fr)`}}>{opts.map(([k,l])=><button key={k} className={v===k?'sel':''} onClick={()=>on(k)}>{l}</button>)}</div>

function Form({id,close}){
  const {S,up,t,X}=useApp(),h=S.habits.find(x=>x.id===id)
  const [f,setF]=useState(()=>h?{min:'',why:'',cue:'',act:'',rt:'',...h}:{name:'',desc:'',color:C[0],icon:'pulse',type:'build',goal:0,min:'',why:'',cue:'',act:'',rt:''}),set=(k,v)=>setF(o=>({...o,[k]:v}))
  const save=()=>{const name=f.name.trim();if(!name)return
    up(s=>{if(h)Object.assign(s.habits.find(x=>x.id===id),{name,desc:f.desc,color:f.color,icon:f.icon,type:f.type,goal:f.goal,min:f.min.trim(),why:f.why.trim(),cue:f.cue.trim(),act:f.act.trim(),rt:f.rt})
      else{const x=mk(name,f.desc,f.color,f.icon);Object.assign(x,{type:f.type,goal:f.goal,min:f.min.trim(),why:f.why.trim(),cue:f.cue.trim(),act:f.act.trim(),rt:f.rt});s.habits.push(x)}})
    if(f.rt&&typeof Notification!=='undefined'&&Notification.permission==='default')Notification.requestPermission().catch(()=>{});close()}
  return <div style={{'--c':f.color}}>
    <div className="hero"><Icon n={f.icon}/></div>
    <div className="ip">{IC.map(k=><button key={k} className={k===f.icon?'sel':''} onClick={()=>set('icon',k)}><Icon n={k}/></button>)}</div>
    <Lb>{t('NAME')}</Lb><input className="in" dir="auto" value={f.name} onChange={e=>set('name',e.target.value)}/>
    <Lb>{t('DESCRIPTION')}</Lb><input className="in" dir="auto" value={f.desc} onChange={e=>set('desc',e.target.value)}/>
    <Lb>{t('COLOR')}</Lb><div className="sws">{C.map(c=><button key={c} className={'sw'+(c===f.color?' sel':'')} style={{background:c}} onClick={()=>set('color',c)}/>)}</div>
    <Lb>{t('HABIT TYPE')}</Lb><Seg v={f.type} on={k=>set('type',k)} opts={[['build',t('Build A Habit')],['quit',t('Quit A Habit')]]}/>
    <Lb>{X('نسخه‌ی حداقل (اختیاری)','MINIMUM VERSION (OPTIONAL)')}</Lb><input className="in" dir="auto" maxLength={28} value={f.min} placeholder={X('مثلاً: ۲ دقیقه کشش','e.g. 2 minutes of stretching')} onChange={e=>set('min',e.target.value)}/>
    <p className="hint" style={{margin:'-4px 6px 10px'}}>{X('روزای بی‌حالی فقط همینو بزن؛ استریک نمیپره (نصف کاپ).','On low days do just this; your streak survives (half trophies).')}</p>
    <details><summary className="lb">{X('انگیزه و برنامه ⌄','MOTIVATION & PLAN ⌄')}</summary>
      <Lb>{X('چرا برات مهمه؟','WHY DOES IT MATTER TO YOU?')}</Lb><input className="in" dir="auto" maxLength={90} value={f.why} placeholder={X('مثلاً: میخوام انرژی بیشتری برای بچه‌ها داشته باشم','e.g. I want more energy for my kids')} onChange={e=>set('why',e.target.value)}/>
      <Lb>{X('برنامه‌ی اگر-آنگاه: وقتی …','IF-THEN PLAN: WHEN …')}</Lb><input className="in" dir="auto" maxLength={50} value={f.cue} placeholder={X('مثلاً: از محل کار رسیدم خونه','e.g. I get home from work')} onChange={e=>set('cue',e.target.value)}/>
      <Lb>{X('… اون وقت','… THEN I')}</Lb><input className="in" dir="auto" maxLength={50} value={f.act} placeholder={X('مثلاً: لباس ورزشی میپوشم و ۱۰ دقیقه تمرین میکنم','e.g. put on workout clothes and train 10 minutes')} onChange={e=>set('act',e.target.value)}/>
      <Lb>{X('یادآور روزانه','DAILY REMINDER')}</Lb><input className="in" type="time" value={f.rt} onChange={e=>set('rt',e.target.value)}/>
      <p className="hint" style={{margin:'-4px 6px 10px'}}>{X('یادآور فقط وقتی کار میکنه که پیما باز (یا نصب‌شده و در حال اجرا) باشه؛ اعلان پس‌زمینه سرور لازم داره.','Reminders only fire while Peyma is open (or installed and running); true background push needs a server.')}</p>
    </details>
    <details><summary className="lb">{t('ADVANCED OPTIONS ⌄')}</summary><Lb>{t('STREAK GOAL (DAYS, 0 = NONE)')}</Lb>
      <input className="in" type="number" min="0" inputMode="numeric" value={f.goal} onChange={e=>set('goal',Math.max(0,+e.target.value||0))}/></details>
    <button className="save" disabled={!f.name.trim()} onClick={save}>{t('Save')}</button>
  </div>
}
function Note({id,d,close}){
  const {S,up,t,X}=useApp(),[v,setV]=useState(S.habits.find(x=>x.id===id)?.notes[d]||'')
  const save=()=>{up(s=>{const nt=s.habits.find(x=>x.id===id).notes;v.trim()?nt[d]=v.trim():delete nt[d]});close()}
  return <div style={{'--c':S.habits.find(x=>x.id===id)?.color}}><textarea className="in" dir="auto" value={v} onChange={e=>setV(e.target.value)} placeholder={X('یادداشت…','Note…')}/><button className="save" onClick={save}>{t('Save')}</button></div>
}
function Del({id,close}){
  const {S,up,t,X,go}=useApp(),[arm,setArm]=useState(false),h=S.habits.find(x=>x.id===id)
  return <><p dir="auto" style={{textAlign:'center',fontSize:18,margin:'8px 0 6px'}}>{h?.name}</p>
    <p style={{textAlign:'center',color:'var(--mu)',fontSize:14}}>{X('همه تیک‌ها و یادداشت‌های این عادت پاک میشه.','All check-ins and notes for this habit will be erased.')}</p>
    <button className="save red" onClick={()=>arm?(up(s=>{s.habits=s.habits.filter(x=>x.id!==id)}),go('home')):setArm(true)}>{t(arm?'Tap again to delete':'Delete habit')}</button></>
}
function Settings({close}){
  const {S,up,setS,t,X,pref,say,L,n,equip}=useApp(),[arm,setArm]=useState(false),[txt,setTxt]=useState(''),json=JSON.stringify(S),own=S.coll||[]
  const load=raw=>{try{const d=JSON.parse(raw);if(!Array.isArray(d.habits))throw 0;setS(d);say(t('Imported ✓'))}catch{say(t('Invalid backup'))}}
  const restore=()=>load(txt)
  const dl=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([json],{type:'application/json'}));a.download='peyma-backup-'+ymd(D0())+'.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000);say(X('فایل بک‌آپ ذخیره شد 💾','Backup file saved 💾'))}
  const pick=e=>{const f=e.target.files?.[0];e.target.value='';f&&f.text().then(load).catch(()=>say(t('Invalid backup')))}
  return <>
    <Lb>{t('LANGUAGE')}</Lb><Seg v={S.lang||'fa'} on={k=>up(s=>{s.lang=k})} opts={[['fa','فارسی'],['en','English']]}/>
    <Lb>{X('تم','THEME')}</Lb><Seg v={pref} on={k=>up(s=>{s.theme=k})} opts={[['dark',X('تیره','Dark')],['light',X('روشن','Light')],['system',X('سیستم','System')]]}/>
    <Lb>{t('CALENDAR')}</Lb><Seg v={S.cal==='g'?'g':'j'} on={k=>up(s=>{s.cal=k})} opts={[['j',X('شمسی','Jalali')],['g',X('میلادی','Gregorian')]]}/>
    <Lb>{X('جلوه‌ها و صدای جشن','CELEBRATION EFFECTS')}</Lb><Seg v={S.fx||'on'} on={k=>up(s=>{s.fx=k})} opts={[['on',X('کامل','Full')],['quiet',X('بی‌صدا','Silent')],['off',X('خاموش','Off')]]}/>
    <Lb>{X('اسم همراهت','YOUR COMPANION\'S NAME')}</Lb><input className="in" dir="auto" maxLength={14} value={S.petName||''} placeholder={X('پیمو','Peymo')} onChange={e=>up(s=>{s.petName=e.target.value})}/>
    <Lb>{X(`کلکسیون پیمو · ${n(own.length)}/${n(ITEMS.length)}`,`COMPANION COLLECTION · ${own.length}/${ITEMS.length}`)}</Lb>
    <div className="coll">{ITEMS.map(i=>{const has=own.includes(i.id);return <button key={i.id} disabled={!has} className={(has?'':'lock ')+(S.hat===i.id?'sel':'')} style={{'--rc':RAR[i.r].c}} title={has?(L==='fa'?i.fa:i.en):X('هنوز پیدا نکردی — صندوق روزهای کامل','Not found yet — chests come from complete days')} onClick={()=>equip(i.id)}>{has?i.e:'🔒'}</button>})}</div>
    <p className="hint" style={{margin:'6px 6px 4px'}}>{X('روزی که همه‌ی عادت‌ها رو بزنی شانس یه صندوق داری؛ هر ۷ روز استریک و هر دنیای جدید، صندوق تضمینیه.','Finish every habit for a day and you may get a chest; every 7-day streak and new world guarantees one.')}</p>
    <Lb>{X('بک‌آپ فایلی','BACKUP FILE')}</Lb>
    <div className="seg" style={{gridTemplateColumns:'1fr 1fr'}}><button onClick={dl}>💾 {X('دانلود','Download')}</button><label className="filebtn">📂 {X('بازیابی از فایل','Restore')}<input type="file" accept="application/json,.json" hidden onChange={pick}/></label></div>
    <Lb>{t('BACKUP (COPY)')}</Lb><textarea className="in" readOnly value={json} onFocus={e=>e.target.select()}/>
    <button className="save gh" onClick={()=>{navigator.clipboard?.writeText(json).catch(()=>{});say(t('Copied'))}}>{t('Copy backup')}</button>
    <Lb>{t('RESTORE (PASTE)')}</Lb><textarea className="in" value={txt} onChange={e=>setTxt(e.target.value)} placeholder='{"habits":[…]}'/>
    <button className="save gh" onClick={restore}>{t('Import')}</button>
    <button className="save red" style={{height:46,fontSize:16}} onClick={()=>{if(!arm)return setArm(true);try{localStorage.removeItem(KEY)}catch{}setS(seed());close()}}>{t(arm?'Tap again to erase everything':'Reset all data')}</button>
  </>
}
export default function Sheets(){
  const {sh,t,n,jal,L}=useApp()
  if(sh.k==='form')return <Sheet title={t(sh.id?'Edit Habit':'New Habit')}>{c=><Form id={sh.id} close={c}/>}</Sheet>
  if(sh.k==='note'){const x=pd(sh.d);return <Sheet title={n(`${cal.day(x,jal)} ${monthName(cal.mon(x,jal),jal,L==='fa')} ${cal.year(x,jal)}`)}>{c=><Note id={sh.id} d={sh.d} close={c}/>}</Sheet>}
  if(sh.k==='del')return <Sheet title={t('Delete habit')}>{c=><Del id={sh.id} close={c}/>}</Sheet>
  return <Sheet title={t('Settings')}>{c=><Settings close={c}/>}</Sheet>
}
