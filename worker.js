// ---------------------------------------------------------------------------
// Filmopolis Worker
//
// Tajomstvá (nastavujú sa ako "Secrets" vo Workeri, NIE v kóde):
//   ADMIN_TOKEN        prístupový kľúč na úpravy zbierky (POST/PATCH/DELETE, TMDb, Trakt)
//   TMDB_API_KEY       TMDb API kľúč (v3 alebo v4 "eyJ…" token)
//   TRAKT_CLIENT_ID, TRAKT_CLIENT_SECRET   (len ak používaš Trakt)
// ---------------------------------------------------------------------------

const SECURITY_HEADERS = {
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src https://fonts.gstatic.com; img-src 'self' data: https://image.tmdb.org; connect-src 'self'; " +
    "object-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=31536000",
};

const SEED_DATA = [{"id": 3, "title": "Pluribus", "original": "", "milan": 95, "basa": null, "year": "2025", "type": "seriál", "genre": "Dráma, Sci-Fi & Fantasy", "director": "Vince Gilligan", "actors": "Rhea Seehorn, Karolina Wydra, Carlos-Manuel Vesga", "summary": "", "csfd": null, "imdb": null, "public": 79, "tmdbId": 225171, "poster": "https://image.tmdb.org/t/p/w185/z7Nga7Q9IGFWs5OEduY2gGFxnX3.jpg", "providerName": "Apple TV", "providerLogo": "https://image.tmdb.org/t/p/w92/mcbz1LgtErU9p4UdbZ0rG6RTWHX.jpg"}, {"id": 4, "title": "Pitt", "original": "", "milan": 70, "basa": null, "year": "2025", "type": "seriál", "genre": "Dráma", "director": "R. Scott Gemmill", "actors": "Noah Wyle, Patrick Ball, Katherine LaNasa", "summary": "", "csfd": null, "imdb": null, "public": 87, "tmdbId": 250307, "poster": "https://image.tmdb.org/t/p/w185/t9rKO6hUCVMifrPI93nChUK99f5.jpg", "providerName": "HBO Max", "providerLogo": "https://image.tmdb.org/t/p/w92/jbe4gVSfRlbPTdESXhEKpornsfu.jpg"}, {"id": 5, "title": "Black Mirror", "original": "", "milan": 65, "basa": null, "year": "2011", "type": "seriál", "genre": "Sci-Fi & Fantasy, Dráma, Mysteriózny", "director": "Charlie Brooker", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": 83, "tmdbId": 42009, "poster": "https://image.tmdb.org/t/p/w185/seN6rRfN0I6n8iDXjlSMk1QjNcq.jpg", "providerName": "Netflix", "providerLogo": "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg"}, {"id": 6, "title": "Eufória", "original": "Euphoria", "milan": 98, "basa": null, "year": "2019", "type": "seriál", "genre": "Dráma", "director": "Sam Levinson", "actors": "Zendaya, Hunter Schafer, Sydney Sweeney", "summary": "", "csfd": null, "imdb": null, "public": 83, "tmdbId": 85552, "poster": "https://image.tmdb.org/t/p/w185/vSMiAtqtawNOOE2jSmLbMpTa0lo.jpg", "providerName": "HBO Max", "providerLogo": "https://image.tmdb.org/t/p/w92/jbe4gVSfRlbPTdESXhEKpornsfu.jpg"}, {"id": 7, "title": "The Last of Us", "original": "", "milan": 95, "basa": null, "year": "2023", "type": "seriál", "genre": "Dráma", "director": "Neil Druckmann, Craig Mazin", "actors": "Bella Ramsey, Gabriel Luna, Isabela Merced", "summary": "", "csfd": null, "imdb": null, "public": 84, "tmdbId": 100088, "poster": "https://image.tmdb.org/t/p/w185/8qhIASz0a5JKR5IFT6ewZqA5YSy.jpg", "providerName": "HBO Max", "providerLogo": "https://image.tmdb.org/t/p/w92/jbe4gVSfRlbPTdESXhEKpornsfu.jpg"}, {"id": 8, "title": "Fallout", "original": "", "milan": 90, "basa": null, "year": "2024", "type": "seriál", "genre": "Akčný a Dobrodružný, Sci-Fi & Fantasy, Dráma", "director": "Graham Wagner, Geneva Robertson-Dworet", "actors": "Ella Purnell, Aaron Moten, Moisés Arias", "summary": "", "csfd": null, "imdb": null, "public": 81, "tmdbId": 106379, "poster": "https://image.tmdb.org/t/p/w185/c15BtJxCXMrISLVmysdsnZUPQft.jpg", "providerName": "Amazon Prime Video", "providerLogo": "https://image.tmdb.org/t/p/w92/pvske1MyAoymrs5bguRfVqYiM9a.jpg"}, {"id": 9, "title": "Modrooký samuraj", "original": "Blue Eye Samurai", "milan": 80, "basa": null, "year": "2023", "type": "seriál", "genre": "Akčný a Dobrodružný, Animovaný, Dráma", "director": "Amber Noizumi, Michael Green", "actors": "Maya Erskine, George Takei, Masi Oka", "summary": "", "csfd": null, "imdb": null, "public": 85, "tmdbId": 225180, "poster": "https://image.tmdb.org/t/p/w185/fXm3JT4WLQVnwukdvghtAblc1wc.jpg", "providerName": "Netflix", "providerLogo": "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg"}, {"id": 10, "title": "Biely lotos", "original": "The White Lotus", "milan": 65, "basa": null, "year": "2021", "type": "seriál", "genre": "Komédia, Dráma, Mysteriózny", "director": "Mike White", "actors": "Leslie Bibb, Carrie Coon, Walton Goggins", "summary": "", "csfd": null, "imdb": null, "public": 76, "tmdbId": 111803, "poster": "https://image.tmdb.org/t/p/w185/8ZHQryRLE3TX0MA2ghjymbaNjSZ.jpg", "providerName": "HBO Max", "providerLogo": "https://image.tmdb.org/t/p/w92/jbe4gVSfRlbPTdESXhEKpornsfu.jpg"}, {"id": 11, "title": "Tučniak", "original": "The Penguin", "milan": 90, "basa": null, "year": "2024", "type": "seriál", "genre": "Dráma, Kriminálny", "director": "Lauren LeFranc", "actors": "Colin Farrell, Cristin Milioti, Rhenzy Feliz", "summary": "", "csfd": null, "imdb": null, "public": 84, "tmdbId": 194764, "poster": "https://image.tmdb.org/t/p/w185/vOWcqC4oDQws1doDWLO7d3dh5qc.jpg", "providerName": "HBO Max", "providerLogo": "https://image.tmdb.org/t/p/w92/jbe4gVSfRlbPTdESXhEKpornsfu.jpg"}, {"id": 13, "title": "Problém tří těles", "original": "3 Body Problem", "milan": 85, "basa": null, "year": "2024", "type": "seriál", "genre": "Sci-Fi & Fantasy, Mysteriózny, Dráma", "director": "David Benioff, D. B. Weiss, Alexander Woo", "actors": "Jovan Adepo, Rosalind Chao, Liam Cunningham", "summary": "", "csfd": null, "imdb": null, "public": 75, "tmdbId": 108545, "poster": "https://image.tmdb.org/t/p/w185/ykZ7hlShkdRQaL2aiieXdEMmrLb.jpg", "providerName": "Netflix", "providerLogo": "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg"}, {"id": 14, "title": "Sandman", "original": "", "milan": 90, "basa": null, "year": "2022", "type": "seriál", "genre": "Sci-Fi & Fantasy, Dráma, Akčný a Dobrodružný", "director": "Allan Heinberg, David S. Goyer, Neil Gaiman", "actors": "Tom Sturridge, Vivienne Acheampong, Patton Oswalt", "summary": "", "csfd": null, "imdb": null, "public": 79, "tmdbId": 90802, "poster": "https://image.tmdb.org/t/p/w185/q54qEgagGOYCq5D1903eBVMNkbo.jpg", "providerName": "Netflix", "providerLogo": "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg"}, {"id": 15, "title": "Posledná šanca", "original": "Project Hail Mary", "milan": 95, "basa": null, "year": "2026", "type": "film", "genre": "Science Fiction, Dobrodružný", "director": "Phil Lord, Christopher Miller", "actors": "Ryan Gosling, Sandra Hüller, James Ortiz", "summary": "", "csfd": null, "imdb": null, "public": 87, "tmdbId": 687163, "poster": "https://image.tmdb.org/t/p/w185/cJKKP2vHld67AHUWdjB9iPhcFY7.jpg", "providerName": "Amazon Prime Video", "providerLogo": "https://image.tmdb.org/t/p/w92/pvske1MyAoymrs5bguRfVqYiM9a.jpg"}, {"id": 16, "title": "Vykúpenie z väznice Shawshank", "original": "The Shawshank Redemption", "milan": 99, "basa": null, "year": "1994", "type": "film", "genre": "Dráma, Kriminálny", "director": "Frank Darabont", "actors": "Tim Robbins, Morgan Freeman, Bob Gunton", "summary": "", "csfd": null, "imdb": null, "public": 87, "tmdbId": 278, "poster": "https://image.tmdb.org/t/p/w185/AuO8NzkzLpCaURQ3noyqejV1Lbk.jpg", "providerName": "Google Play Movies", "providerLogo": "https://image.tmdb.org/t/p/w92/8z7rC8uIDaTM91X0ZfkRf04ydj2.jpg"}, {"id": 17, "title": "Chľast", "original": "", "milan": 70, "basa": null, "year": "2020", "type": "film", "genre": "Komédia, Dráma", "director": "Thomas Vinterberg", "actors": "Mads Mikkelsen, Thomas Bo Larsen, Magnus Millang", "summary": "", "csfd": null, "imdb": null, "public": 76, "tmdbId": 580175, "poster": "https://image.tmdb.org/t/p/w185/1JI3xZUPJQEGBJcnllKUO9dzLab.jpg", "providerName": "Edisonline", "providerLogo": "https://image.tmdb.org/t/p/w92/hsuv1uc7SUr9YjCXRlLQNELt4UU.jpg"}, {"id": 18, "title": "Joker", "original": "Joker", "milan": 88, "basa": null, "year": "2019", "type": "film", "genre": "Kriminálny, Thriller, Dráma", "director": "Todd Phillips", "actors": "Joaquin Phoenix, Robert De Niro, Zazie Beetz", "summary": "", "csfd": null, "imdb": null, "public": 81, "tmdbId": 475557, "poster": "https://image.tmdb.org/t/p/w185/d7p9WYZWBAbme4NAoUCQ4CCJ9TO.jpg", "providerName": "Apple TV Store", "providerLogo": "https://image.tmdb.org/t/p/w92/SPnB1qiCkYfirS2it3hZORwGVn.jpg"}, {"id": 19, "title": "Tenet", "original": "Tenet", "milan": 70, "basa": null, "year": "2020", "type": "film", "genre": "Akčný, Thriller, Science Fiction", "director": "Christopher Nolan", "actors": "John David Washington, Robert Pattinson, Elizabeth Debicki", "summary": "", "csfd": null, "imdb": null, "public": 72, "tmdbId": 577922, "poster": "https://image.tmdb.org/t/p/w185/8Rat9OEsG5Ys9YxPoLpFSwUT3Ct.jpg", "providerName": "HBO Max", "providerLogo": "https://image.tmdb.org/t/p/w92/jbe4gVSfRlbPTdESXhEKpornsfu.jpg"}, {"id": 20, "title": "Matrix 1", "original": "The Matrix", "milan": 90, "basa": null, "year": "1999", "type": "film", "genre": "Akčný, Science Fiction", "director": "Lana Wachowski, Lilly Wachowski", "actors": "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss", "summary": "", "csfd": null, "imdb": null, "public": 83, "tmdbId": 603, "poster": "https://image.tmdb.org/t/p/w185/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg", "providerName": "Netflix", "providerLogo": "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg"}, {"id": 21, "title": "Temný rytier", "original": "The Dark Knight", "milan": 85, "basa": null, "year": "2008", "type": "film", "genre": "Akčný, Kriminálny, Thriller", "director": "Christopher Nolan", "actors": "Christian Bale, Heath Ledger, Aaron Eckhart", "summary": "", "csfd": null, "imdb": null, "public": 85, "tmdbId": 155, "poster": "https://image.tmdb.org/t/p/w185/lch0ILTsm9uFqowVwVmIeRsMcdL.jpg", "providerName": "HBO Max", "providerLogo": "https://image.tmdb.org/t/p/w92/jbe4gVSfRlbPTdESXhEKpornsfu.jpg"}, {"id": 22, "title": "The Office", "original": "", "milan": null, "basa": null, "year": "2005", "type": "seriál", "genre": "Komédia", "director": "Greg Daniels", "actors": "Rainn Wilson, John Krasinski, Jenna Fischer", "summary": "", "csfd": null, "imdb": null, "public": 86, "tmdbId": 2316, "poster": "https://image.tmdb.org/t/p/w185/7DJKHzAi83BmQrWLrYYOqcoKfhR.jpg", "rating": 99, "providerName": "Netflix", "providerLogo": "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg"}, {"id": 23, "title": "Černobyľ", "original": "Chernobyl", "milan": 98, "basa": null, "year": "2019", "type": "seriál", "genre": "Dráma", "director": "Craig Mazin", "actors": "Jared Harris, Stellan Skarsgård, Emily Watson", "summary": "", "csfd": null, "imdb": null, "public": 87, "tmdbId": 87108, "poster": "https://image.tmdb.org/t/p/w185/f6p84wzftwKImoaRp64wwNjdCG5.jpg", "providerName": "HBO Max", "providerLogo": "https://image.tmdb.org/t/p/w92/jbe4gVSfRlbPTdESXhEKpornsfu.jpg"}, {"id": 24, "title": "MINDHUNTER: Lovci myšlenek", "original": "MINDHUNTER", "milan": 90, "basa": null, "year": "2017", "type": "seriál", "genre": "Dráma, Kriminálny", "director": "Joe Penhall", "actors": "Jonathan Groff, Holt McCallany, Anna Torv", "summary": "", "csfd": null, "imdb": null, "public": 81, "tmdbId": 67744, "poster": "https://image.tmdb.org/t/p/w185/fbKE87mojpIETWepSbD5Qt741fp.jpg", "providerName": "Netflix", "providerLogo": "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg"}, {"id": 25, "title": "Oddelenie", "original": "Severance", "milan": 85, "basa": null, "year": "2022", "type": "seriál", "genre": "Dráma, Mysteriózny, Sci-Fi & Fantasy", "director": "Dan Erickson", "actors": "Adam Scott, Britt Lower, Tramell Tillman", "summary": "", "csfd": null, "imdb": null, "public": 84, "tmdbId": 95396, "poster": "https://image.tmdb.org/t/p/w185/kwGN0qhAhPaqX11h2TR9hVJvQoO.jpg", "providerName": "Apple TV", "providerLogo": "https://image.tmdb.org/t/p/w92/mcbz1LgtErU9p4UdbZ0rG6RTWHX.jpg"}, {"id": 26, "title": "Maniak", "original": "Maniac", "milan": null, "basa": null, "year": "2018", "type": "seriál", "genre": "Komédia, Dráma, Sci-Fi & Fantasy", "director": "Patrick Somerville, Cary Joji Fukunaga", "actors": "Emma Stone, Jonah Hill, Sonoya Mizuno", "summary": "", "csfd": null, "imdb": null, "public": 74, "tmdbId": 73411, "poster": "https://image.tmdb.org/t/p/w185/kCNl4QPstAqChFD0NnLpbDFG8ul.jpg", "providerName": "Netflix", "providerLogo": "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg"}, {"id": 27, "title": "Enola Holmesová 3", "original": "Enola Holmes 3", "milan": 55, "basa": null, "year": "2026", "type": "film", "genre": "Dobrodružný, Kriminálny, Mysteriózny", "director": "Philip Barantini", "actors": "Millie Bobby Brown, Henry Cavill, Helena Bonham Carter", "summary": "", "csfd": null, "imdb": null, "public": 69, "tmdbId": 1202033, "poster": "https://image.tmdb.org/t/p/w185/7kRYHH9H9PjBFwz1FprbHB2AAjI.jpg", "providerName": "Netflix", "providerLogo": "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg"}, {"id": 28, "title": "Temná hmota", "original": "Dark Matter", "milan": 75, "basa": null, "year": "2024", "type": "seriál", "genre": "Sci-Fi & Fantasy, Dráma", "director": "Blake Crouch", "actors": "Joel Edgerton, Jennifer Connelly, Alice Braga", "summary": "", "csfd": null, "imdb": null, "public": 77, "tmdbId": 196322, "poster": "https://image.tmdb.org/t/p/w185/c6MRUtPk0nEPQ9FBD9RdRKt2rIm.jpg", "providerName": "Apple TV", "providerLogo": "https://image.tmdb.org/t/p/w92/mcbz1LgtErU9p4UdbZ0rG6RTWHX.jpg"}, {"title": "V ako Vendeta", "original": "V for Vendetta", "type": "film", "year": "2006", "rating": 85, "public": 79, "poster": "https://image.tmdb.org/t/p/w185/2CbiuLL1ES7Ti3xXRxcArt3Va3O.jpg", "director": "James McTeigue", "actors": "Natalie Portman, Hugo Weaving, Stephen Rea", "genre": "Akčný, Thriller, Science Fiction", "tmdbId": 752, "id": 29, "milan": null, "basa": null, "providerName": "Apple TV Store", "providerLogo": "https://image.tmdb.org/t/p/w92/SPnB1qiCkYfirS2it3hZORwGVn.jpg"}, {"title": "Constantine", "original": "Constantine", "type": "film", "year": "2005", "rating": 95, "public": 72, "poster": "https://image.tmdb.org/t/p/w185/fdl7MgnV10QIQ4aWhOVE8AOGxQO.jpg", "director": "Francis Lawrence", "actors": "Keanu Reeves, Rachel Weisz, Shia LaBeouf", "genre": "Fantasy, Akčný, Horror", "tmdbId": 561, "id": 30, "milan": null, "basa": null, "providerName": "Apple TV Store", "providerLogo": "https://image.tmdb.org/t/p/w92/SPnB1qiCkYfirS2it3hZORwGVn.jpg"}, {"title": "1670", "original": "1670", "type": "seriál", "year": "2023", "rating": 60, "public": 74, "poster": "https://image.tmdb.org/t/p/w185/sMPLjSZYJEeeXfxeKQ7Ct7SEYuV.jpg", "director": "", "actors": "Bartłomiej Topa, Katarzyna Herman, Kirył Pietruczuk", "genre": "Komédia", "tmdbId": 236450, "id": 31, "milan": null, "basa": null, "providerName": "Netflix", "providerLogo": "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg"}, {"title": "Fleabag", "original": "Fleabag", "type": "seriál", "year": "2016", "rating": null, "public": 83, "poster": "https://image.tmdb.org/t/p/w92/27vEYsRKa3eAniwmoccOoluEXQ1.jpg", "director": "Phoebe Wallerová-Bridgeová", "actors": "Phoebe Wallerová-Bridgeová, Sian Clifford, Andrew Scott", "genre": "Komédia, Dráma", "providerName": "Amazon Prime Video", "providerLogo": "https://image.tmdb.org/t/p/w92/pvske1MyAoymrs5bguRfVqYiM9a.jpg", "tmdbId": 67070, "id": 32}, {"title": "Frasier", "original": "Frasier", "type": "seriál", "year": "1993", "rating": null, "public": 77, "poster": "https://image.tmdb.org/t/p/w92/gYAb6GCVEFsU9hzMCG5rxaxoIv3.jpg", "director": "David Angell, Peter Casey, David Clark Lee", "actors": "Kelsey Grammer, Jane Leeves, David Hyde Pierce", "genre": "Komédia, Rodinný", "providerName": "SkyShowtime", "providerLogo": "https://image.tmdb.org/t/p/w92/h0ZYcYHicKQ4Ixm5nOjqvwni5NG.jpg", "tmdbId": 3452, "id": 33}, {"title": "Baby Reindeer", "original": "Baby Reindeer", "type": "seriál", "year": "2024", "rating": null, "public": 76, "poster": "https://image.tmdb.org/t/p/w92/tN9OcbkAOPwHSr1sgMornZtQZBx.jpg", "director": "Richard Gadd", "actors": "Richard Gadd, Jessica Gunning, Nava Mau", "genre": "Dráma", "providerName": "Netflix", "providerLogo": "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg", "tmdbId": 241259, "id": 34}];

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

// ---------- autorizácia ----------

const enc = new TextEncoder();

async function sha256(text) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", enc.encode(text)));
}

// Porovnanie v konštantnom čase (cez SHA-256, aby mali oba vstupy rovnakú dĺžku).
async function safeEqual(a, b) {
  const [ha, hb] = await Promise.all([sha256(String(a)), sha256(String(b))]);
  let diff = 0;
  for (let i = 0; i < ha.length; i++) diff |= ha[i] ^ hb[i];
  return diff === 0;
}

// Prihlásenie: buď hlavička "Authorization: Bearer <ADMIN_TOKEN>" (curl, skripty),
// alebo podpísaný HttpOnly cookie, ktorý vydá /api/login (appka v prehliadači).
const SESSION_COOKIE = "fs";
const SESSION_MAX_AGE = 365 * 24 * 60 * 60; // 1 rok

function getCookie(request, name) {
  const part = (request.headers.get("Cookie") || "").split(/;\s*/).find((c) => c.startsWith(name + "="));
  return part ? part.slice(name.length + 1) : "";
}

async function makeSession(env) {
  const exp = String(Date.now() + SESSION_MAX_AGE * 1000);
  return `${exp}.${await hmacHex("session:" + exp, env.ADMIN_TOKEN)}`;
}

// Zmena ADMIN_TOKEN automaticky zneplatní všetky staré prihlásenia.
async function checkSession(value, env) {
  if (!env.ADMIN_TOKEN || !value) return false;
  const [exp, sig] = value.split(".");
  if (!sig || !(Number(exp) > Date.now())) return false;
  return safeEqual(sig, await hmacHex("session:" + exp, env.ADMIN_TOKEN));
}

function sessionCookie(value, maxAge) {
  return `${SESSION_COOKIE}=${value}; Max-Age=${maxAge}; Path=/; HttpOnly; Secure; SameSite=Strict`;
}

async function isAdmin(request, env) {
  if (!env.ADMIN_TOKEN) return false;
  const m = (request.headers.get("Authorization") || "").match(/^Bearer (.+)$/);
  if (m && (await safeEqual(m[1], env.ADMIN_TOKEN))) return true;
  return checkSession(getCookie(request, SESSION_COOKIE), env);
}

// Vráti Response, ak prístup nie je povolený, inak null.
async function denyUnlessAdmin(request, env) {
  if (!env.ADMIN_TOKEN) {
    return json({ error: "Na serveri nie je nastavený ADMIN_TOKEN." }, 503);
  }
  if (!(await isAdmin(request, env))) {
    return json({ error: "Chýba alebo je neplatný prístupový kľúč." }, 401);
  }
  return null;
}

async function hmacHex(value, secret) {
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(value)));
  return Array.from(sig, (b) => b.toString(16).padStart(2, "0")).join("");
}

