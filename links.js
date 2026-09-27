(() => {
"use strict";

const DATA_URL = "https://raw.githubusercontent.com/ARARAT33/AWEArchiveDB/refs/heads/main/pagehistory.json";
const PAGE_SIZE = 50;

const list = document.getElementById("links-list");
const search = document.getElementById("links-search");
const count = document.getElementById("links-count");
const pages = document.getElementById("links-pages");

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

function youtubeEmbed(url) {
  try {
    const u = new URL(url);
    let id = "";
    if (u.hostname === "youtu.be") id = u.pathname.split("/")[1] || "";
    else if (u.hostname === "youtube.com" || u.hostname === "www.youtube.com") {
      if (u.pathname === "/watch") id = u.searchParams.get("v") || "";
      else if (u.pathname.startsWith("/shorts/")) id = u.pathname.split("/")[2] || "";
      else if (u.pathname.startsWith("/embed/")) id = u.pathname.split("/")[2] || "";
    }
    return /^[A-Za-z0-9_-]{6,20}$/.test(id)
      ? "https://www.youtube.com/embed/" + encodeURIComponent(id)
      : "";
  } catch (_) {
    return "";
  }
}

function render() {
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  if (!visible.length) {
    list.innerHTML = '<div class="links-empty">No results found.</div>';
  } else {
    list.innerHTML = visible.map((item, i) => {
      const name = value(item, "name") || value(item, "title") || "Untitled";
      const description = value(item, "description") || "";
      const rawUrl = value(item, "link") || value(item, "url") || value(item, "href") || "";
      const id = value(item, "id") || String(start + i + 1);
      const frameUrl = youtubeEmbed(rawUrl) || rawUrl;

      return '<article class="links-item">' +
        '<div style="opacity:.55;font-size:.8rem;margin-bottom:6px">ID · ' + escapeHtml(id) + '</div>' +
        '<h2>' + escapeHtml(name) + '</h2>' +
        '<p>' + escapeHtml(description) + '</p>' +
        (rawUrl
          ? '<div class="links-url"><a href="' + escapeHtml(rawUrl) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(rawUrl) + '</a></div>' +
            '<iframe class="links-frame" src="' + escapeHtml(frameUrl) + '" title="' + escapeHtml(name) + '" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"></iframe>' +
            '<a class="links-open" href="' + escapeHtml(rawUrl) + '" target="_blank" rel="noopener noreferrer">Open original link ↗</a>'
          : '<div class="links-url">No link available.</div>') +
        '</article>';
    }).join("");
  }

  count.textContent = filtered.length + " results";
  pages.innerHTML =
    '<button type="button" id="links-prev" ' + (currentPage === 1 ? "disabled" : "") + '>← Previous</button>' +
    '<span>Page ' + currentPage + ' / ' + totalPages + '</span>' +
    '<button type="button" id="links-next" ' + (currentPage === totalPages ? "disabled" : "") + '>Next →</button>';

  document.getElementById("links-prev").onclick = () => { currentPage--; render(); window.scrollTo({top:0,behavior:"smooth"}); };
  document.getElementById("links-next").onclick = () => { currentPage++; render(); window.scrollTo({top:0,behavior:"smooth"}); };
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
    console.error("pagehistory.json load failed:", error);
    list.innerHTML = '<div class="links-empty">Could not load pagehistory.json.</div>';
    count.textContent = "0 results";
  });
})();