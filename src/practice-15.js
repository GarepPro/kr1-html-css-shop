const assets = import.meta.glob('./generated/practice-15/*.{js,wasm}', {
  eager: true,
  import: 'default',
  query: '?url',
});

export async function runGoPractice() {
  const runtimeUrl = assets['./generated/practice-15/wasm_exec.js'];
  const wasmUrl = assets['./generated/practice-15/practice-15.wasm'];
  if (!runtimeUrl || !wasmUrl || typeof fetch !== 'function') return;

  await import(/* @vite-ignore */ runtimeUrl);
  const go = new globalThis.Go();
  const response = await fetch(wasmUrl);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const { instance } = await WebAssembly.instantiate(await response.arrayBuffer(), go.importObject);
  await go.run(instance);
}
