const countries=["Աֆղանստան","Ալբանիա","Ալժիր","Անդորրա","Անգոլա","Անտիգուա և Բարբուդա","Արգենտինա","Հայաստան","Ավստրալիա","Ավստրիա","Ադրբեջան","Բահամներ","Բահրեյն","Բանգլադեշ","Բարբադոս","Բելառուս","Բելգիա","Բելիզ","Բենին","Բութան","Բոլիվիա","Բոսնիա և Հերցեգովինա","Բոտսվանա","Բրազիլիա","Բրունեյ","Բուլղարիա","Բուրկինա Ֆասո","Բուրունդի","Կաբո Վերդե","Կամբոջա","Կամերուն","Կանադա","Կենտրոնական Աֆրիկյան Հանրապետություն","Չադ","Չիլի","Չինաստան","Կոլումբիա","Կոմորներ","Կոնգոյի Հանրապետություն","Կոստա Ռիկա","Կոտ դ'Իվուար","Խորվաթիա","Կուբա","Կիպրոս","Չեխիա","Կոնգոյի Դեմոկրատական Հանրապետություն","Դանիա","Ջիբութի","Դոմինիկա","Դոմինիկյան Հանրապետություն","Էկվադոր","Եգիպտոս","Էլ Սալվադոր","Հասարակածային Գվինեա","Էրիթրեա","Էստոնիա","Էսվատինի","Եթովպիա","Ֆիջի","Ֆինլանդիա","Ֆրանսիա","Գաբոն","Գամբիա","Վրաստան","Գերմանիա","Գանա","Հունաստան","Գրենադա","Գվատեմալա","Գվինեա","Գվինեա-Բիսաու","Գայանա","Հաիթի","Հոնդուրաս","Հունգարիա","Իսլանդիա","Հնդկաստան","Ինդոնեզիա","Իրան","Իրաք","Իռլանդիա","Իսրայել","Իտալիա","Ճամայկա","Ճապոնիա","Հորդանան","Ղազախստան","Քենիա","Կիրիբատի","Քուվեյթ","Ղրղզստան","Լաոս","Լատվիա","Լիբանան","Լեսոտո","Լիբերիա","Լիբիա","Լիխտենշտայն","Լիտվա","Լյուքսեմբուրգ","Մադագասկար","Մալավի","Մալայզիա","Մալդիվներ","Մալի","Մալթա","Մարշալյան կղզիներ","Մավրիտանիա","Մավրիկիոս","Մեքսիկա","Միկրոնեզիայի Դաշնային Նահանգներ","Մոլդովա","Մոնակո","Մոնղոլիա","Մոնտենեգրո","Մարոկկո","Մոզամբիկ","Մյանմա","Նամիբիա","Նաուրու","Նեպալ","Նիդերլանդներ","Նոր Զելանդիա","Նիկարագուա","Նիգեր","Նիգերիա","Հյուսիսային Կորեա","Հյուսիսային Մակեդոնիա","Նորվեգիա","Օման","Պակիստան","Պալաու","Պանամա","Պապուա Նոր Գվինեա","Պարագվայ","Պերու","Ֆիլիպիններ","Լեհաստան","Պորտուգալիա","Կատար","Ռումինիա","Ռուսաստան","Ռուանդա","Սենթ Քիթս և Նևիս","Սենթ Լյուսիա","Սենթ Վինսենթ և Գրենադիններ","Սամոա","Սան Մարինո","Սան Տոմե և Պրինսիպի","Սաուդյան Արաբիա","Սենեգալ","Սերբիա","Սեյշելներ","Սիերա Լեոնե","Սինգապուր","Սլովակիա","Սլովենիա","Սողոմոնյան կղզիներ","Սոմալի","Հարավային Աֆրիկա","Հարավային Կորեա","Հարավային Սուդան","Իսպանիա","Շրի Լանկա","Սուդան","Սուրինամ","Շվեդիա","Շվեյցարիա","Սիրիա","Տաջիկստան","Տանզանիա","Թաիլանդ","Թիմոր-Լեստե","Տոգո","Տոնգա","Տրինիդադ և Տոբագո","Թունիս","Թուրքիա","Թուրքմենստան","Տուվալու","Ուգանդա","Ուկրաինա","ԱՄԷ","Միացյալ Թագավորություն","ԱՄՆ","Ուրուգվայ","Ուզբեկստան","Վանուատու","Վատիկան","Վենեսուելա","Վիետնամ","Եմեն","Զամբիա","Զիմբաբվե"];
const data={"Հայաստան":{continent:"Ասիա",peoples:[{name:"Հայեր",areas:["ամբողջ երկրում"],language:"Հայերեն",religion:"Կցուցադրվի աղբյուրով և տարեթվով"}]}};
const aliases={"United States of America":"ԱՄՆ","United States":"ԱՄՆ","Russia":"Ռուսաստան","Türkiye":"Թուրքիա","Turkey":"Թուրքիա","Armenia":"Հայաստան","Azerbaijan":"Ադրբեջան","Georgia":"Վրաստան","Iran":"Իրան","Iraq":"Իրաք","China":"Չինաստան","India":"Հնդկաստան","Japan":"Ճապոնիա","Germany":"Գերմանիա","France":"Ֆրանսիա","Italy":"Իտալիա","Spain":"Իսպանիա","United Kingdom":"Միացյալ Թագավորություն","Canada":"Կանադա","Mexico":"Մեքսիկա","Brazil":"Բրազիլիա","Australia":"Ավստրալիա"};
const list=document.querySelector("#country-list"); countries.forEach(n=>{const b=document.createElement("button");b.className="country-item";b.textContent=n;b.onclick=()=>selectCountry(n);list.appendChild(b)});
function selectCountry(n){document.querySelector("#map-status").textContent=n;document.querySelectorAll(".country-item").forEach(b=>b.classList.toggle("active",b.textContent===n));const d=data[n];document.querySelector("#country-panel").innerHTML=`<div class="country-title"><span class="flag-dot"></span><div><small>ՊԵՏՈՒԹՅՈՒՆ</small><h3>${n}</h3></div></div><div class="detail-grid"><div><small>Մայրցամաք</small><strong>${d?.continent||"Տվյալը կավելացվի"}</strong></div><div><small>Տարածքային բաժանում</small><strong>Կցուցադրվի ըստ աղբյուրների</strong></div></div><div class="detail-section"><h4>Ազգեր և ժողովուրդներ</h4>${d?.peoples?.map(p=>`<article class="people-card"><h5>${p.name}</h5><p><b>Տարածք․</b> ${p.areas.join(", ")}</p><p><b>Լեզու․</b> ${p.language}</p><p><b>Կրոն․</b> ${p.religion}</p></article>`).join("")||'<div class="placeholder">Այս պետության ազգաբանական տվյալների բաժինը պատրաստ է լրացման։</div>'}</div><div class="detail-section"><h4>Նյութեր</h4><div class="chips"><span>Նկարներ</span><span>Տեսանյութեր</span><span>Փաստաթղթեր</span></div></div>`};


