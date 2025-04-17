import fs from 'fs';
import path from 'path';

const imagesDir = path.join(process.cwd(), 'images');
const files = fs.readdirSync(imagesDir);

// 图片访问前缀
const baseUrl = 'https://random-picture.kafuchino.top/images';

// 获取所有图片地址
const urls = files
  .filter(file => /\.(jpe?g|png|gif|webp)$/i.test(file))
  .map(file => `${baseUrl}/${encodeURIComponent(file)}`);

// 生成 api.js 内容
const code = `const urls = ${JSON.stringify(urls, null, 2)};

export function onRequestGet() {
  const randomIndex = Math.floor(Math.random() * urls.length);
  const targetUrl = urls[randomIndex];
  return Response.redirect(targetUrl, 302);
}
`;

fs.writeFileSync('./functions/api.js', code);
console.log('✅ functions/api.js 生成成功，包含 ' + urls.length + ' 个图片链接');
