import {useEffect,useRef,useState} from 'react'
import {D0,ymd,add,wi,cal,monthName,streak,bestS,rate,SH,EN,MAX_TOKENS} from '../lib/core.js'
import {useApp} from '../store.jsx'
import Icon from './Icon.jsx'
import {HeatMap} from './parts.jsx'

function Day({d,k,h,fu}){
  const {toggle,setSh,n,jal,fresh,say,X}=useApp(),tm=useRef(0),held=useRef(false),today=ymd(D0())
  const cls='d'+(h.log[k]?(h.log[k]===2?' on mn':' on'):h.fz?.[k]?' fz':'')+(k<today?' ro':'')+(k===today?' td':'')+(fu?' fu':'')+(h.notes[k]?' nt':'')+(fresh===h.id+k?' fresh':'')
  const num=n(cal.day(d,jal));if(fu)return <div className={cls}>{num}</div>
  const stop=()=>clearTimeout(tm.current)
  return <div className={cls} onContextMenu={e=>e.preventDefault()} onPointerLeave={stop} onPointerCancel={stop}
    onPointerDown={()=>{held.current=false;tm.current=setTimeout(()=>{held.current=true;navigator.vibrate?.(20);setSh({k:'note',id:h.id,d:k})},550)}}
    onPointerUp={()=>{stop();if(held.current)return;if(k===today)toggle(h.id,k);else say(X('روزهای گذشته قابل ویرایش نیستن','Past days can\'t be edited'))}}>{num}</div>
}
export default function Detail({id}){
  const {S,go,t,n,L,X,ar,jal,rest,toggle}=useApp(),h=S.habits.find(x=>x.id===id)
  const [cm,setCm]=useState(()=>cal.first(D0(),jal))
  useEffect(()=>setCm(cal.first(D0(),jal)),[jal])
  useEffect(()=>{if(!h)go('home')},[h])
  if(!h)return null
  const s=streak(h),T=D0(),st=add(cm,-wi(cm)),days=[...Array(42)].map((_,i)=>add(st,i))
  const tok=h.tokens??1,tk=ymd(T),restOn=!!h.fz?.[tk]&&!h.log[tk]
  const tiles=[[t('Best streak'),bestS(h)],[t('Total'),Object.keys(h.log).length],[t('30 days'),rate(h)+'%']]
  return <div className="pg" style={{'--c':h.color}}>
    <div className="ch" style={{margin:'6px 4px 22px'}}><div className="ib big"><Icon n={h.icon}/></div>
      <div className="tx"><b style={{fontSize:28,fontWeight:800}}>{h.name}</b><small style={{fontSize:16}}>{h.desc}</small></div></div>
    <div className="dg">
      <div>
        <section className="panel"><HeatMap h={h}/></section>
        <div className="chips"><span className="chip"><Icon n="flame"/>{n(s)}</span>
          <span className="chip"><Icon n="target"/>{h.goal?n(`${s} / ${h.goal}`)+' '+X('روز','days'):t('No Streak Goal')}</span>
          <span className="chip rt" title={X('روز استراحت','Rest days')}>🧊 {n(`${tok}/${MAX_TOKENS}`)}</span></div>
        {(s>0||restOn)&&!h.log[tk]&&<div className="restb">
          <p>{restOn?X('امروز رو استراحت حساب کردی 🧊 استریکت سالمه (کاپ نمیده).','Today counts as a rest day 🧊 Your streak is safe (no trophies).')
            :tok>0?X('امروز نمیرسی؟ یه روز استراحت استریکت رو نگه میداره (ولی کاپ نمیده).','Cannot make it today? A rest day keeps your streak alive (no trophies).')
            :X('روز استراحتی نداری. با هر ۷ روز استریک یکی میگیری.','No rest days left. You earn one with every 7-day streak.')}</p>
          {restOn?<button onClick={()=>rest(h.id,false)}>{X('لغو','Undo')}</button>:tok>0&&<button onClick={()=>rest(h.id,true)}>🧊 {X('استفاده از روز استراحت','Use a rest day')}</button>}
        </div>}
        {h.min&&h.log[tk]!==1&&<div className="restb mn2"><p>{h.log[tk]===2?X('امروز نسخه‌ی حداقل رو زدی ⚡ استریکت سالمه؛ اگه حال داشتی کاملش کن (کاپ کامل میگیری).','You did the minimum today ⚡ Streak is safe; finish the full one for full trophies.')
          :X(`حالش نیست؟ فقط «${h.min}» رو انجام بده؛ استریک میمونه (نصف کاپ).`,`Not feeling it? Just do "${h.min}" and the streak stays (half trophies).`)}</p>
          <button onClick={()=>toggle(h.id,tk,false,h.log[tk]===2?1:2)}>{h.log[tk]===2?X('ارتقا به کامل','Upgrade to full'):'⚡ '+X('ثبت حداقل','Log minimum')}</button></div>}
        {(h.why||h.cue||h.act)&&<section className="panel mycard">
          {h.why&&<div><small>{X('چرا شروع کردم','WHY I STARTED')}</small><p dir="auto">«{h.why}»</p></div>}
          {(h.cue||h.act)&&<div><small>{X('برنامه‌ی من','MY PLAN')}</small><p dir="auto">{X('وقتی','When')} <b>{h.cue||'…'}</b>{X('، اون وقت','')} → <b>{h.act||h.name}</b></p></div>}
          {h.rt&&<div><small>{X('یادآور','REMINDER')}</small><p className="m">⏰ {n(h.rt)}</p></div>}
        </section>}
        <div className="tiles" style={{gridTemplateColumns:'repeat(3,1fr)'}}>{tiles.map(([a,b])=><div className="tile" key={a}><b>{n(b)}</b><span>{a}</span></div>)}</div>
      </div>
      <section className="panel">
        <div className="cal sl" key={ymd(cm)}>
          {(L==='fa'?SH:EN).map(x=><div className="dh" key={x}>{x}</div>)}
          {days.map(d=>{const k=ymd(d);return <Day key={k} d={d} k={k} h={h} fu={d>T}/>})}
        </div>
        <div className="cn">
          <div className="pill"><Icon n="cal"/>{monthName(cal.mon(cm,jal),jal,L==='fa')} {n(cal.year(cm,jal))}</div>
          <div><button className="pill ar" onClick={()=>setCm(c=>cal.first(add(c,-1),jal))}><Icon n={ar('left')}/></button>
            <button className="pill ar" onClick={()=>setCm(c=>add(c,cal.len(c,jal)))}><Icon n={ar('right')}/></button></div>
        </div>
        <p className="hint">{t('Press and hold a day to add a note')}</p>
      </section>
    </div>
  </div>
}