// Real OpenStreetMap map using Leaflet.
// The base layer is the actual OSM map; the country boundary overlay is used
// only for selecting/highlighting countries.
const map = L.map("world-map", {
  center: [20, 0],
  zoom: 2,
  minZoom: 2,
  maxZoom: 18,
  worldCopyJump: false,
  zoomControl: true
});

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

let countryLayer;
let selectedLayer;

const geoAliases = {
  "United States of America":"ԱՄՆ","Russia":"Ռուսաստան","Türkiye":"Թուրքիա","Turkey":"Թուրքիա",
  "Armenia":"Հայաստան","Azerbaijan":"Ադրբեջան","Georgia":"Վրաստան","Iran":"Իրան","Iraq":"Իրաք",
  "China":"Չինաստան","India":"Հնդկաստան","Japan":"Ճապոնիա","Germany":"Գերմանիա","France":"Ֆրանսիա",
  "Italy":"Իտալիա","Spain":"Իսպանիա","United Kingdom":"Միացյալ Թագավորություն","Canada":"Կանադա",
  "Mexico":"Մեքսիկա","Brazil":"Բրազիլիա","Australia":"Ավստրալիա"
};

function featureCountryName(feature){
  const p=feature.properties||{};
  return geoAliases[p.ADMIN]||geoAliases[p.NAME_EN]||geoAliases[p.NAME]||p.ADMIN||p.NAME_EN||p.NAME;
}

function normalStyle(){
  return {color:"#777",weight:0.8,fillColor:"#9b3d2e",fillOpacity:0.04};
}
function selectedStyle(){
  return {color:"#7d2f23",weight:2,fillColor:"#9b3d2e",fillOpacity:0.45};
}
function chooseFeature(layer, feature){
  const name=featureCountryName(feature);
  if(selectedLayer) selectedLayer.setStyle(normalStyle());
  selectedLayer=layer;
  layer.setStyle(selectedStyle());
  selectCountry(name);
  const bounds=layer.getBounds();
  if(bounds.isValid()) map.fitBounds(bounds.pad(0.35),{maxZoom:7,animate:true});
}

fetch("https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson")
  .then(r=>{if(!r.ok) throw new Error("Country boundaries unavailable");return r.json();})
  .then(geojson=>{
    countryLayer=L.geoJSON(geojson,{
      style:normalStyle,
      onEachFeature:(feature,layer)=>{
        layer.on({
          mouseover:()=>{if(layer!==selectedLayer) layer.setStyle({color:"#333",weight:1.4,fillColor:"#9b3d2e",fillOpacity:0.15});},
          mouseout:()=>{if(layer!==selectedLayer) layer.setStyle(normalStyle());},
          click:()=>chooseFeature(layer,feature)
        });
      }
    }).addTo(map);
  })
  .catch(err=>{
    console.error(err);
    const status=document.querySelector("#map-status");
    if(status) status.textContent="Քարտեզը բեռնվեց, սահմանները՝ ժամանակավորապես անհասանելի";
  });

const originalSelectCountry = selectCountry;
selectCountry = function(n){
  originalSelectCountry(n);
  if(!countryLayer) return;
  countryLayer.eachLayer(layer=>{
    const name=featureCountryName(layer.feature);
    if(name===n){
      if(selectedLayer) selectedLayer.setStyle(normalStyle());
      selectedLayer=layer;
      layer.setStyle(selectedStyle());
      const bounds=layer.getBounds();
      if(bounds.isValid()) map.fitBounds(bounds.pad(0.35),{maxZoom:7,animate:true});
    }
  });
};
map.whenReady(()=>setTimeout(()=>map.invalidateSize(),150));
