// Kopiert Sveltia CMS aus node_modules nach public/admin/cms – so wird das CMS selbst gehostet
// (kein Nachladen von fremden Servern, passt zur Content-Security-Policy).
import { cpSync, rmSync } from 'node:fs';
rmSync('public/admin/cms', { recursive: true, force: true });
cpSync('node_modules/@sveltia/cms/dist', 'public/admin/cms', { recursive: true, filter: (f) => !f.endsWith('.map') });
console.log('Sveltia CMS nach public/admin/cms kopiert');
