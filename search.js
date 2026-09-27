(()=>{"use strict";
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const sources=[
 {name:"English Wikipedia",url:q=>"https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch="+encodeURIComponent(q)+"&gsrlimit=8&prop=extracts|pageimages&exintro=1&explaintext=1&piprop=thumbnail&pithumbsize=640&format=json&origin=*",parse:j=>Object.values(j.query?.pages||{}).map(p=>({title:p.title,desc:p.extract||"",url:"https://en.wikipedia.org/wiki/"+encodeURIComponent(p.title.replaceAll(" ","_")),image:p.thumbnail?.source,source:"English Wikipedia"}))},
 {name:"Armenian Wikipedia",url:q=>"https://hy.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch="+encodeURIComponent(q)+"&gsrlimit=8&prop=extracts|pageimages&exintro=1&explaintext=1&piprop=thumbnail&pithumbsize=640&format=json&origin=*",parse:j=>Object.values(j.query?.pages||{}).map(p=>({title:p.title,desc:p.extract||"",url:"https://hy.wikipedia.org/wiki/"+encodeURIComponent(p.title.replaceAll(" ","_")),image:p.thumbnail?.source,source:"Armenian Wikipedia"}))},
 {name:"Wikimedia Commons",url:q=>"https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch="+encodeURIComponent(q)+"&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800&format=json&origin=*",parse:j=>Object.values(j.query?.pages||{}).map(p=>({title:p.title.replace(/^File:/,""),desc:(p.imageinfo?.[0]?.extmetadata?.ImageDescription?.value||"").replace(/<[^>]*>/g," "),url:"https://commons.wikimedia.org/wiki/"+encodeURIComponent(p.title.replaceAll(" ","_")),image:p.imageinfo?.[0]?.thumburl||p.imageinfo?.[0]?.url,source:"Wikimedia Commons"}))},
 {name:"Internet Archive",url:q=>"https://archive.org/advancedsearch.php?q="+encodeURIComponent(q)+"&fl[]=identifier&fl[]=title&fl[]=description&fl[]=date&fl[]=mediatype&rows=8&output=json",parse:j=>(j.response?.docs||[]).map(p=>({title:p.title||p.identifier,desc:String(p.description||""),url:"https://archive.org/details/"+p.identifier,source:"Internet Archive",kind:p.mediatype||"archive"}))},
 {name:"OpenAlex",url:q=>"https://api.openalex.org/works?search="+encodeURIComponent(q)+"&per-page=8&select=title,publication_year,doi,open_access,primary_location",parse:j=>(j.results||[]).map(p=>({title:p.title||"Untitled",desc:["Research work",p.publication_year,p.open_access?.is_oa?"Open Access":""].filter(Boolean).join(" · "),url:p.doi?"https://doi.org/"+p.doi:p.primary_location?.landing_page_url||"https://openalex.org/",source:"OpenAlex"}))},
 {name:"Crossref",url:q=>"https://api.crossref.org/works?query="+encodeURIComponent(q)+"&rows=8&select=title,published,URL,DOI",parse:j=>(j.message?.items||[]).map(p=>({title:p.title?.[0]||"Untitled",desc:["Publication",p.published?.["date-parts"]?.[0]?.join("-")].filter(Boolean).join(" · "),url:p.URL||"https://search.crossref.org/",source:"Crossref"}))}
];
const params=new URLSearchParams(location.search),query=params.get("q")||"",chosen=params.get("title")||"";
const norm=s=>String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^\p{L}\p{N}]+/gu," ").trim();
const similarity=(a,b)=>{const A=new Set(norm(a).split(" ").filter(x=>x.length>2)),B=new Set(norm(b).split(" ").filter(x=>x.length>2));if(!A.size||!B.size)return norm(a)===norm(b);let n=0;for(const x of A)if(B.has(x))n++;return n/Math.min(A.size,B.size)};
const group=items=>{const out=[];for(const item of items){let g=out.find(x=>similarity(x.title,item.title)>=.72);if(!g){g={title:item.title,items:[],image:item.image||null};out.push(g)}g.items.push(item);if(!g.image&&item.image)g.image=item.image}return out};
const searchAll=q=>Promise.all(sources.map(async s=>{
 try{
  const ctl=new AbortController();const timer=setTimeout(()=>ctl.abort(),7000);
  const r=await fetch(s.url(q),{signal:ctl.signal,headers:{"Accept":"application/json"}});
  clearTimeout(timer);if(!r.ok)return[];return s.parse(await r.json());
 }catch(_){return[]}
})).then(x=>x.flat());
function resultCard(g){
 return '<article class="universal-result">'+(g.image?'<img loading="lazy" src="'+esc(g.image)+'" alt="">':"")+'<div class="universal-result-body"><span class="universal-source">'+g.items.length+" source record"+(g.items.length===1?"":"s")+'</span><h3><a href="result.html?q='+encodeURIComponent(query)+'&title='+encodeURIComponent(g.title)+'">'+esc(g.title)+'</a></h3><p>'+esc((g.items.find(x=>x.desc)?.desc||"No description returned.").slice(0,420))+'</p><a class="universal-open" href="result.html?q='+encodeURIComponent(query)+'&title='+encodeURIComponent(g.title)+'">Open record ↗</a></div></article>';
}
async function initSearch(){
 const form=$("#universal-search-form"),input=$("#universal-search-input"),root=$("#universal-search-results");if(!form||!input||!root)return;
 input.value=query;
 form.addEventListener("submit",e=>{e.preventDefault();const q=input.value.trim();if(q)location.href="search.html?q="+encodeURIComponent(q)});
 if(!query)return;
 root.innerHTML='<div class="search-progress"><div><strong>Searching open sources…</strong><p>Your exact query is sent to each source independently.</p></div></div>';
 const groups=group(await searchAll(query));
 root.innerHTML='<div class="search-summary"><div><span class="eyebrow">SEARCH RESULTS</span><h2>'+groups.length+" result groups</h2><p>Query: <strong>"+esc(query)+"</strong></p></div><div class="search-source-list">'+sources.map(s=>"<span>"+esc(s.name)+"</span>").join("")+"</div></div>"+(groups.length?'<div class="universal-results-grid">'+groups.map(resultCard).join("")+"</div>":'<div class="empty-state">No results were returned. Try another query.</div>');
}
function sourceLink(x){
 return '<a class="detail-source" href="'+esc(x.url)+'" target="_blank" rel="noopener"><span>'+esc(x.source)+'</span><strong>'+esc(x.title||"Original source")+' ↗</strong>'+(x.desc?'<small>'+esc(x.desc.slice(0,500))+"</small>":"")+"</a>";
}
async function initDetail(){
 const root=$("#detail-content");if(!root||!query||!chosen)return;
 root.innerHTML='<div class="search-progress"><div><strong>Loading source records…</strong></div></div>';
 const groups=group(await searchAll(query)),g=groups.find(x=>similarity(x.title,chosen)>=.72)||{title:chosen,items:[]};
 root.innerHTML='<section class="detail-hero"><div class="eyebrow">HISTORY · SOURCE RECORD</div><h1>'+esc(g.title)+'</h1><p>These are records returned by public sources for the search query. Open any source to inspect the original material.</p><div class="detail-stats"><span><b>'+g.items.length+'</b> records</span><span><b>'+new Set(g.items.map(x=>x.source)).size+'</b> sources</span></div></section><div class="detail-layout"><main><section class="detail-section"><h2>Original sources</h2><div class="detail-sources">'+g.items.map(sourceLink).join("")+'</div></section></main><aside class="detail-aside"><strong>Search</strong><p>Query: '+esc(query)+'</p><a href="search.html?q='+encodeURIComponent(query)+'">← Back to results</a></aside></div>';
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>{initSearch();initDetail()});else{initSearch();initDetail()}
})();