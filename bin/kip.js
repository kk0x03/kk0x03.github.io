#!/usr/bin/env node

/**
 * Kip CLI Wrapper
 * Runs the TypeScript CLI with tsx
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tsFile = path.join(__dirname, 'kip.ts');
const args = process.argv.slice(2);

spawn('npx', ['tsx', tsFile, ...args], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    KIP_CWD: process.cwd()
  }
});
