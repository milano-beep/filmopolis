const API_URL = '/api/films';
const TOKEN_STORAGE = 'filmopolis-token';
let unlocked = false;   // true až keď server overí prístupový kód

function getToken(){ try{ return localStorage.getItem(TOKEN_STORAGE) || ''; }catch(e){ return ''; } }
function setToken(t){
  try{ if(t) localStorage.setItem(TOKEN_STORAGE, t); else localStorage.removeItem(TOKEN_STORAGE); }catch(e){}
}
// starý TMDb kľúč v prehliadači už nie je potrebný
try{ localStorage.removeItem('filmopolis-tmdb-key'); }catch(e){}

// Bezpečnosť: povoľ len obrázky z TMDb; všetko, čo ide do HTML, sa ošetruje cez escapeHTML.
function safeImg(u){ return typeof u === 'string' && /^https:\/\/image\.tmdb\.org\//.test(u) ? u : ''; }

// fetch s prístupovým kľúčom; pri 401 otvorí nastavenia a vyžiada kľúč
async function authFetch(url, opts = {}, silent = false){
  const headers = Object.assign({}, opts.headers || {});
  const t = getToken();
  if(t) headers.Authorization = 'Bearer ' + t;
  const res = await fetch(url, Object.assign({}, opts, { headers }));
  if(res.status === 401 || res.status === 503){
    let msg = '';
    try{ msg = (await res.clone().json()).error || ''; }catch(e){}
    if(res.status === 401){
      if(t){ setToken(''); unlocked = false; applyLockUI(); }
      if(!silent) promptForToken(t ? 'Kód už nie je platný. Zadaj ho znova.' : 'Na úpravy zbierky odomkni appku prístupovým kódom.');
    }
    const err = new Error(msg || ('API ' + res.status));
    err.status = res.status;
    throw err;
  }
  return res;
}
async function apiError(res){
  let msg = '';
  try{ msg = (await res.json()).error || ''; }catch(e){}
  const err = new Error(msg || ('API ' + res.status));
  err.status = res.status;
  return err;
}
function reportError(err, fallback){
  if(err && err.status === 401) return;
  alert(err && err.status ? err.message : fallback);
}

function applyLegacyRating(item){
  if(item.rating == null){
    const legacy = [item.milan, item.basa].filter(v => v != null && Number.isFinite(Number(v)));
    item.rating = legacy.length ? Math.round(legacy.reduce((a,b)=>a+Number(b),0) / legacy.length) : null;
  }
  return item;
}

async function apiGetAll(){
  const res = await authFetch(API_URL, { cache: 'no-store' }, true);
  if(!res.ok) throw new Error('API ' + res.status);
  const list = await res.json();
  return list.map(applyLegacyRating);
}
async function apiAdd(entry){
  const res = await authFetch(API_URL, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(entry)
  });
  if(!res.ok) throw await apiError(res);
  return applyLegacyRating(await res.json());
}
async function apiPatch(patch){
  const res = await authFetch(API_URL, {
    method:'PATCH',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(patch)
  });
  if(!res.ok) throw await apiError(res);
  return await res.json();
}
async function apiDelete(id){
  const res = await authFetch(API_URL, {
    method:'DELETE',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ id })
  });
  if(!res.ok) throw await apiError(res);
  return await res.json();
}

let data = [];
let state = { type:'all', sort:'added-desc' };

const rowsEl = document.getElementById('rows');
const genrePillsEl = document.getElementById('genrePills');
const activeFilters = { status:new Set(), provider:new Set(), genre:new Set(), year:new Set() };
const expandedGroups = new Set();
const GROUP_LIMIT = { provider: 8, genre: 10, year: 10 };

function splitGenres(genreStr){
  return (genreStr || '').split(',').map(g => g.trim()).filter(Boolean);
}
function activeFilterCount(){
  return Object.values(activeFilters).reduce((n, set) => n + set.size, 0);
}
function countBy(extract){
  const m = new Map();
  data.forEach(d => extract(d).forEach(v => m.set(v, (m.get(v) || 0) + 1)));
  return m;
}
function updateFilterToggleLabel(){
  const btn = document.getElementById('genreToggleBtn');
  if(!btn) return;
  const n = activeFilterCount();
  const open = genrePillsEl.classList.contains('mobile-open');
  btn.textContent = open ? '✕ Zavrieť filtre' : (n ? '🏷️ Filtre (' + n + ')' : '🏷️ Filtre');
}

