import {Provider,useApp} from './store.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './components/Home.jsx'
import Detail from './components/Detail.jsx'
import Stats from './components/Stats.jsx'
import Road from './components/Road.jsx'
import Timer from './components/Timer.jsx'
import Sheets from './components/Sheets.jsx'

function Shell(){
  const {R,sh,toast}=useApp()
  const page=R.v==='h'?<Detail key={R.id} id={R.id}/>:R.v==='stats'?<Stats/>:R.v==='road'?<Road/>:R.v==='timer'?<Timer/>:<Home/>
  return <div id="app"><Header/>{page}<Footer/>{sh&&<Sheets/>}{toast&&<div key={toast.k} className="toast">{toast.m}</div>}</div>
}
export default function App(){return <Provider><Shell/></Provider>}
