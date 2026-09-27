(()=>{"use strict";
const LANGS=[["English","en"],["Armenian","hy"],["Russian","ru"],["French","fr"],["German","de"],["Spanish","es"],["Italian","it"],["Portuguese","pt"],["Arabic","ar"],["Chinese","zh-CN"],["Japanese","ja"],["Korean","ko"],["Greek","el"],["Turkish","tr"],["Persian","fa"],["Ukrainian","uk"]];
const get=(k,d)=>{try{return localStorage.getItem("history-"+k)||d}catch(_){return d}};
const set=(k,v)=>{try{localStorage.setItem("history-"+k,v)}catch(_){}}; 
function header(){
 document.querySelectorAll(".history-site-header").forEach(x=>x.remove());
 document.querySelectorAll("body>header.page-hero, body>.page-hero").forEach(x=>x.remove());
 const h=document.createElement("header");h.className="history-site-header";
 h.innerHTML='<a class="history-brand" href="index.html">HISTORY</a><nav class="history-nav"><a href="index.html">Map</a><a href="search.html">Search</a><a href="archive.html">Archive</a><a href="sources.html">Sources</a><a href="links.html">Links</a><a href="about.html">About</a></nav><div class="history-actions"><label class="history-language"><span>Language</span><select id="history-language">'+LANGS.map(([n,c])=>'<option value="'+c+'">'+n+'</option>').join("")+'</select></label><div class="history-reading"><button id="history-smaller" type="button">A−</button><button id="history-larger" type="button">A+</button></div></div>';
 document.body.prepend(h);
}
function footer(){
 document.querySelectorAll("footer").forEach(x=>x.remove());
 const f=document.createElement("footer");f.className="history-global-footer";
 f.innerHTML='<div><strong>HISTORY</strong><span>Open historical knowledge project</span></div><nav><a href="index.html">Map</a><a href="search.html">Search</a><a href="media.html">Media</a><a href="archive.html">Archive</a><a href="sources.html">Sources</a></nav>';
 document.body.appendChild(f);
}
function selectionMenu(){
 const m=document.createElement("div");m.className="history-selection-menu";m.id="history-selection-menu";
 m.innerHTML='<button type="button" data-action="source">Open source</button><button type="button" data-action="translate">Translate</button>';
 document.body.appendChild(m);let selected="";
 document.addEventListener("mouseup",()=>setTimeout(()=>{
  const s=String(getSelection()?.toString()||"").trim();
  if(s.length<2){m.classList.remove("show");selected="";return}
  selected=s;const sel=getSelection(),range=sel?.rangeCount?sel.getRangeAt(0):null;if(!range)return;
  const rect=range.getBoundingClientRect();m.style.left=Math.min(innerWidth-205,Math.max(8,rect.left+scrollX))+"px";m.style.top=(rect.bottom+scrollY+7)+"px";m.classList.add("show");
 },0));
 m.addEventListener("mousedown",e=>e.preventDefault());
 m.addEventListener("click",e=>{
  const b=e.target.closest("button");if(!b||!selected)return;
  if(b.dataset.action==="source"){
   const sel=getSelection(),node=sel?.anchorNode?.parentElement,link=node?.closest?.("a[href]");
   if(link?.href)open(link.href,"_blank","noopener");
   else open("https://www.google.com/search?q="+encodeURIComponent(selected),"_blank","noopener");
  }else{
   const lang=get("language","en");
   open("https://translate.google.com/?sl=auto&tl="+encodeURIComponent(lang)+"&text="+encodeURIComponent(selected)+"&op=translate","_blank","noopener");
  }
  m.classList.remove("show");
 });
 document.addEventListener("mousedown",e=>{if(!e.target.closest(".history-selection-menu"))m.classList.remove("show")});
}
function translation(){
 const select=document.getElementById("history-language");const saved=get("language","en");if(select)select.value=saved;
 select?.addEventListener("change",e=>{set("language",e.target.value);applyGoogle(e.target.value)});
 function applyGoogle(code){
  if(code==="en"){document.cookie="googtrans=; Max-Age=0; path=/";location.reload();return}
  const run=()=>{const s=document.querySelector(".goog-te-combo");if(s){s.value=code;s.dispatchEvent(new Event("change"));return true}return false};
  if(!run()){let n=0;const t=setInterval(()=>{if(run()||++n>30)clearInterval(t)},250)}
 }
 window.googleTranslateElementInit=()=>{
  if(!window.google?.translate?.TranslateElement)return;
  new google.translate.TranslateElement({pageLanguage:"en",includedLanguages:LANGS.filter(x=>x[1]!=="en").map(x=>x[1]).join(","),autoDisplay:false},"history-translate-hidden");
 };
 const d=document.createElement("div");d.id="history-translate-hidden";d.hidden=true;document.body.appendChild(d);
 const s=document.createElement("script");s.src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";s.async=true;document.head.appendChild(s);
}
function reading(){
 const apply=()=>document.documentElement.style.setProperty("--reader-scale",(Math.min(150,Math.max(80,Number(get("size","100")))/100)));
 apply();document.getElementById("history-smaller")?.addEventListener("click",()=>{set("size",Math.max(80,Number(get("size","100"))-10));apply()});
 document.getElementById("history-larger")?.addEventListener("click",()=>{set("size",Math.min(150,Number(get("size","100"))+10));apply()});
}
function cleanLinks(){document.querySelectorAll("a[href]").forEach(a=>{const h=a.getAttribute("href")||"";if(["videos.html","images.html"].includes(h))a.href="media.html";if(["peoples.html","history.html","countries.html","materials.html"].includes(h))a.href="index.html";});}
function init(){header();footer();selectionMenu();translation();reading();cleanLinks()}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();