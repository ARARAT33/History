(()=>{"use strict";
const LANGS=[
  ["English","en"],["Armenian","hy"],["Russian","ru"],["French","fr"],["German","de"],["Spanish","es"],
  ["Italian","it"],["Portuguese","pt"],["Arabic","ar"],["Chinese","zh-CN"],["Japanese","ja"],["Korean","ko"],
  ["Greek","el"],["Turkish","tr"],["Persian","fa"],["Ukrainian","uk"],["Polish","pl"],["Dutch","nl"]
];
const get=(k,d)=>{try{return localStorage.getItem("history-"+k)||d}catch(_){return d}};
const set=(k,v)=>{try{localStorage.setItem("history-"+k,v)}catch(_){}}; 
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function installHeader(){
  document.querySelectorAll(".history-site-header").forEach(x=>x.remove());
  const h=document.createElement("header");
  h.className="history-site-header";
  h.innerHTML='<a class="history-brand" href="index.html">HISTORY</a><nav class="history-nav" aria-label="Primary"><a href="index.html">Map</a><a href="countries.html">Countries</a><a href="search.html">Search</a><a href="archive.html">Archive</a><a href="sources.html">Sources</a><a href="links.html">Links</a></nav><div class="history-actions"><label class="history-language">Language <select id="history-language">'+LANGS.map(([n,c])=>'<option value="'+c+'">'+n+'</option>').join("")+'</select></label></div>';
  document.body.prepend(h);
  return h;
}
function installFooter(){
  document.querySelectorAll("footer").forEach(x=>x.remove());
  const f=document.createElement("footer");
  f.className="history-global-footer";
  f.innerHTML='<div><strong>HISTORY</strong><span>Open historical knowledge project</span></div><nav><a href="index.html">Map</a><a href="search.html">Search</a><a href="media.html">Media</a><a href="archive.html">Archive</a><a href="sources.html">Sources</a></nav>';
  document.body.appendChild(f);
}
function installSelectionMenu(){
  const old=document.getElementById("history-selection-menu");if(old)old.remove();
  const menu=document.createElement("div");menu.id="history-selection-menu";menu.className="history-selection-menu";menu.innerHTML='<button type="button" data-action="source">Open source</button><button type="button" data-action="translate">Translate</button>';
  document.body.appendChild(menu);
  let selected="";
  document.addEventListener("mouseup",()=>{
    setTimeout(()=>{
      const s=String(window.getSelection()?.toString()||"").trim();
      if(s.length<2){menu.classList.remove("show");selected="";return}
      selected=s;const r=window.getSelection().getRangeAt(0).getBoundingClientRect();
      menu.style.left=Math.min(window.innerWidth-190,Math.max(8,r.left+window.scrollX))+"px";
      menu.style.top=Math.max(8,r.bottom+window.scrollY+8)+"px";menu.classList.add("show");
    },0);
  });
  menu.addEventListener("mousedown",e=>e.preventDefault());
  menu.addEventListener("click",e=>{
    const b=e.target.closest("button");if(!b||!selected)return;
    const q=encodeURIComponent(selected);
    if(b.dataset.action==="source")window.open("https://www.wikidata.org/w/index.php?search="+q,"_blank","noopener");
    else window.open("https://translate.google.com/?sl=auto&tl="+encodeURIComponent(get("language","en"))+"&text="+q+"&op=translate","_blank","noopener");
    menu.classList.remove("show");
  });
  document.addEventListener("scroll",()=>menu.classList.remove("show"),{passive:true});
}
function installTranslator(){
  if(!window.googleTranslateElementInit)window.googleTranslateElementInit=()=>{
    if(!window.google?.translate?.TranslateElement)return;
    new google.translate.TranslateElement({pageLanguage:"hy",includedLanguages:LANGS.filter(x=>x[1]!=="en").map(x=>x[1]).join(","),autoDisplay:false},"history-translate-hidden");
  };
  let hidden=document.getElementById("history-translate-hidden");
  if(!hidden){hidden=document.createElement("div");hidden.id="history-translate-hidden";hidden.hidden=true;document.body.appendChild(hidden)}
  if(!document.querySelector('script[data-history-google-translate]')){
    const s=document.createElement("script");s.src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";s.async=true;s.dataset.historyGoogleTranslate="1";document.head.appendChild(s);
  }
  const select=document.getElementById("history-language");
  const saved=get("language","en");if(select)select.value=saved;
  const apply=code=>{
    set("language",code);
    if(code==="en"){const cookie="googtrans=;path=/;max-age=0";document.cookie=cookie;document.cookie="googtrans=;domain="+location.hostname+";path=/;max-age=0";location.reload();return}
    const go=()=>{const s=document.querySelector(".goog-te-combo");if(s){s.value=code;s.dispatchEvent(new Event("change"));return true}return false};
    if(!go()){let n=0;const t=setInterval(()=>{if(go()||++n>30)clearInterval(t)},300)}
  };
  select?.addEventListener("change",e=>apply(e.target.value));
}
function installReading(){
  const old=document.querySelector(".reader-tools");if(old)old.remove();
  const h=document.querySelector(".history-actions");if(!h)return;
  const box=document.createElement("div");box.className="history-reading";
  box.innerHTML='<button type="button" id="history-smaller" aria-label="Decrease text size">A−</button><button type="button" id="history-larger" aria-label="Increase text size">A+</button>';
  h.appendChild(box);
  const apply=()=>document.documentElement.style.setProperty("--reader-scale",Math.min(150,Math.max(80,Number(get("size","100"))))+"%");
  apply();
  box.querySelector("#history-smaller").onclick=()=>{set("size",Math.max(80,Number(get("size","100"))-10));apply()};
  box.querySelector("#history-larger").onclick=()=>{set("size",Math.min(150,Number(get("size","100"))+10));apply()};
}
function cleanLegacyLinks(){
  document.querySelectorAll('a[href]').forEach(a=>{
    const h=a.getAttribute("href")||"";
    if(["videos.html","images.html"].includes(h))a.href="media.html";
    if(["peoples.html","history.html"].includes(h))a.href="index.html#history-explorer";
  });
}
function init(){
  installHeader();installFooter();installSelectionMenu();installReading();cleanLegacyLinks();installTranslator();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();