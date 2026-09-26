const countries=["Աֆղանստան","Ալբանիա","Ալժիր","Անդորրա","Անգոլա","Անտիգուա և Բարբուդա","Արգենտինա","Հայաստան","Ավստրալիա","Ավստրիա","Ադրբեջան","Բահամներ","Բահրեյն","Բանգլադեշ","Բարբադոս","Բելառուս","Բելգիա","Բելիզ","Բենին","Բութան","Բոլիվիա","Բոսնիա և Հերցեգովինա","Բոտսվանա","Բրազիլիա","Բրունեյ","Բուլղարիա","Բուրկինա Ֆասո","Բուրունդի","Կաբո Վերդե","Կամբոջա","Կամերուն","Կանադա","Կենտրոնական Աֆրիկյան Հանրապետություն","Չադ","Չիլի","Չինաստան","Կոլումբիա","Կոմորներ","Կոնգոյի Հանրապետություն","Կոստա Ռիկա","Կոտ դ'Իվուար","Խորվաթիա","Կուբա","Կիպրոս","Չեխիա","Կոնգոյի Դեմոկրատական Հանրապետություն","Դանիա","Ջիբութի","Դոմինիկա","Դոմինիկյան Հանրապետություն","Էկվադոր","Եգիպտոս","Էլ Սալվադոր","Հասարակածային Գվինեա","Էրիթրեա","Էստոնիա","Էսվատինի","Եթովպիա","Ֆիջի","Ֆինլանդիա","Ֆրանսիա","Գաբոն","Գամբիա","Վրաստան","Գերմանիա","Գանա","Հունաստան","Գրենադա","Գվատեմալա","Գվինեա","Գվինեա-Բիսաու","Գայանա","Հաիթի","Հոնդուրաս","Հունգարիա","Իսլանդիա","Հնդկաստան","Ինդոնեզիա","Իրան","Իրաք","Իռլանդիա","Իսրայել","Իտալիա","Ճամայկա","Ճապոնիա","Հորդանան","Ղազախստան","Քենիա","Կիրիբատի","Քուվեյթ","Ղրղզստան","Լաոս","Լատվիա","Լիբանան","Լեսոտո","Լիբերիա","Լիբիա","Լիխտենշտայն","Լիտվա","Լյուքսեմբուրգ","Մադագասկար","Մալավի","Մալայզիա","Մալդիվներ","Մալի","Մալթա","Մարշալյան կղզիներ","Մավրիտանիա","Մավրիկիոս","Մեքսիկա","Միկրոնեզիայի Դաշնային Նահանգներ","Մոլդովա","Մոնակո","Մոնղոլիա","Մոնտենեգրո","Մարոկկո","Մոզամբիկ","Մյանմա","Նամիբիա","Նաուրու","Նեպալ","Նիդերլանդներ","Նոր Զելանդիա","Նիկարագուա","Նիգեր","Նիգերիա","Հյուսիսային Կորեա","Հյուսիսային Մակեդոնիա","Նորվեգիա","Օման","Պակիստան","Պալաու","Պանամա","Պապուա Նոր Գվինեա","Պարագվայ","Պերու","Ֆիլիպիններ","Լեհաստան","Պորտուգալիա","Կատար","Ռումինիա","Ռուսաստան","Ռուանդա","Սենթ Քիթս և Նևիս","Սենթ Լյուսիա","Սենթ Վինսենթ և Գրենադիններ","Սամոա","Սան Մարինո","Սան Տոմե և Պրինսիպի","Սաուդյան Արաբիա","Սենեգալ","Սերբիա","Սեյշելներ","Սիերա Լեոնե","Սինգապուր","Սլովակիա","Սլովենիա","Սողոմոնյան կղզիներ","Սոմալի","Հարավային Աֆրիկա","Հարավային Կորեա","Հարավային Սուդան","Իսպանիա","Շրի Լանկա","Սուդան","Սուրինամ","Շվեդիա","Շվեյցարիա","Սիրիա","Տաջիկստան","Տանզանիա","Թաիլանդ","Թիմոր-Լեստե","Տոգո","Տոնգա","Տրինիդադ և Տոբագո","Թունիս","Թուրքիա","Թուրքմենստան","Տուվալու","Ուգանդա","Ուկրաինա","ԱՄԷ","Միացյալ Թագավորություն","ԱՄՆ","Ուրուգվայ","Ուզբեկստան","Վանուատու","Վատիկան","Վենեսուելա","Վիետնամ","Եմեն","Զամբիա","Զիմբաբվե"];
const data={"Հայաստան":{continent:"Ասիա",peoples:[{name:"Հայեր",areas:["ամբողջ երկրում"],language:"Հայերեն",religion:"Կցուցադրվի աղբյուրով և տարեթվով"}]}};
const aliases={"United States of America":"ԱՄՆ","United States":"ԱՄՆ","Russia":"Ռուսաստան","Türkiye":"Թուրքիա","Turkey":"Թուրքիա","Armenia":"Հայաստան","Azerbaijan":"Ադրբեջան","Georgia":"Վրաստան","Iran":"Իրան","Iraq":"Իրաք","China":"Չինաստան","India":"Հնդկաստան","Japan":"Ճապոնիա","Germany":"Գերմանիա","France":"Ֆրանսիա","Italy":"Իտալիա","Spain":"Իսպանիա","United Kingdom":"Միացյալ Թագավորություն","Canada":"Կանադա","Mexico":"Մեքսիկա","Brazil":"Բրազիլիա","Australia":"Ավստրալիա"};

