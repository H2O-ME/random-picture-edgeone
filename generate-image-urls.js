const fs = require("fs");
const path = require("path");

const imageBaseUrl = "https://image.api.kafuchino.top/images";
const apiFilePath = path.join("functions", "api.js");
const indexHtmlPath = path.join("images", "index.html");
const rootDir = path.join(process.cwd(), "images");

const isImage = (filename) => /\.(jpg|jpeg|png|gif|webp)$/i.test(filename);

// 收集 PC 和 Phone 图片路径
const walkDir = (dir) => {
  const results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results.push(...walkDir(filePath));
    } else if (isImage(file)) {
      results.push(path.relative(rootDir, filePath).replace(/\\/g, "/"));
    }
  });
  return results;
};

const pcImages = walkDir(path.join(rootDir, "pc"));
const phoneImages = walkDir(path.join(rootDir, "phone"));

// === 1. 生成 functions/api.js ===
const apiJsContent = `
export function onRequestGet(context) {
  const pc = ${JSON.stringify(pcImages)};
  const phone = ${JSON.stringify(phoneImages)};
  const userAgent = context.request.headers.get("user-agent") || "";
  const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent);
  const list = isMobile ? phone : pc;
  const url = list.length > 0
    ? "${imageBaseUrl}/" + list[Math.floor(Math.random() * list.length)]
    : "${imageBaseUrl}/notfound.jpg";
  return Response.redirect(url, 302);
}
`.trim();

fs.mkdirSync(path.dirname(apiFilePath), { recursive: true });
fs.writeFileSync(apiFilePath, apiJsContent);
console.log("✅ 生成 functions/api.js 成功");

// === 2. 生成 images/index.html ===
let html = `<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <title>CDN 文件索引</title>
  <style>
    body { font-family: sans-serif; padding: 2rem; background: #f9f9f9; }
    ul { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.5rem; list-style: none; padding: 0; }
    li { background: white; padding: 1rem; border-radius: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.05); overflow: hidden; word-break: break-all; display: flex; flex-direction: column; align-items: center; }
    .preview img {
      width: 100%;
      max-height: 140px;
      object-fit: cover;
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    .preview div {
      margin-top: 0.5rem;
      font-size: 0.85rem;
      color: #333;
      text-align: center;
    }
    .copy-btn {
      margin-top: 10px;
      padding: 6px 16px;
      font-size: 14px;
      background: #4caf50;
      color: white;
      border: none;
      border-radius: 999px;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }
    .copy-btn:hover {
      background: #43a047;
    }
  </style>
</head>
<body>
  <h1>🖼️ 图片索引</h1>
  <ul>
`;

[...pcImages, ...phoneImages].forEach((imgPath) => {
  const fullUrl = `${imageBaseUrl}/${imgPath}`;
  html += `
    <li>
      <a class="preview" href="${fullUrl}" target="_blank">
        <img src="${fullUrl}" alt="${imgPath}" loading="lazy" />
        <div>${imgPath}</div>
      </a>
      <button class="copy-btn" data-url="${fullUrl}">复制</button>
    </li>`;
});

html += `
  </ul>
  <script>
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(btn.dataset.url).then(() => {
          btn.textContent = "✅ 已复制";
          setTimeout(() => btn.textContent = "复制", 1500);
        });
      });
    });
  </script>
</body>
</html>
`;

fs.mkdirSync(path.dirname(indexHtmlPath), { recursive: true });
fs.writeFileSync(indexHtmlPath, html);
console.log("✅ 生成 images/index.html 成功");
