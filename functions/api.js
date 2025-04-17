export async function onRequestGet(context) {
  try {
    const filePath = join(__dirname, 'https://random-picture.kafuchino.top/url.csv'); // 兼容相对路径
    const data = readFileSync(filePath, 'utf-8');
    const urls = data
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const randomUrl = urls[Math.floor(Math.random() * urls.length)];

    return Response.redirect(randomUrl, 302);
  } catch (err) {
    return new Response('Error reading url.csv: ' + err.message, {
      status: 500,
    });
  }
}
