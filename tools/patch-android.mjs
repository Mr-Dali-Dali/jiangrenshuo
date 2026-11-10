import { readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = path.join(root, 'android', 'app', 'src', 'main', 'AndroidManifest.xml');

try {
  await stat(manifestPath);
} catch {
  throw new Error(`找不到 AndroidManifest.xml：${manifestPath}`);
}

let manifest = await readFile(manifestPath, 'utf8');

// 允许 http 明文访问本机/局域网后端（默认 fallback 是 127.0.0.1:8000）
if (!manifest.includes('usesCleartextTraffic')) {
  manifest = manifest.replace(
    '<application',
    '<application\n        android:usesCleartextTraffic="true"'
  );
}

// 录音识别需要麦克风权限，拍照/相册需要相机权限
const permissions = [
  'android.permission.RECORD_AUDIO',
  'android.permission.CAMERA',
];
for (const name of permissions) {
  if (!manifest.includes(name)) {
    manifest = manifest.replace(
      '</manifest>',
      `    <uses-permission android:name="${name}" />\n</manifest>`
    );
  }
}

await writeFile(manifestPath, manifest);
console.log('AndroidManifest 已补齐：cleartext + 麦克风 + 相机');
