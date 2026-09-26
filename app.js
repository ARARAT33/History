const countries=["Աֆղանստան","Ալբանիա","Ալժիր","Անդորրա","Անգոլա","Անտիգուա և Բարբուդա","Արգենտինա","Հայաստան","Ավստրալիա","Ավստրիա","Ադրբեջան","Բահամներ","Բահրեյն","Բանգլադեշ","Բարբադոս","Բելառուս","Բելգիա","Բելիզ","Բենին","Բութան","Բոլիվիա","Բոսնիա և Հերցեգովինա","Բոտսվանա","Բրազիլիա","Բրունեյ","Բուլղարիա","Բուրկինա Ֆասո","Բուրունդի","Կաբո Վերդե","Կամբոջա","Կամերուն","Կանադա","Կենտրոնական Աֆրիկյան Հանրապետություն","Չադ","Չիլի","Չինաստան","Կոլումբիա","Կոմորներ","Կոնգոյի Հանրապետություն","Կոստա Ռիկա","Կոտ դ'Իվուար","Խորվաթիա","Կուբա","Կիպրոս","Չեխիա","Կոնգոյի Դեմոկրատական Հանրապետություն","Դանիա","Ջիբութի","Դոմինիկա","Դոմինիկյան Հանրապետություն","Էկվադոր","Եգիպտոս","Էլ Սալվադոր","Հասարակածային Գվինեա","Էրիթրեա","Էստոնիա","Էսվատինի","Եթովպիա","Ֆիջի","Ֆինլանդիա","Ֆրանսիա","Գաբոն","Գամբիա","Վրաստան","Գերմանիա","Գանա","Հունաստան","Գրենադա","Գվատեմալա","Գվինեա","Գվինեա-Բիսաու","Գայանա","Հաիթի","Հոնդուրաս","Հունգարիա","Իսլանդիա","Հնդկաստան","Ինդոնեզիա","Իրան","Իրաք","Իռլանդիա","Իսրայել","Իտալիա","Ճամայկա","Ճապոնիա","Հորդանան","Ղազախստան","Քենիա","Կիրիբատի","Քուվեյթ","Ղրղզստան","Լաոս","Լատվիա","Լիբանան","Լեսոտո","Լիբերիա","Լիբիա","Լիխտենշտայն","Լիտվա","Լյուքսեմբուրգ","Մադագասկար","Մալավի","Մալայզիա","Մալդիվներ","Մալի","Մալթա","Մարշալյան կղզիներ","Մավրիտանիա","Մավրիկիոս","Մեքսիկա","Միկրոնեզիայի Դաշնային Նահանգներ","Մոլդովա","Մոնակո","Մոնղոլիա","Մոնտենեգրո","Մարոկկո","Մոզամբիկ","Մյանմա","Նամիբիա","Նաուրու","Նեպալ","Նիդերլանդներ","Նոր Զելանդիա","Նիկարագուա","Նիգեր","Նիգերիա","Հյուսիսային Կորեա","Հյուսիսային Մակեդոնիա","Նորվեգիա","Օման","Պակիստան","Պալաու","Պանամա","Պապուա Նոր Գվինեա","Պարագվայ","Պերու","Ֆիլիպիններ","Լեհաստան","Պորտուգալիա","Կատար","Ռումինիա","Ռուսաստան","Ռուանդա","Սենթ Քիթս և Նևիս","Սենթ Լյուսիա","Սենթ Վինսենթ և Գրենադիններ","Սամոա","Սան Մարինո","Սան Տոմե և Պրինսիպի","Սաուդյան Արաբիա","Սենեգալ","Սերբիա","Սեյշելներ","Սիերա Լեոնե","Սինգապուր","Սլովակիա","Սլովենիա","Սողոմոնյան կղզիներ","Սոմալի","Հարավային Աֆրիկա","Հարավային Կորեա","Հարավային Սուդան","Իսպանիա","Շրի Լանկա","Սուդան","Սուրինամ","Շվեդիա","Շվեյցարիա","Սիրիա","Տաջիկստան","Տանզանիա","Թաիլանդ","Թիմոր-Լեստե","Տոգո","Տոնգա","Տրինիդադ և Տոբագո","Թունիս","Թուրքիա","Թուրքմենստան","Տուվալու","Ուգանդա","Ուկրաինա","ԱՄԷ","Միացյալ Թագավորություն","ԱՄՆ","Ուրուգվայ","Ուզբեկստան","Վանուատու","Վատիկան","Վենեսուելա","Վիետնամ","Եմեն","Զամբիա","Զիմբաբվե"];
const data={"Հայաստան":{continent:"Ասիա",peoples:[{name:"Հայեր",areas:["ամբողջ երկրում"],language:"Հայերեն",religion:"Կցուցադրվի աղբյուրով և տարեթվով"}]}};
const aliases={"United States of America":"ԱՄՆ","United States":"ԱՄՆ","Russia":"Ռուսաստան","Türkiye":"Թուրքիա","Turkey":"Թուրքիա","Armenia":"Հայաստան","Azerbaijan":"Ադրբեջան","Georgia":"Վրաստան","Iran":"Իրան","Iraq":"Իրաք","China":"Չինաստան","India":"Հնդկաստան","Japan":"Ճապոնիա","Germany":"Գերմանիա","France":"Ֆրանսիա","Italy":"Իտալիա","Spain":"Իսպանիա","United Kingdom":"Միացյալ Թագավորություն","Canada":"Կանադա","Mexico":"Մեքսիկա","Brazil":"Բրազիլիա","Australia":"Ավստրալիա"};
const list=document.querySelector("#country-list"); if(list){countries.forEach(n=>{const b=document.createElement("button");b.className="country-item";b.textContent=n;b.onclick=()=>selectCountry(n);list.appendChild(b)});}
function selectCountry(n){document.querySelector("#map-status").textContent=n;document.querySelectorAll(".country-item").forEach(b=>b.classList.toggle("active",b.textContent===n));const d=data[n];document.querySelector("#country-panel").innerHTML=`<div class="country-title"><span class="flag-dot"></span><div><small>ՊԵՏՈՒԹՅՈՒՆ</small><h3>${n}</h3></div></div><div class="detail-grid"><div><small>Մայրցամաք</small><strong>${d?.continent||"Տվյալը կավելացվի"}</strong></div><div><small>Տարածքային բաժանում</small><strong>Կցուցադրվի ըստ աղբյուրների</strong></div></div><div class="detail-section"><h4>Ազգեր և ժողովուրդներ</h4>${d?.peoples?.map(p=>`<article class="people-card"><h5>${p.name}</h5><p><b>Տարածք․</b> ${p.areas.join(", ")}</p><p><b>Լեզու․</b> ${p.language}</p><p><b>Կրոն․</b> ${p.religion}</p></article>`).join("")||'<div class="placeholder">Այս պետության ազգաբանական տվյալների բաժինը պատրաստ է լրացման։</div>'}</div><div class="detail-section"><h4>Նյութեր</h4><div class="chips"><span>Նկարներ</span><span>Տեսանյութեր</span><span>Փաստաթղթեր</span></div></div>`};

