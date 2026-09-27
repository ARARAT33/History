(() => {
"use strict";
const DATA_URL = "https://raw.githubusercontent.com/ARARAT33/AWEArchiveDB/refs/heads/main/pagehistory.json";
const PAGE_SIZE = 50;
const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (c) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));
const textOf = (obj, keys) => {
  for (const key of keys) {
    if (obj && obj[key] != null && String(obj[key]).trim()) return String(obj[key]);
  }
  return "";
};
let all = [], filtered = [], page = 1;
const root = document.getElementById("links-content");
const search = document.getElementById("links-search");
const count = document.getElementById("links-count");
const pages = document.getElementById("links-pages");

function youtubeEmbed(rawLink) {
  try {
    const url = new URL(rawLink);
    let id = "";
    if (url.hostname === "youtu.be") id = url.pathname.slice(1).split("/")[0];
    if (url.hostname === "www.youtube.com" || url.hostname === "youtube.com") {
      if (url.pathname === "/watch") id = url.searchParams.get("v") || "";
      if (url.pathname.startsWith("/shorts/")) id = url.pathname.split("/")[2] || "";
      if (url.pathname.startsWith("/embed/")) id = url.pathname.split("/")[2] || "";
    }
    if (!id || !/^[A-Za-z0-9_-]{6,20}$/.test(id)) return "";
    return "https://www.youtube.com/embed/" + encodeURIComponent(id);
  } catch (_) { return ""; }
}
function renderCard(obj, index) {
  const id = textOf(obj, ["id","ID","uuid","identifier"]) || "record-" + (index + 1);
  const name = textOf(obj, ["name","title","label","pageName","page_name","slug"]) || "Untitled";
  const desc = textOf(obj, ["description","desc","summary"]) || "No description provided.";
  const rawLink = textOf(obj, ["link","url","href","source"]);
  // Every link gets a preview iframe. YouTube uses its embeddable URL;
  // other URLs are loaded directly (the target site may still block framing
  // with X-Frame-Options/CSP, which is enforced by the browser).
  const embed = rawLink ? (youtubeEmbed(rawLink) || rawLink) : "";
  const preview = embed
    ? '<div class="links-preview"><iframe src="' + esc(embed) + '" title="' + esc(name) + '" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"></iframe></div>'
    : "";
  return '<article class="links-card"><div class="links-id">ID · ' + esc(id) + '</div><h3>' + esc(name) + '</h3><p>' + esc(desc) + '</p>' +
    (rawLink ? '<div class="links-link"><b>Link:</b> <a href="' + esc(rawLink) + '" target="_blank" rel="noopener noreferrer">' + esc(rawLink) + '</a></div>' + preview + '<div class="links-actions"><a href="' + esc(rawLink) + '" target="_blank" rel="noopener noreferrer">Open link ↗</a></div>' : '<div class="links-link"><b>Link:</b> not available</div>') +
    '</article>';
}
function render() {
  const total = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  if (page > total) page = total;
  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  root.innerHTML = rows.length ? rows.map(renderCard).join("") : '<div class="links-empty">No matching links.</div>';
  count.textContent = filtered.length + " results";
  pages.innerHTML = '<button type="button" data-step="-1" ' + (page <= 1 ? "disabled" : "") + '>← Previous</button><span>Page ' + page + ' / ' + total + '</span><button type="button" data-step="1" ' + (page >= total ? "disabled" : "") + '>Next →</button>';
  pages.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => {
    page += Number(button.dataset.step); render(); window.scrollTo({top:0,behavior:"smooth"});
  }));
}
search.addEventListener("input", () => {
  const query = search.value.trim().toLowerCase();
  filtered = !query ? all : all.filter((item) => {
    const haystack = [textOf(item,["id","ID","uuid","identifier"]), textOf(item,["name","title","label","pageName","page_name","slug"]), textOf(item,["description","desc","summary"]), textOf(item,["link","url","href","source"])].join(" ").toLowerCase();
    return haystack.includes(query);
  });
  page = 1; render();
});
fetch(DATA_URL, {cache:"no-store"})
  .then((response) => { if (!response.ok) throw new Error("HTTP " + response.status); return response.json(); })
  .then((data) => {
    all = Array.isArray(data) ? data : [];
    filtered = all; render();
  })
  .catch((error) => {
    console.error("Links data load failed:", error);
    root.innerHTML = '<div class="links-empty">Links data could not be loaded right now.</div>';
  });
})();