// Podpísaný "state" pre OAuth: platí 10 minút, vie ho vydať len majiteľ s ADMIN_TOKEN.
async function makeOAuthState(env) {
  const ts = String(Date.now());
  return `${ts}.${await hmacHex("trakt:" + ts, env.ADMIN_TOKEN)}`;
}

async function checkOAuthState(state, env) {
  if (!env.ADMIN_TOKEN || !state) return false;
  const [ts, sig] = state.split(".");
  const age = Date.now() - Number(ts);
  if (!sig || !(age >= 0 && age < 10 * 60 * 1000)) return false;
  return safeEqual(sig, await hmacHex("trakt:" + ts, env.ADMIN_TOKEN));
}

async function handleLogin(request, env) {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  if (!env.ADMIN_TOKEN) return json({ error: "Na serveri nie je nastavený ADMIN_TOKEN." }, 503);
  const body = await readJson(request);
  if (body.error) return body.error;
  const password = body.value && typeof body.value.password === "string" ? body.value.password : "";
  if (!password || !(await safeEqual(password, env.ADMIN_TOKEN))) {
    await new Promise((r) => setTimeout(r, 600)); // spomalí automatické skúšanie hesiel
    return json({ error: "Kód nie je správny." }, 401);
  }
  const res = json({ ok: true });
  res.headers.append("Set-Cookie", sessionCookie(await makeSession(env), SESSION_MAX_AGE));
  return res;
}

