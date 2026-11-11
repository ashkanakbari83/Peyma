import {createContext,useContext,useEffect,useRef,useState} from 'react'
import {D0,ymd,p2,mk,troph,wIdx,W,streak,fmt,settle,daysAway,MAX_TOKENS} from './lib/core.js'
import {cheer} from './lib/cheer.js'
import {chime,buzz} from './lib/fx.js'
import {drawItem} from './lib/chest.js'
import {TR,PD} from './lib/i18n.js'

export const KEY='peyma.v1'
export const seed=()=>({view:0,habits:[mk('ورزش','حداقل سی دقیقه تحرک','#fb923c','dumb')]})
function load(){try{const d=JSON.parse(localStorage.getItem(KEY));if(d&&Array.isArray(d.habits))return d}catch{}return seed()}
const parse=()=>{const [v,id]=(typeof location==='undefined'?'':location.hash).slice(2).split('/');return{v:v||'home',id}}
const T0={dur:1500,left:1500,run:false,endAt:0,habit:''}
function beep(){try{const a=new (window.AudioContext||window.webkitAudioContext)();[0,.25,.5].forEach((o,i)=>{const s=a.createOscillator(),g=a.createGain(),t=a.currentTime+o;s.frequency.value=i===2?988:784;s.connect(g);g.connect(a.destination);g.gain.setValueAtTime(.2,t);g.gain.exponentialRampToValueAtTime(.001,t+.22);s.start(t);s.stop(t+.25)});navigator.vibrate?.([200,100,200])}catch{}}
const Ctx=createContext(null)
export const useApp=()=>useContext(Ctx)

