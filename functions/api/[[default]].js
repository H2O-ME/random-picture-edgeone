// /functions/api/[[default]].js
export function onRequest(context) {
  // 图片地址列表（可自行替换）
  const imageUrls = [
    'https://image-cdn.kafuchino.top/chino-blog/valaxy-theme-sakura/theme-sakura-5.jpg',
    'https://image-cdn.kafuchino.top/chino-blog/valaxy-theme-sakura/theme-sakura-7.jpg',
    'https://image-cdn.kafuchino.top/chino-blog/valaxy-theme-sakura/theme-sakura-2.jpg'
  ];

  // 随机选择一张图片
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  const targetUrl = imageUrls[randomIndex];

  // 返回 302 重定向
  return Response.redirect(targetUrl, 302);
}