/* Real local GeoJSON world map — no D3/Leaflet dependency. */
const mapEl=document.querySelector("#world-map");
const mapStatus=document.querySelector("#map-status");
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
const escHtml=s=>String(s).replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
const project=(lon,lat,w,h)=>[(lon+180)/360*w,(90-lat)/180*h];
function ringPath(ring,w,h){
  return ring.map((p,i)=>{const [x,y]=project(p[0],p[1],w,h);return (i?"L":"M")+x.toFixed(2)+" "+y.toFixed(2)}).join(" ")+"Z";
}
function geometryPath(g,w,h){
  if(!g)return "";
  if(g.type==="Polygon")return g.coordinates.map(r=>ringPath(r,w,h)).join(" ");
  if(g.type==="MultiPolygon")return g.coordinates.map(poly=>poly.map(r=>ringPath(r,w,h)).join(" ")).join(" ");
  return "";
}
let mapFeatures=[];
let mapSelected=null;
async function initWorldMap(){
  if(!mapEl)return;
  try{
    const res=await fetch("world.geojson",{cache:"no-store"});
    if(!res.ok)throw new Error("world.geojson "+res.status);
    const geo=await res.json();
    mapFeatures=geo.features||[];
    renderWorldMap();
  }catch(err){
    mapEl.innerHTML='<div class="map-error">Քարտեզի տվյալները չբեռնվեցին։</div>';
    if(mapStatus)mapStatus.textContent="Քարտեզի սխալ";
    console.error(err);
  }
}
function renderWorldMap(){
  const w=1400,h=700;
  const paths=mapFeatures.map((f,i)=>{
    const en=f.properties?.name||f.properties?.iso||"";
    const hy=countryAliases[en]||en;
    return '<path class="map-country" data-index="'+i+'" data-country="'+escHtml(hy)+'" d="'+geometryPath(f.geometry,w,h)+'"><title>'+escHtml(hy)+'</title></path>';
  }).join("");
  mapEl.innerHTML='<svg viewBox="0 0 '+w+' '+h+'" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Աշխարհի իրական երկրների քարտեզ"><rect class="map-ocean" width="'+w+'" height="'+h+'"></rect><g class="graticule"><path d="M0 350H1400M0 175H1400M0 525H1400M350 0V700M700 0V700M1050 0V700"></path></g><g class="map-layer">'+paths+'</g></svg>';
  mapEl.querySelectorAll(".map-country").forEach(el=>el.addEventListener("click",()=>{
    mapEl.querySelectorAll(".map-country.selected").forEach(x=>x.classList.remove("selected"));
    el.classList.add("selected"); mapSelected=Number(el.dataset.index);
    const name=el.dataset.country; if(mapStatus)mapStatus.textContent=name; selectCountry(name);
  }));
}
function selectMapByArmenian(name){
  if(!mapEl||!mapFeatures.length)return;
  const idx=mapFeatures.findIndex(f=>(countryAliases[f.properties?.name]||f.properties?.name)===name);
  if(idx<0)return;
  mapEl.querySelectorAll(".map-country.selected").forEach(x=>x.classList.remove("selected"));
  const el=mapEl.querySelector('.map-country[data-index="'+idx+'"]');
  if(el){el.classList.add("selected");mapSelected=idx;el.scrollIntoView({block:"nearest",behavior:"smooth"});}
}
const originalSelectCountry=selectCountry;
selectCountry=function(n){originalSelectCountry(n);selectMapByArmenian(n);};
initWorldMap();
