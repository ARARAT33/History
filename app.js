const countries=["Աֆղանստան","Ալբանիա","Ալժիր","Անդորրա","Անգոլա","Անտիգուա և Բարբուդա","Արգենտինա","Հայաստան","Ավստրալիա","Ավստրիա","Ադրբեջան","Բահամներ","Բահրեյն","Բանգլադեշ","Բարբադոս","Բելառուս","Բելգիա","Բելիզ","Բենին","Բութան","Բոլիվիա","Բոսնիա և Հերցեգովինա","Բոտսվանա","Բրազիլիա","Բրունեյ","Բուլղարիա","Բուրկինա Ֆասո","Բուրունդի","Կաբո Վերդե","Կամբոջա","Կամերուն","Կանադա","Կենտրոնական Աֆրիկյան Հանրապետություն","Չադ","Չիլի","Չինաստան","Կոլումբիա","Կոմորներ","Կոնգոյի Հանրապետություն","Կոստա Ռիկա","Կոտ դ'Իվուար","Խորվաթիա","Կուբա","Կիպրոս","Չեխիա","Կոնգոյի Դեմոկրատական Հանրապետություն","Դանիա","Ջիբութի","Դոմինիկա","Դոմինիկյան Հանրապետություն","Էկվադոր","Եգիպտոս","Էլ Սալվադոր","Հասարակածային Գվինեա","Էրիթրեա","Էստոնիա","Էսվատինի","Եթովպիա","Ֆիջի","Ֆինլանդիա","Ֆրանսիա","Գաբոն","Գամբիա","Վրաստան","Գերմանիա","Գանա","Հունաստան","Գրենադա","Գվատեմալա","Գվինեա","Գվինեա-Բիսաու","Գայանա","Հաիթի","Հոնդուրաս","Հունգարիա","Իսլանդիա","Հնդկաստան","Ինդոնեզիա","Իրան","Իրաք","Իռլանդիա","Իսրայել","Իտալիա","Ճամայկա","Ճապոնիա","Հորդանան","Ղազախստան","Քենիա","Կիրիբատի","Քուվեյթ","Ղրղզստան","Լաոս","Լատվիա","Լիբանան","Լեսոտո","Լիբերիա","Լիբիա","Լիխտենշտայն","Լիտվա","Լյուքսեմբուրգ","Մադագասկար","Մալավի","Մալայզիա","Մալդիվներ","Մալի","Մալթա","Մարշալյան կղզիներ","Մավրիտանիա","Մավրիկիոս","Մեքսիկա","Միկրոնեզիայի Դաշնային Նահանգներ","Մոլդովա","Մոնակո","Մոնղոլիա","Մոնտենեգրո","Մարոկկո","Մոզամբիկ","Մյանմա","Նամիբիա","Նաուրու","Նեպալ","Նիդերլանդներ","Նոր Զելանդիա","Նիկարագուա","Նիգեր","Նիգերիա","Հյուսիսային Կորեա","Հյուսիսային Մակեդոնիա","Նորվեգիա","Օման","Պակիստան","Պալաու","Պանամա","Պապուա Նոր Գվինեա","Պարագվայ","Պերու","Ֆիլիպիններ","Լեհաստան","Պորտուգալիա","Կատար","Ռումինիա","Ռուսաստան","Ռուանդա","Սենթ Քիթս և Նևիս","Սենթ Լյուսիա","Սենթ Վինսենթ և Գրենադիններ","Սամոա","Սան Մարինո","Սան Տոմե և Պրինսիպի","Սաուդյան Արաբիա","Սենեգալ","Սերբիա","Սեյշելներ","Սիերա Լեոնե","Սինգապուր","Սլովակիա","Սլովենիա","Սողոմոնյան կղզիներ","Սոմալի","Հարավային Աֆրիկա","Հարավային Կորեա","Հարավային Սուդան","Իսպանիա","Շրի Լանկա","Սուդան","Սուրինամ","Շվեդիա","Շվեյցարիա","Սիրիա","Տաջիկստան","Տանզանիա","Թաիլանդ","Թիմոր-Լեստե","Տոգո","Տոնգա","Տրինիդադ և Տոբագո","Թունիս","Թուրքիա","Թուրքմենստան","Տուվալու","Ուգանդա","Ուկրաինա","ԱՄԷ","Միացյալ Թագավորություն","ԱՄՆ","Ուրուգվայ","Ուզբեկստան","Վանուատու","Վատիկան","Վենեսուելա","Վիետնամ","Եմեն","Զամբիա","Զիմբաբվե"];
const data={"Հայաստան":{continent:"Ասիա",peoples:[{name:"Հայեր",areas:["ամբողջ երկրում"],language:"Հայերեն",religion:"Կցուցադրվի աղբյուրով և տարեթվով"}]}};
const aliases={"United States of America":"ԱՄՆ","United States":"ԱՄՆ","Russia":"Ռուսաստան","Türkiye":"Թուրքիա","Turkey":"Թուրքիա","Armenia":"Հայաստան","Azerbaijan":"Ադրբեջան","Georgia":"Վրաստան","Iran":"Իրան","Iraq":"Իրաք","China":"Չինաստան","India":"Հնդկաստան","Japan":"Ճապոնիա","Germany":"Գերմանիա","France":"Ֆրանսիա","Italy":"Իտալիա","Spain":"Իսպանիա","United Kingdom":"Միացյալ Թագավորություն","Canada":"Կանադա","Mexico":"Մեքսիկա","Brazil":"Բրազիլիա","Australia":"Ավստրալիա"};
const list=document.querySelector("#country-list"); countries.forEach(n=>{const b=document.createElement("button");b.className="country-item";b.textContent=n;b.onclick=()=>selectCountry(n);list.appendChild(b)});
function selectCountry(n){document.querySelector("#map-status").textContent=n;document.querySelectorAll(".country-item").forEach(b=>b.classList.toggle("active",b.textContent===n));const d=data[n];document.querySelector("#country-panel").innerHTML=`<div class="country-title"><span class="flag-dot"></span><div><small>ՊԵՏՈՒԹՅՈՒՆ</small><h3>${n}</h3></div></div><div class="detail-grid"><div><small>Մայրցամաք</small><strong>${d?.continent||"Տվյալը կավելացվի"}</strong></div><div><small>Տարածքային բաժանում</small><strong>Կցուցադրվի ըստ աղբյուրների</strong></div></div><div class="detail-section"><h4>Ազգեր և ժողովուրդներ</h4>${d?.peoples?.map(p=>`<article class="people-card"><h5>${p.name}</h5><p><b>Տարածք․</b> ${p.areas.join(", ")}</p><p><b>Լեզու․</b> ${p.language}</p><p><b>Կրոն․</b> ${p.religion}</p></article>`).join("")||'<div class="placeholder">Այս պետության ազգաբանական տվյալների բաժինը պատրաստ է լրացման։</div>'}</div><div class="detail-section"><h4>Նյութեր</h4><div class="chips"><span>Նկարներ</span><span>Տեսանյութեր</span><span>Փաստաթղթեր</span></div></div>`};