function handleLogout() {
  const res = json({ ok: true });
  res.headers.append("Set-Cookie", sessionCookie("", 0));
  return res;
}

// ---------- validácia vstupu ----------

const TMDB_IMG = /^https:\/\/image\.tmdb\.org\/t\/p\/w\d+\/[A-Za-z0-9_-]+\.(jpg|png|svg)$/;
const MAX_FILMS = 5000;

const str = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// null/"" -> null, platné číslo -> číslo, neplatné -> undefined
function intOrNull(v, min, max) {
  if (v === null || v === undefined || v === "") return null;
  const n = Math.round(Number(v));
  return Number.isFinite(n) && n >= min && n <= max ? n : undefined;
}

function cleanEntry(e) {
  if (!e || typeof e !== "object" || Array.isArray(e)) return { error: "Neplatné dáta." };
  const title = str(e.title, 200);
  if (!title) return { error: "Chýba názov." };
  if (e.type !== "film" && e.type !== "seriál") return { error: "Neplatný typ." };

  const rating = intOrNull(e.rating, 0, 100);
  const pub = intOrNull(e.public, 0, 100);
  const tmdbId = intOrNull(e.tmdbId, 1, 999999999);
  if (rating === undefined || pub === undefined || tmdbId === undefined) {
    return { error: "Neplatné číslo." };
  }
  const year = e.year == null || e.year === "" ? null : /^\d{4}$/.test(String(e.year)) ? String(e.year) : undefined;
  if (year === undefined) return { error: "Neplatný rok." };

  const poster = str(e.poster, 200);
  const providerLogo = str(e.providerLogo, 200);
  if ((poster && !TMDB_IMG.test(poster)) || (providerLogo && !TMDB_IMG.test(providerLogo))) {
    return { error: "Neplatná adresa obrázka." };
  }

  return {
    value: {
      title,
      original: str(e.original, 200),
      type: e.type,
      year,
      rating,
      notes: str(e.notes, 5000),
      public: pub,
      poster,
      director: str(e.director, 300),
      actors: str(e.actors, 500),
      genre: str(e.genre, 300),
      providerName: str(e.providerName, 100),
      providerLogo,
      tmdbId,
      summary: str(e.summary, 2000),
    },
  };
}

