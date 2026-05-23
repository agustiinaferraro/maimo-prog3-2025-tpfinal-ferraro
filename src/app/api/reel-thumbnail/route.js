export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  if (!url) return Response.json({ error: "Missing url" }, { status: 400 });
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36" },
    });
    const html = await res.text();
    const ogImage = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i)
      || html.match(/<meta\s+content="([^"]+)"\s+property="og:image"/i);
    const ogVideo = html.match(/<meta\s+property="og:video"\s+content="([^"]+)"/i)
      || html.match(/<meta\s+content="([^"]+)"\s+property="og:video"/i);
    const ogDesc = html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i)
      || html.match(/<meta\s+content="([^"]+)"\s+property="og:description"/i)
      || html.match(/<meta\s+name="description"\s+content="([^"]+)"/i)
      || html.match(/<meta\s+content="([^"]+)"\s+name="description"/i);
    const videoUrl = ogVideo?.[1]?.replace(/&amp;/g, "&") || "";
    const thumbnail = ogImage?.[1]?.replace(/&amp;/g, "&") || "";
    const title = ogDesc?.[1]?.replace(/&amp;/g, "&")?.replace(/&#\d+;/g, "")?.trim() || "";
    const cleaned = title.replace(/^Video\s+by\s+@\S+\s*•\s*[\d,.]+\s*(K|M)?\s*likes\s*•\s*/i, "")
      .replace(/^@\S+\s*/, "")
      .trim();
    return Response.json({ thumbnail, video: videoUrl, title: cleaned });
  } catch {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
