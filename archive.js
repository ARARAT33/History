(() => {
"use strict";

const DATA_URL = "https://raw.githubusercontent.com/ARARAT33/AWEArchiveDB/refs/heads/main/history.json";
const PAGE_SIZE = 50;

const list = document.getElementById("archive-list");
const search = document.getElementById("archive-search");
const count = document.getElementById("archive-count");
const pages = document.getElementById("archive-pages");

let records = [];
let filtered = [];
let currentPage = 1;

function value(obj, key) {
  return obj && obj[key] != null ? String(obj[key]).trim() : "";
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[c]));
}

function normalize(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.items)) return data.items;
  if (data && Array.isArray(data.results)) return data.results;
  if (data && Array.isArray(data.data)) return data.data;
  return [];
}

function render() {
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  if (!visible.length) {
    list.innerHTML = '<div class="archive-empty">No results found.</div>';
  } else {
    list.innerHTML = visible.map((item, i) => {
      const name = value(item, "name") || value(item, "title") || "Untitled";
      const description = value(item, "description") || "";
      const rawUrl = value(item, "link") || value(item, "url") || value(item, "href") || "";
      const id = value(item, "id") || String(start + i + 1);

      return '<article class="archive-item">' +
        '<div style="opacity:.55;font-size:.8rem;margin-bottom:6px">ID · ' + escapeHtml(id) + '</div>' +
        '<h2>' + escapeHtml(name) + '</h2>' +
        '<p>' + escapeHtml(description) + '</p>' +
        (rawUrl
          ? '<div class="archive-url"><a href="' + escapeHtml(rawUrl) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(rawUrl) + '</a></div>'
          : '<div class="archive-url">No link available.</div>') +
        '</article>';
    }).join("");
  }

  count.textContent = filtered.length + " results";
  pages.innerHTML =
    '<button type="button" id="archive-prev" ' + (currentPage === 1 ? "disabled" : "") + '>← Previous</button>' +
    '<span>Page ' + currentPage + ' / ' + totalPages + '</span>' +
    '<button type="button" id="archive-next" ' + (currentPage === totalPages ? "disabled" : "") + '>Next →</button>';

  document.getElementById("archive-prev").onclick = () => { currentPage--; render(); window.scrollTo({top:0,behavior:"smooth"}); };
  document.getElementById("archive-next").onclick = () => { currentPage++; render(); window.scrollTo({top:0,behavior:"smooth"}); };
}

function applySearch() {
  const q = search.value.trim().toLocaleLowerCase();
  filtered = q ? records.filter(item => Object.values(item || {}).some(v =>
    String(v ?? "").toLocaleLowerCase().includes(q)
  )) : records.slice();
  currentPage = 1;
  render();
}

search.addEventListener("input", applySearch);

fetch(DATA_URL, {cache:"no-store"})
  .then(response => {
    if (!response.ok) throw new Error("HTTP " + response.status);
    return response.json();
  })
  .then(data => {
    records = normalize(data);
    filtered = records.slice();
    render();
  })
  .catch(error => {
    console.error("history.json load failed:", error);
    list.innerHTML = '<div class="archive-empty">Could not load history.json.</div>';
    count.textContent = "0 results";
  });
})();