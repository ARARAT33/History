(function(){
"use strict";
var $=function(s){return document.querySelector(s);};
var esc=function(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});};
var params=new URLSearchParams(location.search),query=params.get("q")||"",chosen=params.get("title")||"";
var sources=[
 {name:"English Wikipedia",url:function(q){return "https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch="+encodeURIComponent(q)+"&gsrlimit=8&prop=extracts&exintro=1&explaintext=1&format=json&origin=*";},parse:function(j){var p=(j.query&&j.query.pages)||{};return Object.keys(p).map(function(k){var x=p[k];return {title:x.title||"Untitled",desc:x.extract||"",url:"https://en.wikipedia.org/wiki/"+encodeURIComponent(String(x.title||"").replace(/ /g,"_")),source:"English Wikipedia"};});}},
 {name:"Armenian Wikipedia",url:function(q){return "https://hy.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch="+encodeURIComponent(q)+"&gsrlimit=8&prop=extracts&exintro=1&explaintext=1&format=json&origin=*";},parse:function(j){var p=(j.query&&j.query.pages)||{};return Object.keys(p).map(function(k){var x=p[k];return {title:x.title||"Untitled",desc:x.extract||"",url:"https://hy.wikipedia.org/wiki/"+encodeURIComponent(String(x.title||"").replace(/ /g,"_")),source:"Armenian Wikipedia"};});}},
 {name:"Wikimedia Commons",url:function(q){return "https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch="+encodeURIComponent(q)+"&gsrnamespace=6&gsrlimit=8&format=json&origin=*";},parse:function(j){var p=(j.query&&j.query.pages)||{};return Object.keys(p).map(function(k){var x=p[k];return {title:String(x.title||"").replace(/^File:/,""),desc:"Wikimedia Commons file",url:"https://commons.wikimedia.org/wiki/"+encodeURIComponent(String(x.title||"").replace(/ /g,"_")),source:"Wikimedia Commons"};});}},
 {name:"Internet Archive",url:function(q){return "https://archive.org/advancedsearch.php?q="+encodeURIComponent(q)+"&fl[]=identifier&fl[]=title&fl[]=description&rows=8&output=json";},parse:function(j){return (j.response&&j.response.docs||[]).map(function(x){return {title:x.title||x.identifier||"Untitled",desc:String(x.description||""),url:"https://archive.org/details/"+x.identifier,source:"Internet Archive"};});}},
 {name:"OpenAlex",url:function(q){return "https://api.openalex.org/works?search="+encodeURIComponent(q)+"&per-page=8";},parse:function(j){return (j.results||[]).map(function(x){return {title:x.title||"Untitled",desc:"Research work"+(x.publication_year?" · "+x.publication_year:""),url:x.doi?"https://doi.org/"+x.doi:(x.primary_location&&x.primary_location.landing_page_url)||"https://openalex.org/",source:"OpenAlex"};});}}
];
function request(s,q){
 return new Promise(function(resolve){
  var ctl=new AbortController(),done=false,timer=setTimeout(function(){if(!done){done=true;ctl.abort();resolve([]);}},5000);
  fetch(s.url(q),{signal:ctl.signal,headers:{"Accept":"application/json"}}).then(function(r){if(!r.ok)throw Error("HTTP "+r.status);return r.json();}).then(function(j){if(done)return;done=true;clearTimeout(timer);resolve(s.parse(j)||[]);}).catch(function(){if(done)return;done=true;clearTimeout(timer);resolve([]);});
 });
}
function similarity(a,b){
 a=String(a||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
 b=String(b||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
 if(a===b)return 1;
 var aa=a.split(/[^\p{L}\p{N}]+/u).filter(function(x){return x.length>2;}),bb=b.split(/[^\p{L}\p{N}]+/u).filter(function(x){return x.length>2;}),n=0;
 aa.forEach(function(x){if(bb.indexOf(x)>=0)n++;});
 return aa.length&&bb.length?n/Math.min(aa.length,bb.length):0;
}
function groups(items){
 var out=[];
 items.forEach(function(x){var g=out.find(function(y){return similarity(y.title,x.title)>=.72;});if(!g){g={title:x.title,items:[]};out.push(g);}g.items.push(x);});
 return out;
}
function card(g){
 var x=g.items[0];
 return '<article class="universal-result"><div class="universal-result-body"><span class="universal-source">'+esc(g.items.length+" source record"+(g.items.length===1?"":"s"))+'</span><h3><a href="result.html?q='+encodeURIComponent(query)+'&title='+encodeURIComponent(g.title)+'">'+esc(g.title)+'</a></h3><p>'+esc((x.desc||"No description returned.").slice(0,500))+'</p><a class="universal-open" href="'+esc(x.url)+'" target="_blank" rel="noopener">Open original ↗</a></div></article>';
}
function render(root,items,done){
 var gs=groups(items);
 root.innerHTML='<div class="search-summary"><div><span class="eyebrow">SEARCH RESULTS</span><h2>'+gs.length+' result groups'+(done?"":" · loading…")+'</h2><p>Query: <strong>'+esc(query)+'</strong></p></div><div class="search-source-list">'+sources.map(function(s){return "<span>"+esc(s.name)+"</span>";}).join("")+'</div></div>'+
 (gs.length?'<div class="universal-results-grid">'+gs.map(card).join("")+'</div>':'<div class="search-progress"><strong>Searching public sources…</strong><p>Results appear as each source responds.</p></div>');
}
async function searchAll(q,onItem){
 var all=[];
 await Promise.all(sources.map(async function(s){var items=await request(s,q);if(items.length){all=all.concat(items);onItem(all.slice());}}));
 return all;
}
function runSearch(){
 var form=$("#universal-search-form"),input=$("#universal-search-input"),root=$("#universal-search-results");if(!form||!input||!root)return;
 input.value=query;
 form.addEventListener("submit",function(e){e.preventDefault();var q=input.value.trim();if(q)location.href="search.html?q="+encodeURIComponent(q);});
 if(!query)return;
 root.innerHTML='<div class="search-progress"><strong>Searching…</strong><p>Checking open sources in parallel.</p></div>';
 searchAll(query,function(items){render(root,items,false);}).then(function(items){if(items.length)render(root,items,true);else root.innerHTML='<div class="empty-state"><strong>No results returned.</strong><p>Try another spelling, language, or broader term.</p></div>';});
}
function runDetail(){
 var root=$("#detail-content");if(!root||!query||!chosen)return;
 root.innerHTML='<div class="search-progress"><strong>Loading source records…</strong></div>';
 searchAll(query,function(){}).then(function(items){
  var gs=groups(items),g=gs.find(function(x){return similarity(x.title,chosen)>=.72;})||{title:chosen,items:[]};
  var links=g.items.map(function(x){return '<a class="detail-source" href="'+esc(x.url)+'" target="_blank" rel="noopener"><span>'+esc(x.source)+'</span><strong>'+esc(x.title||"Original source")+' ↗</strong><small>'+esc((x.desc||"").slice(0,500))+'</small></a>';}).join("");
  root.innerHTML='<section class="detail-hero"><div class="eyebrow">HISTORY · SOURCE RECORD</div><h1>'+esc(g.title)+'</h1><p>Original records returned for the search query.</p></section><section class="detail-section"><h2>Original sources</h2><div class="detail-sources">'+(links||'<div class="empty-state">No matching records.</div>')+'</div></section>';
 });
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",function(){runSearch();runDetail();});else{runSearch();runDetail();}
})();