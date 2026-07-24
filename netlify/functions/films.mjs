import { getStore } from "@netlify/blobs";

const SEED_DATA = [{"id": 1, "title": "Silo", "original": "", "milan": 90, "basa": null, "year": 2025, "type": "seriál", "genre": "", "director": "", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": null}, {"id": 2, "title": "Oppenheimer", "original": "", "milan": 75, "basa": null, "year": 2023, "type": "film", "genre": "", "director": "", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": null}, {"id": 3, "title": "Pluribus", "original": "", "milan": 95, "basa": null, "year": 2025, "type": "seriál", "genre": "", "director": "", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": null}, {"id": 4, "title": "Pitt", "original": "", "milan": 70, "basa": null, "year": 2025, "type": "seriál", "genre": "", "director": "", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": null}, {"id": 5, "title": "Black Mirror", "original": "", "milan": 65, "basa": null, "year": null, "type": "seriál", "genre": "", "director": "", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": null}, {"id": 6, "title": "Eufória", "original": "Euphoria", "milan": 98, "basa": null, "year": null, "type": "seriál", "genre": "", "director": "", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": null}, {"id": 7, "title": "The Last of Us", "original": "", "milan": 95, "basa": null, "year": null, "type": "seriál", "genre": "", "director": "", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": null}, {"id": 8, "title": "Fallout", "original": "", "milan": 90, "basa": null, "year": null, "type": "seriál", "genre": "", "director": "", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": null}, {"id": 9, "title": "Modrooký samuraj", "original": "Blue Eye Samurai", "milan": 80, "basa": null, "year": null, "type": "seriál", "genre": "", "director": "", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": null}, {"id": 10, "title": "Biely lotos", "original": "The White Lotus", "milan": 65, "basa": null, "year": null, "type": "seriál", "genre": "", "director": "", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": null}, {"id": 11, "title": "Tučniak", "original": "The Penguin", "milan": 90, "basa": null, "year": null, "type": "seriál", "genre": "", "director": "", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": null}, {"id": 12, "title": "Dark", "original": "", "milan": 98, "basa": null, "year": null, "type": "seriál", "genre": "", "director": "", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": null}, {"id": 13, "title": "Problém tří těles", "original": "3 Body Problem", "milan": 85, "basa": null, "year": null, "type": "seriál", "genre": "", "director": "", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": null}, {"id": 14, "title": "Sandman", "original": "", "milan": 90, "basa": null, "year": null, "type": "seriál", "genre": "", "director": "", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": null}, {"id": 15, "title": "Posledná šanca", "original": "Project Hail Mary", "milan": 95, "basa": null, "year": 2026, "type": "film", "genre": "", "director": "", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": null}, {"id": 16, "title": "Vykúpenie z väznice Shawshank", "original": "The Shawshank Redemption", "milan": 99, "basa": null, "year": 1994, "type": "film", "genre": "", "director": "", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": null}, {"id": 17, "title": "Chľast", "original": "", "milan": 70, "basa": null, "year": 2020, "type": "film", "genre": "", "director": "", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": null}, {"id": 18, "title": "Joker", "original": "Joker", "milan": 88, "basa": null, "year": 2019, "type": "film", "genre": "", "director": "", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": null}, {"id": 19, "title": "Tenet", "original": "Tenet", "milan": 70, "basa": null, "year": 2020, "type": "film", "genre": "", "director": "", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": null}, {"id": 20, "title": "Matrix 1", "original": "The Matrix", "milan": 90, "basa": null, "year": 1999, "type": "film", "genre": "", "director": "", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": null}, {"id": 21, "title": "Temný rytier", "original": "The Dark Knight", "milan": 85, "basa": null, "year": 2008, "type": "film", "genre": "", "director": "", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": null}, {"id": 22, "title": "The Office", "original": "", "milan": 95, "basa": null, "year": null, "type": "seriál", "genre": "", "director": "", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": null}, {"id": 23, "title": "Černobyľ", "original": "Chernobyl", "milan": 98, "basa": null, "year": null, "type": "seriál", "genre": "", "director": "", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": null}, {"id": 24, "title": "MINDHUNTER: Lovci myšlenek", "original": "MINDHUNTER", "milan": 90, "basa": null, "year": null, "type": "seriál", "genre": "", "director": "", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": null}, {"id": 25, "title": "Oddelenie", "original": "Severance", "milan": 85, "basa": null, "year": 2022, "type": "seriál", "genre": "", "director": "", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": null}, {"id": 26, "title": "Maniak", "original": "Maniac", "milan": null, "basa": null, "year": 2018, "type": "seriál", "genre": "", "director": "", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": null}, {"id": 27, "title": "Enola Holmesová 3", "original": "Enola Holmes 3", "milan": 55, "basa": null, "year": null, "type": "film", "genre": "", "director": "", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": null}, {"id": 28, "title": "Temná hmota", "original": "Dark Matter", "milan": 75, "basa": null, "year": 2024, "type": "seriál", "genre": "", "director": "", "actors": "", "summary": "", "csfd": null, "imdb": null, "public": null}];

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

export default async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  const store = getStore("filmopolis");

  if (req.method === "GET") {
    let films = await store.get("films", { type: "json" });
    if (films === null) {
      films = SEED_DATA;
      await store.setJSON("films", films);
    }
    return json(films);
  }

  if (req.method === "POST") {
    const entry = await req.json();
    let films = (await store.get("films", { type: "json" })) || [];
    const nextId = films.length ? Math.max(...films.map((f) => f.id)) + 1 : 1;
    const saved = { ...entry, id: nextId };
    films.push(saved);
    await store.setJSON("films", films);
    return json(saved, 201);
  }

  if (req.method === "DELETE") {
    const { id } = await req.json();
    let films = (await store.get("films", { type: "json" })) || [];
    films = films.filter((f) => f.id !== id);
    await store.setJSON("films", films);
    return json({ ok: true });
  }

  if (req.method === "PATCH") {
    const patch = await req.json();
    let films = (await store.get("films", { type: "json" })) || [];
    films = films.map((f) => (f.id === patch.id ? { ...f, ...patch } : f));
    await store.setJSON("films", films);
    return json({ ok: true });
  }

  return json({ error: "Method not allowed" }, 405);
};

export const config = { path: "/api/films" };
