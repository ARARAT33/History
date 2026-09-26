const ORIGINAL_COMMIT="__ORIGINAL_COMMIT__";
async function sha256(text){const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(text));return Array.from(new Uint8Array(b),x=>x.toString(16).padStart(2,"0")).join("");}
async function verifySite(){
 const box=document.querySelector("#integrity-status"); if(!box)return;
 try{
  const m=await (await fetch("integrity.json?"+Date.now(),{cache:"no-store"})).json();
  const results=[];
  for(const [path,expected] of Object.entries(m.files)){const r=await fetch(path+"?"+Date.now(),{cache:"no-store"});if(!r.ok)throw new Error(path+" "+r.status);results.push([path,expected,await sha256(await r.text())]);}
  const bad=results.filter(x=>x[1]!==x[2]);
  const ok=!bad.length;
  box.className="integrity "+(ok?"ok":"bad");
  box.innerHTML=(ok?"✓ Կայքը օրիգինալ է":"⚠ Կայքը փոփոխված է")+" · SHA-256 ստուգված · "+results.length+" ֆայլ · <a target="_blank" rel="noopener" href="https://github.com/ARARAT33/History/commit/"+ORIGINAL_COMMIT+">original commit</a>";
  if(!ok)box.title=bad.map(x=>x[0]+" expected "+x[1]+" got "+x[2]).join("\n");
 }catch(e){box.className="integrity bad";box.textContent="⚠ Օրիգինալության ստուգումը չհաջողվեց";console.error(e);}
}
verifySite();