import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = resolve(root, 'registry.json');
const outputDir = resolve(root, 'public/r');
const registry = JSON.parse(await readFile(sourcePath, 'utf8'));

await mkdir(outputDir, { recursive: true });

const items = [];
for (const item of registry.items ?? []) {
  const files = [];
  for (const file of item.files ?? []) {
    const content = await readFile(resolve(root, file.path), 'utf8');
    const { path, type, ...metadata } = file;
    files.push({ path, content, type, ...metadata });
  }
  const { type, ...itemMetadata } = item;
  const built = { "$schema": "https://ui.shadcn.com/schema/registry-item.json", ...itemMetadata, files, type };
  await writeFile(resolve(outputDir, `${item.name}.json`), JSON.stringify(built, null, 2));
  items.push(item);
}

await writeFile(resolve(outputDir, 'registry.json'), `${JSON.stringify({ ...registry, items }, null, 2)}\n`);
console.log(`Generated ${items.length} shadcn registry item${items.length === 1 ? '' : 's'}.`);
