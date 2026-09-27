
const aliases={"United States of America":"ԱՄՆ","United States":"ԱՄՆ","Russia":"Ռուսաստան","Türkiye":"Թուրքիա","Turkey":"Թուրքիա","Armenia":"Հայաստան","Azerbaijan":"Ադրբեջան","Georgia":"Վրաստան","Iran":"Իրան","Iraq":"Իրաք","China":"Չինաստան","India":"Հնդկաստան","Japan":"Ճապոնիա","Germany":"Գերմանիա","France":"Ֆրանսիա","Italy":"Իտալիա","Spain":"Իսպանիա","United Kingdom":"Միացյալ Թագավորություն","Canada":"Կանադա","Mexico":"Մեքսիկա","Brazil":"Բրազիլիա","Australia":"Ավստրալիա"};
const WIKIDATA_API="https://www.wikidata.org/w/api.php";
const WDQS="https://query.wikidata.org/sparql";
const COMMONS_API="https://commons.wikimedia.org/w/api.php";
const esc=s=>String(s??"").replace(new RegExp("[&<>\\\"\']","g"),c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","\'":"&#39;"}[c]));
const isoFlag=iso=>String(iso||"").length===2?[...iso.toUpperCase()].map(c=>String.fromCodePoint(c.charCodeAt(0)+127397)).join(""):"";
const claimId=c=>c?.mainsnak?.datavalue?.value?.id||"";
const claimAmount=c=>{const a=c?.mainsnak?.datavalue?.value?.amount;return a==null?null:Number(a)};
const prop=(claims,p)=>Array.isArray(claims?.[p])?claims[p]:[];
const timeValue=v=>v?.time||v||"";
const yearOf=v=>{const m=String(timeValue(v)).match(new RegExp("[-+](\\d+)"));return m?Number(m[1]):null};
const precisionOf=v=>Number(v?.precision||0);
const exactDate=v=>{const s=String(timeValue(v));const m=s.match(new RegExp("[-+](\\d{1,6})-(\\d{2})-(\\d{2})"));if(!m)return yearOf(v);return Number(m[1])};
const formatYear=y=>{if(y==null)return "";const n=Math.abs(y);return y<0?"մ.թ.ա. "+n:"մ.թ. "+n};
function centuryLabel(y){
 if(y==null)return "";
 const n=Math.abs(y);
 const c=Math.max(1,Math.ceil(n/100));
 const roman=["","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX","XXI","XXII","XXIII","XXIV","XXV"];
 const r=roman[c]||String(c);
 return (y<0?"մ.թ.ա. ":"")+r+" դար";
}
function historicalPeriod(start,end,point,periodLabel){
 const py=periodLabel?String(periodLabel):"";
 const norm=py.toLowerCase();
 const named=norm.includes("middle ages")||norm.includes("միջնադար")||norm.includes("средневек");
 if(named)return esc(py)+" <span class=\"period-derived\">(մոտավորապես V–XV դարեր)</span>";
 const sy=yearOf(start),ey=yearOf(end),pyear=yearOf(point);
 if(sy!=null&&ey!=null){
   const exact=(precisionOf(start)>=9&&precisionOf(end)>=9);
   return exact?esc(formatYear(sy)+" — "+formatYear(ey)):esc(centuryLabel(sy)+" — "+centuryLabel(ey))+" <span class=\"period-derived\">("+esc(formatYear(sy)+" — "+formatYear(ey))+")</span>";
 }
 if(pyear!=null){
   return precisionOf(point)>=9?esc(formatYear(pyear)):esc(centuryLabel(pyear))+" <span class=\"period-derived\">("+esc(formatYear(pyear))+")</span>";
 }
 if(sy!=null)return esc(centuryLabel(sy))+" <span class=\"period-derived\">("+esc(formatYear(sy))+"+)</span>";
 if(ey!=null)return esc("մինչև "+formatYear(ey));
 return "Ժամանակաշրջանը նշված չէ";
}
async function fetchJson(url,options={}){
 const res=await fetch(url,options);
 const text=await res.text();
 if(!res.ok)throw Error("HTTP "+res.status);
 if(!text.trim().startsWith("{")&&!text.trim().startsWith("["))throw Error("Ոչ JSON պատասխան");
 return JSON.parse(text);
}
async function sparql(query){
 const u=WDQS+"?format=json&query="+encodeURIComponent(query);
 const r=await fetch(u,{headers:{Accept:"application/sparql-results+json"}});
 if(!r.ok)throw Error("WDQS "+r.status);
 const j=await r.json();
 return j.results?.bindings||[];
}
async function findQidByIso(iso){
 const code=String(iso||"").trim().toUpperCase();
 if(!new RegExp("^[A-Z]{2}$").test(code))return null;
 try{
   const rows=await sparql('SELECT ?item WHERE {?item wdt:P297 "'+code+'".} LIMIT 5');
   return rows[0]?.item?.value?.split("/").pop()||null;
 }catch(_){return null}
}
async function qidByWikiTitle(title,site){
 try{
   const u=WIKIDATA_API+"?action=wbgetentities&sites="+encodeURIComponent(site)+"&titles="+encodeURIComponent(title)+"&props=info|labels|claims|sitelinks&languages=hy|en|ru&languagefallback=0&format=json&origin=*";
   const j=await fetchJson(u,{headers:{Accept:"application/json"}});
   const key=Object.keys(j.entities||{}).find(k=>!k.startsWith("-")&&j.entities[k]?.id);
   return key||null;
 }catch(_){return null}
}
async function searchQids(name,lang){
 try{
   const u=WIKIDATA_API+"?action=wbsearchentities&search="+encodeURIComponent(name)+"&language="+encodeURIComponent(lang)+"&uselang="+encodeURIComponent(lang)+"&type=item&limit=10&format=json&origin=*";
   const j=await fetchJson(u,{headers:{Accept:"application/json"}});
   return (j.search||[]).map(x=>x.id).filter(Boolean);
 }catch(_){return[]}
}
async function getEntities(ids,languages=["hy","en","ru"]){
 const clean=[...new Set(ids.filter(Boolean))];
 if(!clean.length)return{};
 try{
   const u=WIKIDATA_API+"?action=wbgetentities&ids="+clean.join("|")+"&props=labels|descriptions|claims|sitelinks&languages="+languages.join("|")+"&languagefallback=0&format=json&origin=*";
   const j=await fetchJson(u,{headers:{Accept:"application/json"}});
   return j.entities||{};
 }catch(_){return{}}
}
async function findCountryEntity(mapName,iso){
 let qid=await findQidByIso(iso);
 if(qid){
   const e=(await getEntities([qid],["hy","en","ru"]))[qid];
   if(e)return e;
 }
 const names=[mapName,aliases[mapName]].filter(Boolean);
 for(const n of names){
   for(const site of ["enwiki","ruwiki","hywiki"]){
     const id=await qidByWikiTitle(n,site);
     if(id){
       const e=(await getEntities([id],["hy","en","ru"]))[id];
       if(e)return e;
     }
   }
 }
 const ids=[...(await searchQids(mapName,"en")),...(await searchQids(mapName,"ru")),...(await searchQids(mapName,"hy"))];
 const ents=await getEntities(ids,["hy","en","ru"]);
 const code=String(iso||"").toUpperCase();
 for(const id of ids){
   const e=ents[id]; if(!e)continue;
   const isoClaims=prop(e.claims,"P297").map(c=>c?.mainsnak?.datavalue?.value).filter(Boolean);
   if(code&&isoClaims.includes(code))return e;
   const types=prop(e.claims,"P31").map(claimId);
   if(types.includes("Q6256")||types.includes("Q3624078"))return e;
 }
 return null;
}
function entityLabel(e,lang){return e?.labels?.[lang]?.value||""}
function claimNumber(c){const n=claimAmount(c);return n==null?null:n}
function formatNumber(n){return Number(n).toLocaleString("en-US",{maximumFractionDigits:2})}
function latestPopulation(claims){
 const rows=prop(claims,"P1082").map(c=>{
   const d=c.qualifiers?.P585?.[0]?.datavalue?.value;
   return {v:claimNumber(c),date:d};
 }).filter(x=>x.v!=null);
 rows.sort((a,b)=>(yearOf(b.date)||-Infinity)-(yearOf(a.date)||-Infinity));
 return rows[0]||null;
}
function claimDate(c){
 const d=c?.qualifiers?.P585?.[0]?.datavalue?.value;
 return d?formatYear(yearOf(d)):"";
}
async function loadPropertyLabels(ids,languages){
 return getEntities(ids,languages);
}
async function languageCodesForOfficial(officialIds){
 if(!officialIds.length)return [];
 const ents=await getEntities(officialIds,["hy","en","ru"]);
 const out=[];
 for(const id of officialIds){
   const e=ents[id]; if(!e)continue;
   const vals=[...prop(e.claims,"P218"),...prop(e.claims,"P219")].map(c=>c?.mainsnak?.datavalue?.value).filter(Boolean);
   for(const v of vals){
     if(new RegExp("^[a-z]{2,3}$","i").test(v))out.push(String(v).toLowerCase());
   }
 }
 return [...new Set(out)];
}
function valueLabel(entities,id,lang){
 return entities?.[id]?.labels?.[lang]?.value||"";
}
const UI_LANG_NAMES={hy:"Հայերեն",en:"English",ru:"Русский"};
const UI_KEYS={
 hy:{country:"Պետություն",population:"Բնակչություն",area:"Տարածք",capital:"Մայրաքաղաք",languages:"Պետական լեզու",peoples:"Ժողովուրդներ / էթնիկ խմբեր",religions:"Կրոններ",description:"Նկարագրություն"},
 en:{country:"Country",population:"Population",area:"Area",capital:"Capital",languages:"Official language(s)",peoples:"Peoples / ethnic groups",religions:"Religions",description:"Description"},
 ru:{country:"Государство",population:"Население",area:"Площадь",capital:"Столица",languages:"Государственные языки",peoples:"Народы / этнические группы",religions:"Религии",description:"Описание"}
};
async function buildCountryData(entity){
 const claims=entity.claims||{};
 const officialIds=prop(claims,"P37").map(claimId).filter(Boolean).slice(0,12);
 const capitalIds=prop(claims,"P36").map(claimId).filter(Boolean).slice(0,4);
 const religionIds=prop(claims,"P140").map(claimId).filter(Boolean).slice(0,12);
 const linkIds=[...new Set([...officialIds,...capitalIds,...religionIds])];
 const nativeCodes=await languageCodesForOfficial(officialIds);
 const target=[...new Set(["hy","en","ru",...nativeCodes])];
 const linked=await getEntities(linkIds,target);
 const props=await loadPropertyLabels(["P1082","P2046","P36","P37","P172","P140"],target);
 return {claims,officialIds,capitalIds,religionIds,linked,props,target,pop:latestPopulation(claims)};
}
function factLabel(props,id,lang,fallback){return props?.[id]?.labels?.[lang]?.value||fallback||""}
function renderedFact(label,value,extra){
 if(!label||!value)return "";
 return '<div class="fact-card"><span>'+esc(label)+'</span><strong>'+value+(extra?'<small>'+extra+'</small>':"")+'</strong></div>';
}
function languageTabHtml(entity,cd,lang,ethnic,religions){
 const meta=UI_KEYS[lang]||{};
 const name=entityLabel(entity,lang);
 if(!name)return "";
 const pop=cd.pop;
 const areaC=prop(cd.claims,"P2046")[0];
 const area=claimNumber(areaC);
 const capitals=cd.capitalIds.map(id=>valueLabel(cd.linked,id,lang)).filter(Boolean);
 const langs=cd.officialIds.map(id=>valueLabel(cd.linked,id,lang)).filter(Boolean);
 const rels=cd.religionIds.map(id=>valueLabel(cd.linked,id,lang)).filter(Boolean);
 const desc=entity?.descriptions?.[lang]?.value||"";
 const cards=[
   renderedFact(factLabel(cd.props,"P1082",lang,meta.population),pop?formatNumber(pop.v):"",(pop?.date?formatYear(yearOf(pop.date)):"")),
   renderedFact(factLabel(cd.props,"P2046",lang,meta.area),area!=null?formatNumber(area)+" km²":""),
   renderedFact(factLabel(cd.props,"P36",lang,meta.capital),capitals.join(", ")),
   renderedFact(factLabel(cd.props,"P37",lang,meta.languages),langs.join(", ")),
   renderedFact(factLabel(cd.props,"P140",lang,meta.religions),rels.join(", "))
 ].filter(Boolean).join("");
 const descHtml=desc?'<div class="description-block"><span>'+esc(meta.description||"Description")+'</span><p>'+esc(desc)+'</p></div>':"";
 return '<section class="lang-pane" data-lang-pane="'+esc(lang)+'"><div class="facts-grid">'+cards+'</div>'+descHtml+'<div class="mini-data-section"><div class="section-kicker">'+esc(meta.peoples||"Peoples")+'</div>'+ethnic+'</div><div class="mini-data-section"><div class="section-kicker">'+esc(meta.religions||"Religions")+'</div>'+religions+'</div></section>';
}
function ethnicRows(rows,lang,entities){
 const seen=new Set();
 return rows.map(x=>{
   const id=x.ethnic?.value?.split("/").pop()||""; if(!id||seen.has(id))return ""; seen.add(id);
   const n=valueLabel(entities,id,lang)||x.ethnicLabel?.value||""; if(!n)return "";
   const pct=x.value?.value!=null?String(Math.round(Number(x.value.value)*10000)/100).replaceAll(".0","")+"%":"";
   const d=x.date?.value?claimDate({qualifiers:{P585:[{datavalue:{value:x.date.value}}]}}):"";
   const period=x.periodLabel?.value?x.periodLabel.value:"";
   return '<button type="button" class="people-row" data-people-id="'+esc(id)+'" data-people-name="'+esc(n)+'"><span><strong>'+esc(n)+'</strong><small>'+([pct,d,period].filter(Boolean).map(esc).join(" · ")||"Տվյալների մանրամասներ")+'</small></span><b>→</b></button>';
 }).join("")||'<div class="empty-data">Այս լեզվով կառուցվածքային ազգաբանական տվյալներ չկան։</div>';
}
function religionRows(rows,lang,entities){
 const seen=new Set();
 return rows.map(x=>{
   const id=x.religion?.value?.split("/").pop()||""; if(!id||seen.has(id))return ""; seen.add(id);
   const n=valueLabel(entities,id,lang)||x.religionLabel?.value||""; if(!n)return "";
   const pct=x.value?.value!=null?String(Math.round(Number(x.value.value)*10000)/100).replaceAll(".0","")+"%":"";
   const d=x.date?.value?formatYear(yearOf(x.date.value)):"";
   return '<div class="simple-row"><span><strong>'+esc(n)+'</strong><small>'+([pct,d].filter(Boolean).map(esc).join(" · ")||"")+'</small></span></div>';
 }).join("")||'<div class="empty-data">Կրոնական կառուցվածքային տվյալներ չկան։</div>';
}
async function communityData(qid){
 const ethnicQ='SELECT ?ethnic ?ethnicLabel ?value ?date ?period ?periodLabel WHERE { wd:'+qid+' p:P172 ?st. ?st ps:P172 ?ethnic. OPTIONAL{?st pq:P1107 ?value.} OPTIONAL{?st pq:P585 ?date.} OPTIONAL{?st pq:P2348 ?period. ?period rdfs:label ?periodLabel. FILTER(LANG(?periodLabel) IN ("hy","en","ru"))} SERVICE wikibase:label{bd:serviceParam wikibase:language "hy,en,ru".}} LIMIT 80';
 const religionQ='SELECT ?religion ?religionLabel ?value ?date WHERE { wd:'+qid+' p:P140 ?st. ?st ps:P140 ?religion. OPTIONAL{?st pq:P1107 ?value.} OPTIONAL{?st pq:P585 ?date.} SERVICE wikibase:label{bd:serviceParam wikibase:language "hy,en,ru".}} LIMIT 60';
 const [ethnic,religions]=await Promise.all([sparql(ethnicQ).catch(()=>[]),sparql(religionQ).catch(()=>[])]);
 return {ethnic,religions};
}
function sourceBadges(){
 return '<div class="source-strip"><span>Wikidata</span><span>Wikipedia/Wikimedia</span><span class="source-note-inline">Տվյալների բացակայության դեպքում փաստը չի հորինվում։</span></div>';
}
async function renderCountry(mapName,displayName,iso){
 const panel=document.querySelector("#country-panel"); if(!panel)return;
 panel.innerHTML='<div class="loading-state"><div class="loading-orbit"></div><small>HISTORY · DATA ENGINE</small><h3>'+esc(displayName||mapName)+'</h3><p>Մի քանի աղբյուրից փնտրվում և համադրվում են տվյալները…</p></div>';
 try{
   const entity=await findCountryEntity(mapName,iso);
   if(!entity){
     const fallback=await wikipediaFallback(mapName);
     panel.innerHTML=fallback||'<div class="empty-data big-empty"><strong>Այս պետության կառուցվածքային գրառումը դեռ հասանելի չէ։</strong><p>Փնտրվեց ISO կոդով, տարբեր լեզուներով և Wikidata-ի որոնմամբ, բայց օգտագործելի գրառում չգտնվեց։</p></div>';
     return;
   }
   const cd=await buildCountryData(entity);
   const qid=entity.id;
   const comm=await communityData(qid);
   const peopleIds=[...new Set([...comm.ethnic.map(x=>x.ethnic?.value?.split("/").pop()),...comm.religions.map(x=>x.religion?.value?.split("/").pop())].filter(Boolean))];
   const peopleLinked=await getEntities(peopleIds,[...new Set(["hy","en","ru",...cd.target])]);
   const languages=[...new Set(["hy","en","ru",...cd.target])].filter(l=>entityLabel(entity,l));
   const defaultLang=languages.includes("hy")?"hy":languages.includes("en")?"en":languages[0];
   const tabs=languages.map(lang=>'<button type="button" class="lang-tab '+(lang===defaultLang?"active":"")+'" data-lang-tab="'+esc(lang)+'">'+esc(UI_LANG_NAMES[lang]||lang.toUpperCase())+'</button>').join("");
   const panes=languages.map(lang=>languageTabHtml(entity,cd,lang,ethnicRows(comm.ethnic,lang,peopleLinked),religionRows(comm.religions,lang,peopleLinked))).join("");
   const officialNames=cd.officialIds.map(id=>valueLabel(cd.linked,id,"hy")||valueLabel(cd.linked,id,"en")).filter(Boolean);
   panel.innerHTML='<div class="country-hero"><div class="country-hero-title"><span class="flag-badge">'+esc(isoFlag(iso))+'</span><div><div class="eyebrow">COUNTRY · '+esc(qid)+'</div><h3>'+esc(entityLabel(entity,defaultLang)||displayName||mapName)+'</h3><p>'+esc(displayName||mapName)+(officialNames.length?' · '+esc(officialNames.join(", ")):"")+'</p></div></div><a class="ghost-link" href="https://www.wikidata.org/wiki/'+encodeURIComponent(qid)+'" target="_blank" rel="noopener">Wikidata ↗</a></div><div class="language-tabs">'+tabs+'</div><div class="language-panes">'+panes+'</div>'+sourceBadges()+'<div class="history-inspector" id="history-inspector"><div class="inspector-placeholder"><span>✦</span><strong>Ընտրիր ժողովրդի անունը</strong><p>Քարտեզում կերևան նրա հայտնի պատմական բնակության վայրերը։</p></div></div><div class="history-legend"><span><i class="legend-red"></i>Պատմական տարածք / տեղադրություն</span><span><i class="legend-gray"></i>Տվյալների որակի նշում</span></div>';
   panel.querySelectorAll("[data-lang-tab]").forEach(b=>b.addEventListener("click",()=>activateLanguage(panel,b.dataset.langTab)));
   activateLanguage(panel,defaultLang);
   panel.querySelectorAll(".people-row").forEach(b=>b.addEventListener("click",()=>selectPeopleHistory(b.dataset.peopleId,b.dataset.peopleName)));
 }catch(err){
   console.error(err);
   panel.innerHTML='<div class="empty-data big-empty"><strong>Տվյալների բեռնումը չհաջողվեց։</strong><p>Աղբյուրներից մեկի ժամանակավոր հասանելիությունը չխանգարելու համար մնացած հասանելի տվյալները չեն ներկայացվում որպես փաստ։</p></div>';
 }
}
function activateLanguage(panel,lang){
 panel.querySelectorAll("[data-lang-tab]").forEach(b=>b.classList.toggle("active",b.dataset.langTab===lang));
 panel.querySelectorAll("[data-lang-pane]").forEach(p=>p.classList.toggle("active",p.dataset.langPane===lang));
}
async function wikipediaFallback(title){
 for(const lang of ["en","ru","hy"]){
   try{
     const u="https://"+lang+".wikipedia.org/w/api.php?action=query&prop=extracts|pageprops&exintro=1&explaintext=1&redirects=1&titles="+encodeURIComponent(title)+"&format=json&origin=*";
     const j=await fetchJson(u);
     const p=Object.values(j.query?.pages||{})[0];
     if(p?.pageid&&p.extract)return '<div class="country-hero fallback-hero"><div><div class="eyebrow">WIKIPEDIA · '+esc(lang.toUpperCase())+'</div><h3>'+esc(p.title)+'</h3><p>'+esc(p.extract)+'</p></div><a class="ghost-link" href="https://'+lang+'.wikipedia.org/wiki/'+encodeURIComponent(p.title)+'" target="_blank" rel="noopener">Wikipedia ↗</a></div>';
   }catch(_){}
 }
 return null;
}

const mapEl=document.querySelector("#world-map"),mapStatus=document.querySelector("#map-status");
let leafletMap=null,geoLayer=null,selectedLayer=null,historicalGroup=null,historicalPlaces=[],selectedPeopleId=null;
const countryStyle=feature=>{const seed=String(feature?.properties?.name||"").split("").reduce((a,c)=>a+c.charCodeAt(0),0);const palette=["#d9e8ef","#f4e3c6","#e4efd8","#efdfeb","#dce7f5","#f1e6d0","#dce9e7","#eadfd6"];return{color:"#ffffff",weight:1.15,fillColor:palette[seed%palette.length],fillOpacity:.84}};
const countryName=layer=>layer?.feature?.properties?.name||"";
const styleLayer=(layer,style)=>{if(layer&&typeof layer.setStyle==="function")layer.setStyle(style)};
function clearHistorical(){
 if(historicalGroup){historicalGroup.clearLayers();historicalGroup.remove();}
 historicalGroup=null;historicalPlaces=[];selectedPeopleId=null;
 const inspector=document.querySelector("#history-inspector");
 if(inspector)inspector.innerHTML='<div class="inspector-placeholder"><span>✦</span><strong>Ընտրիր ժողովրդի անունը</strong><p>Քարտեզում կերևան նրա հայտնի պատմական բնակության վայրերը։</p></div>';
}
function focusCountry(layer){
 if(!leafletMap||!layer)return;
 clearHistorical();
 if(selectedLayer&&selectedLayer!==layer)styleLayer(selectedLayer,countryStyle(selectedLayer.feature));
 selectedLayer=layer;
 styleLayer(layer,{color:"#8d251d",weight:3,fillColor:"#d76545",fillOpacity:.96});
 if(typeof layer.bringToFront==="function")layer.bringToFront();
 const mapName=countryName(layer),displayName=aliases[mapName]||mapName;
 if(mapStatus)mapStatus.textContent=displayName;
 renderCountry(mapName,displayName,layer.feature?.properties?.iso);
 
 const b=layer.getBounds();
 if(b?.isValid?.())leafletMap.flyToBounds(b,{paddingTopLeft:[20,20],paddingBottomRight:[430,35],maxZoom:7,duration:.9});
}
function resetMap(){
 if(!leafletMap)return;
 clearHistorical();
 if(selectedLayer){styleLayer(selectedLayer,countryStyle(selectedLayer.feature));selectedLayer=null}
 leafletMap.flyToBounds([[-58,-180],[82,180]],{padding:[10,10],maxZoom:2,duration:.8});
 if(mapStatus)mapStatus.textContent="Ամբողջ աշխարհ";
}
function parseCoord(value){
 const raw=String(value||"").trim();
 if(!raw.toLowerCase().startsWith("point(")||!raw.endsWith(")"))return null;
 const parts=raw.slice(raw.indexOf("(")+1,-1).trim().split(" ").filter(Boolean);
 if(parts.length<2)return null;
 const lon=Number(parts[0]),lat=Number(parts[1]);
 if(!Number.isFinite(lon)||!Number.isFinite(lat))return null;
 return [lat,lon];
}
function confidenceFor(place){
 const refs=place.sources.length>0;
 const shape=Boolean(place.geo);
 const coord=Boolean(place.coord);
 const dated=place.periods.some(p=>p.hasDate);
 if(refs&&shape&&dated)return {label:"Բարձր",className:"high",why:"աղբյուր + տարածք + ժամանակային տվյալ"};
 if((refs&&dated)||(shape&&dated))return {label:"Միջին",className:"medium",why:"աղբյուր կամ տարածքային տվյալ + ժամանակ"};
 return {label:"Անորոշ",className:"low",why:"ժամանակը կամ հղումները թերի են"};
}
function periodObject(row){
 const start=row.start?.value,end=row.end?.value,point=row.point?.value,period=row.periodLabel?.value;
 return {start,end,point,periodLabel:period,hasDate:Boolean(start||end||point),html:historicalPeriod(start,end,point,period)};
}
async function historicalPlacesFor(qid){
 const q='SELECT ?place ?placeLabel ?placeDescription ?coord ?geo ?start ?end ?point ?period ?periodLabel ?source ?sourceLabel ?sourceUrl WHERE { ?place p:P172 ?st. ?st ps:P172 wd:'+qid+'. OPTIONAL{?st pq:P580 ?start.} OPTIONAL{?st pq:P582 ?end.} OPTIONAL{?st pq:P585 ?point.} OPTIONAL{?st pq:P2348 ?period. ?period rdfs:label ?periodLabel. FILTER(LANG(?periodLabel) IN ("hy","en","ru"))} OPTIONAL{?place wdt:P625 ?coord.} OPTIONAL{?place wdt:P3896 ?geo.} OPTIONAL{?st prov:wasDerivedFrom ?ref. OPTIONAL{?ref pr:P248 ?source. ?source rdfs:label ?sourceLabel. FILTER(LANG(?sourceLabel) IN ("hy","en","ru"))} OPTIONAL{?ref pr:P854 ?sourceUrl.}} SERVICE wikibase:label{bd:serviceParam wikibase:language "hy,en,ru".}} LIMIT 400';
 let rows=await sparql(q).catch(()=>[]);
 const map=new Map();
 for(const r of rows){
   const id=r.place?.value?.split("/").pop();if(!id)continue;
   if(!map.has(id))map.set(id,{id,name:r.placeLabel?.value||id,description:r.placeDescription?.value||"",coord:r.coord?.value||"",geo:r.geo?.value||"",periods:[],sources:[]});
   const item=map.get(id);
   const per=periodObject(r);
   const pkey=JSON.stringify([per.start,per.end,per.point,per.periodLabel]);
   if(!item.periods.some(p=>JSON.stringify([p.start,p.end,p.point,p.periodLabel])===pkey))item.periods.push(per);
   const src=r.sourceUrl?.value||r.sourceLabel?.value;
   if(src&&!item.sources.includes(src))item.sources.push(src);
   if(r.geo?.value)item.geo=r.geo.value;
   if(r.coord?.value)item.coord=r.coord.value;
 }
 try{
   const eq=await sparql('SELECT ?geo ?coord WHERE { wd:'+qid+' OPTIONAL{wd:'+qid+' wdt:P3896 ?geo.} OPTIONAL{wd:'+qid+' wdt:P625 ?coord.}} LIMIT 10');
   for(const r of eq){
     if(!map.has("__entity__"))map.set("__entity__",{id:"__entity__",name:"Ընտրված ժողովուրդ",description:"Wikidata geoshape",coord:r.coord?.value||"",geo:r.geo?.value||"",periods:[],sources:[]});
   }
 }catch(_){}
 return [...map.values()].filter(x=>x.geo||x.coord);
}
function geoTitleToText(value){
 const s=String(value||"");
 const idx=s.lastIndexOf("Data:");
 let t=idx>=0?s.slice(idx+5):s;
 while(t.startsWith("/")||t.startsWith("\\"))t=t.slice(1);
 const dot=t.toLowerCase().lastIndexOf(".map");
 return dot>=0?decodeURIComponent(t.slice(0,dot+4)):"";
}
async function commonsMapGeoJSON(value){
 const title=geoTitleToText(value);if(!title)return null;
 try{
   const u=COMMONS_API+"?action=query&prop=revisions&titles="+encodeURIComponent("Data:"+title)+"&rvprop=content&rvslots=main&format=json&origin=*";
   const j=await fetchJson(u,{headers:{Accept:"application/json"}});
   const p=Object.values(j.query?.pages||{})[0];
   const raw=p?.revisions?.[0]?.slots?.main?.content||p?.revisions?.[0]?.slots?.main?.["*"];
   if(!raw)return null;
   const geo=JSON.parse(raw);
   if(geo.type==="FeatureCollection")return geo;
   if(geo.type==="Feature")return {type:"FeatureCollection",features:[geo]};
   if(geo.geometry)return {type:"FeatureCollection",features:[{type:"Feature",properties:{},geometry:geo.geometry}]};
   return null;
 }catch(_){return null}
}
function sourceMarkup(place){
 const items=place.sources.slice(0,4).map(s=>{
   const isUrl=String(s).startsWith("http://")||String(s).startsWith("https://");
   return isUrl?'<a target="_blank" rel="noopener" href="'+esc(s)+'">աղբյուր ↗</a>':'<span>'+esc(s)+'</span>';
 }).join("");
 return items||'<span>Wikidata statement</span>';
}
function placeInspectorHtml(place,index){
 const conf=confidenceFor(place);
 const periods=place.periods.length
   ?place.periods.map(p=>'<div class="period-card"><strong>'+p.html+'</strong></div>').join("")
   :'<div class="period-card"><strong>Ժամանակաշրջանը աղբյուրում նշված չէ</strong></div>';
 return `<div class="inspector-head"><span class="eyebrow">HISTORICAL PLACE · ${esc(place.id)}</span><button type="button" class="inspector-close" onclick="window.historyMapClearSelection()">×</button></div><h4>${esc(place.name)}</h4><p class="place-description">${esc(place.description||"Պատմական բնակության/կապի վայր՝ ըստ հասանելի կառուցվածքային տվյալների։")}</p><div class="period-stack">${periods}</div><div class="confidence ${conf.className}"><span>${esc(conf.label)}</span><small>${esc(conf.why)}</small></div><div class="place-sources"><strong>Աղբյուր</strong>${sourceMarkup(place)}</div>`;
}
function showHistoryPlace(place,index){
 const inspector=document.querySelector("#history-inspector");if(!inspector)return;
 inspector.innerHTML=placeInspectorHtml(place,index);
 if(place.coord){
   const c=parseCoord(place.coord);
   if(c)leafletMap.flyTo(c,Math.max(5,leafletMap.getZoom()),{duration:.7});
 }
}
window.historyMapClearSelection=()=>{const p=document.querySelector("#history-inspector");if(p)p.innerHTML='<div class="inspector-placeholder"><span>✦</span><strong>Ընտրիր քարտեզի նշված վայրերից մեկը</strong><p>Այստեղ կերևան վայրի անվանումը, դարերը, աղբյուրները և տվյալների որակի նշումը։</p></div>'};
async function selectPeopleHistory(qid,name){
 if(!leafletMap)return;
 clearHistorical();selectedPeopleId=qid;
 const inspector=document.querySelector("#history-inspector");
 if(inspector)inspector.innerHTML='<div class="loading-state compact"><div class="loading-orbit"></div><strong>'+esc(name)+'</strong><p>Փնտրվում են պատմական բնակության վայրերը, geoshape-երը, կետերը և ժամանակաշրջանները…</p></div>';
 try{
   historicalPlaces=await historicalPlacesFor(qid);
   historicalGroup=L.layerGroup().addTo(leafletMap);
   const shapePlaces=historicalPlaces.filter(p=>p.geo).slice(0,80);
   const geoResults=await Promise.all(shapePlaces.map(async p=>({p,g:await commonsMapGeoJSON(p.geo)})));
   let painted=0;
   for(const {p,g} of geoResults){
     if(!g)continue;
     L.geoJSON(g,{style:{color:"#8d1610",weight:2,fillColor:"#d9251b",fillOpacity:.23,dashArray:"6 5"},onEachFeature:(feature,layer)=>layer.on("click",()=>showHistoryPlace(p)),pointToLayer:(_,latlng)=>L.circleMarker(latlng,{radius:7,color:"#8d1610",fillColor:"#d9251b",fillOpacity:.72,weight:2})}).addTo(historicalGroup);
     painted++;
   }
   historicalPlaces.filter(p=>p.coord&&!p.geo).slice(0,220).forEach((p)=>{
     const c=parseCoord(p.coord);if(!c)return;
     L.circleMarker(c,{radius:6,color:"#8d1610",fillColor:"#d9251b",fillOpacity:.86,weight:2}).on("click",()=>showHistoryPlace(p)).addTo(historicalGroup);
   });
   const count=historicalPlaces.filter(p=>p.coord||p.geo).length;
   if(inspector)inspector.innerHTML='<div class="people-summary"><div><span class="eyebrow">PEOPLE MAP</span><h4>'+esc(name)+'</h4><p>'+count+' քարտեզագրված վայր/տարածք · '+painted+' geoshape փորձարկված</p></div><button type="button" class="history-clear" onclick="window.historyMapClearSelection()">Մաքրել</button></div><div class="people-stat-grid"><div><strong>'+historicalPlaces.length+'</strong><small>գտնված գրառում</small></div><div><strong>'+painted+'</strong><small>տարածքային ձև</small></div><div><strong>'+historicalPlaces.filter(p=>p.coord).length+'</strong><small>կոորդինատային վայր</small></div></div><div class="inspector-note">Կարմիրով նշված տարածքները/կետերը կառուցված են հասանելի Wikidata + Wikimedia Commons geospatial տվյալներից։ «Վստահություն»-ը տվյալների ամբողջականության ցուցիչ է, ոչ թե պատմական ճշմարտության ինքնուրույն գնահատական։</div>';
   if(count){
     const pts=historicalPlaces.map(p=>parseCoord(p.coord)).filter(Boolean);
     if(pts.length){const b=L.latLngBounds(pts);if(b.isValid())leafletMap.fitBounds(b.pad(.25),{maxZoom:6,duration:.7})}
   }
 }catch(err){
   console.error(err);
   if(inspector)inspector.innerHTML='<div class="empty-data"><strong>Պատմական տարածքների տվյալները ժամանակավորապես չբեռնվեցին։</strong><p>Քարտեզի հիմնական աշխատանքը շարունակվում է։</p></div>';
 }
}
let explorerMode="states", explorerYear=2026;
const EXPLORER_TYPES={states:"Q6256",peoples:"Q41710",languages:"Q315",animals:"Q729"};
function explorerYearBounds(y){return {start:String(y)+"-01-01T00:00:00Z",end:String(y)+"-12-31T23:59:59Z"}}
async function explorerSearch(mode,term){
 const clean=String(term||"").trim();
 if(clean){
   const ids=await searchQids(clean,"en");
   const ents=await getEntities(ids,["en"]);
   const valid=ids.map(id=>ents[id]).filter(Boolean).filter(ent=>{
     const types=prop(ent.claims,"P31").map(claimId);
     if(mode==="states")return types.includes("Q6256")||types.includes("Q3624078")||prop(ent.claims,"P297").length;
     if(mode==="languages")return types.includes("Q315")||types.includes("Q34770")||types.includes("Q20162172");
     if(mode==="animals")return types.includes("Q16521")||types.includes("Q729")||types.includes("Q55983715");
     return types.includes("Q41710")||types.includes("Q16334295")||types.includes("Q16881915");
   });
   return valid.slice(0,40).map(ent=>({item:{value:"http://www.wikidata.org/entity/"+ent.id},itemLabel:{value:ent.labels?.en?.value||ent.id},coord:prop(ent.claims,"P625")[0]?.mainsnak?.datavalue?.value?.latitude!=null?{value:"Point("+prop(ent.claims,"P625")[0].mainsnak.datavalue.value.longitude+" "+prop(ent.claims,"P625")[0].mainsnak.datavalue.value.latitude+")"}:null,inception:prop(ent.claims,"P571")[0]?.mainsnak?.datavalue?.value,extinction:prop(ent.claims,"P576")[0]?.mainsnak?.datavalue?.value,geo:null}));
 }
 let q="";
 if(mode==="states")q='SELECT ?item ?itemLabel ?coord ?geo ?inception ?extinction WHERE {?item wdt:P297 ?iso. OPTIONAL{?item wdt:P625 ?coord.} OPTIONAL{?item wdt:P3896 ?geo.} OPTIONAL{?item wdt:P571 ?inception.} OPTIONAL{?item wdt:P576 ?extinction.} SERVICE wikibase:label{bd:serviceParam wikibase:language "en".}} LIMIT 80';
 else if(mode==="languages")q='SELECT ?item ?itemLabel ?coord ?inception ?extinction WHERE {?item wdt:P31/wdt:P279* wd:Q315. OPTIONAL{?item wdt:P625 ?coord.} OPTIONAL{?item wdt:P571 ?inception.} OPTIONAL{?item wdt:P576 ?extinction.} SERVICE wikibase:label{bd:serviceParam wikibase:language "en".}} LIMIT 60';
 else if(mode==="animals")q='SELECT ?item ?itemLabel ?coord ?inception ?extinction WHERE {?item wdt:P31/wdt:P279* wd:Q16521. OPTIONAL{?item wdt:P625 ?coord.} OPTIONAL{?item wdt:P571 ?inception.} OPTIONAL{?item wdt:P576 ?extinction.} SERVICE wikibase:label{bd:serviceParam wikibase:language "en".}} LIMIT 60';
 else q='SELECT ?item ?itemLabel ?coord ?inception ?extinction WHERE {?item wdt:P31/wdt:P279* wd:Q41710. OPTIONAL{?item wdt:P625 ?coord.} OPTIONAL{?item wdt:P571 ?inception.} OPTIONAL{?item wdt:P576 ?extinction.} SERVICE wikibase:label{bd:serviceParam wikibase:language "en".}} LIMIT 60';
 return sparql(q).then(rows=>rows.filter(r=>{const s=yearOf(r.inception?.value),e=yearOf(r.extinction?.value);return !s||s<=explorerYear?(!e||e>=explorerYear):false})).catch(()=>[]);
}
function clearExplorerLayers(){if(window.__explorerGroup){window.__explorerGroup.clearLayers();window.__explorerGroup.remove();window.__explorerGroup=null}}
function explorerCard(row){
 const id=row.item?.value?.split("/").pop()||"", name=row.itemLabel?.value||id;
 return '<div class="entity-card"><div><strong>'+esc(name)+'</strong><small>'+esc(id)+'</small></div><button class="explore-select" data-qid="'+esc(id)+'" data-name="'+esc(name)+'">Open</button></div>';
}
async function renderExplorer(){
 const list=document.querySelector("#history-entity-list"),ins=document.querySelector("#history-inspector");if(!list)return;
 const term=document.querySelector("#history-entity")?.value.trim()||"";
 const y=Number(document.querySelector("#history-year")?.value||2026);explorerYear=y;
 list.innerHTML='<div class="inspector-placeholder">Loading historical data…</div>';clearExplorerLayers();
 const rows=await explorerSearch(explorerMode,term);
 list.innerHTML=rows.length?rows.map(explorerCard).join(""):'<div class="inspector-placeholder">No structured records returned for this query.</div>';
 list.querySelectorAll(".explore-select").forEach(b=>b.addEventListener("click",()=>selectExplorerEntity(b.dataset.qid,b.dataset.name)));
 if(explorerMode==="states"){
   window.__explorerGroup=L.layerGroup().addTo(leafletMap);
   const shaped=rows.filter(r=>r.geo?.value).slice(0,30);
   const rendered=await Promise.all(shaped.map(async r=>({r,g:await commonsMapGeoJSON(r.geo.value)})));
   rendered.forEach(({r,g})=>{if(g)L.geoJSON(g,{style:{color:"#ffd9ce",weight:1.5,fillColor:"#d76545",fillOpacity:.35},onEachFeature:(ft,ly)=>ly.bindTooltip(r.itemLabel?.value||"").on("click",()=>selectExplorerEntity(r.item?.value?.split("/").pop(),r.itemLabel?.value||""))}).addTo(window.__explorerGroup)});
   rows.filter(r=>r.coord?.value&&!r.geo?.value).slice(0,80).forEach(r=>{const c=parseCoord(r.coord.value);if(c)L.circleMarker(c,{radius:5,color:"#e9a28e",fillColor:"#d76545",fillOpacity:.8}).bindTooltip(r.itemLabel?.value||"").addTo(window.__explorerGroup)});
 }
 if(ins)ins.innerHTML='<div class="inspector-placeholder"><strong>'+rows.length+'</strong> structured records found for <strong>'+esc(explorerMode)+'</strong> at <strong>'+esc(String(y))+'</strong>. Select an entity for details.</div>';
}
async function explorerLocations(qid,mode,year){
 let q="";
 if(mode==="peoples")q='SELECT ?country ?countryLabel ?iso ?start ?end WHERE {?country wdt:P297 ?iso. ?country p:P172 ?st. ?st ps:P172 wd:'+qid+'. OPTIONAL{?st pq:P580 ?start.} OPTIONAL{?st pq:P582 ?end.} SERVICE wikibase:label{bd:serviceParam wikibase:language "en".}} LIMIT 250';
 else if(mode==="languages")q='SELECT ?country ?countryLabel ?iso ?start ?end WHERE {{?country p:P37 ?st. ?st ps:P37 wd:'+qid+'.} UNION {?country p:P2936 ?st. ?st ps:P2936 wd:'+qid+'.} ?country wdt:P297 ?iso. OPTIONAL{?st pq:P580 ?start.} OPTIONAL{?st pq:P582 ?end.} SERVICE wikibase:label{bd:serviceParam wikibase:language "en".}} LIMIT 250';
 else if(mode==="animals")q='SELECT ?country ?countryLabel ?iso WHERE {wd:'+qid+' wdt:P9714 ?country. ?country wdt:P297 ?iso. SERVICE wikibase:label{bd:serviceParam wikibase:language "en".}} LIMIT 250';
 else return [];
 const rows=await sparql(q).catch(()=>[]);
 return rows.filter(r=>{const s=yearOf(r.start?.value),e=yearOf(r.end?.value);return !s||!e||(year>=s&&year<=e)});
}
function highlightExplorerCountries(rows){
 if(!geoLayer)return;
 const wanted=new Set(rows.map(r=>String(r.iso?.value||"").toUpperCase()).filter(Boolean));
 geoLayer.eachLayer(layer=>{
   const iso=String(layer.feature?.properties?.iso||layer.feature?.properties?.ISO_A2||"").toUpperCase();
   if(wanted.has(iso))styleLayer(layer,{color:"#ffd9ce",weight:2.5,fillColor:"#d76545",fillOpacity:.7});
   else if(layer!==selectedLayer)styleLayer(layer,countryStyle(layer.feature));
 });
 return wanted.size;
}
async function selectExplorerEntity(qid,name){
 const ins=document.querySelector("#history-inspector");if(!ins)return;
 ins.innerHTML='<div class="inspector-placeholder">Loading '+esc(name)+'…</div>';
 const e=(await getEntities([qid],["en","hy","ru"]))[qid]||{},cl=e.claims||{};
 const inception=prop(cl,"P571")[0]?.mainsnak?.datavalue?.value,extinction=prop(cl,"P576")[0]?.mainsnak?.datavalue?.value;
 const desc=e.descriptions?.en?.value||"No English description available.",coords=prop(cl,"P625")[0]?.mainsnak?.datavalue?.value;
 const y=Number(document.querySelector("#history-year")?.value||2026);
 const locRows=await explorerLocations(qid,explorerMode,y),countryCount=highlightExplorerCountries(locRows);
 let extra="";
 if(explorerMode==="languages"){
   const familyIds=prop(cl,"P279").map(claimId).filter(Boolean),fe=await getEntities(familyIds,["en"]);
   const families=familyIds.map(id=>fe[id]?.labels?.en?.value).filter(Boolean);
   const speakers=prop(cl,"P1098").map(claimNumber).filter(x=>x!=null);
   extra='<div class="history-facts"><div class="history-fact"><span>Language family / parent</span><strong>'+esc(families.join(", ")||"Not recorded")+'</strong></div><div class="history-fact"><span>Recorded speakers</span><strong>'+esc(speakers.length?formatNumber(speakers[speakers.length-1]):"Not recorded")+'</strong></div><div class="history-fact"><span>Countries / territories</span><strong>'+countryCount+'</strong></div></div>';
 }else if(explorerMode==="peoples"){
   extra='<div class="history-facts"><div class="history-fact"><span>Countries linked in structured data</span><strong>'+countryCount+'</strong></div><div class="history-fact"><span>Historical location records</span><strong>'+locRows.length+'</strong></div></div>';
 }else if(explorerMode==="animals"){
   extra='<div class="history-facts"><div class="history-fact"><span>Recorded range areas</span><strong>'+locRows.length+'</strong></div><div class="history-fact"><span>Extinction / end record</span><strong>'+esc(extinction?formatYear(yearOf(extinction)):"Not recorded")+'</strong></div></div>';
 }else{
   extra='<div class="history-facts"><div class="history-fact"><span>Map geometry</span><strong>Country geometry</strong></div><div class="history-fact"><span>Historical boundary certainty</span><strong>Source-dependent</strong></div></div>';
 }
 const timelineStart=inception?yearOf(inception):-5000,timelineEnd=extinction?yearOf(extinction):2026;
 const slider=document.querySelector("#history-slider"),yearInput=document.querySelector("#history-year"),current=document.querySelector("#history-current"); if(slider){slider.min=String(Math.min(timelineStart,2026));slider.max=String(Math.max(timelineEnd,2026));slider.value=String(y);if(current)current.textContent=String(y);if(yearInput)yearInput.value=String(y)}
 ins.innerHTML='<h3>'+esc(name)+'</h3><p>'+esc(desc)+'</p>'+extra+'<div class="history-facts"><div class="history-fact"><span>Origin / inception</span><strong>'+esc(inception?formatYear(yearOf(inception)):"Unknown")+'</strong></div><div class="history-fact"><span>End / extinction</span><strong>'+esc(extinction?formatYear(yearOf(extinction)):"Not recorded")+'</strong></div><div class="history-fact"><span>Timeline</span><strong>'+esc(formatYear(timelineStart))+' → '+esc(formatYear(timelineEnd))+'</strong></div><div class="history-fact"><span>Coordinates</span><strong>'+esc(coords||"Not recorded")+'</strong></div></div><div class="history-sources">Structured data: <a target="_blank" rel="noopener" href="https://www.wikidata.org/wiki/'+encodeURIComponent(qid)+'">Wikidata '+esc(qid)+'</a>. Time filters use statement qualifiers where available; missing historical boundaries are not invented.</div>';
}
function initExplorer(){
 const root=document.querySelector("#history-explorer");if(!root)return;
 document.querySelectorAll(".explorer-tab").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".explorer-tab").forEach(x=>x.classList.remove("active"));b.classList.add("active");explorerMode=b.dataset.mode;renderExplorer()}));
 const slider=document.querySelector("#history-slider"),year=document.querySelector("#history-year"),cur=document.querySelector("#history-current");
 slider?.addEventListener("input",()=>{year.value=slider.value;cur.textContent=slider.value;renderExplorer()});
 year?.addEventListener("change",()=>{slider.value=year.value;cur.textContent=year.value});
 document.querySelector("#history-apply")?.addEventListener("click",renderExplorer);
 document.querySelector("#history-now")?.addEventListener("click",()=>{year.value=2026;slider.value=2026;cur.textContent="2026";renderExplorer()});
 renderExplorer();
}
function initWorldMap(){
 if(!mapEl||typeof L==="undefined")return;
 leafletMap=L.map("world-map",{worldCopyJump:true,zoomControl:false,minZoom:1,maxZoom:10,preferCanvas:true,zoomSnap:.25,zoomDelta:.5}).setView([20,0],2);
 L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap contributors"}).addTo(leafletMap);
 fetch("world.geojson",{cache:"no-store"}).then(async res=>{if(!res.ok)throw Error("world.geojson "+res.status);return res.json()}).then(geo=>{
   geoLayer=L.geoJSON(geo,{style:countryStyle,onEachFeature:(feature,layer)=>{
     layer.on({click:()=>focusCountry(layer),mouseover:()=>{if(layer!==selectedLayer)styleLayer(layer,{weight:2.2,fillOpacity:1})},mouseout:()=>{if(layer!==selectedLayer)styleLayer(layer,countryStyle(feature))}});
     const n=aliases[feature.properties?.name]||feature.properties?.name||"";
     layer.bindTooltip(n,{sticky:true,direction:"top",opacity:.94});
   }}).addTo(leafletMap);
   leafletMap.fitBounds([[-58,-180],[82,180]],{padding:[10,10]});
   document.querySelector("#map-zoom-in")?.addEventListener("click",()=>leafletMap.zoomIn());
   document.querySelector("#map-zoom-out")?.addEventListener("click",()=>leafletMap.zoomOut());
   document.querySelector("#map-reset")?.addEventListener("click",resetMap);
 }).catch(err=>{mapEl.innerHTML='<div class="map-error">Քարտեզի տվյալները չբեռնվեցին։</div>';console.error(err)});
}
document.body.classList.add("map-only-page");
initWorldMap();
setTimeout(initExplorer,250);
