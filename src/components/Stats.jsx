import {useState} from 'react'
import {D0,ymd,add,wi,troph,streak,bestS,monthName,cal,FA,EF,SH} from '../lib/core.js'
import {useApp} from '../store.jsx'
import Icon from './Icon.jsx'
import {useGrow,useFit} from './parts.jsx'

export default function Stats(){
  const {S,go,t,n,X,L,jal}=useApp(),g=useGrow(),[fr,NN]=useFit(),[f,setF]=useState({r:30,h:'all'})
  const all=S.habits,one=all.find(h=>h.id===f.h),hs=one?[one]:all,T=D0(),tk=ymd(T),N=f.r,tr=troph(all)
  const days=[...Array(N)].map((_,i)=>add(T,i-N+1)),per=days.map(d=>hs.filter(h=>h.log[ymd(d)]).length)
  const mx=Math.max(1,...per),cnt=per.reduce((a,b)=>a+b,0),poss=hs.length*N
  const wdc=Array(7).fill(0);days.forEach((d,i)=>wdc[wi(d)]+=per[i])
  const wm=Math.max(1,...wdc),dn=all.filter(h=>h.log[tk]).length,rr=h=>Math.round(days.filter(d=>h.log[ymd(d)]).length/N*100)
  let run=0;for(const k in tr.day)if(k<ymd(days[0]))run+=tr.day[k]
  const cum=days.map(d=>run+=tr.day[ymd(d)]||0),lo=Math.min(...cum),hi=Math.max(...cum)
  const pts=cum.map((v,i)=>`${(i/Math.max(1,N-1)*300).toFixed(1)},${(74-(v-lo)/((hi-lo)||1)*68).toFixed(1)}`).join(' ')
  const rank=[...hs].sort((a,b)=>rr(b)-rr(a)),last=rank[rank.length-1],wd=i=>L==='fa'?FA[i]:EF[i],hx=wdc.indexOf(wm),lx=wdc.indexOf(Math.min(...wdc)),pc=X('٪','%')
  const msg=!all.length?X('اول یه عادت بساز','Create your first habit'):dn===all.length?X('🎉 امروز همه‌چیز انجام شد!','🎉 Everything is done today!'):X(`${n(all.length-dn)} عادت تا تکمیل امروز مونده`,`${all.length-dn} habits left today`)
  const ins=!cnt?[X('هنوز داده‌ای در این بازه نیست — اولین تیک رو بزن!','No data in this range yet — tick your first habit!')]:[
    X(`قوی‌ترین روز: ${wd(hx)} (${n(wdc[hx])} انجام)`,`Strongest day: ${wd(hx)} (${wdc[hx]} check-ins)`),
    X(`ضعیف‌ترین روز: ${wd(lx)} (${n(wdc[lx])} انجام)`,`Weakest day: ${wd(lx)} (${wdc[lx]} check-ins)`),
    X(`بهترین عادت: ${rank[0].name} (${n(rr(rank[0]))}${pc})`,`Best habit: ${rank[0].name} (${rr(rank[0])}%)`),
    rank.length>1&&X(`نیاز به توجه: ${last.name} (${n(rr(last))}${pc})`,`Needs attention: ${last.name} (${rr(last)}%)`)].filter(Boolean)
  const tiles=[['Check-ins',cnt],['Completion',(poss?Math.round(cnt/poss*100):0)+'%'],['Perfect days',hs.length?per.filter(x=>x===hs.length).length:0],['Active days',per.filter(x=>x).length+'/'+N],
    ['Avg / day',(cnt/N).toFixed(1)],['Best streak',Math.max(0,...hs.map(bestS))],['Current streak',Math.max(0,...hs.map(streak))],['Trophies','🏆 '+tr.total]]
  const st=add(T,-wi(T)-(NN-1)*7),cells=[]
  for(let c=0;c<NN;c++)for(let r=0;r<7;r++){const d=add(st,c*7+r),k=ymd(d),m=hs.filter(h=>h.log[k]).length
    cells.push(<i key={k} className={(d>T?'fu ':'')+(k===tk?'td':'')} style={{background:`color-mix(in srgb,var(--ac) ${hs.length?Math.round(12+m/hs.length*88):12}%,transparent)`}}/>)}
  const dl=d=>`${monthName(cal.mon(d,jal),jal,L==='fa')} ${n(cal.day(d,jal))}`
  return <div className="pg">
    <div className="seg" style={{gridTemplateColumns:'repeat(4,1fr)',marginBottom:10}}>
      {[7,30,90,180].map(x=><button key={x} className={N===x?'sel':''} onClick={()=>setF({...f,r:x})}>{L==='fa'?n(x)+' روز':x+'D'}</button>)}</div>
    <div className="fr"><button className={'fb'+(!one?' sel':'')} style={{'--c':'var(--ac)'}} onClick={()=>setF({...f,h:'all'})}>{X('همه','All')}</button>
      {all.map(h=><button key={h.id} className={'fb'+(one===h?' sel':'')} style={{'--c':h.color}} onClick={()=>setF({...f,h:h.id})}><u/>{h.name}</button>)}</div>
    <section className="panel tdy"><div className="ring" style={{'--p':all.length?dn/all.length*100:0}} data-t={n(`${dn}/${all.length}`)}/><div><h3 style={{marginBottom:6}}>{t('Today')}</h3><p>{msg}</p></div></section>
    <div className="tiles t4">{tiles.map(([a,b],i)=><div className="tile" key={a} style={{animationDelay:`${.05*i}s`}}><b>{n(b)}</b><span>{t(a)}</span></div>)}</div>
    <div className="dg" style={{gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))'}}>
      <section className="panel"><h3>{t('Daily check-ins')}</h3>
        <div className="bars" style={{gap:N>60?1:3}}>{per.map((c,i)=><i key={i} title={`${ymd(days[i])}: ${c}`} style={{height:g?c/mx*100+'%':0}}/>)}</div>
        <div className="ax"><span>{dl(days[0])}</span><span>{t('Today')}</span></div></section>
      <section className="panel"><h3>{t('Trophies over time')}</h3>
        <svg viewBox="0 0 300 80" preserveAspectRatio="none" style={{width:'100%',height:110}}><polyline points={pts} fill="none" stroke="var(--ac)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round"/></svg>
        <div className="ax"><span>{n(lo)}</span><span>{n(hi)} 🏆</span></div></section>
      <section className="panel"><h3>{t('By weekday')}</h3>
        <div className="bars wd">{wdc.map((c,i)=><div className="col" key={i}><i style={{height:g?c/wm*85+'%':0}}/><span>{SH[i]}</span></div>)}</div></section>
      <section className="panel" ref={fr}><h3>{X(`هیت‌مپ کلی · ${n(NN)} هفته`,`Overall heatmap · ${NN} weeks`)}</h3><div className="heat" style={{margin:0}}>{cells}</div></section>
    </div>
    <section className="panel"><h3>{t('Highlights')}</h3><ul className="ex">{ins.map((x,i)=><li key={i}>{x}</li>)}</ul></section>
    <section className="panel"><h3>{X(`رتبه عادت‌ها · ${n(N)} روز`,`Habit ranking · ${N} days`)}</h3>
      {rank.map(h=><div className="hr" key={h.id} style={{'--c':h.color}} onClick={()=>go('h',h.id)}>
        <div className="ib"><Icon n={h.icon}/></div><div><b>{h.name}</b><div className="pb"><i style={{width:g?rr(h)+'%':0}}/></div></div>
        <span className="m">{n(rr(h))}%</span><span className="m fl"><Icon n="flame"/>{n(streak(h))}</span></div>)||<div className="empty">—</div>}</section>
  </div>
}
