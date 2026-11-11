/** draws a 1080x1350 share card with the current progress and shares / downloads it as PNG */
const rr=(c,x,y,w,h,r)=>{c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
export async function shareCard({fa,world,rank,streak,trophies,habit,done,total,hat,color}){
  try{await document.fonts?.ready}catch{}
  const W=1080,H=1350,cv=document.createElement('canvas');cv.width=W;cv.height=H;const c=cv.getContext('2d')
  const fam=getComputedStyle(document.body).fontFamily||'sans-serif',dir=fa?'rtl':'ltr'
  const g=c.createLinearGradient(0,0,W,H);g.addColorStop(0,world.c2);g.addColorStop(1,'#0b0b12');c.fillStyle=g;c.fillRect(0,0,W,H)
  const rg=c.createRadialGradient(W/2,430,20,W/2,430,640);rg.addColorStop(0,world.c+'88');rg.addColorStop(1,'transparent');c.fillStyle=rg;c.fillRect(0,0,W,H)
  c.direction=dir;c.textAlign='center'
  c.fillStyle='#ffffffcc';c.font=`700 44px ${fam}`;c.fillText(fa?'پیما · Peyma':'Peyma',W/2,120)
  c.font=`260px ${fam}`;c.fillStyle='#fff';c.fillText(world.e,W/2,470)
  if(hat){c.font=`120px ${fam}`;c.fillText(hat,W/2+20,330)}
  c.font=`900 64px ${fam}`;c.fillStyle='#fff';c.fillText(fa?world.n:world.ne,W/2,590)
  c.font=`500 38px ${fam}`;c.fillStyle='#ffffffb0';c.fillText((fa?'عنوان: ':'Rank: ')+rank,W/2,650)
  const nums=[[streak,fa?'روز استریک 🔥':'day streak 🔥'],[trophies,fa?'تروفی 🏆':'trophies 🏆'],[`${done}/${total}`,fa?'امروز ✅':'today ✅']]
  const fx=n=>fa?String(n).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]):String(n)
  nums.forEach(([v,l],i)=>{const w=300,x=60+i*(w+30),y=760;rr(c,x,y,w,230,40);c.fillStyle='#ffffff14';c.fill();c.strokeStyle=color+'66';c.lineWidth=3;c.stroke()
    c.fillStyle='#fff';c.font=`900 100px ${fam}`;c.fillText(fx(v),x+w/2,y+125);c.fillStyle='#ffffffa0';c.font=`500 34px ${fam}`;c.fillText(l,x+w/2,y+188)})
  if(habit){c.fillStyle='#ffffff';c.font=`700 46px ${fam}`;c.fillText(habit,W/2,1090)}
  c.fillStyle='#ffffff80';c.font=`500 34px ${fam}`;c.fillText(fa?'هر روز یه قدم کوچیک':'One small step, every day',W/2,1230)
  const blob=await new Promise(r=>cv.toBlob(r,'image/png'));if(!blob)return'fail'
  const file=new File([blob],'peyma.png',{type:'image/png'})
  try{if(navigator.canShare?.({files:[file]})){await navigator.share({files:[file],title:'Peyma'});return'shared'}}catch(e){if(e&&e.name==='AbortError')return'cancel'}
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='peyma.png';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000);return'saved'
}