// Polia, ktoré sa dajú meniť cez PATCH (milan/basa len na vynulovanie starého hodnotenia).
const PATCHABLE = {
  rating: (v) => intOrNull(v, 0, 100),
  notes: (v) => (typeof v === "string" ? v.trim().slice(0, 5000) : undefined),
  milan: (v) => (v === null ? null : undefined),
  basa: (v) => (v === null ? null : undefined),
};

async function readJson(request) {
  const text = await request.text();
  if (text.length > 20000) return { error: json({ error: "Príliš veľká požiadavka." }, 413) };
  try {
    return { value: JSON.parse(text) };
  } catch {
    return { error: json({ error: "Neplatný JSON." }, 400) };
  }
}

// ---------- zbierka filmov ----------

async function loadFilms(kv) {
  const raw = await kv.get("films", "json");
  if (raw === null) {
    await kv.put("films", JSON.stringify(SEED_DATA));
    return SEED_DATA;
  }
  return raw;
}

async function handleFilmsApi(request, env) {
  if (!env.FILMOPOLIS_KV) {
    return json({ error: "FILMOPOLIS_KV binding chýba" }, 500);
  }

  // Čítanie je verejné, ale osobné poznámky vidí len majiteľ.
  if (request.method === "GET") {
    const films = await loadFilms(env.FILMOPOLIS_KV);
    if (await isAdmin(request, env)) return json(films);
    return json(films.map(({ notes, ...rest }) => rest));
  }

  if (!["POST", "PATCH", "DELETE"].includes(request.method)) {
    return json({ error: "Method not allowed" }, 405);
  }

  const denied = await denyUnlessAdmin(request, env);
  if (denied) return denied;

  const body = await readJson(request);
  if (body.error) return body.error;
  const payload = body.value;

  if (request.method === "POST") {
    const { value, error } = cleanEntry(payload);
    if (error) return json({ error }, 400);
    const films = await loadFilms(env.FILMOPOLIS_KV);
    if (films.length >= MAX_FILMS) return json({ error: "Dosiahnutý limit zbierky." }, 400);
    const nextId = films.length ? Math.max(...films.map((f) => f.id)) + 1 : 1;
    const saved = { ...value, id: nextId };
    films.push(saved);
    await env.FILMOPOLIS_KV.put("films", JSON.stringify(films));
    return json(saved, 201);
  }

  if (!payload || !Number.isInteger(payload.id)) return json({ error: "Chýba platné id." }, 400);
  const films = await loadFilms(env.FILMOPOLIS_KV);
  const index = films.findIndex((f) => f.id === payload.id);
  if (index === -1) return json({ error: "Titul sa nenašiel." }, 404);

  if (request.method === "DELETE") {
    films.splice(index, 1);
    await env.FILMOPOLIS_KV.put("films", JSON.stringify(films));
    return json({ ok: true });
  }

  // PATCH
  const patch = {};
  for (const [key, val] of Object.entries(payload)) {
    if (key === "id") continue;
    if (!(key in PATCHABLE)) return json({ error: `Pole "${key}" sa nedá meniť.` }, 400);
    const cleaned = PATCHABLE[key](val);
    if (cleaned === undefined) return json({ error: `Neplatná hodnota poľa "${key}".` }, 400);
    patch[key] = cleaned;
  }
  films[index] = { ...films[index], ...patch };
  await env.FILMOPOLIS_KV.put("films", JSON.stringify(films));
  return json({ ok: true });
}

