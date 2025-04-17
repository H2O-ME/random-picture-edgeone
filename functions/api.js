// functions/api.js

const urls = [
  "https://photo.api.kafuchino.top/PC/BA_pc%20%281%29.jpg",
  "https://photo.api.kafuchino.top/PC/BA_pc%20%281%29.png",
  "https://photo.api.kafuchino.top/PC/BA_pc%20%2810%29.jpg"
];

export function onRequestGet() {
  const randomIndex = Math.floor(Math.random() * urls.length);
  const targetUrl = urls[randomIndex];
  return Response.redirect(targetUrl, 302);
}
