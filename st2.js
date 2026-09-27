(()=>{"use strict";
const LANGS=[["English","en"],["Armenian","hy"],["Russian","ru"],["French","fr"],["German","de"],["Spanish","es"],["Italian","it"],["Portuguese","pt"],["Dutch","nl"],["Polish","pl"],["Czech","cs"],["Slovak","sk"],["Ukrainian","uk"],["Belarusian","be"],["Bulgarian","bg"],["Serbian","sr"],["Croatian","hr"],["Romanian","ro"],["Hungarian","hu"],["Greek","el"],["Turkish","tr"],["Azerbaijani","az"],["Georgian","ka"],["Persian","fa"],["Arabic","ar"],["Hebrew","he"],["Chinese","zh-CN"],["Japanese","ja"],["Korean","ko"],["Hindi","hi"],["Bengali","bn"],["Urdu","ur"],["Indonesian","id"],["Malay","ms"],["Vietnamese","vi"],["Thai","th"],["Swedish","sv"],["Norwegian","no"],["Danish","da"],["Finnish","fi"],["Lithuanian","lt"],["Latvian","lv"],["Estonian","et"],["Latin","la"]];
const get=(k,d)=>{try{return localStorage.getItem("history-"+k)||d}catch(_){return d}};
const set=(k,v)=>{try{localStorage.setItem("history-"+k,v)}catch(_){}};

function header(){
 if(document.querySelector(".history-site-header"))return;
 const h=document.createElement("header");
 h.className="history-site-header";
 h.innerHTML='<a class="history-brand" href="index.html">HISTORY</a><nav class="history-nav"><a href="index.html">Map</a><a href="search.html">Search</a><a href="archive.html">Archive</a><a href="sources.html">Sources</a><a href="links.html">History</a><a href="about.html">About</a></nav><div class="history-actions"><label class="history-language"><span>Language</span><select id="st2-language">'+LANGS.map(([n,c])=>'<option value="'+c+'">'+n+'</option>').join("")+'</select></label><div class="history-reading"><button id="st2-smaller" type="button">A−</button><button id="st2-larger" type="button">A+</button></div></div>';
 document.body.insertBefore(h,document.body.firstChild);
}

function footer(){
 if(document.querySelector("body>.history-global-footer"))return;
 const f=document.createElement("footer");
 f.className="history-global-footer";
 f.innerHTML='<div><strong>HISTORY</strong><span>Open historical knowledge project</span></div><nav><a href="index.html">Map</a><a href="search.html">Search</a><a href="media.html">Media</a><a href="archive.html">Archive</a><a href="sources.html">Sources</a></nav>';
 document.body.appendChild(f);
}

function translation(){
 const select=document.getElementById("st2-language");
 const saved=get("language","en");
 if(select)select.value=saved;
 select?.addEventListener("change",e=>{
   const code=e.target.value;
   set("language",code);
   if(code==="en"){
     document.cookie="googtrans=; Max-Age=0; path=/";
     location.reload();
     return;
   }
   const run=()=>{
     const combo=document.querySelector(".goog-te-combo");
     if(combo){combo.value=code;combo.dispatchEvent(new Event("change"));return true}
     return false;
   };
   if(!run()){
     let n=0;
     const t=setInterval(()=>{if(run()||++n>40)clearInterval(t)},250);
   }
 });
 window.googleTranslateElementInit=()=>{
   if(!window.google?.translate?.TranslateElement)return;
   new google.translate.TranslateElement({pageLanguage:"en",includedLanguages:LANGS.filter(x=>x[1]!=="en").map(x=>x[1]).join(","),autoDisplay:false},"st2-translate-hidden");
   const saved=get("language","en");
   if(saved!=="en"){
     let n=0;
     const t=setInterval(()=>{const combo=document.querySelector(".goog-te-combo");if(combo){combo.value=saved;combo.dispatchEvent(new Event("change"));clearInterval(t)}else if(++n>40)clearInterval(t)},250);
   }
 };
 if(!document.getElementById("st2-translate-hidden")){
   const d=document.createElement("div");d.id="st2-translate-hidden";d.hidden=true;document.body.appendChild(d);
 }
 if(!document.querySelector('script[data-st2-google-translate]')){
   const s=document.createElement("script");
   s.src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
   s.async=true;s.dataset.st2GoogleTranslate="1";document.head.appendChild(s);
 }
}

function reading(){
 const apply=()=>document.documentElement.style.setProperty("--reader-scale-st2",Number(get("size","100"))/100);
 document.getElementById("st2-smaller")?.addEventListener("click",()=>{set("size",Math.max(80,Number(get("size","100"))-10));apply()});
 document.getElementById("st2-larger")?.addEventListener("click",()=>{set("size",Math.min(150,Number(get("size","100"))+10));apply()});
}

function init(){header();footer();translation();reading()}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();