function renderGenrePills(){
  const unwatchedCount = data.filter(d => getCombinedRating(d) == null).length;
  const groups = [];
  if(unwatchedCount) groups.push({ key:'status', label:'Stav', items:[['unwatched', 'Nepozreté', unwatchedCount]] });

  const byCount = (a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'sk');
  const providers = [...countBy(d => d.providerName ? [d.providerName] : [])].sort(byCount);
  const genres = [...countBy(d => splitGenres(d.genre))].sort(byCount);
  const years = [...countBy(d => d.year ? [String(d.year)] : [])].sort((a, b) => b[0].localeCompare(a[0]));
  if(providers.length) groups.push({ key:'provider', label:'Služba', items:providers.map(([v, n]) => [v, v, n]) });
  if(genres.length) groups.push({ key:'genre', label:'Žáner', items:genres.map(([v, n]) => [v, v, n]) });
  if(years.length) groups.push({ key:'year', label:'Rok', items:years.map(([v, n]) => [v, v, n]) });

  const pill = (group, value, label, n) =>
    `<button type="button" class="genre-pill${activeFilters[group].has(value) ? ' active' : ''}" data-group="${group}" data-value="${escapeHTML(value)}">${escapeHTML(label)}<span class="gp-count">${n}</span></button>`;

  let html = groups.map(g => {
    const limit = GROUP_LIMIT[g.key] || Infinity;
    const expanded = expandedGroups.has(g.key);
    let visible = g.items;
    let more = '';
    if(!expanded && g.items.length > limit){
      const head = g.items.slice(0, limit);
      const shown = new Set(head.map(i => i[0]));
      // aktívne filtre zostanú viditeľné, aj keď sú mimo prvých položiek
      const pinned = g.items.filter(i => !shown.has(i[0]) && activeFilters[g.key].has(i[0]));
      visible = head.concat(pinned);
      more = `<button type="button" class="genre-pill more" data-more="${g.key}">Ďalšie (${g.items.length - visible.length})</button>`;
    } else if(expanded && g.items.length > limit){
      more = `<button type="button" class="genre-pill more" data-more="${g.key}">Menej</button>`;
    }
    return `<div class="filter-group"><span class="fg-label">${g.label}</span><div class="fg-pills">${visible.map(i => pill(g.key, i[0], i[1], i[2])).join('')}${more}</div></div>`;
  }).join('');

  const n = activeFilterCount();
  if(n) html += `<div class="filter-clear-row"><button type="button" class="genre-pill clear" data-clear="1">Zrušiť filtre (${n})</button></div>`;
  genrePillsEl.innerHTML = html;
  updateFilterToggleLabel();
}

genrePillsEl.addEventListener('click', e=>{
  const more = e.target.closest('[data-more]');
  if(more){
    const k = more.dataset.more;
    if(expandedGroups.has(k)) expandedGroups.delete(k); else expandedGroups.add(k);
    renderGenrePills();
    return;
  }
  if(e.target.closest('[data-clear]')){
    Object.values(activeFilters).forEach(set => set.clear());
    applyFiltersAndRender();
    return;
  }
  const btn = e.target.closest('.genre-pill[data-group]');
  if(!btn) return;
  const set = activeFilters[btn.dataset.group];
  const v = btn.dataset.value;
  if(set.has(v)) set.delete(v); else set.add(v);
  applyFiltersAndRender();
});

function renderStats(){
  const films = data.filter(d => d.type !== 'seriál').length;
  const series = data.length - films;
  const rated = data.map(getCombinedRating).filter(v => v != null);
  const avg = rated.length ? Math.round(rated.reduce((a, b) => a + b, 0) / rated.length) + ' %' : '–';
  const unwatched = data.length - rated.length;
  const active = activeFilters.status.has('unwatched');
  document.getElementById('stats').innerHTML = `
    <div class="stat"><b>${films}</b><span>filmov</span></div>
    <div class="stat"><b>${series}</b><span>seriálov</span></div>
    <div class="stat"><b>${avg}</b><span>priemer</span></div>
    <button type="button" class="stat${active ? ' active' : ''}" id="statUnwatched" title="Zobraziť len nepozreté"><b>${unwatched}</b><span>nepozretých</span></button>`;
}
document.getElementById('stats').addEventListener('click', e=>{
  if(!e.target.closest('#statUnwatched')) return;
  const set = activeFilters.status;
  if(set.has('unwatched')) set.delete('unwatched'); else set.add('unwatched');
  applyFiltersAndRender();
});

