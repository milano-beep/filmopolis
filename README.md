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
- `public/index.html` — appka bez zmeny
- `worker.js` — jediný skript: ak je požiadavka na `/api/films`, obslúži
  ju sám (číta/zapisuje do KV); pre všetko ostatné vráti statické súbory
  z `public/`
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
