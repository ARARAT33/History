(() => {
"use strict";
const DATA_URL = "https://raw.githubusercontent.com/ARARAT33/AWEArchiveDB/refs/heads/main/pagehistory.json";
const PAGE_SIZE = 50;
const esc = (value) => String(value ?? "").replace(/[&<>"]/g, (c) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));
const textOf = (obj, keys) => {
  for (const key of keys) {
    if (obj && obj[key] != null && String(obj[key]).trim()) return obj[key];
  }
  return "";
};
let all = [];
let filtered = [];
let page = 1;
const root = document.getElementById("links-content");
const search = document.getElementById("links-search");
const count = document.getElementById("links-count");
const pages = document.getElementById("links-pages");
function validUrl(value) {
  try {
    const url = new URL(String(value ?? "").trim());
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : "";
  } catch (_) { return ""; }
}
function renderCard(obj, index) {
  const id = textOf(obj, ["id","ID","uuid","identifier"]) || "record-" + (index + 1);
  const name = textOf(obj, ["name","title","label","pageName","page_name","slug"]) || "Untitled";
  const desc = textOf(obj, ["description","desc","summary"]) || "No description provided.";
  const url = validUrl(textOf(obj, ["link","url","href","source"]));
  return '<article class="links-card"><div class="links-id">ID · ' + esc(id) + '</div><h3>' + esc(name) + '</h3><p>' + esc(desc) + '</p>' +
    (url ? '<div class="links-link"><b>Link:</b> <a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(url) + '</a></div><div class="links-preview"><iframe src="' + esc(url) + '" title="' + esc(name) + '" loading="lazy" referrerpolicy="no-referrer" allow="fullscreen"></iframe></div><div class="links-actions"><a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">Open link ↗</a></div>' : '<div class="links-link"><b>Link:</b> not available</div>') +
    '</article>';
}
function render() {
  const total = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  if (page > total) page = total;
  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  root.innerHTML = rows.length ? rows.map(renderCard).join("") : '<div class="links-empty">No matching links.</div>';
  count.textContent = filtered.length + " results";
  pages.innerHTML = '<button type="button" data-step="-1" ' + (page <= 1 ? "disabled" : "") + '>← Previous</button><span>Page ' + page + ' / ' + total + '</span><button type="button" data-step="1" ' + (page >= total ? "disabled" : "") + '>Next →</button>';
  pages.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      page += Number(button.dataset.step);
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}
search.addEventListener("input", () => {
  const query = search.value.trim().toLowerCase();
  filtered = all.filter((item) => JSON.stringify(item).toLowerCase().includes(query));
  page = 1;
  render();
});
fetch(DATA_URL, { cache: "no-store" })
  .then((response) => { if (!response.ok) throw new Error("HTTP " + response.status); return response.json(); })
  .then((data) => {
    all = Array.isArray(data) ? data : [];
    filtered = all;
    render();
  })
  .catch((error) => {
    console.error("Links data load failed:", error);
    root.innerHTML = '<div class="links-empty">Links data could not be loaded right now.</div>';
  });
})();