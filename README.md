# Filmopolis — presun na Cloudflare Pages (namiesto Netlify)

## Prečo
Netlify pracuje s mesačným kreditovým balíkom, ktorý sa dá rýchlo vyčerpať.
Cloudflare Pages má štedrý bezplatný limit bez kreditového systému —
100 000 požiadaviek/deň a Workers KV databázu (1 GB, 100 000 čítaní a
1 000 zápisov denne zadarmo).

## Čo je v tomto priečinku
- `index.html` — appka, úplne bez zmeny (volá rovnakú cestu `/api/films`)
- `functions/api/films.js` — Cloudflare Pages Function nahrádzajúca
  pôvodnú Netlify funkciu `films.mjs`, používa Cloudflare KV namiesto
  Netlify Blobs. Obsahuje aj **presnú kópiu tvojich aktuálnych 31 filmov**
  ako počiatočné dáta, takže o nič neprídeš.

## Postup nasadenia

### 1. Vytvor KV databázu
1. Choď na **dash.cloudflare.com**, zaregistruj sa/prihlás (zadarmo)
2. V ľavom menu **Workers & Pages → KV**
3. **Create namespace** → pomenuj napr. `filmopolis-kv` → Create

### 2. Priprav GitHub repozitár
Buď pridaj tieto súbory (`index.html`, `functions/api/films.js`) do
existujúceho repozitára `milano-beep/filmopolis` (nahraď index.html,
pridaj priečinok functions/api), alebo použi ten istý repozitár —
Cloudflare Pages vie čítať z rovnakého GitHub repa ako Netlify.

### 3. Priprav Cloudflare Pages projekt
1. V Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**
2. Vyber repozitár `filmopolis`
3. Build nastavenia: **Framework preset: None**, **Build command: (prázdne)**,
   **Build output directory: /** (bodka/koreň)
4. Klikni **Save and Deploy**

### 4. Napoj KV databázu na projekt
1. Po vytvorení projektu choď do jeho nastavení: **Settings → Bindings**
   (alebo **Functions → KV namespace bindings**)
2. **Add binding**:
   - Variable name: `FILMOPOLIS_KV` (presne takto, s veľkými písmenami — kód to takto očakáva)
   - KV namespace: vyber `filmopolis-kv`, ktorý si vytvoril v kroku 1
3. Ulož a **Redeploy** (nové nastavenie sa prejaví až po ďalšom nasadení)

### 5. Hotovo
Dostaneš adresu typu `filmopolis.pages.dev` — over si, že `/api/films`
vracia rovnaký zoznam ako predtým na Netlify.

## Poznámka k TMDb a Gemini
TMDb kľúč zostáva rovnaký (je v `index.html`, nič sa nemení).
Gemini/AI funkcia bola z appky odstránená, takže žiadnu ďalšiu
premennú prostredia netreba nastavovať.
