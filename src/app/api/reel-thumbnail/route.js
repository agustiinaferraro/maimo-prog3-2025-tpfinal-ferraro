export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  if (!url) return Response.json({ error: "Missing url" }, { status: 400 });

  const reelId = url.split("/p/")[1]?.split("/")[0];
  if (!reelId) return Response.json({ error: "Invalid url" }, { status: 400 });

  const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";

  try {
    // Strategy 1: try Instagram internal JSON API
    const jsonRes = await fetch(`https://www.instagram.com/p/${reelId}/?__a=1`, {
      headers: { "User-Agent": ua },
    });
    if (jsonRes.ok) {
      const json = await jsonRes.json();
      const item = json?.items?.[0] || json?.graphql?.shortcode_media;
      if (item) {
        const thumbnail = item.display_url || item?.display_src || item?.thumbnail_src;
        const video = item?.video_url || "";
        const title = item?.edge_media_to_caption?.edges?.[0]?.node?.text || item?.accessibility_caption || "";
        const cleaned = title.replace(/^[^:]*likes[^:]*:\s*/i, "").trim();
        if (thumbnail) return Response.json({ thumbnail, video: video || "", title: cleaned || "" });
      }
    }
  } catch {}

  try {
    // Strategy 2: scrape HTML page
    const res = await fetch(url, { headers: { "User-Agent": ua } });
    const html = await res.text();

    const ogImage = html.match(/property="og:image"[^>]+content="([^"]+)"/)
      || html.match(/content="([^"]+)"[^>]+property="og:image"/)
      || html.match(/name="twitter:image"[^>]+content="([^"]+)"/)
      || html.match(/content="([^"]+)"[^>]+name="twitter:image"/);
    const ogVideo = html.match(/property="og:video"[^>]+content="([^"]+)"/)
      || html.match(/content="([^"]+)"[^>]+property="og:video"/);
    const ogDesc = html.match(/property="og:description"[^>]+content="([^"]+)"/)
      || html.match(/content="([^"]+)"[^>]+property="og:description"/)
      || html.match(/name="description"[^>]+content="([^"]+)"/)
      || html.match(/content="([^"]+)"[^>]+name="description"/);

    let thumbnail = ogImage?.[1]?.replace(/&amp;/g, "&") || "";
    let videoUrl = ogVideo?.[1]?.replace(/&amp;/g, "&") || "";
    let title = ogDesc?.[1]?.replace(/&amp;/g, "&")?.replace(/&#\d+;/g, "")?.trim() || "";

    // Strategy 3: look for video poster attribute
    if (!thumbnail || !videoUrl) {
      const poster = html.match(/<video[^>]+poster="([^"]+)"/);
      const vidSrc = html.match(/<video[^>]+src="([^"]+)"/);
      if (poster?.[1]) thumbnail = poster[1].replace(/&amp;/g, "&");
      if (vidSrc?.[1]) videoUrl = vidSrc[1].replace(/&amp;/g, "&");
    }

    const match = title.match(/(?:likes|views)\s*•\s*(.+)/i);
    const cleaned = match ? match[1].trim() : title;

    return Response.json({ thumbnail, video: videoUrl, title: cleaned });
  } catch {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