// ---------- TMDb proxy (kľúč ostáva na serveri) ----------

async function handleTmdb(request, env, url) {
  const denied = await denyUnlessAdmin(request, env);
  if (denied) return denied;
  if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);
  if (!env.TMDB_API_KEY) return json({ error: "Na serveri nie je nastavený TMDB_API_KEY." }, 503);

  let path;
  if (url.pathname === "/api/tmdb/search") {
    const q = (url.searchParams.get("query") || "").trim().slice(0, 100);
    if (q.length < 2) return json({ results: [] });
    path = `/search/multi?query=${encodeURIComponent(q)}&language=sk-SK`;
  } else if (url.pathname === "/api/tmdb/details") {
    const type = url.searchParams.get("type");
    const id = url.searchParams.get("id") || "";
    if (!["movie", "tv"].includes(type) || !/^\d{1,9}$/.test(id)) {
      return json({ error: "Neplatná požiadavka." }, 400);
    }
    path = `/${type}/${id}?append_to_response=credits,watch/providers&language=sk-SK`;
  } else {
    return json({ error: "Not found" }, 404);
  }

  const key = env.TMDB_API_KEY;
  const bearer = key.startsWith("eyJ");
  const upstream = "https://api.themoviedb.org/3" + path + (bearer ? "" : `&api_key=${encodeURIComponent(key)}`);
  const res = await fetch(upstream, bearer ? { headers: { Authorization: `Bearer ${key}` } } : {});
  if (!res.ok) return json({ error: "TMDb vrátilo chybu." }, 502);
  return json(await res.json());
}

