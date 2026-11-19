// Сверка классов JSX со стилями: скрипт для локальной проверки вёрстки.
// Запуск: node scripts/class-check.mjs
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const jsxFiles = walk('src').filter((file) => file.endsWith('.jsx'));
const cssFiles = walk('src/styles').filter((file) => file.endsWith('.css'));

const jsxSource = jsxFiles.map((file) => readFileSync(file, 'utf8')).join('\n');
const cssSource = cssFiles.map((file) => readFileSync(file, 'utf8')).join('\n');

const used = new Set();

// Литеральные className="a b c"
for (const match of jsxSource.matchAll(/className="([^"]+)"/g)) {
  match[1].split(/\s+/).forEach((name) => name && used.add(name));
}

// Шаблонные className={`a b--${x}`} и className={cond ? 'a' : 'b'}
for (const match of jsxSource.matchAll(/className=\{([^}]+)\}/g)) {
  for (const literal of match[1].matchAll(/'([^']+)'|`([^`]+)`/g)) {
    const value = (literal[1] ?? literal[2]).replace(/\$\{[^}]*\}/g, ' ');
    value.split(/\s+/).forEach((name) => {
      if (name && /^[a-z]/.test(name)) used.add(name);
    });
  }
}

const missing = [...used]
  .filter((name) => /^[a-z][a-zA-Z0-9-]*$/.test(name))
  .filter((name) => !new RegExp(`\\.${name.replace(/[-]/g, '\\-')}(?![a-zA-Z0-9_-])`).test(cssSource))
  .sort();

console.log(`Классов в JSX: ${used.size}`);
console.log(`Без стилей (${missing.length}): ${missing.join(', ') || '—'}`);
process.exitCode = missing.length ? 1 : 0;
