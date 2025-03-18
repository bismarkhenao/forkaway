import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  clean: true,
  dts: false,
  splitting: false,
  sourcemap: false,
  minify: true,
  shims: true,
  platform: 'node',
  target: 'node18',
  noExternal: [
    '@octokit/rest',
    'chalk',
    'cli-progress',
    'dotenv',
    'inquirer',
    'ora'
  ],
  treeshake: true,
  banner: {
    js: '#!/usr/bin/env node',
  }
}) 