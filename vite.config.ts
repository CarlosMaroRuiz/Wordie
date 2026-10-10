/// <reference types="vitest/config" />
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { plugins } from './vite-configs/plugins.ts';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

// https://vite.dev
export default defineConfig({
  plugins: plugins(),
  resolve: {
    alias: {
      '@core': r('./src/core'),
      '@common': r('./src/common'),
      '@features': r('./src/features')
    }
  },
  optimizeDeps: {
    include: ['react/compiler-runtime'],
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: import.meta.dirname + '/.storybook'
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});