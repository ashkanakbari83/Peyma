import {troph} from '../lib/core.js'
import {useApp} from '../store.jsx'
import Icon from './Icon.jsx'

/** Global header: shown on every page */
export default function Header(){
  const {R,S,go,n,t,X,ar,dark,toggleTheme,setSh,tm,fmt}=useApp(),det=R.v==='h'
  const title=det?S.habits.find(x=>x.id===R.id)?.name:R.v==='stats'?t('Insights'):R.v==='road'?t('Trophy Road'):R.v==='timer'?X('تایمر','Timer'):X('پیما','Peyma')
  const theme=<button className="rb" onClick={toggleTheme}><Icon n={dark?'sun':'moon'}/></button>
  return <header className="hd">
    {det?<button className="rb" onClick={()=>go('home')}><Icon n={ar('left')}/></button>:<button className="rb" onClick={()=>setSh({k:'set'})}><Icon n="gear"/></button>}
    <h1 className="ttl">{title}</h1>
    {det?<><button className="rb" onClick={()=>setSh({k:'form',id:R.id})}><Icon n="edit"/></button>
      <button className="rb" onClick={()=>setSh({k:'del',id:R.id})}><Icon n="trash"/></button>{theme}</>
    :<>{tm.run&&R.v!=='timer'&&<button className="rb tr" onClick={()=>go('timer')}>⏱ {n(fmt(tm.left))}</button>}
      <button className="rb tr" onClick={()=>go('road')}>🏆 {n(troph(S.habits).total)}</button>{theme}
      <button className="rb pl" onClick={()=>setSh({k:'form'})}><Icon n="plus"/></button></>}
  </header>
}