const WIKIDATA_API="https://www.wikidata.org/w/api.php",WDQS="https://query.wikidata.org/sparql";
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const isoFlag=iso=>String(iso||"").length===2?[...iso.toUpperCase()].map(c=>String.fromCodePoint(c.charCodeAt(0)+127397)).join(""):"";
const claimId=c=>c?.mainsnak?.datavalue?.value?.id||"";
const claimText=c=>c?.mainsnak?.datavalue?.value?.amount?Number(c.mainsnak.datavalue.value.amount).toLocaleString("en-US"):claimId(c)||"";
const timeText=v=>{if(!v)return null;const s=v.time||v;const m=String(s).match(/[-+](\d{1,6})/);if(!m)return null;return Number(m[1])<0?Math.abs(Number(m[1]))+" մ.թ.ա.":m[1]+" թ."};
const prop=(claims,p)=>Array.isArray(claims?.[p])?claims[p]:[];
async function wikidataSearch(name){
 const title=String(name||"").trim();
 const u="https://en.wikipedia.org/w/api.php?action=query&prop=pageprops&redirects=1&titles="+encodeURIComponent(title)+"&format=json&origin=*";
 const res=await fetch(u);
 const text=await res.text();
 if(!res.ok||!text.trim().startsWith("{"))throw Error("Wikipedia API "+res.status);
 const j=JSON.parse(text);
 const pages=Object.values(j.query?.pages||{});
 const p=pages.find(x=>x.pageprops?.wikibase_item);
 return p?{id:p.pageprops.wikibase_item,label:p.title}:null;
}
function normalizeRestEntity(j,id){
 const src=j?.id?id:j?.id;
 if(!src)return null;
 const claims={};
 for(const [pid,items] of Object.entries(j.statements||{})){
  claims[pid]=items.map(s=>({rank:s.rank||"normal",mainsnak:{snaktype:"value",datavalue:s.value?.type?{value:s.value.value,type:s.value.type}:undefined},qualifiers:s.qualifiers||{}}));
 }
 const labels={};
 for(const [lang,v] of Object.entries(j.labels||{}))labels[lang]={language:lang,value:v};
 return {id:src,labels,claims,search:{id:src,label:j.labels?.en||j.labels?.hy||src}};
}
async function wikidataEntity(name){
 const hit=await wikidataSearch(name); if(!hit)return null;
 const urls=[
  "https://www.wikidata.org/wiki/Special:EntityData/"+encodeURIComponent(hit.id)+".json",
  "https://www.wikidata.org/w/rest.php/wikibase/v1/entities/items/"+encodeURIComponent(hit.id)
 ];
 for(const u of urls){
  try{
   const res=await fetch(u,{headers:{"Accept":"application/json"}});
   const text=await res.text();
   if(!res.ok||!text.trim().startsWith("{"))continue;
   const j=JSON.parse(text);
   const e=j.entities?.[hit.id];
   if(e)return {...e,search:hit};
   const rest=normalizeRestEntity(j,hit.id);
   if(rest)return rest;
  }catch(_){}
 }
 return null;
}
async function sparql(query){const u=WDQS+"?format=json&query="+encodeURIComponent(query);const r=await fetch(u,{headers:{Accept:"application/sparql-results+json"}});if(!r.ok)throw Error("WDQS "+r.status);return(await r.json()).results?.bindings||[]}
function latestPopulation(claims){const rows=prop(claims,"P1082").map(c=>({v:claimText(c),date:c.qualifiers?.P585?.[0]?.datavalue?.value?.time||""})).filter(x=>x.v);rows.sort((a,b)=>Number((b.date.match(/[-+]\d+/)||["0"])[0])-Number((a.date.match(/[-+]\d+/)||["0"])[0]));return rows[0]||null}
function labelFromEntity(e,id){return e?.[id]?.labels?.hy?.value||e?.[id]?.labels?.en?.value||id}
function refsNote(){return '<p class="source-note">Աղբյուր՝ Wikidata։ Տվյալների առկայությունը, չափման մեթոդը և թարմությունը կախված են աղբյուրային գրառումներից։</p>'}
async function communityData(qid){
 const ethnic=await sparql('SELECT ?ethnic ?ethnicLabel ?value ?date WHERE { wd:'+qid+' p:P172 ?st. ?st ps:P172 ?ethnic. OPTIONAL{?st pq:P1107 ?value.} OPTIONAL{?st pq:P585 ?date.} SERVICE wikibase:label{bd:serviceParam wikibase:language "hy,en".}} LIMIT 40').catch(()=>[]);
 const religions=await sparql('SELECT ?religion ?religionLabel ?value ?date WHERE { wd:'+qid+' p:P140 ?st. ?st ps:P140 ?religion. OPTIONAL{?st pq:P1107 ?value.} OPTIONAL{?st pq:P585 ?date.} SERVICE wikibase:label{bd:serviceParam wikibase:language "hy,en".}} LIMIT 40').catch(()=>[]);
 return {ethnic,religions}
}
function rowsHtml(rows,type){
 const seen=new Set();
 return rows.map(x=>{
  const id=x[type]?.value||""; if(!id||seen.has(id))return ""; seen.add(id);
  const n=x[type+"Label"]?.value||id;
  const pct=x.value?.value!=null?((Number(x.value.value)*100).toFixed(2).replace(/\.?0+$/,"")+"%"):"Տոկոսը նշված չէ";
  const d=x.date?.value?timeText(x.date.value):"";
  return '<div class="stat-row"><strong>'+esc(n)+'</strong><span>'+pct+(d?" · "+esc(d):"")+'</span></div>';
 }).join("")||'<div class="placeholder">Այս երկրի համար այս կատեգորիայի կառուցվածքային տոկոսային տվյալ չի գտնվել։</div>'
}
async function renderCountry(name,iso){
 const panel=document.querySelector("#country-panel");if(!panel)return;panel.innerHTML='<div class="loading-state"><div class="loader"></div><h3>'+esc(name)+'</h3><p>Բեռնվում են աղբյուրային տվյալները…</p></div>';document.querySelectorAll(".country-item").forEach(b=>b.classList.toggle("active",b.textContent===name));
 try{
  const e=await wikidataEntity(name);if(!e){panel.innerHTML='<div class="placeholder">Այս պետության Wikidata գրառումը չգտնվեց։</div>';return}
  const c=e.claims||{},pop=latestPopulation(c),qid=e.id,capital=claimId(prop(c,"P36")[0]),area=prop(c,"P2046")[0]?.mainsnak?.datavalue?.value?.amount;
  const langIds=prop(c,"P37").map(claimId).filter(Boolean).slice(0,8),relIds=prop(c,"P140").map(claimId).filter(Boolean).slice(0,8),ids=[...new Set([capital,...langIds,...relIds].filter(Boolean))];let labels={};
  if(ids.length){try{const res=await fetch(WIKIDATA_API+"?action=wbgetentities&ids="+ids.join("|")+"&props=labels&languages=hy|en&format=json&origin=*",{headers:{Accept:"application/json"}});const text=await res.text();if(text.trim().startsWith("{"))labels=JSON.parse(text).entities||{}}catch(_){}}
  const comm=await communityData(qid),popDate=pop?.date?timeText({time:pop.date}):"աղբյուրի ամսաթիվը նշված չէ";
  panel.innerHTML='<div class="country-title"><span class="flag-dot">'+isoFlag(iso)+'</span><div><small>ՊԵՏՈՒԹՅՈՒՆ · '+esc(e.id)+'</small><h3>'+esc(name)+'</h3></div></div><div class="detail-grid"><div><small>Բնակչություն</small><strong>'+(pop?esc(pop.v)+" · "+esc(popDate):"Տվյալը հասանելի չէ")+'</strong></div><div><small>Տարածք</small><strong>'+(area?Number(area).toLocaleString("en-US")+" կմ²":"Տվյալը հասանելի չէ")+'</strong></div><div><small>Մայրաքաղաք</small><strong>'+(capital?esc(labelFromEntity(labels,capital)):"Տվյալը հասանելի չէ")+'</strong></div><div><small>Լեզուներ</small><strong>'+(langIds.map(id=>esc(labelFromEntity(labels,id))).join(", ")||"Տվյալը հասանելի չէ")+'</strong></div></div><div class="detail-section"><h4>Էթնիկ խմբեր / ազգաբանական համայնքներ</h4><div class="stat-list">'+rowsHtml(comm.ethnic,"ethnic")+'</div></div><div class="detail-section"><h4>Կրոններ / աշխարհայացքներ</h4><div class="stat-list">'+rowsHtml(comm.religions,"religion")+'</div></div><div class="detail-section"><h4>Կրոնական տվյալներ պետության գրառումից</h4><div class="chips">'+(relIds.map(id=>'<span>'+esc(labelFromEntity(labels,id))+'</span>').join("")||"<span>Չկա</span>")+'</div></div>'+refsNote()+'<div class="chips"><a target="_blank" rel="noopener" href="https://www.wikidata.org/wiki/'+encodeURIComponent(qid)+'">Wikidata ↗</a><span>Նկարներ</span><span>Տեսանյութեր</span><span>Փաստաթղթեր</span></div>';
 }catch(err){console.error(err);panel.innerHTML='<div class="placeholder">Տվյալների բեռնումը չհաջողվեց։ Փորձիր կրկին։</div>'}
}


