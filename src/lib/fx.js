/** soft success chime; pitch rises a little with the streak */
export function chime(level=0,big=false){
  try{
    const A=new (window.AudioContext||window.webkitAudioContext)(),t0=A.currentTime,up=Math.pow(2,Math.min(level,12)/24)
    const notes=big?[523,659,784,1047]:[659,880]
    notes.forEach((f,i)=>{const o=A.createOscillator(),g=A.createGain(),t=t0+i*.09
      o.type='sine';o.frequency.value=f*up;o.connect(g);g.connect(A.destination)
      g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.16,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+.5)
      o.start(t);o.stop(t+.55)})
    setTimeout(()=>A.close?.(),1400)
  }catch{}
}
export const buzz=big=>{try{navigator.vibrate?.(big?[30,40,70]:22)}catch{}}
/** confetti pieces for the celebration layer */
export function pieces(n,colors){
  return[...Array(n)].map((_,i)=>{
    const a=(Math.PI*2*i)/n+Math.random()*.7,d=70+Math.random()*(n>30?260:190)
    return{dx:Math.round(Math.cos(a)*d),dy:Math.round(Math.sin(a)*d*.85-60),r:Math.round((Math.random()-.5)*900),s:5+Math.random()*7,
      t:(.9+Math.random()*.7).toFixed(2),c:colors[i%colors.length],round:i%3===0}})
}
