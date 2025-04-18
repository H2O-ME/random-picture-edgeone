export function onRequestGet(context) {
  const pc = ["pc/pixiv_pc (9).webp"];
  const phone = ["phone/pixiv_mob (9).webp"];
  const userAgent = context.request.headers.get("user-agent") || "";
  const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent);
  const list = isMobile ? phone : pc;
  const url = list.length > 0
    ? "https://random-picture.kafuchino.top/images/" + list[Math.floor(Math.random() * list.length)]
    : "https://random-picture.kafuchino.top/images/notfound.jpg";
  return Response.redirect(url, 302);
}