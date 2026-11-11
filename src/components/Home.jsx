import {D0,ymd,streak} from '../lib/core.js'
import {useApp} from '../store.jsx'
import Icon from './Icon.jsx'
import {Heat,Week} from './parts.jsx'
import Pet from './Pet.jsx'

function Card({h,i}){
  const {S,go,toggle,fresh,n,X}=useApp(),k=ymd(D0()),on=h.log[k],v=S.view|0,sk=streak(h)
  return <article className="card" style={{'--c':h.color,'--i':i}} onClick={()=>go('h',h.id)}>
    <div className="ch"><div className="ib"><Icon n={h.icon}/></div>
      <div className="tx"><b>{h.name}{sk>0&&<span className="sb" title={X('استریک','Streak')}>🔥{n(sk)}</span>}</b><small>{h.desc}{h.min&&!on?<span className="mnl"> · ⚡ {h.min}</span>:null}</small></div>
      <div className="acts">{h.min&&!on&&<button className="mnb" title={X('نسخه‌ی حداقل: ','Minimum version: ')+h.min} onClick={e=>{e.stopPropagation();toggle(h.id,k,false,2)}}>⚡<span>{X('حداقل','Min')}</span></button>}
      <button className={'ck'+(on?' on':'')+(on===2?' half':'')+(fresh===h.id+k&&on?' fresh':'')} title={on===2?X('ارتقا به نسخه‌ی کامل','Upgrade to full'):''} onClick={e=>{e.stopPropagation();toggle(h.id,k,false,1)}}><Icon n="check"/></button></div></div>
    {v===0&&<Heat h={h} N={24}/>}{v===2&&<Week h={h}/>}
  </article>
}
export default function Home(){
  const {S,up,X}=useApp(),v=S.view|0
  return <div className="pg">
    <Pet/>
    <div className="vs">{['grid','list','lines'].map((ic,i)=><button key={ic} className={v===i?'sel':''} onClick={()=>up(s=>{s.view=i})}><Icon n={ic}/></button>)}</div>
    <div key={v} className={'list v'+v}>
      {S.habits.length?S.habits.map((h,i)=><Card key={h.id} h={h} i={i}/>)
        :<div className="empty">{X('هنوز عادتی نداری ✨','No habits yet ✨')}<br/>{X('با دکمه + اولین عادتت رو بساز','Tap + to create your first one')}</div>}
    </div>
  </div>
}
