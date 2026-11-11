import {useEffect,useMemo} from 'react'
import {pieces} from '../lib/fx.js'
import {W} from '../lib/core.js'
import {useApp} from '../store.jsx'

const dot=(p,i,x,y)=><i key={i} className={'cf'+(p.round?' rd':'')} style={{left:x,top:y,'--dx':p.dx+'px','--dy':p.dy+'px','--r':p.r+'deg','--s':p.s+'px','--t':p.t+'s','--cc':p.c}}/>

/** confetti burst from the tapped spot + a warm message pill */
export function Celebrate(){
  const {fx,setFx}=useApp()
  useEffect(()=>{if(!fx)return;const t=setTimeout(()=>setFx(null),fx.big?3400:2500);return()=>clearTimeout(t)},[fx])
  const ps=useMemo(()=>fx?pieces(fx.big?54:26,[fx.color,fx.color,'#ffffff','#fbbf24','#8b8cf8']):[],[fx&&fx.k])
  if(!fx)return null
  return <div className="fx">
    <div aria-hidden="true"><i className="fxr" style={{left:fx.x,top:fx.y,'--c':fx.color}}/>{ps.map((p,i)=>dot(p,i,fx.x,fx.y))}</div>
    <div key={fx.k} className={'fxm'+(fx.big?' big':'')} style={{'--c':fx.color}} role="status"><span>{fx.msg}</span><b className="m">{fx.trophy}</b></div>
  </div>
}

/** full-screen card when a new world opens */
export function WorldUp(){
  const {wup,setWup,L,X}=useApp()
  const ps=useMemo(()=>wup?pieces(60,[W[wup.idx].c,'#ffffff','#fbbf24','#f472b6','#38bdf8']):[],[wup&&wup.k])
  if(!wup)return null
  const w=W[wup.idx],fa=L==='fa'
  return <div className="ov wu" onPointerDown={e=>e.target===e.currentTarget&&setWup(null)}>
    <div aria-hidden="true">{ps.map((p,i)=>dot(p,i,'50%','34%'))}</div>
    <div className="wucard" style={{'--w1':w.c,'--w2':w.c2}} role="dialog" aria-modal="true">
      <div className="wuo">{w.e}</div>
      <small className="m">{X('دنیای جدید باز شد!','NEW WORLD UNLOCKED!')}</small>
      <h2>{fa?w.n:w.ne}</h2>
      <div className="rew"><span>🎖️</span><div><small>{X('عنوان جدید','New rank')}</small><b>{fa?w.t:w.te}</b></div></div>
      <p>{fa?w.s:w.se}</p>
      <button className="save" onClick={()=>setWup(null)}>{X('بزن بریم!','Let\'s go!')}</button>
    </div>
  </div>
}
