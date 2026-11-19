// Быстрая проверка dev-сервера: запросы к страницам и точке входа.
// Запуск: node scripts/dev-probe.mjs [порт]
const port = Number(process.argv[2] ?? 5199);

const targets = [
  '/',
  '/catalog',
  '/about',
  '/account',
  '/product/aurora-desk-lamp',
  '/src/main.jsx',
];

const results = [];

for (const target of targets) {
  try {
    const response = await fetch(`http://localhost:${port}${target}`);
    const body = await response.text();
    results.push(`${target} -> ${response.status}; длина ${body.length}`);
  } catch (error) {
    results.push(`${target} -> ошибка: ${error.message}`);
  }
}

console.log(results.join('\n'));
