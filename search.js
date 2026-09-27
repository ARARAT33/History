(function(){
"use strict";
function $(s){return document.querySelector(s);}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
var p=new URLSearchParams(location.search), query=p.get("q")||"", chosen=p.get("title")||"";
var sources=[
 {name:"English Wikipedia",url:function(q){return "https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch="+encodeURIComponent(q)+"&gsrlimit=10&prop=extracts&exintro=1&explaintext=1&format=json&origin=*";},parse:function(j){var pages=(j.query&&j.query.pages)||{};return Object.keys(pages).map(function(k){var x=pages[k];return {title:x.title||"Untitled",desc:x.extract||"",url:"https://en.wikipedia.org/wiki/"+encodeURIComponent(String(x.title||"").replace(/ /g,"_")),source:"English Wikipedia"};});}},
 {name:"Armenian Wikipedia",url:function(q){return "https://hy.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch="+encodeURIComponent(q)+"&gsrlimit=10&prop=extracts&exintro=1&explaintext=1&format=json&origin=*";},parse:function(j){var pages=(j.query&&j.query.pages)||{};return Object.keys(pages).map(function(k){var x=pages[k];return {title:x.title||"Untitled",desc:x.extract||"",url:"https://hy.wikipedia.org/wiki/"+encodeURIComponent(String(x.title||"").replace(/ /g,"_")),source:"Armenian Wikipedia"};});}},
 {name:"Wikimedia Commons",url:function(q){return "https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch="+encodeURIComponent(q)+"&gsrnamespace=6&gsrlimit=10&format=json&origin=*";},parse:function(j){var pages=(j.query&&j.query.pages)||{};return Object.keys(pages).map(function(k){var x=pages[k];return {title:String(x.title||"").replace(/^File:/,""),desc:"Wikimedia Commons file",url:"https://commons.wikimedia.org/wiki/"+encodeURIComponent(String(x.title||"").replace(/ /g,"_")),source:"Wikimedia Commons"};});}}
];
function request(s,q){
 return new Promise(function(resolve){
  var ctl=new AbortController(), timer=setTimeout(function(){ctl.abort();resolve([]);},6000);
  fetch(s.url(q),{signal:ctl.signal}).then(function(r){if(!r.ok)throw new Error("HTTP");return r.json();}).then(function(j){clearTimeout(timer);resolve(s.parse(j)||[]);}).catch(function(){clearTimeout(timer);resolve([]);});
 });
}
function similarity(a,b){
 a=String(a||"").toLowerCase();b=String(b||"").toLowerCase();
 if(a===b)return 1;
 var aa=a.split(/[^a-z0-9\u00c0-\u024f\u0530-\u058f]+/).filter(Boolean),bb=b.split(/[^a-z0-9\u00c0-\u024f\u0530-\u058f]+/).filter(Boolean),n=0;
 aa.forEach(function(x){if(bb.indexOf(x)>=0)n++;});
 return aa.length&&bb.length?n/Math.min(aa.length,bb.length):0;
}
function groups(items){
 var out=[];
 items.forEach(function(x){
  var g=out.find(function(y){return similarity(y.title,x.title)>=.75;});
  if(!g){g={title:x.title,items:[]};out.push(g);}
  g.items.push(x);
 });
 return out;
}
function card(g){
 var x=g.items[0];
 return '<article class="universal-result"><div class="universal-result-body"><span class="universal-source">'+esc(g.items.length+" source record"+(g.items.length===1?"":"s"))+'</span><h3><a href="result.html?q='+encodeURIComponent(query)+'&title='+encodeURIComponent(g.title)+'">'+esc(g.title)+'</a></h3><p>'+esc((x.desc||"No description returned.").slice(0,500))+'</p><a class="universal-open" href="'+esc(x.url)+'" target="_blank" rel="noopener">Open original ↗</a></div></article>';
}
function runSearch(){
 var form=$("#universal-search-form"),input=$("#universal-search-input"),root=$("#universal-search-results");
 if(!form||!input||!root)return;
 input.value=query;
 form.addEventListener("submit",function(e){e.preventDefault();var q=input.value.trim();if(q)location.href="search.html?q="+encodeURIComponent(q);});
 if(!query)return;
 root.innerHTML='<div class="search-progress"><strong>Searching…</strong><p>Checking public knowledge sources.</p></div>';
 Promise.all(sources.map(function(s){return request(s,query);})).then(function(parts){
  var items=[];parts.forEach(function(a){items=items.concat(a);});
  var gs=groups(items);
  if(!gs.length){root.innerHTML='<div class="empty-state"><strong>No results returned.</strong><p>Try another spelling or broader term.</p></div>';return;}
  root.innerHTML='<div class="search-summary"><span class="eyebrow">SEARCH RESULTS</span><h2>'+gs.length+' result groups</h2><p>Query: <strong>'+esc(query)+'</strong></p></div><div class="universal-results-grid">'+gs.map(card).join("")+'</div>';
 });
}
function runDetail(){
 var root=$("#detail-content");
 if(!root||!query||!chosen)return;
 root.innerHTML='<div class="search-progress"><strong>Loading source records…</strong></div>';
 Promise.all(sources.map(function(s){return request(s,query);})).then(function(parts){
  var items=[];parts.forEach(function(a){items=items.concat(a);});
  var gs=groups(items),g=gs.find(function(x){return similarity(x.title,chosen)>=.75;});
  if(!g)g={title:chosen,items:[]};
  var links=g.items.map(function(x){return '<a class="detail-source" href="'+esc(x.url)+'" target="_blank" rel="noopener"><span>'+esc(x.source)+'</span><strong>'+esc(x.title)+' ↗</strong><small>'+esc((x.desc||"").slice(0,500))+'</small></a>';}).join("");
  root.innerHTML='<section class="detail-hero"><div class="eyebrow">HISTORY · SOURCE RECORD</div><h1>'+esc(g.title)+'</h1><p>Original records returned for this search.</p></section><section class="detail-section"><h2>Original sources</h2><div class="detail-sources">'+(links||'<div class="empty-state">No matching records.</div>')+'</div></section>';
 });
}
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",function(){runSearch();runDetail();});}else{runSearch();runDetail();}
})();