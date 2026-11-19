import { preview } from 'vite';

const routes = [
  '/',
  '/catalog',
  '/product',
  '/product/aurora-desk-lamp',
  '/about',
  '/order',
  '/contacts',
  '/account',
  '/nope',
];

const server = await preview({ preview: { port: 4173, strictPort: true } });
const port = server.config.preview.port;

let failed = false;

for (const route of routes) {
  const response = await fetch(`http://localhost:${port}${route}`);
  const html = await response.text();
  const ok = response.status === 200 && html.includes('id="root"');

  if (!ok) failed = true;
  console.log(`${route} -> ${response.status}; root div: ${html.includes('id="root"')}`);
}

// Корректно дожидаемся закрытия сервера, чтобы Node завершился без ошибок.
await new Promise((resolve) => server.httpServer.close(resolve));
process.exitCode = failed ? 1 : 0;

