const countries=["Աֆղանստան","Ալբանիա","Ալժիր","Անդորրա","Անգոլա","Անտիգուա և Բարբուդա","Արգենտինա","Հայաստան","Ավստրալիա","Ավստրիա","Ադրբեջան","Բահամներ","Բահրեյն","Բանգլադեշ","Բարբադոս","Բելառուս","Բելգիա","Բելիզ","Բենին","Բութան","Բոլիվիա","Բոսնիա և Հերցեգովինա","Բոտսվանա","Բրազիլիա","Բրունեյ","Բուլղարիա","Բուրկինա Ֆասո","Բուրունդի","Կաբո Վերդե","Կամբոջա","Կամերուն","Կանադա","Կենտրոնական Աֆրիկյան Հանրապետություն","Չադ","Չիլի","Չինաստան","Կոլումբիա","Կոմորներ","Կոնգոյի Հանրապետություն","Կոստա Ռիկա","Կոտ դ'Իվուար","Խորվաթիա","Կուբա","Կիպրոս","Չեխիա","Կոնգոյի Դեմոկրատական Հանրապետություն","Դանիա","Ջիբութի","Դոմինիկա","Դոմինիկյան Հանրապետություն","Էկվադոր","Եգիպտոս","Էլ Սալվադոր","Հասարակածային Գվինեա","Էրիթրեա","Էստոնիա","Էսվատինի","Եթովպիա","Ֆիջի","Ֆինլանդիա","Ֆրանսիա","Գաբոն","Գամբիա","Վրաստան","Գերմանիա","Գանա","Հունաստան","Գրենադա","Գվատեմալա","Գվինեա","Գվինեա-Բիսաու","Գայանա","Հաիթի","Հոնդուրաս","Հունգարիա","Իսլանդիա","Հնդկաստան","Ինդոնեզիա","Իրան","Իրաք","Իռլանդիա","Իսրայել","Իտալիա","Ճամայկա","Ճապոնիա","Հորդանան","Ղազախստան","Քենիա","Կիրիբատի","Քուվեյթ","Ղրղզստան","Լաոս","Լատվիա","Լիբանան","Լեսոտո","Լիբերիա","Լիբիա","Լիխտենշտայն","Լիտվա","Լյուքսեմբուրգ","Մադագասկար","Մալավի","Մալայզիա","Մալդիվներ","Մալի","Մալթա","Մարշալյան կղզիներ","Մավրիտանիա","Մավրիկիոս","Մեքսիկա","Միկրոնեզիայի Դաշնային Նահանգներ","Մոլդովա","Մոնակո","Մոնղոլիա","Մոնտենեգրո","Մարոկկո","Մոզամբիկ","Մյանմա","Նամիբիա","Նաուրու","Նեպալ","Նիդերլանդներ","Նոր Զելանդիա","Նիկարագուա","Նիգեր","Նիգերիա","Հյուսիսային Կորեա","Հյուսիսային Մակեդոնիա","Նորվեգիա","Օման","Պակիստան","Պալաու","Պանամա","Պապուա Նոր Գվինեա","Պարագվայ","Պերու","Ֆիլիպիններ","Լեհաստան","Պորտուգալիա","Կատար","Ռումինիա","Ռուսաստան","Ռուանդա","Սենթ Քիթս և Նևիս","Սենթ Լյուսիա","Սենթ Վինսենթ և Գրենադիններ","Սամոա","Սան Մարինո","Սան Տոմե և Պրինսիպի","Սաուդյան Արաբիա","Սենեգալ","Սերբիա","Սեյշելներ","Սիերա Լեոնե","Սինգապուր","Սլովակիա","Սլովենիա","Սողոմոնյան կղզիներ","Սոմալի","Հարավային Աֆրիկա","Հարավային Կորեա","Հարավային Սուդան","Իսպանիա","Շրի Լանկա","Սուդան","Սուրինամ","Շվեդիա","Շվեյցարիա","Սիրիա","Տաջիկստան","Տանզանիա","Թաիլանդ","Թիմոր-Լեստե","Տոգո","Տոնգա","Տրինիդադ և Տոբագո","Թունիս","Թուրքիա","Թուրքմենստան","Տուվալու","Ուգանդա","Ուկրաինա","ԱՄԷ","Միացյալ Թագավորություն","ԱՄՆ","Ուրուգվայ","Ուզբեկստան","Վանուատու","Վատիկան","Վենեսուելա","Վիետնամ","Եմեն","Զամբիա","Զիմբաբվե"];
const data={"Հայաստան":{continent:"Ասիա",peoples:[{name:"Հայեր",areas:["ամբողջ երկրում"],language:"Հայերեն",religion:"Կցուցադրվի աղբյուրով և տարեթվով"}]}};
const aliases={"United States of America":"ԱՄՆ","United States":"ԱՄՆ","Russia":"Ռուսաստան","Türkiye":"Թուրքիա","Turkey":"Թուրքիա","Armenia":"Հայաստան","Azerbaijan":"Ադրբեջան","Georgia":"Վրաստան","Iran":"Իրան","Iraq":"Իրաք","China":"Չինաստան","India":"Հնդկաստան","Japan":"Ճապոնիա","Germany":"Գերմանիա","France":"Ֆրանսիա","Italy":"Իտալիա","Spain":"Իսպանիա","United Kingdom":"Միացյալ Թագավորություն","Canada":"Կանադա","Mexico":"Մեքսիկա","Brazil":"Բրազիլիա","Australia":"Ավստրալիա"};
const list=document.querySelector("#country-list"); if(list){countries.forEach(n=>{const b=document.createElement("button");b.className="country-item";b.textContent=n;b.onclick=()=>selectCountry(n);list.appendChild(b)});}
function selectCountry(n){document.querySelector("#map-status").textContent=n;document.querySelectorAll(".country-item").forEach(b=>b.classList.toggle("active",b.textContent===n));const d=data[n];document.querySelector("#country-panel").innerHTML=`<div class="country-title"><span class="flag-dot"></span><div><small>ՊԵՏՈՒԹՅՈՒՆ</small><h3>${n}</h3></div></div><div class="detail-grid"><div><small>Մայրցամաք</small><strong>${d?.continent||"Տվյալը կավելացվի"}</strong></div><div><small>Տարածքային բաժանում</small><strong>Կցուցադրվի ըստ աղբյուրների</strong></div></div><div class="detail-section"><h4>Ազգեր և ժողովուրդներ</h4>${d?.peoples?.map(p=>`<article class="people-card"><h5>${p.name}</h5><p><b>Տարածք․</b> ${p.areas.join(", ")}</p><p><b>Լեզու․</b> ${p.language}</p><p><b>Կրոն․</b> ${p.religion}</p></article>`).join("")||'<div class="placeholder">Այս պետության ազգաբանական տվյալների բաժինը պատրաստ է լրացման։</div>'}</div><div class="detail-section"><h4>Նյութեր</h4><div class="chips"><span>Նկարներ</span><span>Տեսանյութեր</span><span>Փաստաթղթեր</span></div></div>`};

