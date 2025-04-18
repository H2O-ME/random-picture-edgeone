
// 自动生成文件，请勿手动修改
const pcUrls = [
  "https://random-picture.kafuchino.top/images/pc/BA_pc (1).jpg"
];

const phoneUrls = [
  "https://random-picture.kafuchino.top/images/phone/BA_ios (1).jpg"
];

export function onRequestGet({ request }) {
  const userAgent = request.headers.get("user-agent") || "";
  const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent);
  const urls = isMobile ? phoneUrls : pcUrls;
  const randomIndex = Math.floor(Math.random() * urls.length);
  const targetUrl = urls[randomIndex];
  return Response.redirect(targetUrl, 302);
}
