// functions/api.js
const urls = [
  "https://random-picture.kafuchino.top/images/1.jpg",
  "https://random-picture.kafuchino.top/images/2.jpg",
  "https://random-picture.kafuchino.top/images/3.png"
  // 更多图片地址将自动添加在这里
];

export function onRequestGet() {
  const randomIndex = Math.floor(Math.random() * urls.length);
  const targetUrl = urls[randomIndex];
  return Response.redirect(targetUrl, 302);
}
