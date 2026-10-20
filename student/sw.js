/* ahak-student 서비스 워커 — 처음 열 때 전체를 저장해 두고 인터넷 없이도 열려요 (build_all.py 가 생성) */
const CACHE='ahak-student-0661c545fd';
const ASSETS=["./", "./index.html", "./manifest.webmanifest", "../shared/fonts/NotoSansKR-regular.woff", "../shared/fonts/NotoSansKR-bold.woff", "../shared/fonts/NotoSerifKR-bold.woff", "../shared/img/student-192.png", "../shared/img/student-512.png", "../shared/img/student-apple-touch-icon.png"];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('ahak-student-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET') return;
  const url=new URL(req.url); if(url.origin!==location.origin) return;
  e.respondWith(caches.match(req,{ignoreSearch:true}).then(hit=>hit||fetch(req).then(res=>{
    if(res&&res.ok&&res.type==='basic'){ const cp=res.clone(); caches.open(CACHE).then(c=>c.put(req,cp)); }
    return res;
  }).catch(()=>req.mode==='navigate'?caches.match('./index.html'):undefined)));
});
