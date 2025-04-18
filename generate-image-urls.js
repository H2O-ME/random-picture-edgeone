// generate-image-urls.js
import fs from "fs";
import path from "path";

const pcDir = path.join("images", "pc");
const phoneDir = path.join("images", "phone");
const outputFile = path.join("functions", "api.js");

function getImageUrls(folder, prefixUrl) {
  const files = fs.existsSync(folder) ? fs.readdirSync(folder) : [];
  return files
    .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
    .map(file => `"${prefixUrl}/${file}"`);
}

const pcUrls = getImageUrls(pcDir, "https://random-picture.kafuchino.top/images/pc");
const phoneUrls = getImageUrls(phoneDir, "https://random-picture.kafuchino.top/images/phone");

const content = `
// 自动生成文件，请勿手动修改
const pcUrls = [
  ${pcUrls.join(",\n  ")}
];

const phoneUrls = [
  ${phoneUrls.join(",\n  ")}
];

export function onRequestGet({ request }) {
  const userAgent = request.headers.get("user-agent") || "";
  const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent);
  const urls = isMobile ? phoneUrls : pcUrls;
  const randomIndex = Math.floor(Math.random() * urls.length);
  const targetUrl = urls[randomIndex];
  return Response.redirect(targetUrl, 302);
}
`;

fs.writeFileSync(outputFile, content);
console.log("✅ functions/api.js 生成成功");
