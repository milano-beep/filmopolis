const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "no-store, no-cache, must-revalidate",
};

const SEED_DATA = [{"id": 3, "title": "Pluribus", "original": "", "milan": 95, "basa": null, "year": "2025", "type": "seriál", "genre": "Dráma, Sci-Fi & Fantasy", "director": "Vince Gilligan", "actors": "Rhea Seehorn, Karolina Wydra, Carlos-Manuel Vesga", "summary": "", "csfd": null, "imdb": null, "public": 79, "tmdbId": 225171, "poster": "https://image.tmdb.org/t/p/w185/z7Nga7Q9IGFWs5OEduY2gGFxnX3.jpg", "providerName": "Apple TV", "providerLogo": "https://image.tmdb.org/t/p/w92/mcbz1LgtErU9p4UdbZ0rG6RTWHX.jpg"}, {"id": 4, "title": "Pitt", "original": "", "milan": 70, "basa": null, "year": "2025", "type": "seriál", "genre": "Dráma", "director": "R. Scott Gemmill", "actors": "Noah Wyle, Patrick Ball, Katherine LaNasa", "summary": "", "csfd": null, "imdb": null, "public": 87, "tmdbId": 250307, "poster": "https://image.tmdb.org/t/p/w185/t9rKO6hUCVMifrPI93nChUK99f5.jpg", "providerName": "HBO Max", "providerLogo": "https://image.tmdb.org/t/p/w92/jbe4gVSfRlbPTdESXhEKpornsfu.jpg"}, {"id": 5, "title": "Black Mirror", "original": "", "milan": 65, "basa": null, "year": "2011", "type": "seriál", "genre": "Sci-Fi & Fantasy, Dráma, Mysteriózny", "director": "Charlie Brooker", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": 83, "tmdbId": 42009, "poster": "https://image.tmdb.org/t/p/w185/seN6rRfN0I6n8iDXjlSMk1QjNcq.jpg", "providerName": "Netflix", "providerLogo": "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg"}, {"id": 6, "title": "Eufória", "original": "Euphoria", "milan": 98, "basa": null, "year": "2019", "type": "seriál", "genre": "Dráma", "director": "Sam Levinson", "actors": "Zendaya, Hunter Schafer, Sydney Sweeney", "summary": "", "csfd": null, "imdb": null, "public": 83, "tmdbId": 85552, "poster": "https://image.tmdb.org/t/p/w185/vSMiAtqtawNOOE2jSmLbMpTa0lo.jpg", "providerName": "HBO Max", "providerLogo": "https://image.tmdb.org/t/p/w92/jbe4gVSfRlbPTdESXhEKpornsfu.jpg"}, {"id": 7, "title": "The Last of Us", "original": "", "milan": 95, "basa": null, "year": "2023", "type": "seriál", "genre": "Dráma", "director": "Neil Druckmann, Craig Mazin", "actors": "Bella Ramsey, Gabriel Luna, Isabela Merced", "summary": "", "csfd": null, "imdb": null, "public": 84, "tmdbId": 100088, "poster": "https://image.tmdb.org/t/p/w185/8qhIASz0a5JKR5IFT6ewZqA5YSy.jpg", "providerName": "HBO Max", "providerLogo": "https://image.tmdb.org/t/p/w92/jbe4gVSfRlbPTdESXhEKpornsfu.jpg"}, {"id": 8, "title": "Fallout", "original": "", "milan": 90, "basa": null, "year": "2024", "type": "seriál", "genre": "Akčný a Dobrodružný, Sci-Fi & Fantasy, Dráma", "director": "Graham Wagner, Geneva Robertson-Dworet", "actors": "Ella Purnell, Aaron Moten, Moisés Arias", "summary": "", "csfd": null, "imdb": null, "public": 81, "tmdbId": 106379, "poster": "https://image.tmdb.org/t/p/w185/c15BtJxCXMrISLVmysdsnZUPQft.jpg", "providerName": "Amazon Prime Video", "providerLogo": "https://image.tmdb.org/t/p/w92/pvske1MyAoymrs5bguRfVqYiM9a.jpg"}, {"id": 9, "title": "Modrooký samuraj", "original": "Blue Eye Samurai", "milan": 80, "basa": null, "year": "2023", "type": "seriál", "genre": "Akčný a Dobrodružný, Animovaný, Dráma", "director": "Amber Noizumi, Michael Green", "actors": "Maya Erskine, George Takei, Masi Oka", "summary": "", "csfd": null, "imdb": null, "public": 85, "tmdbId": 225180, "poster": "https://image.tmdb.org/t/p/w185/fXm3JT4WLQVnwukdvghtAblc1wc.jpg", "providerName": "Netflix", "providerLogo": "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg"}, {"id": 10, "title": "Biely lotos", "original": "The White Lotus", "milan": 65, "basa": null, "year": "2021", "type": "seriál", "genre": "Komédia, Dráma, Mysteriózny", "director": "Mike White", "actors": "Leslie Bibb, Carrie Coon, Walton Goggins", "summary": "", "csfd": null, "imdb": null, "public": 76, "tmdbId": 111803, "poster": "https://image.tmdb.org/t/p/w185/8ZHQryRLE3TX0MA2ghjymbaNjSZ.jpg", "providerName": "HBO Max", "providerLogo": "https://image.tmdb.org/t/p/w92/jbe4gVSfRlbPTdESXhEKpornsfu.jpg"}, {"id": 11, "title": "Tučniak", "original": "The Penguin", "milan": 90, "basa": null, "year": "2024", "type": "seriál", "genre": "Dráma, Kriminálny", "director": "Lauren LeFranc", "actors": "Colin Farrell, Cristin Milioti, Rhenzy Feliz", "summary": "", "csfd": null, "imdb": null, "public": 84, "tmdbId": 194764, "poster": "https://image.tmdb.org/t/p/w185/vOWcqC4oDQws1doDWLO7d3dh5qc.jpg", "providerName": "HBO Max", "providerLogo": "https://image.tmdb.org/t/p/w92/jbe4gVSfRlbPTdESXhEKpornsfu.jpg"}, {"id": 13, "title": "Problém tří těles", "original": "3 Body Problem", "milan": 85, "basa": null, "year": "2024", "type": "seriál", "genre": "Sci-Fi & Fantasy, Mysteriózny, Dráma", "director": "David Benioff, D. B. Weiss, Alexander Woo", "actors": "Jovan Adepo, Rosalind Chao, Liam Cunningham", "summary": "", "csfd": null, "imdb": null, "public": 75, "tmdbId": 108545, "poster": "https://image.tmdb.org/t/p/w185/ykZ7hlShkdRQaL2aiieXdEMmrLb.jpg", "providerName": "Netflix", "providerLogo": "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg"}, {"id": 14, "title": "Sandman", "original": "", "milan": 90, "basa": null, "year": "2022", "type": "seriál", "genre": "Sci-Fi & Fantasy, Dráma, Akčný a Dobrodružný", "director": "Allan Heinberg, David S. Goyer, Neil Gaiman", "actors": "Tom Sturridge, Vivienne Acheampong, Patton Oswalt", "summary": "", "csfd": null, "imdb": null, "public": 79, "tmdbId": 90802, "poster": "https://image.tmdb.org/t/p/w185/q54qEgagGOYCq5D1903eBVMNkbo.jpg", "providerName": "Netflix", "providerLogo": "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg"}, {"id": 15, "title": "Posledná šanca", "original": "Project Hail Mary", "milan": 95, "basa": null, "year": "2026", "type": "film", "genre": "Science Fiction, Dobrodružný", "director": "Phil Lord, Christopher Miller", "actors": "Ryan Gosling, Sandra Hüller, James Ortiz", "summary": "", "csfd": null, "imdb": null, "public": 87, "tmdbId": 687163, "poster": "https://image.tmdb.org/t/p/w185/cJKKP2vHld67AHUWdjB9iPhcFY7.jpg", "providerName": "Amazon Prime Video", "providerLogo": "https://image.tmdb.org/t/p/w92/pvske1MyAoymrs5bguRfVqYiM9a.jpg"}, {"id": 16, "title": "Vykúpenie z väznice Shawshank", "original": "The Shawshank Redemption", "milan": 99, "basa": null, "year": "1994", "type": "film", "genre": "Dráma, Kriminálny", "director": "Frank Darabont", "actors": "Tim Robbins, Morgan Freeman, Bob Gunton", "summary": "", "csfd": null, "imdb": null, "public": 87, "tmdbId": 278, "poster": "https://image.tmdb.org/t/p/w185/AuO8NzkzLpCaURQ3noyqejV1Lbk.jpg", "providerName": "Google Play Movies", "providerLogo": "https://image.tmdb.org/t/p/w92/8z7rC8uIDaTM91X0ZfkRf04ydj2.jpg"}, {"id": 17, "title": "Chľast", "original": "", "milan": 70, "basa": null, "year": "2020", "type": "film", "genre": "Komédia, Dráma", "director": "Thomas Vinterberg", "actors": "Mads Mikkelsen, Thomas Bo Larsen, Magnus Millang", "summary": "", "csfd": null, "imdb": null, "public": 76, "tmdbId": 580175, "poster": "https://image.tmdb.org/t/p/w185/1JI3xZUPJQEGBJcnllKUO9dzLab.jpg", "providerName": "Edisonline", "providerLogo": "https://image.tmdb.org/t/p/w92/hsuv1uc7SUr9YjCXRlLQNELt4UU.jpg"}, {"id": 18, "title": "Joker", "original": "Joker", "milan": 88, "basa": null, "year": "2019", "type": "film", "genre": "Kriminálny, Thriller, Dráma", "director": "Todd Phillips", "actors": "Joaquin Phoenix, Robert De Niro, Zazie Beetz", "summary": "", "csfd": null, "imdb": null, "public": 81, "tmdbId": 475557, "poster": "https://image.tmdb.org/t/p/w185/d7p9WYZWBAbme4NAoUCQ4CCJ9TO.jpg", "providerName": "Apple TV Store", "providerLogo": "https://image.tmdb.org/t/p/w92/SPnB1qiCkYfirS2it3hZORwGVn.jpg"}, {"id": 19, "title": "Tenet", "original": "Tenet", "milan": 70, "basa": null, "year": "2020", "type": "film", "genre": "Akčný, Thriller, Science Fiction", "director": "Christopher Nolan", "actors": "John David Washington, Robert Pattinson, Elizabeth Debicki", "summary": "", "csfd": null, "imdb": null, "public": 72, "tmdbId": 577922, "poster": "https://image.tmdb.org/t/p/w185/8Rat9OEsG5Ys9YxPoLpFSwUT3Ct.jpg", "providerName": "HBO Max", "providerLogo": "https://image.tmdb.org/t/p/w92/jbe4gVSfRlbPTdESXhEKpornsfu.jpg"}, {"id": 20, "title": "Matrix 1", "original": "The Matrix", "milan": 90, "basa": null, "year": "1999", "type": "film", "genre": "Akčný, Science Fiction", "director": "Lana Wachowski, Lilly Wachowski", "actors": "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss", "summary": "", "csfd": null, "imdb": null, "public": 83, "tmdbId": 603, "poster": "https://image.tmdb.org/t/p/w185/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg", "providerName": "Netflix", "providerLogo": "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg"}, {"id": 21, "title": "Temný rytier", "original": "The Dark Knight", "milan": 85, "basa": null, "year": "2008", "type": "film", "genre": "Akčný, Kriminálny, Thriller", "director": "Christopher Nolan", "actors": "Christian Bale, Heath Ledger, Aaron Eckhart", "summary": "", "csfd": null, "imdb": null, "public": 85, "tmdbId": 155, "poster": "https://image.tmdb.org/t/p/w185/lch0ILTsm9uFqowVwVmIeRsMcdL.jpg", "providerName": "HBO Max", "providerLogo": "https://image.tmdb.org/t/p/w92/jbe4gVSfRlbPTdESXhEKpornsfu.jpg"}, {"id": 22, "title": "The Office", "original": "", "milan": null, "basa": null, "year": "2005", "type": "seriál", "genre": "Komédia", "director": "Greg Daniels", "actors": "Rainn Wilson, John Krasinski, Jenna Fischer", "summary": "", "csfd": null, "imdb": null, "public": 86, "tmdbId": 2316, "poster": "https://image.tmdb.org/t/p/w185/7DJKHzAi83BmQrWLrYYOqcoKfhR.jpg", "rating": 99, "providerName": "Netflix", "providerLogo": "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg"}, {"id": 23, "title": "Černobyľ", "original": "Chernobyl", "milan": 98, "basa": null, "year": "2019", "type": "seriál", "genre": "Dráma", "director": "Craig Mazin", "actors": "Jared Harris, Stellan Skarsgård, Emily Watson", "summary": "", "csfd": null, "imdb": null, "public": 87, "tmdbId": 87108, "poster": "https://image.tmdb.org/t/p/w185/f6p84wzftwKImoaRp64wwNjdCG5.jpg", "providerName": "HBO Max", "providerLogo": "https://image.tmdb.org/t/p/w92/jbe4gVSfRlbPTdESXhEKpornsfu.jpg"}, {"id": 24, "title": "MINDHUNTER: Lovci myšlenek", "original": "MINDHUNTER", "milan": 90, "basa": null, "year": "2017", "type": "seriál", "genre": "Dráma, Kriminálny", "director": "Joe Penhall", "actors": "Jonathan Groff, Holt McCallany, Anna Torv", "summary": "", "csfd": null, "imdb": null, "public": 81, "tmdbId": 67744, "poster": "https://image.tmdb.org/t/p/w185/fbKE87mojpIETWepSbD5Qt741fp.jpg", "providerName": "Netflix", "providerLogo": "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg"}, {"id": 25, "title": "Oddelenie", "original": "Severance", "milan": 85, "basa": null, "year": "2022", "type": "seriál", "genre": "Dráma, Mysteriózny, Sci-Fi & Fantasy", "director": "Dan Erickson", "actors": "Adam Scott, Britt Lower, Tramell Tillman", "summary": "", "csfd": null, "imdb": null, "public": 84, "tmdbId": 95396, "poster": "https://image.tmdb.org/t/p/w185/kwGN0qhAhPaqX11h2TR9hVJvQoO.jpg", "providerName": "Apple TV", "providerLogo": "https://image.tmdb.org/t/p/w92/mcbz1LgtErU9p4UdbZ0rG6RTWHX.jpg"}, {"id": 26, "title": "Maniak", "original": "Maniac", "milan": null, "basa": null, "year": "2018", "type": "seriál", "genre": "Komédia, Dráma, Sci-Fi & Fantasy", "director": "Patrick Somerville, Cary Joji Fukunaga", "actors": "Emma Stone, Jonah Hill, Sonoya Mizuno", "summary": "", "csfd": null, "imdb": null, "public": 74, "tmdbId": 73411, "poster": "https://image.tmdb.org/t/p/w185/kCNl4QPstAqChFD0NnLpbDFG8ul.jpg", "providerName": "Netflix", "providerLogo": "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg"}, {"id": 27, "title": "Enola Holmesová 3", "original": "Enola Holmes 3", "milan": 55, "basa": null, "year": "2026", "type": "film", "genre": "Dobrodružný, Kriminálny, Mysteriózny", "director": "Philip Barantini", "actors": "Millie Bobby Brown, Henry Cavill, Helena Bonham Carter", "summary": "", "csfd": null, "imdb": null, "public": 69, "tmdbId": 1202033, "poster": "https://image.tmdb.org/t/p/w185/7kRYHH9H9PjBFwz1FprbHB2AAjI.jpg", "providerName": "Netflix", "providerLogo": "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg"}, {"id": 28, "title": "Temná hmota", "original": "Dark Matter", "milan": 75, "basa": null, "year": "2024", "type": "seriál", "genre": "Sci-Fi & Fantasy, Dráma", "director": "Blake Crouch", "actors": "Joel Edgerton, Jennifer Connelly, Alice Braga", "summary": "", "csfd": null, "imdb": null, "public": 77, "tmdbId": 196322, "poster": "https://image.tmdb.org/t/p/w185/c6MRUtPk0nEPQ9FBD9RdRKt2rIm.jpg", "providerName": "Apple TV", "providerLogo": "https://image.tmdb.org/t/p/w92/mcbz1LgtErU9p4UdbZ0rG6RTWHX.jpg"}, {"title": "V ako Vendeta", "original": "V for Vendetta", "type": "film", "year": "2006", "rating": 85, "public": 79, "poster": "https://image.tmdb.org/t/p/w185/2CbiuLL1ES7Ti3xXRxcArt3Va3O.jpg", "director": "James McTeigue", "actors": "Natalie Portman, Hugo Weaving, Stephen Rea", "genre": "Akčný, Thriller, Science Fiction", "tmdbId": 752, "id": 29, "milan": null, "basa": null, "providerName": "Apple TV Store", "providerLogo": "https://image.tmdb.org/t/p/w92/SPnB1qiCkYfirS2it3hZORwGVn.jpg"}, {"title": "Constantine", "original": "Constantine", "type": "film", "year": "2005", "rating": 95, "public": 72, "poster": "https://image.tmdb.org/t/p/w185/fdl7MgnV10QIQ4aWhOVE8AOGxQO.jpg", "director": "Francis Lawrence", "actors": "Keanu Reeves, Rachel Weisz, Shia LaBeouf", "genre": "Fantasy, Akčný, Horror", "tmdbId": 561, "id": 30, "milan": null, "basa": null, "providerName": "Apple TV Store", "providerLogo": "https://image.tmdb.org/t/p/w92/SPnB1qiCkYfirS2it3hZORwGVn.jpg"}, {"title": "1670", "original": "1670", "type": "seriál", "year": "2023", "rating": 60, "public": 74, "poster": "https://image.tmdb.org/t/p/w185/sMPLjSZYJEeeXfxeKQ7Ct7SEYuV.jpg", "director": "", "actors": "Bartłomiej Topa, Katarzyna Herman, Kirył Pietruczuk", "genre": "Komédia", "tmdbId": 236450, "id": 31, "milan": null, "basa": null, "providerName": "Netflix", "providerLogo": "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg"}, {"title": "Fleabag", "original": "Fleabag", "type": "seriál", "year": "2016", "rating": null, "public": 83, "poster": "https://image.tmdb.org/t/p/w92/27vEYsRKa3eAniwmoccOoluEXQ1.jpg", "director": "Phoebe Wallerová-Bridgeová", "actors": "Phoebe Wallerová-Bridgeová, Sian Clifford, Andrew Scott", "genre": "Komédia, Dráma", "providerName": "Amazon Prime Video", "providerLogo": "https://image.tmdb.org/t/p/w92/pvske1MyAoymrs5bguRfVqYiM9a.jpg", "tmdbId": 67070, "id": 32}, {"title": "Frasier", "original": "Frasier", "type": "seriál", "year": "1993", "rating": null, "public": 77, "poster": "https://image.tmdb.org/t/p/w92/gYAb6GCVEFsU9hzMCG5rxaxoIv3.jpg", "director": "David Angell, Peter Casey, David Clark Lee", "actors": "Kelsey Grammer, Jane Leeves, David Hyde Pierce", "genre": "Komédia, Rodinný", "providerName": "SkyShowtime", "providerLogo": "https://image.tmdb.org/t/p/w92/h0ZYcYHicKQ4Ixm5nOjqvwni5NG.jpg", "tmdbId": 3452, "id": 33}, {"title": "Baby Reindeer", "original": "Baby Reindeer", "type": "seriál", "year": "2024", "rating": null, "public": 76, "poster": "https://image.tmdb.org/t/p/w92/tN9OcbkAOPwHSr1sgMornZtQZBx.jpg", "director": "Richard Gadd", "actors": "Richard Gadd, Jessica Gunning, Nava Mau", "genre": "Dráma", "providerName": "Netflix", "providerLogo": "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg", "tmdbId": 241259, "id": 34}];

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

async function loadFilms(kv) {
  const raw = await kv.get("films", "json");
  if (raw === null) {
    await kv.put("films", JSON.stringify(SEED_DATA));
    return SEED_DATA;
  }
  return raw;
}

async function handleFilmsApi(request, env) {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (!env.FILMOPOLIS_KV) {
    return json({ error: "FILMOPOLIS_KV binding chýba" }, 500);
  }

  if (request.method === "GET") {
    const films = await loadFilms(env.FILMOPOLIS_KV);
    return json(films);
  }

  if (request.method === "POST") {
    const entry = await request.json();
    const films = await loadFilms(env.FILMOPOLIS_KV);
    const nextId = films.length ? Math.max(...films.map((f) => f.id)) + 1 : 1;
    const saved = { ...entry, id: nextId };
    films.push(saved);
    await env.FILMOPOLIS_KV.put("films", JSON.stringify(films));
    return json(saved, 201);
  }

  if (request.method === "DELETE") {
    const { id } = await request.json();
    let films = await loadFilms(env.FILMOPOLIS_KV);
    films = films.filter((f) => f.id !== id);
    await env.FILMOPOLIS_KV.put("films", JSON.stringify(films));
    return json({ ok: true });
  }

  if (request.method === "PATCH") {
    const patch = await request.json();
    let films = await loadFilms(env.FILMOPOLIS_KV);
    films = films.map((f) => (f.id === patch.id ? { ...f, ...patch } : f));
    await env.FILMOPOLIS_KV.put("films", JSON.stringify(films));
    return json({ ok: true });
  }

  return json({ error: "Method not allowed" }, 405);
}

const TRAKT_API = "https://api.trakt.tv";

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
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (compatible; Filmopolis/1.0; +https://filmopolis.filmopolis2.workers.dev)",
    },
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

async function handleOAuthCallback(request, env) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return new Response("Chýba autorizačný kód od Traktu.", { status: 400 });
  }

  const redirectUri = `${url.origin}/oauth/callback`;

  const res = await fetch(`${TRAKT_API}/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (compatible; Filmopolis/1.0; +https://filmopolis.filmopolis2.workers.dev)",
    },
    body: JSON.stringify({
      code,
      client_id: env.TRAKT_CLIENT_ID,
      client_secret: env.TRAKT_CLIENT_SECRET,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    return new Response("Nepodarilo sa dokončiť prepojenie s Traktom: " + detail, { status: 500 });
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
      "User-Agent": "Mozilla/5.0 (compatible; Filmopolis/1.0; +https://filmopolis.filmopolis2.workers.dev)",
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
      const nextId = films.length ? Math.max(...films.map((f) => f.id)) + 1 : 1;
      films.push({
        id: nextId,
        title: t.title,
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
        tmdbId: tmdbId || null,
      });
      added++;
    }
  }

  await env.FILMOPOLIS_KV.put("films", JSON.stringify(films));
  return json({ ok: true, added, updated });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/api/films") {
      return handleFilmsApi(request, env);
    }

    if (url.pathname === "/oauth/callback") {
      return handleOAuthCallback(request, env);
    }

    if (url.pathname === "/api/trakt-status") {
      const tokens = await getTraktTokens(env.FILMOPOLIS_KV);
      return json({ connected: !!tokens });
    }

    if (url.pathname === "/api/trakt-sync" && request.method === "POST") {
      return handleTraktSync(env);
    }

    // Everything else -> serve static assets from /public
    return env.ASSETS.fetch(request);
  },
};
