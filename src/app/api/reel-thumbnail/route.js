export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  if (!url) return new Response("Missing url", { status: 400 });
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    const html = await res.text();
    const patterns = [
      /<meta\s+property="og:image"\s+content="([^"]+)"/i,
      /<meta\s+content="([^"]+)"\s+property="og:image"/i,
      /<meta\s+name="twitter:image"\s+content="([^"]+)"/i,
      /<meta\s+content="([^"]+)"\s+name="twitter:image"/i,
    ];
    for (const pat of patterns) {
      const match = html.match(pat);
      if (match && match[1]) {
        const decoded = match[1].replace(/&amp;/g, "&");
        return Response.redirect(decoded, 302);
      }
    }
    throw new Error("No image found");
  } catch {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
