import { defineConfig } from 'astro/config';

// Statische Seite – wird komplett beim Build erzeugt, kein Server, keine Datenbank.
export default defineConfig({
  site: 'https://ahrweilerbc.com',
  trailingSlash: 'ignore',
  build: { format: 'directory' }
});
