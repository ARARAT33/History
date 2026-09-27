
(()=>{"use strict";
const $=s=>document.querySelector(s), esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const sources=[
{name:"Wikipedia",url:q=>"https://"+(document.documentElement.lang==="hy"?"hy":"en")+".wikipedia.org/w/api.php?action=query&generator=search&gsrsearch="+encodeURIComponent(q)+"&gsrlimit=8&prop=extracts|pageimages&exintro=1&explaintext=1&piprop=thumbnail&pithumbsize=480&format=json&origin=*",parse:j=>Object.values(j.query?.pages||{}).map(p=>({title:p.title,desc:(p.extract||"").slice(0,420),url:"https://"+(document.documentElement.lang==="hy"?"hy":"en")+".wikipedia.org/wiki/"+encodeURIComponent(p.title.replaceAll(" ","_")),image:p.thumbnail?.source,source:"Wikipedia"}))},
{name:"Wikimedia Commons",url:q=>"https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch="+encodeURIComponent(q)+"&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=640&format=json&origin=*",parse:j=>Object.values(j.query?.pages||{}).map(p=>({title:p.title.replace(/^File:/,""),desc:(p.imageinfo?.[0]?.extmetadata?.ImageDescription?.value||"").replace(/<[^>]*>/g," ").slice(0,300),url:"https://commons.wikimedia.org/wiki/"+encodeURIComponent(p.title.replaceAll(" ","_")),image:p.imageinfo?.[0]?.thumburl||p.imageinfo?.[0]?.url,source:"Wikimedia Commons"}))},
{name:"Internet Archive",url:q=>"https://archive.org/advancedsearch.php?q="+encodeURIComponent(q)+"&fl[]=identifier&fl[]=title&fl[]=description&fl[]=date&fl[]=mediatype&rows=8&page=1&output=json",parse:j=>(j.response?.docs||[]).map(p=>({title:p.title||p.identifier,desc:String(p.description||"").replace(/<[^>]*>/g," ").slice(0,360),url:"https://archive.org/details/"+p.identifier,source:"Internet Archive",meta:[p.mediatype,p.date].filter(Boolean).join(" · ")}))},
{name:"OpenAlex",url:q=>"https://api.openalex.org/works?search="+encodeURIComponent(q)+"&per-page=6&select=title,publication_year,doi,open_access,primary_location",parse:j=>(j.results||[]).map(p=>({title:p.title,desc:["Գիտական աշխատանք",p.publication_year,p.open_access?.is_oa?"Open Access":""].filter(Boolean).join(" · "),url:p.doi?"https://doi.org/"+p.doi:p.primary_location?.landing_page_url||"https://openalex.org/",source:"OpenAlex"}))},
{name:"Crossref",url:q=>"https://api.crossref.org/works?query="+encodeURIComponent(q)+"&rows=6&select=title,author,published,URL,DOI",parse:j=>(j.message?.items||[]).map(p=>({title:p.title?.[0]||"Untitled",desc:["Գիտական/հրատարակչական գրառում",p.published?.["date-parts"]?.[0]?.join("-")].filter(Boolean).join(" · "),url:p.URL||"https://search.crossref.org/",source:"Crossref"}))}
];
let seq=0;
function renderCard(x){return '<article class="universal-result">'+(x.image?'<a href="'+esc(x.url)+'" target="_blank" rel="noopener"><img loading="lazy" src="'+esc(x.image)+'" alt=""></a>':'')+'<div class="universal-result-body"><span class="universal-source">'+esc(x.source)+'</span><h3><a href="'+esc(x.url)+'" target="_blank" rel="noopener">'+esc(x.title||"Անվերնագիր")+'</a></h3>'+(x.desc?'<p>'+esc(x.desc)+'</p>':'')+(x.meta?'<small>'+esc(x.meta)+'</small>':'')+'<a class="universal-open" href="'+esc(x.url)+'" target="_blank" rel="noopener">Բացել սկզբնաղբյուրը ↗</a></div></article>'}
async function search(q,root){
 const id=++seq;root.innerHTML='<div class="search-progress"><span class="loading-orbit"></span><div><strong>Համադրում ենք բաց աղբյուրները…</strong><p>Որոնումը կատարվում է միաժամանակ մի քանի անկախ շտեմարանում։</p></div></div>';
 const results=await Promise.all(sources.map(async s=>{try{const r=await fetch(s.url(q));if(!r.ok)throw Error(s.name+" "+r.status);return s.parse(await r.json())}catch(e){return {error:s.name}}}));
 if(id!==seq)return;
 const flat=results.flatMap(x=>Array.isArray(x)?x:[]);
 const failed=results.filter(x=>!Array.isArray(x)).map(x=>x.error);
 const seen=new Set(),unique=flat.filter(x=>{const k=(x.title||"").toLowerCase()+"|"+x.url;if(seen.has(k))return false;seen.add(k);return true});
 root.innerHTML='<div class="search-summary"><div><span class="eyebrow">OPEN KNOWLEDGE SEARCH</span><h2>'+unique.length+' արդյունք՝ '+esc(q)+'</h2><p>Արդյունքները հավաքվել են '+(sources.length-failed.length)+' աղբյուրից։ Սա ամբողջ ինտերնետի սպառում չէ. որոնվում են միացված բաց շտեմարանները։</p></div><div class="search-source-list">'+sources.filter(s=>!failed.includes(s.name)).map(s=>'<span>'+esc(s.name)+'</span>').join("")+'</div></div>'+(unique.length?'<div class="universal-results-grid">'+unique.map(renderCard).join("")+'</div>':'<div class="empty-state">Այս հարցման համար հասանելի արդյունք չգտնվեց։ Փորձիր այլ լեզվով կամ այլ ձևակերպմամբ։</div>')+(failed.length?'<p class="search-warning">Ժամանակավորապես չպատասխանեցին՝ '+esc(failed.join(", "))+'. Մնացած աղբյուրների արդյունքները ցուցադրված են։</p>':'');
}
function init(){
 const form=$("#universal-search-form"),input=$("#universal-search-input"),root=$("#universal-search-results");
 if(!form||!input||!root)return;
 form.addEventListener("submit",e=>{e.preventDefault();const q=input.value.trim();if(q)search(q,root)});
 const params=new URLSearchParams(location.search),q=params.get("q");if(q){input.value=q;search(q,root)}
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
