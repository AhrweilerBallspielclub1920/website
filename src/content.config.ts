import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    kategorie: z.enum(['Senioren', 'Jugend', 'Verein']),
    team: z.string().optional(),
    autor: z.string().default('Thomas Lorenz'),
    bild: z.string().optional(),
    teaser: z.string(),
    angepinnt: z.boolean().default(false),
    entwurf: z.boolean().default(false)
  })
});

const person = z.object({ name: z.string(), rolle: z.string() });

const teams = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/teams' }),
  schema: z.object({
    name: z.string(),
    gruppe: z.string(), // Seite, auf der das Team erscheint, z. B. "d-junioren"
    reihenfolge: z.number().default(0),
    liga: z.string().optional(),
    jahrgang: z.string().optional(),
    trainer: z.array(person).default([]),
    training: z.array(z.object({ tag: z.string(), zeit: z.string().optional() })).default([]),
    ort: z.string().optional(),
    kontakt: z.string().optional(),
    fussballde: z.string().optional(),
    // fussball.de-Widgets: nur ID und Typ werden gespeichert, der Code wird von der Seite selbst erzeugt
    widgets: z.array(z.object({
      typ: z.string().regex(/^[a-z-]{2,40}$/, 'Nur Kleinbuchstaben und Bindestriche'),
      id: z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, 'Keine gültige Widget-ID')
    })).default([]),
    bild: z.string().optional()
  })
});

const gruppen = defineCollection({
  loader: file('./src/data/gruppen.json'),
  schema: z.object({
    name: z.string(),
    bereich: z.enum(['Senioren', 'Jugend']),
    alter: z.string().optional(),
    reihenfolge: z.number()
  })
});

const spiele = defineCollection({
  loader: file('./src/data/spiele.json'),
  schema: z.object({
    datum: z.string(),
    uhrzeit: z.string(),
    team: z.string(),
    gegner: z.string(),
    heim: z.boolean(),
    platz: z.string().optional()
  })
});

export const collections = { news, teams, gruppen, spiele };
