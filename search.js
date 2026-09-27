(function(){
"use strict";
var $=function(s){return document.querySelector(s);};
var esc=function(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});};
var params=new URLSearchParams(location.search),query=params.get("q")||"";
var activeType="all";
var sources=[
 {name:"Հայերեն Wikipedia",type:"text",url:function(q){return "https://hy.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch="+encodeURIComponent(q)+"&gsrlimit=10&prop=extracts|info&exintro=1&explaintext=1&inprop=url&format=json&origin=*";},parse:function(j){var p=(j.query&&j.query.pages)||{};return Object.keys(p).map(function(k){var x=p[k];return {title:x.title||"Untitled",desc:x.extract||"",url:x.fullurl||("https://hy.wikipedia.org/wiki/"+encodeURIComponent(String(x.title||"").replace(/ /g,"_"))),source:"Հայերեն Wikipedia",type:"text"};});}},
 {name:"English Wikipedia",type:"text",url:function(q){return "https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch="+encodeURIComponent(q)+"&gsrlimit=10&prop=extracts|info&exintro=1&explaintext=1&inprop=url&format=json&origin=*";},parse:function(j){var p=(j.query&&j.query.pages)||{};return Object.keys(p).map(function(k){var x=p[k];return {title:x.title||"Untitled",desc:x.extract||"",url:x.fullurl||("https://en.wikipedia.org/wiki/"+encodeURIComponent(String(x.title||"").replace(/ /g,"_"))),source:"English Wikipedia",type:"text"};});}},
 {name:"Wikimedia Commons",type:"media",url:function(q){return "https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch="+encodeURIComponent(q)+"&gsrnamespace=6&gsrlimit=15&prop=imageinfo|info&iiprop=url|mime|size&iiurlwidth=700&inprop=url&format=json&origin=*";},parse:function(j){var p=(j.query&&j.query.pages)||{};return Object.keys(p).map(function(k){var x=p[k],ii=x.imageinfo&&x.imageinfo[0]||{};var mime=String(ii.mime||"").toLowerCase();var type=mime.indexOf("video/")===0?"video":"image";return {title:String(x.title||"").replace(/^File:/,""),desc:type==="video"?"Wikimedia Commons video":"Wikimedia Commons image",url:x.fullurl||("https://commons.wikimedia.org/wiki/"+encodeURIComponent(String(x.title||"").replace(/ /g,"_"))),source:"Wikimedia Commons",type:type,thumb:ii.thumburl||ii.url||""};});}},
 {name:"Internet Archive",type:"archive",url:function(q){return "https://archive.org/advancedsearch.php?q="+encodeURIComponent(q)+"&fl[]=identifier&fl[]=title&fl[]=description&fl[]=mediatype&fl[]=format&rows=15&output=json";},parse:function(j){return (j.response&&j.response.docs||[]).map(function(x){var mt=String(x.mediatype||"").toLowerCase(),formats=Array.isArray(x.format)?x.format.join(" "):String(x.format||"");var video=/video|movie|mpeg|mp4|webm/i.test(mt+" "+formats),image=/image|jpg|jpeg|png|gif/i.test(mt+" "+formats),type=video?"video":image?"image":/texts|book|document|data/i.test(mt)?"document":"text";return {title:x.title||x.identifier||"Untitled",desc:String(x.description||"").replace(/<[^>]+>/g,""),url:"https://archive.org/details/"+encodeURIComponent(x.identifier||""),source:"Internet Archive",type:type};});}},
 {name:"OpenAlex",type:"document",url:function(q){return "https://api.openalex.org/works?search="+encodeURIComponent(q)+"&per-page=12";},parse:function(j){return (j.results||[]).map(function(x){return {title:x.title||"Untitled",desc:"Research work"+(x.publication_year?" · "+x.publication_year:""),url:x.doi?"https://doi.org/"+x.doi:(x.primary_location&&x.primary_location.landing_page_url)||"https://openalex.org/",source:"OpenAlex",type:"document"};});}}
];
function request(s,q){return fetch(s.url(q),{headers:{"Accept":"application/json"}}).then(function(r){if(!r.ok)throw Error("HTTP "+r.status);return r.json();}).then(function(j){return s.parse(j)||[];}).catch(function(){return [];});}
function typeMatch(x){return activeType==="all"||x.type===activeType||(activeType==="text"&&x.type==="document")||(activeType==="document"&&x.type==="text");}
function renderSources(){var root=$("#unified-sources");if(!root)return;root.innerHTML=sources.map(function(s){return '<div class="source-item"><strong>'+esc(s.name)+'</strong><span>'+esc(s.type==="media"?"Նկարներ և վիդեոներ":s.type==="archive"?"Տեքստեր, նկարներ, վիդեոներ և փաստաթղթեր":s.type==="document"?"Գիտական/հետազոտական նյութեր":"Տեքստային հոդվածներ")+'</span></div>';}).join("");}
function mediaHtml(x){return x.thumb?'<div class="result-media"><img src="'+esc(x.thumb)+'" loading="lazy" alt=""></div>':"";}
function card(x){var label=x.type==="image"?"IMAGE":x.type==="video"?"VIDEO":x.type==="document"?"DOCUMENT":"TEXT";return '<article class="result">'+mediaHtml(x)+'<div class="result-body"><span class="result-type">'+label+'</span><h3><a href="'+esc(x.url)+'" target="_blank" rel="noopener">'+esc(x.title)+'</a></h3><p>'+esc((x.desc||"Աղբյուրը նկարագրություն չի վերադարձրել։").slice(0,700))+'</p><span class="result-source">Source: '+esc(x.source)+'</span><br><a class="open-source" href="'+esc(x.url)+'" target="_blank" rel="noopener">Open source ↗</a></div></article>';}
async function run(){
 var form=$("#unified-search-form"),input=$("#unified-search-input"),root=$("#unified-search-results");if(!form||!input||!root)return;
 input.value=query;renderSources();
 document.querySelectorAll(".filter").forEach(function(b){b.addEventListener("click",function(){document.querySelectorAll(".filter").forEach(function(x){x.classList.remove("active");});b.classList.add("active");activeType=b.dataset.type;doSearch();});});
 form.addEventListener("submit",function(e){e.preventDefault();var q=input.value.trim();if(q)history.replaceState(null,"","search.html?q="+encodeURIComponent(q));query=q;doSearch();});
 if(query)doSearch();
}
async function doSearch(){
 var root=$("#unified-search-results");if(!root)return;
 if(!query){root.innerHTML='<div class="empty"><strong>Գրիր որոնման բառը։</strong><p>Որոնումը կստուգի բոլոր աղբյուրները միաժամանակ։</p></div>';return;}
 root.innerHTML='<div class="empty"><strong>Որոնում…</strong><p>'+esc(query)+' — ստուգվում են բոլոր աղբյուրները։</p></div>';
 var batches=await Promise.all(sources.map(function(s){return request(s,query);}));
 var all=[];batches.forEach(function(a){all=all.concat(a);});
 var filtered=all.filter(typeMatch);
 var seen={};filtered=filtered.filter(function(x){var k=x.source+"|"+x.title.toLowerCase();if(seen[k])return false;seen[k]=1;return true;});
 var count=filtered.length;
 var badges=sources.map(function(s){return "<span>"+esc(s.name)+"</span>";}).join("");
 root.innerHTML='<div class="search-meta"><div><strong>'+count+' արդյունք</strong> · «'+esc(query)+'»</div><div class="source-badges">'+badges+'</div></div>'+(count?'<div class="results-grid">'+filtered.map(card).join("")+'</div>':'<div class="empty"><strong>Արդյունք չգտնվեց։</strong><p>Փորձիր այլ ուղղագրություն կամ ավելի լայն բառ։</p></div>');
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run);else run();
})();