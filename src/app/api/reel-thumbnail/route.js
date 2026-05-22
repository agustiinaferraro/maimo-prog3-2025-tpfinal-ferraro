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
    const videoUrl = ogVideo?.[1]?.replace(/&amp;/g, "&") || "";
    const thumbnail = ogImage?.[1]?.replace(/&amp;/g, "&") || "";
    return Response.json({ thumbnail, video: videoUrl });
  } catch {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