// ---------- Trakt ----------

const TRAKT_API = "https://api.trakt.tv";
const TRAKT_UA = "Mozilla/5.0 (compatible; Filmopolis/1.0; +https://filmopolis.filmopolis2.workers.dev)";

async function getTraktTokens(kv) {
  return await kv.get("trakt_auth", "json");
}

async function saveTraktTokens(kv, tokens) {
  await kv.put("trakt_auth", JSON.stringify(tokens));
}

async function ensureFreshToken(env) {
  let tokens = await getTraktTokens(env.FILMOPOLIS_KV);
  if (!tokens) return null;

  const isExpired = Date.now() >= tokens.expires_at - 60000;
  if (!isExpired) return tokens;

  const res = await fetch(`${TRAKT_API}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "User-Agent": TRAKT_UA },
    body: JSON.stringify({
      refresh_token: tokens.refresh_token,
      client_id: env.TRAKT_CLIENT_ID,
      client_secret: env.TRAKT_CLIENT_SECRET,
      redirect_uri: tokens.redirect_uri,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) return null;
  const fresh = await res.json();
  tokens = {
    access_token: fresh.access_token,
    refresh_token: fresh.refresh_token,
    expires_at: Date.now() + fresh.expires_in * 1000,
    redirect_uri: tokens.redirect_uri,
  };
  await saveTraktTokens(env.FILMOPOLIS_KV, tokens);
  return tokens;
}

// Vydá odkaz na autorizáciu v Trakte s podpísaným "state".
async function handleTraktConnect(request, env) {
  const denied = await denyUnlessAdmin(request, env);
  if (denied) return denied;
  if (!env.TRAKT_CLIENT_ID) return json({ error: "Na serveri nie je nastavený TRAKT_CLIENT_ID." }, 503);

  const origin = new URL(request.url).origin;
  const authorize = new URL("https://trakt.tv/oauth/authorize");
  authorize.search = new URLSearchParams({
    response_type: "code",
    client_id: env.TRAKT_CLIENT_ID,
    redirect_uri: `${origin}/oauth/callback`,
    state: await makeOAuthState(env),
  }).toString();
  return json({ url: authorize.toString() });
}

async function handleOAuthCallback(request, env) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return new Response("Chýba autorizačný kód od Traktu.", { status: 400 });
  }
  if (!(await checkOAuthState(url.searchParams.get("state"), env))) {
    return new Response("Neplatné alebo expirované prepojenie. Spusti pripájanie znova z nastavení.", { status: 400 });
  }
  if (!env.TRAKT_CLIENT_ID || !env.TRAKT_CLIENT_SECRET) {
    return new Response("Prepojenie s Traktom nie je na serveri nakonfigurované.", { status: 500 });
  }

  const redirectUri = `${url.origin}/oauth/callback`;
  const res = await fetch(`${TRAKT_API}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "User-Agent": TRAKT_UA },
    body: JSON.stringify({
      code,
      client_id: env.TRAKT_CLIENT_ID,
      client_secret: env.TRAKT_CLIENT_SECRET,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!res.ok) {
    console.error("Trakt token exchange failed:", res.status, await res.text());
    return new Response("Nepodarilo sa dokončiť prepojenie s Traktom.", { status: 500 });
  }

  const tok = await res.json();
  await saveTraktTokens(env.FILMOPOLIS_KV, {
    access_token: tok.access_token,
    refresh_token: tok.refresh_token,
    expires_at: Date.now() + tok.expires_in * 1000,
    redirect_uri: redirectUri,
  });

  return Response.redirect(url.origin + "/", 302);
}

async function traktFetch(path, env, tokens) {
  const res = await fetch(`${TRAKT_API}${path}`, {
    headers: {
      "Content-Type": "application/json",
      "User-Agent": TRAKT_UA,
      "trakt-api-version": "2",
      "trakt-api-key": env.TRAKT_CLIENT_ID,
      Authorization: `Bearer ${tokens.access_token}`,
    },
  });
  if (!res.ok) throw new Error(`Trakt ${path} -> ${res.status}`);
  return res.json();
}

async function handleTraktSync(env) {
  const tokens = await ensureFreshToken(env);
  if (!tokens) {
    return json({ error: "Trakt účet nie je pripojený." }, 400);
  }

  const [ratedMovies, ratedShows] = await Promise.all([
    traktFetch("/sync/ratings/movies", env, tokens),
    traktFetch("/sync/ratings/shows", env, tokens),
  ]);

  const traktItems = [
    ...ratedMovies.map((r) => ({ ...r.movie, rating: r.rating, kind: "film" })),
    ...ratedShows.map((r) => ({ ...r.show, rating: r.rating, kind: "seriál" })),
  ];

  const films = await loadFilms(env.FILMOPOLIS_KV);
  let added = 0;
  let updated = 0;

  for (const t of traktItems) {
    const tmdbId = t.ids && t.ids.tmdb;
    const convertedRating = Math.round(t.rating * 10);
    const existing = tmdbId ? films.find((f) => f.tmdbId === tmdbId) : null;

    if (existing) {
      existing.rating = convertedRating;
      updated++;
    } else {
      if (films.length >= MAX_FILMS) break;
      const nextId = films.length ? Math.max(...films.map((f) => f.id)) + 1 : 1;
      films.push({
        id: nextId,
        title: str(t.title, 200) || "Bez názvu",
        original: "",
        type: t.kind,
        year: t.year ? String(t.year) : null,
        rating: convertedRating,
        milan: null,
        basa: null,
        public: null,
        genre: "",
        director: "",
        actors: "",
        poster: "",
        providerName: "",
        providerLogo: "",
        tmdbId: Number.isInteger(tmdbId) ? tmdbId : null,
      });
      added++;
    }
  }

  await env.FILMOPOLIS_KV.put("films", JSON.stringify(films));
  return json({ ok: true, added, updated });
}

// ---------- smerovanie ----------

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/api/films") {
      return handleFilmsApi(request, env);
    }

    if (url.pathname === "/api/login") return handleLogin(request, env);
    if (url.pathname === "/api/logout" && request.method === "POST") return handleLogout();

    // Overenie prihlásenia (používa tlačidlo Odomknúť v appke)
    if (url.pathname === "/api/auth-check") {
      const denied = await denyUnlessAdmin(request, env);
      return denied || json({ ok: true });
    }

    if (url.pathname.startsWith("/api/tmdb/")) {
      return handleTmdb(request, env, url);
    }

    if (url.pathname === "/api/trakt-connect" && request.method === "POST") {
      return handleTraktConnect(request, env);
    }

    if (url.pathname === "/oauth/callback") {
      return handleOAuthCallback(request, env);
    }

    if (url.pathname === "/api/trakt-status") {
      const denied = await denyUnlessAdmin(request, env);
      if (denied) return denied;
      const tokens = await getTraktTokens(env.FILMOPOLIS_KV);
      return json({ connected: !!tokens });
    }

    if (url.pathname === "/api/trakt-sync" && request.method === "POST") {
      const denied = await denyUnlessAdmin(request, env);
      if (denied) return denied;
      return handleTraktSync(env);
    }

    if (url.pathname.startsWith("/api/")) {
      return json({ error: "Not found" }, 404);
    }

    // Všetko ostatné -> statické súbory z /public, s bezpečnostnými hlavičkami
    const res = await env.ASSETS.fetch(request);
    const out = new Response(res.body, res);
    for (const [k, v] of Object.entries(SECURITY_HEADERS)) out.headers.set(k, v);
    return out;
  },
};
