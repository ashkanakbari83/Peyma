import {useEffect,useMemo,useState} from 'react'
import {pieces,chime,buzz} from '../lib/fx.js'
import {RAR} from '../lib/chest.js'
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

/** mystery chest: tap to open, reveals a cosmetic for your companion (never affects trophies) */
export function Chest(){
  const {chest,setChest,wup,L,X,S,equip}=useApp(),[open,setOpen]=useState(false)
  useEffect(()=>{setOpen(false)},[chest&&chest.k])
  const r=chest?RAR[chest.r]:RAR[0]
  const ps=useMemo(()=>open?pieces(chest.r>=2?70:36,[r.c,'#ffffff','#fbbf24','#f472b6']):[],[open])
  if(!chest||wup)return null
  const fa=L==='fa',note=chest.id==='_',on=S.hat===chest.id
  const reveal=()=>{setOpen(true);buzz(chest.r>=2);if((S.fx||'on')==='on')chime(7,chest.r>=2)}
  return <div className="ov wu" onPointerDown={e=>e.target===e.currentTarget&&open&&setChest(null)}>
    {open&&<div aria-hidden="true">{ps.map((p,i)=>dot(p,i,'50%','36%'))}</div>}
    <div className="wucard chest" style={{'--w1':open?r.c:'#a78bfa','--w2':'#1b1030'}} role="dialog" aria-modal="true">
      {!open?<>
        <small className="m">{X('جایزه‌ی امروز','TODAY\'S REWARD')}</small>
        <button className="chbox" onClick={reveal} aria-label={X('باز کردن صندوق','Open the chest')}>🎁</button>
        <h2>{X('یه صندوق برات اومده!','A chest for you!')}</h2>
        <p>{X('به‌خاطر اینکه امروزت رو کامل کردی. بزن ببینیم چی توشه 👆','For finishing today. Tap to see what is inside 👆')}</p>
      </>:<>
        <small className="m" style={{color:r.c}}>{fa?r.fa:r.en}</small>
        <div className="wuo chi">{chest.e}</div>
        <h2>{fa?chest.fa:chest.en}</h2>
        {note?<p>{fa?chest.qfa:chest.qen}</p>:<p>{X('به کلکسیون پیمو اضافه شد. هر وقت خواستی از تنظیمات عوضش کن.','Added to your companion\'s collection. Change it anytime from Settings.')}</p>}
        {note?<button className="save" onClick={()=>setChest(null)}>{X('ممنون 🤍','Thanks 🤍')}</button>
          :<><button className="save" onClick={()=>{if(!on)equip(chest.id);setChest(null)}}>{X('بپوشونش!','Put it on!')}</button>
          <button className="save gh" style={{marginTop:8,height:46,fontSize:16}} onClick={()=>setChest(null)}>{X('بعداً','Later')}</button></>}
      </>}
    </div>
  </div>
}
