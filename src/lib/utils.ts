import { getCollection } from 'astro:content';

export const datum = (d: Date | string, opts: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }) =>
  new Date(d).toLocaleDateString('de-DE', { timeZone: 'Europe/Berlin', ...opts });

export const wochentag = (d: string) =>
  new Date(d + 'T12:00:00').toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' });

export const initialen = (name: string) =>
  name.split(/\s+/).filter((w) => /^[A-ZÄÖÜ]/.test(w)).map((w) => w[0]).slice(0, 2).join('');

export async function alleNews() {
  return (await getCollection('news', ({ data }) => !data.entwurf))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function kommendeSpiele() {
  const heute = new Date().toISOString().slice(0, 10);
  return (await getCollection('spiele'))
    .map((s) => s.data)
    .filter((s) => s.datum >= heute)
    .sort((a, b) => (a.datum + a.uhrzeit).localeCompare(b.datum + b.uhrzeit));
}
