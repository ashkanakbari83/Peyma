import {useEffect,useState} from 'react'
import {troph,wIdx,W,gain} from '../lib/core.js'
import {useApp} from '../store.jsx'
import Icon from './Icon.jsx'
import {useGrow} from './parts.jsx'

function Particles({w,i}){
  return <div className="pts" aria-hidden="true">{[...Array(14)].map((_,k)=>{
    const st={left:(k*29+i*17)%96+'%','--s':(11+(k*7+i*3)%12)+'px','--d':(5+(k*3+i)%6)+'s','--dl':-((k*1.3+i)%7)+'s'}
    if(w.mo==='float'||w.mo==='drift')st.top=(k*23+i*11)%78+'%'
    return <span key={k} className={'pt '+w.mo} style={st}>{w.p}</span>})}</div>
}
function Scene({w,i,lock}){return <div className={'scene g-'+w.g}><Particles w={w} i={i}/><div className="orb">{w.e}</div><div className="gnd"/>{lock&&<div className="lockv">🔒</div>}</div>}

export default function Road(){
  const {S,go,t,n,X,L}=useApp(),g=useGrow(),T=troph(S.habits),tt=T.total,ci=wIdx(tt),[sel,setSel]=useState(ci)
  const w=W[sel],cw=W[ci],nx=W[ci+1],pr=nx?(tt-cw.m)/(nx.m-cw.m)*100:100,mp=Math.max(1,...Object.values(T.ph)),nm=x=>L==='fa'?x.n:x.ne
  const rng=(x,i)=>`${n(x.m)}${W[i+1]?' – '+n(W[i+1].m-1):'+'}`,stt=sel<ci?'dn':sel===ci?'cu':'lk'
  // the whole page takes the theme of the selected world
  useEffect(()=>{const e=document.documentElement;e.dataset.world=sel;e.style.setProperty('--w1',w.c);e.style.setProperty('--w2',w.c2)
    return()=>{delete e.dataset.world;e.style.removeProperty('--w1');e.style.removeProperty('--w2')}},[sel])
  return <div className="pg road" style={{'--w1':w.c,'--w2':w.c2,'--c':w.c}}>
    <div className="rg">
      <div className="rl">
        <section className="hero2" key={sel}>
          <Scene w={w} i={sel} lock={stt==='lk'}/>
          <div className="hinfo">
            <small className="m">{X(`دنیای ${n(sel+1)} از ${n(W.length)}`,`World ${sel+1} / ${W.length}`)}</small>
            <h2 className="wt">{nm(w)}</h2>
            <div className="chips" style={{margin:'4px 0 0'}}>
              <span className="chip m">🏆 {rng(w,sel)}</span>
              <span className="chip">{stt==='dn'?X('✓ تکمیل شده','✓ Completed'):stt==='cu'?X('📍 اینجایی','📍 You are here'):X(`🔒 ${n(w.m-tt)} کاپ تا باز شدن`,`🔒 ${w.m-tt} trophies to unlock`)}</span>
            </div>
          </div>
        </section>
        <section className="panel tcard"><div className="big2 m">🏆 {n(tt)}</div>
          <div><small>{X('عنوان فعلی','Current rank')}</small><b>{X(cw.t,cw.te)}</b></div>
          <div className="pb" style={{gridColumn:'1/-1'}}><i style={{width:g?pr+'%':0}}/></div>
          <p className="hint" style={{gridColumn:'1/-1',margin:0}}>{nx?X(`${n(nx.m-tt)} کاپ تا ${nm(nx)}`,`${nx.m-tt} trophies to ${nm(nx)}`):t('Max world reached 👑')}</p>
          {sel!==ci&&<button className="fb sel" style={{gridColumn:'1/-1',justifySelf:'start','--c':'var(--w1)'}} onClick={()=>setSel(ci)}>📍 {X('برگرد به دنیای من','Back to my world')}</button>}
        </section>
        <section className="panel story" key={'s'+sel}><h3>📖 {X('داستان این دنیا','The story of this world')}</h3><p>{X(w.s,w.se)}</p>
          <div className="rew"><span>🎖️</span><div><small>{X('عنوان این دنیا','Rank of this world')}</small><b>{X(w.t,w.te)}</b></div></div></section>
      </div>
      <div className="rr">
        <div className="rd2">{W.map((x,i)=>[x,i]).reverse().map(([x,i])=>{const st=i<ci?'dn':i===ci?'cu':'lk'
          return <button key={i} className={'an '+st+(i===sel?' on':'')} style={{'--c':x.c,'--w2':x.c2,'--i':9-i}} onClick={()=>setSel(i)}>
            <div className="av"><span>{x.e}</span></div>
            <div className="ai"><small className="m">{X(`دنیای ${n(i+1)}`,`World ${i+1}`)} · {X(x.t,x.te)}</small><b>{nm(x)}</b><span className="m">{rng(x,i)} 🏆</span>
              {st==='cu'&&nx&&<div className="pb mn"><i style={{width:g?pr+'%':0}}/></div>}</div>
            <div className="as">{st==='dn'?'✓':st==='cu'?<span className="you">{X('اینجایی','YOU')}</span>:<>🔒<small className="m">{n(x.m)}</small></>}</div>
          </button>})}</div>
    <section className="panel"><h3>{t('How it works')}</h3>
      <p style={{fontSize:14,lineHeight:1.9,color:'var(--t2)'}}>{X('با هر تیک یه عادت، کاپ می‌گیری. هرچی روزهای پشت‌سرهمِ اون عادت بیشتر باشه، ضریب بالاتر میره؛ پس تیک روز چهارم از روز دوم بیشتر کاپ میده.',"Every check-in earns trophies. The longer that habit's streak, the higher the multiplier — so day 4 pays more than day 2.")}</p>
      <div className="fm">trophies = 4 × (1 + 0.25 × (streakDay − 1))<br/>streakDay capped at 14 → max ×4.25</div>
      <div className="gc">{[1,2,3,4,5,7,10,14].map(c=><div key={c}><b>+{n(gain(c))}</b>{X('روز','Day')} {n(c)}{c===14?'+':''}</div>)}</div>
      <ul className="ex">
        <li>{X('🔥 اگه یه روز جا بندازی، استریک همون عادت از اول شروع میشه (ضریب ×1).',"🔥 Miss a day and that habit's streak restarts (multiplier ×1).")}</li>
        <li>{X('🎯 روز کامل: اگه همه عادت‌ها (حداقل ۲ تا) توی یه روز انجام بشن، ۳ کاپ جایزه می‌گیری.','🎯 Perfect day: complete all habits (2 or more) on the same day for +3 bonus trophies.')}</li>
        <li>{X('↩️ برداشتن تیک، کاپ اون رو هم برمی‌گردونه؛ کاپ‌ها همیشه از روی تاریخچه حساب میشن.','↩️ Unchecking a day takes its trophies back — trophies are always recalculated from your history.')}</li>
        <li>🌍 {X('دنیاها','Worlds')}: {W.map((x,i)=>`${x.e} ${rng(x,i)}`).join(' · ')}</li></ul></section>
    <section className="panel"><h3>{t('Trophies by habit')}</h3>
      {S.habits.map(h=><div className="hr" key={h.id} style={{'--c':h.color}} onClick={()=>go('h',h.id)}>
        <div className="ib"><Icon n={h.icon}/></div><div><b>{h.name}</b><div className="pb"><i style={{width:g?T.ph[h.id]/mp*100+'%':0}}/></div></div><span className="m">{n(T.ph[h.id])} 🏆</span></div>)}</section>
      </div>
    </div>
  </div>
}
