import { mkdir, rm, cp, readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'www');

const FILES = [
  'index.html',
  'app.js',
  'styles.css',
  'sw.js',
  'manifest.webmanifest',
  'icon.svg',
  'heritage-knowledge-15.js',
];

const exists = async p => {
  try { await stat(p); return true; } catch { return false; }
};

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

for (const name of FILES) {
  const from = path.join(root, name);
  if (!(await exists(from))) throw new Error(`缺少打包文件：${name}`);
  await cp(from, path.join(out, name));
}

const topics = path.join(root, 'assets', 'topics');
if (await exists(topics)) {
  await cp(topics, path.join(out, 'assets', 'topics'), { recursive: true });
}

// App 内由本地资源直接加载，Service Worker 只会让更新卡在旧缓存，这里关掉注册
const appPath = path.join(out, 'app.js');
let app = await readFile(appPath, 'utf8');
app = app.replace(
  "window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));",
  "/* App 内不使用 Service Worker */"
);
if (app.includes('navigator.serviceWorker.register')) {
  throw new Error('Service Worker 注册未完全移除，请检查 app.js');
}
await writeFile(appPath, app);

console.log(`www 已生成：${out}`);
