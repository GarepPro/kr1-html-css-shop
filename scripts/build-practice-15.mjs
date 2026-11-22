import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const output = 'src/generated/practice-15';
const go = process.env.GO_EXE || 'go';
const goRoot = execFileSync(go, ['env', 'GOROOT'], { encoding: 'utf8' }).trim();

mkdirSync(output, { recursive: true });
execFileSync(go, ['build', '-o', join(output, 'practice-15.wasm'), './practice-15/main.go'], {
  env: { ...process.env, GOOS: 'js', GOARCH: 'wasm' },
  stdio: 'inherit',
});
copyFileSync(join(goRoot, 'lib', 'wasm', 'wasm_exec.js'), join(output, 'wasm_exec.js'));
