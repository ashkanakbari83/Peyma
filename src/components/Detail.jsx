import {useEffect,useRef,useState} from 'react'
import {D0,ymd,add,wi,cal,monthName,streak,bestS,rate,SH,EN} from '../lib/core.js'
import {useApp} from '../store.jsx'
import Icon from './Icon.jsx'
import {HeatMap} from './parts.jsx'

function Day({d,k,h,fu}){
  const {toggle,setSh,n,jal,fresh,say,X}=useApp(),tm=useRef(0),held=useRef(false)
  const today=ymd(D0()),past=k<today                       // روز گذشته
  const cls='d'+(h.log[k]?' on':'')+(k===today?' td':'')+(fu?' fu':'')+(past?' ro':'')+(h.notes[k]?' nt':'')+(fresh===h.id+k?' fresh':'')
  const num=n(cal.day(d,jal));if(fu)return <div className={cls}>{num}</div>
  const stop=()=>clearTimeout(tm.current)
  return <div className={cls} onContextMenu={e=>e.preventDefault()} onPointerLeave={stop} onPointerCancel={stop}
    onPointerDown={()=>{held.current=false;tm.current=setTimeout(()=>{held.current=true;navigator.vibrate?.(20);setSh({k:'note',id:h.id,d:k})},550)}}
    onPointerUp={()=>{
      stop();if(held.current)return
      if(k===today)toggle(h.id,k)
      else say(X('روزهای گذشته قابل ویرایش نیستن','Past days can\'t be edited'))
    }}>{num}</div>
}
export default function Detail({id}){
  const {S,go,t,n,L,X,ar,jal}=useApp(),h=S.habits.find(x=>x.id===id)
  const [cm,setCm]=useState(()=>cal.first(D0(),jal))
  useEffect(()=>setCm(cal.first(D0(),jal)),[jal])
  useEffect(()=>{if(!h)go('home')},[h])
  if(!h)return null
  const s=streak(h),T=D0(),st=add(cm,-wi(cm)),days=[...Array(42)].map((_,i)=>add(st,i))
  const tiles=[[t('Best streak'),bestS(h)],[t('Total'),Object.keys(h.log).length],[t('30 days'),rate(h)+'%']]
  return <div className="pg" style={{'--c':h.color}}>
    <div className="ch" style={{margin:'6px 4px 22px'}}><div className="ib big"><Icon n={h.icon}/></div>
      <div className="tx"><b style={{fontSize:28,fontWeight:800}}>{h.name}</b><small style={{fontSize:16}}>{h.desc}</small></div></div>
    <div className="dg">
      <div>
        <section className="panel"><HeatMap h={h}/></section>
        <div className="chips"><span className="chip"><Icon n="flame"/>{n(s)}</span>
          <span className="chip"><Icon n="target"/>{h.goal?n(`${s} / ${h.goal}`)+' '+X('روز','days'):t('No Streak Goal')}</span></div>
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
