const CACHE='manomitra-v36';
const FILES=['./','./index.html','./styles.css','./prototype-integrations.css','./app.js','./question-bank.js','./story-bank.js','./firebase-config.js','./firebase-service.js','./manifest.webmanifest','./careloop-brand-emblem.png','./default-profile-woman.svg','./default-profile-man.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url),fresh=url.origin===location.origin&&(event.request.mode==='navigate'||['script','style'].includes(event.request.destination));
  if(fresh){
    event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match(event.request).then(hit=>hit||caches.match('./index.html'))));
    return;
  }
  event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response})));
});
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(windows=>{for(const client of windows){if('focus'in client){client.navigate(event.notification.data?.url||'./#reminders');return client.focus()}}return clients.openWindow(event.notification.data?.url||'./#reminders')}))});
