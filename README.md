# Filmopolis na Cloudflare Workers — nasadenie cez wrangler.toml (kód, nie dashboard klikanie)

## Prečo takto
Väzba (binding) na KV databázu sa cez dashboard UI nedala uložiť
(known bug/UI zaseknutie). Toto riešenie obchádza dashboard úplne —
väzba aj celá logika API sú napísané priamo v kóde, Cloudflare si ich
pri nasadení sám prečíta z `wrangler.toml`.

Zároveň to rieši aj druhý problém: pôvodný súbor `functions/api/films.js`
bol napísaný pre klasické **Pages Functions** (automatické smerovanie
z priečinka), čo pri type projektu **"Worker"** (čo je tvoj prípad)
nefunguje. Toto riešenie je jeden Worker skript (`worker.js`), ktorý
obsluhuje aj API (`/api/films`) aj statické súbory appky naraz — presne
podľa toho, ako Cloudflare dnes odporúča stavať tento typ projektu.

## Čo je v tomto priečinku
- `public/index.html` + `public/app.js` — appka (HTML/CSS a skript sú oddelené, aby fungovala prísna CSP)
- `worker.js` — jediný skript: obsluhuje `/api/films` (KV), TMDb proxy
  (`/api/tmdb/*`), Trakt a pre všetko ostatné vráti statické súbory
  z `public/` s bezpečnostnými hlavičkami
- `wrangler.toml` — konfigurácia; **už obsahuje ID tvojej existujúcej
  KV databázy** `filmopolis-kv` (fbeaeec71eac422b88ce74eae6fa804c),
  takže väzba je nastavená priamo tu, nie cez dashboard

## Postup
1. Nahraď **všetok obsah repozitára** týmito súbormi (zmaž starý
   `index.html` z koreňa aj priečinok `functions/`, keďže index.html sa
   presúva do `public/`)
2. Commitni zmeny na GitHub
3. Cloudflare by mal automaticky spustiť nové nasadenie (keďže repozitár
   je už prepojený) — ak nie, choď do projektu → **Deployments** →
   **New deployment**
4. Po nasadení skús `https://filmopolis.filmopolis2.workers.dev/api/films`
   — mal by sa zobraziť zoznam tvojich 31 filmov

## Ak by si niekedy chcel zmeniť KV namespace
Stačí upraviť riadok `id = "..."` vo `wrangler.toml` na nové ID
(nájdeš ho v Cloudflare dashboard → Storage & Databases → KV) a
commitnúť — netreba sa vôbec dotýkať dashboard UI.

## Zabezpečenie — POVINNÉ nastavenie pred nasadením

Zápis do zbierky, TMDb vyhľadávanie aj Trakt sú chránené prístupovým
kľúčom. **Kým nenastavíš `ADMIN_TOKEN`, appka ide len na čítanie**
(úpravy vrátia chybu 503) — to je zámer, nie porucha.

1. Cloudflare → Workers & Pages → `filmopolis` → **Settings** →
   **Variables and Secrets** → pridaj ako typ **Secret**:
   - `ADMIN_TOKEN` — vymysli dlhý náhodný reťazec (aspoň 32 znakov,
     napr. z správcu hesiel alebo `openssl rand -hex 24`)
   - `TMDB_API_KEY` — **nový** TMDb kľúč (v3 alebo v4 token)
   - `TRAKT_CLIENT_ID`, `TRAKT_CLIENT_SECRET` — ak používaš Trakt
     (už nastavené, nemeň)
2. **Starý TMDb kľúč zruš a vygeneruj nový** (themoviedb.org → Settings →
   API). Bol natvrdo v kóde, teda aj v histórii repozitára na GitHube,
   takže ho treba považovať za prezradený.
3. Nasaď (commit na GitHub). Otvor appku, klikni na **Odomknúť** pri
   názve FILMOPOLIS a vlož `ADMIN_TOKEN` (v appke sa volá „prístupový
   kód“). Server ho overí; potom zostane odomknuté v tomto prehliadači
   (na každom zariadení ho treba zadať raz). Tlačidlom **Zamknúť**
   v tom istom okne appku zamkneš a kód sa z prehliadača zmaže.

Kým je appka zamknutá, vidíš zbierku, ale detail titulu je len na
čítanie a pridávanie, úpravy a mazanie sú vypnuté.

### Čo je verejné a čo nie
- **Verejné:** zoznam titulov s hodnoteniami (`GET /api/films`).
- **Len s kľúčom:** osobné poznámky, pridávanie, úprava, mazanie,
  vyhľadávanie v TMDb, pripojenie a synchronizácia Traktu.
- Ak chceš aj čítanie len pre seba, v `worker.js` v `handleFilmsApi`
  nahraď vetvu `GET` volaním `denyUnlessAdmin(...)`.

### Trakt
Po odomknutí (klik na **Odomknuté** v hlavičke) sú tam tlačidlá
**Pripojiť** a **Synchronizovať hodnotenia**. Pripojenie už používa podpísaný `state`, takže cudzí
autorizačný kód sa neprijme. Endpoint `/api/debug-env` bol odstránený.