document.body.classList.add("map-only-page");
const mapEl=document.querySelector("#world-map"),mapStatus=document.querySelector("#map-status");let leafletMap=null,geoLayer=null,selectedLayer=null;
const countryStyle=feature=>{const seed=String(feature?.properties?.name||"").split("").reduce((a,c)=>a+c.charCodeAt(0),0);const palette=["#dcecf3","#f5e5ca","#e5efd7","#efdfeb","#dbe7f6","#f1e8d3","#dceaea","#eadfd5"];return{color:"#fff",weight:1.1,fillColor:palette[seed%palette.length],fillOpacity:.82}};
const countryName=layer=>layer?.feature?.properties?.name||"";
const styleLayer=(layer,style)=>{if(layer&&typeof layer.setStyle==="function")layer.setStyle(style)};
function focusCountry(layer){if(!leafletMap||!layer)return;if(selectedLayer&&selectedLayer!==layer)styleLayer(selectedLayer,countryStyle(selectedLayer.feature));selectedLayer=layer;styleLayer(layer,{color:"#8f2f22",weight:3,fillColor:"#d96b45",fillOpacity:.96});if(typeof layer.bringToFront==="function")layer.bringToFront();const name=aliases[countryName(layer)]||countryName(layer);if(mapStatus)mapStatus.textContent=name;renderCountry(name,layer.feature?.properties?.iso);const b=layer.getBounds();if(b.isValid())leafletMap.flyToBounds(b,{paddingTopLeft:[20,20],paddingBottomRight:[380,35],maxZoom:7,duration:.9})}
function resetMap(){if(!leafletMap)return;if(selectedLayer){styleLayer(selectedLayer,countryStyle(selectedLayer.feature));selectedLayer=null}leafletMap.flyToBounds([[-58,-180],[82,180]],{padding:[10,10],maxZoom:2,duration:.8});if(mapStatus)mapStatus.textContent="Ամբողջ աշխարհ"}
async function initWorldMap(){if(!mapEl||typeof L==="undefined")return;leafletMap=L.map("world-map",{worldCopyJump:true,zoomControl:false,minZoom:1,maxZoom:10,preferCanvas:true,zoomSnap:.25,zoomDelta:.5}).setView([20,0],2);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap contributors"}).addTo(leafletMap);try{const res=await fetch("world.geojson",{cache:"no-store"});if(!res.ok)throw Error("world.geojson "+res.status);const geo=await res.json();geoLayer=L.geoJSON(geo,{style:countryStyle,onEachFeature:(feature,layer)=>{layer.on({click:()=>focusCountry(layer),mouseover:()=>{if(layer!==selectedLayer)styleLayer(layer,{weight:2.2,fillOpacity:1})},mouseout:()=>{if(layer!==selectedLayer)styleLayer(layer,countryStyle(feature))}});const n=aliases[feature.properties?.name]||feature.properties?.name||"";layer.bindTooltip(n,{sticky:true,direction:"top"})}}).addTo(leafletMap);leafletMap.fitBounds([[-58,-180],[82,180]],{padding:[10,10]});document.querySelector("#map-zoom-in")?.addEventListener("click",()=>leafletMap.zoomIn());document.querySelector("#map-zoom-out")?.addEventListener("click",()=>leafletMap.zoomOut());document.querySelector("#map-reset")?.addEventListener("click",resetMap)}catch(err){mapEl.innerHTML='<div class="map-error">Քարտեզի տվյալները չբեռնվեցին։</div>';console.error(err)}}
initWorldMap();


