(() => {
"use strict";
const DATA_URL = "https://raw.githubusercontent.com/ARARAT33/AWEArchiveDB/refs/heads/main/history.json";
const PAGE_SIZE = 50;
const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (c) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));
const textOf = (obj, keys) => {
  for (const key of keys) {
    if (obj && obj[key] != null && String(obj[key]).trim()) return String(obj[key]);
  }
  return "";
};
let all = [], filtered = [], page = 1;
const root = document.getElementById("archive-content");
const search = document.getElementById("archive-search");
const count = document.getElementById("archive-count");
const pages = document.getElementById("archive-pages");

function renderCard(obj, index) {
  const id = textOf(obj, ["id","ID","uuid","identifier"]) || "record-" + (index + 1);
  const name = textOf(obj, ["name","title","label","filename","slug"]) || "Untitled";
  const desc = textOf(obj, ["description","desc","summary"]) || "No description provided.";
  const rawLink = textOf(obj, ["link","url","href","source"]);
  const body = textOf(obj, ["text","content","body","article","textContent"]);
  return '<article class="archive-card"><div class="archive-id">ID · ' + esc(id) + '</div><h3>' + esc(name) + '</h3><p>' + esc(desc) + '</p>' +
    (rawLink ? '<div class="archive-link"><b>Link:</b> <a href="' + esc(rawLink) + '" target="_blank" rel="noopener noreferrer">' + esc(rawLink) + '</a></div>' : '<div class="archive-link"><b>Link:</b> not available</div>') +
    (body ? '<div class="archive-text">' + esc(body) + '</div>' : '') + '</article>';
}
function render() {
  const total = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  if (page > total) page = total;
  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  root.innerHTML = rows.length ? rows.map(renderCard).join("") : '<div class="archive-empty">No matching archive records.</div>';
  count.textContent = filtered.length + " results";
  pages.innerHTML = '<button type="button" data-step="-1" ' + (page <= 1 ? "disabled" : "") + '>← Previous</button><span>Page ' + page + ' / ' + total + '</span><button type="button" data-step="1" ' + (page >= total ? "disabled" : "") + '>Next →</button>';
  pages.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => {
    page += Number(button.dataset.step); render(); window.scrollTo({top:0,behavior:"smooth"});
  }));
}
search.addEventListener("input", () => {
  const query = search.value.trim().toLowerCase();
  filtered = !query ? all : all.filter((item) => {
    const haystack = [textOf(item,["id","ID","uuid","identifier"]), textOf(item,["name","title","label","filename","slug"]), textOf(item,["description","desc","summary"]), textOf(item,["link","url","href","source"]), textOf(item,["text","content","body","article","textContent"])].join(" ").toLowerCase();
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
    console.error("Archive data load failed:", error);
    root.innerHTML = '<div class="archive-empty">Archive data could not be loaded right now.</div>';
  });
})();