/** collectible accessories for the companion — purely cosmetic, never affects trophies or streaks */
export const RAR=[
  {fa:'معمولی',en:'Common',c:'#94a3b8',w:58},
  {fa:'کمیاب',en:'Rare',c:'#38bdf8',w:28},
  {fa:'حماسی',en:'Epic',c:'#c084fc',w:11},
  {fa:'افسانه‌ای',en:'Legendary',c:'#fbbf24',w:3},
]
export const ITEMS=[
  {id:'cap',e:'🧢',r:0,fa:'کلاه کپ',en:'Cap'},{id:'bow',e:'🎀',r:0,fa:'پاپیون',en:'Bow'},
  {id:'flower',e:'🌼',r:0,fa:'گل کوچولو',en:'Daisy'},{id:'balloon',e:'🎈',r:0,fa:'بادکنک',en:'Balloon'},
  {id:'phones',e:'🎧',r:1,fa:'هدفون',en:'Headphones'},{id:'shades',e:'🕶️',r:1,fa:'عینک آفتابی',en:'Shades'},
  {id:'tophat',e:'🎩',r:1,fa:'کلاه سیلندر',en:'Top hat'},{id:'butterfly',e:'🦋',r:1,fa:'پروانه',en:'Butterfly'},
  {id:'wand',e:'🪄',r:2,fa:'عصای جادو',en:'Magic wand'},{id:'rainbow',e:'🌈',r:2,fa:'رنگین‌کمان',en:'Rainbow'},
  {id:'crystal',e:'🔮',r:2,fa:'گوی کریستالی',en:'Crystal ball'},
  {id:'crown',e:'👑',r:3,fa:'تاج شاه عادت‌ها',en:'Habit crown'},{id:'diamond',e:'💎',r:3,fa:'الماس',en:'Diamond'},
]
const QUOTES=[
  ['«کار بزرگ یعنی تکرار کارهای کوچیک.»','"Big things are small things repeated."'],
  ['«لازم نیست عالی باشی؛ فقط حاضر باش.»','"You do not have to be perfect, just present."'],
  ['«هر روز یه رأی به آدمی که میخوای بشی.»','"Every day is a vote for who you want to become."'],
]
const pick=a=>a[Math.floor(Math.random()*a.length)]
/** weighted pick among items you do not own yet; when you own everything you get a note instead */
export function drawItem(owned=[]){
  const left=ITEMS.filter(i=>!owned.includes(i.id))
  if(!left.length){const q=pick(QUOTES);return{id:'_',e:'💌',r:1,fa:'یه پیام برای تو',en:'A note for you',qfa:q[0],qen:q[1]}}
  const rs=[...new Set(left.map(i=>i.r))],tot=rs.reduce((a,r)=>a+RAR[r].w,0);let x=Math.random()*tot,r=rs[0]
  for(const k of rs){x-=RAR[k].w;if(x<=0){r=k;break}}
  return pick(left.filter(i=>i.r===r))
}
