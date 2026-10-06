import { defineConfig, devices } from '@playwright/test';

const PORT = 4321;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  use: {
    baseURL: `http://localhost:${PORT}/ip-junction/`,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    // Test-only values switch on the consent banner and the contact form; nothing is sent (tests block third-party hosts).
    command: `npm run build && npx astro preview --port ${PORT} --ignore-lock`,
    env: { PUBLIC_UMAMI_ID: 'test-site-id', PUBLIC_WEB3FORMS_KEY: 'test-key' },
    url: `http://localhost:${PORT}/ip-junction/`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
