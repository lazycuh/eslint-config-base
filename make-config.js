import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

writeFileSync(resolve(__dirname, 'index.js'), readFileSync(resolve(__dirname, 'eslint.config.js')));
writeFileSync(resolve(__dirname, 'index.cjs'), readFileSync(resolve(__dirname, 'eslint.config.cjs')));
