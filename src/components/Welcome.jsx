import {useState} from 'react'
import {useApp} from '../store.jsx'
import {mk,W} from '../lib/core.js'
import {Creature} from './Pet.jsx'
import Icon from './Icon.jsx'

const SUG=[
  {fa:'مطالعه',en:'Reading',d:['ده صفحه کتاب','Ten pages'],c:'#facc15',ic:'book',min:['یک صفحه','One page']},
  {fa:'نوشیدن آب',en:'Drink water',d:['هشت لیوان','Eight glasses'],c:'#38bdf8',ic:'drop',min:['دو لیوان','Two glasses']},
  {fa:'مدیتیشن',en:'Meditation',d:['ده دقیقه آرامش','Ten calm minutes'],c:'#c084fc',ic:'leaf',min:['سه نفس عمیق','Three deep breaths']},
  {fa:'پیاده‌روی',en:'Walk',d:['سی دقیقه قدم زدن','A 30-minute walk'],c:'#4ade80',ic:'pulse',min:['ده دقیقه','10 minutes']},
  {fa:'خواب منظم',en:'Sleep on time',d:['قبل از ساعت ۱۱ شب','Before 11 pm'],c:'#818cf8',ic:'star',min:['',''] },
  {fa:'قدردانی',en:'Gratitude',d:['سه چیز خوب امروز','Three good things'],c:'#f472b6',ic:'heart',min:['یک چیز','Just one']},
]
/** first-run welcome: meet the companion, name it, pick a few starter habits */
export default function Welcome(){
  const {S,up,L,X,n}=useApp(),[st,setSt]=useState(0),[sel,setSel]=useState([]),[nm,setNm]=useState(S.petName||'')
  const w=W[0],fa=L==='fa'
  const done=add=>up(s=>{s.onb=1;if(nm.trim())s.petName=nm.trim().slice(0,14)
    if(add)sel.forEach(i=>{const g=SUG[i],h=mk(fa?g.fa:g.en,g.d[fa?0:1],g.c,g.ic);h.min=g.min[fa?0:1];s.habits.push(h)})})
  return <div className="ov wu welcome" style={{alignItems:'center'}}>
    <div className="wucard" style={{'--w1':w.c,'--w2':w.c2}} role="dialog" aria-modal="true">
      {st===0?<>
        <div className="pw"><Creature mood="new" w={w} stage={0}/></div>
        <h2>{X('سلام! من همراهتم 👋','Hi! I am your companion 👋')}</h2>
        <p>{X('پیما یعنی قدم‌های کوچیکِ هر روز. هیچ فشاری نیست؛ هر کار کوچیک حساب می‌شه و با ۳ تروفی هدیه شروع می‌کنی 🏆','Peyma is about small steps, every day. No pressure: every little thing counts, and you start with 3 gift trophies 🏆')}</p>
        <input className="in" dir="auto" maxLength={14} value={nm} onChange={e=>setNm(e.target.value)} placeholder={X('یه اسم برای من بذار (پیمو)','Give me a name (Peymo)')}/>
        <button className="save" onClick={()=>setSt(1)}>{X('بزن بریم','Let us go')}</button>
        <button className="save gh" onClick={()=>done(false)}>{X('بعداً','Skip')}</button>
      </>:<>
        <h2 style={{fontSize:26}}>{X('از کجا شروع کنیم؟','Where shall we start?')}</h2>
        <p>{X('ورزش که هست. اگه خواستی چندتای دیگه هم اضافه کن (هر وقت خواستی عوض می‌کنی):','Exercise is already there. Add a few more if you like (you can change anything later):')}</p>
        <div className="sug">{SUG.map((g,i)=><button key={i} className={sel.includes(i)?'on':''} style={{'--c':g.c}} onClick={()=>setSel(a=>a.includes(i)?a.filter(x=>x!==i):[...a,i])}><Icon n={g.ic}/>{fa?g.fa:g.en}</button>)}</div>
        <p style={{fontSize:13,opacity:.8}}>{X('نکته: شروع کوچیک بهتره. بعداً می‌تونی برای هر عادت یه نسخه‌ی «حداقل» تعریف کنی.','Tip: start small. Later you can add a tiny "minimum" version to any habit.')}</p>
        <button className="save" onClick={()=>done(true)}>{sel.length?X(`شروع با ${n(sel.length+1)} عادت`,`Start with ${sel.length+1} habits`):X('شروع','Start')}</button>
        <button className="save gh" onClick={()=>setSt(0)}>{X('برگشت','Back')}</button>
      </>}
      <div className="dots"><i className={st===0?'on':''}/><i className={st===1?'on':''}/></div>
    </div></div>
}
