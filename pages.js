
const PAPI="https://query.wikidata.org/sparql",WAPI="https://www.wikidata.org/w/api.php",COMMONS="https://commons.wikimedia.org/w/api.php",IA="https://archive.org/advancedsearch.php";
const esc=s=>String(s??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;");
const val=(o,k)=>o?.[k]?.value||"";
const fmt=n=>n==null||n===""?"—":Number(n).toLocaleString("en-US",{maximumFractionDigits:2});
async function qjson(q){
 const r=await fetch(PAPI+"?format=json&query="+encodeURIComponent(q),{headers:{Accept:"application/sparql-results+json"}});
 if(!r.ok)throw Error("SPARQL "+r.status);
 return(await r.json()).results?.bindings||[];
}
async function json(u){const r=await fetch(u);if(!r.ok)throw Error("HTTP "+r.status);return r.json()}
function lastByDate(rows,key){
 const m=new Map();
 rows.forEach(r=>{const id=val(r,"iso")||val(r,"country");const date=val(r,"date")||"";const old=m.get(id);if(!old||date>old.date)m.set(id,{value:val(r,key),date})});
 return m;
}
async function geoCountries(){
 const g=await json("world.geojson?cb=20260926");
 return(g.features||[]).map((f,i)=>({iso:String(f.properties?.iso||f.properties?.ISO_A2||"").toUpperCase(),name:f.properties?.name||f.properties?.NAME||"Country "+(i+1),feature:f})).filter(x=>x.iso&&x.iso!=="-99");
}
async function countryDataset(){
 const geo=await geoCountries(),isos=[...new Set(geo.map(x=>x.iso))],vv=isos.map(x=>'"'+x+'"').join(" ");
 const [base,pop,gdp,gdppc,hdi,extra]=await Promise.all([
  qjson('SELECT ?iso ?countryLabel ?area WHERE { VALUES ?iso {'+vv+'} ?country wdt:P297 ?iso. OPTIONAL{?country wdt:P2046 ?area.} SERVICE wikibase:label{bd:serviceParam wikibase:language "hy,en,ru".}}'),
  qjson('SELECT ?iso ?population ?date WHERE { VALUES ?iso {'+vv+'} ?country wdt:P297 ?iso. ?country p:P1082 ?s. ?s ps:P1082 ?population. OPTIONAL{?s pq:P585 ?date.}}'),
  qjson('SELECT ?iso ?gdp ?date WHERE { VALUES ?iso {'+vv+'} ?country wdt:P297 ?iso. ?country p:P2131 ?s. ?s ps:P2131 ?gdp. OPTIONAL{?s pq:P585 ?date.}}'),
  qjson('SELECT ?iso ?gdppc ?date WHERE { VALUES ?iso {'+vv+'} ?country wdt:P297 ?iso. ?country p:P2132 ?s. ?s ps:P2132 ?gdppc. OPTIONAL{?s pq:P585 ?date.}}'),
  qjson('SELECT ?iso ?hdi ?date WHERE { VALUES ?iso {'+vv+'} ?country wdt:P297 ?iso. ?country p:P1081 ?s. ?s ps:P1081 ?hdi. OPTIONAL{?s pq:P585 ?date.}}'),
  qjson('SELECT ?iso ?capitalLabel ?currencyLabel ?governmentLabel ?continentLabel ?life ?unemployment WHERE { VALUES ?iso {'+vv+'} ?country wdt:P297 ?iso. OPTIONAL{?country wdt:P36 ?capital.} OPTIONAL{?country wdt:P38 ?currency.} OPTIONAL{?country wdt:P122 ?government.} OPTIONAL{?country wdt:P30 ?continent.} OPTIONAL{?country wdt:P2250 ?life.} OPTIONAL{?country wdt:P1198 ?unemployment.} SERVICE wikibase:label{bd:serviceParam wikibase:language "hy,en,ru".}}')
 ]);
 const pm=lastByDate(pop,"population"),gm=lastByDate(gdp,"gdp"),pcm=lastByDate(gdppc,"gdppc"),hm=lastByDate(hdi,"hdi"),ex=new Map();
 extra.forEach(r=>{const iso=val(r,"iso");if(!ex.has(iso))ex.set(iso,{});const e=ex.get(iso);["capitalLabel","currencyLabel","governmentLabel","continentLabel","life","unemployment"].forEach(k=>{if(!e[k]&&val(r,k))e[k]=val(r,k)})});
 const m=new Map();
 base.forEach(r=>{const iso=val(r,"iso");if(!m.has(iso))m.set(iso,{iso,name:val(r,"countryLabel")||iso,area:Number(val(r,"area"))||0})});
 return{geo,rows:[...m.values()].map(r=>{const p=pm.get(r.iso),g=gm.get(r.iso),pc=pcm.get(r.iso),h=hm.get(r.iso);return Object.assign(r,{pop:p?.value||"",popDate:p?.date||"",gdp:g?.value||"",gdpDate:g?.date||"",gdppc:pc?.value||"",gdppcDate:pc?.date||"",hdi:h?.value||"",hdiDate:h?.date||""},ex.get(r.iso)||{})})};
}
async function initCountries(){
 const root=document.querySelector("#countries-page");if(!root)return;
 const list=document.querySelector("#country-list"),search=document.querySelector("#country-search"),panel=document.querySelector("#country-detail");
 try{
  const state=await countryDataset(),rows=state.rows.sort((a,b)=>b.area-a.area);
  const rank=new Map(rows.map((r,i)=>[r.iso,i]));
  document.querySelector("#country-count").textContent=rows.length;
  document.querySelector("#largest-country").textContent=rows[0]?.name||"—";
  document.querySelector("#largest-area").textContent=rows[0]?.area?fmt(rows[0].area)+" km²":"—";
  const mapEl=document.querySelector("#countries-map");
  if(typeof L!=="undefined"&&mapEl){
   const map=L.map(mapEl,{worldCopyJump:true,minZoom:1,maxZoom:8}).setView([20,0],2);
   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap contributors"}).addTo(map);
   const max=Math.max(...rows.map(r=>r.area),1);
   L.geoJSON(state.geo.map(x=>x.feature),{
    style:f=>{const iso=String(f.properties?.iso||f.properties?.ISO_A2||"").toUpperCase(),r=rows.find(x=>x.iso===iso),a=r?.area||0;return{color:"#fff",weight:1,fillColor:"#8d251d",fillOpacity:.16+.64*(a/max)}},
    onEachFeature:(f,l)=>{const iso=String(f.properties?.iso||f.properties?.ISO_A2||"").toUpperCase(),r=rows.find(x=>x.iso===iso);if(r){l.bindTooltip(r.name+" · "+fmt(r.area)+" km²",{sticky:true});l.on("click",()=>showCountry(r.iso,state,l))}}
   }).addTo(map);window.__countriesMap=map;window.__countriesState=state;
  }
  function render(){
   const term=(search?.value||"").toLowerCase().trim();
   const view=rows.filter(r=>(r.name+" "+r.iso).toLowerCase().includes(term));
   list.innerHTML=view.map(r=>'<tr><td>'+String(rank.get(r.iso)+1)+'</td><td><button type="button" data-iso="'+esc(r.iso)+'">'+esc(r.name)+'</button><div style="font-size:8px;color:#988f87">'+esc(r.iso)+'</div></td><td>'+fmt(r.area)+' km²</td><td>'+esc(r.gdp?fmt(r.gdp):"—")+'</td><td>'+esc(r.hdi||"—")+'</td></tr>').join("")||'<tr><td colspan="5"><div class="empty-state">Պետություն չգտնվեց։</div></td></tr>';
   list.querySelectorAll("[data-iso]").forEach(b=>b.addEventListener("click",()=>showCountry(b.dataset.iso,state)));
  }
  window.showCountry=showCountry;search?.addEventListener("input",render);render();
 }catch(e){console.error(e);list.innerHTML='<tr><td colspan="5"><div class="empty-state">Data sources are temporarily unavailable.</div></td></tr>'}
}
async function showCountry(iso,state){
 const panel=document.querySelector("#country-detail"),r=state.rows.find(x=>x.iso===iso);if(!panel||!r)return;
 panel.innerHTML='<div class="loading">Opening '+esc(r.name)+'…</div>';
 let rows=[];try{rows=await qjson('SELECT ?languageLabel ?capitalLabel ?currencyLabel ?governmentLabel ?continentLabel ?timezoneLabel WHERE {?country wdt:P297 "'+iso+'". OPTIONAL{?country wdt:P37 ?language.} OPTIONAL{?country wdt:P36 ?capital.} OPTIONAL{?country wdt:P38 ?currency.} OPTIONAL{?country wdt:P122 ?government.} OPTIONAL{?country wdt:P30 ?continent.} OPTIONAL{?country wdt:P421 ?timezone.} SERVICE wikibase:label{bd:serviceParam wikibase:language "hy,en,ru".}} LIMIT 100')}catch(_){}
 const unique=k=>[...new Set(rows.map(x=>val(x,k)).filter(Boolean))];
 const langs=unique("languageLabel"),caps=unique("capitalLabel"),curr=unique("currencyLabel"),gov=unique("governmentLabel"),cont=unique("continentLabel"),tz=unique("timezoneLabel");
 const facts=[["Area",r.area?fmt(r.area)+" km²":"—"],["Population",r.pop?fmt(r.pop):"—"],["GDP",r.gdp?fmt(r.gdp)+" USD":"—"],["GDP per capita",r.gdppc?fmt(r.gdppc)+" USD":"—"],["HDI",r.hdi||"—"],["Life expectancy",r.life?r.life+" տարի":"—"],["Unemployment",r.unemployment?r.unemployment+"%":"—"],["Capital",caps.join(", ")||r.capitalLabel||"—"],["Currency",curr.join(", ")||r.currencyLabel||"—"],["Government",gov.join(", ")||r.governmentLabel||"—"],["Continent",cont.join(", ")||r.continentLabel||"—"],["Time zone",tz.join(", ")||"—"]];
 panel.innerHTML='<div class="eyebrow">COUNTRY PROFILE · '+esc(r.iso)+'</div><h3>'+esc(r.name)+'</h3><div class="country-fact-grid">'+facts.map(x=>'<div class="country-fact"><span>'+esc(x[0])+'</span><strong>'+esc(x[1])+'</strong></div>').join("")+'</div><div class="mini-info"><p><b>Data dates:</b> Population '+esc(r.popDate||"—")+' · GDP '+esc(r.gdpDate||"—")+' · HDI '+esc(r.hdiDate||"—")+'</p><div class="tag-row">'+langs.slice(0,20).map(x=>'<span class="tag">'+esc(x)+'</span>').join("")+'</div><p style="margin-top:12px">GDP-ն և հարակից տնտեսական տվյալները կարող են ունենալ World Bank-ի սկզբնաղբյուր, իսկ HDI-ն՝ UNDP Human Development Reports-ի։</p></div>';
}
async function wbSearch(term,lang){
 const u=WAPI+"?action=wbsearchentities&search="+encodeURIComponent(term)+"&language="+lang+"&uselang="+lang+"&type=item&limit=30&format=json&origin=*";
 return(await json(u)).search||[];
}
function yearText(s){const m=String(s||"").match(new RegExp("[-+](\\d+)"));if(!m)return "";const y=Number(m[1]);return y<0?"մ.թ.ա. "+Math.abs(y):"մ.թ. "+y}
async function initPeoples(){
 const list=document.querySelector("#people-results"),search=document.querySelector("#people-search"),detail=document.querySelector("#people-detail");if(!list)return;
 const base=await qjson('SELECT ?people ?peopleLabel (COUNT(DISTINCT ?country) AS ?count) WHERE {?country wdt:P172 ?people. SERVICE wikibase:label{bd:serviceParam wikibase:language "hy,en,ru".}} GROUP BY ?people ?peopleLabel ORDER BY DESC(?count) LIMIT 300').catch(()=>[]);
 const all=base.map(r=>({id:val(r,"people").split("/").pop(),label:val(r,"peopleLabel"),count:Number(val(r,"count"))||0}));
 const render=async term=>{
  list.innerHTML='<div class="loading">Searching peoples…</div>';
  const results=term?await wbSearch(term,"hy").catch(()=>[]):all;
  list.innerHTML=results.map((r,i)=>'<div class="rank-item"><div class="rank-no">'+String(i+1).padStart(2,"0")+'</div><div><h3>'+esc(r.label||r.id)+'</h3><p>'+(r.count?esc(r.count)+" պետության գրառում":"Wikidata search result")+'</p></div><div class="rank-metric"><button class="action-btn ghost" data-qid="'+esc(r.id)+'">Բացել</button></div></div>').join("")||'<div class="empty-state">No people found.</div>';
  list.querySelectorAll("[data-qid]").forEach(b=>b.addEventListener("click",async()=>{detail.innerHTML='<div class="loading">Collecting records…</div>';try{const rows=await qjson('SELECT ?countryLabel ?start ?end ?point ?sourceLabel WHERE {?country p:P172 ?st. ?st ps:P172 wd:'+b.dataset.qid+'. OPTIONAL{?st pq:P580 ?start.} OPTIONAL{?st pq:P582 ?end.} OPTIONAL{?st pq:P585 ?point.} OPTIONAL{?st prov:wasDerivedFrom ?ref. OPTIONAL{?ref pr:P248 ?source. ?source rdfs:label ?sourceLabel. FILTER(LANG(?sourceLabel)="en")}} SERVICE wikibase:label{bd:serviceParam wikibase:language "hy,en,ru".}} LIMIT 300');const name=results.find(x=>x.id===b.dataset.qid)?.label||b.dataset.qid;const groups=new Map();rows.forEach(r=>{const c=val(r,"countryLabel");if(!groups.has(c))groups.set(c,[]);const p=[yearText(val(r,"start")),yearText(val(r,"end")),yearText(val(r,"point"))].filter(Boolean);groups.get(c).push((p.length?p.join(" — "):"Date not recorded")+(val(r,"sourceLabel")?" · source: "+val(r,"sourceLabel"):""))});detail.innerHTML='<h3>'+esc(name)+'</h3><p>This page shows available P172 structured links and their temporal/source qualifiers.</p>'+[...groups.entries()].map(([c,ps])=>'<div class="data-card" style="margin-top:8px"><h3>'+esc(c)+'</h3><p>'+ps.join("<br>")+'</p></div>').join("")}catch(e){detail.innerHTML='<div class="empty-state">Details could not be loaded.</div>'}}));
 };
 search?.addEventListener("input",()=>render(search.value.trim()));render("");
}
async function initLanguages(){
 const list=document.querySelector("#language-results"),search=document.querySelector("#language-search"),detail=document.querySelector("#language-detail");if(!list)return;
 const base=await qjson('SELECT ?language ?languageLabel (COUNT(DISTINCT ?country) AS ?count) WHERE {?country wdt:P37 ?language. SERVICE wikibase:label{bd:serviceParam wikibase:language "hy,en,ru".}} GROUP BY ?language ?languageLabel ORDER BY DESC(?count) LIMIT 350').catch(()=>[]);
 const all=base.map(r=>({id:val(r,"language").split("/").pop(),label:val(r,"languageLabel"),count:Number(val(r,"count"))||0}));
 document.querySelector("#language-total").textContent=String(all.length);
 const render=term=>{const view=all.filter(x=>(x.label+" "+x.id).toLowerCase().includes((term||"").toLowerCase()));list.innerHTML=view.map((r,i)=>'<div class="rank-item"><div class="rank-no">'+String(i+1).padStart(2,"0")+'</div><div><h3>'+esc(r.label)+'</h3><p>'+r.count+' official-language country records</p></div><div class="rank-metric"><button class="action-btn ghost" data-qid="'+esc(r.id)+'">Բացել</button></div></div>').join("")||'<div class="empty-state">No language found.</div>';list.querySelectorAll("[data-qid]").forEach(b=>b.addEventListener("click",async()=>{detail.innerHTML='<div class="loading">Opening լեզուն…</div>';const rows=await qjson('SELECT ?countryLabel WHERE {?country wdt:P37 wd:'+b.dataset.qid+'. SERVICE wikibase:label{bd:serviceParam wikibase:language "hy,en,ru".}}').catch(()=>[]);detail.innerHTML='<h3>'+esc(view.find(x=>x.id===b.dataset.qid)?.label||b.dataset.qid)+'</h3><p>This language is listed as an official language in these countries.</p><div class="tag-row">'+rows.map(x=>'<span class="tag">'+esc(val(x,"countryLabel"))+'</span>').join("")+'</div>'}))};
 search?.addEventListener("input",()=>render(search.value));render("");
}
async function commonsSearch(term,video){
 const q=(term||"history")+(video?" filetype:video":"");
 const u=COMMONS+"?action=query&generator=search&gsrsearch="+encodeURIComponent(q)+"&gsrnamespace=6&gsrlimit=24&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=640&format=json&origin=*";
 const j=await json(u);return Object.values(j.query?.pages||{});
}
async function initMedia(video){
 const grid=document.querySelector("#media-results"),search=document.querySelector("#media-search"),btn=document.querySelector("#media-btn");if(!grid)return;
 const run=async()=>{grid.innerHTML='<div class="loading">Searching Wikimedia Commons…</div>';try{const pages=await commonsSearch(search.value.trim(),video);grid.innerHTML=pages.map(p=>{const ii=p.imageinfo?.[0]||{},raw=ii.extmetadata?.ImageDescription?.value||"",desc=raw.replaceAll("&lt;"," ").replaceAll("&gt;"," ").slice(0,180),thumb=ii.thumburl||ii.url||"",title=p.title.replace("File:",""),url="https://commons.wikimedia.org/wiki/"+encodeURIComponent(p.title.replaceAll(" ","_"));return '<article class="media-tile"><img loading="lazy" src="'+esc(thumb)+'" alt="'+esc(title)+'"><div class="media-body"><h3>'+esc(title)+'</h3><p>'+esc(desc)+'</p><p style="margin-top:7px">'+link(url,"Open in Commons ↗")+'</p></div></article>'}).join("")||'<div class="empty-state">No material found.</div>'}catch(e){console.error(e);grid.innerHTML='<div class="empty-state">Wikimedia Commons search is temporarily unavailable.</div>'}};
 btn?.addEventListener("click",run);search?.addEventListener("keydown",e=>{if(e.key==="Enter")run()});run();
}
async function initArchive(){
 const grid=document.querySelector("#archive-results"),search=document.querySelector("#archive-search"),btn=document.querySelector("#archive-btn");if(!grid)return;
 const run=async()=>{grid.innerHTML='<div class="loading">Searching Internet Archive…</div>';try{const u=IA+"?q="+encodeURIComponent(search.value.trim()||"history")+"&fl[]=identifier&fl[]=title&fl[]=description&fl[]=date&fl[]=mediatype&rows=30&page=1&output=json";const j=await json(u),docs=j.response?.docs||[];grid.innerHTML=docs.map(d=>'<article class="data-card"><h3>'+esc(d.title||d.identifier)+'</h3><p>'+esc(String(d.description||"").slice(0,230))+'</p><small>'+esc(d.mediatype||"item")+' · '+esc(d.date||"")+'</small><div style="margin-top:9px">'+link("https://archive.org/details/"+d.identifier,"Internet Archive ↗")+'</div></article>').join("")||'<div class="empty-state">No results.</div>'}catch(e){console.error(e);grid.innerHTML='<div class="empty-state">Internet Archive search is temporarily unavailable.</div>'}};
 btn?.addEventListener("click",run);search?.addEventListener("keydown",e=>{if(e.key==="Enter")run()});run();
}
document.addEventListener("DOMContentLoaded",()=>{initCountries();initPeoples();initLanguages();initMedia(document.body.dataset.media==="video");initArchive()});
