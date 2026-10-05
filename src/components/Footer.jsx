import {useApp} from '../store.jsx'
import Icon from './Icon.jsx'

/** Global footer / tab bar: shown on every page */
export default function Footer(){
  const {R,go,tm}=useApp(),cur=R.v==='h'?'home':R.v
  return <nav className="dock">{[['home','home'],['timer','clock'],['road','trophy'],['stats','chart']].map(([k,ic])=>
    <button key={k} className={(cur===k?'sel':'')+(k==='timer'&&tm.run?' run':'')} onClick={()=>go(k)}><Icon n={ic}/></button>)}</nav>
}
