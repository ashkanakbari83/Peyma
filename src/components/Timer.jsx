import {D0,ymd} from '../lib/core.js'
import {useApp} from '../store.jsx'
import Icon from './Icon.jsx'

const PRE=[5,10,15,20,25,30,45,60,90],RAD=88,CIR=2*Math.PI*RAD
export default function Timer(){
  const {S,tm,n,X,fmt,setDur,start,pause,reset,addMin,setTH}=useApp()
  const h=S.habits.find(x=>x.id===tm.habit),mins=Math.round(tm.dur/60),done=S.focus?.[ymd(D0())]||0
  return <div className="pg" style={{'--c':h?h.color:'var(--ac)'}}>
    <div className="dg">
      <section className="panel tm">
        <div className="tring">
          <svg viewBox="0 0 200 200"><circle className="trk" cx="100" cy="100" r={RAD}/><circle className="prg" cx="100" cy="100" r={RAD} style={{strokeDasharray:CIR,strokeDashoffset:CIR*(1-(tm.dur?tm.left/tm.dur:0))}}/></svg>
          <div className="tc2"><b className="m">{n(fmt(tm.left))}</b><span>{h?h.name:X('تمرکز','Focus')}</span></div>
        </div>
        <div className="tctl">
          <button className="rb" onClick={reset}><Icon n="reset"/></button>
          <button className="tplay" onClick={tm.run?pause:start}><Icon n={tm.run?'pause':'play'}/></button>
          <button className="rb" onClick={addMin}>+{n(1)}</button>
        </div>
      </section>
      <div>
        <section className="panel"><h3>{X('زمان‌های آماده','Quick presets')}</h3>
          <div className="pres">{PRE.map(m=><button key={m} className={'pre'+(tm.dur===m*60?' sel':'')} disabled={tm.run} onClick={()=>setDur(m*60)}>{n(m)}<small>{X('دقیقه','min')}</small></button>)}</div>
          <span className="lb" style={{cursor:'default'}}>{X('زمان دلخواه (دقیقه)','CUSTOM (MIN)')}</span>
          <input className="in" type="number" min="1" max="600" inputMode="numeric" disabled={tm.run} value={mins} onChange={e=>setDur(Math.min(600,Math.max(1,+e.target.value||1))*60)}/>
        </section>
        <section className="panel"><h3>{X('با پایان تایمر این عادت تیک بخوره','Complete this habit when finished')}</h3>
          <div className="fr" style={{paddingBottom:0}}>
            <button className={'fb'+(!h?' sel':'')} style={{'--c':'var(--ac)'}} onClick={()=>setTH('')}>{X('هیچ‌کدام','None')}</button>
            {S.habits.map(x=><button key={x.id} className={'fb'+(h===x?' sel':'')} style={{'--c':x.color}} onClick={()=>setTH(x.id)}><u/>{x.name}</button>)}</div></section>
        <div className="tiles" style={{gridTemplateColumns:'1fr'}}><div className="tile"><b>{n(done)}</b><span>{X('دقیقه تمرکز امروز','Focus minutes today')}</span></div></div>
      </div>
    </div>
  </div>
}
