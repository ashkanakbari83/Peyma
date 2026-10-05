import {useEffect,useRef,useState} from 'react'
import {D0,add,wi,ymd,cal,monthName,SH,EN} from '../lib/core.js'
import {useApp} from '../store.jsx'

/** flips to true right after mount so bars/progress animate from 0 */
export function useGrow(){const [g,setG]=useState(false);useEffect(()=>{const r=requestAnimationFrame(()=>requestAnimationFrame(()=>setG(true)));return()=>cancelAnimationFrame(r)},[]);return g}

/** how many week-columns fit the container -> [ref, N] */
export function useFit(step=15,min=16,max=53){
  const ref=useRef(null),[N,setN]=useState(26)
  useEffect(()=>{const el=ref.current;if(!el)return;const f=()=>setN(Math.max(min,Math.min(max,Math.floor((el.clientWidth-34)/step))));f();const ro=new ResizeObserver(f);ro.observe(el);return()=>ro.disconnect()},[])
  return[ref,N]
}
export function Heat({h,N}){
  const t=D0(),st=add(t,-wi(t)-(N-1)*7),cells=[]
  for(let c=0;c<N;c++)for(let r=0;r<7;r++){const d=add(st,c*7+r),k=ymd(d);cells.push(<i key={k} className={(h.log[k]?'on ':'')+(d>t?'fu ':'')+(k===ymd(t)?'td':'')}/>)}
  return <div className="heat">{cells}</div>
}
export function Week({h}){const t=D0();return <div className="wk">{[6,5,4,3,2,1,0].map(i=><i key={i} className={h.log[ymd(add(t,-i))]?'on':''}/>)}</div>}
export function HeatMap({h}){
  const {jal,L}=useApp(),[ref,N]=useFit(),t=D0(),st=add(t,-wi(t)-(N-1)*7);let m=-1
  const ml=[...Array(N)].map((_,c)=>{const mo=cal.mon(add(st,c*7),jal),show=mo!==m;m=mo;return <span key={c}>{show?monthName(mo,jal,L==='fa'):''}</span>})
  return <div className="hm" ref={ref}><span/><div className="ml" style={{gridTemplateColumns:`repeat(${N},1fr)`}}>{ml}</div>
    <div className="wl">{(L==='fa'?SH:EN).map((x,i)=><span key={i}>{i%2?x:''}</span>)}</div><Heat h={h} N={N}/></div>
}
