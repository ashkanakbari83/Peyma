import {D0,ymd,streak,daysAway} from './core.js'

const pick=a=>a[Math.floor(Math.random()*a.length)]
const fill=(s,o)=>s.replace(/\{(\w+)\}/g,(_,k)=>o[k]??'')

/* ---------- messages shown right after a check-in ---------- */
const M={
 fa:{
  first:['شروع قشنگی بود 🌱','یه قدم برداشتی؛ همین مهمه ✨','آفرین! امروز هم حاضر شدی 💪','«{name}» انجام شد. اولین گام همیشه سخت‌ترینه','خوش اومدی به امروزت! یه تیک سبز ✅'],
  more:['یکی دیگه تموم شد؛ داری میدرخشی ✨','همین ریتم عالیه! ادامه بده 🎯','«{name}» هم رفت تو کیسه 😎','پشت‌سر هم! امروز روز توئه 🔥'],
  all:['همه‌ی عادت‌های امروز انجام شد! امروزت رو بردی 🎉','بی‌نقص بود! یه نفس عمیق بکش و به خودت افتخار کن ✨','لیست امروز کامل شد؛ حالا استراحتت حق‌ــه 🌙'],
  comeback:['خوشحالم برگشتی 🤍 برگشتن مهم‌تر از وقفه‌ست','هیچ‌وقت دیر نیست. از همین امروز ادامه میدیم 🌱','دوباره شروع کردن یعنی قوی بودن 💪'],
  goal:['به هدف استریکت رسیدی! 🎯 باورنکردنیه','هدف تموم شد! تو واقعاً این کار رو کردی 🏆'],
  token:['یه روز استراحت جدید هم هدیه گرفتی 🧊'],
  streak:{3:'سه روز پشت‌سرهم! داره عادت میشه 🔥',7:'یه هفته کامل! عادت داره ریشه میزنه 🌳',14:'دو هفته! این دیگه جدیه 💎',21:'سه هفته؛ دیگه ازت جدا نمیشه 🔥',30:'یه ماه کامل! 👑',50:'پنجاه روز! افسانه‌ای شدی 🌟',100:'صد روز! باورم نمیشه 🏅',365:'یه سال کامل. تو یه پیماگر واقعی هستی 🏆'},
 },
 en:{
  first:['Lovely start 🌱','One step taken — that is what counts ✨','Nice! You showed up today 💪','"{name}" done. The first step is always the hardest','Welcome to your day! One green tick ✅'],
  more:['Another one down — you are glowing ✨','Great rhythm! Keep it going 🎯','"{name}" is in the bag 😎','Back to back! Today is your day 🔥'],
  all:['Everything done today! You won the day 🎉','Flawless! Take a deep breath and be proud ✨','Today\'s list is complete — you earned your rest 🌙'],
  comeback:['So glad you are back 🤍 Coming back matters more than the break','It is never too late. We continue from today 🌱','Starting again takes strength 💪'],
  goal:['You reached your streak goal! 🎯','Goal complete! You really did it 🏆'],
  token:['You also earned a new rest day 🧊'],
  streak:{3:'Three days in a row! It is becoming a habit 🔥',7:'A full week! The habit is taking root 🌳',14:'Two weeks! This is serious 💎',21:'Three weeks; it is part of you now 🔥',30:'A whole month! 👑',50:'Fifty days! Legendary 🌟',100:'One hundred days! 🏅',365:'A full year. You are a true Peyma-goer 🏆'},
 }
}
/** ctx: {L,name,streak,done,total,comeback,goal,token,world} -> {msg, big} */
export function cheer(c){
  const m=M[c.L==='fa'?'fa':'en'],o={name:c.name}
  let msg,big=false
  if(c.goal){msg=pick(m.goal);big=true}
  else if(m.streak[c.streak]){msg=m.streak[c.streak];big=c.streak>=7}
  else if(c.comeback)msg=pick(m.comeback)
  else if(c.total>1&&c.done===c.total){msg=pick(m.all);big=true}
  else if(c.done<=1)msg=pick(m.first)
  else msg=pick(m.more)
  if(c.token)msg+=' · '+m.token[0]
  return{msg:fill(msg,o),big}
}