export function Provider({children}){
  const [S,setS]=useState(load),[R,setR]=useState(parse),[sh,setSh]=useState(null),[toast,setToast]=useState(null),[fresh,setFresh]=useState(null),[fx,setFx]=useState(null),[wup,setWup]=useState(null),[chest,setChest]=useState(null)
  const ptr=useRef({x:0,y:0})
  const [sys,setSys]=useState(()=>typeof matchMedia!=='undefined'&&matchMedia('(prefers-color-scheme: dark)').matches)
  const tmr=useRef(0)
  const L=S.lang||'fa',jal=S.cal!=='g',pref=S.theme||'dark',dark=pref==='system'?sys:pref==='dark'
  const X=(f,e)=>L==='fa'?f:e
  const n=v=>L==='fa'?String(v).replace(/\d/g,d=>PD[d]):String(v)      // Persian digits
  const t=k=>n(L==='fa'?TR[k]??k:k)                                      // static UI strings
  const ar=x=>L==='fa'?(x==='left'?'right':'left'):x                     // mirror arrows in RTL

  useEffect(()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch{}},[S])
  useEffect(()=>{const e=document.documentElement;e.lang=L;e.dir=L==='fa'?'rtl':'ltr';e.dataset.theme=dark?'dark':'light'},[L,dark])
  useEffect(()=>{const mq=matchMedia('(prefers-color-scheme: dark)'),f=()=>setSys(mq.matches);mq.addEventListener('change',f);return()=>mq.removeEventListener('change',f)},[])
  useEffect(()=>{const f=()=>setR(parse());addEventListener('popstate',f);return()=>removeEventListener('popstate',f)},[])

  useEffect(()=>{ptr.current={x:innerWidth/2,y:innerHeight*.6};const f=e=>{ptr.current={x:e.clientX,y:e.clientY}};addEventListener('pointerdown',f,{capture:true});return()=>removeEventListener('pointerdown',f,{capture:true})},[])

  const up=fn=>setS(s=>{const c=structuredClone(s);fn(c);return c})
  const say=m=>{setToast({m,k:Date.now()});clearTimeout(tmr.current);tmr.current=setTimeout(()=>setToast(null),2600)}
  const go=(v,id)=>{try{history.pushState(0,'',v==='home'?location.pathname:`#/${v}/${id||''}`)}catch{}setR({v,id});setSh(null);scrollTo(0,0)}
  const toggleTheme=()=>up(s=>{s.theme=dark?'light':'dark'})

  /** tick / untick TODAY (past days are locked on purpose). lvl 1 = full, 2 = the tiny "minimum" version */
  const toggle=(id,d=ymd(D0()),silent,lvl=1)=>{
    if(d!==ymd(D0()))return ''
    const c=structuredClone(S),h=c.habits.find(x=>x.id===id);if(!h)return ''
    const was=h.log[d],away=daysAway(S.habits)
    const un=was&&!(was===2&&lvl===1)           // tapping "full" on a minimum day upgrades it instead of removing it
    un?delete h.log[d]:h.log[d]=lvl
    const t0=troph(S.habits).total,t1=troph(c.habits).total,df=t1-t0,a=wIdx(t0),b=wIdx(t1)
    const trophy=n((df>0?'+':'')+df+' 🏆')
    let token=false,sk=0,gotChest=null
    if(!un){sk=streak(h);if(sk>0&&sk%7===0&&h.awd!==d){h.awd=d;if((h.tokens??1)<MAX_TOKENS){h.tokens=(h.tokens??1)+1;token=true}}
      // mystery chest: once per day, when the whole list is done. ~40% chance, guaranteed on milestones and after 2 dry days
      if(c.habits.every(x=>x.log[d])&&c.cr!==d){c.cr=d
        if(token||(sk>0&&sk%7===0)||b>a||(c.cm||0)>=2||Math.random()<.4){const r=drawItem(c.coll||[]);c.cm=0;if(r.id!=='_')c.coll=[...(c.coll||[]),r.id];gotChest=r}
        else c.cm=(c.cm||0)+1}}
    setS(c);setFresh(id+d);setTimeout(()=>setFresh(null),600)
    if(b>a)setWup({idx:b,k:Date.now()})
    const later=()=>{if(gotChest)setTimeout(()=>setChest({...gotChest,k:Date.now()}),(b>a?600:2500)+(sk>=7?900:0))}
    if(un){if(!silent)say(trophy);return trophy}
    if(silent){later();return trophy}
    const done=c.habits.filter(x=>x.log[d]).length
    let {msg,big}=cheer({L,name:h.name,streak:sk,done,total:c.habits.length,comeback:away!=null&&away>=3,goal:!!h.goal&&sk===h.goal,token})
    if(lvl===2&&!big)msg=X('حداقل رو زدی؛ از صفر خیلی بهتره 🌱 هر وقت حال داشتی کاملش کن','Minimum done, miles better than zero 🌱 Finish it whenever you feel like it')
    const mode=S.fx||'on'
    if(mode==='off'){say(n(msg)+' · '+trophy)}
    else{setFx({k:Date.now(),color:h.color,msg:n(msg),trophy,big:big||b>a,x:ptr.current.x,y:ptr.current.y});buzz(big);if(mode==='on')chime(sk,big||b>a)}
    later();return trophy
  }
  const equip=id=>up(s=>{s.hat=s.hat===id?'':id})

  /** use / take back a rest day for today */
  const rest=(id,on=true)=>{
    const h=S.habits.find(x=>x.id===id),d=ymd(D0());if(!h)return
    if(on){if((h.tokens??1)<1||h.log[d]||h.fz?.[d])return;say(X('🧊 امروز رو استراحت حساب کردم؛ استریکت سالمه','🧊 Today counts as a rest day; your streak is safe'))}
    up(s=>{const x=s.habits.find(y=>y.id===id);x.fz=x.fz||{}
      if(on){x.fz[d]=1;x.tokens=(x.tokens??1)-1}else if(x.fz[d]){delete x.fz[d];x.tokens=Math.min(MAX_TOKENS,(x.tokens??0)+1)}})
  }

  /* ---- when you were away: spend rest days to keep streaks alive ---- */
  const [dayK,setDayK]=useState(ymd(D0()))
  useEffect(()=>{const f=()=>setDayK(ymd(D0()));document.addEventListener('visibilitychange',f);const i=setInterval(f,60000);return()=>{document.removeEventListener('visibilitychange',f);clearInterval(i)}},[])
  useEffect(()=>{
    const r=settle(S.habits);if(!r)return
    setS(s=>({...s,habits:r.habits}))
    if(r.used.length){const days=r.used.reduce((x,u)=>x+u.days,0),names=r.used.map(u=>u.name).join(X('، ',', '))
      say(X(`🧊 ${names}: نبودی، پس ${n(days)} روز استراحت خرج شد و استریکت سالمه`,`🧊 ${names}: you were away, so ${days} rest day${days>1?'s were':' was'} used and your streak is safe`))}
  },[dayK])

  /* ---- daily reminders (fire only while the app is open: no server, no background push) ---- */
  const Sr=useRef(S);Sr.current=S
  useEffect(()=>{
    const f=()=>{const s=Sr.current,now=new Date(),m=now.getHours()*60+now.getMinutes(),d=ymd(D0());let fired=null
      s.habits.forEach(h=>{if(fired||!h.rt||h.log[d]||h.fz?.[d]||(s.rn||{})[h.id]===d)return
        const [hh,mm]=h.rt.split(':').map(Number),diff=m-(hh*60+mm);if(diff<0||diff>90)return
        fired=h})
      if(!fired)return
      const h=fired,body=(h.cue||h.act?`${h.cue?(L==='fa'?'وقتی '+h.cue:'When '+h.cue):''}${h.act?' → '+h.act:''}`:(L==='fa'?'یه قدم کوچیک کافیه 🌱':'One small step is enough 🌱'))+(h.why?`\n«${h.why}»`:'')
      up(x=>{x.rn={...(x.rn||{}),[h.id]:d}})
      try{if(typeof Notification!=='undefined'&&Notification.permission==='granted')new Notification((L==='fa'?'وقتشه: ':'Time for: ')+h.name,{body,tag:'peyma-'+h.id})}catch{}
      say('⏰ '+h.name+(h.min?' · ⚡ '+h.min:''))}
    f();const i=setInterval(f,20000);return()=>clearInterval(i)
  },[L])

  /* ---- timer: lives here so it keeps running while you browse other tabs ---- */
  const [now,setNow]=useState(Date.now()),ts=S.timer||T0
  const left=ts.run?Math.max(0,Math.ceil((ts.endAt-now)/1000)):ts.left,tm={...ts,left}
  const ut=fn=>up(s=>{s.timer={...T0,...s.timer};fn(s.timer)})
  const setDur=sec=>ut(x=>{x.dur=x.left=sec;x.run=false})
  const start=()=>{setNow(Date.now());ut(x=>{if(x.left<=0)x.left=x.dur;x.run=true;x.endAt=Date.now()+x.left*1000})}
  const pause=()=>ut(x=>{x.left=Math.max(0,Math.ceil((x.endAt-Date.now())/1000));x.run=false})
  const reset=()=>ut(x=>{x.left=x.dur;x.run=false})
  const addMin=()=>ut(x=>{x.dur+=60;x.left+=60;if(x.run)x.endAt+=60000})
  const setTH=id=>ut(x=>{x.habit=id})
  function finish(){
    const d=ymd(D0()),h=S.habits.find(x=>x.id===ts.habit),m=h&&!h.log[d]?toggle(h.id,d,true):''
    beep();up(s=>{s.timer.run=false;s.timer.left=s.timer.dur;s.focus={...s.focus,[d]:((s.focus||{})[d]||0)+Math.round(s.timer.dur/60)}})
    say(X('⏰ تایمر تموم شد','⏰ Timer finished')+(h?' · '+h.name+' ✓':'')+(m?' · '+m:''))
  }
  useEffect(()=>{if(!ts.run)return;const i=setInterval(()=>setNow(Date.now()),250);return()=>clearInterval(i)},[ts.run])
  useEffect(()=>{if(ts.run&&left<=0)finish()},[ts.run,left])
  useEffect(()=>{document.title=ts.run?`${fmt(left)} · Peyma`:'Peyma · پیما'},[ts.run,left])

  return <Ctx.Provider value={{S,setS,up,L,jal,pref,dark,X,n,t,ar,R,go,sh,setSh,toast,say,toggle,rest,fx,setFx,wup,setWup,chest,setChest,equip,toggleTheme,fresh,tm,fmt,setDur,start,pause,reset,addMin,setTH}}>{children}</Ctx.Provider>
}
