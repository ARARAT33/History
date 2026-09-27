(function(){
"use strict";
var $=function(s){return document.querySelector(s);};
var esc=function(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});};
var params=new URLSearchParams(location.search),query=params.get("q")||"",activeType="all",selectedSources=null;
var sourceCatalog=[
{name:"Google Search",group:"Web",type:"text",url:function(q){return "https://www.google.com/search?q="+encodeURIComponent(q);}},
{name:"Google Images",group:"Media",type:"image",url:function(q){return "https://www.google.com/search?tbm=isch&q="+encodeURIComponent(q);}},
{name:"Google Videos",group:"Media",type:"video",url:function(q){return "https://www.google.com/search?tbm=vid&q="+encodeURIComponent(q);}},
{name:"Wikipedia — English",group:"Wikipedia",type:"text",api:"https://en.wikipedia.org/w/api.php"},
{name:"Wikipedia — Armenian",group:"Wikipedia",type:"text",api:"https://hy.wikipedia.org/w/api.php"},
{name:"Wikipedia — Russian",group:"Wikipedia",type:"text",api:"https://ru.wikipedia.org/w/api.php"},
{name:"Wikipedia — French",group:"Wikipedia",type:"text",api:"https://fr.wikipedia.org/w/api.php"},
{name:"Wikipedia — German",group:"Wikipedia",type:"text",api:"https://de.wikipedia.org/w/api.php"},
{name:"Wikipedia — Spanish",group:"Wikipedia",type:"text",api:"https://es.wikipedia.org/w/api.php"},
{name:"Wikipedia — Persian",group:"Wikipedia",type:"text",api:"https://fa.wikipedia.org/w/api.php"},
{name:"Wikipedia — Arabic",group:"Wikipedia",type:"text",api:"https://ar.wikipedia.org/w/api.php"},
{name:"Wikimedia Commons",group:"Wikimedia",type:"media",api:"https://commons.wikimedia.org/w/api.php"},
{name:"Wikidata",group:"Wikimedia",type:"text",api:"https://www.wikidata.org/w/api.php"},
{name:"Wikimedia projects",group:"Wikimedia",type:"text",url:function(q){return "https://www.wikimedia.org/w/index.php?search="+encodeURIComponent(q);}},
{name:"Internet Archive",group:"Archive",type:"archive",api:"archive"},
{name:"YouTube",group:"Video",type:"video",url:function(q){return "https://www.youtube.com/results?search_query="+encodeURIComponent(q);}},
{name:"Vimeo",group:"Video",type:"video",url:function(q){return "https://vimeo.com/search?q="+encodeURIComponent(q);}},
{name:"OpenAlex",group:"Research",type:"document",api:"openalex"},
{name:"Google Books",group:"Books",type:"document",url:function(q){return "https://books.google.com/books?q="+encodeURIComponent(q);}},
{name:"Google Scholar",group:"Research",type:"document",url:function(q){return "https://scholar.google.com/scholar?q="+encodeURIComponent(q);}},
{name:"Europeana",group:"Digital library",type:"document",url:function(q){return "https://www.europeana.eu/en/search?query="+encodeURIComponent(q);}},
{name:"Digital Public Library of America",group:"Digital library",type:"document",url:function(q){return "https://dp.la/search?q="+encodeURIComponent(q);}},
{name:"Library of Congress",group:"Library",type:"document",url:function(q){return "https://www.loc.gov/search/?q="+encodeURIComponent(q);}},
{name:"WorldCat",group:"Library",type:"document",url:function(q){return "https://search.worldcat.org/search?q="+encodeURIComponent(q);}},
{name:"Smithsonian",group:"Museum",type:"document",url:function(q){return "https://www.si.edu/search?edan_q="+encodeURIComponent(q);}},
{name:"Getty",group:"Museum",type:"document",url:function(q){return "https://www.getty.edu/search/?q="+encodeURIComponent(q);}},
{name:"JSTOR",group:"Research",type:"document",url:function(q){return "https://www.jstor.org/action/doBasicSearch?Query="+encodeURIComponent(q);}},
{name:"PubMed",group:"Research",type:"document",url:function(q){return "https://pubmed.ncbi.nlm.nih.gov/?term="+encodeURIComponent(q);}},
{name:"CORE",group:"Research",type:"document",url:function(q){return "https://core.ac.uk/search?q="+encodeURIComponent(q);}},
{name:"Crossref",group:"Research",type:"document",url:function(q){return "https://search.crossref.org/?q="+encodeURIComponent(q);}},
{name:"DOAJ",group:"Research",type:"document",url:function(q){return "https://doaj.org/search/articles?ref=homepage-box&source="+encodeURIComponent(q);}},
{name:"HathiTrust",group:"Library",type:"document",url:function(q){return "https://catalog.hathitrust.org/Search/Home?lookfor="+encodeURIComponent(q);}},
{name:"Biodiversity Heritage Library",group:"Library",type:"document",url:function(q){return "https://www.biodiversitylibrary.org/search?searchTerm="+encodeURIComponent(q);}},
{name:"Google Arts & Culture",group:"Culture",type:"image",url:function(q){return "https://artsandculture.google.com/search?q="+encodeURIComponent(q);}},
{name:"Flickr",group:"Media",type:"image",url:function(q){return "https://www.flickr.com/search/?text="+encodeURIComponent(q);}},
{name:"Wikimedia maps",group:"Wikimedia",type:"image",url:function(q){return "https://commons.wikimedia.org/w/index.php?search="+encodeURIComponent(q)+"&title=Special:MediaSearch&type=image;geo"}},
{name:"Internet Archive TV",group:"Archive",type:"video",url:function(q){return "https://archive.org/search?query="+encodeURIComponent(q)+"&mediatype=movies;"}},
{name:"Internet Archive texts",group:"Archive",type:"document",url:function(q){return "https://archive.org/search?query="+encodeURIComponent(q)+"&mediatype=texts"}}
];
function apiSource(s,q){
 if(s.group==="Wikipedia")return fetch(s.api+"?action=query&generator=search&gsrsearch="+encodeURIComponent(q)+"&gsrlimit=12&prop=extracts|info&exintro=1&explaintext=1&inprop=url&format=json&origin=*").then(function(r){return r.ok?r.json():{};}).then(function(j){var p=j.query&&j.query.pages||{};return Object.keys(p).map(function(k){var x=p[k];return {title:x.title||"Untitled",desc:x.extract||"",url:x.fullurl||s.api.replace("/w/api.php","/wiki/")+encodeURIComponent(String(x.title||"").replace(/ /g,"_")),source:s.name,type:"text"};});}).catch(function(){return[];});
 if(s.name==="Wikimedia Commons")return fetch(s.api+"?action=query&generator=search&gsrsearch="+encodeURIComponent(q)+"&gsrnamespace=6&gsrlimit=15&prop=imageinfo|info&iiprop=url|mime&iiurlwidth=700&inprop=url&format=json&origin=*").then(function(r){return r.ok?r.json():{};}).then(function(j){var p=j.query&&j.query.pages||{};return Object.keys(p).map(function(k){var x=p[k],ii=x.imageinfo&&x.imageinfo[0]||{},mime=String(ii.mime||"").toLowerCase();return {title:String(x.title||"").replace(/^File:/,""),desc:"Wikimedia Commons "+(mime.indexOf("video/")===0?"video":"image"),url:x.fullurl||"https://commons.wikimedia.org/",source:s.name,type:mime.indexOf("video/")===0?"video":"image",thumb:ii.thumburl||ii.url||""};});}).catch(function(){return[];});
 if(s.name==="Wikidata")return fetch(s.api+"?action=wbsearchentities&search="+encodeURIComponent(q)+"&language=en&type=item&limit=12&format=json&origin=*").then(function(r){return r.ok?r.json():{};}).then(function(j){return (j.search||[]).map(function(x){return {title:x.label||x.id,desc:x.description||"",url:"https://www.wikidata.org/wiki/"+x.id,source:s.name,type:"text"};});}).catch(function(){return[];});
 if(s.name==="Internet Archive")return fetch("https://archive.org/advancedsearch.php?q="+encodeURIComponent(q)+"&fl[]=identifier&fl[]=title&fl[]=description&fl[]=mediatype&fl[]=format&rows=20&output=json").then(function(r){return r.ok?r.json():{};}).then(function(j){return (j.response&&j.response.docs||[]).map(function(x){var f=Array.isArray(x.format)?x.format.join(" "):String(x.format||""),m=String(x.mediatype||""),type=/video|movie|mpeg|mp4/i.test(m+" "+f)?"video":/image|jpg|jpeg|png/i.test(m+" "+f)?"image":/texts|book|document/i.test(m)?"document":"text";return {title:x.title||x.identifier,desc:String(x.description||"").replace(/<[^>]+>/g,""),url:"https://archive.org/details/"+encodeURIComponent(x.identifier||""),source:s.name,type:type};});}).catch(function(){return[];});
 if(s.name==="OpenAlex")return fetch("https://api.openalex.org/works?search="+encodeURIComponent(q)+"&per-page=15").then(function(r){return r.ok?r.json():{};}).then(function(j){return (j.results||[]).map(function(x){return {title:x.title||"Untitled",desc:"Research work"+(x.publication_year?" · "+x.publication_year:""),url:x.doi?"https://doi.org/"+x.doi:(x.primary_location&&x.primary_location.landing_page_url)||"https://openalex.org/",source:s.name,type:"document"};});}).catch(function(){return[];});
 return Promise.resolve(s.url?[{title:q,desc:"Search this source directly.",url:s.url(q),source:s.name,type:s.type==="media"?"image":s.type}]:[]);
}
function sourceResults(s,q){return s.api?apiSource(s,q):apiSource(s,q);}
function renderSources(){
 var root=$("#unified-sources");if(!root)return;
 root.innerHTML='<div class="source-selector-head"><strong>Sources</strong><button id="source-all" type="button">Select all</button><button id="source-none" type="button">Clear</button></div><div class="source-checks">'+sourceCatalog.map(function(s,i){return '<label><input type="checkbox" class="source-check" data-i="'+i+'" checked> '+esc(s.name)+'</label>';}).join("")+'</div>';
 $("#source-all").onclick=function(){document.querySelectorAll(".source-check").forEach(function(x){x.checked=true;});};
 $("#source-none").onclick=function(){document.querySelectorAll(".source-check").forEach(function(x){x.checked=false;});};
}
function selected(){
 return Array.from(document.querySelectorAll(".source-check:checked")).map(function(x){return sourceCatalog[Number(x.dataset.i)];});
}
function mediaHtml(x){return x.thumb?'<div class="result-media"><img src="'+esc(x.thumb)+'" loading="lazy" alt=""></div>':"";}
function card(x){var label=x.type==="image"?"IMAGE":x.type==="video"?"VIDEO":x.type==="document"?"DOCUMENT":"TEXT";return '<article class="result">'+mediaHtml(x)+'<div class="result-body"><span class="result-type">'+label+'</span><h3><a href="'+esc(x.url)+'" target="_blank" rel="noopener">'+esc(x.title)+'</a></h3><p>'+esc((x.desc||"Search this source directly.").slice(0,700))+'</p><span class="result-source">'+esc(x.source)+'</span><br><a class="open-source" href="'+esc(x.url)+'" target="_blank" rel="noopener">Open source ↗</a></div></article>';}
async function doSearch(){
 var root=$("#unified-search-results");if(!root)return;
 if(!query){root.innerHTML='<div class="empty"><strong>Type a search.</strong><p>Choose the sources below, then search.</p></div>';return;}
 var chosen=selected();
 if(!chosen.length){root.innerHTML='<div class="empty"><strong>No sources selected.</strong><p>Select at least one source.</p></div>';return;}
 root.innerHTML='<div class="empty"><strong>Searching…</strong><p>'+esc(query)+' · '+chosen.length+' sources</p></div>';
 var batches=await Promise.all(chosen.map(function(s){return sourceResults(s,query);}));
 var all=[];batches.forEach(function(a){all=all.concat(a);});
 var filtered=all.filter(function(x){return activeType==="all"||x.type===activeType||(activeType==="text"&&x.type==="document")||(activeType==="document"&&x.type==="text");});
 root.innerHTML='<div class="search-meta"><div><strong>'+filtered.length+' results</strong> · “'+esc(query)+'” · '+chosen.length+' sources</div></div>'+(filtered.length?'<div class="results-grid">'+filtered.map(card).join("")+'</div>':'<div class="empty"><strong>No results.</strong><p>Try another spelling.</p></div>');
}
function run(){
 var form=$("#unified-search-form"),input=$("#unified-search-input");if(!form||!input)return;
 input.value=query;renderSources();
 document.querySelectorAll(".filter").forEach(function(b){b.onclick=function(){document.querySelectorAll(".filter").forEach(function(x){x.classList.remove("active");});b.classList.add("active");activeType=b.dataset.type;doSearch();};});
 form.onsubmit=function(e){e.preventDefault();query=input.value.trim();history.replaceState(null,"","search.html"+(query?"?q="+encodeURIComponent(query):""));doSearch();};
 if(query)doSearch();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run);else run();
})();