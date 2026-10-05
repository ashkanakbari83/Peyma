export const p2=n=>String(n).padStart(2,'0')
export const D0=()=>{const d=new Date();d.setHours(0,0,0,0);return d}
export const ymd=d=>`${d.getFullYear()}-${p2(d.getMonth()+1)}-${p2(d.getDate())}`
export const add=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x}
export const wi=d=>(d.getDay()+1)%7 // week starts on Saturday
export const pd=k=>new Date(k+'T00:00')
export const uid=()=>Math.random().toString(36).slice(2,8)
export const C=['#f87171','#fb923c','#fbbf24','#facc15','#a3e635','#4ade80','#34d399','#2dd4bf','#22d3ee','#38bdf8','#60a5fa','#818cf8','#a78bfa','#c084fc','#e879f9','#f472b6','#fb7185','#94a3b8','#9ca3af','#a3a3a3','#a8a29e']
export const IC=['pulse','book','drop','dumb','star','bolt','heart','phones','leaf','coffee']
export const EN=['Sat','Sun','Mon','Tue','Wed','Thu','Fri'],SH=['ش','ی','د','س','چ','پ','ج']
export const FA=['شنبه','یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه'],EF=['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday']
const MN=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const JM=['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'],JME=['Farvardin','Ordibehesht','Khordad','Tir','Mordad','Shahrivar','Mehr','Aban','Azar','Dey','Bahman','Esfand']
const GMF=['ژانویه','فوریه','مارس','آوریل','مه','ژوئن','ژوئیه','اوت','سپتامبر','اکتبر','نوامبر','دسامبر']
export const monthName=(i,jal,fa)=>(jal?(fa?JM:JME):(fa?GMF:MN))[i]

/** Gregorian Date -> [jy, jm, jd] (Jalali / Persian calendar) */
export function g2j(d){let gy=d.getFullYear(),gm=d.getMonth()+1,gd=d.getDate();const m=[0,31,59,90,120,151,181,212,243,273,304,334];let jy=gy<=1600?0:979;gy-=gy<=1600?621:1600;const g2=gm>2?gy+1:gy;let days=365*gy+Math.floor((g2+3)/4)-Math.floor((g2+99)/100)+Math.floor((g2+399)/400)-80+gd+m[gm-1];jy+=33*Math.floor(days/12053);days%=12053;jy+=4*Math.floor(days/1461);days%=1461;if(days>365){jy+=Math.floor((days-1)/365);days=(days-1)%365}return[jy,days<186?1+Math.floor(days/31):7+Math.floor((days-186)/30),1+(days<186?days%31:(days-186)%30)]}
export const cal={
  day:(d,j)=>j?g2j(d)[2]:d.getDate(),
  mon:(d,j)=>j?g2j(d)[1]-1:d.getMonth(),
  year:(d,j)=>j?g2j(d)[0]:d.getFullYear(),
  first:(d,j)=>j?add(d,-(g2j(d)[2]-1)):new Date(d.getFullYear(),d.getMonth(),1),
  len:(f,j)=>{let n=28;while(j?g2j(add(f,n))[1]===g2j(f)[1]:add(f,n).getMonth()===f.getMonth())n++;return n},
}

export const mk=(name,desc,color,icon)=>({id:uid(),name,desc,color,icon,type:'build',goal:0,created:ymd(D0()),log:{},notes:{}})
export function streak(h){let d=D0();if(!h.log[ymd(d)])d=add(d,-1);let n=0;while(h.log[ymd(d)]){n++;d=add(d,-1)}return n}
export function bestS(h){let b=0,c=0,p=null;for(const x of Object.keys(h.log).sort()){c=p&&ymd(add(pd(p),1))===x?c+1:1;b=Math.max(b,c);p=x}return b}
export function rate(h){const t=D0(),sp=Math.max(1,Math.min(30,Math.round((t-pd(h.created||ymd(t)))/864e5)+1));let n=0;for(let i=0;i<sp;i++)if(h.log[ymd(add(t,-i))])n++;return Math.round(n/sp*100)}