// Real interactive map: MapLibre GL JS + OpenStreetMap raster tiles.
// Country boundaries come from Natural Earth GeoJSON (public-domain dataset).
const map = new maplibregl.Map({
  container: "world-map",
  style: {
    version: 8,
    sources: {
      osm: {
        type: "raster",
        tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        maxzoom: 19,
        attribution: "© OpenStreetMap contributors"
      },
      countries: {
        type: "geojson",
        data: "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson"
      }
    },
    layers: [
      { id: "osm", type: "raster", source: "osm" },
      {
        id: "country-fill",
        type: "fill",
        source: "countries",
        paint: { "fill-color": "#9b3d2e", "fill-opacity": 0.08 }
      },
      {
        id: "country-outline",
        type: "line",
        source: "countries",
        paint: { "line-color": "#777", "line-width": 0.7 }
      },
      {
        id: "country-selected",
        type: "fill",
        source: "countries",
        paint: { "fill-color": "#9b3d2e", "fill-opacity": 0.48 },
        filter: ["==", "ADMIN", ""]
      }
    ]
  },
  center: [20, 25],
  zoom: 1.25,
  minZoom: 1,
  maxZoom: 18,
  renderWorldCopies: false
});

map.addControl(new maplibregl.NavigationControl({showCompass: true}), "top-right");
map.addControl(new maplibregl.FullscreenControl(), "top-right");
map.on("load", () => {
  map.resize();
});

const geoAliases = {
  "United States of America": "ԱՄՆ",
  "Russia": "Ռուսաստան",
  "Türkiye": "Թուրքիա",
  "Turkey": "Թուրքիա",
  "Armenia": "Հայաստան",
  "Azerbaijan": "Ադրբեջան",
  "Georgia": "Վրաստան",
  "Iran": "Իրան",
  "Iraq": "Իրաք",
  "China": "Չինաստան",
  "India": "Հնդկաստան",
  "Japan": "Ճապոնիա",
  "Germany": "Գերմանիա",
  "France": "Ֆրանսիա",
  "Italy": "Իտալիա",
  "Spain": "Իսպանիա",
  "United Kingdom": "Միացյալ Թագավորություն",
  "Canada": "Կանադա",
  "Mexico": "Մեքսիկա",
  "Brazil": "Բրազիլիա",
  "Australia": "Ավստրալիա"
};

function getCountryName(feature) {
  const p = feature.properties || {};
  return geoAliases[p.ADMIN] || geoAliases[p.NAME] || p.ADMIN || p.NAME;
}

function highlightCountry(mapName) {
  map.setFilter("country-selected", ["==", "ADMIN", mapName]);
}

map.on("click", "country-fill", (event) => {
  const feature = event.features && event.features[0];
  if (!feature) return;
  const name = getCountryName(feature);
  selectCountry(name);
  highlightCountry(feature.properties.ADMIN || feature.properties.NAME || "");
  map.flyTo({
    center: event.lngLat,
    zoom: Math.max(map.getZoom(), 4),
    speed: 1.1,
    curve: 1.25
  });
});

map.on("mouseenter", "country-fill", () => {
  map.getCanvas().style.cursor = "pointer";
});
map.on("mouseleave", "country-fill", () => {
  map.getCanvas().style.cursor = "";
});

const oldSelectCountry = selectCountry;
selectCountry = function(n) {
  oldSelectCountry(n);
  // Highlight the matching English Natural Earth name when the country
  // was selected from the list rather than directly on the map.
  const reverse = Object.entries(geoAliases).find(([, hy]) => hy === n);
  if (reverse) {
    highlightCountry(reverse[0]);
    const features = map.querySourceFeatures("countries");
    const feature = features.find(f => (f.properties?.ADMIN || f.properties?.NAME) === reverse[0]);
    if (feature) {
      const center = feature.geometry?.type === "Polygon"
        ? feature.geometry.coordinates[0][0]
        : feature.geometry?.coordinates?.[0]?.[0]?.[0];
      if (Array.isArray(center)) map.flyTo({center, zoom: Math.max(map.getZoom(), 4), speed: 1.1});
    }
  }
};
