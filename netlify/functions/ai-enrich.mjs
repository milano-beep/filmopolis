const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "no-store, no-cache, must-revalidate",
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
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return json({ error: "GEMINI_API_KEY nie je nastavený v Netlify environment variables" }, 500);
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Neplatné telo požiadavky" }, 400);
  }

  const { title, original, year, type, genre, director, actors, tasteProfile } = body;
  if (!title) return json({ error: "Chýba title" }, 400);

  const typeLabel = type === "seriál" ? "seriál" : "film";

  const prompt = `Si filmový/seriálový sprievodca pre osobný denník. Pre nasledujúci titul napíš krátky text v slovenčine (max. 120 slov, súvislý text bez nadpisov, 2-3 krátke odseky oddelené jedným enterom):
1) stručný, spoiler-free obsah (2-3 vety),
2) jedna zaujímavosť (trivia) o tvorbe alebo obsadení,
3) krátky odhad, prečo by sa tento titul mohol páčiť používateľovi na základe jeho doterajšieho vkusu (ak vkus nie je uvedený, vynechaj túto časť).

Titul: ${title}${original ? ` (${original})` : ""}
Typ: ${typeLabel}
Rok: ${year || "neznámy"}
Žáner: ${genre || "neznámy"}
Réžia: ${director || "neznáma"}
Herci: ${actors || "neznámi"}
${tasteProfile ? `Doterajší vkus používateľa (najvyššie hodnotené žánre/tituly): ${tasteProfile}` : ""}

Odpovedz iba samotným textom, žiadny úvod ani vysvetlenie navyše.`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 400 },
        }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      return json({ error: data?.error?.message || `Gemini ${res.status}` }, 502);
    }
    const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "";
    return json({ text: text.trim() });
  } catch (err) {
    return json({ error: String(err) }, 500);
  }
};

export const config = { path: "/api/ai-enrich" };
