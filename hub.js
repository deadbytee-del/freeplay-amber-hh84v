import Fuse from './fuse.min.mjs'
import {BareMuxConnection} from './baremux/index.mjs'
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)]
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
const ic=(n,c)=>`<svg class="i${c?' '+c:''}" aria-hidden="true"><use href="icons.svg#${n}"/></svg>`
const B=new URL('./',location.href).pathname
const LS={get(k,d){try{const v=localStorage.getItem('hub.'+k);return v===null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('hub.'+k,JSON.stringify(v))}catch(e){}},wipe(){try{Object.keys(localStorage).filter(k=>k.startsWith('hub.')).forEach(k=>localStorage.removeItem(k))}catch(e){}},all(){const o={};try{Object.keys(localStorage).filter(k=>k.startsWith('hub.')).forEach(k=>o[k]=localStorage.getItem(k))}catch(e){}return o}}
const UVV=['3.2.10','3.1.5'],SJV=['1.1.0'],E=B+'engines/'
const ENG={uv:['Ultraviolet','Mature and works on most sites'],sj:['Scramjet','Newer, faster on heavy sites']}
const TR={libcurl:['Libcurl','libcurl/index.mjs','Full TLS, widest support'],epoxy:['Epoxy','epoxy/index.mjs','Lightweight, quick to connect'],bare:['Bare server','bare/index.mjs','Your own Bare server, no Wisp']}
const SE={ddg:['DuckDuckGo','https://duckduckgo.com/?q=%s'],google:['Google','https://www.google.com/search?q=%s'],bing:['Bing','https://www.bing.com/search?q=%s'],brave:['Brave','https://search.brave.com/search?q=%s'],custom:['Custom','']}
const BT={liteer:['LiTeer','The default look','ddg','Search or enter a web address'],google:['Google','Flat tabs, round address bar, search-first start page','google','Search Google or type a URL'],brave:['Brave','Rounded tabs and a private start page','brave','Search the web privately'],ddg:['DuckDuckGo','Light, plain layout with private search','ddg','Search without being tracked'],edge:['Microsoft Edge','Rounded tabs with Bing search','bing','Search the web'],firefox:['Firefox','Detached tabs with purple accents','google','Search or enter address']}
const SITES=[['Lux','santiiturriaga/Lux','lux'],['InvisiProxy','QuiteAFancyEmerald/InvisiProxy','invisi'],['InvisiProxy LTS','InvisiProxy/InvisiProxyLTS','invisilts'],['NOVA Proxy','4c30fSp4des/NOVA-Proxy','nova'],['Outerworld','freyerlags/outerworld','outerworld'],['Northstar Proxy','NoobVrGT/Northstar-Proxy','north'],['Nano','titaniumnetwork-dev/nano','nano']]
const CK={none:['LiTeer',''],notes:['Notes','\u{1F4D3}'],docs:['Documents','\u{1F4C4}'],classes:['Classes','\u{1F393}'],custom:['Custom','\u{1F4C1}']}
const THEMES=[['ember','Ember','Dark with warm black'],['midnight','Midnight','Dark with cool blue'],['light','Light','Bright and clean']]
const ACC={red:['#ff3d3d','#ff8a3d','#1a0404'],orange:['#ff8a1f','#ffc23d','#1e0f00'],violet:['#a78bfa','#f472b6','#120a2b'],cyan:['#22d3ee','#60a5fa','#021a20'],green:['#34d399','#a3e635','#032016']}
const SIZE={s:['Small',138],m:['Medium',168],l:['Large',210]}
const AVS=['user','flame','gamepad-2','zap','sparkles','star','shield','music']
const VIDEOS=[['YouTube','https://www.youtube.com/','circle-play','#ff0033'],['Twitch','https://www.twitch.tv/','tv','#9146ff'],['Vimeo','https://vimeo.com/','video','#1ab7ea'],['Dailymotion','https://www.dailymotion.com/','film','#0066dc'],['Odysee','https://odysee.com/','clapperboard','#ef1970'],['TED','https://www.ted.com/talks','message-circle','#e62b1e'],['Internet Archive','https://archive.org/details/movies','book-open','#4b5563']]
const APPS=[['Discord','https://discord.com/app','message-circle','#5865f2'],['Spotify','https://open.spotify.com/','music','#1db954'],['Reddit','https://www.reddit.com/','message-circle','#ff4500'],['Wikipedia','https://www.wikipedia.org/','book-open','#636466'],['GitHub','https://github.com/','link','#2f3640'],['X','https://x.com/','x','#111827'],['GeForce NOW','https://play.geforcenow.com/','monitor-play','#76b900'],['Chess.com','https://www.chess.com/play','gamepad-2','#7fa650'],['Google','https://www.google.com/','search','#4285f4'],['DuckDuckGo','https://duckduckgo.com/','shield','#de5833'],['Hacker News','https://news.ycombinator.com/','zap','#ff6600']]
const NAV=[['home','Home','house'],['games','Games','gamepad-2'],['videos','Videos','circle-play'],['apps','Apps','layout-grid'],['browser','Browser','globe','NEW'],['favs','Favorites','star']]
const PAGES=[['home','Home','house'],['games','Games','gamepad-2'],['videos','Videos','circle-play'],['apps','Apps','layout-grid'],['browser','Browser','globe'],['favs','Favorites','star'],['settings','Settings','settings'],['about','About','info']]
let HOST={},CFG={},DATA={games:[],meta:{libs:[]}},S={},favs=new Set(LS.get('favs',[])),recents=LS.get('recents',[]),marks=LS.get('marks',[]),custom=LS.get('custom',{videos:[],apps:[]})
let proxyOn=false,proxyP=Promise.resolve(),conn=null,ctl=null,cur=null,liveEngine='',activeWisp='',wstat={},fuse=null,pending=null
const set=(k,v)=>{S[k]=v;LS.set(k,v)}
const rm=()=>matchMedia('(prefers-reduced-motion:reduce)').matches
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),2800)}
function load(){S={wisp:LS.get('wisp',HOST.hosted?selfWisp():(CFG.wisp||'wss://anura.pro/')),transport:LS.get('transport',CFG.transport||'libcurl'),bare:LS.get('bare',CFG.bare||''),engine:LS.get('engine',CFG.engine||'uv'),bt:LS.get('bt','liteer'),pg:LS.get('pg',true),auto:LS.get('auto',true),extra:LS.get('extra',''),se:LS.get('se','ddg'),seCustom:LS.get('seCustom',''),cloak:LS.get('cloak','none'),cloakName:LS.get('cloakName',''),leave:LS.get('leave',false),pk:LS.get('pk','`'),pu:LS.get('pu','https://www.google.com'),uvv:LS.get('uvv',UVV[0]),sjv:LS.get('sjv',SJV[0]),fast:LS.get('fast',true),acc:LS.get('acc','red'),theme:LS.get('theme','ember'),size:LS.get('size','m'),fx:LS.get('fx',true),name:LS.get('name',''),av:LS.get('av','user'),min:LS.get('min',false)}
if(!UVV.includes(S.uvv))S.uvv=UVV[0];if(!SJV.includes(S.sjv))S.sjv=SJV[0];if(!ENG[S.engine])S.engine='uv';if(!TR[S.transport])S.transport='libcurl'}
const selfWisp=()=>(location.protocol==='https:'?'wss://':'ws://')+location.host+B+'wisp/'
const px=u=>__uv$config.prefix+__uv$config.encodeUrl(u)
const title=()=>CFG.title||'LiTeer'
function pill(state,msg){const p=$('#pill');p.className='pill '+state;p.querySelector('span').textContent=state==='on'?(S.engine==='sj'?'Scramjet on':'Ultraviolet on'):state==='busy'?'Connecting':state==='err'?'Proxy error':'Proxy off';p.title=msg||''}
function normWisp(v){v=(v||'').trim();if(!v)return '';if(!/^wss?:\/\//i.test(v))v='wss://'+v.replace(/^https?:\/\//i,'');return v}
function probe(u,ms){return new Promise(r=>{let ws;const t0=performance.now();const t=setTimeout(()=>{try{ws.close()}catch(e){}r(0)},ms||7000);try{ws=new WebSocket(u)}catch(e){clearTimeout(t);return r(0)}ws.onopen=()=>{clearTimeout(t);const d=Math.max(1,Math.round(performance.now()-t0));ws.close();r(d)};ws.onerror=()=>{clearTimeout(t);r(0)}})}
function wispList(){const seen=new Set();return [S.wisp,...(HOST.hosted?[selfWisp()]:[]),...(S.extra||'').split(/[\s,]+/).map(normWisp),...(CFG.wisps||[])].filter(w=>w&&!seen.has(w)&&seen.add(w))}
const firstUp=l=>new Promise(r=>{let n=l.length;if(!n)return r('');l.forEach(u=>probe(u,5000).then(ok=>{if(ok)r(u);else if(--n===0)r('')}))})
function fastest(l,max){return new Promise(res=>{if(!l.length)return res(null);let n=l.length,best=null,timer=0;const done=()=>{clearTimeout(timer);clearTimeout(hard);res(best)};const hard=setTimeout(done,max);l.forEach(w=>probe(w,max).then(ms=>{wstat[w]=ms;if(ms){if(!best||ms<best.ms)best={w,ms};if(!timer)timer=setTimeout(done,350)}if(--n===0)done()}))})}
let uvReady=null
function loadUV(){if(!uvReady)uvReady=loadScript(E+'uv/'+S.uvv+'/uv.bundle.js').then(()=>{const e=E+'uv/'+S.uvv+'/';window.__uv$config={prefix:B+'service/',encodeUrl:Ultraviolet.codec.xor.encode,decodeUrl:Ultraviolet.codec.xor.decode,handler:e+'uv.handler.js',client:e+'uv.client.js',bundle:e+'uv.bundle.js',config:B+'uv.config.js',sw:e+'uv.sw.js'}});return uvReady}
function verChanged(){toast('Reloading with the new version');setTimeout(()=>location.reload(),700)}
function loadScript(src){return new Promise((ok,bad)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=()=>bad(new Error('Could not load '+src));document.head.appendChild(s)})}
async function ensureEngine(){
if(ctl)return
await loadScript(E+'sj/'+S.sjv+'/scramjet.bundle.js')
const {ScramjetController}=window.$scramjetLoadController()
ctl=new ScramjetController({prefix:B+'sj/',files:{wasm:E+'sj/'+S.sjv+'/scramjet.wasm.wasm',all:E+'sj/'+S.sjv+'/scramjet.all.js',sync:E+'sj/'+S.sjv+'/scramjet.sync.js'}})
await ctl.init()
}
async function setupProxy(){
proxyOn=false;pill('busy');drawPx()
proxyP=(async()=>{
try{
if(!window.isSecureContext||!navigator.serviceWorker)throw new Error('The proxy needs https. This link is on plain http.')
if(S.transport==='bare'?!S.bare:!S.wisp)throw new Error('Add a server address in Settings.')
await loadUV()
const swu=new URL('sw.js?uv='+S.uvv+'&sj='+S.sjv,location.href).href
const reg=await navigator.serviceWorker.register(swu,{scope:'./'})
await navigator.serviceWorker.ready
for(let i=0;i<80;i++){const c=navigator.serviceWorker.controller;if(c&&c.scriptURL===swu&&c.state==='activated')break;await new Promise(r=>setTimeout(r,100));if(i===79&&!(reg.active&&reg.active.scriptURL===swu))throw new Error('The service worker did not start. Reload the page.')}
conn=conn||new BareMuxConnection(B+'baremux/worker.js')
let w=S.wisp
if(S.transport!=='bare'){
if(S.fast){const c=LS.get('best',null),l=wispList();if(c&&Date.now()-c.t<6e5&&l.includes(c.w)&&await probe(c.w,2500)){w=c.w;fastest(l,4000).then(x=>{if(x)LS.set('best',{w:x.w,t:Date.now()})})}else{const x=await fastest(l,4500);if(x){w=x.w;LS.set('best',{w:x.w,t:Date.now()})}}}
else if(S.auto&&!(await probe(w,4500))){const alt=await firstUp(wispList().filter(x=>x!==w));if(alt){w=alt;toast('That Wisp server was down. Using '+alt)}}
}
activeWisp=w
await conn.setTransport(new URL(TR[S.transport][1],location.href).href,S.transport==='bare'?[S.bare]:[{wisp:w}])
if(S.engine==='sj')await ensureEngine()
if(liveEngine&&liveEngine!==S.engine)resetBrowser()
liveEngine=S.engine
proxyOn=true;pill('on',S.transport==='bare'?S.bare:w)
}catch(e){pill('err',String(e.message||e))}
const m=$('#proxyMsg');m.textContent=proxyOn?'Proxy is ready':$('#pill').title;m.className='msg '+(proxyOn?'ok':'bad')
drawPx();engTag()
})()
return proxyP
}
async function mount(f,url,onurl){
await proxyP
if(!proxyOn)throw new Error('The proxy is not ready. Check Settings.')
if(S.engine==='sj'){
if(!f._sj){f._sj=ctl.createFrame(f);f._sj.addEventListener('urlchange',e=>{const u=e.url||(e.detail&&e.detail.url);if(u&&f._on)f._on(String(u))})}
f._on=onurl;f._sj.go(url)
}else{f._sj=null;f._on=null;f.src=px(url)}
}
function uvUrl(w){try{if(w.__uv$location&&w.__uv$location.href)return w.__uv$location.href}catch(e){}try{const p=w.location.pathname;if(p.startsWith(__uv$config.prefix))return __uv$config.decodeUrl(p.slice(__uv$config.prefix.length)+w.location.search+w.location.hash)}catch(e){}return ''}
function dd(id,opts,get,pick){
const el=$('#'+id)
const draw=()=>{const c=get();const o=typeof opts==='function'?opts():opts;el.innerHTML='<button type="button">'+esc((o.find(x=>x[0]===c)||o[0]||['',''])[1])+'</button><ul>'+o.map(x=>`<li data-v="${esc(x[0])}" class="${x[0]===c?'sel':''}">${esc(x[1])}</li>`).join('')+'</ul>'}
draw()
el.addEventListener('click',e=>{const li=e.target.closest('li');if(li){pick(li.dataset.v);el.classList.remove('open');draw()}else if(e.target.closest('button')){const was=el.classList.contains('open');$$('.dd.open').forEach(d=>d.classList.remove('open'));if(!was)el.classList.add('open')}})
return draw
}
function hue(s){let h=0;for(const c of s)h=(h*31+c.charCodeAt(0))%360;return h}
const bg=n=>{const h=hue(n);return `background:linear-gradient(135deg,hsl(${h} 50% 38%),hsl(${(h+50)%360} 55% 20%))`}
function thumb(g){return `<span class="th" style="${bg(g.n)}"><b style="font-size:15px">${esc(g.n.charAt(0).toUpperCase())}</b>${g.t?`<img loading="lazy" decoding="async" src="${esc(g.t)}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" onerror="this.remove()">`:''}</span>`}
function libName(g){const l=(DATA.meta.libs||[])[g.l];return l?l.name:''}
function card(g){const f=favs.has(g.p);return `<div class="cwrap"><button class="cart" data-play="${g.i}"><span class="art" style="${bg(g.n)}"><b>${esc(g.n.charAt(0).toUpperCase())}</b>${g.t?`<img loading="lazy" decoding="async" src="${esc(g.t)}" alt="" onerror="this.remove()">`:''}<span class="play">${ic('play')}</span></span><span class="nm">${esc(g.n)}</span><span class="sub">${esc(libName(g))}</span></button><button class="star ${f?'on':''}" data-fav="${g.i}" aria-label="${f?'Remove from favorites':'Add to favorites'}">${ic('star')}</button></div>`}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
let list=[],shown=0,flt={q:'',lib:'all',sort:'az',fav:false,letter:''}
function more(){const end=Math.min(list.length,shown+72);$('#gGrid').insertAdjacentHTML('beforeend',list.slice(shown,end).map(card).join(''));shown=end;$('#gMore').innerHTML=shown<list.length?'<button class="btn" id="loadMore">Show more</button>':'';const b=$('#loadMore');if(b&&moreIO)moreIO.observe(b)}
let moreIO=window.IntersectionObserver?new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting))more()},{rootMargin:'600px'}):null
function refilter(){
const q=flt.q.trim()
let l=q&&fuse?fuse.search(q).map(r=>r.item):DATA.games.slice()
if(flt.lib!=='all')l=l.filter(g=>String(g.l)===flt.lib)
if(flt.fav)l=l.filter(g=>favs.has(g.p))
if(flt.letter)l=l.filter(g=>{const c=g.n.charAt(0).toUpperCase();return flt.letter==='#'?!/[A-Z]/.test(c):c===flt.letter})
if(!q||flt.sort!=='az'){if(flt.sort==='az')l.sort((a,b)=>a.n.localeCompare(b.n));else if(flt.sort==='za')l.sort((a,b)=>b.n.localeCompare(a.n));else shuffle(l)}
list=l;shown=0;$('#gGrid').innerHTML='';more()
$('#gcount').textContent=l.length+' of '+DATA.games.length+' games'
$('#gEmpty').hidden=l.length>0
$$('#az button').forEach(b=>b.classList.toggle('on',b.dataset.l===flt.letter))
}
function drawAz(){$('#az').innerHTML=['#',...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map(l=>`<button data-l="${l}" aria-label="Games starting with ${l}">${l}</button>`).join('')}
function renderFavs(){const l=DATA.games.filter(g=>favs.has(g.p));$('#fGrid').innerHTML=l.map(card).join('');$('#fEmpty').hidden=l.length>0}
function drawPx(){const c=$('#pxCard');if(!c)return;const st=$('#pill').className.includes('on')?'Connected':$('#pill').className.includes('busy')?'Connecting':$('#pill').className.includes('err')?'Not working':'Off'
c.innerHTML=`<div class="stat"><span>Status</span><b>${st}</b></div><div class="stat"><span>Engine</span><b>${ENG[S.engine][0]}</b></div><div class="stat"><span>Transport</span><b>${TR[S.transport][0]}</b></div><div class="stat"><span>Server</span><b>${esc(S.transport==='bare'?(S.bare||'none'):(activeWisp||S.wisp).replace(/^wss?:\/\//,'').replace(/\/$/,''))}</b></div>`}
let feat=[]
function renderHome(){
const r=recents.map(p=>DATA.games.find(g=>g.p===p)).filter(Boolean).slice(0,10)
$('#recentBox').hidden=!r.length;$('#recent').innerHTML=r.map(card).join('')
if(!feat.length){const w=DATA.games.filter(g=>g.t);feat=shuffle((w.length>=12?w:DATA.games).slice()).slice(0,20)}
$('#featured').innerHTML=feat.map(card).join('')
const f=DATA.games.filter(g=>favs.has(g.p)).slice(0,5)
$('#favMini').innerHTML=f.length?`<div class="minilist">${f.map(g=>`<button data-play="${g.i}">${thumb(g)}<span>${esc(g.n)}</span></button>`).join('')}</div>`:'<p class="lead" style="margin:0">Star a game and it shows up here.</p>'
const tiles=[['games','Games','gamepad-2',DATA.games.length+' games from open libraries'],['videos','Videos','circle-play',VIDEOS.length+custom.videos.length+' sites to watch on'],['apps','Apps','layout-grid',APPS.length+custom.apps.length+' web apps'],['browser','Browser','globe','Open any site through the proxy']]
$('#tiles').innerHTML=tiles.map(t=>`<button class="tile" data-go="${t[0]}">${ic(t[2],'big')}<b>${t[1]}${ic('arrow-right')}</b><small>${esc(t[3])}</small></button>`).join('')
const n=S.name.trim();$('#greet').textContent=n?`Hey ${n}. Unblocked games, apps, and more.`:'Unblocked games, apps, and more.'
drawPx()
}
function toggleFav(g){favs.has(g.p)?favs.delete(g.p):favs.add(g.p);LS.set('favs',[...favs]);const f=favs.has(g.p);$$(`[data-fav="${g.i}"]`).forEach(b=>b.classList.toggle('on',f));if(!$('#v-favs').hidden&&$('#v-favs').classList.contains('on'))renderFavs();renderHome();if(cur&&cur.i===g.i)pfav()}
function pfav(){const f=favs.has(cur.p);$('#pFav').querySelector('span').textContent=f?'Starred':'Star';$('#pFav').classList.toggle('solid',f)}
async function play(g){
cur=g
recents=[g.p,...recents.filter(p=>p!==g.p)].slice(0,12);LS.set('recents',recents)
const u=new URL(g.p,document.baseURI).href
$('#pTitle').textContent=g.n;$('#pLib').textContent=libName(g)
const old=$('#pFrame'),f=old.cloneNode(false);old.replaceWith(f)
$('#pLoad').hidden=false
$('#player').hidden=false;document.body.style.overflow='hidden'
pfav()
const done=()=>{$('#pLoad').hidden=true};f.addEventListener('load',done,{once:true});setTimeout(done,9000)
if(S.pg){try{await mount(f,u,null)}catch(e){toast('Proxy is not ready. Opening the game directly.');f.src=u}}else f.src=u
}
function closePlayer(){const f=$('#pFrame');f.src='about:blank';$('#player').hidden=true;document.body.style.overflow='';cur=null}
/* browser */
let tabs=[],act=null,tid=0
function normalize(v){v=v.trim();if(!v)return '';if(/^[a-z][a-z0-9+.-]*:\/\//i.test(v))return v;if(!/\s/.test(v)&&/^[^\s/]+\.[a-z]{2,}(:\d+)?([/?#].*)?$/i.test(v))return 'https://'+v;const t=S.se==='custom'?S.seCustom:SE[S.se][1];return (t||SE.ddg[1]).replace('%s',encodeURIComponent(v))}
const host=u=>{try{return new URL(u).hostname}catch(e){return u}}
function engTag(){$('#engTag').textContent=S.engine==='sj'?'SJ':'UV';$('#engTag').title=ENG[S.engine][0]}
function newTab(url){
const f=document.createElement('iframe')
f.setAttribute('allow','fullscreen; autoplay; clipboard-read; clipboard-write')
$('#frames').appendChild(f)
const t={id:++tid,title:'New tab',url:'',f}
f.addEventListener('load',()=>{try{const w=f.contentWindow;let r=f._sj?t.url:uvUrl(w);if(r){t.url=r}let h='';try{h=w.document.title}catch(e){}if(r)t.title=h||host(r)}catch(e){}tabsDraw();if(act===t.id){$('#addr').value=t.url;markDraw()}if(!t._ask&&/\.user\.js(\?|#|$)/i.test(t.url)){t._ask=1;if(confirm('Install this userscript?\n'+t.url))installUrl(t.url).then(()=>toast('Userscript installed'))}})
watch(t)
tabs.push(t);swtab(t.id)
if(url)navTo(t,url)
}
async function navTo(t,v){
const u=normalize(v);if(!u)return
t.url=u;t.title=host(u);swtab(t.id)
try{await mount(t.f,u,r=>{t.url=r;if(act===t.id)$('#addr').value=r;markDraw()})}catch(e){toast(String(e.message||e));return}
}
function swtab(id){act=id;const t=tabs.find(x=>x.id===id);tabs.forEach(x=>x.f.classList.toggle('on',x.id===id&&!!x.url));$('#start').classList.toggle('on',!t.url);$('#addr').value=t.url;tabsDraw();markDraw()}
function closeTab(id){const i=tabs.findIndex(x=>x.id===id);if(i<0)return;tabs[i].f.remove();tabs.splice(i,1);if(!tabs.length)newTab();else if(act===id)swtab(tabs[Math.max(0,i-1)].id);else tabsDraw()}
function resetBrowser(){tabs.forEach(t=>t.f.remove());tabs=[];act=null;if($('#v-browser').classList.contains('on'))newTab();toast('Switched to '+ENG[S.engine][0])}
function tabsDraw(){$('#btabs').innerHTML=tabs.map(t=>`<div class="tab ${t.id===act?'on':''}" data-tab="${t.id}">${ic('globe')}<span>${esc(t.title)}</span><button data-close="${t.id}" aria-label="Close tab">${ic('x')}</button></div>`).join('')+`<button data-newtab="1" aria-label="New tab">${ic('plus')}</button>`}
const curTab=()=>tabs.find(x=>x.id===act)
function markDraw(){
$('#marks').innerHTML=marks.length?marks.map((m,i)=>`<button data-open="${esc(m.u)}" data-mark="${i}" title="Right click to remove">${ic('bookmark')}${esc(m.t)}</button>`).join(''):'<span style="color:var(--mute);font-size:13px">Click the bookmark button to save a site here.</span>'
const t=curTab();$('#bMark').classList.toggle('on',!!(t&&marks.some(m=>m.u===t.url)))
}
function startHtml(on){
const sc=[...VIDEOS.slice(0,3),...APPS.slice(0,5)],b=BT[S.bt]||BT.liteer
const brand=S.bt==='liteer'||!BT[S.bt]?`<div class="brandbig">${ic('flame','flame')}<span class="wm"><i>Li</i><b>Teer</b></span></div>`:`<div class="brandtxt">${esc(b[0])}</div>`
return `<div class="start ${on?'on':''}" id="start">${brand}<form id="startForm" class="bigsearch">${ic('search')}<input id="sq" type="search" placeholder="${esc(b[3])}" autocomplete="off"><button class="go" aria-label="Go">${ic('arrow-right')}</button></form><div class="grid sc">${sc.map(scCard).join('')}</div></div>`
}
function startPage(){$('#frames').innerHTML=startHtml(true)}
function applyBT(){
$('#v-browser').dataset.bt=BT[S.bt]?S.bt:'liteer'
const st=$('#start');if(st)st.outerHTML=startHtml(st.classList.contains('on'))
}
function btDraw(){
$('#btypes').innerHTML=Object.entries(BT).map(([k,v])=>`<button type="button" class="btype" data-bt="${k}" aria-pressed="${S.bt===k}"><i class="bti bt-${k}"></i><b>${esc(v[0])}</b><small>${esc(v[1])}</small></button>`).join('')
}
function pickBT(k){set('bt',k);set('se',BT[k][2]);ddSEdraw&&ddSEdraw();applyBT();btDraw();vis()}
async function sitesDraw(){
let live=[];if(HOST.hosted){try{const r=await fetch('api/hub/proxies',{cache:'no-store'});if(r.ok)live=await r.json()}catch(e){}}
$('#siteList').innerHTML=SITES.map(s=>{const l=live.find(x=>x.id===s[2]);return `<div class="extrow"><span class="ico">${ic('server')}</span><div class="tx"><b>${esc(s[0])}</b><small><a href="https://github.com/${s[1]}" target="_blank" rel="noopener noreferrer">${s[1]}</a> — ${l?'Running':HOST.hosted?'Not running':'Hosted from LiTeer.exe'}</small></div>${l?`<a class="btn solid" href="${esc(l.public||l.url)}" target="_blank" rel="noopener noreferrer">Open</a>`:''}</div>`}).join('')
}
function openUrl(u){go('browser');const t=curTab();if(t&&!t.url)navTo(t,u);else newTab(u)}
/* shortcuts */
function scCard(s,rmKey){return `<button class="sct" data-open="${esc(s[1])}"><span class="ico" style="background:${s[3]}">${ic(s[2])}</span><span><b>${esc(s[0])}</b><small>${esc(host(s[1]))}</small></span>${rmKey?`<span class="rm" data-rmsc="${rmKey}" title="Remove" role="button">${ic('x')}</span>`:''}</button>`}
function drawSc(kind){
const base=kind==='videos'?VIDEOS:APPS,own=custom[kind]||[]
const c=hue2=>`hsl(${hue2} 55% 38%)`
$('#'+(kind==='videos'?'vGrid':'aGrid')).innerHTML=base.map(s=>scCard(s)).join('')+own.map((s,i)=>scCard([s.n,s.u,'globe',c(hue(s.n))],kind+':'+i)).join('')+`<button class="sct add" data-addsc="${kind}">${ic('plus')}Add a site</button>`
}
function addScForm(kind){
const g=$('#'+(kind==='videos'?'vGrid':'aGrid'));if(g.previousElementSibling&&g.previousElementSibling.classList.contains('addform'))return g.previousElementSibling.querySelector('input').focus()
const f=document.createElement('form');f.className='addform';f.innerHTML=`<input type="text" placeholder="Name" maxlength="30" required><input type="text" placeholder="Address, like example.com" spellcheck="false" required><button class="btn solid">Add</button><button type="button" class="btn" data-cancel="1">Cancel</button>`
f.addEventListener('submit',e=>{e.preventDefault();const [n,u]=[...f.querySelectorAll('input')].map(x=>x.value.trim());if(!n||!u)return;custom[kind].push({n,u:/^[a-z]+:\/\//i.test(u)?u:'https://'+u});LS.set('custom',custom);f.remove();drawSc(kind);renderHome()})
f.querySelector('[data-cancel]').addEventListener('click',()=>f.remove())
g.before(f);f.querySelector('input').focus()
}
/* navigation */
function go(v){
if(!$('#v-'+v))v='home'
$$('.view').forEach(e=>e.classList.toggle('on',e.id==='v-'+v))
$$('#nav .navb,#mnav .navb').forEach(b=>b.classList.toggle('on',b.dataset.go===v))
if(location.hash!=='#'+v)history.replaceState(null,'','#'+v)
if(v==='browser'&&!tabs.length)newTab()
if(v==='favs')renderFavs()
if(v==='home')renderHome()
const m=$('#main');if(m)m.scrollTop=0;scrollTo(0,0)
$('#proMenu').hidden=true
}
function navDraw(){const h=NAV.map(n=>`<button class="navb" data-go="${n[0]}">${ic(n[2])}<span>${n[1]}</span>${n[3]?`<span class="new">${n[3]}</span>`:''}</button>`).join('');$('#nav').innerHTML=h;$('#mnav').innerHTML=NAV.filter(n=>n[0]!=='favs').map(n=>`<button class="navb" data-go="${n[0]}">${ic(n[2])}<span>${n[1]}</span></button>`).join('')+`<button class="navb" data-go="settings">${ic('settings')}<span>Settings</span></button>`}
function applyLook(){
const r=document.documentElement,a=ACC[S.acc]||ACC.red
r.dataset.theme=THEMES.some(t=>t[0]===S.theme)?S.theme:'ember'
r.style.setProperty('--acc',a[0]);r.style.setProperty('--acc2',a[1]);r.style.setProperty('--accink',a[2])
r.style.setProperty('--cw',(SIZE[S.size]||SIZE.m)[1]+'px')
r.classList.toggle('min',!!S.min)
$('#themeBtn').innerHTML=ic(S.theme==='light'?'moon':'sun')
$$('#swatches button').forEach(b=>b.classList.toggle('on',b.dataset.acc===S.acc))
$('#proBtn').innerHTML=ic(S.av)
$$('#avs button').forEach(b=>b.classList.toggle('on',b.dataset.av===S.av))
}
function applyCloak(){const c=CK[S.cloak]||CK.none;document.title=S.cloak==='none'?title():S.cloak==='custom'?(S.cloakName||'Notes'):c[0]
$('link[rel=icon]').href=S.cloak==='none'?'data:image/svg+xml,'+encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='#ff3d3d' d='M12 2c1 4 5 6 5 11a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-10z'/></svg>"):'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${c[1]}</text></svg>`)}
function segs(){
const mk=(id,items,get,pick)=>{const el=$('#'+id);const d=()=>{el.innerHTML=items.map(i=>`<button type="button" data-v="${i[0]}" aria-pressed="${get()===i[0]}"><b>${esc(i[1])}</b><span>${esc(i[2])}</span></button>`).join('')};d();el.addEventListener('click',e=>{const b=e.target.closest('button');if(b){pick(b.dataset.v);d()}});return d}
return {eng:mk('segEng',Object.entries(ENG).map(([k,v])=>[k,v[0],v[1]]),()=>S.engine,v=>{set('engine',v);vis()}),
tr:mk('segTr',Object.entries(TR).map(([k,v])=>[k,v[0],v[2]]),()=>S.transport,v=>{set('transport',v);vis()}),
theme:mk('segTheme',THEMES,()=>S.theme,v=>{set('theme',v);applyLook()}),
size:mk('segSize',Object.entries(SIZE).map(([k,v])=>[k,v[0],'']),()=>S.size,v=>{set('size',v);applyLook()})}
}
let sg,ddSEdraw
function drawWisps(){$('#wlist').innerHTML=wispList().map(w=>{const s=wstat[w];return `<button type="button" class="wl ${w===S.wisp?'on':''}" data-wisp="${esc(w)}"><i class="led ${s===undefined?'':s?'ok':'bad'}"></i><span>${esc(w.replace(/^wss?:\/\//,''))}${HOST.hosted&&w===selfWisp()?' (this site)':''}</span><small>${s?s+' ms':s===0?'down':''}</small></button>`}).join('')}
function vis(){$('#bareBox').hidden=S.transport!=='bare';$('#sWisp').closest('.fld').hidden=S.transport==='bare';$('#wlist').hidden=S.transport==='bare';$('#sExtra').closest('.fld').hidden=S.transport==='bare';$('#seBox').hidden=S.se!=='custom';$('#ctBox').hidden=S.cloak!=='custom';sg.eng();sg.tr()}
function applyProxy(){set('wisp',normWisp($('#sWisp').value)||S.wisp);set('extra',$('#sExtra').value);set('bare',$('#sBare').value.trim());$('#sWisp').value=S.wisp;drawWisps();return setupProxy()}
function fillSettings(){$('#sWisp').value=S.wisp;$('#sBare').value=S.bare;$('#sPG').checked=S.pg;$('#sAuto').checked=S.auto;$('#sFast').checked=S.fast;$('#sExtra').value=S.extra;$('#sSE').value=S.seCustom;$('#sCT').value=S.cloakName;$('#sLeave').checked=S.leave;$('#sPK').value=S.pk;$('#sPU').value=S.pu;$('#sFx').checked=S.fx;$('#pName').value=S.name;drawWisps();vis();btDraw()}
function showSp(k){$$('#setnav button').forEach(b=>b.classList.toggle('on',b.dataset.sp===k));$$('#v-settings .sp').forEach(s=>s.classList.toggle('on',s.id==='sp-'+k))}
/* command palette */
let cres=[],csel=0
function cmdItems(){
const it=[]
PAGES.forEach(p=>it.push({t:p[1],k:'page '+p[0],ic:p[2],tag:'Page',run:()=>go(p[0])}))
it.push({t:'Use Ultraviolet',k:'engine switch ultraviolet uv',ic:'zap',tag:'Engine',run:()=>{set('engine','uv');fillSettings();setupProxy();toast('Switching to Ultraviolet')}})
it.push({t:'Use Scramjet',k:'engine switch scramjet sj',ic:'zap',tag:'Engine',run:()=>{set('engine','sj');fillSettings();setupProxy();toast('Switching to Scramjet')}})
it.push({t:'Change theme',k:'theme dark light',ic:'palette',tag:'Action',run:()=>cycleTheme()})
VIDEOS.concat(APPS).forEach(s=>it.push({t:s[0],k:s[0]+' '+host(s[1]),ic:s[2],col:s[3],tag:'Site',run:()=>openUrl(s[1])}))
;[...custom.videos,...custom.apps].forEach(s=>it.push({t:s.n,k:s.n+' '+host(s.u),ic:'globe',tag:'Site',run:()=>openUrl(s.u)}))
return it
}
let cfuse=null
function cmdOpen(){$('#cmd').hidden=false;$('#cmdq').value='';cfuse=new Fuse(cmdItems(),{keys:['t','k'],threshold:.3});cmdDraw('');$('#cmdq').focus()}
function cmdClose(){$('#cmd').hidden=true}
function cmdDraw(q){
q=q.trim()
let r=[]
if(q){r=cfuse.search(q,{limit:5}).map(x=>x.item);const gs=fuse?fuse.search(q,{limit:8}).map(x=>x.item):[];gs.forEach(g=>r.push({t:g.n,g,ic:'gamepad-2',tag:libName(g)||'Game',run:()=>play(g)}))
r=r.slice(0,10)
const isUrl=!/\s/.test(q)&&/^([a-z]+:\/\/)?[^\s/]+\.[a-z]{2,}/i.test(q)
r.push({t:isUrl?'Open '+q:'Search the web for "'+q+'"',ic:isUrl?'globe':'search',tag:'Browser',run:()=>openUrl(q)})}
else{r=cmdItems().slice(0,8);recents.map(p=>DATA.games.find(g=>g.p===p)).filter(Boolean).slice(0,3).forEach(g=>r.push({t:g.n,g,ic:'clock',tag:'Recent',run:()=>play(g)}))}
cres=r;csel=0;cmdPaint()
}
function cmdPaint(){$('#cmdres').innerHTML=cres.map((r,i)=>`<button class="cr ${i===csel?'on':''}" data-ci="${i}">${r.g?thumb(r.g):`<span class="th"${r.col?` style="background:${r.col}"`:''}>${ic(r.ic)}</span>`}<b>${esc(r.t)}</b><small>${esc(r.tag)}</small></button>`).join('')||'<p class="empty">Nothing matches.</p>';const s=$('#cmdres .cr.on');if(s)s.scrollIntoView({block:'nearest'})}
function cmdRun(i){const r=cres[i];if(!r)return;cmdClose();r.run()}
function cycleTheme(){const i=THEMES.findIndex(t=>t[0]===S.theme);set('theme',THEMES[(i+1)%THEMES.length][0]);applyLook();sg.theme()}
/* userscripts */
const US_BUILTIN=[{"id":"dark","name":"Dark pages","ver":"1.0","desc":"Turns bright sites dark.","m":["*://*/*"],"x":[],"runAt":"document-start","code":"GM_addStyle(\"html{filter:invert(.92) hue-rotate(180deg)!important;background:#fff!important}img,video,canvas,picture,svg image,iframe,[style*=\\\"background-image\\\"]{filter:invert(1) hue-rotate(180deg)!important}\");\n","builtin":true},{"id":"ads","name":"Ad cleaner","ver":"1.0","desc":"Hides common ad boxes and banners.","m":["*://*/*"],"x":[],"runAt":"document-start","code":"GM_addStyle(\"ins.adsbygoogle,[id^=\\\"google_ads\\\"],[id*=\\\"ad-slot\\\"],[class*=\\\"ad-slot\\\"],[class~=\\\"ad\\\"],[class*=\\\"advert\\\"],[id*=\\\"advert\\\"],[class*=\\\"sponsored\\\"],iframe[src*=\\\"doubleclick\\\"],iframe[src*=\\\"googlesyndication\\\"],iframe[src*=\\\"adservice\\\"],a[href*=\\\"doubleclick.net\\\"]{display:none!important}\");\n","builtin":true},{"id":"cookies","name":"Cookie banner hider","ver":"1.0","desc":"Hides cookie consent pop-ups.","m":["*://*/*"],"x":[],"runAt":"document-start","code":"GM_addStyle(\"[class*=\\\"cookie-banner\\\" i],[id*=\\\"cookie-banner\\\" i],[class*=\\\"cookie-consent\\\" i],[id*=\\\"cookie-consent\\\" i],[class*=\\\"cookiebanner\\\" i],#onetrust-banner-sdk,#onetrust-consent-sdk,.cc-window,.fc-consent-root,#CybotCookiebotDialog{display:none!important}\");\n","builtin":true},{"id":"copy","name":"Unlock page","ver":"1.0","desc":"Lets you right-click, select and copy on sites that block it.","m":["*://*/*"],"x":[],"runAt":"document-start","code":"GM_addStyle(\"*{-webkit-user-select:text!important;user-select:text!important}\");\n['contextmenu','copy','cut','selectstart','dragstart'].forEach(n=>{addEventListener(n,e=>e.stopImmediatePropagation(),true);document.addEventListener(n,e=>e.stopImmediatePropagation(),true)});document.oncontextmenu=null;if(document.body){document.body.oncontextmenu=null;document.body.onselectstart=null;document.body.oncopy=null}","builtin":true},{"id":"speed","name":"Video speed","ver":"1.0","desc":"Press ] to speed up a video, [ to slow it down, and \\ to reset.","m":["*://*/*"],"x":[],"runAt":"document-end","code":"let t;const show=v=>{clearTimeout(t);let d=document.getElementById('lt-speed');if(!d){d=document.createElement('div');d.id='lt-speed';d.style.cssText='position:fixed;top:14px;right:14px;z-index:2147483647;background:#000c;color:#fff;font:600 14px system-ui;padding:6px 10px;border-radius:8px';document.body.appendChild(d)}d.textContent=v+'x';t=setTimeout(()=>d.remove(),900)};addEventListener('keydown',e=>{const g=e.target||{};if(/INPUT|TEXTAREA/.test(g.tagName)||g.isContentEditable)return;const v=document.querySelector('video');if(!v)return;if(e.key===']')v.playbackRate=Math.min(16,+(v.playbackRate+.25).toFixed(2));else if(e.key==='[')v.playbackRate=Math.max(.25,+(v.playbackRate-.25).toFixed(2));else if(e.key==='\\\\')v.playbackRate=1;else return;show(v.playbackRate)},true)","builtin":true}]
const PH={'document-start':0,'document-body':1,'document-end':2,'document-idle':3}
let userExt=LS.get('us',[]).filter(x=>x&&x.code),extOn=LS.get('extOn',{})
const extAll=()=>[...US_BUILTIN,...userExt].map(x=>({...x,on:!!extOn[x.id]}))
function globRx(p){return new RegExp('^'+p.replace(/[.+?^${}()|[\]\\]/g,'\\$&').replace(/\*/g,'.*')+'$','i')}
function patRx(p){
p=String(p).trim();if(!p)return null
if(p==='<all_urls>'||p==='*')return /^https?:\/\//i
if(p.length>2&&p[0]==='/'&&p[p.length-1]==='/'){try{return new RegExp(p.slice(1,-1),'i')}catch(e){return null}}
const m=p.match(/^(\*|https?):\/\/([^/]*)(\/.*)?$/)
if(!m)return globRx(p)
const esc2=s=>s.replace(/[.+?^${}()|[\]\\]/g,'\\$&')
const sch=m[1]==='*'?'https?':m[1],h=m[2]==='*'?'[^/]+':m[2].startsWith('*.')?'(?:[^/]+\\.)?'+esc2(m[2].slice(2)):esc2(m[2])
return new RegExp('^'+sch+':\\/\\/'+h+esc2(m[3]||'/').replace(/\*/g,'.*')+'$','i')
}
const compiled=new WeakMap()
function gx(x){let c=compiled.get(x);if(!c){c={m:(x.m||[]).map(patRx).filter(Boolean),x:(x.x||[]).map(patRx).filter(Boolean)};compiled.set(x,c)}return c}
function parseUS(txt){
const h=txt.match(/\/\/\s*==UserScript==([\s\S]*?)\/\/\s*==\/UserScript==/),meta={}
if(h)h[1].split('\n').forEach(l=>{const m=l.match(/^\s*\/\/\s*@(\S+)(?:[ \t]+(.*?))?\s*$/);if(m)(meta[m[1]]=meta[m[1]]||[]).push(m[2]||'')})
const m=[...(meta.match||[]),...(meta.include||[])],ra=(meta['run-at']||['document-end'])[0].replace(/^@/,'')
return {name:String((meta.name||['Untitled script'])[0]).slice(0,60),ver:(meta.version||[''])[0],desc:String((meta.description||[''])[0]).slice(0,160),ns:(meta.namespace||[''])[0],m:m.length?m:['*://*/*'],x:[...(meta.exclude||[]),...(meta['exclude-match']||[])],runAt:PH[ra]!==undefined?ra:'document-end',req:meta.require||[],code:txt,hasHeader:!!h}
}
async function textOf(url){
try{const r=await fetch(url);if(r.ok)return await r.text()}catch(e){}
if(window.__uv$config){const r=await fetch(px(url));if(r.ok)return await r.text()}
throw new Error('Could not download '+url)
}
async function addUS(txt,src,id){
const p=parseUS(txt);if(!p.hasHeader&&!id)p.name=p.name==='Untitled script'?'New script':p.name
const req=[];for(const u of p.req){try{req.push(await textOf(new URL(u,src||location.href).href))}catch(e){toast('Skipped @require '+u)}}
delete p.hasHeader
const x={...p,reqText:req,src:src||'',id:id||'u'+Date.now().toString(36)+Math.floor(Math.random()*999)}
const i=userExt.findIndex(u=>u.id===x.id);if(i>=0)userExt[i]=x;else userExt.push(x)
if(extOn[x.id]===undefined)extOn[x.id]=true
LS.set('us',userExt);LS.set('extOn',extOn);extDraw();return x
}
const pageUrl=(t,w)=>{if(t.f._sj)return t.url;const u=uvUrl(w);return u||''}
function gmApi(x,t,w,d,href){
const k='lt.gm.'+x.id+'.',ls=localStorage
const getValue=(n,dv)=>{const v=ls.getItem(k+n);if(v===null)return dv;try{return JSON.parse(v)}catch(e){return dv}}
const setValue=(n,v)=>{if(v===undefined)ls.removeItem(k+n);else ls.setItem(k+n,JSON.stringify(v))}
const deleteValue=n=>ls.removeItem(k+n)
const listValues=()=>Object.keys(ls).filter(a=>a.startsWith(k)).map(a=>a.slice(k.length))
const addStyle=css=>{const s=d.createElement('style');s.setAttribute('data-liteer',x.id);s.textContent=css;(d.head||d.documentElement).appendChild(s);return s}
const xhr=det=>gmXhr(det,href)
const info={script:{name:x.name,version:x.ver,description:x.desc,namespace:x.ns||'',matches:x.m,'run-at':x.runAt},scriptHandler:'LiTeer',version:'1.0'}
const api={getValue,setValue,deleteValue,listValues,addStyle,xmlhttpRequest:xhr,info,
log:(...a)=>console.log('['+x.name+']',...a),
setClipboard:s=>{try{navigator.clipboard.writeText(String(s))}catch(e){}},
openInTab:u=>{openUrl(new URL(u,href).href)},
notification:o=>toast(typeof o==='string'?o:(o&&(o.text||o.title))||''),
registerMenuCommand:(name,fn)=>{(t._cmds=t._cmds||[]).push({x:x.id,name:String(name),fn});extDraw()},
getResourceText:()=>'',getResourceURL:()=>''}
api.GM={getValue:async(n,dv)=>getValue(n,dv),setValue:async(n,v)=>setValue(n,v),deleteValue:async n=>deleteValue(n),listValues:async()=>listValues(),addStyle:async c=>addStyle(c),xmlHttpRequest:xhr,setClipboard:async s=>api.setClipboard(s),openInTab:u=>api.openInTab(u),notification:api.notification,registerMenuCommand:api.registerMenuCommand,info}
return api
}
function gmXhr(det,href){
const url=new URL(det.url,href).href,ac=new AbortController(),method=(det.method||'GET').toUpperCase()
const init={method,headers:det.headers||{},signal:ac.signal,redirect:det.redirect||'follow'}
if(det.data!=null&&method!=='GET'&&method!=='HEAD')init.body=det.data
let to;if(det.timeout)to=setTimeout(()=>{ac.abort();det.ontimeout&&det.ontimeout({})},det.timeout)
const u=window.__uv$config?px(url):url
fetch(u,init).then(async r=>{
const rt=det.responseType||'text',res={status:r.status,statusText:r.statusText,finalUrl:r.url||url,readyState:4,responseHeaders:[...r.headers.entries()].map(a=>a[0]+': '+a[1]).join('\r\n')}
if(rt==='arraybuffer')res.response=await r.arrayBuffer();else if(rt==='blob')res.response=await r.blob();else{res.responseText=await r.text();res.response=rt==='json'?JSON.parse(res.responseText):res.responseText}
clearTimeout(to);det.onload&&det.onload(res);det.onloadend&&det.onloadend(res)
}).catch(e=>{clearTimeout(to);if(e.name==='AbortError')return;const res={error:String(e.message||e),status:0,readyState:4};det.onerror&&det.onerror(res);det.onloadend&&det.onloadend(res)})
return {abort:()=>{clearTimeout(to);ac.abort();det.onabort&&det.onabort({})}}
}
const ran=new WeakMap()
function runOne(t,x,w,d,href){
const key='__lt$'+x.id.replace(/\W/g,'_')
try{w[key]=gmApi(x,t,w,d,href)}catch(e){return}
const names='GM GM_info GM_getValue GM_setValue GM_deleteValue GM_listValues GM_addStyle GM_xmlhttpRequest GM_log GM_setClipboard GM_openInTab GM_notification GM_registerMenuCommand GM_getResourceText GM_getResourceURL'.split(' ')
const map={GM:'GM',GM_info:'info',GM_getValue:'getValue',GM_setValue:'setValue',GM_deleteValue:'deleteValue',GM_listValues:'listValues',GM_addStyle:'addStyle',GM_xmlhttpRequest:'xmlhttpRequest',GM_log:'log',GM_setClipboard:'setClipboard',GM_openInTab:'openInTab',GM_notification:'notification',GM_registerMenuCommand:'registerMenuCommand',GM_getResourceText:'getResourceText',GM_getResourceURL:'getResourceURL'}
const pre='var A=window['+JSON.stringify(key)+'];'+names.map(n=>'var '+n+'=A.'+map[n]+';').join('')+'var unsafeWindow=window;'
const src='(function(){'+pre+'try{\n'+(x.reqText||[]).join('\n;\n')+'\n'+x.code+'\n}catch(e){console.error('+JSON.stringify('[LiTeer '+x.name+']')+',e)}})();'
const el=d.createElement('script');el.textContent=src;(d.head||d.documentElement).appendChild(el);el.remove()
}
function runUS(t,w,d,href){
let s=ran.get(d);if(!s){s=new Set();ran.set(d,s)}
const cur=d.readyState==='loading'?(d.body?1:0):d.readyState==='interactive'?2:3,u=href.split('#')[0]
for(const x of extAll()){
if(!x.on||s.has(x.id)||PH[x.runAt]>cur)continue
const c=gx(x);if(!c.m.some(r=>r.test(u))||c.x.some(r=>r.test(u)))continue
s.add(x.id);try{runOne(t,x,w,d,href)}catch(e){}
}
}
function watch(t){
if(t._wt)return
t._wt=setInterval(()=>{
if(!tabs.includes(t)){clearInterval(t._wt);return}
let w,d;try{w=t.f.contentWindow;d=w&&w.document}catch(e){return}
if(!d||!d.documentElement)return
if(d!==t._doc){const h=pageUrl(t,w);if(!/^https?:/i.test(h))return;t._doc=d;t._cmds=[];extDraw()}
const h=pageUrl(t,w);if(/^https?:/i.test(h))runUS(t,w,d,h)
},25)
}
function extOff(id){tabs.forEach(t=>{try{t.f.contentWindow.document.querySelectorAll('style[data-liteer="'+id+'"]').forEach(n=>n.remove())}catch(e){}})}
function extToggle(id,on){extOn[id]=on;LS.set('extOn',extOn);if(!on)extOff(id);else{const t=curTab();if(t){t._doc=null}}extDraw()}
function extRow(x,menu){return `<div class="extrow"><span class="ico">${ic('puzzle')}</span><div class="tx"><b>${esc(x.name)}</b><small>${menu?'':esc((x.builtin?'Built in':'Userscript')+(x.ver?' · v'+x.ver:'')+' · '+x.runAt.replace('document-','runs at ')+' — ')}${esc(x.desc||(x.m||[]).join(' '))}</small></div><label class="sw"><input type="checkbox" data-ext="${esc(x.id)}" ${x.on?'checked':''}><span></span></label>${!menu&&!x.builtin?`<button class="xr" data-xed="${esc(x.id)}" aria-label="Edit ${esc(x.name)}">${ic('pencil')}</button><button class="xr" data-xrm="${esc(x.id)}" aria-label="Remove ${esc(x.name)}">${ic('trash-2')}</button>`:''}</div>`}
function extDraw(){
const l=extAll(),t=curTab()
$('#extList').innerHTML=l.map(x=>extRow(x)).join('')
const cmds=(t&&t._cmds)||[]
$('#extMenu').innerHTML=l.map(x=>extRow(x,true)).join('')+cmds.map((c,i)=>`<button class="more" data-cmd="${i}">${esc(c.name)}</button>`).join('')+'<button class="more" data-go="settings" data-sp2="ext">Manage userscripts</button>'
$('#bExt').classList.toggle('on',l.some(x=>x.on))
}
const US_TPL=`// ==UserScript==
// @name         My script
// @description  What it does
// @match        https://*.example.com/*
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle('body { outline: 3px solid tomato; }');
`
let editing=''
function editUS(id){const x=userExt.find(u=>u.id===id);editing=x?x.id:'';$('#xCode').value=x?x.code:US_TPL;$('#xSave').textContent=x?'Save changes':'Add script';$('#xCode').focus()}
async function saveUS(){
const m=$('#extMsg'),txt=$('#xCode').value;if(!txt.trim()){m.className='msg bad';m.textContent='Write or paste a script first';return}
try{const x=await addUS(txt,'',editing||undefined);editing='';$('#xSave').textContent='Add script';m.className='msg ok';m.textContent='Saved '+x.name+'. It runs on the next page you open.'}catch(e){m.className='msg bad';m.textContent=String(e.message||e)}
}
async function installUrl(u){
const m=$('#extMsg');m.className='msg';m.textContent='Downloading...'
try{const txt=await textOf(u),x=await addUS(txt,u);m.className='msg ok';m.textContent='Installed '+x.name}catch(e){m.className='msg bad';m.textContent=String(e.message||e)}
}
async function importExt(file){
const m=$('#extMsg');m.className='msg';m.textContent='Adding...'
try{const txt=await file.text();if(/\.css$/i.test(file.name)){const x=await addUS('// ==UserScript==\n// @name '+file.name.replace(/\.css$/i,'')+'\n// @match *://*/*\n// @run-at document-start\n// ==/UserScript==\nGM_addStyle('+JSON.stringify(txt)+');');m.textContent='Added '+x.name}else{const x=await addUS(txt);m.textContent='Added '+x.name}m.className='msg ok'}catch(e){m.className='msg bad';m.textContent=String(e.message||e)}
}
/* libraries */
const lhd={'X-LT':'1','content-type':'application/json'}
async function libApi(p,b){const r=await fetch(p,{method:'POST',headers:lhd,body:JSON.stringify(b)});return r.json()}
function libsDraw(){
const ml=DATA.meta.libs||[],libs=HOST.libs||ml.map(l=>({name:l.name,url:l.url,custom:false}))
$('#libList').innerHTML=libs.map(l=>{const c=(ml.find(x=>x.url===l.url)||{}).count;return `<div class="src"><a href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(l.name)}</a><span>${c!=null?c+' games':''}${HOST.admin&&l.custom?` <button class="btn" data-rmlib="${esc(l.url)}">Remove</button>`:''}</span></div>`}).join('')||'<div class="src"><span>No libraries listed.</span></div>'
$('#libAdmin').hidden=!HOST.admin
$('#libNote').textContent=HOST.admin?'Add a GitHub or GitLab address. The site rebuilds in the background and this page reloads when it is ready.':HOST.hosted?'Libraries can only be added from the PC that runs LiTeer. Open this hub there at http://127.0.0.1 and use this page.':'This hub runs on a static host. Add libraries in the LiTeer app on the Game hub tab, or host the hub from LiTeer.exe and open it on that PC.'
}
async function libWait(){const m=$('#libMsg');for(;;){await new Promise(r=>setTimeout(r,1500));try{const s=await (await fetch('api/hub/status',{headers:{'X-LT':'1'},cache:'no-store'})).json();m.className='msg';m.textContent=s.msg||'';if(!s.building){if(/ready/i.test(s.msg||'')){m.className='msg ok';setTimeout(()=>location.reload(),900)}else m.className='msg bad';return}}catch(e){}}}
async function libAdd(){const u=$('#newLib').value.trim(),m=$('#libMsg');if(!u)return;m.className='msg';m.textContent='Adding...';try{const r=await libApi('api/hub/addlib',{url:u});if(!r.ok){m.className='msg bad';m.textContent=r.error||'Could not add that';return}$('#newLib').value='';libWait()}catch(e){m.className='msg bad';m.textContent='Could not reach the server'}}
/* embers */
function embers(){
const c=$('#embers'),x=c.getContext('2d');let W=0,H=0,P=[],raf=0
const size=()=>{const r=c.parentElement.getBoundingClientRect();W=c.width=Math.max(1,r.width);H=c.height=Math.max(1,r.height)}
const mk=()=>({x:Math.random()*W,y:H+Math.random()*30,r:Math.random()*2+.6,v:Math.random()*.5+.25,dx:(Math.random()-.5)*.35,a:Math.random()*.6+.3})
const col=()=>getComputedStyle(document.documentElement).getPropertyValue('--acc').trim()||'#ff3d3d'
const tick=()=>{raf=0;if(document.hidden||!S.fx||rm()||!$('#v-home').classList.contains('on')){x.clearRect(0,0,W,H);return}
x.clearRect(0,0,W,H);const k=col();x.fillStyle=k
while(P.length<Math.min(46,W/22))P.push(mk())
P.forEach((p,i)=>{p.y-=p.v;p.x+=p.dx+Math.sin((p.y+i)/40)*.2;if(p.y<-6||p.x<-6||p.x>W+6){Object.assign(p,mk())}x.globalAlpha=p.a*Math.max(0,p.y/H);x.beginPath();x.arc(p.x,p.y,p.r,0,6.3);x.fill()})
x.globalAlpha=1;raf=requestAnimationFrame(tick)}
const kick=()=>{if(!raf)raf=requestAnimationFrame(tick)}
size();addEventListener('resize',size);document.addEventListener('visibilitychange',kick)
new MutationObserver(kick).observe($('#v-home'),{attributes:true,attributeFilter:['class']})
$('#sFx').addEventListener('change',e=>{set('fx',e.target.checked);kick()})
kick()
}
function exportData(){const b=new Blob([JSON.stringify(LS.all())],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='liteer-data.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),4000)}
function importData(f){const r=new FileReader();r.onload=()=>{try{const o=JSON.parse(r.result);Object.entries(o).forEach(([k,v])=>{if(k.startsWith('hub.')&&typeof v==='string')localStorage.setItem(k,v)});toast('Imported. Reloading...');setTimeout(()=>location.reload(),700)}catch(e){toast('That file could not be read')}};r.readAsText(f)}
function about(){
$('#aboutText').textContent=title()+' is a game hub with a built-in proxy browser. '+DATA.games.length+' games from open-source libraries run through your own proxy. You can switch between Ultraviolet and Scramjet in Settings.'
$('#sources').innerHTML=(DATA.meta.libs||[]).map(l=>`<div class="src"><a href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(l.name)}</a><span>${l.count} games</span></div>`).join('')||'<div class="src"><span>No sources listed.</span></div>'
const L=(n,u,d)=>`<div class="src"><a href="${u}" target="_blank" rel="noopener noreferrer">${n}</a><span>${d}</span></div>`
$('#credits').innerHTML='<div class="src"><b>Made By DeadByte/Ethan</b><span>LiTeer</span></div>'+L('Ultraviolet','https://github.com/titaniumnetwork-dev/Ultraviolet','Proxy engine')+L('Scramjet','https://github.com/MercuryWorkshop/scramjet','Proxy engine')+L('bare-mux','https://github.com/MercuryWorkshop/bare-mux','Transport switcher')+L('libcurl.js','https://github.com/ading2210/libcurl.js','Transport')+L('epoxy-tls','https://github.com/MercuryWorkshop/epoxy-tls','Transport')+L('Wisp','https://github.com/MercuryWorkshop/wisp-protocol','Server protocol')+L('Lucide','https://lucide.dev','Icons, ISC license')+L('Fuse.js','https://www.fusejs.io','Fuzzy search, Apache-2.0')+SITES.map(x=>L(x[0],'https://github.com/'+x[1],'Proxy project, run as its own site by LiTeer.exe')).join('')+'<p class="hint">The proxy sites are the real upstream projects, installed from their own repositories. Most are AGPL-3.0, so keep their license if you change or share them.</p>'
}
function init(){
navDraw();embers();sg=segs()
$$('.wm').forEach(()=>0)
dd('ddLib',()=>[['all','All libraries'],...(DATA.meta.libs||[]).map((l,i)=>[String(i),l.name])],()=>flt.lib,v=>{flt.lib=v;refilter()})
dd('ddSort',[['az','A to Z'],['za','Z to A'],['rand','Shuffle']],()=>flt.sort,v=>{flt.sort=v;refilter()})
dd('ddUV',UVV.map(v=>[v,v+(v===UVV[0]?' (latest)':'')]),()=>S.uvv,v=>{if(v!==S.uvv){set('uvv',v);verChanged()}})
dd('ddSJ',SJV.map(v=>[v,v+(v===SJV[0]?' (latest)':'')]),()=>S.sjv,v=>{if(v!==S.sjv){set('sjv',v);verChanged()}})
ddSEdraw=dd('ddSE',Object.entries(SE).map(([k,v])=>[k,v[0]]),()=>S.se,v=>{set('se',v);vis()})
dd('ddCloak',Object.entries(CK).map(([k,v])=>[k,k==='none'?'No disguise':v[0]]),()=>S.cloak,v=>{set('cloak',v);vis();applyCloak()})
$('#swatches').innerHTML=Object.entries(ACC).map(([k,v])=>`<button data-acc="${k}" style="background:linear-gradient(135deg,${v[0]},${v[1]})" aria-label="${k}"></button>`).join('')
$('#avs').innerHTML=AVS.map(a=>`<button data-av="${a}" aria-label="${a}">${ic(a)}</button>`).join('')
fuse=new Fuse(DATA.games,{keys:['n'],threshold:.34,ignoreLocation:true})
fillSettings();applyLook();applyCloak();drawAz();extDraw();applyBT();sitesDraw();libsDraw();drawSc('videos');drawSc('apps');about();startPage();engTag()
$('#gq').addEventListener('input',e=>{flt.q=e.target.value;refilter()})
$('#hSearch').addEventListener('submit',e=>{e.preventDefault();const q=$('#hq').value.trim();if(!q)return;$('#hq').value='';cmdOpen();$('#cmdq').value=q;cmdDraw(q)})
$('#favOnly').addEventListener('click',e=>{flt.fav=!flt.fav;e.currentTarget.setAttribute('aria-pressed',flt.fav);refilter()})
$('#shuf').addEventListener('click',()=>{if(DATA.games.length)play(DATA.games[Math.floor(Math.random()*DATA.games.length)])})
$('#az').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;flt.letter=flt.letter===b.dataset.l?'':b.dataset.l;refilter()})
$('#fPrev').addEventListener('click',()=>$('#featured').scrollBy({left:-460,behavior:'smooth'}))
$('#fNext').addEventListener('click',()=>$('#featured').scrollBy({left:460,behavior:'smooth'}))
$('#sideBtn').addEventListener('click',()=>{set('min',!S.min);applyLook()})
$('#themeBtn').addEventListener('click',cycleTheme)
$('#cmdBtn').addEventListener('click',cmdOpen)
$('#proBtn').addEventListener('click',e=>{e.stopPropagation();const m=$('#proMenu');m.hidden=!m.hidden})
$('#proMenu').addEventListener('click',e=>{e.stopPropagation();const b=e.target.closest('[data-av]');if(b){set('av',b.dataset.av);applyLook()}})
$('#pName').addEventListener('input',e=>{set('name',e.target.value);renderHome()})
document.addEventListener('click',e=>{if(!e.target.closest('.dd'))$$('.dd.open').forEach(d=>d.classList.remove('open'));if(!e.target.closest('.pro')){$('#proMenu').hidden=true;$('#extMenu').hidden=true}if(e.target.id==='cmd')cmdClose()})
$('#cmdq').addEventListener('input',e=>cmdDraw(e.target.value))
$('#cmdq').addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();csel=Math.min(cres.length-1,csel+1);cmdPaint()}else if(e.key==='ArrowUp'){e.preventDefault();csel=Math.max(0,csel-1);cmdPaint()}else if(e.key==='Enter'){e.preventDefault();cmdRun(csel)}})
$('#cmdres').addEventListener('click',e=>{const b=e.target.closest('[data-ci]');if(b)cmdRun(+b.dataset.ci)})
$('#pClose').addEventListener('click',closePlayer)
$('#pFav').addEventListener('click',()=>cur&&toggleFav(cur))
$('#pReload').addEventListener('click',()=>{const f=$('#pFrame');if(f._sj)f._sj.reload();else{try{f.contentWindow.location.reload()}catch(e){f.src=f.src}}})
$('#pFull').addEventListener('click',()=>{const f=$('#pFrame');(f.requestFullscreen||f.webkitRequestFullscreen||(()=>{})).call(f)})
$('#setnav').addEventListener('click',e=>{const b=e.target.closest('[data-sp]');if(b)showSp(b.dataset.sp)})
$('#btypes').addEventListener('click',e=>{const b=e.target.closest('[data-bt]');if(b)pickBT(b.dataset.bt)})
$('#setnav').addEventListener('click',e=>{if(e.target.closest('[data-sp=sites]'))sitesDraw()})
$('#wlist').addEventListener('click',e=>{const b=e.target.closest('[data-wisp]');if(b){set('wisp',b.dataset.wisp);set('fast',false);$('#sFast').checked=false;$('#sWisp').value=S.wisp;drawWisps()}})
$('#applyProxy').addEventListener('click',applyProxy)
$('#testAll').addEventListener('click',async()=>{const m=$('#proxyMsg');m.className='msg';m.textContent='Checking...';const l=wispList();await Promise.all(l.map(async w=>{wstat[w]=await probe(w,6000);drawWisps()}));const n=l.filter(w=>wstat[w]).length;m.className='msg '+(n?'ok':'bad');m.textContent=n+' of '+l.length+' servers answered'})
$('#sPG').addEventListener('change',e=>set('pg',e.target.checked))
$('#sAuto').addEventListener('change',e=>set('auto',e.target.checked))
$('#sFast').addEventListener('change',e=>set('fast',e.target.checked))
$('#sExtra').addEventListener('change',e=>{set('extra',e.target.value);drawWisps()})
$('#sSE').addEventListener('change',e=>set('seCustom',e.target.value.trim()))
$('#sCT').addEventListener('input',e=>{set('cloakName',e.target.value);applyCloak()})
$('#sLeave').addEventListener('change',e=>set('leave',e.target.checked))
$('#sPK').addEventListener('input',e=>set('pk',e.target.value))
$('#sPU').addEventListener('change',e=>set('pu',e.target.value.trim()))
$('#swatches').addEventListener('click',e=>{const b=e.target.closest('button');if(b){set('acc',b.dataset.acc);applyLook()}})
$('#blank').addEventListener('click',()=>{const w=window.open('about:blank','_blank');if(!w){toast('Allow pop-ups to use this');return}w.document.title=document.title;w.document.body.style.margin='0';const f=w.document.createElement('iframe');f.src=location.href;f.style.cssText='position:fixed;inset:0;width:100%;height:100%;border:0';w.document.body.appendChild(f)})
$('#exp').addEventListener('click',exportData)
$('#extFile').addEventListener('change',async e=>{const f=e.target.files[0];e.target.value='';if(f)importExt(f)})
$('#xSave').addEventListener('click',saveUS)
$('#xNew').addEventListener('click',()=>editUS(''))
$('#xUrlGo').addEventListener('click',()=>{const u=$('#xUrl').value.trim();if(/^https?:\/\//i.test(u)){installUrl(u);$('#xUrl').value=''}else{$('#extMsg').className='msg bad';$('#extMsg').textContent='Paste a full http or https address'}})
$('#bExt').addEventListener('click',e=>{e.stopPropagation();const m=$('#extMenu');m.hidden=!m.hidden})
$('#extMenu').addEventListener('click',e=>{e.stopPropagation();const cm=e.target.closest('[data-cmd]');if(cm){const t=curTab(),c=t&&t._cmds&&t._cmds[+cm.dataset.cmd];$('#extMenu').hidden=true;try{c&&c.fn()}catch(x){}return}const g=e.target.closest('[data-go]');if(g){$('#extMenu').hidden=true;go('settings');showSp('ext')}})
document.addEventListener('change',e=>{const x=e.target.closest&&e.target.closest('[data-ext]');if(x)extToggle(x.dataset.ext,x.checked)})
$('#extList').addEventListener('click',e=>{const ed=e.target.closest('[data-xed]');if(ed)return editUS(ed.dataset.xed);const b=e.target.closest('[data-xrm]');if(!b)return;const id=b.dataset.xrm;extOff(id);userExt=userExt.filter(x=>x.id!==id);delete extOn[id];LS.set('us',userExt);LS.set('extOn',extOn);extDraw()})
$('#libAdd').addEventListener('click',libAdd)
$('#libList').addEventListener('click',async e=>{const b=e.target.closest('[data-rmlib]');if(!b)return;const r=await libApi('api/hub/removelib',{url:b.dataset.rmlib});if(r.ok){$('#libMsg').className='msg';$('#libMsg').textContent='Rebuilding the site';libWait()}})
$('#impFile').addEventListener('change',e=>{if(e.target.files[0])importData(e.target.files[0])})
$('#reset').addEventListener('click',()=>{if(!confirm('Reset favorites, shortcuts, bookmarks and settings?'))return;LS.wipe();location.reload()})
$('#omni').addEventListener('submit',e=>{e.preventDefault();const t=curTab();if(t)navTo(t,$('#addr').value)})
const nav=a=>{const t=curTab();if(!t||!t.url)return;if(t.f._sj&&S.engine==='sj')t.f._sj[a]();else{try{a==='reload'?t.f.contentWindow.location.reload():t.f.contentWindow.history[a==='back'?'back':'forward']()}catch(e){}}}
$('#bBack').addEventListener('click',()=>nav('back'))
$('#bFwd').addEventListener('click',()=>nav('forward'))
$('#bReload').addEventListener('click',()=>nav('reload'))
$('#bHome').addEventListener('click',()=>{const t=curTab();if(t){t.url='';t.title='New tab';t.f.removeAttribute('src');t.f.classList.remove('on');t.f._sj=null;swtab(t.id)}})
$('#bMark').addEventListener('click',()=>{const t=curTab();if(!t||!t.url)return;const i=marks.findIndex(m=>m.u===t.url);if(i>=0)marks.splice(i,1);else marks.push({u:t.url,t:t.title.slice(0,24)});LS.set('marks',marks);markDraw()})
$('#bFull').addEventListener('click',()=>$('#frames').classList.toggle('full'))
$('#marks').addEventListener('contextmenu',e=>{const b=e.target.closest('[data-mark]');if(b){e.preventDefault();marks.splice(+b.dataset.mark,1);LS.set('marks',marks);markDraw()}})
$('#frames').addEventListener('submit',e=>{if(e.target.id==='startForm'){e.preventDefault();const v=$('#sq').value;const t=curTab();if(t&&v.trim())navTo(t,v)}})
document.addEventListener('click',e=>{
const g=e.target.closest('[data-go]');if(g){e.preventDefault();return go(g.dataset.go)}
const p=e.target.closest('[data-play]');if(p)return play(DATA.games[+p.dataset.play])
const f=e.target.closest('[data-fav]');if(f)return toggleFav(DATA.games[+f.dataset.fav])
if(e.target.id==='loadMore')return more()
const r=e.target.closest('[data-rmsc]');if(r){e.stopPropagation();const [k,i]=r.dataset.rmsc.split(':');custom[k].splice(+i,1);LS.set('custom',custom);drawSc(k);renderHome();return}
const a=e.target.closest('[data-addsc]');if(a)return addScForm(a.dataset.addsc)
const o=e.target.closest('[data-open]');if(o)return openUrl(o.dataset.open)
const c=e.target.closest('[data-close]');if(c){e.stopPropagation();return closeTab(+c.dataset.close)}
if(e.target.closest('[data-newtab]'))return newTab()
const tb=e.target.closest('[data-tab]');if(tb)swtab(+tb.dataset.tab)
})
document.addEventListener('keydown',e=>{
const tag=document.activeElement&&document.activeElement.tagName,typing=tag==='INPUT'||tag==='TEXTAREA'
if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#cmd').hidden?cmdOpen():cmdClose();return}
if(e.key==='Escape'){$$('.dd.open').forEach(d=>d.classList.remove('open'));if(!$('#cmd').hidden)return cmdClose();if(!$('#player').hidden)return closePlayer();$('#frames').classList.remove('full');$('#proMenu').hidden=true;return}
if(e.altKey&&$('#v-browser').classList.contains('on')){const k=e.key.toLowerCase();if(k==='t'){e.preventDefault();newTab()}else if(k==='w'){e.preventDefault();if(act)closeTab(act)}else if(k==='l'){e.preventDefault();$('#addr').focus();$('#addr').select()}}
if(typing)return
if(S.pk&&e.key===S.pk){(window.top||window).location.replace(S.pu||'https://www.google.com');return}
if(e.key==='/'){e.preventDefault();cmdOpen()}
})
window.addEventListener('beforeunload',e=>{if(S.leave){e.preventDefault();e.returnValue=''}})
window.addEventListener('hashchange',()=>{const v=location.hash.slice(1);if($('#v-'+v))go(v)})
showSp('proxy')
}
async function boot(){
try{CFG=await (await fetch('config.json',{cache:'no-store'})).json()}catch(e){}
try{DATA=await (await fetch('games.json',{cache:'no-store'})).json()}catch(e){}
try{const r=await fetch('api/hub',{headers:{'X-LT':'1'},cache:'no-store'});if(r.ok&&(r.headers.get('content-type')||'').includes('json'))HOST=await r.json()}catch(e){}
DATA.games.forEach((g,i)=>g.i=i)
load();init();refilter();renderHome()
const v=location.hash.slice(1)
go($('#v-'+v)?v:'home')
setupProxy()
}
boot()
