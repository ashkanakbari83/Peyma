import {useState} from 'react'
import {C,IC,mk,pd,cal,monthName} from '../lib/core.js'
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
  const {S,up,t}=useApp(),h=S.habits.find(x=>x.id===id)
  const [f,setF]=useState(()=>h?{...h}:{name:'',desc:'',color:C[0],icon:'pulse',type:'build',goal:0}),set=(k,v)=>setF(o=>({...o,[k]:v}))
  const save=()=>{const name=f.name.trim();if(!name)return
    up(s=>{if(h)Object.assign(s.habits.find(x=>x.id===id),{name,desc:f.desc,color:f.color,icon:f.icon,type:f.type,goal:f.goal})
      else{const x=mk(name,f.desc,f.color,f.icon);x.type=f.type;x.goal=f.goal;s.habits.push(x)}});close()}
  return <div style={{'--c':f.color}}>
    <div className="hero"><Icon n={f.icon}/></div>
    <div className="ip">{IC.map(k=><button key={k} className={k===f.icon?'sel':''} onClick={()=>set('icon',k)}><Icon n={k}/></button>)}</div>
    <Lb>{t('NAME')}</Lb><input className="in" dir="auto" value={f.name} onChange={e=>set('name',e.target.value)}/>
    <Lb>{t('DESCRIPTION')}</Lb><input className="in" dir="auto" value={f.desc} onChange={e=>set('desc',e.target.value)}/>
    <Lb>{t('COLOR')}</Lb><div className="sws">{C.map(c=><button key={c} className={'sw'+(c===f.color?' sel':'')} style={{background:c}} onClick={()=>set('color',c)}/>)}</div>
    <Lb>{t('HABIT TYPE')}</Lb><Seg v={f.type} on={k=>set('type',k)} opts={[['build',t('Build A Habit')],['quit',t('Quit A Habit')]]}/>
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
  const {S,up,setS,t,X,pref,say}=useApp(),[arm,setArm]=useState(false),[txt,setTxt]=useState(''),json=JSON.stringify(S)
  const restore=()=>{try{const d=JSON.parse(txt);if(!Array.isArray(d.habits))throw 0;setS(d);say(t('Imported ✓'))}catch{say(t('Invalid backup'))}}
  return <>
    <Lb>{t('LANGUAGE')}</Lb><Seg v={S.lang||'fa'} on={k=>up(s=>{s.lang=k})} opts={[['fa','فارسی'],['en','English']]}/>
    <Lb>{X('تم','THEME')}</Lb><Seg v={pref} on={k=>up(s=>{s.theme=k})} opts={[['dark',X('تیره','Dark')],['light',X('روشن','Light')],['system',X('سیستم','System')]]}/>
    <Lb>{t('CALENDAR')}</Lb><Seg v={S.cal==='g'?'g':'j'} on={k=>up(s=>{s.cal=k})} opts={[['j',X('شمسی','Jalali')],['g',X('میلادی','Gregorian')]]}/>
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
