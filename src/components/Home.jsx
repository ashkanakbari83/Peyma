import {D0,ymd} from '../lib/core.js'
import {useApp} from '../store.jsx'
import Icon from './Icon.jsx'
import {Heat,Week} from './parts.jsx'

function Card({h,i}){
  const {S,go,toggle,fresh}=useApp(),k=ymd(D0()),on=h.log[k],v=S.view|0
  return <article className="card" style={{'--c':h.color,'--i':i}} onClick={()=>go('h',h.id)}>
    <div className="ch"><div className="ib"><Icon n={h.icon}/></div>
      <div className="tx"><b>{h.name}</b><small>{h.desc}</small></div>
      <button className={'ck'+(on?' on':'')+(fresh===h.id+k&&on?' fresh':'')} onClick={e=>{e.stopPropagation();toggle(h.id)}}><Icon n="check"/></button></div>
    {v===0&&<Heat h={h} N={24}/>}{v===2&&<Week h={h}/>}
  </article>
}
export default function Home(){
  const {S,up,X}=useApp(),v=S.view|0
  return <div className="pg">
    <div className="vs">{['grid','list','lines'].map((ic,i)=><button key={ic} className={v===i?'sel':''} onClick={()=>up(s=>{s.view=i})}><Icon n={ic}/></button>)}</div>
    <div key={v} className={'list v'+v}>
      {S.habits.length?S.habits.map((h,i)=><Card key={h.id} h={h} i={i}/>)
        :<div className="empty">{X('هنوز عادتی نداری ✨','No habits yet ✨')}<br/>{X('با دکمه + اولین عادتت رو بساز','Tap + to create your first one')}</div>}
    </div>
  </div>
}
