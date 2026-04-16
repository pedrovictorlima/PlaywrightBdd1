import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd'; // <-- 1. Importa a ferramenta BDD

// 2. Define onde estão suas features e seus steps
const testDir = defineBddConfig({
  features: 'features/*.feature', // Verifique se a pasta chama 'features' (no plural)
  steps: 'steps/*.ts',            // Verifique se a pasta chama 'steps' (no plural)
});

export default defineConfig({
  testDir, // <-- 3. Substituímos o './tests' pela variável configurada acima
  
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    trace: 'on-first-retry',
    headless: false,
    video: 'on',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  
});