const q=new URL(self.location.href).searchParams,uvv=q.get('uv')||'3.2.10',sjv=q.get('sj')||'1.1.0'
const B=new URL('./',self.registration.scope).pathname,E=B+'engines/',J=JSON.stringify
const U=E+'uv/'+uvv+'/'
importScripts(U+'uv.bundle.js')
const cfgText='self.__uv$config={prefix:'+J(B+'service/')+',encodeUrl:Ultraviolet.codec.xor.encode,decodeUrl:Ultraviolet.codec.xor.decode,handler:'+J(U+'uv.handler.js')+',client:'+J(U+'uv.client.js')+',bundle:'+J(U+'uv.bundle.js')+',config:'+J(B+'uv.config.js')+',sw:'+J(U+'uv.sw.js')+'}'
;(0,eval)(cfgText)
importScripts(__uv$config.sw)
importScripts(E+'sj/'+sjv+'/scramjet.all.js')
const uv=new UVServiceWorker()
const {ScramjetServiceWorker}=$scramjetLoadWorker()
const sj=new ScramjetServiceWorker()
const sjPrefix=B+'sj/'
self.addEventListener('install',()=>self.skipWaiting())
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()))
self.addEventListener('fetch',e=>{
const p=new URL(e.request.url).pathname
if(p===B+'uv.config.js'){e.respondWith(new Response(cfgText,{headers:{'content-type':'text/javascript','cache-control':'no-store'}}));return}
if(uv.route(e)){e.respondWith(uv.fetch(e));return}
if(p.startsWith(sjPrefix)){e.respondWith((async()=>{await sj.loadConfig();return sj.route(e)?sj.fetch(e):fetch(e.request)})())}
})