/* ---- Trophy Road ---- */
export const W=[
['کمپ تمرین','Training Camp','🏕️',0,'#4ade80','#14532d','hills','🍃','fall','تازه‌کار','Novice','سفر از یه کمپ کوچیک وسط دشت شروع میشه. آتیش کمپ روشنه و یه نقشه روی زمین پهن شده؛ هر قدم کوچیک یه خط روی این نقشه می‌کشه. اینجا فقط یه چیز رو باید یاد بگیری: هر روز حاضر باش.','The journey begins at a small camp in the middle of the plains. The campfire is lit and a map lies open on the ground; every small step draws one more line on it. Here you only need to learn one thing: show up every day.'],
['جنگل جادویی','Magic Forest','🌲',51,'#2dd4bf','#134e4a','hills','✨','float','جنگل‌بان','Ranger','درخت‌های این جنگل فقط برای کسی کنار میرن که پشت‌سرهم برگرده. شب‌تاب‌ها مسیر رو نشون میدن، ولی اگه یه روز جا بندازی نورشون کم‌رنگ میشه. جنگل قدر استمرار رو می‌دونه.','The trees of this forest only part for those who keep coming back. Fireflies light the path, but skip a day and their glow fades. The forest respects consistency.'],
['معدن طلا','Gold Mine','⛏️',121,'#fbbf24','#78350f','dunes','💎','float','کاشف','Prospector','عمق معدن، زیر هر عادتِ تکرارشده یه رگه طلا پنهونه. هر تیک یه ضربه کلنگه؛ بعضی روزا چیزی پیدا نمی‌کنی، اما ضربه‌ها روی هم جمع میشن و یه روز سنگ‌ها می‌درخشن.','Deep in the mine, a vein of gold hides beneath every repeated habit. Each check-in is a pickaxe swing; some days you find nothing, but the swings add up, and one day the stones begin to shine.'],
['قله یخی','Ice Peak','🏔️',221,'#7dd3fc','#0c4a6e','peaks','❄️','fall','کوهنورد','Mountaineer','هرچی بالاتر میری هوا سردتر و انگیزه کمتر میشه. قله یخی امتحان روزهای بی‌حوصلگیه؛ کسایی که تو سرما هم تیک می‌زنن، از روی برف رد میشن.','The higher you climb, the colder the air and the thinner your motivation. The Ice Peak tests your unmotivated days; those who check in even in the cold walk right across the snow.'],
['کوره آتشین','Lava Forge','🌋',361,'#fb923c','#7f1d1d','peaks','🔥','rise','آهنگر','Forgemaster','اینجا کوره‌ی عادت‌هاست. گرما و فشار، تکرارهای پراکنده رو به یه زنجیر محکم جوش میدن. استریک‌های بلند مثل فولاد آب‌دیده‌ان؛ شکستن‌شون سخته.','This is the forge of habits. Heat and pressure weld scattered repetitions into one strong chain. Long streaks are tempered like steel; they are hard to break.'],
['اعماق دریا','Deep Sea','🌊',551,'#22d3ee','#164e63','waves','🫧','rise','غواص','Diver','زیر آب صدای دنیا خاموش میشه و فقط ریتم خودت می‌مونه. اینجا یاد می‌گیری بدون تشویق و بدون تماشاچی ادامه بدی.','Underwater, the noise of the world fades and only your own rhythm remains. Here you learn to carry on without cheering and without an audience.'],
['قلعه آسمانی','Sky Citadel','🏯',801,'#93c5fd','#3730a3','clouds','☁️','drift','بادسوار','Skyrider','قلعه‌ای بالای ابرها که فقط با عادت‌های پایدار بهش میرسی. از اینجا کل مسیر پیداست؛ نقشه روزهای گذشته مثل یه فرش زیر پاته.','A citadel above the clouds, reachable only through steady habits. From here you can see the whole road; the map of your past days lies like a carpet beneath you.'],
['معبد ماه','Moon Temple','🌙',1121,'#c4b5fd','#312e81','hills','✨','float','ماه‌نشین','Moonkeeper','شب و سکوت. معبد ماه نگهبان کسانیه که هرج‌ومرج رو با نظم عوض کردن. آرامش یعنی بدون زور ادامه دادن.','Night and silence. The Moon Temple guards those who traded chaos for routine. Calm means going on without force.'],
['دروازه ستارگان','Star Gate','🌠',1521,'#e879f9','#4a044e','flat','⭐','float','ستاره‌شناس','Stargazer','دروازه ستارگان آخرین آزموده: عادت‌ها دیگه از تو جدا نیستن، بخشی از هویتتن. هر ستاره یه روزیه که حاضر بودی.','The Star Gate is the final trial: habits are no longer separate from you, they are part of who you are. Each star is a day you showed up.'],
['کاخ افسانه‌ای','Legendary Palace','🏰',2021,'#fcd34d','#6b21a8','peaks','🎉','fall','شاه عادت‌ها','Habit King','سفر تموم شد... یا شاید تازه شروع شده. توی کاخ افسانه‌ای شعله ابدی روشنه؛ اینجا کسی میاد که دیگه به یادآوری نیاز نداره. تو یه پیماگر واقعی هستی.','The journey is over... or maybe it has just begun. In the Legendary Palace the Eternal Flame burns for those who no longer need reminders. You are a true Peyma-goer.']
].map(([n,ne,e,m,c,c2,g,p,mo,t,te,s,se])=>({n,ne,e,m,c,c2,g,p,mo,t,te,s,se}))
export const gain=c=>Math.round(4*(1+.25*(Math.min(c,14)-1))) // 4 x (1 + 0.25 x (streakDay-1)), streakDay capped at 14
export const wIdx=t=>W.reduce((a,w,i)=>t>=w.m?i:a,0)
export function troph(habits){const day={},ph={};
  habits.forEach(h=>{let c=0,p=null;ph[h.id]=0;for(const k of Object.keys(h.log).sort()){c=p&&ymd(add(pd(p),1))===k?c+1:1;p=k;const g=gain(c);day[k]=(day[k]||0)+g;ph[h.id]+=g}})
  if(habits.length>1)Object.keys(day).forEach(k=>{if(habits.every(h=>h.log[k]))day[k]+=3}) // perfect-day bonus
  return{total:Object.values(day).reduce((a,b)=>a+b,0),day,ph}}
export const fmt=s=>`${p2(Math.floor(s/60))}:${p2(s%60)}`