/* ---------- the companion ---------- */
const L={
 fa:{
  new:['سلام! من همراه سفرتم 🌱 اولین عادتت رو بساز و تیک بزن تا راه بیفتیم','هنوز هیچی نیست؛ ولی هر سفر بزرگی از یه قدم کوچیک شروع شده ✨'],
  morning:['صبح بخیر! امروز یه قدم کوچیک هم کافیه ☀️','بیا امروز رو با یه تیک شروع کنیم 🌿','من اینجام؛ هر وقت آماده بودی 🤍'],
  day:['وسط روزی! یه تیک کوچیک الان خیلی میچسبه ✨','هنوز وقت داری. بیا یکی‌شو انجام بدیم 💪','یادت نره؛ فقط یه قدم کوچیک 🌱'],
  evening:['هنوز شب نشده. یکی از کارای امروز رو بزنیم؟ 🌆','حتی یه تیک کوچیک هم امروز رو نجات میده ✨','دیر نیست؛ هنوز میشه امروز رو ساخت 🤍'],
  sleepy:['دیروقته... اگه هنوز نزدی، یه تیک کوچیک و بعد استراحت 😴','خوابم میاد… ولی با یه تیک خوشحال‌تر میخوابم 🌙'],
  happy:['داری خوب پیش میری! ادامه بده 💪','یکی انجام شد؛ بقیه‌ش آسون‌تره ✨','دمت گرم! 🌟'],
  cheer:['امروزت رو بردی! 🎉','بی‌نقص بود. بهت افتخار میکنم 🥹','همه رو زدی! بزن قدش 🙌'],
  back:['دلم برات تنگ شده بود 🤍 اشکالی نداره؛ از همین امروز شروع کنیم','خوشحالم برگشتی! هیچ‌چیزی از دست نرفته 🌱','برگشتن مهم‌تر از وقفه‌ست 💫'],
  streak:'دارم استریک {n} روزه‌ی «{h}» رو نگه میدارم 🔥',
  rank:'عنوان فعلی تو: {t}',
  poke:['هی! قلقلکم میدی؟ 😄','هورا! 🎈','من همیشه کنارتم 🤍','میدونی چیه؟ تو خوب پیش میری ✨','یه نفس عمیق… و یه قدم کوچیک 🌿'],
 },
 en:{
  new:['Hi! I am your travel buddy 🌱 Create your first habit and tick it to get going','Nothing yet — but every big journey starts with one small step ✨'],
  morning:['Good morning! One small step is enough today ☀️','Let us start the day with a tick 🌿','I am here whenever you are ready 🤍'],
  day:['Midday! A small tick feels great right now ✨','You still have time. Let us do one 💪','Remember — just one small step 🌱'],
  evening:['It is not night yet. Shall we tick one thing? 🌆','Even one small tick saves the day ✨','It is not too late; today can still be built 🤍'],
  sleepy:['It is late... if you have not yet, one small tick, then rest 😴','So sleepy… but I will sleep happier with a tick 🌙'],
  happy:['You are doing well! Keep going 💪','One down; the rest is easier ✨','Nice work! 🌟'],
  cheer:['You won today! 🎉','Flawless. I am proud of you 🥹','You got them all! 🙌'],
  back:['I missed you 🤍 No worries — we start again today','So glad you are back! Nothing is lost 🌱','Coming back matters more than the break 💫'],
  streak:'I am guarding your {n}-day streak on "{h}" 🔥',
  rank:'Your rank: {t}',
  poke:['Hey! That tickles 😄','Yay! 🎈','I am always by your side 🤍','You know what? You are doing well ✨','Deep breath… and one small step 🌿'],
 }
}
export function petMood(habits){
  const t=ymd(D0()),total=habits.length,done=habits.filter(h=>h.log[t]).length,away=daysAway(habits),hr=new Date().getHours()
  if(!total||away==null&&!done)return'new'
  if(done===total)return'cheer'
  if(done>0)return'happy'
  if(away>=2)return'back'
  if(hr<5||hr>=23)return'sleepy'
  return hr<12?'morning':hr<18?'day':'evening'
}
/** tick = number of pokes, so every tap says something new */
export function petSay(habits,lang,tick=0,rankTitle=''){
  const l=L[lang==='fa'?'fa':'en'],mood=petMood(habits)
  if(tick>0)return pick(l.poke)
  const best=[...habits].sort((a,b)=>streak(b)-streak(a))[0]
  if((mood==='morning'||mood==='day'||mood==='evening'||mood==='happy')&&best&&streak(best)>=3&&Math.random()<.45)
    return fill(l.streak,{n:streak(best),h:best.name})
  if(mood==='cheer'&&rankTitle&&Math.random()<.4)return fill(l.rank,{t:rankTitle})
  const pool=l[mood==='morning'||mood==='day'||mood==='evening'||mood==='new'||mood==='sleepy'||mood==='happy'||mood==='cheer'||mood==='back'?mood:'day']
  return pick(pool)
}