document.addEventListener('error', e => {
  const img = e.target;
  if(img && img.tagName === 'IMG' && img.dataset && img.dataset.fallback){
    const ph = document.createElement('div');
    ph.className = 'poster-placeholder';
    ph.textContent = 'Bez náhľadu';
    img.replaceWith(ph);
  }
}, true);

function escapeHTML(s){
  return (s||'').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

function getCombinedRating(item){
  return item.rating != null && Number.isFinite(Number(item.rating)) ? Number(item.rating) : null;
}

function rowHTML(item){
  const combined = getCombinedRating(item);
  
  const hqPoster = safeImg(item.poster).replace(/\/w(92|154|185)\//, '/w500/');
  const hqLogo = safeImg(item.providerLogo).replace(/\/w(45|92)\//, '/w154/');

  const unwatched = combined == null;

  const posterInner = hqPoster
    ? `<img src="${escapeHTML(hqPoster)}" alt="Plagát: ${escapeHTML(item.title)}" class="poster-thumb" data-fallback="1">`
    : `<div class="poster-placeholder">${escapeHTML(item.title)}</div>`;
    
  const ratingInline = combined != null
    ? `<span class="rating-inline" title="Moje hodnotenie"><span class="rating-star">★</span>${combined}<small>%</small></span>`
    : '';
  const posterHTML = `<div class="poster-frame">${posterInner}</div>`;

  const hasNotes = item.notes && item.notes.trim().length > 0;
  const infoChip = hasNotes
    ? `<span class="icon-chip info-chip has-notes" title="Má poznámky"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="14 3 14 9 20 9"></polyline><line x1="8" y1="14" x2="16" y2="14"></line><line x1="8" y1="18" x2="13" y2="18"></line></svg></span>`
    : '<span></span>';

  const providerChip = hqLogo
    ? `<span class="icon-chip provider-chip" title="${escapeHTML(item.providerName || 'Dostupné na')}"><img src="${escapeHTML(hqLogo)}" alt="${escapeHTML(item.providerName || '')}"></span>`
    : `<span class="icon-chip provider-chip empty" title="Nezistené, kde sledovať">—</span>`;

  const metaParts = [];
  if(item.year) metaParts.push(item.year);
  if(item.genre) {
    const firstGenre = item.genre.split(',')[0].trim();
    if(firstGenre) metaParts.push(firstGenre);
  }
  const metaString = metaParts.join(' · ');
  const metaLabel = metaString ? `<div class="card-meta">${escapeHTML(metaString)}</div>` : '';

  return `
  <div class="row-card${unwatched ? ' unwatched' : ''}" data-id="${item.id}" tabindex="0" role="button" aria-label="Detail: ${escapeHTML(item.title)}${unwatched ? ' (nepozreté)' : ''}"${unwatched ? ' title="Nepozreté (bez hodnotenia)"' : ''}>
    ${posterHTML}
    <div class="card-info">
      <div class="card-title" title="${escapeHTML(item.title)}">${escapeHTML(item.title)}</div>
      ${metaLabel}
    </div>
    <div class="icon-row">
      <div class="row-left">${ratingInline}${infoChip}</div>
      ${providerChip}
    </div>
  </div>`;
}

function applyFiltersAndRender(){
  renderGenrePills();
  renderStats();
  let list = data.slice();
  if(state.type !== 'all') list = list.filter(d => d.type === state.type);
  
  if(activeFilterCount() > 0){
    list = list.filter(d => {
      const f = activeFilters;
      if(f.status.size && getCombinedRating(d) != null) return false;
      if(f.provider.size && !f.provider.has(d.providerName)) return false;
      if(f.genre.size && !splitGenres(d.genre).some(g => f.genre.has(g))) return false;
      if(f.year.size && !f.year.has(d.year ? String(d.year) : '')) return false;
      return true;
    });
  }

  switch(state.sort){
    case 'added-desc': list.sort((a,b)=>b.id-a.id); break;
    case 'rating-desc': list.sort((a,b)=>(getCombinedRating(b)??-1)-(getCombinedRating(a)??-1)); break;
    case 'rating-asc': list.sort((a,b)=>(getCombinedRating(a)??101)-(getCombinedRating(b)??101)); break;
    case 'year-desc': list.sort((a,b)=>(b.year??0)-(a.year??0)); break;
    case 'year-asc': list.sort((a,b)=>(a.year??9999)-(b.year??9999)); break;
    case 'az': list.sort((a,b)=>a.title.localeCompare(b.title,'sk')); break;
  }
  rowsEl.innerHTML = list.length
    ? list.map(rowHTML).join('')
    : `<div class="empty-state">Žiadne tituly nezodpovedajú vyhľadávaniu.</div>`;
}

document.getElementById('sortSel').addEventListener('change', e=>{ state.sort = e.target.value; applyFiltersAndRender(); });
document.getElementById('typeToggle').addEventListener('click', e=>{
  const btn = e.target.closest('button'); if(!btn) return;
  document.querySelectorAll('#typeToggle button').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  state.type = btn.dataset.type;
  applyFiltersAndRender();
});
rowsEl.addEventListener('click', e=>{
  const card = e.target.closest('.row-card');
  if(card) openDetail(Number(card.dataset.id));
});
rowsEl.addEventListener('keydown', e=>{
  if(e.key !== 'Enter' && e.key !== ' ') return;
  const card = e.target.closest('.row-card');
  if(!card) return;
  e.preventDefault();
  openDetail(Number(card.dataset.id));
});

async function performDelete(id){
  const prevData = data;
  data = data.filter(d => d.id !== id);
  applyFiltersAndRender();
  try{
    await apiDelete(id);
  }catch(err){
    console.error('Zmazanie zlyhalo:', err);
    data = prevData;
    applyFiltersAndRender();
    reportError(err, 'Zmazanie sa nepodarilo — skontroluj pripojenie.');
  }
}

const deleteConfirmOverlay = document.getElementById('deleteConfirmOverlay');
const deleteConfirmTitle = document.getElementById('deleteConfirmTitle');
let pendingDeleteId = null;
let longPressTimer = null;
let longPressTriggered = false;

function openDeleteConfirm(id){
  const item = data.find(d => d.id === id);
  if(!item) return;
  pendingDeleteId = id;
  deleteConfirmTitle.textContent = item.title;
  deleteConfirmOverlay.classList.add('open');
}
function closeDeleteConfirm(){
  deleteConfirmOverlay.classList.remove('open');
  pendingDeleteId = null;
}
document.getElementById('deleteConfirmCancel').addEventListener('click', closeDeleteConfirm);
document.getElementById('deleteConfirmYes').addEventListener('click', ()=>{
  const id = pendingDeleteId;
  closeDeleteConfirm();
  if(id != null) performDelete(id);
});
deleteConfirmOverlay.addEventListener('click', e=>{ if(e.target === deleteConfirmOverlay) closeDeleteConfirm(); });

function clearLongPress(){
  clearTimeout(longPressTimer);
  longPressTimer = null;
}

rowsEl.addEventListener('pointerdown', e=>{
  const card = e.target.closest('.row-card');
  if(!card || !unlocked) return;
  if(e.target.closest('.rate-btn') || e.target.closest('a.poster-frame')) return;
  longPressTriggered = false;
  longPressTimer = setTimeout(()=>{
    longPressTriggered = true;
    openDeleteConfirm(Number(card.dataset.id));
  }, 550);
});
['pointerup','pointerleave','pointercancel','pointermove'].forEach(evt=>{
  rowsEl.addEventListener(evt, ()=> clearLongPress());
});
rowsEl.addEventListener('contextmenu', e=>{
  if(e.target.closest('.row-card')) e.preventDefault();
});
rowsEl.addEventListener('click', e=>{
  if(longPressTriggered){
    e.preventDefault();
    e.stopPropagation();
    longPressTriggered = false;
  }
}, true);

/* Detail titulu: hodnotenie, poznámky, informácie a mazanie na jednom mieste */
const detailOverlay = document.getElementById('detailOverlay');
const detailRating = document.getElementById('detailRating');
const detailRatingValue = document.getElementById('detailRatingValue');
const detailNotes = document.getElementById('detailNotes');
let detailItem = null;
let detailDraftRating = null;

function renderDetailRating(){
  if(detailDraftRating == null){
    detailRatingValue.className = 'rating-value empty';
    detailRatingValue.textContent = 'Bez hodnotenia';
    detailRating.value = 50;
  } else {
    detailRatingValue.className = 'rating-value';
    detailRatingValue.innerHTML = '<span class="rating-star">★</span>' + detailDraftRating + ' %';
    detailRating.value = detailDraftRating;
  }
  document.getElementById('detailRatingClear').style.visibility = detailDraftRating == null ? 'hidden' : 'visible';
}

function openDetail(id){
  const item = data.find(d => d.id === id);
  if(!item) return;
  detailItem = item;
  detailDraftRating = getCombinedRating(item);

  const poster = safeImg(item.poster).replace(/\/w(92|154|185)\//, '/w500/');
  document.getElementById('detailPoster').innerHTML = poster
    ? `<img src="${escapeHTML(poster)}" alt="Plagát: ${escapeHTML(item.title)}" data-fallback="1">`
    : `<div class="poster-placeholder">${escapeHTML(item.title)}</div>`;

  document.getElementById('detailTitle').textContent = item.title;
  const orig = document.getElementById('detailOriginal');
  orig.textContent = item.original && item.original !== item.title ? item.original : '';
  orig.style.display = orig.textContent ? '' : 'none';
  document.getElementById('detailSub').textContent = [item.year, item.type === 'seriál' ? 'Seriál' : 'Film'].filter(Boolean).join(', ');
  document.getElementById('detailTags').innerHTML = splitGenres(item.genre).map(g => `<span>${escapeHTML(g)}</span>`).join('');

  const logo = safeImg(item.providerLogo).replace(/\/w(45|92)\//, '/w154/');
  const tmdbUrl = Number.isInteger(Number(item.tmdbId)) && Number(item.tmdbId) > 0 ? `https://www.themoviedb.org/${item.type === 'seriál' ? 'tv' : 'movie'}/${item.tmdbId}` : '';
  const facts = [];
  if(item.director) facts.push(['Réžia', escapeHTML(item.director)]);
  if(item.actors) facts.push(['Hrajú', escapeHTML(item.actors)]);
  if(item.public != null) facts.push(['TMDb', escapeHTML(String(item.public)) + ' %']);
  if(item.providerName) facts.push(['Pozrieť na', (logo ? `<img src="${escapeHTML(logo)}" alt="">` : '') + escapeHTML(item.providerName)]);
  if(tmdbUrl) facts.push(['Odkaz', `<a href="${tmdbUrl}" target="_blank" rel="noopener">Otvoriť na TMDb</a>`]);
  document.getElementById('detailFacts').innerHTML = facts.map(f => `<dt>${f[0]}</dt><dd>${f[1]}</dd>`).join('');

  const summary = document.getElementById('detailSummary');
  summary.textContent = item.summary || '';
  summary.style.display = item.summary ? '' : 'none';

  detailNotes.value = item.notes || '';
  renderDetailRating();
  detailOverlay.querySelector('.detail').classList.toggle('readonly', !unlocked);
  detailOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  detailOverlay.querySelector('.detail').scrollTop = 0;
}

function detailIsDirty(){
  if(!detailItem) return false;
  return detailDraftRating !== getCombinedRating(detailItem) || detailNotes.value.trim() !== (detailItem.notes || '').trim();
}
function closeDetail(force){
  if(!force && detailIsDirty() && !confirm('Zahodiť neuložené zmeny?')) return;
  detailOverlay.classList.remove('open');
  document.body.style.overflow = '';
  detailItem = null;
}

detailRating.addEventListener('input', ()=>{ detailDraftRating = Number(detailRating.value); renderDetailRating(); });
document.getElementById('detailRatingClear').addEventListener('click', ()=>{ detailDraftRating = null; renderDetailRating(); });
document.getElementById('detailClose').addEventListener('click', ()=> closeDetail());
document.getElementById('detailCancel').addEventListener('click', ()=> closeDetail());
detailOverlay.addEventListener('click', e=>{ if(e.target === detailOverlay) closeDetail(); });
document.addEventListener('keydown', e=>{
  if(e.key === 'Escape' && detailOverlay.classList.contains('open')) closeDetail();
});
document.getElementById('detailDelete').addEventListener('click', ()=>{
  const id = detailItem && detailItem.id;
  closeDetail(true);
  if(id != null) openDeleteConfirm(id);
});
document.getElementById('detailSave').addEventListener('click', async ()=>{
  const item = detailItem;
  if(!item) return;
  const newRating = detailDraftRating;
  const newNotes = detailNotes.value.trim();
  const prev = { rating: item.rating, notes: item.notes };
  item.rating = newRating;
  item.notes = newNotes;
  closeDetail(true);
  applyFiltersAndRender();
  try{
    await apiPatch({ id: item.id, rating: newRating, milan: null, basa: null, notes: newNotes });
  }catch(err){
    console.error('Uloženie zlyhalo:', err);
    item.rating = prev.rating;
    item.notes = prev.notes;
    applyFiltersAndRender();
    reportError(err, 'Uloženie sa nepodarilo — skontroluj pripojenie.');
  }
});

const settingsOverlay = document.getElementById('settingsOverlay');
const settingsMsg = document.getElementById('settingsMsg');
const tokenInput = document.getElementById('f-token');
const tokenError = document.getElementById('tokenError');
const lockBtn = document.getElementById('lockBtn');
const searchInput = document.getElementById('search');
const ICON_LOCKED = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"></rect><path d="M8 11V7a4 4 0 0 1 8 0v4"></path></svg>';
const ICON_OPEN = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"></rect><path d="M8 11V7a4 4 0 0 1 7.5-2"></path></svg>';

// Jediné miesto, ktoré mení vzhľad podľa toho, či je appka odomknutá.
function applyLockUI(){
  document.body.classList.toggle('locked', !unlocked);
  lockBtn.innerHTML = (unlocked ? ICON_OPEN : ICON_LOCKED) + '<span>' + (unlocked ? 'Odomknuté' : 'Odomknúť') + '</span>';
  lockBtn.title = unlocked ? 'Úpravy sú odomknuté' : 'Zbierka je len na čítanie. Klikni pre odomknutie.';
  searchInput.readOnly = !unlocked;
  searchInput.placeholder = unlocked ? 'Pridať titul z TMDb…' : 'Zamknuté: odomkni a môžeš pridávať tituly';
  if(!unlocked) resetMainSuggest();
}

async function checkToken(token){
  const res = await fetch('/api/auth-check', { headers: { Authorization: 'Bearer ' + token } });
  let msg = '';
  if(!res.ok){ try{ msg = (await res.json()).error || ''; }catch(e){} }
  return { ok: res.ok, status: res.status, msg };
}
// Pri načítaní: platnosť uloženého kódu over na serveri (pri výpadku siete ho ponechaj).
async function restoreLock(){
  const t = getToken();
  if(!t){ unlocked = false; return; }
  try{
    const r = await checkToken(t);
    if(r.ok) unlocked = true;
    else { unlocked = false; if(r.status === 401) setToken(''); }
  }catch(e){ unlocked = true; }
}

async function refreshTraktStatus(){
  const el = document.getElementById('traktStatus');
  el.textContent = '';
  try{
    const res = await authFetch('/api/trakt-status', {}, true);
    const j = await res.json();
    el.textContent = j.connected ? 'pripojený' : 'nepripojený';
  }catch(e){}
}
function openSettings(msg){
  const u = unlocked;
  document.getElementById('settingsTitle').textContent = u ? 'Úpravy sú odomknuté' : 'Odomknúť úpravy';
  const text = msg || (u ? '' : 'Bez kódu je zbierka len na čítanie. S kódom môžeš pridávať, upravovať a mazať.');
  settingsMsg.textContent = text;
  settingsMsg.classList.toggle('is-hidden', !text);
  document.getElementById('tokenField').classList.toggle('is-hidden', u);
  document.getElementById('traktField').classList.toggle('is-hidden', !u);
  document.getElementById('settingsLock').classList.toggle('is-hidden', !u);
  document.getElementById('settingsSubmit').classList.toggle('is-hidden', u);
  document.getElementById('settingsCancel').textContent = u ? 'Zavrieť' : 'Zrušiť';
  tokenInput.value = '';
  tokenError.textContent = '';
  settingsOverlay.classList.add('open');
  if(u) refreshTraktStatus(); else setTimeout(()=>tokenInput.focus(), 0);
}
function promptForToken(msg){
  if(settingsOverlay.classList.contains('open') && msg === settingsMsg.textContent) return;
  openSettings(msg);
}
function closeSettings(){ settingsOverlay.classList.remove('open'); }

lockBtn.addEventListener('click', ()=> openSettings());
searchInput.addEventListener('focus', ()=>{ if(!unlocked) openSettings('Na pridávanie titulov najprv odomkni úpravy.'); });
document.getElementById('settingsCancel').addEventListener('click', closeSettings);
settingsOverlay.addEventListener('click', e=>{ if(e.target === settingsOverlay) closeSettings(); });

document.getElementById('settingsForm').addEventListener('submit', async e=>{
  e.preventDefault();
  if(unlocked){ closeSettings(); return; }
  const v = tokenInput.value.trim();
  if(!v){ tokenError.textContent = 'Zadaj prístupový kód.'; return; }
  const btn = document.getElementById('settingsSubmit');
  btn.disabled = true;
  tokenError.textContent = '';
  try{
    const r = await checkToken(v);
    if(!r.ok){
      tokenError.textContent = r.status === 401 ? 'Kód nie je správny.' : (r.msg || 'Overenie zlyhalo.');
      tokenInput.select();
      return;
    }
    setToken(v);
    unlocked = true;
    applyLockUI();
    closeSettings();
    try{ data = await apiGetAll(); applyFiltersAndRender(); }catch(err){ console.error(err); }
  }catch(err){
    tokenError.textContent = 'Nepodarilo sa overiť. Skontroluj pripojenie.';
  }finally{ btn.disabled = false; }
});

document.getElementById('settingsLock').addEventListener('click', async ()=>{
  setToken('');
  unlocked = false;
  applyLockUI();
  closeSettings();
  try{ data = await apiGetAll(); applyFiltersAndRender(); }catch(err){ console.error(err); }
});

document.getElementById('traktConnect').addEventListener('click', async ()=>{
  try{
    const res = await authFetch('/api/trakt-connect', { method:'POST' });
    const j = await res.json();
    if(j.url) window.location.href = j.url;
    else alert(j.error || 'Pripojenie sa nepodarilo.');
  }catch(err){ reportError(err, 'Pripojenie sa nepodarilo.'); }
});
document.getElementById('traktSync').addEventListener('click', async e=>{
  const btn = e.currentTarget;
  btn.disabled = true;
  btn.textContent = 'Synchronizujem…';
  try{
    const res = await authFetch('/api/trakt-sync', { method:'POST' });
    const j = await res.json();
    if(!res.ok) throw Object.assign(new Error(j.error || 'Synchronizácia zlyhala.'), { status: res.status });
    data = await apiGetAll();
    applyFiltersAndRender();
    alert('Hotovo: pridané ' + j.added + ', aktualizované ' + j.updated + '.');
  }catch(err){ reportError(err, 'Synchronizácia zlyhala.'); }
  finally{ btn.disabled = false; btn.textContent = 'Synchronizovať hodnotenia'; }
});

/* Export dát s novým poľom 'notes' */
document.getElementById('exportBtn').addEventListener('click', () => {
  const exportData = data.map(item => ({
    title: item.title,
    originalTitle: item.original || '',
    type: item.type,
    year: item.year,
    genre: item.genre,
    rating: getCombinedRating(item),
    notes: item.notes || '',
    tmdbRating: item.public || null,
    provider: item.providerName || ''
  }));
  
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.href = url;
  downloadAnchor.download = "filmopolis_export_" + new Date().toISOString().slice(0, 10) + ".json";
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  URL.revokeObjectURL(url);
});

const genreToggleBtn = document.getElementById('genreToggleBtn');
if(genreToggleBtn){
  genreToggleBtn.addEventListener('click', ()=>{
    genrePillsEl.classList.toggle('mobile-open');
    updateFilterToggleLabel();
  });
}

/* --- TMDb Našepkávač v hlavnom vyhľadávacom poli pre pridávanie titulov --- */
const mainSearchInput = document.getElementById('search');
const mainSuggestBox = document.getElementById('mainSuggestBox');
let mainDebounceTimer = null;

function resetMainSuggest(){ 
  mainSuggestBox.classList.remove('open'); 
  mainSuggestBox.innerHTML = ''; 
}

async function runTmdbSearch(query, targetBox){
  targetBox.innerHTML = `<div style="padding:8px 12px;font-size:0.8rem;color:var(--text-secondary);">Vyhľadávam...</div>`;
  targetBox.classList.add('open');
  try {
    const res = await authFetch('/api/tmdb/search?query=' + encodeURIComponent(query));
    const json = await res.json();
    if(!res.ok) throw new Error(json.error || 'Chyba');
    const results = (json.results||[]).filter(r => r.media_type==='movie' || r.media_type==='tv').slice(0,6);
    if(!results.length){
      targetBox.innerHTML = `<div style="padding:8px 12px;font-size:0.8rem;color:var(--text-secondary);">Nenašli sa žiadne výsledky</div>`;
      return;
    }
    targetBox.innerHTML = results.map(r => {
      const name = r.title || r.name || '';
      const date = r.release_date || r.first_air_date || '';
      const year = date ? date.slice(0,4) : '';
      const type = r.media_type === 'tv' ? 'seriál' : 'film';
      const poster = r.poster_path ? safeImg(`https://image.tmdb.org/t/p/w92${r.poster_path}`) : '';
      const rating = r.vote_average ? Math.round(r.vote_average*10) : '';
      return `<div class="suggest-item" data-id="${Number(r.id)}" data-type="${r.media_type === 'tv' ? 'tv' : 'movie'}">
        ${poster ? `<img src="${escapeHTML(poster)}" alt="">` : '<div style="width:32px;height:48px;background:#eee;border-radius:4px;"></div>'}
        <div>
          <div class="si-title">${escapeHTML(name)}</div>
          <div class="si-meta">Pridať z TMDb · ${type === 'seriál' ? 'Seriál' : 'Film'}${year ? ' · '+year : ''}${rating ? ' · '+rating+'%' : ''}</div>
        </div>
      </div>`;
    }).join('');
  } catch(e) {
    targetBox.innerHTML = `<div style="padding:8px 12px;font-size:0.8rem;color:#ff6b61;">${escapeHTML(e && e.status ? e.message : 'Chyba pripojenia')}</div>`;
  }
}

function extractProvider(d){
  const wp = d['watch/providers']?.results;
  if(!wp) return { providerName: '', providerLogo: '' };
  const region = wp.SK || wp.CZ || wp.AT || wp.US || Object.values(wp)[0];
  if(!region) return { providerName: '', providerLogo: '' };
  const list = region.flatrate || region.free || region.ads || region.rent || region.buy;
  if(!list || !list.length) return { providerName: '', providerLogo: '' };
  const p = list[0];
  return {
    providerName: p.provider_name || '',
    providerLogo: p.logo_path ? `https://image.tmdb.org/t/p/w92${p.logo_path}` : ''
  };
}

async function handleSelectTmdbItem(tmdbId, mediaType){
  try {
    const res = await authFetch('/api/tmdb/details?type=' + encodeURIComponent(mediaType) + '&id=' + encodeURIComponent(tmdbId));
    const d = await res.json();
    if(!res.ok) throw new Error(d.error || 'Chyba');

    let director = '';
    if(d.credits && d.credits.crew){
      const dirObj = d.credits.crew.find(c => c.job === 'Director');
      if(dirObj) director = dirObj.name;
    }
    if(!director && d.created_by && d.created_by.length){
      director = d.created_by.map(c=>c.name).join(', ');
    }

    let actors = '';
    if(d.credits && d.credits.cast){
      actors = d.credits.cast.slice(0, 3).map(a=>a.name).join(', ');
    }

    const genre = (d.genres || []).map(g => g.name).join(', ');
    const provider = extractProvider(d);

    const entry = {
      title: d.title || d.name,
      original: d.original_title || d.original_name || '',
      type: mediaType === 'tv' ? 'seriál' : 'film',
      year: (d.release_date || d.first_air_date || '').slice(0,4) || null,
      rating: null,
      notes: '',
      public: d.vote_average ? Math.round(d.vote_average * 10) : null,
      poster: d.poster_path ? `https://image.tmdb.org/t/p/w500${d.poster_path}` : '',
      director: director,
      actors: actors,
      genre: genre,
      providerName: provider.providerName,
      providerLogo: provider.providerLogo,
      tmdbId: Number(tmdbId)
    };
    const saved = await apiAdd(entry);
    data.push(saved);
    applyFiltersAndRender();
  } catch(err) {
    console.error(err);
    reportError(err, 'Pridanie titulu sa nepodarilo.');
  }
}

mainSearchInput.addEventListener('input', e => {
  const q = e.target.value;
  clearTimeout(mainDebounceTimer);
  if (q.trim().length < 2) { 
    resetMainSuggest(); 
    return; 
  }
  if (!unlocked) { resetMainSuggest(); return; }
  mainDebounceTimer = setTimeout(() => {
    runTmdbSearch(q.trim(), mainSuggestBox);
  }, 300);
});

mainSuggestBox.addEventListener('click', async e => {
  const item = e.target.closest('.suggest-item');
  if (!item) return;
  await handleSelectTmdbItem(item.dataset.id, item.dataset.type);
  mainSearchInput.value = '';
  resetMainSuggest();
});

document.addEventListener('click', e => {
  if (!mainSearchInput.contains(e.target) && !mainSuggestBox.contains(e.target)) {
    resetMainSuggest();
  }
});

(async function init(){
  await restoreLock();
  applyLockUI();
  try{
    data = await apiGetAll();
  }catch(err){
    console.error('Nepodarilo sa načítať dáta zo servera:', err);
    rowsEl.innerHTML = `<div class="empty-state"><b>Databáza nedostupná</b>Skontroluj internetové pripojenie alebo funkciu /api/films.</div>`;
    return;
  }
  applyFiltersAndRender();
})();
