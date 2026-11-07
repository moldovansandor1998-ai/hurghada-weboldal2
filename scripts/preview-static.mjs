// Local verification server with the same clean-URL/static-404 behavior as Vercel.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
const root = resolve('dist');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain' };
createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\//, '') + (extname(pathname) ? '' : '.html');
  const file = resolve(root, relative);
  if (!file.startsWith(root + sep)) { res.writeHead(400); res.end(); return; }
  try {
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', ...(pathname === '/admin' ? { 'X-Robots-Tag': 'noindex, nofollow' } : {}) });
    res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(await readFile(resolve(root, '404.html')));
  }
}).listen(3199, '0.0.0.0', () => console.log('Static verification server: http://localhost:3199'));
