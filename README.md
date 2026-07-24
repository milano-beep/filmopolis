# Filmopolis — nasadenie s databázou (Netlify)

## Čo je v tomto priečinku
- `index.html` — samotná appka (teraz ukladá dáta cez databázu, nie do prehliadača)
- `netlify/functions/films.mjs` — serverová funkcia, ktorá číta/zapisuje do Netlify Blobs (databáza)
- `package.json`, `netlify.toml` — konfigurácia pre Netlify

## Postup nasadenia

### 1. GitHub
1. Choď na github.com a založ si účet (ak ešte nemáš)
2. Klikni **New repository** → pomenuj ho napr. `filmopolis` → **Create repository**
3. Na stránke repozitára klikni **"uploading an existing file"** (alebo Add file → Upload files)
4. Pretiahni **všetky súbory a priečinky z tohto balíčka** (vrátane priečinka `netlify` so súborom vnútri) do okna prehliadača
5. Dole klikni **Commit changes**

### 2. Netlify
1. Choď na app.netlify.com a prihlás sa (pokojne cez GitHub účet)
2. **Add new site → Import an existing project**
3. Zvoľ **GitHub** a vyber repozitár `filmopolis`
4. Nechaj nastavenia predvolené (build command prázdny, publish directory `.`) → **Deploy**
5. Netlify automaticky rozpozná priečinok `netlify/functions` a nasadí funkciu — netreba nič ďalšie nastavovať, Netlify Blobs funguje bez API kľúčov

Po dokončení nasadenia (pár desiatok sekúnd) dostaneš adresu typu `nieco-nahodne.netlify.app` — tá už funguje na počítači aj mobile a všetky pridané filmy sa ukladajú do spoločnej databázy.

## Ako to funguje
Prvý film sa v databáze vytvorí automaticky pri prvom otvorení stránky (28 pôvodných titulov). Odvtedy appka pri každom pridaní/zmazaní volá funkciu na `/api/films`, ktorá dáta ukladá do Netlify Blobs — nezávisle od toho, z akého zariadenia alebo prehliadača pristupuješ.

## Ak niečo nefunguje
- Skontroluj v Netlify **Deploys** záložke, či build prebehol bez chyby (červený "Failed" = niečo sa nenahralo správne)
- V **Functions** záložke skontroluj, či sa `films` funkcia zobrazuje ako nasadená