/* Leaflet + OpenStreetMap world map */
const countryAliases={
 "United States of America":"ԱՄՆ","United States":"ԱՄՆ","Canada":"Կանադա","Mexico":"Մեքսիկա",
 "Brazil":"Բրազիլիա","Argentina":"Արգենտինա","Chile":"Չիլի","Peru":"Պերու","Colombia":"Կոլումբիա",
 "Venezuela":"Վենեսուելա","Bolivia":"Բոլիվիա","Ecuador":"Էկվադոր","Uruguay":"Ուրուգվայ","Paraguay":"Պարագվայ",
 "Algeria":"Ալժիր","Morocco":"Մարոկկո","Egypt":"Եգիպտոս","Libya":"Լիբիա","Nigeria":"Նիգերիա","Ghana":"Գանա",
 "Sudan":"Սուդան","Ethiopia":"Եթովպիա","Kenya":"Քենիա","Tanzania":"Տանզանիա","South Africa":"Հարավային Աֆրիկա",
 "Madagascar":"Մադագասկար","France":"Ֆրանսիա","Spain":"Իսպանիա","Portugal":"Պորտուգալիա","United Kingdom":"Միացյալ Թագավորություն",
 "Ireland":"Իռլանդիա","Germany":"Գերմանիա","Italy":"Իտալիա","Norway":"Նորվեգիա","Sweden":"Շվեդիա","Finland":"Ֆինլանդիա",
 "Poland":"Լեհաստան","Ukraine":"Ուկրաինա","Romania":"Ռումինիա","Greece":"Հունաստան","Turkey":"Թուրքիա","Türkiye":"Թուրքիա",
 "Russia":"Ռուսաստան","Kazakhstan":"Ղազախստան","Georgia":"Վրաստան","Armenia":"Հայաստան","Azerbaijan":"Ադրբեջան",
 "Iran":"Իրան","Iraq":"Իրաք","Saudi Arabia":"Սաուդյան Արաբիա","India":"Հնդկաստան","China":"Չինաստան","Mongolia":"Մոնղոլիա",
 "Japan":"Ճապոնիա","South Korea":"Հարավային Կորեա","North Korea":"Հյուսիսային Կորեա","Thailand":"Թաիլանդ","Vietnam":"Վիետնամ",
 "Indonesia":"Ինդոնեզիա","Australia":"Ավստրալիա","New Zealand":"Նոր Զելանդիա","Papua New Guinea":"Պապուա Նոր Գվինեա",
 "Austria":"Ավստրիա","Belgium":"Բելգիա","Bulgaria":"Բուլղարիա","Croatia":"Խորվաթիա","Czechia":"Չեխիա",
 "Denmark":"Դանիա","Estonia":"Էստոնիա","Hungary":"Հունգարիա","Iceland":"Իսլանդիա","Latvia":"Լատվիա","Lithuania":"Լիտվա",
 "Luxembourg":"Լյուքսեմբուրգ","Malta":"Մալթա","Moldova":"Մոլդովա","Monaco":"Մոնակո","Montenegro":"Մոնտենեգրո",
 "Netherlands":"Նիդերլանդներ","Serbia":"Սերբիա","Slovakia":"Սլովակիա","Slovenia":"Սլովենիա","Switzerland":"Շվեյցարիա",
 "Belarus":"Բելառուս","Bosnia and Herzegovina":"Բոսնիա և Հերցեգովինա","North Macedonia":"Հյուսիսային Մակեդոնիա",
 "Afghanistan":"Աֆղանստան","Bangladesh":"Բանգլադեշ","Bhutan":"Բութան","Brunei":"Բրունեյ","Cambodia":"Կամբոջա",
 "Cyprus":"Կիպրոս","Israel":"Իսրայել","Jordan":"Հորդանան","Kuwait":"Քուվեյթ","Kyrgyzstan":"Ղրղզստան","Laos":"Լաոս",
 "Lebanon":"Լիբանան","Malaysia":"Մալայզիա","Maldives":"Մալդիվներ","Myanmar":"Մյանմա","Nepal":"Նեպալ","Oman":"Օման",
 "Pakistan":"Պակիստան","Philippines":"Ֆիլիպիններ","Qatar":"Կատար","Singapore":"Սինգապուր","Sri Lanka":"Շրի Լանկա",
 "Syria":"Սիրիա","Tajikistan":"Տաջիկստան","Turkmenistan":"Թուրքմենստան","United Arab Emirates":"ԱՄԷ","Uzbekistan":"Ուզբեկստան",
 "Yemen":"Եմեն","Albania":"Ալբանիա","Andorra":"Անդորրա","Liechtenstein":"Լիխտենշտայն","San Marino":"Սան Մարինո",
 "Vatican":"Վատիկան","Vatican City":"Վատիկան","Bahamas":"Բահամներ","Bahrain":"Բահրեյն","Barbados":"Բարբադոս",
 "Belize":"Բելիզ","Costa Rica":"Կոստա Ռիկա","Cuba":"Կուբա","Dominica":"Դոմինիկա","Dominican Republic":"Դոմինիկյան Հանրապետություն",
 "El Salvador":"Էլ Սալվադոր","Guatemala":"Գվատեմալա","Haiti":"Հաիթի","Honduras":"Հոնդուրաս","Jamaica":"Ճամայկա",
 "Nicaragua":"Նիկարագուա","Panama":"Պանամա","Antigua and Barbuda":"Անտիգուա և Բարբուդա","Grenada":"Գրենադա",
 "Saint Lucia":"Սենթ Լյուսիա","Saint Vincent and the Grenadines":"Սենթ Վինսենթ և Գրենադիններ","Saint Kitts and Nevis":"Սենթ Քիթս և Նևիս",
 "Trinidad and Tobago":"Տրինիդադ և Տոբագո","Guyana":"Գայանա","Suriname":"Սուրինամ","Ecuador":"Էկվադոր",
 "Angola":"Անգոլա","Benin":"Բենին","Botswana":"Բոտսվանա","Burkina Faso":"Բուրկինա Ֆասո","Burundi":"Բուրունդի",
 "Cameroon":"Կամերուն","Central African Republic":"Կենտրոնական Աֆրիկյան Հանրապետություն","Chad":"Չադ","Comoros":"Կոմորներ",
 "Democratic Republic of the Congo":"Կոնգոյի Դեմոկրատական Հանրապետություն","Djibouti":"Ջիբութի","Equatorial Guinea":"Հասարակածային Գվինեա",
 "Eritrea":"Էրիթրեա","Eswatini":"Էսվատինի","Gabon":"Գաբոն","Gambia":"Գամբիա","Guinea":"Գվինեա","Guinea-Bissau":"Գվինեա-Բիսաու",
 "Ivory Coast":"Կոտ դ'Իվուար","Côte d'Ivoire":"Կոտ դ'Իվուար","Lesotho":"Լեսոտո","Liberia":"Լիբերիա","Malawi":"Մալավի",
 "Mali":"Մալի","Mauritania":"Մավրիտանիա","Mauritius":"Մավրիկիոս","Mozambique":"Մոզամբիկ","Namibia":"Նամիբիա",
 "Niger":"Նիգեր","Rwanda":"Ռուանդա","Sao Tome and Principe":"Սան Տոմե և Պրինսիպի","Senegal":"Սենեգալ","Seychelles":"Սեյշելներ",
 "Sierra Leone":"Սիերա Լեոնե","Somalia":"Սոմալի","South Sudan":"Հարավային Սուդան","Togo":"Տոգո","Tunisia":"Թունիս",
 "Uganda":"Ուգանդա","Zambia":"Զամբիա","Zimbabwe":"Զիմբաբվե","Cape Verde":"Կաբո Վերդե",
 "Fiji":"Ֆիջի","Kiribati":"Կիրիբատի","Marshall Islands":"Մարշալյան կղզիներ","Micronesia":"Միկրոնեզիայի Դաշնային Նահանգներ",
 "Nauru":"Նաուրու","Palau":"Պալաու","Samoa":"Սամոա","Solomon Islands":"Սողոմոնյան կղզիներ","Tonga":"Տոնգա","Tuvalu":"Տուվալու",
 "Vanuatu":"Վանուատու","Timor-Leste":"Թիմոր-Լեստե","Papua New Guinea":"Պապուա Նոր Գվինեա","South Sudan":"Հարավային Սուդան"
};
const mapEl=document.querySelector("#world-map");
const mapStatus=document.querySelector("#map-status");
let leafletMap=null,geoLayer=null,selectedLayer=null;
const countryStyle=feature=>{const seed=String(feature?.properties?.name||"").split("").reduce((a,c)=>a+c.charCodeAt(0),0);const palette=["#e8f1f5","#f6e7cf","#e6f0d9","#f0dfeb","#dfe9f7","#f3ead6","#e3eeee"];return{color:"#fff",weight:1,fillColor:palette[seed%palette.length],fillOpacity:.72};};
const countryName=layer=>layer?.feature?.properties?.name||"";
function focusCountry(layer){
 if(!leafletMap||!layer)return;
 if(selectedLayer&&selectedLayer!==layer)selectedLayer.setStyle(countryStyle(selectedLayer.feature));
 selectedLayer=layer;layer.setStyle({color:"#8f2f22",weight:3,fillColor:"#d96b45",fillOpacity:.92});layer.bringToFront();
 const name=countryAliases[countryName(layer)]||countryName(layer);if(mapStatus)mapStatus.textContent=name;originalSelectCountry(name);
 const b=layer.getBounds();if(b.isValid())leafletMap.flyToBounds(b,{paddingTopLeft:[20,20],paddingBottomRight:[340,35],maxZoom:7,duration:.9});
}
function resetMap(){if(!leafletMap)return;if(selectedLayer){selectedLayer.setStyle(countryStyle(selectedLayer.feature));selectedLayer=null;}leafletMap.flyToBounds([[-58,-180],[82,180]],{padding:[10,10],maxZoom:2,duration:.8});if(mapStatus)mapStatus.textContent="Ամբողջ աշխարհ";}
async function initWorldMap(){
 if(!mapEl||typeof L==="undefined")return;
 leafletMap=L.map("world-map",{worldCopyJump:true,zoomControl:false,minZoom:1,maxZoom:10,preferCanvas:true,zoomSnap:.25,zoomDelta:.5}).setView([20,0],2);
 L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap contributors"}).addTo(leafletMap);
 try{const res=await fetch("world.geojson",{cache:"no-store"});if(!res.ok)throw new Error("world.geojson "+res.status);const geo=await res.json();
 geoLayer=L.geoJSON(geo,{style:countryStyle,onEachFeature:(feature,layer)=>{
   layer.on({click:()=>focusCountry(layer),mouseover:()=>{if(layer!==selectedLayer)layer.setStyle({weight:2,fillOpacity:.9});},mouseout:()=>{if(layer!==selectedLayer)layer.setStyle(countryStyle(feature));}});
   const n=countryAliases[feature.properties?.name]||feature.properties?.name||"";layer.bindTooltip(n,{sticky:true,direction:"top"});
 }}).addTo(leafletMap);
 leafletMap.fitBounds([[-58,-180],[82,180]],{padding:[10,10]});
 document.querySelector("#map-zoom-in")?.addEventListener("click",()=>leafletMap.zoomIn());
 document.querySelector("#map-zoom-out")?.addEventListener("click",()=>leafletMap.zoomOut());
 document.querySelector("#map-reset")?.addEventListener("click",resetMap);
 }catch(err){mapEl.innerHTML='<div class="map-error">Քարտեզի տվյալները չբեռնվեցին։</div>';console.error(err);}
}
initWorldMap();
