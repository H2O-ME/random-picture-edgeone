export async function onRequestGet({ env }) {
  try {
    // 获取链接列表（JSON字符串）
    const value = await env.wallpaper_kv.get("wallpaper_urls", { type: "json" });

    if (!value || !Array.isArray(value) || value.length === 0) {
      return new Response("No URLs found in KV.", { status: 500 });
    }

    const randomUrl = value[Math.floor(Math.random() * value.length)];
    return Response.redirect(randomUrl, 302);
  } catch (e) {
    return new Response("Error: " + e.message, { status: 500 });
  }
}
