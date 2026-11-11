import {useEffect,useId,useState} from 'react'
import {W,wIdx,troph,ymd,D0,streak} from '../lib/core.js'
import {ITEMS} from '../lib/chest.js'
import {shareCard} from '../lib/share.js'
import {petMood,petSay} from '../lib/cheer.js'
import {useApp} from '../store.jsx'

/** the companion: a little creature in the colours of your current world; its mood follows your day */
function Creature({mood,w,stage,hat}){
  const id=useId().replace(/:/g,''),happy=mood==='cheer',sleepy=mood==='sleepy',wave=mood==='back'||mood==='cheer'
  const body={fill:`url(#g${id})`},dark={stroke:'#2a1530',strokeWidth:3,fill:'none',strokeLinecap:'round'}
  return <svg className={'pc pm-'+mood} viewBox="0 0 120 120" width="112" height="112" aria-hidden="true">
    <defs><linearGradient id={'g'+id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={w.c}/><stop offset="1" stopColor={w.c2}/></linearGradient></defs>
    <ellipse cx="60" cy="112" rx="30" ry="5" fill="#000" opacity=".28"/>
    <g className="pbody">
      <ellipse cx="44" cy="104" rx="11" ry="6" style={{fill:w.c2}}/><ellipse cx="76" cy="104" rx="11" ry="6" style={{fill:w.c2}}/>
      {wave&&<path className="parm l" d="M18 70 Q4 54 12 40" style={{stroke:w.c2,strokeWidth:8,fill:'none',strokeLinecap:'round'}}/>}
      {wave&&<path className="parm r" d="M102 70 Q116 54 108 40" style={{stroke:w.c2,strokeWidth:8,fill:'none',strokeLinecap:'round'}}/>}
      <path d="M60 22C88 22 104 46 104 72C104 96 86 108 60 108C34 108 16 96 16 72C16 46 32 22 60 22Z" style={body}/>
      <ellipse cx="60" cy="88" rx="24" ry="17" fill="#fff" opacity=".16"/>
      <path d="M60 24C58 12 66 5 78 7C78 18 71 25 60 24Z" style={{fill:w.c}}/><path d="M60 24Q61 15 70 11" stroke="#fff" strokeOpacity=".5" strokeWidth="2" fill="none"/>
      <ellipse cx="38" cy="74" rx="7" ry="4.5" fill="#ff8aa5" opacity={mood==='back'||happy?.8:.5}/><ellipse cx="82" cy="74" rx="7" ry="4.5" fill="#ff8aa5" opacity={mood==='back'||happy?.8:.5}/>
      <g className="peyes">
        {happy?<><path d="M42 58 Q48 50 54 58" style={dark}/><path d="M66 58 Q72 50 78 58" style={dark}/></>
          :sleepy?<><path d="M42 58 Q48 63 54 58" style={dark}/><path d="M66 58 Q72 63 78 58" style={dark}/></>
          :<><circle cx="48" cy="58" r="8" fill="#fff"/><circle cx="72" cy="58" r="8" fill="#fff"/><circle cx="49.5" cy="59" r="4.2" fill="#2a1530"/><circle cx="73.5" cy="59" r="4.2" fill="#2a1530"/><circle cx="51" cy="57" r="1.5" fill="#fff"/><circle cx="75" cy="57" r="1.5" fill="#fff"/></>}
      </g>
      {happy?<path d="M48 72 Q60 94 72 72Z" fill="#3b1d2a"/>
        :sleepy?<ellipse cx="60" cy="78" rx="3" ry="3.6" fill="#3b1d2a"/>
        :mood==='new'?<path d="M54 76 Q60 81 66 76" style={dark}/>
        :<path d="M50 74 Q60 85 70 74" style={dark}/>}
      {happy&&<path d="M55 84 Q60 89 65 84Z" fill="#ff6f91"/>}
    </g>
    {hat&&<text className="phat" x="60" y="27" textAnchor="middle" fontSize="36">{hat}</text>}
    <text x="90" y="30" fontSize="26" transform="rotate(14 90 30)">{w.e}</text>
    {sleepy&&<text className="pz" x="86" y="46" fontSize="16" fill="#fff" opacity=".8">z</text>}
    {stage>=4&&<text className="psp a" x="14" y="30" fontSize="14">✨</text>}
    {stage>=7&&<text className="psp b" x="100" y="86" fontSize="12">⭐</text>}
  </svg>
}
export default function Pet(){
  const {S,L,X,n,say}=useApp(),total=troph(S.habits).total,wi=wIdx(total),w=W[wi],mood=petMood(S.habits)
  const name=S.petName||X('پیمو','Peymo'),tk=ymd(D0())
  const done=S.habits.filter(h=>h.log[tk]).length,all=S.habits.length
  const [line,setLine]=useState(''),[bump,setBump]=useState(0)
  const hat=ITEMS.find(i=>i.id===S.hat)?.e||'',whys=S.habits.filter(h=>h.why)
  const whyLine=()=>{const h=whys[Math.floor(Math.random()*whys.length)];return X('یادته چرا شروع کردی؟ ','Remember why you started? ')+'«'+h.why+'»'}
  useEffect(()=>{setLine((mood==='back'||mood==='sleepy')&&whys.length&&Math.random()<.65?whyLine():petSay(S.habits,L,0,L==='fa'?w.t:w.te))},[mood,L,all,wi])
  const poke=()=>{setBump(b=>b+1);setLine(whys.length&&Math.random()<.3?whyLine():petSay(S.habits,L,1))}
  const share=()=>{const best=[...S.habits].sort((a,b)=>streak(b)-streak(a))[0]
    shareCard({fa:L==='fa',world:w,rank:L==='fa'?w.t:w.te,streak:best?streak(best):0,trophies:total,habit:best?.name||'',done,total:all,hat,color:w.c})
      .then(r=>{if(r==='saved')say(X('تصویر ذخیره شد 📸','Image saved 📸'));if(r==='fail')say(X('نشد؛ دوباره امتحان کن','Could not create the image'))})}
  return <section className={'pet pm-'+mood} style={{'--w1':w.c,'--w2':w.c2}}>
    <button className="pbtn" key={'b'+bump} onClick={poke} aria-label={name}><Creature mood={mood} w={w} stage={wi} hat={hat}/></button>
    <div className="pbub" key={line} role="status">
      <div className="pnm"><b>{name}</b><span className="m">{L==='fa'?w.n:w.ne} · {n(`${done}/${all}`)}</span><button className="psh" onClick={share} title={X('اشتراک‌گذاری پیشرفت','Share progress')} aria-label={X('اشتراک‌گذاری پیشرفت','Share progress')}>📤</button></div>
      <p dir="auto">{line}</p>
    </div>
  </section>
}
