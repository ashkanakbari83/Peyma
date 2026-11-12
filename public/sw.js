/* Peyma service worker: offline-first shell, stale-while-revalidate for same-origin files */
const V='peyma-v2'
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(['./','./manifest.webmanifest','./icon.svg'])).then(()=>self.skipWaiting()))})
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))})
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{
    const net=fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>hit||caches.match('./'))
    return hit||net}))})
