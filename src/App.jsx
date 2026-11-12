import {Provider,useApp} from './store.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './components/Home.jsx'
import Detail from './components/Detail.jsx'
import Stats from './components/Stats.jsx'
import Road from './components/Road.jsx'
import Timer from './components/Timer.jsx'
import Sheets from './components/Sheets.jsx'
import Welcome from './components/Welcome.jsx'
import {Celebrate,WorldUp,Chest} from './components/Celebrate.jsx'

function Shell(){
  const {R,S,sh,toast}=useApp(),first=!S.onb&&!S.habits.some(h=>Object.keys(h.log).length)
  const page=R.v==='h'?<Detail key={R.id} id={R.id}/>:R.v==='stats'?<Stats/>:R.v==='road'?<Road/>:R.v==='timer'?<Timer/>:<Home/>
  return <div id="app"><Header/>{page}<Footer/>{sh&&<Sheets/>}<Celebrate/><WorldUp/><Chest/>{first&&<Welcome/>}{toast&&<div key={toast.k} className="toast">{toast.m}</div>}</div>
}
export default function App(){return <Provider><Shell/></Provider>}
